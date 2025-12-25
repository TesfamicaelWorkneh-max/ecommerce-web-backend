// import Cart from "../models/Cart.model.js";
// import Order from "../models/Order.model.js";
// import axios from "axios";
// import { sendNotification } from "../utils/sendNotification.js";
// import User from "../models/User.model.js";
// import dotenv from "dotenv";

// dotenv.config();

// const CALLBACK_URL = process.env.CHAPA_CALLBACK_URL;
// const FRONTEND_URL = process.env.CLIENT_ORIGIN;
// const SUCCESS_URL = process.env.CHAPA_RETURN_URL;

// export const initChapaPayment = async (req, res) => {
//   try {
//     const user = req.user;

//     const cart = await Cart.findOne({ user: user._id }).populate(
//       "items.product"
//     );

//     console.log("🛒 User cart:", cart);

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     const total = cart.items.reduce(
//       (sum, item) => sum + item.product.price * item.quantity,
//       0
//     );

//     console.log("💰 Total cart amount:", total);

//     const tx_ref = `TX-${Date.now()}`;

//     const chapaBody = {
//       amount: total,
//       currency: "ETB",
//       phone_number: "+251964623413",
//       email: user.email,
//       first_name: user.name || "NoName",
//       tx_ref,
//       callback_url: `${CALLBACK_URL}/${tx_ref}`,
//     };

//     console.log("💳 Chapa init request body:", chapaBody);

//     const chapaRes = await axios.post(
//       "https://api.chapa.co/v1/transaction/initialize",
//       chapaBody,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("💳 Chapa init response:", chapaRes.data);

//     if (!chapaRes.data?.data?.checkout_url) {
//       return res.status(500).json({
//         message: "Chapa did not return checkout_url",
//         data: chapaRes.data,
//       });
//     }

//     // Store temporary order info
//     req.app.locals[tx_ref] = {
//       userId: user._id,
//       cartItems: cart.items,
//       total,
//     };

//     res.json({
//       payment_url: chapaRes.data.data.checkout_url,
//       tx_ref,
//     });
//   } catch (err) {
//     console.error("❌ Chapa init error:", err.response?.data || err.message);
//     res.status(500).json({
//       message: "Payment init failed",
//       error: err.message,
//     });
//   }
// };

// // ----------------------------------
// // VERIFY PAYMENT & CREATE ORDER
// // ----------------------------------

// export const verifyChapaPayment = async (req, res) => {
//   const tx_ref = req.params.tx_ref;

//   try {
//     console.log("🔍 Verifying payment tx_ref:", tx_ref);

//     const verify = await axios.get(
//       `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//         },
//       }
//     );

//     console.log("✅ Chapa verify response:", verify.data);

//     if (
//       verify.data.status !== "success" ||
//       verify.data.data.status !== "success"
//     ) {
//       return res.redirect(`${FRONTEND_URL}/payment-failed`);
//     }

//     const temp = req.app.locals[tx_ref];
//     if (!temp) {
//       return res.redirect(FRONTEND_URL);
//     }

//     // ------------------
//     // CREATE ORDER
//     // ------------------
//     const order = await Order.create({
//       user: temp.userId,
//       items: temp.cartItems.map((i) => ({
//         product: i.product._id,
//         productName: i.product.name,
//         quantity: i.quantity,
//         price: i.product.price,
//       })),
//       total: temp.total,
//       paymentStatus: "paid",
//       tx_ref,
//       paymentMethod: "chapa",
//       paidAt: Date.now(),
//     });

//     console.log("📝 Order created:", order._id);

//     // ------------------
//     // NOTIFICATIONS
//     // ------------------
//     await sendNotification(
//       temp.userId,
//       `Your order #${order._id} has been successfully submitted!`,
//       "order",
//       { orderId: order._id }
//     );

//     const admins = await User.find({ role: "admin" });
//     for (const admin of admins) {
//       await sendNotification(
//         admin._id,
//         `New order #${order._id} has been placed.`,
//         "order",
//         { orderId: order._id }
//       );
//     }

//     // ------------------
//     // CLEAR CART
//     // ------------------
//     await Cart.findOneAndUpdate({ user: temp.userId }, { items: [] });

//     console.log("🧹 Cart cleared for user:", temp.userId);

//     delete req.app.locals[tx_ref];

//     return res.redirect(`${SUCCESS_URL}?orderId=${order._id}`);
//   } catch (err) {
//     console.error(
//       "❌ Payment verification error:",
//       err.response?.data || err.message
//     );

//     return res.redirect(`${FRONTEND_URL}/payment-failed`);
//   }
// };
// import Cart from "../models/Cart.model.js";
// import Order from "../models/Order.model.js";
// import axios from "axios";
// import { sendNotification } from "../utils/sendNotification.js";
// import User from "../models/User.model.js";
// import dotenv from "dotenv";

// dotenv.config();

// const CALLBACK_URL = process.env.CHAPA_CALLBACK_URL; // backend verify URL
// const SUCCESS_URL = process.env.CHAPA_RETURN_URL; // frontend success page
// const FRONTEND_URL = process.env.CLIENT_ORIGIN; // optional: for failed redirect

// // ---------------------
// // INIT PAYMENT
// // ---------------------
// export const initChapaPayment = async (req, res) => {
//   try {
//     const user = req.user;

//     const cart = await Cart.findOne({ user: user._id }).populate(
//       "items.product"
//     );

//     if (!cart || cart.items.length === 0)
//       return res.status(400).json({ message: "Cart is empty" });

//     const total = cart.items.reduce(
//       (sum, item) => sum + item.product.price * item.quantity,
//       0
//     );

//     const tx_ref = `TX-${Date.now()}`;

//     const chapaBody = {
//       amount: total,
//       currency: "ETB",
//       phone_number: user.phone || "+251964623413",
//       email: user.email,
//       first_name: user.name || "NoName",
//       tx_ref,
//       callback_url: `${CALLBACK_URL}/${tx_ref}`, // Chapa calls this after payment
//     };

//     const chapaRes = await axios.post(
//       "https://api.chapa.co/v1/transaction/initialize",
//       chapaBody,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!chapaRes.data?.data?.checkout_url)
//       return res
//         .status(500)
//         .json({ message: "Chapa did not return checkout_url" });

//     // Store temporary order info
//     req.app.locals[tx_ref] = {
//       userId: user._id,
//       cartItems: cart.items,
//       total,
//     };

//     res.json({
//       payment_url: chapaRes.data.data.checkout_url,
//       tx_ref,
//     });
//   } catch (err) {
//     console.error("Chapa init error:", err.response?.data || err.message);
//     res
//       .status(500)
//       .json({ message: "Payment init failed", error: err.message });
//   }
// };

// // ---------------------
// // VERIFY PAYMENT
// // ---------------------
// export const verifyChapaPayment = async (req, res) => {
//   const tx_ref = req.params.tx_ref;

//   try {
//     const verify = await axios.get(
//       `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
//       {
//         headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
//       }
//     );

//     // Payment not successful
//     if (
//       verify.data.status !== "success" ||
//       verify.data.data.status !== "success"
//     ) {
//       return res.redirect(`${FRONTEND_URL}/payment-failed`);
//     }

//     const temp = req.app.locals[tx_ref];
//     if (!temp) return res.redirect(FRONTEND_URL);

//     // ------------------
//     // CREATE ORDER
//     // ------------------
//     const order = await Order.create({
//       user: temp.userId,
//       items: temp.cartItems.map((i) => ({
//         product: i.product._id,
//         productName: i.product.name,
//         quantity: i.quantity,
//         price: i.product.price,
//       })),
//       total: temp.total,
//       paymentStatus: "paid",
//       tx_ref,
//       paymentMethod: "chapa",
//       paidAt: Date.now(),
//     });

//     // ------------------
//     // SEND NOTIFICATIONS
//     // ------------------
//     await sendNotification(
//       temp.userId,
//       `Your order #${order._id} has been successfully submitted!`,
//       "order",
//       { orderId: order._id }
//     );

//     const admins = await User.find({ role: "admin" });
//     for (const admin of admins) {
//       await sendNotification(
//         admin._id,
//         `New order #${order._id} has been placed.`,
//         "order",
//         { orderId: order._id }
//       );
//     }

//     // ------------------
//     // CLEAR CART
//     // ------------------
//     await Cart.findOneAndUpdate({ user: temp.userId }, { items: [] });

//     delete req.app.locals[tx_ref];

//     // ------------------
//     // REDIRECT TO FRONTEND SUCCESS
//     // ------------------
//     return res.redirect(`${SUCCESS_URL}?orderId=${order._id}`);
//   } catch (err) {
//     console.error(
//       "Payment verification error:",
//       err.response?.data || err.message
//     );
//     return res.redirect(`${FRONTEND_URL}/payment-failed`);
//   }
// };
import Cart from "../models/Cart.model.js";
import Order from "../models/Order.model.js";
import axios from "axios";
import { sendNotification } from "../utils/sendNotification.js";
import User from "../models/User.model.js";
import dotenv from "dotenv";

dotenv.config();

const CALLBACK_URL = process.env.CHAPA_CALLBACK_URL;
const SUCCESS_URL = process.env.CHAPA_RETURN_URL;
const FRONTEND_URL = process.env.CLIENT_ORIGIN;

// ---------------------
// INIT PAYMENT
// ---------------------
export const initChapaPayment = async (req, res) => {
  try {
    const user = req.user;

    const cart = await Cart.findOne({ user: user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const tx_ref = `TX-${Date.now()}-${user._id}`;

    const chapaBody = {
      amount: total,
      currency: "ETB",
      phone_number: user.phone || "+251964623413",
      email: user.email,
      first_name: user.name || "NoName",
      tx_ref,
      callback_url: `${CALLBACK_URL}/${tx_ref}`,
      return_url: `${SUCCESS_URL}?tx_ref=${tx_ref}&status=success`, // Added return_url
    };

    const chapaRes = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      chapaBody,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!chapaRes.data?.data?.checkout_url) {
      return res
        .status(500)
        .json({ message: "Chapa did not return checkout_url" });
    }

    // Store temporary order info
    req.app.locals[tx_ref] = {
      userId: user._id,
      cartId: cart._id,
      cartItems: cart.items,
      total,
      timestamp: Date.now(),
    };

    // Store in DB as pending order
    const pendingOrder = await Order.create({
      user: user._id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total,
      paymentStatus: "pending",
      tx_ref,
      paymentMethod: "chapa",
    });

    // Add order ID to temp storage
    req.app.locals[tx_ref].orderId = pendingOrder._id;

    res.json({
      payment_url: chapaRes.data.data.checkout_url,
      tx_ref,
      orderId: pendingOrder._id,
    });
  } catch (err) {
    console.error("Chapa init error:", err.response?.data || err.message);
    res
      .status(500)
      .json({ message: "Payment init failed", error: err.message });
  }
};

// ---------------------
// VERIFY PAYMENT (Webhook/Callback)
// ---------------------
export const verifyChapaPayment = async (req, res) => {
  const tx_ref = req.params.tx_ref;

  try {
    const verify = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
      }
    );

    // Payment not successful
    if (
      verify.data.status !== "success" ||
      verify.data.data.status !== "success"
    ) {
      // Update order status to failed
      await Order.findOneAndUpdate(
        { tx_ref },
        {
          paymentStatus: "failed",
          paymentDetails: verify.data,
        }
      );

      // Clean up temp storage
      if (req.app.locals[tx_ref]) {
        delete req.app.locals[tx_ref];
      }

      return res.redirect(`${FRONTEND_URL}/payment-failed?tx_ref=${tx_ref}`);
    }

    const temp = req.app.locals[tx_ref];
    if (!temp) {
      return res.redirect(`${FRONTEND_URL}/payment-error?reason=no_temp_data`);
    }

    // ------------------
    // UPDATE ORDER STATUS
    // ------------------
    const order = await Order.findByIdAndUpdate(
      temp.orderId,
      {
        paymentStatus: "paid",
        paidAt: new Date(),
        paymentDetails: verify.data.data,
      },
      { new: true }
    ).populate("user", "name email");

    if (!order) {
      return res.redirect(
        `${FRONTEND_URL}/payment-error?reason=order_not_found`
      );
    }

    // ------------------
    // CLEAR CART (Only after successful payment)
    // ------------------
    await Cart.findOneAndUpdate(
      { user: temp.userId },
      {
        items: [],
        updatedAt: new Date(),
      }
    );

    // Also clear any pending payment in Redis/session if using
    if (req.app.locals[tx_ref]) {
      delete req.app.locals[tx_ref];
    }

    // ------------------
    // SEND NOTIFICATIONS
    // ------------------
    await sendNotification(
      temp.userId,
      `Your order #${order._id} has been successfully submitted!`,
      "order",
      { orderId: order._id }
    );

    const admins = await User.find({ role: "admin" });
    for (const admin of admins) {
      await sendNotification(
        admin._id,
        `New order #${order._id} has been placed by ${order.user.name}.`,
        "order",
        { orderId: order._id }
      );
    }

    // ------------------
    // REDIRECT TO FRONTEND SUCCESS
    // ------------------
    return res.redirect(
      `${SUCCESS_URL}?orderId=${order._id}&status=success&tx_ref=${tx_ref}`
    );
  } catch (err) {
    console.error(
      "Payment verification error:",
      err.response?.data || err.message
    );

    // Update order status to error
    await Order.findOneAndUpdate(
      { tx_ref },
      {
        paymentStatus: "error",
        errorDetails: err.message,
      }
    );

    return res.redirect(
      `${FRONTEND_URL}/payment-failed?error=verification_failed`
    );
  }
};

