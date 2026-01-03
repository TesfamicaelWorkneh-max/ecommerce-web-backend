import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaTruck,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaGlobeAmericas,
  FaMoneyBillWave,
  FaCheckCircle,
  FaArrowRight,
  FaShippingFast,
  FaWarehouse,
  FaUsers,
  FaLeaf,
} from "react-icons/fa";

const ShippingInfoPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const shippingOptions = [
    {
      name: "Standard Delivery",
      time: "3-7 Business Days",
      price: "Free on orders over $50",
      icon: <FaTruck />,
      color: "from-[#D7C097] to-[#B8A36F]",
      features: ["Tracking included", "3-7 business days", "Free over $50"],
      delay: 0.1,
    },
    {
      name: "Express Delivery",
      time: "1-3 Business Days",
      price: "$9.99",
      icon: <FaBoxOpen />,
      color: "from-[#A38C5C] to-[#D7C097]",
      features: ["Priority handling", "1-3 business days", "Saturday delivery"],
      delay: 0.2,
    },
    {
      name: "Overnight",
      time: "Next Day",
      price: "$19.99",
      icon: <FaClock />,
      color: "from-[#B8A36F] to-[#A38C5C]",
      features: [
        "Next business day",
        "Order by 2 PM EST",
        "Signature required",
      ],
      delay: 0.3,
    },
  ];

  const shippingFeatures = [
    {
      title: "Real-Time Tracking",
      description: "Monitor your package from warehouse to doorstep",
      icon: <FaMapMarkerAlt />,
      delay: 0.2,
    },
    {
      title: "Secure Delivery",
      description: "Signature confirmation and secure packaging",
      icon: <FaShieldAlt />,
      delay: 0.3,
    },
    {
      title: "Easy Returns",
      description: "30-day return policy with prepaid labels",
      icon: <FaMoneyBillWave />,
      delay: 0.4,
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Order Processing",
      description: "Orders are processed within 24-48 hours",
      icon: <FaCheckCircle />,
    },
    {
      step: "02",
      title: "Quality Check",
      description: "Every product undergoes thorough inspection",
      icon: <FaLeaf />,
    },
    {
      step: "03",
      title: "Packaging",
      description: "Eco-friendly, secure packaging for your items",
      icon: <FaBoxOpen />,
    },
    {
      step: "04",
      title: "Dispatch",
      description: "Handed to our trusted delivery partners",
      icon: <FaShippingFast />,
    },
  ];

  const faqs = [
    {
      q: "How long does shipping take?",
      a: "Standard shipping takes 3-7 business days. Express takes 1-3 business days. Overnight delivers next business day.",
    },

    {
      q: "Can I track my order?",
      a: "Absolutely! You'll receive a tracking number via email once your order ships. Track it from your account.",
    },
    {
      q: "What is your return policy?",
      a: "We offer a 30-day return policy. Items must be unused and in original packaging. Free returns within the US.",
    },
  ];

  return (
    <>
      {/* Loading Animation */}
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-950 bg-gradient-to-br from-[#F8F5ED] to-[#ECE8DC]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-[#D7C097] border-r-[#A38C5C] dark:border-t-[#D7C097] dark:border-r-[#A38C5C] animate-spin mb-4"></div>
            <p className="dark:text-gray-300 text-gray-700 font-medium">
              Loading Shipping Info...
            </p>
          </motion.div>
        </motion.div>
      )}

      <div className="min-h-screen dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-gradient-to-b from-[#F8F5ED] via-white to-[#F8F5ED]">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-[#D7C097]/10 to-[#A38C5C]/10 dark:from-[#D7C097]/5 dark:to-[#A38C5C]/5 mb-8"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C] flex items-center justify-center shadow-lg">
                  <FaTruck className="text-3xl text-white" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-6xl font-bold dark:text-gray-100 text-gray-900 mb-6"
              >
                Shipping &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D7C097] to-[#A38C5C] dark:from-[#D7C097] dark:to-[#A38C5C]">
                  Delivery
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl dark:text-gray-300 text-gray-700 leading-relaxed mb-10"
              >
                Fast, reliable delivery with real-time tracking and premium
                service. Your beauty products deserve the best journey to your
                doorstep.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Shipping Options */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold dark:text-gray-100 text-gray-900 mb-4">
                Choose Your{" "}
                <span className="text-[#D7C097] dark:text-[#D7C097]">
                  Delivery Speed
                </span>
              </h2>
              <p className="text-xl dark:text-gray-300 text-gray-700 max-w-2xl mx-auto">
                Select the shipping method that fits your needs and timeline
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {shippingOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: option.delay }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="dark:bg-gray-800 bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full dark:border-gray-700 border border-[#D7C097]/20">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${option.color} mb-6`}
                    >
                      <div className="text-2xl text-white">{option.icon}</div>
                    </motion.div>

                    <h3 className="text-2xl font-bold dark:text-gray-100 text-gray-900 mb-3">
                      {option.name}
                    </h3>

                    <div className="text-lg font-bold text-[#A38C5C] dark:text-[#D7C097] mb-4">
                      {option.price}
                    </div>

                    <div className="flex items-center gap-2 dark:text-gray-300 text-gray-700 mb-6">
                      <FaClock className="text-[#D7C097] dark:text-[#D7C097]" />
                      <span className="font-medium">{option.time}</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {option.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 dark:text-gray-300 text-gray-700"
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C]" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D7C097]/10 to-[#A38C5C]/10 dark:from-[#D7C097]/20 dark:to-[#A38C5C]/20 dark:text-gray-100 text-gray-900 font-semibold hover:from-[#D7C097]/20 hover:to-[#A38C5C]/20 dark:hover:from-[#D7C097]/30 dark:hover:to-[#A38C5C]/30 transition-all duration-300">
                      Select Option
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900/50 bg-gradient-to-b from-white to-[#F8F5ED]/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold dark:text-gray-100 text-gray-900 mb-4">
                Premium{" "}
                <span className="text-[#D7C097] dark:text-[#D7C097]">
                  Shipping Experience
                </span>
              </h2>
              <p className="text-xl dark:text-gray-300 text-gray-700 max-w-2xl mx-auto">
                We ensure every package is handled with care and attention
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shippingFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay }}
                  whileHover={{ scale: 1.05 }}
                  className="dark:bg-gray-800 bg-white rounded-2xl p-8 shadow-lg dark:border-gray-700 border border-[#D7C097]/10"
                >
                  <div className="text-3xl text-[#D7C097] dark:text-[#D7C097] mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold dark:text-gray-100 text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="dark:text-gray-300 text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Flow */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold dark:text-gray-100 text-gray-900 mb-4">
                Our{" "}
                <span className="text-[#D7C097] dark:text-[#D7C097]">
                  Shipping Process
                </span>
              </h2>
              <p className="text-xl dark:text-gray-300 text-gray-700 max-w-2xl mx-auto">
                From order to delivery, we ensure excellence at every step
              </p>
            </motion.div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D7C097] to-[#A38C5C] transform -translate-y-1/2 z-0" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C] mx-auto flex items-center justify-center shadow-xl">
                        <div className="text-3xl text-white">{step.icon}</div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full dark:bg-gray-800 bg-white border-4 dark:border-gray-900 border-[#F8F5ED] flex items-center justify-center">
                        <span className="text-lg font-bold text-[#A38C5C] dark:text-[#D7C097]">
                          {step.step}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold dark:text-gray-100 text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="dark:text-gray-300 text-gray-700">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 dark:bg-gradient-to-b dark:from-gray-900/50 dark:to-gray-800 bg-gradient-to-b from-[#F8F5ED]/50 to-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold dark:text-gray-100 text-gray-900 mb-4">
                Frequently{" "}
                <span className="text-[#D7C097] dark:text-[#D7C097]">
                  Asked Questions
                </span>
              </h2>
              <p className="text-xl dark:text-gray-300 text-gray-700">
                Find answers to common shipping queries
              </p>
            </motion.div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="dark:bg-gray-800 bg-white rounded-2xl p-8 shadow-lg dark:border-gray-700 border border-[#D7C097]/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-[#D7C097]/10 to-[#A38C5C]/10 dark:from-[#D7C097]/20 dark:to-[#A38C5C]/20 flex items-center justify-center">
                      <FaCheckCircle className="text-[#D7C097] dark:text-[#D7C097] text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold dark:text-gray-100 text-gray-900 mb-3">
                        {faq.q}
                      </h3>
                      <p className="dark:text-gray-300 text-gray-700 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-[#D7C097] to-[#A38C5C] rounded-3xl p-12 text-center shadow-2xl"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Experience Premium Delivery?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Shop our collection today and enjoy fast, reliable shipping with
                premium service.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-white text-gray-900 font-bold text-lg flex items-center justify-center gap-3 hover:shadow-2xl transition-all duration-300"
                >
                  Start Shopping
                  <FaArrowRight />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  Contact Support
                </motion.button>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      24/7
                    </div>
                    <div className="text-white/80">Support</div>
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      99.8%
                    </div>
                    <div className="text-white/80">On-Time Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      10k+
                    </div>
                    <div className="text-white/80">Happy Customers</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ShippingInfoPage;
