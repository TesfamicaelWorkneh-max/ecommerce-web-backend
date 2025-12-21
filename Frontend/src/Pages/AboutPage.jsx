import React from "react";
import { motion } from "framer-motion";
import {
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaLeaf,
  FaAward,
  FaUsers,
  FaStar,
  FaHeart,
  FaShoppingBag,
  FaGlobeAmericas,
} from "react-icons/fa";
import { IoDiamond, IoRocket } from "react-icons/io5";

const AboutPage = () => {
  const stats = [
    {
      number: "10,000+",
      label: "Happy Customers",
      icon: <FaUsers />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "500+",
      label: "Premium Products",
      icon: <FaShoppingBag />,
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "50+",
      label: "Brand Partners",
      icon: <FaStar />,
      color: "from-amber-500 to-orange-500",
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: <FaHeadset />,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const values = [
    {
      title: "Quality First",
      description:
        "We source only the finest products from trusted suppliers around the world.",
      icon: <IoDiamond className="text-3xl" />,
      color:
        "bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20",
    },
    {
      title: "Customer Love",
      description:
        "Your satisfaction is our top priority. We go above and beyond for every customer.",
      icon: <FaHeart className="text-3xl" />,
      color:
        "bg-gradient-to-br from-rose-500/10 to-pink-600/10 border-rose-500/20",
    },
    {
      title: "Sustainable Choice",
      description:
        "Committed to eco-friendly practices and sustainable sourcing.",
      icon: <FaLeaf className="text-3xl" />,
      color:
        "bg-gradient-to-br from-emerald-500/10 to-green-600/10 border-emerald-500/20",
    },
    {
      title: "Innovation",
      description:
        "Always evolving to bring you the latest trends and technology.",
      icon: <IoRocket className="text-3xl" />,
      color:
        "bg-gradient-to-br from-purple-500/10 to-violet-600/10 border-purple-500/20",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b786d4d1?w=400&h=400&fit=crop",
      bio: "Passionate about creating exceptional shopping experiences.",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w-400&h=400&fit=crop",
      bio: "Ensuring seamless delivery and customer satisfaction.",
    },
    {
      name: "Emily Rodriguez",
      role: "Product Curator",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Expert in selecting premium products for our collection.",
    },
    {
      name: "David Wilson",
      role: "Customer Experience",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "Dedicated to making every interaction memorable.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br py-28 lg:py-32 from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden ">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-rose-500/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 mb-8"
            >
              <FaGlobeAmericas className="text-3xl text-white" />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Our Story
              </span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12"
            >
              Redefining online shopping with passion, quality, and exceptional
              service
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-3xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-xl"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-6`}
                >
                  <div className="text-2xl text-white">{stat.icon}</div>
                </div>
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-medium text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 mb-6">
                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  Our Mission
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Creating Exceptional Shopping Experiences
                </span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Founded in 2025, we started with a simple vision: to make
                premium products accessible to everyone. Today, we've grown into
                a trusted destination for quality-conscious shoppers who value
                excellence, reliability, and outstanding customer service.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Every product in our collection is carefully curated, tested,
                and selected to meet our high standards. We believe in
                transparency, quality, and building lasting relationships with
                our customers.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <FaShippingFast className="text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Fast Shipping
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <FaShieldAlt className="text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Secure Shopping
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                  <FaAward className="text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                    Quality Guarantee
                  </span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-purple-500/10 rounded-3xl p-1">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8">
                  <img
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                    alt="Our Team"
                    className="w-full h-auto rounded-xl shadow-2xl"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-r from-amber-500/20 to-rose-500/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 mb-6"
            >
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                Our Values
              </span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                What We Stand For
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Our core principles guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`p-8 rounded-3xl border backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 ${value.color}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-white to-white/80 dark:from-slate-800 dark:to-slate-900 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 mb-6"
            >
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                Meet Our Team
              </span>
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                The People Behind The Magic
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Passionate professionals dedicated to your shopping experience
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20 dark:border-slate-700/50">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white text-center mb-2">
                    {member.name}
                  </h3>
                  <div className="text-amber-600 dark:text-amber-400 font-medium text-center mb-4">
                    {member.role}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-center">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10" />
            <div className="relative bg-gradient-to-r from-amber-500/5 to-rose-500/5 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-xl rounded-3xl p-12 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Join Our Community
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                Be part of our growing family of satisfied customers and
                experience shopping redefined.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300"
                >
                  Shop Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-700 dark:to-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-300 dark:border-slate-600 hover:shadow-xl transition-all duration-300"
                >
                  Contact Us
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;
