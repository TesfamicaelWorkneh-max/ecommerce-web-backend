// // import Cart from "../models/Cart.model.js";
// // import Order from "../models/Order.model.js";
// // import axios from "axios";
// // import { sendNotification } from "../utils/sendNotification.js";
// // import User from "../models/User.model.js";
// // import dotenv from "dotenv";

// // dotenv.config();

// // const CALLBACK_URL = process.env.CHAPA_CALLBACK_URL;
// // const FRONTEND_URL = process.env.CLIENT_ORIGIN;
// // const SUCCESS_URL = process.env.CHAPA_RETURN_URL;

// // export const initChapaPayment = async (req, res) => {
// //   try {
// //     const user = req.user;

// //     const cart = await Cart.findOne({ user: user._id }).populate(
// //       "items.product"
// //     );

// //     console.log("🛒 User cart:", cart);

// //     if (!cart || cart.items.length === 0) {
// //       return res.status(400).json({ message: "Cart is empty" });
// //     }

// //     const total = cart.items.reduce(
// //       (sum, item) => sum + item.product.price * item.quantity,
// //       0
// //     );

// //     console.log("💰 Total cart amount:", total);

// //     const tx_ref = `TX-${Date.now()}`;

// //     const chapaBody = {
// //       amount: total,
// //       currency: "ETB",
// //       phone_number: "+251964623413",
// //       email: user.email,
// //       first_name: user.name || "NoName",
// //       tx_ref,
// //       callback_url: `${CALLBACK_URL}/${tx_ref}`,
// //     };

// //     console.log("💳 Chapa init request body:", chapaBody);

// //     const chapaRes = await axios.post(
// //       "https://api.chapa.co/v1/transaction/initialize",
// //       chapaBody,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
// //           "Content-Type": "application/json",
// //         },
// //       }
// //     );

// //     console.log("💳 Chapa init response:", chapaRes.data);

// //     if (!chapaRes.data?.data?.checkout_url) {
// //       return res.status(500).json({
// //         message: "Chapa did not return checkout_url",
// //         data: chapaRes.data,
// //       });
// //     }

// //     // Store temporary order info
// //     req.app.locals[tx_ref] = {
// //       userId: user._id,
// //       cartItems: cart.items,
// //       total,
// //     };

// //     res.json({
// //       payment_url: chapaRes.data.data.checkout_url,
// //       tx_ref,
// //     });
// //   } catch (err) {
// //     console.error("❌ Chapa init error:", err.response?.data || err.message);
// //     res.status(500).json({
// //       message: "Payment init failed",
// //       error: err.message,
// //     });
// //   }
// // };

// // // ----------------------------------
// // // VERIFY PAYMENT & CREATE ORDER
// // // ----------------------------------

// // export const verifyChapaPayment = async (req, res) => {
// //   const tx_ref = req.params.tx_ref;

// //   try {
// //     console.log("🔍 Verifying payment tx_ref:", tx_ref);

// //     const verify = await axios.get(
// //       `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
// //         },
// //       }
// //     );

// //     console.log("✅ Chapa verify response:", verify.data);

// //     if (
// //       verify.data.status !== "success" ||
// //       verify.data.data.status !== "success"
// //     ) {
// //       return res.redirect(`${FRONTEND_URL}/payment-failed`);
// //     }

// //     const temp = req.app.locals[tx_ref];
// //     if (!temp) {
// //       return res.redirect(FRONTEND_URL);
// //     }

// //     // ------------------
// //     // CREATE ORDER
// //     // ------------------
// //     const order = await Order.create({
// //       user: temp.userId,
// //       items: temp.cartItems.map((i) => ({
// //         product: i.product._id,
// //         productName: i.product.name,
// //         quantity: i.quantity,
// //         price: i.product.price,
// //       })),
// //       total: temp.total,
// //       paymentStatus: "paid",
// //       tx_ref,
// //       paymentMethod: "chapa",
// //       paidAt: Date.now(),
// //     });

// //     console.log("📝 Order created:", order._id);

// //     // ------------------
// //     // NOTIFICATIONS
// //     // ------------------
// //     await sendNotification(
// //       temp.userId,
// //       `Your order #${order._id} has been successfully submitted!`,
// //       "order",
// //       { orderId: order._id }
// //     );

// //     const admins = await User.find({ role: "admin" });
// //     for (const admin of admins) {
// //       await sendNotification(
// //         admin._id,
// //         `New order #${order._id} has been placed.`,
// //         "order",
// //         { orderId: order._id }
// //       );
// //     }

// //     // ------------------
// //     // CLEAR CART
// //     // ------------------
// //     await Cart.findOneAndUpdate({ user: temp.userId }, { items: [] });

// //     console.log("🧹 Cart cleared for user:", temp.userId);

// //     delete req.app.locals[tx_ref];

// //     return res.redirect(`${SUCCESS_URL}?orderId=${order._id}`);
// //   } catch (err) {
// //     console.error(
// //       "❌ Payment verification error:",
// //       err.response?.data || err.message
// //     );

// //     return res.redirect(`${FRONTEND_URL}/payment-failed`);
// //   }
// // };
// // import Cart from "../models/Cart.model.js";
// // import Order from "../models/Order.model.js";
// // import axios from "axios";
// // import { sendNotification } from "../utils/sendNotification.js";
// // import User from "../models/User.model.js";
// // import dotenv from "dotenv";

