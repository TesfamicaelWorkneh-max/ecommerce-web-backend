// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import {
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaClock,
//   FaPaperPlane,
//   FaUser,
//   FaTag,
//   FaComment,
//   FaCheckCircle,
// } from "react-icons/fa";
// import { IoChatbubbleEllipses } from "react-icons/io5";
// import { fetchWithAuth } from "../utils/auth";
// const BACKEND_URL = import.meta.env.VITE_API_URL;
// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

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
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Message sent successfully! We'll get back to you soon.");
//         setFormData({ name: "", email: "", subject: "", message: "" });
//       } else {
//         toast.error(
//           data.message || "Failed to send message. Please try again."
//         );
//       }
//     } catch (error) {
//       toast.error("Network error. Please check your connection.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const contactInfo = [
//     {
//       icon: <FaPhone />,
//       title: "Call Us",
//       details: ["+251964623413", "+251926830205"],
//       color: "from-blue-500 to-cyan-500",
//       action: "tel:+15551234567",
//     },
//     {
//       icon: <FaEnvelope />,
//       title: "Email Us",
//       details: [
//         "worknehtesfamicael707@gmail.com",
//         "biruktawithabtamu686@gmail.com",
//       ],
//       color: "from-purple-500 to-pink-500",
//       action: "mailto:worknehtesfamicael707@gmail.com",
//     },
//     {
//       icon: <FaMapMarkerAlt />,
//       title: "Visit Us",
//       details: ["Platinum Plaza", ",Front of EU deligation"],
//       color: "from-green-500 to-emerald-500",
//       action: "https://maps.google.com",
//     },
//     {
//       icon: <FaClock />,
//       title: "Hours",
//       details: ["Mon-Fri: 9AM-6PM PST", "Sat-Sun: 10AM-4PM PST"],
//       color: "from-amber-500 to-orange-500",
//       action: null,
//     },
//   ];

//   const faqs = [
//     {
//       q: "How quickly will I get a response?",
//       a: "We respond to all inquiries within 24 hours during business days.",
//     },
//     {
//       q: "Do you have phone support?",
//       a: "Yes! Call us anytime between 9AM-6PM PST, Monday through Friday.",
//     },
//     {
//       q: "Can I visit your office?",
//       a: "Our office is open for appointments. Please contact us to schedule a visit.",
//     },
//     {
//       q: "Do you offer bulk order support?",
//       a: "Absolutely! Contact our sales team for bulk orders and corporate discounts.",
//     },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95 py-12"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <motion.div
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 mb-6"
//           >
//             <IoChatbubbleEllipses className="text-3xl text-white" />
//           </motion.div>
//           <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
//             Get in Touch
//           </h1>
//           <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
//             Have questions? We're here to help. Reach out anytime!
//           </p>
//         </div>

//         {/* Contact Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//           {contactInfo.map((info, index) => (
//             <motion.a
//               key={index}
//               href={info.action || "#"}
//               target={info.action ? "_blank" : "_self"}
//               rel="noopener noreferrer"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{ y: -5 }}
//               className={`block p-6 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 ${
//                 !info.action ? "cursor-default" : ""
//               }`}
//             >
//               <div
//                 className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${info.color} mb-4`}
//               >
//                 <div className="text-xl text-white">{info.icon}</div>
//               </div>
//               <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
//                 {info.title}
//               </h3>
//               {info.details.map((detail, idx) => (
//                 <p key={idx} className="text-slate-600 dark:text-slate-400">
//                   {detail}
//                 </p>
//               ))}
//             </motion.a>
//           ))}
//         </div>

//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* Contact Form */}
//           <motion.div
//             initial={{ x: -30, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             className="lg:col-span-2"
//           >
//             <div className="p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg">
//               <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
//                 Send us a Message
//               </h2>
//               <p className="text-slate-600 dark:text-slate-400 mb-8">
//                 Fill out the form below and we'll get back to you as soon as
//                 possible.
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-2">
//                       <FaUser className="text-amber-500" />
//                       Your Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300"
//                       placeholder="John Doe"
//                     />
//                   </div>
//                   <div>
//                     <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-2">
//                       <FaEnvelope className="text-amber-500" />
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300"
//                       placeholder="john@example.com"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-2">
//                     <FaTag className="text-amber-500" />
//                     Subject
//                   </label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300"
//                     placeholder="How can we help you?"
//                   />
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-2">
//                     <FaComment className="text-amber-500" />
//                     Your Message
//                   </label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows={6}
//                     className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300 resize-none"
//                     placeholder="Tell us more about your inquiry..."
//                   />
//                 </div>

