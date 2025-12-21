import React from "react";
import { motion } from "framer-motion";
import {
  FaTruck,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaGlobeAmericas,
  FaMoneyBillWave,
} from "react-icons/fa";

const ShippingInfoPage = () => {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "3-7 Business Days",
      price: "Free on orders over $50",
      icon: <FaTruck />,
      color: "from-blue-500 to-cyan-500",
      features: ["Tracking included", "3-7 business days", "Free over $50"],
    },
    {
      name: "Express Shipping",
      time: "1-3 Business Days",
      price: "$9.99",
      icon: <FaBoxOpen />,
      color: "from-green-500 to-emerald-500",
      features: [
        "Priority handling",
        "1-3 business days",
        "Saturday delivery available",
      ],
    },
    {
      name: "Overnight Shipping",
      time: "Next Day",
      price: "$19.99",
      icon: <FaClock />,
      color: "from-purple-500 to-pink-500",
      features: [
        "Next business day",
        "Order by 2 PM EST",
        "Signature required",
      ],
    },
  ];

  const shippingFeatures = [
    {
      title: "Real-Time Tracking",
      description: "Track your order from warehouse to doorstep",
      icon: <FaMapMarkerAlt />,
      color: "bg-gradient-to-r from-blue-500/10 to-blue-600/10",
    },
    {
      title: "Global Shipping",
      description: "We ship to 50+ countries worldwide",
      icon: <FaGlobeAmericas />,
      color: "bg-gradient-to-r from-green-500/10 to-emerald-600/10",
    },
    {
      title: "Secure Delivery",
      description: "Signature confirmation available for all orders",
      icon: <FaShieldAlt />,
      color: "bg-gradient-to-r from-purple-500/10 to-pink-600/10",
    },
    {
      title: "Free Returns",
      description: "Easy returns with prepaid labels",
      icon: <FaMoneyBillWave />,
      color: "bg-gradient-to-r from-amber-500/10 to-orange-600/10",
    },
  ];

  const faqs = [
    {
      q: "How long does shipping take?",
      a: "Standard shipping takes 3-7 business days. Express takes 1-3 business days. Overnight delivers next business day.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes, we ship to 50+ countries. International delivery takes 7-14 business days with full tracking.",
    },
    {
      q: "Can I track my order?",
      a: "Yes! You'll receive a tracking number via email once your order ships. Track it directly from your account.",
    },
    {
      q: "What are the shipping costs?",
      a: "Free on domestic orders over $50. International shipping starts at $14.99. Express and overnight available.",
    },
    {
      q: "Do you offer Saturday delivery?",
      a: "Yes, Saturday delivery is available for express and overnight shipping options.",
    },
    {
      q: "Can I change my shipping address?",
      a: "Address changes can be made within 1 hour of ordering. Contact support immediately if you need changes.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95 py-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-6"
          >
            <FaTruck className="text-3xl text-white" />
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Shipping Information
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Fast, reliable delivery to your doorstep
          </p>
        </div>

        {/* Shipping Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 text-center">
            Choose Your Delivery Option
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${option.color} mb-6`}
                >
                  <div className="text-2xl text-white">{option.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  {option.name}
                </h3>
                <div className="text-amber-600 dark:text-amber-400 font-bold text-xl mb-4">
                  {option.price}
                </div>
                <div className="text-slate-600 dark:text-slate-400 mb-6">
                  {option.time}
                </div>
                <ul className="space-y-2">
                  {option.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-slate-600 dark:text-slate-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {shippingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl ${feature.color} border border-white/20 dark:border-slate-700/50`}
            >
              <div className="text-2xl text-slate-800 dark:text-white mb-4">
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg"
              >
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">
                  {faq.q}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/5 to-rose-500/5 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-xl"
        >
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            Important Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white mb-2">
                Processing Time
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Orders process within 24-48 hours, excluding weekends and
                holidays.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white mb-2">
                Delivery Estimates
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Delivery times are estimates and may vary based on location and
                carrier.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white mb-2">
                Contact Us
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Questions? Email support@luxecart.com or call 1-800-SHIPPING.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ShippingInfoPage;