// // dotenv.config();

// // const CALLBACK_URL = process.env.CHAPA_CALLBACK_URL; // backend verify URL
// // const SUCCESS_URL = process.env.CHAPA_RETURN_URL; // frontend success page
// // const FRONTEND_URL = process.env.CLIENT_ORIGIN; // optional: for failed redirect

// // // ---------------------
// // // INIT PAYMENT
// // // ---------------------
// // export const initChapaPayment = async (req, res) => {
// //   try {
// //     const user = req.user;

// //     const cart = await Cart.findOne({ user: user._id }).populate(
// //       "items.product"
// //     );

// //     if (!cart || cart.items.length === 0)
// //       return res.status(400).json({ message: "Cart is empty" });

// //     const total = cart.items.reduce(
// //       (sum, item) => sum + item.product.price * item.quantity,
// //       0
// //     );

// //     const tx_ref = `TX-${Date.now()}`;

// //     const chapaBody = {
// //       amount: total,
// //       currency: "ETB",
// //       phone_number: user.phone || "+251964623413",
// //       email: user.email,
// //       first_name: user.name || "NoName",
// //       tx_ref,
// //       callback_url: `${CALLBACK_URL}/${tx_ref}`, // Chapa calls this after payment
// //     };

// //     const chapaRes = await axios.post(
// //       "https://api.chapa.co/v1/transaction/initialize",
// //       chapaBody,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
// //           "Content-Type": "application/json",
// //         },
// //       }
// //     );

// //     if (!chapaRes.data?.data?.checkout_url)
// //       return res
// //         .status(500)
// //         .json({ message: "Chapa did not return checkout_url" });

// //     // Store temporary order info
// //     req.app.locals[tx_ref] = {
// //       userId: user._id,
// //       cartItems: cart.items,
// //       total,
// //     };

// //     res.json({
// //       payment_url: chapaRes.data.data.checkout_url,
// //       tx_ref,
// //     });
// //   } catch (err) {
// //     console.error("Chapa init error:", err.response?.data || err.message);
// //     res
// //       .status(500)
// //       .json({ message: "Payment init failed", error: err.message });
// //   }
// // };

// // // ---------------------
// // // VERIFY PAYMENT
// // // ---------------------
// // export const verifyChapaPayment = async (req, res) => {
// //   const tx_ref = req.params.tx_ref;

// //   try {
// //     const verify = await axios.get(
// //       `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
// //       {
// //         headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
// //       }
// //     );

// //     // Payment not successful
// //     if (
// //       verify.data.status !== "success" ||
// //       verify.data.data.status !== "success"
// //     ) {
// //       return res.redirect(`${FRONTEND_URL}/payment-failed`);
// //     }

// //     const temp = req.app.locals[tx_ref];
// //     if (!temp) return res.redirect(FRONTEND_URL);

// //     // ------------------
// //     // CREATE ORDER
// //     // ------------------
// //     const order = await Order.create({
// //       user: temp.userId,
// //       items: temp.cartItems.map((i) => ({
// //         product: i.product._id,
// //         productName: i.product.name,
// //         quantity: i.quantity,
// //         price: i.product.price,
// //       })),
// //       total: temp.total,
// //       paymentStatus: "paid",
// //       tx_ref,
// //       paymentMethod: "chapa",
// //       paidAt: Date.now(),
// //     });

// //     // ------------------
// //     // SEND NOTIFICATIONS
// //     // ------------------
// //     await sendNotification(
// //       temp.userId,
// //       `Your order #${order._id} has been successfully submitted!`,
// //       "order",
// //       { orderId: order._id }
// //     );

// //     const admins = await User.find({ role: "admin" });
// //     for (const admin of admins) {
// //       await sendNotification(
// //         admin._id,
// //         `New order #${order._id} has been placed.`,
// //         "order",
// //         { orderId: order._id }
// //       );
// //     }

// //     // ------------------
// //     // CLEAR CART
// //     // ------------------
// //     await Cart.findOneAndUpdate({ user: temp.userId }, { items: [] });

// //     delete req.app.locals[tx_ref];

// //     // ------------------
// //     // REDIRECT TO FRONTEND SUCCESS
// //     // ------------------
// //     return res.redirect(`${SUCCESS_URL}?orderId=${order._id}`);
// //   } catch (err) {
// //     console.error(
// //       "Payment verification error:",
// //       err.response?.data || err.message
// //     );
// //     return res.redirect(`${FRONTEND_URL}/payment-failed`);
// //   }
// // };
// import Cart from "../models/Cart.model.js";
// import Order from "../models/Order.model.js";
// import axios from "axios";
// import { sendNotification } from "../utils/sendNotification.js";
// import User from "../models/User.model.js";
// import dotenv from "dotenv";

// dotenv.config();

// const CALLBACK_URL = process.env.CHAPA_CALLBACK_URL;
// const SUCCESS_URL = process.env.CHAPA_RETURN_URL;
// const FRONTEND_URL = process.env.CLIENT_ORIGIN;

// // ---------------------
// // INIT PAYMENT
// // ---------------------
// export const initChapaPayment = async (req, res) => {
//   try {
//     const user = req.user;

