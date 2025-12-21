import React from "react";
import { motion } from "framer-motion";
import {
  FaUndo,
  FaCalendarAlt,
  FaBox,
  FaShippingFast,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const ReturnPolicyPage = () => {
  const policyPoints = [
    {
      title: "30-Day Return Window",
      description:
        "Return any item within 30 days of delivery for a full refund.",
      icon: <FaCalendarAlt />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Free Returns",
      description: "We provide prepaid return labels for all eligible items.",
      icon: <FaShippingFast />,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Full Refund",
      description:
        "Receive your refund within 3-5 business days after we receive your return.",
      icon: <FaMoneyBillWave />,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Easy Process",
      description: "Initiate returns directly from your account dashboard.",
      icon: <FaUndo />,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const conditions = [
    { text: "Item must be unused and in original condition", valid: true },
    { text: "All original tags and packaging must be included", valid: true },
    {
      text: "Return must be initiated within 30 days of delivery",
      valid: true,
    },
    { text: "Final sale items marked 'Non-Returnable'", valid: false },
    { text: "Items without original packaging", valid: false },
    { text: "Personalized or customized products", valid: false },
  ];

  const processSteps = [
    "Login to your account and go to 'My Orders'",
    "Select the item you want to return",
    "Choose return reason and print prepaid label",
    "Pack item securely with all accessories",
    "Drop off at any carrier location",
    "Track return status in your account",
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
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 mb-6"
          >
            <FaUndo className="text-3xl text-white" />
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Return Policy
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Simple, hassle-free returns. Your satisfaction is guaranteed.
          </p>
        </div>

        {/* Policy Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {policyPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${point.color} mb-4`}
              >
                {point.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                {point.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Eligibility Conditions */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                Return Eligibility
              </h2>
              <div className="space-y-4">
                {conditions.map((condition, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`mt-1 ${condition.valid ? "text-green-500" : "text-rose-500"}`}
                    >
                      {condition.valid ? <FaCheckCircle /> : <FaTimesCircle />}
                    </div>
                    <span
                      className={
                        condition.valid
                          ? "text-slate-700 dark:text-slate-300"
                          : "text-slate-500 dark:text-slate-500"
                      }
                    >
                      {condition.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Refund Info */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/5 to-rose-500/5 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                Refund Information
              </h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>• Refunds processed within 3-5 business days</li>
                <li>• Original payment method will be credited</li>
                <li>
                  • Shipping costs are non-refundable unless error is on our
                  part
                </li>
                <li>• Sale items eligible for return or exchange</li>
              </ul>
            </div>
          </motion.div>

          {/* Return Process */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                How to Return
              </h2>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 dark:border-blue-500/30 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                Need Help?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Contact our support team for return assistance
              </p>
              <div className="space-y-2">
                <p className="text-slate-700 dark:text-slate-300">
                  📧 support@luxecart.com
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  📞 1-800-RETURNS
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  💬 Live Chat available 24/7
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReturnPolicyPage;
