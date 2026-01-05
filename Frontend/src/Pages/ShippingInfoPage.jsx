import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  FaTruck,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaArrowRight,
  FaShippingFast,
  FaLeaf,
} from "react-icons/fa";

// Animation variants for ShippingInfoPage
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Custom hook for scroll animations
const useScrollAnimation = (threshold = 0.2) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
    margin: "0px 0px -50px 0px",
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return [ref, controls];
};

const ShippingInfoPage = () => {
  const [loading, setLoading] = useState(true);

  // Create refs for each section
  const [heroRef, heroControls] = useScrollAnimation(0.3);
  const [optionsRef, optionsControls] = useScrollAnimation();
  const [featuresRef, featuresControls] = useScrollAnimation();
  const [processRef, processControls] = useScrollAnimation();

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
      features: ["Tracking included", "3-7 business days", "Free over $50"],
    },
    {
      name: "Express Delivery",
      time: "1-3 Business Days",
      price: "$9.99",
      icon: <FaBoxOpen />,
      features: ["Priority handling", "1-3 business days", "Saturday delivery"],
    },
    {
      name: "Overnight",
      time: "Next Day",
      price: "$19.99",
      icon: <FaClock />,
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
      description: "Monitor your package from warehouse to doorstep",
      icon: <FaMapMarkerAlt />,
    },
    {
      title: "Secure Delivery",
      description: "Signature confirmation and secure packaging",
      icon: <FaShieldAlt />,
    },
    {
      title: "Easy Returns",
      description: "30-day return policy with prepaid labels",
      icon: <FaMoneyBillWave />,
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
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-20 h-20 rounded-full border-4 border-transparent border-t-[#D7C097] border-r-[#A38C5C] mb-4"
            ></motion.div>
            <p className="dark:text-gray-300 text-gray-700 font-medium">
              Loading Shipping Info...
            </p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          variants={staggerContainer}
          initial="hidden"
          animate={heroControls}
          className="pt-24 pb-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                variants={scaleIn}
                className="inline-flex items-center justify-center w-24 h-24 mb-8"
              >
                <div className="w-20 h-20 rounded-full bg-[#D7C097] flex items-center justify-center">
                  <FaTruck className="text-3xl text-white" />
                </div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-6xl font-bold dark:text-gray-100 text-gray-900 mb-6"
              >
                Shipping &{" "}
                <span className="text-[#D7C097] dark:text-[#D7C097]">
                  Delivery
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl dark:text-gray-300 text-gray-700 mb-10"
              >
                Fast, reliable delivery with real-time tracking and premium
                service. Your beauty products deserve the best journey to your
                doorstep.
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Shipping Options */}
        <motion.section
          ref={optionsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={optionsControls}
          className="py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-16">
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
                  variants={scaleIn}
                  custom={index}
                  className="group"
                >
                  <div className="dark:bg-gray-800 bg-white rounded-2xl p-8 border border-gray-200 dark:border-gray-700 h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D7C097] mb-6">
                      <div className="text-2xl text-white">{option.icon}</div>
                    </div>

                    <h3 className="text-2xl font-bold dark:text-gray-100 text-gray-900 mb-3">
                      {option.name}
                    </h3>

                    <div className="text-lg font-bold text-[#A38C5C] dark:text-[#D7C097] mb-4">
                      {option.price}
                    </div>

                    <div className="flex items-center gap-2 dark:text-gray-300 text-gray-700 mb-6">
                      <FaClock className="text-[#D7C097]" />
                      <span className="font-medium">{option.time}</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {option.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3 dark:text-gray-300 text-gray-700"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#D7C097]" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-gray-100 text-gray-900 font-semibold shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      Select Option
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          ref={featuresRef}
          variants={staggerContainer}
          initial="hidden"
          animate={featuresControls}
          className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-16">
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
                  variants={scaleIn}
                  custom={index}
                  className="dark:bg-gray-700 bg-white rounded-2xl p-8 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    className="text-3xl text-[#D7C097] mb-4 inline-block"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold dark:text-gray-100 text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Process Flow */}
        <motion.section
          ref={processRef}
          variants={staggerContainer}
          initial="hidden"
          animate={processControls}
          className="py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-16">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  custom={index}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="w-24 h-24 rounded-full bg-[#D7C097] mx-auto flex items-center justify-center"
                    >
                      <div className="text-3xl text-white">{step.icon}</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="absolute -top-2 -right-2 w-10 h-10 rounded-full dark:bg-gray-800 bg-white border-4 dark:border-gray-900 border-white flex items-center justify-center"
                    >
                      <span className="text-lg font-bold text-[#A38C5C] dark:text-[#D7C097]">
                        {step.step}
                      </span>
                    </motion.div>
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
        </motion.section>
      </div>
    </>
  );
};

export default ShippingInfoPage;