//     const cart = await Cart.findOne({ user: user._id }).populate(
//       "items.product"
//     );

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     const total = cart.items.reduce(
//       (sum, item) => sum + item.product.price * item.quantity,
//       0
//     );

//     const tx_ref = `TX-${Date.now()}-${user._id}`;

//     const chapaBody = {
//       amount: total,
//       currency: "ETB",
//       phone_number: user.phone || "+251964623413",
//       email: user.email,
//       first_name: user.name || "NoName",
//       tx_ref,
//       callback_url: `${CALLBACK_URL}/${tx_ref}`,
//       return_url: `${SUCCESS_URL}?tx_ref=${tx_ref}&status=success`, // Added return_url
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

//     if (!chapaRes.data?.data?.checkout_url) {
//       return res
//         .status(500)
//         .json({ message: "Chapa did not return checkout_url" });
//     }

//     // Store temporary order info
//     req.app.locals[tx_ref] = {
//       userId: user._id,
//       cartId: cart._id,
//       cartItems: cart.items,
//       total,
//       timestamp: Date.now(),
//     };

//     // Store in DB as pending order
//     const pendingOrder = await Order.create({
//       user: user._id,
//       items: cart.items.map((item) => ({
//         product: item.product._id,
//         productName: item.product.name,
//         quantity: item.quantity,
//         price: item.product.price,
//       })),
//       total,
//       paymentStatus: "pending",
//       tx_ref,
//       paymentMethod: "chapa",
//     });

//     // Add order ID to temp storage
//     req.app.locals[tx_ref].orderId = pendingOrder._id;

//     res.json({
//       payment_url: chapaRes.data.data.checkout_url,
//       tx_ref,
//       orderId: pendingOrder._id,
//     });
//   } catch (err) {
//     console.error("Chapa init error:", err.response?.data || err.message);
//     res
//       .status(500)
//       .json({ message: "Payment init failed", error: err.message });
//   }
// };

// // ---------------------
// // VERIFY PAYMENT (Webhook/Callback)
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
//       // Update order status to failed
//       await Order.findOneAndUpdate(
//         { tx_ref },
//         {
//           paymentStatus: "failed",
//           paymentDetails: verify.data,
//         }
//       );

//       // Clean up temp storage
//       if (req.app.locals[tx_ref]) {
//         delete req.app.locals[tx_ref];
//       }

//       return res.redirect(`${FRONTEND_URL}/payment-failed?tx_ref=${tx_ref}`);
//     }

//     const temp = req.app.locals[tx_ref];
//     if (!temp) {
//       return res.redirect(`${FRONTEND_URL}/payment-error?reason=no_temp_data`);
//     }

//     // ------------------
//     // UPDATE ORDER STATUS
//     // ------------------
//     const order = await Order.findByIdAndUpdate(
//       temp.orderId,
//       {
//         paymentStatus: "paid",
//         paidAt: new Date(),
//         paymentDetails: verify.data.data,
//       },
//       { new: true }
//     ).populate("user", "name email");

//     if (!order) {
//       return res.redirect(
//         `${FRONTEND_URL}/payment-error?reason=order_not_found`
//       );
//     }

//     // ------------------
//     // CLEAR CART (Only after successful payment)
//     // ------------------
//     await Cart.findOneAndUpdate(
//       { user: temp.userId },
//       {
//         items: [],
//         updatedAt: new Date(),
//       }
//     );

//     // Also clear any pending payment in Redis/session if using
//     if (req.app.locals[tx_ref]) {
//       delete req.app.locals[tx_ref];
//     }

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
//         `New order #${order._id} has been placed by ${order.user.name}.`,
//         "order",
//         { orderId: order._id }
//       );
//     }

//     // ------------------
//     // REDIRECT TO FRONTEND SUCCESS
//     // ------------------
//     return res.redirect(
//       `${SUCCESS_URL}?orderId=${order._id}&status=success&tx_ref=${tx_ref}`
//     );
//   } catch (err) {
//     console.error(
//       "Payment verification error:",
//       err.response?.data || err.message
//     );

//     // Update order status to error
//     await Order.findOneAndUpdate(
//       { tx_ref },
//       {
//         paymentStatus: "error",
//         errorDetails: err.message,
//       }
//     );

//     return res.redirect(
//       `${FRONTEND_URL}/payment-failed?error=verification_failed`
//     );
//   }
// };

// // ---------------------
// // CHECK PAYMENT STATUS (Frontend can call this)
// // ---------------------
// export const checkPaymentStatus = async (req, res) => {
//   try {
//     const { tx_ref } = req.params;

//     // Check in our database first
//     const order = await Order.findOne({ tx_ref })
//       .select("paymentStatus total items user")
//       .populate("user", "name email")
//       .lean();

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // If already paid, return success
//     if (order.paymentStatus === "paid") {
//       return res.json({
//         success: true,
//         status: "paid",
//         orderId: order._id,
//         order,
//       });
//     }

//     // If pending, verify with Chapa
//     if (order.paymentStatus === "pending") {
//       try {
//         const verify = await axios.get(
//           `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//             },
//           }
//         );

//         if (
//           verify.data.status === "success" &&
//           verify.data.data.status === "success"
//         ) {
//           // Update order status
//           await Order.findByIdAndUpdate(order._id, {
//             paymentStatus: "paid",
//             paidAt: new Date(),
//             paymentDetails: verify.data.data,
//           });

//           // Clear cart
//           await Cart.findOneAndUpdate({ user: order.user._id }, { items: [] });

//           return res.json({
//             success: true,
//             status: "paid",
//             orderId: order._id,
//             message: "Payment verified successfully",
//           });
//         }
//       } catch (verifyError) {
//         console.error("Verification error:", verifyError.message);
//       }
//     }

//     return res.json({
//       success: true,
//       status: order.paymentStatus,
//       orderId: order._id,
//       order,
//     });
//   } catch (error) {
//     console.error("Check payment status error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error checking payment status",
//     });
//   }
// };
// @desc    Mark COD order as paid
// @route   PUT /api/orders/:id/mark-paid
// @access  Private/Admin
// import Cart from "../models/Cart.model.js";
// import Order from "../models/Order.model.js";
// import axios from "axios";
// import { sendNotification } from "../utils/sendNotification.js";
// import User from "../models/User.model.js";
// import dotenv from "dotenv";

// dotenv.config();

// const CALLBACK_URL = process.env.CHAPA_CALLBACK_URL;
// const SUCCESS_URL = process.env.CHAPA_RETURN_URL;
// const FRONTEND_URL = process.env.CLIENT_ORIGIN;

// // ---------------------
// // INIT PAYMENT
// // ---------------------
// export const initChapaPayment = async (req, res) => {
//   try {
//     const user = req.user;

//     const cart = await Cart.findOne({ user: user._id }).populate(
//       "items.product"
//     );

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     const total = cart.items.reduce(
//       (sum, item) => sum + item.product.price * item.quantity,
//       0
//     );

//     const tx_ref = `TX-${Date.now()}-${user._id}`;

//     const chapaBody = {
//       amount: total,
//       currency: "ETB",
//       phone_number: user.phone || "+251964623413",
//       email: user.email,
//       first_name: user.name || "NoName",
//       tx_ref,
//       callback_url: `${CALLBACK_URL}/${tx_ref}`,
//       return_url: `${SUCCESS_URL}?tx_ref=${tx_ref}&status=success`,
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

//     if (!chapaRes.data?.data?.checkout_url) {
//       return res
//         .status(500)
//         .json({ message: "Chapa did not return checkout_url" });
//     }

//     // Store temporary order info
//     req.app.locals[tx_ref] = {
//       userId: user._id,
//       cartId: cart._id,
//       cartItems: cart.items,
//       total,
//       timestamp: Date.now(),
//     };

//     // Store in DB as unpaid order (using "unpaid" instead of "pending")
//     const pendingOrder = await Order.create({
//       user: user._id,
//       items: cart.items.map((item) => ({
//         product: item.product._id,
//         productName: item.product.name,
//         quantity: item.quantity,
//         price: item.product.price,
//       })),
//       total,
//       status: "pending", // This is the ORDER status (different from paymentStatus)
//       paymentStatus: "unpaid", // CHANGED: Use "unpaid" not "pending"
//       paymentMethod: "chapa",
//       tx_ref, // Store the transaction reference
//     });

//     // Add order ID to temp storage
//     req.app.locals[tx_ref].orderId = pendingOrder._id;

//     res.json({
//       payment_url: chapaRes.data.data.checkout_url,
//       tx_ref,
//       orderId: pendingOrder._id,
//     });
//   } catch (err) {
//     console.error("Chapa init error:", err.response?.data || err.message);

//     // More detailed error logging
//     if (err.name === "ValidationError") {
//       console.error("Validation errors:", err.errors);
//     }

//     res.status(500).json({
//       message: "Payment init failed",
//       error: err.message,
//       details: err.errors || null,
//     });
//   }
// };

// // ---------------------
// // VERIFY PAYMENT (Webhook/Callback)
// // ---------------------
// export const verifyChapaPayment = async (req, res) => {
//   const tx_ref = req.params.tx_ref;
//   console.log("🔍 Verifying payment for tx_ref:", tx_ref);

//   try {
//     // Verify with Chapa
//     const verify = await axios.get(
//       `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
//       {
//         headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
//       }
//     );

//     console.log("Chapa verification response:", verify.data);

//     // Check if payment was successful
//     if (
//       verify.data.status !== "success" ||
//       verify.data.data.status !== "success"
//     ) {
//       console.log(
//         "❌ Payment not successful, status:",
//         verify.data.data.status
//       );

//       // Find and update the order to failed
//       await Order.findOneAndUpdate(
//         { tx_ref },
//         {
//           paymentStatus: "failed",
//           paymentResult: verify.data.data,
//         }
//       );

//       // Clean up temp storage
//       if (req.app.locals[tx_ref]) {
//         delete req.app.locals[tx_ref];
//       }

//       return res.redirect(
//         `${FRONTEND_URL}/payment-failed?tx_ref=${tx_ref}&reason=payment_failed`
//       );
//     }

//     // Check temporary storage
//     const temp = req.app.locals[tx_ref];

//     if (!temp) {
//       console.log("⚠️ No temporary data found for tx_ref:", tx_ref);

//       // Try to find order by tx_ref directly
//       const existingOrder = await Order.findOne({ tx_ref });

//       if (existingOrder) {
//         // Use the order's markPaid method
//         existingOrder.markPaid(verify.data.data, "chapa");
//         existingOrder.status = "processing"; // Update order status
//         await existingOrder.save();

//         // Clear the user's cart
//         await Cart.findOneAndUpdate(
//           { user: existingOrder.user },
//           { items: [] }
//         );

//         return res.redirect(
//           `${SUCCESS_URL}?orderId=${existingOrder._id}&status=success`
//         );
//       }

//       return res.redirect(
//         `${FRONTEND_URL}/payment-error?reason=no_temp_data&tx_ref=${tx_ref}`
//       );
//     }

//     // ------------------
//     // UPDATE ORDER STATUS
//     // ------------------
//     const order = await Order.findById(temp.orderId);

//     if (!order) {
//       console.log("❌ Order not found with ID:", temp.orderId);
//       return res.redirect(
//         `${FRONTEND_URL}/payment-error?reason=order_not_found`
//       );
//     }

//     // Use the markPaid method from schema
//     order.markPaid(verify.data.data, "chapa");
//     order.status = "processing"; // Update order status to processing
//     await order.save();

//     // ------------------
//     // CLEAR CART (Only after successful payment)
//     // ------------------
//     await Cart.findOneAndUpdate(
//       { user: temp.userId },
//       {
//         items: [],
//         updatedAt: new Date(),
//       }
//     );

//     // Clear temporary storage
//     if (req.app.locals[tx_ref]) {
//       delete req.app.locals[tx_ref];
//     }

//     // ------------------
//     // SEND NOTIFICATIONS
//     // ------------------
//     try {
//       await sendNotification(
//         temp.userId,
//         `Your order #${order._id} has been successfully submitted!`,
//         "order",
//         { orderId: order._id }
//       );

//       const admins = await User.find({ role: "admin" });
//       for (const admin of admins) {
//         await sendNotification(
//           admin._id,
//           `New order #${order._id} has been placed by ${order.user?.name || "Customer"}.`,
//           "order",
//           { orderId: order._id }
//         );
//       }
//     } catch (notifError) {
//       console.error("Notification error:", notifError);
//       // Don't fail the payment if notifications fail
//     }

//     // ------------------
//     // REDIRECT TO FRONTEND SUCCESS
//     // ------------------
//     return res.redirect(
//       `${SUCCESS_URL}?orderId=${order._id}&status=success&tx_ref=${tx_ref}`
//     );
//   } catch (err) {
//     console.error(
//       "❌ Payment verification error:",
//       err.response?.data || err.message
//     );

//     // Update order status to failed
//     await Order.findOneAndUpdate(
//       { tx_ref },
//       {
//         paymentStatus: "failed",
//         paymentResult: { error: err.message },
//       }
//     );

//     return res.redirect(
//       `${FRONTEND_URL}/payment-failed?error=verification_failed&tx_ref=${tx_ref}`
//     );
//   }
// };

// // ---------------------
// // CHECK PAYMENT STATUS
// // ---------------------
// export const checkPaymentStatus = async (req, res) => {
//   try {
//     const { tx_ref } = req.params;

//     // Check in our database
//     const order = await Order.findOne({ tx_ref })
//       .select("paymentStatus total items user status")
//       .populate("user", "name email")
//       .lean();

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // If already paid, return success
//     if (order.paymentStatus === "paid") {
//       return res.json({
//         success: true,
//         status: "paid",
//         orderId: order._id,
//         order,
//       });
//     }

//     // If unpaid, verify with Chapa
//     if (order.paymentStatus === "unpaid") {
//       try {
//         const verify = await axios.get(
//           `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//             },
//           }
//         );

//         if (
//           verify.data.status === "success" &&
//           verify.data.data.status === "success"
//         ) {
//           // Find and update the order
//           const orderToUpdate = await Order.findById(order._id);
//           if (orderToUpdate) {
//             orderToUpdate.markPaid(verify.data.data, "chapa");
//             orderToUpdate.status = "processing";
//             await orderToUpdate.save();

//             // Clear cart
//             await Cart.findOneAndUpdate(
//               { user: order.user._id },
//               { items: [] }
//             );
//           }

//           return res.json({
//             success: true,
//             status: "paid",
//             orderId: order._id,
//             message: "Payment verified successfully",
//           });
//         }
//       } catch (verifyError) {
//         console.error("Verification error:", verifyError.message);
//       }
//     }

//     return res.json({
//       success: true,
//       status: order.paymentStatus,
//       orderId: order._id,
//       order,
//     });
//   } catch (error) {
//     console.error("Check payment status error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error checking payment status",
//     });
//   }
// };

// // ---------------------
// // CREATE COD ORDER (Cash on Delivery)
// // ---------------------
// export const createCODOrder = async (req, res) => {
//   try {
//     const user = req.user;

//     const cart = await Cart.findOne({ user: user._id }).populate(
//       "items.product"
//     );

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     const total = cart.items.reduce(
//       (sum, item) => sum + item.product.price * item.quantity,
//       0
//     );

//     // Create COD order
//     const order = await Order.create({
//       user: user._id,
//       items: cart.items.map((item) => ({
//         product: item.product._id,
//         productName: item.product.name,
//         quantity: item.quantity,
//         price: item.product.price,
//       })),
//       total,
//       status: "pending",
//       paymentStatus: "unpaid", // COD orders start as unpaid
//       paymentMethod: "cod",
//       paymentResult: {
//         method: "cod",
//         note: "Payment on delivery",
//       },
//     });

//     // Clear cart
//     await Cart.findOneAndUpdate({ user: user._id }, { items: [] });

//     // Send notifications
//     try {
//       await sendNotification(
//         user._id,
//         `Your COD order #${order._id} has been placed successfully!`,
//         "order",
//         { orderId: order._id }
//       );

//       const admins = await User.find({ role: "admin" });
//       for (const admin of admins) {
//         await sendNotification(
//           admin._id,
//           `New COD order #${order._id} has been placed.`,
//           "order",
//           { orderId: order._id }
//         );
//       }
//     } catch (notifError) {
//       console.error("Notification error:", notifError);
//     }

//     res.json({
//       success: true,
//       orderId: order._id,
//       message: "COD order created successfully",
//     });
//   } catch (error) {
//     console.error("COD order creation error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error creating COD order",
//     });
//   }
// };
import Cart from "../models/Cart.model.js";
import Order from "../models/Order.model.js";
import axios from "axios";
import {
  sendNotification,
  sendBulkNotifications,
} from "../utils/sendNotification.js";
import User from "../models/User.model.js";
import dotenv from "dotenv";

dotenv.config();

const CALLBACK_URL = process.env.CHAPA_CALLBACK_URL;
const SUCCESS_URL = process.env.CHAPA_RETURN_URL;
const FRONTEND_URL = process.env.CLIENT_ORIGIN;

// Helper to generate order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `ORD${timestamp}${random}`;
};

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
      return_url: `${SUCCESS_URL}?tx_ref=${tx_ref}&status=success`,
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

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Store temporary order info
    req.app.locals[tx_ref] = {
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone,
      cartId: cart._id,
      cartItems: cart.items,
      total,
      orderNumber,
      timestamp: Date.now(),
    };

    // Create order with "pending" status
    const pendingOrder = await Order.create({
      user: user._id,
      orderNumber,
      items: cart.items.map((item) => ({
        product: item.product._id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.images?.[0] || null,
      })),
      total,
      status: "pending",
      paymentStatus: "unpaid",
      paymentMethod: "chapa",
      tx_ref,
    });

    // Add order ID to temp storage
    req.app.locals[tx_ref].orderId = pendingOrder._id;

    res.json({
      payment_url: chapaRes.data.data.checkout_url,
      tx_ref,
      orderId: pendingOrder._id,
      orderNumber,
    });
  } catch (err) {
    console.error("Chapa init error:", err.response?.data || err.message);

    res.status(500).json({
      message: "Payment init failed",
      error: err.message,
    });
  }
};

