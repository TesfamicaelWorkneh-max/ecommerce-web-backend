// // // import React, { useState, useEffect } from "react";
// // // import toast from "react-hot-toast";
// // // import {
// // //   FaPhone,
// // //   FaEnvelope,
// // //   FaMapMarkerAlt,
// // //   FaClock,
// // //   FaPaperPlane,
// // //   FaUser,
// // //   FaTag,
// // //   FaComment,
// // //   FaBuilding,
// // // } from "react-icons/fa";
// // // import { fetchWithAuth } from "../utils/auth";

// // // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // // const ContactPage = () => {
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     email: "",
// // //     subject: "",
// // //     message: "",
// // //   });
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   useEffect(() => {
// // //     const timer = setTimeout(() => setIsLoading(false), 800);
// // //     return () => clearTimeout(timer);
// // //   }, []);

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setIsSubmitting(true);

// // //     try {
// // //       const response = await fetchWithAuth(`${BACKEND_URL}/api/contact`, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify(formData),
// // //       });

// // //       const data = await response.json();

// // //       if (response.ok) {
// // //         toast.success("Message sent successfully! We'll get back to you soon.");
// // //         setFormData({ name: "", email: "", subject: "", message: "" });
// // //       } else {
// // //         toast.error(
// // //           data.message || "Failed to send message. Please try again."
// // //         );
// // //       }
// // //     } catch (error) {
// // //       toast.error("Network error. Please check your connection.");
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   const contactInfo = [
// // //     {
// // //       icon: <FaPhone />,
// // //       title: "Call Us",
// // //       details: ["+251 96 462 3413", "+251 92 683 0205"],
// // //       action: "tel:+251964623413",
// // //     },
// // //     {
// // //       icon: <FaEnvelope />,
// // //       title: "Email Us",
// // //       details: [
// // //         "worknehtesfamicael707@gmail.com",
// // //         "biruktawithabtamu686@gmail.com",
// // //       ],
// // //       action: "mailto:worknehtesfamicael707@gmail.com",
// // //     },
// // //     {
// // //       icon: <FaMapMarkerAlt />,
// // //       title: "Visit Us",
// // //       details: ["Platinum Plaza", "Front of EU Delegation"],
// // //       action: "https://maps.google.com",
// // //     },
// // //     {
// // //       icon: <FaClock />,
// // //       title: "Hours",
// // //       details: ["Mon-Fri: 9AM-6PM", "Sat-Sun: 10AM-4PM"],
// // //       action: null,
// // //     },
// // //   ];

// // //   return (
// // //     <>
// // //       {/* Loading Animation */}
// // //       {isLoading && (
// // //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
// // //           <div className="text-center">
// // //             <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-[#D7C097] border-r-[#A38C5C] animate-spin mb-4"></div>
// // //             <p className="dark:text-gray-300 text-gray-700 font-medium">
// // //               Loading Contact...
// // //             </p>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-12">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           {/* Header */}
// // //           <div className="text-center mb-16">
// // //             <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#D7C097] mb-6">
// // //               <FaPaperPlane className="text-4xl text-white" />
// // //             </div>

// // //             <h1 className="text-4xl lg:text-6xl font-bold mb-6">
// // //               <span className="text-gray-900 dark:text-gray-100">
// // //                 Get in Touch
// // //               </span>
// // //             </h1>

// // //             <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
// // //               Have questions? We're here to help. Reach out anytime!
// // //             </p>
// // //           </div>

// // //           {/* Contact Cards */}
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
// // //             {contactInfo.map((info, index) => (
// // //               <div
// // //                 key={index}
// // //                 className={`p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
// // //                   info.action ? "cursor-pointer" : "cursor-default"
// // //                 }`}
// // //                 onClick={() =>
// // //                   info.action && window.open(info.action, "_blank")
// // //                 }
// // //               >
// // //                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D7C097] mb-6">
// // //                   <div className="text-2xl text-white">{info.icon}</div>
// // //                 </div>

// // //                 <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
// // //                   {info.title}
// // //                 </h3>

// // //                 <div className="space-y-2">
// // //                   {info.details.map((detail, idx) => (
// // //                     <p key={idx} className="text-gray-700 dark:text-gray-300">
// // //                       {detail}
// // //                     </p>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           <div className="grid lg:grid-cols-3 gap-12">
// // //             {/* Contact Form */}
// // //             <div className="lg:col-span-2">
// // //               <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
// // //                 <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
// // //                   Send us a Message
// // //                 </h2>

// // //                 <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
// // //                   Fill out the form below and we'll get back to you as soon as
// // //                   possible.
// // //                 </p>

// // //                 <form onSubmit={handleSubmit} className="space-y-6">
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                     <div>
// // //                       <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3 font-medium">
// // //                         <FaUser className="text-[#D7C097]" />
// // //                         Your Name
// // //                       </label>
// // //                       <input
// // //                         type="text"
// // //                         name="name"
// // //                         value={formData.name}
// // //                         onChange={handleChange}
// // //                         required
// // //                         className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
// // //                         placeholder="John Doe"
// // //                       />
// // //                     </div>

// // //                     <div>
// // //                       <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3 font-medium">
// // //                         <FaEnvelope className="text-[#D7C097]" />
// // //                         Email Address
// // //                       </label>
// // //                       <input
// // //                         type="email"
// // //                         name="email"
// // //                         value={formData.email}
// // //                         onChange={handleChange}
// // //                         required
// // //                         className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
// // //                         placeholder="john@example.com"
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   <div>
// // //                     <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3 font-medium">
// // //                       <FaTag className="text-[#D7C097]" />
// // //                       Subject
// // //                     </label>
// // //                     <input
// // //                       type="text"
// // //                       name="subject"
// // //                       value={formData.subject}
// // //                       onChange={handleChange}
// // //                       required
// // //                       className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
// // //                       placeholder="How can we help you?"
// // //                     />
// // //                   </div>

// // //                   <div>
// // //                     <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3 font-medium">
// // //                       <FaComment className="text-[#D7C097]" />
// // //                       Your Message
// // //                     </label>
// // //                     <textarea
// // //                       name="message"
// // //                       value={formData.message}
// // //                       onChange={handleChange}
// // //                       required
// // //                       rows={6}
// // //                       className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
// // //                       placeholder="Tell us more about your inquiry..."
// // //                     />
// // //                   </div>

// // //                   <button
// // //                     type="submit"
// // //                     disabled={isSubmitting}
// // //                     className="w-full py-5 rounded-xl bg-[#D7C097] text-white font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
// // //                   >
// // //                     {isSubmitting ? (
// // //                       <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// // //                     ) : (
// // //                       <FaPaperPlane className="text-xl" />
// // //                     )}
// // //                     <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
// // //                   </button>
// // //                 </form>
// // //               </div>
// // //             </div>

// // //             {/* Office Location */}
// // //             <div>
// // //               <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
// // //                 <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
// // //                   <FaBuilding className="text-[#D7C097]" />
// // //                   Our Office
// // //                 </h3>

// // //                 <div className="h-64 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-600">
// // //                   <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
// // //                     <div className="text-center">
// // //                       <div className="w-16 h-16 rounded-full bg-[#D7C097] flex items-center justify-center mx-auto mb-4">
// // //                         <FaMapMarkerAlt className="text-2xl text-white" />
// // //                       </div>

// // //                       <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
// // //                         Platinum Plaza
// // //                       </h4>

// // //                       <p className="text-gray-700 dark:text-gray-300 mb-1">
// // //                         Front of EU Delegation
// // //                       </p>

// // //                       <p className="text-[#D7C097]">Addis Ababa, Ethiopia</p>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 <button
// // //                   onClick={() =>
// // //                     window.open("https://maps.google.com", "_blank")
// // //                   }
// // //                   className="w-full mt-6 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 font-semibold flex items-center justify-center gap-2"
// // //                 >
// // //                   View on Google Maps
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default ContactPage;
// // import React, { useState, useEffect } from "react";
// // import { motion } from "framer-motion";
// // import toast from "react-hot-toast";
// // import {
// //   FaPhone,
// //   FaEnvelope,
// //   FaMapMarkerAlt,
// //   FaClock,
// //   FaPaperPlane,
// //   FaUser,
// //   FaTag,
// //   FaComment,
// //   FaBuilding,
// // } from "react-icons/fa";
// // import { fetchWithAuth } from "../utils/auth";

// // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // /* 🔥 SIMPLE REUSABLE ANIMATION */
// // const fadeUp = {
// //   hidden: { opacity: 0, y: 40 },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     transition: { duration: 0.6, ease: "easeOut" },
// //   },
// // };

// // const ContactPage = () => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     subject: "",
// //     message: "",
// //   });
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     const timer = setTimeout(() => setIsLoading(false), 800);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);

// //     try {
// //       const response = await fetchWithAuth(`${BACKEND_URL}/api/contact`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         toast.success("Message sent successfully!");
// //         setFormData({ name: "", email: "", subject: "", message: "" });
// //       } else {
// //         toast.error(data.message || "Failed to send message.");
// //       }
// //     } catch {
// //       toast.error("Network error.");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const contactInfo = [
// //     {
// //       icon: <FaPhone />,
// //       title: "Call Us",
// //       details: ["+251 96 462 3413", "+251 92 683 0205"],
// //       action: "tel:+251964623413",
// //     },
// //     {
// //       icon: <FaEnvelope />,
// //       title: "Email Us",
// //       details: [
// //         "worknehtesfamicael707@gmail.com",
// //         "biruktawithabtamu686@gmail.com",
// //       ],
// //       action: "mailto:worknehtesfamicael707@gmail.com",
// //     },
// //     {
// //       icon: <FaMapMarkerAlt />,
// //       title: "Visit Us",
// //       details: ["Platinum Plaza", "Front of EU Delegation"],
// //       action: "https://maps.google.com",
// //     },
// //     {
// //       icon: <FaClock />,
// //       title: "Hours",
// //       details: ["Mon-Fri: 9AM-6PM", "Sat-Sun: 10AM-4PM"],
// //       action: null,
// //     },
// //   ];

// //   return (
// //     <>
// //       {/* Loading */}
// //       {isLoading && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
// //           <div className="w-24 h-24 rounded-full border-4 border-t-[#D7C097] animate-spin" />
// //         </div>
// //       )}

// //       <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-12">
// //         <div className="max-w-7xl mx-auto px-4">
// //           {/* 🔥 HEADER */}
// //           <motion.div
// //             variants={fadeUp}
// //             initial="hidden"
// //             animate="visible"
// //             className="text-center mb-16"
// //           >
// //             <div className="inline-flex w-24 h-24 rounded-full bg-[#D7C097] items-center justify-center mb-6">
// //               <FaPaperPlane className="text-4xl text-white" />
// //             </div>

// //             <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100">
// //               Get in Touch
// //             </h1>

// //             <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
// //               Have questions? We're here to help.
// //             </p>
// //           </motion.div>

// //           {/* 🔥 CONTACT CARDS */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
// //             {contactInfo.map((info, index) => (
// //               <motion.div
// //                 key={index}
// //                 variants={fadeUp}
// //                 initial="hidden"
// //                 whileInView="visible"
// //                 viewport={{ once: true }}
// //                 transition={{ delay: index * 0.1 }}
// //                 className="p-8 rounded-3xl bg-white dark:bg-gray-800 border"
// //                 onClick={() =>
// //                   info.action && window.open(info.action, "_blank")
// //                 }
// //               >
// //                 <div className="w-16 h-16 rounded-full bg-[#D7C097] flex items-center justify-center mb-6 text-white text-2xl">
// //                   {info.icon}
// //                 </div>

// //                 <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
// //                   {info.title}
// //                 </h3>

// //                 {info.details.map((d, i) => (
// //                   <p key={i} className="text-gray-700 dark:text-gray-300">
// //                     {d}
// //                   </p>
// //                 ))}
// //               </motion.div>
// //             ))}
// //           </div>

// //           <div className="grid lg:grid-cols-3 gap-12">
// //             {/* 🔥 FORM */}
// //             <motion.div
// //               variants={fadeUp}
// //               initial="hidden"
// //               whileInView="visible"
// //               viewport={{ once: true }}
// //               className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-gray-800 border"
// //             >
// //               <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
// //                 Send us a Message
// //               </h2>

// //               <form onSubmit={handleSubmit} className="space-y-6">
// //                 <input
// //                   name="name"
// //                   placeholder="Your Name"
// //                   value={formData.name}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700"
// //                   required
// //                 />

// //                 <input
// //                   name="email"
// //                   type="email"
// //                   placeholder="Email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700"
// //                   required
// //                 />

// //                 <input
// //                   name="subject"
// //                   placeholder="Subject"
// //                   value={formData.subject}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700"
// //                   required
// //                 />

// //                 <textarea
// //                   name="message"
// //                   rows={5}
// //                   placeholder="Your Message"
// //                   value={formData.message}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700"
// //                   required
// //                 />

// //                 <button
// //                   type="submit"
// //                   disabled={isSubmitting}
// //                   className="w-full py-4 rounded-xl bg-[#D7C097] text-white font-bold"
// //                 >
// //                   {isSubmitting ? "Sending..." : "Send Message"}
// //                 </button>
// //               </form>
// //             </motion.div>

// //             {/* 🔥 OFFICE */}
// //             <motion.div
// //               variants={fadeUp}
// //               initial="hidden"
// //               whileInView="visible"
// //               viewport={{ once: true }}
// //               className="p-8 rounded-3xl bg-white dark:bg-gray-800 border"
// //             >
// //               <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
// //                 <FaBuilding className="text-[#D7C097]" /> Our Office
// //               </h3>

// //               <p className="text-gray-700 dark:text-gray-300">
// //                 Platinum Plaza
// //                 <br />
// //                 Addis Ababa, Ethiopia
// //               </p>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default ContactPage;
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import {
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaClock,
//   FaPaperPlane,
//   FaBuilding,
// } from "react-icons/fa";
// import { fetchWithAuth } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// /* =======================
//    ANIMATION VARIANTS
// ======================= */
// const fadeUp = {
//   hidden: { opacity: 0, y: 60 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
//   },
// };

// const container = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.15 },
//   },
// };

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetchWithAuth(`${BACKEND_URL}/api/contact`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Message sent successfully!");
//         setFormData({ name: "", email: "", subject: "", message: "" });
//       } else {
//         toast.error(data.message || "Failed to send message.");
//       }
//     } catch {
//       toast.error("Network error.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const contactInfo = [
//     {
//       icon: <FaPhone />,
//       title: "Call Us",
//       details: ["+251 96 462 3413", "+251 92 683 0205"],
//       action: "tel:+251964623413",
//     },
//     {
//       icon: <FaEnvelope />,
//       title: "Email Us",
//       details: [
//         "worknehtesfamicael707@gmail.com",
//         "biruktawithabtamu686@gmail.com",
//       ],
//       action: "mailto:worknehtesfamicael707@gmail.com",
//     },
//     {
//       icon: <FaMapMarkerAlt />,
//       title: "Visit Us",
//       details: ["Platinum Plaza", "Front of EU Delegation"],
//       action: "https://maps.google.com",
//     },
//     {
//       icon: <FaClock />,
//       title: "Hours",
//       details: ["Mon-Fri: 9AM-6PM", "Sat-Sun: 10AM-4PM"],
//       action: null,
//     },
//   ];

//   return (
//     <>
//       {/* Loading */}
//       {isLoading && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
//           <div className="w-24 h-24 rounded-full border-4 border-t-[#D7C097] animate-spin" />
//         </div>
//       )}

//       <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-12">
//         <div className="max-w-7xl mx-auto px-4">
//           {/* ================= HEADER ================= */}
//           <motion.div
//             className="text-center mb-16"
//             variants={container}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//           >
//             <motion.div
//               variants={fadeUp}
//               className="inline-flex w-24 h-24 rounded-full bg-[#D7C097] items-center justify-center mb-6"
//             >
//               <FaPaperPlane className="text-4xl text-white" />
//             </motion.div>

//             <motion.h1
//               variants={fadeUp}
//               className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100"
//             >
//               Get in Touch
//             </motion.h1>

//             <motion.p
//               variants={fadeUp}
//               className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
//             >
//               Have questions? We're here to help.
//             </motion.p>
//           </motion.div>

//           {/* ================= CONTACT CARDS ================= */}
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
//             variants={container}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//           >
//             {contactInfo.map((info, index) => (
//               <motion.div
//                 key={index}
//                 variants={fadeUp}
//                 whileHover={{ y: -6, scale: 1.03 }}
//                 transition={{ type: "spring", stiffness: 120 }}
//                 className="p-8 rounded-3xl bg-white dark:bg-gray-800 border cursor-pointer"
//                 onClick={() =>
//                   info.action && window.open(info.action, "_blank")
//                 }
//               >
//                 <div className="w-16 h-16 rounded-full bg-[#D7C097] flex items-center justify-center mb-6 text-white text-2xl">
//                   {info.icon}
//                 </div>

//                 <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
//                   {info.title}
//                 </h3>

//                 {info.details.map((d, i) => (
//                   <p key={i} className="text-gray-700 dark:text-gray-300">
//                     {d}
//                   </p>
//                 ))}
//               </motion.div>
//             ))}
//           </motion.div>

//           <div className="grid lg:grid-cols-3 gap-12">
//             {/* ================= FORM ================= */}
//             <motion.div
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.3 }}
//               className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-gray-800 border"
//             >
//               <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
//                 Send us a Message
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <input
//                   name="name"
//                   placeholder="Your Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D7C097]"
//                   required
//                 />

//                 <input
//                   name="email"
//                   type="email"
//                   placeholder="Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D7C097]"
//                   required
//                 />

//                 <input
//                   name="subject"
//                   placeholder="Subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D7C097]"
//                   required
//                 />

//                 <textarea
//                   name="message"
//                   rows={5}
//                   placeholder="Your Message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="w-full px-4 py-4 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D7C097]"
//                   required
//                 />

//                 <motion.button
//                   type="submit"
//                   disabled={isSubmitting}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full py-4 rounded-xl bg-[#D7C097] text-white font-bold"
//                 >
//                   {isSubmitting ? "Sending..." : "Send Message"}
//                 </motion.button>
//               </form>
//             </motion.div>

//             {/* ================= OFFICE ================= */}
//             <motion.div
//               variants={fadeUp}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.3 }}
//               className="p-8 rounded-3xl bg-white dark:bg-gray-800 border"
//             >
//               <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
//                 <FaBuilding className="text-[#D7C097]" /> Our Office
//               </h3>

//               <p className="text-gray-700 dark:text-gray-300">
//                 Platinum Plaza
//                 <br />
//                 Addis Ababa, Ethiopia
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactPage;
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaBuilding,
  FaStar,
  FaArrowRight,
  FaSpinner,
  FaHeart,
  FaUsers,
} from "react-icons/fa";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

/* =======================
   ANIMATION VARIANTS
======================= */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "backOut" },
  },
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 30 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -10,
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetchWithAuth(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Call Us",
      details: ["+251 96 462 3413", "+251 92 683 0205"],
      action: "tel:+251964623413",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      details: [
        "worknehtesfamicael707@gmail.com",
        "biruktawithabtamu686@gmail.com",
      ],
      action: "mailto:worknehtesfamicael707@gmail.com",
    },
  ];

  return (
    <>
      {/* Loading */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primaryBg dark:bg-dark">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-full border-4 border-lightBg/30 border-t-accent animate-spin" />
            <FaPaperPlane className="absolute inset-0 m-auto text-accent text-2xl" />
          </motion.div>
        </div>
      )}
      <div className="min-h-screen bg-primaryBg dark:bg-dark transition-colors duration-300 pt-24 mt-0">
        <div className="max-w-7xl mx-auto px-4">
          {/* ================= HEADER ================= */}
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              variants={scaleIn}
              className="inline-flex w-24 h-24 rounded-full bg-accent dark:bg-accent/80 items-center justify-center mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaPaperPlane className="text-4xl text-dark dark:text-white" />
              </motion.div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl lg:text-6xl font-bold mb-6 text-dark dark:text-white"
            >
              Get in{" "}
              <span className="text-accent dark:text-accent/80">Touch</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-dark/70 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Have questions? We're here to help and connect with you.
            </motion.p>
          </motion.div>

          {/* ================= CONTACT CARDS ================= */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                custom={index}
                className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-lightBg dark:border-lightBg/30 shadow-lg cursor-pointer group"
                onClick={() =>
                  info.action && window.open(info.action, "_blank")
                }
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-full bg-accent dark:bg-accent/80 flex items-center justify-center mb-6 text-dark dark:text-white text-2xl"
                >
                  {info.icon}
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold mb-3 text-dark dark:text-white"
                >
                  {info.title}
                </motion.h3>

                {info.details.map((d, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-dark/70 dark:text-gray-300 mb-1"
                  >
                    {d}
                  </motion.p>
                ))}

                {/* Arrow Indicator for clickable cards */}
                {info.action && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 flex items-center gap-2 text-accent dark:text-accent/80"
                  >
                    <span className="text-sm font-medium">
                      Click to connect
                    </span>
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* ================= FORM & OFFICE SECTION ================= */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* ================= FORM ================= */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:col-span-2 p-8 rounded-2xl bg-white dark:bg-gray-800 border border-lightBg dark:border-lightBg/30 shadow-lg"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="p-2 rounded-full bg-accent/20 dark:bg-accent/10">
                  <FaEnvelope className="text-accent dark:text-accent/80" />
                </div>
                <h2 className="text-3xl font-bold text-dark dark:text-white">
                  Send us a Message
                </h2>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { name: "name", type: "text", placeholder: "Your Name" },
                  {
                    name: "email",
                    type: "email",
                    placeholder: "Email Address",
                  },
                  { name: "subject", type: "text", placeholder: "Subject" },
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-xl bg-lightBg/30 dark:bg-gray-700/50 border border-lightBg/50 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent/80 transition-all duration-300"
                      required
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-xl bg-lightBg/30 dark:bg-gray-700/50 border border-lightBg/50 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent/80 transition-all duration-300"
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(255, 226, 175, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-accent dark:bg-accent/80 text-dark dark:text-white font-bold flex items-center justify-center gap-3 group transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FaPaperPlane className="group-hover:rotate-45 transition-transform duration-300" />
                      </motion.div>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* ================= OFFICE ================= */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-lightBg dark:border-lightBg/30 shadow-lg"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 rounded-full bg-accent dark:bg-accent/80 flex items-center justify-center mb-6"
              >
                <FaBuilding className="text-2xl text-dark dark:text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold mb-4 text-dark dark:text-white">
                Our Office Location
              </h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-dark/70 dark:text-gray-300 mb-6 leading-relaxed"
              >
                Platinum Plaza
                <br />
                Front of EU Delegation
                <br />
                Addis Ababa, Ethiopia
              </motion.p>

              {/* Office Hours */}
              <div className="p-4 rounded-xl bg-lightBg/30 dark:bg-gray-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <FaClock className="text-accent dark:text-accent/80" />
                  <span className="font-semibold text-dark dark:text-white">
                    Office Hours
                  </span>
                </div>
                <p className="text-dark/70 dark:text-gray-300">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>

              {/* Rating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lightBg dark:bg-lightBg/20"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-accent dark:text-accent/80 text-sm"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-dark dark:text-white">
                  4.9/5 Customer Rating
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ================= FULL WIDTH BOTTOM IMAGE ================= */}
        <div className="w-full h-[70vh] min-h-[500px] relative overflow-hidden">
          {/* Background Image - photshoot1.jpg */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url("/photoshoot1.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed", // Creates parallax effect
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-dark/70" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />

            {/* Animated Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{
                    y: -100,
                    opacity: [0, 0.8, 0],
                    x: Math.random() * 50 - 25,
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-1 h-1 bg-accent/60 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: "0%",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex items-center justify-center px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                variants={scaleIn}
                className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <FaHeart className="text-accent dark:text-accent/80" />
                <span className="text-white font-medium tracking-wider">
                  CONNECT WITH US
                </span>
                <FaUsers className="text-accent dark:text-accent/80" />
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
              >
                Let's Create Something
                <span className="block text-accent dark:text-accent/80 mt-4">
                  Beautiful Together
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-lg text-gray-200 max-w-2xl mx-auto mb-8"
              >
                Your vision, our expertise. Let's work together to bring your
                beauty dreams to life.
              </motion.p>

              {/* Contact Stats */}
              <motion.div
                variants={containerVariants}
                className="flex flex-wrap justify-center gap-8 mt-12"
              >
                {[
                  { value: "24/7", label: "Support", icon: <FaPhone /> },
                  { value: "100%", label: "Satisfaction", icon: <FaHeart /> },
                  { value: "<1h", label: "Response Time", icon: <FaClock /> },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {stat.icon}
                      <div className="text-3xl font-bold text-white">
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Call to Action Button */}
              <motion.button
                variants={fadeUp}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 40px rgba(255, 226, 175, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .querySelector("form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-10 px-8 py-4 rounded-xl bg-accent dark:bg-accent/80 text-dark dark:text-white font-bold text-lg flex items-center gap-3 mx-auto group transition-all duration-300"
              >
                <span>Start Your Journey</span>
                <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