//                 <motion.button
//                   type="submit"
//                   disabled={isSubmitting}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <FaPaperPlane />
//                       Send Message
//                     </>
//                   )}
//                 </motion.button>
//               </form>
//             </div>
//           </motion.div>

//           {/* FAQ Sidebar */}
//           <motion.div
//             initial={{ x: 30, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             className="space-y-6"
//           >
//             {/* FAQ Section */}
//             <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 dark:border-blue-500/30 backdrop-blur-xl">
//               <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
//                 Common Questions
//               </h3>
//               <div className="space-y-6">
//                 {faqs.map((faq, index) => (
//                   <div
//                     key={index}
//                     className="pb-6 border-b border-slate-200/20 dark:border-slate-700/30 last:border-0 last:pb-0"
//                   >
//                     <h4 className="font-bold text-slate-800 dark:text-white mb-2">
//                       {faq.q}
//                     </h4>
//                     <p className="text-slate-600 dark:text-slate-400">
//                       {faq.a}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Guarantee Section */}
//             <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-green-500/5 border border-emerald-500/20 dark:border-emerald-500/30 backdrop-blur-xl">
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0">
//                   <FaCheckCircle className="text-xl text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
//                     24-Hour Response Guarantee
//                   </h3>
//                   <p className="text-slate-600 dark:text-slate-400">
//                     We promise to respond to all inquiries within 24 hours
//                     during business days.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Live Chat */}
//             <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 dark:border-purple-500/30 backdrop-blur-xl">
//               <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
//                 Need Immediate Help?
//               </h3>
//               <p className="text-slate-600 dark:text-slate-400 mb-6">
//                 Chat with our support team in real-time
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
//               >
//                 Start Live Chat
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>

