// import Cart from "../models/Cart.model.js";
// import Order from "../models/Order.model.js";
// import axios from "axios";
// import { sendNotification } from "../utils/sendNotification.js";
// import User from "../models/User.model.js";
// import dotenv from "dotenv";
// dotenv.config();
// const callback_url = process.env.CHAPA_CALLBACK_URL
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

//     const tx_ref = "TX-" + Date.now();

//     const chapaBody = {
//       amount: total,
//       currency: "ETB",
//       phone_number: "0964623413",
//       email: user.email,
//       first_name: user.name || "NoName",
//       tx_ref,
//       callback_url: `${callback_url}${tx_ref}`,
//     };

//     console.log("💳 Chapa init request body:", chapaBody);

//     const chapaRes = await axios.post(
//       "https://api.chapa.co/v1/transaction/initialize",
//       chapaBody,
//       {
//         headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
//       }
//     );

//     console.log("💳 Chapa init response:", chapaRes.data);

//     if (!chapaRes.data?.data?.checkout_url) {
//       return res.status(500).json({
//         message: "Chapa did not return checkout_url",
//         data: chapaRes.data,
//       });
//     }

//     // Save temporary order data in memory until verification
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
//     res
//       .status(500)
//       .json({ message: "Payment init failed", error: err.message });
//   }
// };

// // ------------------------------
// // VERIFY PAYMENT & CREATE ORDER
// // ------------------------------

// export const verifyChapaPayment = async (req, res) => {
//   const tx_ref = req.params.tx_ref;

//   try {
//     console.log("🔍 Verifying payment tx_ref:", tx_ref);

//     const verify = await axios.get(
//       `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
//       { headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` } }
//     );

//     console.log("✅ Chapa verify response:", verify.data);

//     if (
//       verify.data.status !== "success" ||
//       verify.data.data.status !== "success"
//     ) {
//       return res.redirect("http://localhost:5173/payment-failed");
//     }

//     const temp = req.app.locals[tx_ref];
//     if (!temp) return res.redirect("http://localhost:5173");

//     // ------------------
//     // CREATE ORDER HERE
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

//     // ----------------------------------------
//     // 🔥 NOTIFICATION SYSTEM ADDED HERE
//     // ----------------------------------------

//     // Notify user
//     await sendNotification(
//       temp.userId,
//       `Your order #${order._id} has been successfully submitted!`,
//       "order",
//       { orderId: order._id }
//     );

//     // Notify all admins
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

//     return res.redirect(
//       `http://localhost:5173/payment-success?orderId=${order._id}`
//     );
//   } catch (err) {
//     console.error(
//       "❌ Payment verification error:",
//       err.response?.data || err.message
//     );
//     return res.redirect("http://localhost:5173/payment-failed");
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
const FRONTEND_URL = process.env.CLIENT_ORIGIN;
const SUCCESS_URL = process.env.CHAPA_RETURN_URL;

export const initChapaPayment = async (req, res) => {
  try {
    const user = req.user;

    const cart = await Cart.findOne({ user: user._id }).populate(
      "items.product"
    );

    console.log("🛒 User cart:", cart);

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    console.log("💰 Total cart amount:", total);

    const tx_ref = `TX-${Date.now()}`;

    const chapaBody = {
      amount: total,
      currency: "ETB",
      phone_number: "+251964623413",
      email: user.email,
      first_name: user.name || "NoName",
      tx_ref,
      callback_url: `${CALLBACK_URL}/${tx_ref}`,
    };

    console.log("💳 Chapa init request body:", chapaBody);

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

    console.log("💳 Chapa init response:", chapaRes.data);

    if (!chapaRes.data?.data?.checkout_url) {
      return res.status(500).json({
        message: "Chapa did not return checkout_url",
        data: chapaRes.data,
      });
    }

    // Store temporary order info
    req.app.locals[tx_ref] = {
      userId: user._id,
      cartItems: cart.items,
      total,
    };

    res.json({
      payment_url: chapaRes.data.data.checkout_url,
      tx_ref,
    });
  } catch (err) {
    console.error("❌ Chapa init error:", err.response?.data || err.message);
    res.status(500).json({
      message: "Payment init failed",
      error: err.message,
    });
  }
};

// ----------------------------------
// VERIFY PAYMENT & CREATE ORDER
// ----------------------------------

export const verifyChapaPayment = async (req, res) => {
  const tx_ref = req.params.tx_ref;

  try {
    console.log("🔍 Verifying payment tx_ref:", tx_ref);

    const verify = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        },
      }
    );

    console.log("✅ Chapa verify response:", verify.data);

    if (
      verify.data.status !== "success" ||
      verify.data.data.status !== "success"
    ) {
      return res.redirect(`${FRONTEND_URL}/payment-failed`);
    }

    const temp = req.app.locals[tx_ref];
    if (!temp) {
      return res.redirect(FRONTEND_URL);
    }

    // ------------------
    // CREATE ORDER
    // ------------------
    const order = await Order.create({
      user: temp.userId,
      items: temp.cartItems.map((i) => ({
        product: i.product._id,
        productName: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
      total: temp.total,
      paymentStatus: "paid",
      tx_ref,
      paymentMethod: "chapa",
      paidAt: Date.now(),
    });

    console.log("📝 Order created:", order._id);

    // ------------------
    // NOTIFICATIONS
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
        `New order #${order._id} has been placed.`,
        "order",
        { orderId: order._id }
      );
    }

    // ------------------
    // CLEAR CART
    // ------------------
    await Cart.findOneAndUpdate({ user: temp.userId }, { items: [] });

    console.log("🧹 Cart cleared for user:", temp.userId);

    delete req.app.locals[tx_ref];

    return res.redirect(`${SUCCESS_URL}?orderId=${order._id}`);
  } catch (err) {
    console.error(
      "❌ Payment verification error:",
      err.response?.data || err.message
    );

    return res.redirect(`${FRONTEND_URL}/payment-failed`);
  }
};