// ---------------------
// VERIFY PAYMENT (Webhook/Callback) - ENHANCED WITH NOTIFICATIONS
// ---------------------
export const verifyChapaPayment = async (req, res) => {
  const tx_ref = req.params.tx_ref;
  console.log("🔍 Verifying payment for tx_ref:", tx_ref);

  try {
    // Verify with Chapa
    const verify = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
      }
    );

    console.log("Chapa verification response:", verify.data);

    // Check if payment was successful
    if (
      verify.data.status !== "success" ||
      verify.data.data.status !== "success"
    ) {
      console.log(
        "❌ Payment not successful, status:",
        verify.data.data.status
      );

      // Update order to failed
      await Order.findOneAndUpdate(
        { tx_ref },
        {
          paymentStatus: "failed",
          paymentResult: verify.data.data,
          status: "failed",
        }
      );

      // Clean up temp storage
      if (req.app.locals[tx_ref]) {
        delete req.app.locals[tx_ref];
      }

      return res.redirect(
        `${FRONTEND_URL}/payment-failed?tx_ref=${tx_ref}&reason=payment_failed&error=${verify.data.data.status}`
      );
    }

    // Check temporary storage
    const temp = req.app.locals[tx_ref];

    if (!temp) {
      console.log("⚠️ No temporary data found for tx_ref:", tx_ref);

      // Try to find order by tx_ref directly
      const existingOrder = await Order.findOne({ tx_ref });

      if (existingOrder) {
        // Mark as paid
        existingOrder.markPaid(verify.data.data, "chapa");
        existingOrder.status = "processing";
        await existingOrder.save();

        // Clear the user's cart
        await Cart.findOneAndUpdate(
          { user: existingOrder.user },
          { items: [] }
        );

        // Send notifications for existing order
        await sendOrderSuccessNotifications(existingOrder, verify.data.data);

        return res.redirect(
          `${SUCCESS_URL}?orderId=${existingOrder._id}&status=success&tx_ref=${tx_ref}`
        );
      }

      return res.redirect(
        `${FRONTEND_URL}/payment-failed?reason=no_temp_data&tx_ref=${tx_ref}`
      );
    }

    // UPDATE ORDER STATUS
    const order = await Order.findById(temp.orderId);

    if (!order) {
      console.log("❌ Order not found with ID:", temp.orderId);
      return res.redirect(
        `${FRONTEND_URL}/payment-failed?reason=order_not_found&tx_ref=${tx_ref}`
      );
    }

    // Use the markPaid method from schema
    order.markPaid(verify.data.data, "chapa");
    order.status = "processing";
    await order.save();

    // CLEAR CART (Only after successful payment)
    await Cart.findOneAndUpdate(
      { user: temp.userId },
      {
        items: [],
        updatedAt: new Date(),
      }
    );

    // Clear temporary storage
    if (req.app.locals[tx_ref]) {
      delete req.app.locals[tx_ref];
    }

    // ===== SEND COMPREHENSIVE NOTIFICATIONS FOR SUCCESSFUL PAYMENT =====
    await sendOrderSuccessNotifications(order, verify.data.data, {
      userName: temp.userName,
      userEmail: temp.userEmail,
      userPhone: temp.userPhone,
      orderNumber: temp.orderNumber,
    });

    // REDIRECT TO FRONTEND SUCCESS
    return res.redirect(
      `${SUCCESS_URL}?orderId=${order._id}&status=success&tx_ref=${tx_ref}&orderNumber=${temp.orderNumber}`
    );
  } catch (err) {
    console.error(
      "❌ Payment verification error:",
      err.response?.data || err.message
    );

    // Update order status to failed
    await Order.findOneAndUpdate(
      { tx_ref },
      {
        paymentStatus: "failed",
        paymentResult: { error: err.message },
        status: "failed",
      }
    );

    return res.redirect(
      `${FRONTEND_URL}/payment-failed?error=verification_failed&tx_ref=${tx_ref}`
    );
  }
};