// ---------------------
// CHECK PAYMENT STATUS (Frontend can call this)
// ---------------------
export const checkPaymentStatus = async (req, res) => {
  try {
    const { tx_ref } = req.params;

    // Check in our database first
    const order = await Order.findOne({ tx_ref })
      .select("paymentStatus total items user")
      .populate("user", "name email")
      .lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // If already paid, return success
    if (order.paymentStatus === "paid") {
      return res.json({
        success: true,
        status: "paid",
        orderId: order._id,
        order,
      });
    }

    // If pending, verify with Chapa
    if (order.paymentStatus === "pending") {
      try {
        const verify = await axios.get(
          `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
            },
          }
        );

        if (
          verify.data.status === "success" &&
          verify.data.data.status === "success"
        ) {
          // Update order status
          await Order.findByIdAndUpdate(order._id, {
            paymentStatus: "paid",
            paidAt: new Date(),
            paymentDetails: verify.data.data,
          });

          // Clear cart
          await Cart.findOneAndUpdate({ user: order.user._id }, { items: [] });

          return res.json({
            success: true,
            status: "paid",
            orderId: order._id,
            message: "Payment verified successfully",
          });
        }
      } catch (verifyError) {
        console.error("Verification error:", verifyError.message);
      }
    }

    return res.json({
      success: true,
      status: order.paymentStatus,
      orderId: order._id,
      order,
    });
  } catch (error) {
    console.error("Check payment status error:", error);
    res.status(500).json({
      success: false,
      message: "Error checking payment status",
    });
  }
};
