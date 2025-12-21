import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuestionCircle,
  FaShoppingCart,
  FaShippingFast,
  FaUndo,
  FaCreditCard,
  FaShieldAlt,
  FaUser,
  FaBox,
  FaStar,
  FaSearch,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

const FAQPage = () => {
  const [openCategory, setOpenCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      icon: <FaQuestionCircle />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "ordering",
      title: "Ordering & Payment",
      icon: <FaShoppingCart />,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "shipping",
      title: "Shipping & Delivery",
      icon: <FaShippingFast />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "returns",
      title: "Returns & Refunds",
      icon: <FaUndo />,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "account",
      title: "Account & Security",
      icon: <FaUser />,
      color: "from-rose-500 to-red-500",
    },
    {
      id: "products",
      title: "Products & Quality",
      icon: <FaBox />,
      color: "from-indigo-500 to-violet-500",
    },
  ];

  const faqs = {
    general: [
      {
        q: "What is LuxeCart?",
        a: "LuxeCart is a premium e-commerce platform offering high-quality products with exceptional customer service. We curate the best products from trusted suppliers worldwide.",
        tags: ["about", "platform"],
      },
      {
        q: "Where are you located?",
        a: "Our headquarters are in San Francisco, California, but we ship worldwide from multiple fulfillment centers across the US, Europe, and Asia.",
        tags: ["location", "global"],
      },
      {
        q: "Are your products authentic?",
        a: "Absolutely! We source all products directly from authorized suppliers and manufacturers. Every product goes through quality verification before listing.",
        tags: ["authentic", "quality"],
      },
      {
        q: "Do you offer wholesale pricing?",
        a: "Yes, we offer special wholesale pricing for businesses and bulk orders. Contact our business team at wholesale@luxecart.com for custom quotes.",
        tags: ["wholesale", "business"],
      },
      {
        q: "How can I contact customer service?",
        a: "You can reach us 24/7 through live chat, email at support@luxecart.com, or call +1 (555) 123-4567 during business hours (9AM-6PM PST).",
        tags: ["contact", "support"],
      },
    ],
    ordering: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay for secure checkout.",
        tags: ["payment", "checkout"],
      },
      {
        q: "Is it safe to shop on your website?",
        a: "Yes! We use 256-bit SSL encryption for all transactions. Your payment information is never stored on our servers. We're PCI DSS compliant.",
        tags: ["security", "safe"],
      },
      {
        q: "Can I modify or cancel my order?",
        a: "You can modify or cancel your order within 1 hour of placing it. After that, please contact customer support immediately for assistance.",
        tags: ["modify", "cancel"],
      },
      {
        q: "Do you save my credit card information?",
        a: "No, we never store your credit card information. All payments are processed through secure, PCI-compliant payment gateways.",
        tags: ["security", "privacy"],
      },
      {
        q: "Will I be charged sales tax?",
        a: "Sales tax is applied based on your shipping location and local regulations. The exact amount will be shown clearly during checkout.",
        tags: ["tax", "checkout"],
      },
    ],
    shipping: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping: 3-7 business days. Express shipping: 1-3 business days. Overnight: Next business day. International: 7-14 business days.",
        tags: ["delivery", "time"],
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! Free standard shipping on all domestic orders over $50. International orders have shipping rates starting at $14.99.",
        tags: ["free", "shipping"],
      },
      {
        q: "Can I track my order?",
        a: "Yes! You'll receive a tracking number via email once your order ships. You can also track it from your account dashboard.",
        tags: ["tracking", "status"],
      },
      {
        q: "Do you ship internationally?",
        a: "Yes! We ship to over 50 countries. International shipping rates and delivery times vary by location.",
        tags: ["international", "global"],
      },
      {
        q: "What if I'm not home for delivery?",
        a: "Our carriers will leave packages in a secure location or with a neighbor. You can also request specific delivery instructions in your account.",
        tags: ["delivery", "instructions"],
      },
    ],
    returns: [
      {
        q: "What is your return policy?",
        a: "30-day return window from delivery date. Items must be unused, in original condition with all tags and packaging. Free returns on all eligible items.",
        tags: ["policy", "returns"],
      },
      {
        q: "How do I return an item?",
        a: "Log into your account → My Orders → Select item → Initiate return → Print prepaid label → Pack item → Drop off at carrier location.",
        tags: ["process", "how-to"],
      },
      {
        q: "How long do refunds take?",
        a: "Refunds are processed within 3-5 business days after we receive and inspect your return. The refund appears in your original payment method.",
        tags: ["refund", "timeline"],
      },
      {
        q: "Who pays for return shipping?",
        a: "We provide prepaid return labels for all eligible returns in the US. International customers may have return shipping costs.",
        tags: ["shipping", "cost"],
      },
      {
        q: "What items cannot be returned?",
        a: "Final sale items, personalized/customized products, items without original packaging, and products marked as 'non-returnable' cannot be returned.",
        tags: ["restrictions", "exceptions"],
      },
    ],
    account: [
      {
        q: "How do I create an account?",
        a: "Click 'Sign Up' in the top right corner, enter your email and create a password. You can also sign up with Google or Facebook for faster login.",
        tags: ["signup", "register"],
      },
      {
        q: "I forgot my password. What should I do?",
        a: "Click 'Forgot Password' on the login page, enter your email, and we'll send you a password reset link that expires in 24 hours.",
        tags: ["password", "reset"],
      },
      {
        q: "How do I update my account information?",
        a: "Log into your account → My Profile → Edit information → Save changes. You can update address, payment methods, and communication preferences.",
        tags: ["update", "profile"],
      },
      {
        q: "Is my personal information secure?",
        a: "Yes! We use industry-standard encryption and never share your personal information with third parties without your consent.",
        tags: ["security", "privacy"],
      },
      {
        q: "Can I delete my account?",
        a: "Yes, contact customer support to request account deletion. Note: This action is permanent and cannot be undone.",
        tags: ["delete", "account"],
      },
    ],
    products: [
      {
        q: "How do I know if a product is in stock?",
        a: "Stock status is shown on each product page. 'In Stock' means ready to ship. 'Low Stock' means limited quantity. 'Out of Stock' means temporarily unavailable.",
        tags: ["stock", "availability"],
      },
      {
        q: "Do you offer product warranties?",
        a: "Most products come with a 1-year manufacturer warranty. Warranty information is listed on individual product pages. Contact us for warranty claims.",
        tags: ["warranty", "guarantee"],
      },
      {
        q: "Can I request a specific product?",
        a: "Yes! Email requests@luxecart.com with product details. We're always looking to expand our collection based on customer requests.",
        tags: ["request", "suggestion"],
      },
      {
        q: "Are your products eco-friendly?",
        a: "We prioritize eco-friendly and sustainable products. Look for the 'Eco-Friendly' badge on product pages to identify environmentally conscious items.",
        tags: ["eco", "sustainable"],
      },
      {
        q: "Do products come with instructions?",
        a: "Yes! All products include detailed instructions. Many also have video tutorials available on our YouTube channel.",
        tags: ["instructions", "tutorials"],
      },
    ],
  };

  const popularQuestions = [
    { q: "How long does shipping take?", category: "shipping" },
    { q: "What is your return policy?", category: "returns" },
    { q: "Do you offer free shipping?", category: "shipping" },
    { q: "Is it safe to shop here?", category: "ordering" },
    { q: "How do I track my order?", category: "shipping" },
    { q: "What payment methods do you accept?", category: "ordering" },
  ];

  const filteredFAQs = searchTerm
    ? Object.values(faqs)
        .flat()
        .filter(
          (faq) =>
            faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    : faqs[openCategory];

  const FAQItem = ({ faq, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="mb-4"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 rounded-xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 text-left"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white pr-8">
              {faq.q}
            </h3>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 flex items-center justify-center"
            >
              {isOpen ? (
                <FaMinus className="text-amber-600" />
              ) : (
                <FaPlus className="text-amber-600" />
              )}
            </motion.div>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-slate-200/20 dark:border-slate-700/30 mt-4">
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {faq.a}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {faq.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-amber-500/10 to-rose-500/10 text-amber-600 dark:text-amber-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    );
  };

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
            <FaQuestionCircle className="text-3xl text-white" />
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            Find quick answers to common questions about shopping with us
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-gradient-to-r from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-amber-500"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Popular Questions */}
        {!searchTerm && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
              <IoSparkles className="text-amber-500" />
              Popular Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpenCategory(question.category)}
                  className="p-4 rounded-xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 flex items-center justify-center">
                      <FaStar className="text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">
                        {question.q}
                      </p>
                      <span className="text-xs text-amber-600 dark:text-amber-400 mt-1 inline-block">
                        {
                          faqCategories.find((c) => c.id === question.category)
                            ?.title
                        }
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Category Tabs */}
        {!searchTerm && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {faqCategories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOpenCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                    openCategory === category.id
                      ? "bg-gradient-to-r from-white to-white/90 dark:from-slate-800 dark:to-slate-900 shadow-xl"
                      : "bg-gradient-to-r from-white/50 to-white/30 dark:from-slate-800/50 dark:to-slate-900/50 hover:bg-white/80 dark:hover:bg-slate-800/80"
                  } border border-white/20 dark:border-slate-700/50`}
                >
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}
                  >
                    {category.icon}
                  </div>
                  <span
                    className={`font-medium ${
                      openCategory === category.id
                        ? "text-slate-800 dark:text-white"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {category.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search Results Header */}
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Search Results for "{searchTerm}"
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Found {filteredFAQs.length} answer
              {filteredFAQs.length !== 1 ? "s" : ""}
            </p>
          </motion.div>
        )}

        {/* FAQ List */}
        <motion.div
          key={openCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 mb-6">
                <FaSearch className="text-3xl text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                No results found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
                We couldn't find any answers matching "{searchTerm}". Try
                different keywords or browse by category.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchTerm("")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300"
              >
                Clear Search
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Contact CTA */}
        {!searchTerm && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10" />
              <div className="relative bg-gradient-to-r from-amber-500/5 to-rose-500/5 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-xl rounded-3xl p-12 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Still have questions?
                  </span>
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                  Can't find what you're looking for? Our support team is ready
                  to help!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Contact Support
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-700 dark:to-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-300 dark:border-slate-600 hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open("mailto:support@luxecart.com")}
                  >
                    Email Us
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FAQPage;