//         {/* Map Section */}
//         <motion.div
//           initial={{ y: 40, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="mt-16"
//         >
//           <div className="p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg">
//             <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
//               Find Our Office
//             </h2>
//             <div className="h-96 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
//               <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center mx-auto mb-4">
//                     <FaMapMarkerAlt className="text-2xl text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
//                     123 Premium Street
//                   </h3>
//                   <p className="text-slate-600 dark:text-slate-400">
//                     Platinium Plaza,Addis Abeba,Front Of EU Delalligation
//                   </p>
//                   <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">
//                     (Map integration available with Google Maps API)
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default ContactPage;
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaUser,
  FaTag,
  FaComment,
  FaCheckCircle,
  FaChevronUp,
  FaHeadset,
  FaBuilding,
  FaGlobe,
} from "react-icons/fa";
import { IoChatbubbleEllipses, IoLogoWhatsapp } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Check system theme
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Enhanced scroll animation with momentum
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = lastScrollY;
          const maxScroll = document.body.scrollHeight - window.innerHeight;
          const progress = (scrolled / maxScroll) * 100;
          setScrollProgress(progress);
          setIsScrolling(scrolled > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Success animation
        const form = e.target;
        form.classList.add("success-animation");
        setTimeout(() => {
          form.classList.remove("success-animation");
        }, 2000);
      } else {
        toast.error(
          data.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      toast.error("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Call Us",
      details: ["+251 96 462 3413", "+251 92 683 0205"],
      color: "from-blue-500 to-cyan-500",
      action: "tel:+251964623413",
      delay: 0.1,
      rotation: 5,
    },
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      details: [
        "worknehtesfamicael707@gmail.com",
        "biruktawithabtamu686@gmail.com",
      ],
      color: "from-purple-500 to-pink-500",
      action: "mailto:worknehtesfamicael707@gmail.com",
      delay: 0.2,
      rotation: -3,
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Us",
      details: ["Platinum Plaza", "Front of EU Delegation"],
      color: "from-green-500 to-emerald-500",
      action: "https://maps.google.com",
      delay: 0.3,
      rotation: 2,
    },
    {
      icon: <FaClock />,
      title: "Hours",
      details: ["Mon-Fri: 9AM-6PM", "Sat-Sun: 10AM-4PM"],
      color: "from-amber-500 to-orange-500",
      action: null,
      delay: 0.4,
      rotation: -5,
    },
  ];

  const faqs = [
    {
      q: "How quickly will I get a response?",
      a: "We respond to all inquiries within 24 hours during business days.",
      delay: 0.1,
    },
    {
      q: "Do you have phone support?",
      a: "Yes! Call us anytime between 9AM-6PM, Monday through Friday.",
      delay: 0.2,
    },
    {
      q: "Can I visit your office?",
      a: "Our office is open for appointments. Please contact us to schedule a visit.",
      delay: 0.3,
    },
    {
      q: "Do you offer bulk order support?",
      a: "Absolutely! Contact our sales team for bulk orders and corporate discounts.",
      delay: 0.4,
    },
  ];

  const socialContacts = [
    {
      icon: <IoLogoWhatsapp />,
      label: "WhatsApp",
      color: "from-green-500 to-emerald-500",
      delay: 0.1,
    },
    {
      icon: <FaHeadset />,
      label: "Live Chat",
      color: "from-purple-500 to-pink-500",
      delay: 0.2,
    },
    {
      icon: <MdSupportAgent />,
      label: "Support",
      color: "from-blue-500 to-cyan-500",
      delay: 0.3,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, rotateX: 10 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  };

  return (
    <>
      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-cream-50 to-cream-100 dark:from-gray-900 dark:to-gray-800"
          >
            <div className="relative">
              <motion.div
                animate={pulseAnimation}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
              />
              <motion.div
                animate={floatingAnimation}
                className="absolute inset-0 flex items-center justify-center"
              >
                <IoChatbubbleEllipses className="text-4xl text-white" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12 overflow-hidden relative"
      >
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-amber-400/5 to-orange-500/5 dark:from-purple-600/5 dark:to-pink-600/5"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: Math.random() * 0.3 + 0.3,
                opacity: Math.random() * 0.2 + 0.1,
              }}
              animate={{
                y: [
                  null,
                  `calc(${Math.random() * 100}% + ${Math.random() * 50 - 25}px)`,
                ],
                x: [
                  null,
                  `calc(${Math.random() * 100}% + ${Math.random() * 50 - 25}px)`,
                ],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
              }}
            />
          ))}
        </div>

        {/* Enhanced Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 h-1.5 z-40"
          style={{ width: `${scrollProgress}%` }}
          animate={{
            background: [
              "linear-gradient(90deg, #f59e0b, #f97316, #f59e0b)",
              "linear-gradient(90deg, #f97316, #f59e0b, #f97316)",
              "linear-gradient(90deg, #f59e0b, #f97316, #f59e0b)",
            ],
            backgroundSize: "200% 100%",
            boxShadow: "0 0 20px rgba(245, 158, 11, 0.5)",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Back to Top Button */}
        <AnimatePresence>
          {isScrolling && (
            <motion.button
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                },
              }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              whileHover={{
                scale: 1.1,
                rotate: 360,
                boxShadow: "0 0 30px rgba(245, 158, 11, 0.5)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-3xl transition-all duration-300 group"
            >
              <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <FaChevronUp className="w-6 h-6 relative" />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16 relative"
          >
            <div className="relative inline-block">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  },
                }}
                whileHover={{ scale: 1.1, rotate: 360 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mb-6 shadow-2xl group relative"
              >
                <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                <motion.div animate={floatingAnimation}>
                  <IoChatbubbleEllipses className="text-4xl text-white relative" />
                </motion.div>
              </motion.div>

              {/* Orbiting circles */}
              {[0, 120, 240].map((rotation, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  animate={{
                    rotate: rotation,
                    x: [0, 60 * Math.cos((rotation * Math.PI) / 180), 0],
                    y: [0, 60 * Math.sin((rotation * Math.PI) / 180), 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  style={{
                    top: "50%",
                    left: "50%",
                    marginLeft: -8,
                    marginTop: -8,
                  }}
                />
              ))}
            </div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-bold mb-6 relative"
            >
              <span className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
                Get in Touch
              </span>
              <motion.span
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl text-amber-800/80 dark:text-purple-300 max-w-3xl mx-auto"
            >
              Have questions? We're here to help. Reach out anytime!
            </motion.p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={{
                  hidden: {
                    y: 50,
                    opacity: 0,
                    scale: 0.8,
                    rotate: info.rotation,
                  },
                  visible: {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                      delay: info.delay,
                    },
                  },
                }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  rotate: info.rotation,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                whileTap={{ scale: 0.95 }}
                className={`p-8 rounded-3xl bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-amber-100 dark:border-purple-900/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group ${
                  info.action ? "cursor-pointer" : "cursor-default"
                }`}
                onClick={() =>
                  info.action && window.open(info.action, "_blank")
                }
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: info.delay + 0.2, type: "spring" }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${info.color} mb-6 relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                >
                  <motion.div
                    animate={floatingAnimation}
                    className="text-2xl text-white"
                  >
                    {info.icon}
                  </motion.div>
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: info.delay + 0.3 }}
                  className="text-xl font-bold text-amber-900 dark:text-white mb-3"
                >
                  {info.title}
                </motion.h3>

                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: info.delay + 0.4 + idx * 0.1 }}
                      className="text-amber-700 dark:text-purple-300"
                    >
                      {detail}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                delay: 0.2,
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-2"
            >
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-amber-100 dark:border-purple-900/50 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-2xl" />

                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-amber-900 dark:text-white mb-2"
                >
                  Send us a Message
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-amber-700 dark:text-purple-300 mb-8"
                >
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </motion.p>

                <form onSubmit={handleSubmit} className="space-y-6 relative">
                  {/* Floating particles in form */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-amber-400/30"
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="flex items-center gap-2 text-amber-800 dark:text-purple-300 mb-3 font-medium">
                        <motion.div
                          animate={pulseAnimation}
                          className="flex-shrink-0"
                        >
                          <FaUser className="text-amber-500" />
                        </motion.div>
                        Your Name
                      </label>
                      <motion.input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        whileFocus={{ scale: 1.02 }}
                        className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-cream-50 to-cream-100 dark:from-gray-800/50 dark:to-gray-900/50 border border-amber-200 dark:border-purple-900/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300 text-amber-800 dark:text-purple-200 placeholder-amber-400/50 dark:placeholder-purple-400/30"
                        placeholder="John Doe"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="flex items-center gap-2 text-amber-800 dark:text-purple-300 mb-3 font-medium">
                        <motion.div
                          animate={pulseAnimation}
                          transition={{ delay: 0.5 }}
                          className="flex-shrink-0"
                        >
                          <FaEnvelope className="text-amber-500" />
                        </motion.div>
                        Email Address
                      </label>
                      <motion.input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        whileFocus={{ scale: 1.02 }}
                        className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-cream-50 to-cream-100 dark:from-gray-800/50 dark:to-gray-900/50 border border-amber-200 dark:border-purple-900/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300 text-amber-800 dark:text-purple-200 placeholder-amber-400/50 dark:placeholder-purple-400/30"
                        placeholder="john@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="flex items-center gap-2 text-amber-800 dark:text-purple-300 mb-3 font-medium">
                      <motion.div
                        animate={pulseAnimation}
                        transition={{ delay: 0.6 }}
                        className="flex-shrink-0"
                      >
                        <FaTag className="text-amber-500" />
                      </motion.div>
                      Subject
                    </label>
                    <motion.input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      whileFocus={{ scale: 1.02 }}
                      className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-cream-50 to-cream-100 dark:from-gray-800/50 dark:to-gray-900/50 border border-amber-200 dark:border-purple-900/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300 text-amber-800 dark:text-purple-200 placeholder-amber-400/50 dark:placeholder-purple-400/30"
                      placeholder="How can we help you?"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label className="flex items-center gap-2 text-amber-800 dark:text-purple-300 mb-3 font-medium">
                      <motion.div
                        animate={pulseAnimation}
                        transition={{ delay: 0.7 }}
                        className="flex-shrink-0"
                      >
                        <FaComment className="text-amber-500" />
                      </motion.div>
                      Your Message
                    </label>
                    <motion.textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      whileFocus={{ scale: 1.01 }}
                      className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-cream-50 to-cream-100 dark:from-gray-800/50 dark:to-gray-900/50 border border-amber-200 dark:border-purple-900/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300 text-amber-800 dark:text-purple-200 placeholder-amber-400/50 dark:placeholder-purple-400/30 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    animate={isSubmitting ? undefined : pulseAnimation}
                    className="w-full py-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                    {/* Button shine effect */}
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {isSubmitting ? (
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <motion.div animate={floatingAnimation}>
                        <FaPaperPlane className="text-xl" />
                      </motion.div>
                    )}
                    <span className="relative z-10">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                delay: 0.3,
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              {/* Quick Connect */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-500/20 dark:border-blue-500/30 backdrop-blur-xl shadow-xl"
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-bold text-amber-900 dark:text-white mb-6"
                >
                  Quick Connect
                </motion.h3>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {socialContacts.map((contact, index) => (
                    <motion.button
                      key={index}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: contact.delay }}
                      whileHover={{
                        y: -5,
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 400 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`aspect-square rounded-2xl bg-gradient-to-r ${contact.color} flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="text-2xl mb-1">{contact.icon}</div>
                      <span className="text-xs font-medium">
                        {contact.label}
                      </span>
                    </motion.button>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-amber-700 dark:text-purple-300 text-sm"
                >
                  Connect with us instantly
                </motion.p>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-amber-100 dark:border-purple-900/50 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl" />

                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-2xl font-bold text-amber-900 dark:text-white mb-6"
                >
                  Common Questions
                </motion.h3>

                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: faq.delay }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                      className="pb-6 border-b border-amber-100/50 dark:border-purple-900/30 last:border-0 last:pb-0"
                    >
                      <motion.h4
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: faq.delay + 0.1 }}
                        className="font-bold text-lg text-amber-900 dark:text-white mb-2"
                      >
                        {faq.q}
                      </motion.h4>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: faq.delay + 0.2 }}
                        className="text-amber-700 dark:text-purple-300"
                      >
                        {faq.a}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Guarantee Section */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-500/20 dark:border-emerald-500/30 backdrop-blur-xl shadow-xl relative overflow-hidden"
              >
                <motion.div
                  animate={rotateAnimation}
                  className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-full"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={pulseAnimation}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center"
                    >
                      <FaCheckCircle className="text-xl text-white" />
                    </motion.div>
                  </div>
                  <div>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-xl font-bold text-amber-900 dark:text-white mb-2"
                    >
                      24-Hour Response Guarantee
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="text-amber-700 dark:text-purple-300"
                    >
                      We promise to respond to all inquiries within 24 hours
                      during business days.
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.7,
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-amber-100 dark:border-purple-900/50 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />

              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-3xl font-bold text-amber-900 dark:text-white mb-6 flex items-center gap-3"
              >
                <FaBuilding className="text-amber-500" />
                Find Our Office
              </motion.h2>

              <div className="h-96 rounded-2xl overflow-hidden border border-amber-200 dark:border-purple-900/50 shadow-lg relative">
                {/* Animated map placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-cream-50 to-cream-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
                  {/* Animated grid background */}
                  <div className="absolute inset-0 opacity-10">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-full bg-amber-500"
                        style={{ left: `${i * 5}%` }}
                      />
                    ))}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute h-0.5 w-full bg-amber-500"
                        style={{ top: `${i * 5}%` }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.9, type: "spring" }}
                      className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-2xl"
                    >
                      <motion.div animate={floatingAnimation}>
                        <FaMapMarkerAlt className="text-2xl text-white" />
                      </motion.div>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="text-2xl font-bold text-amber-900 dark:text-white mb-2"
                    >
                      Platinum Plaza
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                      className="text-lg text-amber-700 dark:text-purple-300 mb-1"
                    >
                      Front of EU Delegation
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="text-amber-600 dark:text-purple-400"
                    >
                      Addis Ababa, Ethiopia
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      className="mt-6"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-2 mx-auto"
                      >
                        <FaGlobe className="text-lg" />
                        View on Google Maps
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Animated marker pins */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                      animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${40 + i * 10}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Banner */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.9,
            }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-amber-900/20 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-xl shadow-xl text-center relative overflow-hidden">
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(245, 158, 11, 0.1), rgba(249, 115, 22, 0.1), rgba(245, 158, 11, 0.1))",
                    "linear-gradient(45deg, rgba(249, 115, 22, 0.1), rgba(245, 158, 11, 0.1), rgba(249, 115, 22, 0.1))",
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              <motion.div
                animate={floatingAnimation}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mb-6"
              >
                <IoChatbubbleEllipses className="text-2xl text-white" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-2xl lg:text-3xl font-bold text-amber-900 dark:text-white mb-4"
              >
                Ready to Start a Conversation?
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-lg text-amber-700 dark:text-purple-300 max-w-2xl mx-auto mb-8"
              >
                Whether you have questions, feedback, or partnership inquiries,
                we're here to listen and help you succeed.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 inline-flex items-center gap-3"
                onClick={() => {
                  const formSection = document.querySelector("form");
                  formSection?.scrollIntoView({ behavior: "smooth" });
                  document.querySelector('input[name="name"]')?.focus();
                }}
              >
                <FaPaperPlane />
                Send Us a Message
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Custom CSS for form success animation */}
        <style jsx>{`
          .success-animation {
            animation: successPulse 2s ease-in-out;
          }

          @keyframes successPulse {
            0% {
              box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
            }
            70% {
              box-shadow: 0 0 0 20px rgba(34, 197, 94, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
            }
          }
        `}</style>
      </motion.div>
    </>
  );
};

export default ContactPage;