// Helper function to send comprehensive order success notifications
async function sendOrderSuccessNotifications(
  order,
  paymentData,
  tempData = {}
) {
  try {
    // Get user details if not provided
    let user;
    if (tempData.userName && tempData.userEmail) {
      user = {
        name: tempData.userName,
        email: tempData.userEmail,
        phone: tempData.userPhone,
      };
    } else {
      const userDoc = await User.findById(order.user);
      user = {
        name: userDoc?.name || "Customer",
        email: userDoc?.email || "",
        phone: userDoc?.phone || "",
      };
    }

    const orderNumber =
      tempData.orderNumber ||
      order.orderNumber ||
      order._id.toString().slice(-8);
    const total = order.total || 0;
    const itemsCount = order.items?.length || 0;

    // ===== USER NOTIFICATION: ORDER PLACED SUCCESSFULLY =====
    const userNotificationData = {
      orderId: order._id,
      orderNumber,
      total: total.toFixed(2),
      itemsCount,
      paymentMethod: order.paymentMethod || "chapa",
      paymentStatus: "success",
      transactionId: paymentData.tx_ref || paymentData.id,
      paymentAmount: paymentData.amount || total,
      currency: paymentData.currency || "ETB",
      customerName: user.name,
      customerEmail: user.email,
      estimatedDelivery: "3-5 business days",
      paymentTime: new Date().toLocaleString(),
      chapaReference: paymentData.reference || paymentData.tx_ref,
    };

    console.log("📨 Sending user notification for order:", orderNumber);

    await sendNotification(
      order.user,
      `🎉 Your order #${orderNumber} has been placed successfully! Total: ETB ${total.toFixed(2)}`,
      "order",
      userNotificationData,
      {
        title: "🎉 Order Placed Successfully!",
        priority: "high",
        icon: "shopping-bag",
        sendEmail: true,
        sendPush: true,
        actionUrl: `${FRONTEND_URL}/orders/${order._id}`,
        actionLabel: "Track Your Order",
        template: "order_placed",
      }
    );

    console.log("✅ User notification sent");

    // ===== ADMIN NOTIFICATIONS: NEW ORDER PLACED =====
    const admins = await User.find({ role: "admin" }).select("_id");
    const adminIds = admins.map((admin) => admin._id);

    if (adminIds.length > 0) {
      const adminNotificationData = {
        orderId: order._id,
        orderNumber,
        total: total.toFixed(2),
        itemsCount,
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone || "Not provided",
        paymentMethod: order.paymentMethod || "chapa",
        paymentStatus: "success",
        transactionId: paymentData.tx_ref || paymentData.id,
        paymentAmount: paymentData.amount || total,
        currency: paymentData.currency || "ETB",
        chapaReference: paymentData.reference || paymentData.tx_ref,
        paymentTime: new Date().toLocaleString(),
        items:
          order.items?.map((item) => ({
            name: item.productName || "Product",
            quantity: item.quantity,
            price: item.price,
            total: (item.quantity * item.price).toFixed(2),
          })) || [],
      };

      console.log(
        "📨 Sending admin notifications to",
        adminIds.length,
        "admins"
      );

      await sendBulkNotifications(
        adminIds,
        `🛒 New order #${orderNumber} placed by ${user.name} - Total: ETB ${total.toFixed(2)}`,
        "admin_alert",
        adminNotificationData,
        {
          title: "🛒 New Order Received!",
          priority: "high",
          icon: "alert-circle",
          sendEmail: true,
          sendPush: true,
          actionUrl: `${FRONTEND_URL}/admin/orders/${order._id}`,
          actionLabel: "View Order Details",
          template: "admin_new_order",
        }
      );

      console.log("✅ Admin notifications sent");
    }

    // ===== PAYMENT CONFIRMATION NOTIFICATION =====
    console.log("📨 Sending payment confirmation notification");

    await sendNotification(
      order.user,
      `💰 Payment of ETB ${total.toFixed(2)} for order #${orderNumber} has been confirmed successfully!`,
      "payment",
      {
        orderId: order._id,
        orderNumber,
        amount: total.toFixed(2),
        currency: "ETB",
        transactionId: paymentData.tx_ref || paymentData.id,
        paymentMethod: "Chapa",
        status: "completed",
        confirmationTime: new Date().toLocaleString(),
        reference: paymentData.reference || paymentData.tx_ref,
      },
      {
        title: "✅ Payment Confirmed",
        priority: "high",
        icon: "credit-card",
        sendEmail: true,
        sendPush: true,
        actionUrl: `${FRONTEND_URL}/orders/${order._id}`,
        actionLabel: "View Order",
        template: "payment_success",
      }
    );

    console.log("✅ Payment confirmation sent");
  } catch (error) {
    console.error("❌ Error sending order success notifications:", error);
    // Don't throw error to avoid affecting the payment flow
  }
}

