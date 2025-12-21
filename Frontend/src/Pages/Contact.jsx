import React, { useState } from "react";
import { motion } from "framer-motion";
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
} from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
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
      details: ["+251964623413", "+251926830205"],
      color: "from-blue-500 to-cyan-500",
      action: "tel:+15551234567",
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
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Us",
      details: ["Platinum Plaza", ",Front of EU deligation"],
      color: "from-green-500 to-emerald-500",
      action: "https://maps.google.com",
    },
    {
      icon: <FaClock />,
      title: "Hours",
      details: ["Mon-Fri: 9AM-6PM PST", "Sat-Sun: 10AM-4PM PST"],
      color: "from-amber-500 to-orange-500",
      action: null,
    },
  ];

  const faqs = [
    {
      q: "How quickly will I get a response?",
      a: "We respond to all inquiries within 24 hours during business days.",
    },
    {
      q: "Do you have phone support?",
      a: "Yes! Call us anytime between 9AM-6PM PST, Monday through Friday.",
    },
    {
      q: "Can I visit your office?",
      a: "Our office is open for appointments. Please contact us to schedule a visit.",
    },
    {
      q: "Do you offer bulk order support?",
      a: "Absolutely! Contact our sales team for bulk orders and corporate discounts.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 mb-6"
          >
            <IoChatbubbleEllipses className="text-3xl text-white" />
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out anytime!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.action || "#"}
              target={info.action ? "_blank" : "_self"}
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`block p-6 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 ${
                !info.action ? "cursor-default" : ""
              }`}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${info.color} mb-4`}
              >
                <div className="text-xl text-white">{info.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                {info.title}
              </h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-slate-600 dark:text-slate-400">
                  {detail}
                </p>
              ))}
            </motion.a>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-2"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                Send us a Message
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-2">
                      <FaUser className="text-amber-500" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-2">
                      <FaEnvelope className="text-amber-500" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-2">
                    <FaTag className="text-amber-500" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-2">
                    <FaComment className="text-amber-500" />
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* FAQ Sidebar */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            {/* FAQ Section */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 dark:border-blue-500/30 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                Common Questions
              </h3>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="pb-6 border-b border-slate-200/20 dark:border-slate-700/30 last:border-0 last:pb-0"
                  >
                    <h4 className="font-bold text-slate-800 dark:text-white mb-2">
                      {faq.q}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee Section */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-green-500/5 border border-emerald-500/20 dark:border-emerald-500/30 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center flex-shrink-0">
                  <FaCheckCircle className="text-xl text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    24-Hour Response Guarantee
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    We promise to respond to all inquiries within 24 hours
                    during business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Live Chat */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 dark:border-purple-500/30 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                Need Immediate Help?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Chat with our support team in real-time
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
              >
                Start Live Chat
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
              Find Our Office
            </h2>
            <div className="h-96 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center mx-auto mb-4">
                    <FaMapMarkerAlt className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    123 Premium Street
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Platinium Plaza,Addis Abeba,Front Of EU Delalligation
                  </p>
                  <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">
                    (Map integration available with Google Maps API)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
