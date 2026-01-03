import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { getImageUrl } from "../utils/imageUtils";
import { fetchWithAuth } from "../utils/auth";
import {
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaShoppingBag,
  FaLeaf,
  FaHeart,
  FaTag,
  FaArrowUp,
  FaMagic,
  FaCrown,
  FaSun,
  FaMoon,
  FaFeather,
} from "react-icons/fa";

// Import the image
// import photoshoot2 from "../assets/photoshoot2.jpg";

const BACKEND_URL = import.meta.env.VITE_API_URL;

// Magic Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.8,
    rotateX: -20,
    rotateY: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 12,
      mass: 0.8,
      duration: 1,
    },
  },
};

const hoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
  },
  hover: {
    scale: 1.08,
    y: -16,
    rotateX: 5,
    rotateY: 3,
    boxShadow: "0 35px 70px rgba(215, 192, 151, 0.4)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
      duration: 0.4,
    },
  },
};

const imageVariants = {
  rest: {
    scale: 1,
    filter: "brightness(1) saturate(1) contrast(1)",
    rotate: 0,
  },
  hover: {
    scale: 1.15,
    filter: "brightness(1.2) saturate(1.3) contrast(1.1)",
    rotate: 0.3,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const glowVariants = {
  rest: {
    opacity: 0.5,
    scale: 1,
  },
  hover: {
    opacity: 1,
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// Magic particle effects
const Particles = ({ count = 8 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-yellow-400 to-amber-300 dark:from-yellow-300 dark:to-amber-200"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -Math.random() * 40 - 20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.3 });
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.5 });

  // Scroll animations for hero section
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

  useEffect(() => {
    fetchWithAuth(`${BACKEND_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        console.log("CATEGORIES DATA:", data);
        setCategories(data);
      });

    // Update scroll progress
    const updateScrollProgress = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  const toggleExpand = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F5ED] via-amber-50 to-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div
        ref={heroRef}
        className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            y: heroY,
            scale: heroScale,
            opacity: heroOpacity,
          }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("/photoshoot2.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          >
            {/* Multiple Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

            {/* Animated Particles */}
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 dark:from-amber-300 dark:to-yellow-200 rounded-full"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, -40],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <motion.div
            style={{
              y: textY,
              scale: textScale,
            }}
            className="text-center max-w-6xl mx-auto"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaCrown className="text-amber-400" />
              </motion.div>
              <span className="text-white font-medium tracking-wider">
                PREMIUM COLLECTIONS
              </span>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaStar className="text-yellow-300" />
              </motion.div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="text-white">Discover</span>
              <motion.span
                className="text-[#D8C9A7] block mt-4"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(251, 191, 36, 0.5)",
                    "0 0 40px rgba(251, 191, 36, 0.8)",
                    "0 0 20px rgba(251, 191, 36, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Magic Categories
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Immerse yourself in our enchanting collections, where every
              product tells a story of beauty and magic.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 mb-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-gray-300">Collections</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">4.9★</div>
                <div className="text-sm text-gray-300">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-sm text-gray-300">Quality</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              className="fill-[#F8F5ED] dark:fill-gray-900"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,202.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20 -mt-1">
        {/* Magic Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Magic Sparkles */}
          <div className="relative">
            <motion.div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-r from-amber-400/10 via-yellow-300/5 to-amber-400/10 rounded-full blur-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isHeaderInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-gray-900 dark:text-gray-100">Enchanted</span>
            <span className="ml-4 text-[#D8C9A7] dark:text-amber-300">
              Collections
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Each collection is crafted with magical precision to bring out your
            natural beauty
          </motion.p>
        </motion.div>

        {/* Magic Categories Grid */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative"
        >
          {/* Magical Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-amber-400/10 via-yellow-300/10 to-amber-400/10 dark:from-amber-400/5 dark:via-yellow-300/5 dark:to-amber-400/5"
                style={{
                  width: 200 + i * 100,
                  height: 200 + i * 100,
                  left: `${20 + i * 20}%`,
                  top: `${30 + i * 10}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {categories.map((cat, index) => {
            const isExpanded = expanded[cat._id] || false;
            const shortDesc =
              cat.description?.length > 100
                ? cat.description.slice(0, 100) + "..."
                : cat.description;

            return (
              <motion.div
                key={cat._id}
                custom={index}
                variants={cardVariants}
                whileHover="hover"
                animate="rest"
                initial="rest"
                onMouseEnter={() => setActiveCategory(cat._id)}
                onMouseLeave={() => setActiveCategory(null)}
                className="relative group"
              >
                <Link to={`/category/${cat.name}`}>
                  {/* Magical Card Container */}
                  <motion.div
                    variants={hoverVariants}
                    className="relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm border border-amber-200/50 dark:border-gray-700/50 bg-gradient-to-br from-white via-white/95 to-amber-50/30 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-800/95 dark:to-gray-900 cursor-pointer"
                  >
                    {/* Magical Glow Effect */}
                    <motion.div
                      variants={glowVariants}
                      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/5 via-amber-300/10 to-yellow-300/5 dark:from-amber-400/0 dark:via-amber-300/5 dark:to-yellow-300/0"
                    />

                    {/* Magic Particles */}
                    <Particles count={6} />

                    {/* Image Container with Magic Effects */}
                    <motion.div
                      className="relative h-64 overflow-hidden"
                      whileHover="hover"
                    >
                      {/* Image with Magic Overlay */}
                      <motion.img
                        variants={imageVariants}
                        src={getCategoryImage(cat.image)}
                        alt={cat.name}
                        className="w-full h-full object-contain relative z-10"
                      />

                      {/* Magic Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />

                      {/* Magic Sparkle Overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_70%)] z-10" />
                    </motion.div>

                    {/* Magic Content */}
                    <div className="p-6 relative z-20">
                      {/* Category Header with Magic Icons */}
                      <div className="flex items-center justify-between mb-4">
                        <motion.h3
                          className="text-2xl font-bold"
                          whileHover={{ scale: 1.02 }}
                        >
                          <span className="text-gray-900 dark:text-gray-100">
                            {cat.name}
                          </span>
                        </motion.h3>
                        <motion.div
                          animate={{
                            rotate: activeCategory === cat._id ? [0, 360] : 0,
                            scale: activeCategory === cat._id ? [1, 1.3, 1] : 1,
                          }}
                          transition={{ duration: 0.5 }}
                          className="text-amber-600 dark:text-amber-300"
                        >
                          <FaStar />
                        </motion.div>
                      </div>

                      {/* Magic Description */}
                      <AnimatePresence>
                        <motion.div
                          initial={false}
                          animate={isExpanded ? "expanded" : "collapsed"}
                          variants={{
                            collapsed: {
                              height: 0,
                              opacity: 0,
                            },
                            expanded: {
                              height: "auto",
                              opacity: 1,
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                            {isExpanded ? cat.description : shortDesc}
                          </p>
                        </motion.div>
                      </AnimatePresence>

                      {/* Magic Read More Button */}
                      {cat.description?.length > 100 && (
                        <motion.button
                          type="button"
                          onClick={(e) => toggleExpand(cat._id, e)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 mb-4 group"
                        >
                          <span className="text-amber-600 dark:text-amber-300 font-medium">
                            {isExpanded ? "Show Less" : "Read More"}
                          </span>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-amber-600 dark:text-amber-300"
                          >
                            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                          </motion.div>
                        </motion.button>
                      )}

                      {/* Magic Explore Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="px-4 py-3 rounded-xl backdrop-blur-sm border border-amber-200/30 dark:border-amber-700/30 bg-gradient-to-r from-amber-100/40 via-amber-50/50 to-amber-100/40 dark:bg-gradient-to-r dark:from-amber-900/20 dark:via-amber-800/30 dark:to-amber-900/20 group-hover:border-amber-300/50 dark:group-hover:border-amber-600/50 transition-all duration-300">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              Explore Magic
                            </span>
                            <motion.div
                              animate={{
                                x: activeCategory === cat._id ? [0, 5, 0] : 0,
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                              }}
                              className="text-amber-600 dark:text-amber-300"
                            >
                              <FaFeather />
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Magic Corner Accents */}
                    <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
                      <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-amber-400/30 to-transparent dark:from-amber-400/20 rounded-full" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden">
                      <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-tl from-yellow-300/30 to-transparent dark:from-yellow-300/20 rounded-full" />
                    </div>
                  </motion.div>
                </Link>

                {/* Magic Hover Effects */}
                <AnimatePresence>
                  {activeCategory === cat._id && (
                    <>
                      {/* Floating Magic Dust */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 dark:from-amber-400 dark:to-yellow-300"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                            y: [0, -40],
                            x: Math.random() * 60 - 30,
                          }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            duration: 1.2,
                            delay: i * 0.1,
                          }}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: "40%",
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Magic Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-6 rounded-2xl backdrop-blur-sm border border-white/10 dark:border-gray-700/50 bg-white/10 dark:bg-gray-800/20">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                {categories.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Magical Collections
              </div>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-amber-300/50 dark:via-amber-300/30 to-transparent" />
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Premium Quality
              </div>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-amber-300/50 dark:via-amber-300/30 to-transparent" />
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                4.9★
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Magic Rating
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Magic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Large Magic Orbs */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-10 w-64 h-64 opacity-5"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 to-yellow-300 dark:from-amber-900 dark:to-yellow-800 blur-3xl" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 60, 0],
            x: [0, -30, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-8 w-80 h-80 opacity-5"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 dark:from-amber-900 dark:to-yellow-800 blur-3xl" />
        </motion.div>

        {/* Floating Magic Shapes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, rgba(251,191,36,0.3), rgba(253,224,71,0.3))`,
              borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "0%" : "25%",
              filter: "blur(20px)",
            }}
            animate={{
              y: [0, Math.random() * 100 - 50, 0],
              x: [0, Math.random() * 100 - 50, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 25 + 25,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