// ---------------------
// CHECK PAYMENT STATUS
// ---------------------
export const checkPaymentStatus = async (req, res) => {
  try {
    const { tx_ref } = req.params;
    const user = req.user;

    // Check in our database
    const order = await Order.findOne({ tx_ref, user: user._id })
      .select("paymentStatus total items user status orderNumber")
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

    // If unpaid, verify with Chapa
    if (order.paymentStatus === "unpaid") {
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
          // Find and update the order
          const orderToUpdate = await Order.findById(order._id);
          if (orderToUpdate) {
            orderToUpdate.markPaid(verify.data.data, "chapa");
            orderToUpdate.status = "processing";
            await orderToUpdate.save();

            // Clear cart
            await Cart.findOneAndUpdate(
              { user: order.user._id },
              { items: [] }
            );

            // Send notifications for successful payment
            await sendOrderSuccessNotifications(
              orderToUpdate,
              verify.data.data
            );
          }

          return res.json({
            success: true,
            status: "paid",
            orderId: order._id,
            order: { ...order, paymentStatus: "paid", status: "processing" },
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

// ---------------------
// CREATE COD ORDER - ENHANCED WITH NOTIFICATIONS
// ---------------------
export const createCODOrder = async (req, res) => {
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

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Create COD order
    const order = await Order.create({
      user: user._id,
      orderNumber,
      items: cart.items.map((item) => ({
        product: item.product._id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.images?.[0] || null,
      })),
      total,
      status: "pending",
      paymentStatus: "unpaid",
      paymentMethod: "cod",
      paymentResult: {
        method: "cod",
        note: "Payment on delivery",
      },
    });

    // Clear cart
    await Cart.findOneAndUpdate({ user: user._id }, { items: [] });

    // ===== SEND COD ORDER NOTIFICATIONS =====
    try {
      // User notification
      await sendNotification(
        user._id,
        `🛒 Your COD order #${orderNumber} has been placed successfully! Total: ETB ${total.toFixed(2)}`,
        "order",
        {
          orderId: order._id,
          orderNumber,
          total: total.toFixed(2),
          itemsCount: order.items.length,
          paymentMethod: "Cash on Delivery",
          status: "pending",
          estimatedDelivery: "3-5 business days",
          paymentNote: "Payment will be collected on delivery",
        },
        {
          title: "🛒 COD Order Placed",
          priority: "medium",
          icon: "shopping-bag",
          sendEmail: true,
          sendPush: true,
          actionUrl: `${FRONTEND_URL}/orders/${order._id}`,
          actionLabel: "Track Order",
          template: "order_placed",
        }
      );

      // Admin notifications
      const admins = await User.find({ role: "admin" });
      const adminIds = admins.map((admin) => admin._id);

      if (adminIds.length > 0) {
        await sendBulkNotifications(
          adminIds,
          `🛒 New COD order #${orderNumber} placed by ${user.name} - Total: ETB ${total.toFixed(2)}`,
          "admin_alert",
          {
            orderId: order._id,
            orderNumber,
            total: total.toFixed(2),
            itemsCount: order.items.length,
            customerName: user.name,
            customerEmail: user.email,
            customerPhone: user.phone || "Not provided",
            paymentMethod: "Cash on Delivery",
            status: "pending",
            paymentNote: "Payment on delivery",
          },
          {
            title: "📦 New COD Order",
            priority: "medium",
            icon: "alert-circle",
            sendEmail: true,
            sendPush: true,
            actionUrl: `${FRONTEND_URL}/admin/orders/${order._id}`,
            actionLabel: "View Order",
            template: "admin_new_order",
          }
        );
      }
    } catch (notifError) {
      console.error("Notification error:", notifError);
      // Don't fail the order creation if notifications fail
    }

    res.json({
      success: true,
      orderId: order._id,
      orderNumber,
      message: "COD order created successfully",
    });
  } catch (error) {
    console.error("COD order creation error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating COD order",
    });
  }
};

// ---------------------
// SEND TEST ORDER NOTIFICATION (For Testing)
// ---------------------
export const testOrderNotification = async (req, res) => {
  try {
    const user = req.user;

    // Create a test order
    const testOrder = {
      _id: "test_order_" + Date.now(),
      user: user._id,
      orderNumber: "TEST" + Date.now().toString().slice(-8),
      total: 99.99,
      items: [{ productName: "Test Product", quantity: 1, price: 99.99 }],
      paymentMethod: "chapa",
      status: "processing",
    };

    // Send test notification
    await sendOrderSuccessNotifications(
      testOrder,
      {
        tx_ref: "TEST_TX_" + Date.now(),
        amount: 99.99,
        currency: "ETB",
        reference: "TEST_REF_" + Date.now(),
      },
      {
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        orderNumber: testOrder.orderNumber,
      }
    );

    res.json({
      success: true,
      message: "Test order notification sent successfully",
      order: testOrder,
    });
  } catch (error) {
    console.error("Test notification error:", error);
    res.status(500).json({
      success: false,
      message: "Error sending test notification",
    });
  }
};
