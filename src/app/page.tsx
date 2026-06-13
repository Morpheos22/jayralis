"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Building2,
  TrendingUp,
  Eye,
  Sparkles,
  Heart,
  Megaphone,
  Shirt,
  Calendar,
  Globe,
  Lightbulb,
  Handshake,
  ArrowUpRight,
} from "lucide-react";

/* ─── constants ─── */
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Vision", href: "#vision" },
  { label: "Contact", href: "#contact" },
];

const SUBSIDIARIES = [
  {
    name: "Jayralis Media",
    description:
      "Crafting compelling narratives and delivering cutting-edge content across digital and traditional platforms, connecting audiences with stories that matter.",
    icon: Globe,
    color: "from-amber-500/20 to-yellow-600/10",
    accent: "text-amber-600",
    border: "border-amber-200/50",
  },
  {
    name: "Jayralis Fashion",
    description:
      "Redefining contemporary African fashion with bold designs, premium craftsmanship, and a global aesthetic rooted in cultural heritage and modern innovation.",
    icon: Shirt,
    color: "from-rose-500/20 to-pink-600/10",
    accent: "text-rose-600",
    border: "border-rose-200/50",
  },
  {
    name: "Jayralis Advertising",
    description:
      "Delivering high-impact advertising solutions that amplify brand presence, drive engagement, and convert audiences through strategic creative campaigns.",
    icon: Megaphone,
    color: "from-emerald-500/20 to-green-600/10",
    accent: "text-emerald-600",
    border: "border-emerald-200/50",
  },
  {
    name: "Jayralis Events",
    description:
      "Curating unforgettable experiences and world-class events that leave lasting impressions, from corporate galas to cultural celebrations and festivals.",
    icon: Calendar,
    color: "from-violet-500/20 to-purple-600/10",
    accent: "text-violet-600",
    border: "border-violet-200/50",
  },
  {
    name: "Jayralis Foundation",
    description:
      "Uplifting underserved communities through targeted philanthropic programs, educational initiatives, healthcare access, and sustainable development projects.",
    icon: Heart,
    color: "from-sky-500/20 to-blue-600/10",
    accent: "text-sky-600",
    border: "border-sky-200/50",
  },
  {
    name: "Jayralis Ventures",
    description:
      "Fueling the next generation of innovative startups and high-growth businesses through strategic capital investment and hands-on operational support.",
    icon: TrendingUp,
    color: "from-orange-500/20 to-amber-600/10",
    accent: "text-orange-600",
    border: "border-orange-200/50",
  },
  {
    name: "Jayralis Acquisition",
    description:
      "Identifying and acquiring high-potential businesses that align with our strategic vision, expanding our portfolio with precision and purpose-driven growth.",
    icon: Handshake,
    color: "from-teal-500/20 to-cyan-600/10",
    accent: "text-teal-600",
    border: "border-teal-200/50",
  },
  {
    name: "Jayralis Innovation",
    description:
      "Pioneering breakthrough technologies and disruptive business models that reshape industries, drive efficiency, and create entirely new market opportunities.",
    icon: Lightbulb,
    color: "from-indigo-500/20 to-blue-600/10",
    accent: "text-indigo-600",
    border: "border-indigo-200/50",
  },
];

const STATS = [
  { value: "8", label: "Subsidiary Brands", suffix: "+" },
  { value: "6", label: "Industry Sectors", suffix: "" },
  { value: "1", label: "Unified Vision", suffix: "" },
  { value: "∞", label: "Growth Potential", suffix: "" },
];

/* ─── reusable animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── particles background ─── */
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/30"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
}

/* ─── main page ─── */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      {/* ─── NAVIGATION ─── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-navy-dark/95 backdrop-blur-xl shadow-2xl shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-lg ring-2 ring-gold/30 group-hover:ring-gold/60 transition-all duration-300">
                <img
                  src="/jayralis-logo.jpg"
                  alt="Jayralis Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-wide leading-tight">
                  JAYRALIS
                </span>
                <span className="text-gold/80 text-[10px] tracking-[0.3em] uppercase leading-tight">
                  Company Limited
                </span>
              </div>
            </motion.a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-white/70 hover:text-gold text-sm font-medium tracking-wide transition-colors duration-300 relative group"
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
              <motion.button
                onClick={() => handleNavClick("#contact")}
                className="ml-2 px-6 py-2.5 bg-gold text-navy-dark font-semibold text-sm rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/20 hover:shadow-gold/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-navy-dark/98 backdrop-blur-xl border-t border-white/10"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="text-white/80 hover:text-gold text-left text-lg font-medium py-2 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="mt-2 px-6 py-3 bg-gold text-navy-dark font-semibold rounded-full text-center"
                >
                  Get In Touch
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─── HERO SECTION ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background layers */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-light" />
          <div className="absolute inset-0 animate-gradient bg-gradient-to-tr from-gold/5 via-transparent to-gold/5" />
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/5 blur-[120px]" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/3 blur-[80px]" />
        </motion.div>

        <Particles />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm mb-8"
          >
            <Building2 className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium tracking-wide">
              Abuja, Nigeria
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="mx-auto mb-8"
          >
            <div className="relative inline-block">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden mx-auto shadow-2xl shadow-gold/20 animate-pulse-glow ring-2 ring-gold/40">
                <img
                  src="/jayralis-logo.jpg"
                  alt="Jayralis Company Limited"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-white">Jayralis</span>
            <br />
            <span className="text-gradient-gold">Company Limited</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-4 tracking-wide"
          >
            Vision. Opportunity. Growth.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-base sm:text-lg text-white/40 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Creating sustainable value through strategic investments and innovation across industries.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => handleNavClick("#portfolio")}
              className="group px-8 py-4 bg-gold text-navy-dark font-bold rounded-full text-base shadow-xl shadow-gold/25 hover:shadow-gold/40 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Portfolio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              onClick={() => handleNavClick("#about")}
              className="group px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full text-base hover:border-gold/50 hover:text-gold transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
              <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-gold" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── ABOUT SECTION ─── */}
      <section id="about" className="relative py-24 sm:py-32 bg-cream noise-overlay">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left - Content */}
            <div>
              <motion.div variants={fadeUp} custom={0}>
                <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold-dark text-xs font-bold tracking-[0.2em] uppercase rounded-full mb-6">
                  About Us
                </span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight"
              >
                Building Tomorrow&apos;s
                <br />
                <span className="text-gradient-gold">Legacy Today</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-muted-foreground text-lg leading-relaxed mb-6"
              >
                Jayralis Company Limited is a dynamic, Nigerian-rooted holding company
                headquartered in Abuja. Dedicated to creating sustainable value through
                strategic investments and innovation, the company builds and nurtures a
                diversified portfolio of independent subsidiaries spanning media, fashion,
                advertising, events, philanthropy, and ventures.
              </motion.p>
              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-muted-foreground text-lg leading-relaxed mb-8"
              >
                Operating as a central holding company, Jayralis oversees high-level
                strategy, manages overarching finances, and provides shared legal and
                technological resources to its portfolio. This robust support structure
                empowers each subsidiary to operate with full autonomy, cultivating its
                own distinct team, culture, and industry-specific excellence.
              </motion.p>
              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-4">
                {["Strategic Investments", "Shared Resources", "Autonomous Operations"].map(
                  (item) => (
                    <span
                      key={item}
                      className="px-4 py-2 bg-navy/5 text-navy text-sm font-medium rounded-full border border-navy/10"
                    >
                      {item}
                    </span>
                  )
                )}
              </motion.div>
            </div>

            {/* Right - Visual element */}
            <motion.div variants={fadeUp} custom={2} className="relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Decorative background shapes */}
                <div className="absolute inset-4 bg-gradient-to-br from-gold/20 to-gold-light/10 rounded-3xl rotate-6" />
                <div className="absolute inset-4 bg-gradient-to-tr from-navy/10 to-transparent rounded-3xl -rotate-3" />
                {/* Logo card */}
                <div className="relative bg-white rounded-3xl shadow-2xl shadow-navy/10 p-10 flex flex-col items-center justify-center h-full border border-gold/10">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg ring-2 ring-gold/20 mb-6">
                    <img
                      src="/jayralis-logo.jpg"
                      alt="Jayralis Company Limited"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-1">JAYRALIS</h3>
                  <p className="text-gold-dark text-sm tracking-[0.3em] uppercase">
                    Company Limited
                  </p>
                  <div className="mt-6 w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
                  <p className="mt-4 text-muted-foreground text-center text-sm leading-relaxed max-w-xs">
                    Vision &bull; Opportunity &bull; Growth
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS SECTION ─── */}
      <section className="relative py-16 sm:py-20 bg-navy-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold text-gold mb-2">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-white/50 text-sm font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PORTFOLIO SECTION ─── */}
      <section id="portfolio" className="relative py-24 sm:py-32 bg-white noise-overlay">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16 sm:mb-20"
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold-dark text-xs font-bold tracking-[0.2em] uppercase rounded-full mb-6">
                Our Portfolio
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-6"
            >
              The Jayralis
              <span className="text-gradient-gold"> Portfolio</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Eight powerful brands, one unified vision. Each subsidiary operates with
              full autonomy while benefiting from the collective strength of the Jayralis
              ecosystem.
            </motion.p>
          </motion.div>

          {/* Cards grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {SUBSIDIARIES.map((sub, i) => {
              const Icon = sub.icon;
              return (
                <motion.div
                  key={sub.name}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className={`group relative bg-white rounded-2xl p-6 border ${sub.border} shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer`}
                >
                  {/* Hover gradient bg */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${sub.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sub.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-6 h-6 ${sub.accent}`} />
                    </div>
                    <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-navy-dark transition-colors">
                      {sub.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {sub.description}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-medium ${sub.accent} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0`}
                    >
                      Learn more <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── VISION & MISSION SECTION ─── */}
      <section id="vision" className="relative py-24 sm:py-32 bg-navy overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(197,164,89,0.08),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-xs font-bold tracking-[0.2em] uppercase rounded-full mb-6">
                Our Purpose
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Driven by
              <span className="text-gradient-gold"> Purpose</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative group"
            >
              <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-gold/30 transition-all duration-500 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-[60px]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">Our Vision</h3>
                  </div>
                  <p className="text-white/60 text-lg leading-relaxed mb-6">
                    Our vision is anchored in the core pillars of our corporate identity:{" "}
                    <strong className="text-gold">VISION</strong> &bull;{" "}
                    <strong className="text-gold">OPPORTUNITY</strong> &bull;{" "}
                    <strong className="text-gold">GROWTH</strong>. We aim to strategically
                    acquire visionary opportunities, fuel innovative breakthroughs, and create
                    lasting avenues for growth that benefit our brands, our people, and
                    underserved communities.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["Vision", "Opportunity", "Growth"].map((pillar) => (
                      <span
                        key={pillar}
                        className="px-4 py-2 bg-gold/10 text-gold text-sm font-bold rounded-full border border-gold/20"
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative group"
            >
              <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-gold/30 transition-all duration-500 h-full">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/5 rounded-full blur-[60px]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gold/15 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">Our Mission</h3>
                  </div>
                  <p className="text-white/60 text-lg leading-relaxed mb-6">
                    To identify opportunities, drive innovative growth, and deliver measurable
                    value across industries while uplifting communities through the{" "}
                    <strong className="text-gold">Jayralis Foundation</strong>. We are
                    committed to empowering each subsidiary with the resources and strategic
                    direction needed to achieve market leadership and lasting social impact.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["Identify", "Innovate", "Deliver", "Uplift"].map((pillar) => (
                      <span
                        key={pillar}
                        className="px-4 py-2 bg-gold/10 text-gold text-sm font-bold rounded-full border border-gold/20"
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STRUCTURE SECTION ─── */}
      <section className="relative py-24 sm:py-32 bg-cream noise-overlay">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold-dark text-xs font-bold tracking-[0.2em] uppercase rounded-full mb-6">
                How We Operate
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-6"
            >
              The Jayralis
              <span className="text-gradient-gold"> Model</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              A central holding structure that empowers through shared strength while
              preserving individual identity and operational excellence.
            </motion.p>
          </motion.div>

          {/* Structure diagram */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Central Strategy",
                desc: "Jayralis provides overarching strategic direction, financial management, and governance across all subsidiaries, ensuring alignment with the corporate vision while maintaining operational flexibility.",
                items: ["High-Level Strategy", "Financial Oversight", "Legal Resources"],
                icon: Building2,
              },
              {
                title: "Shared Resources",
                desc: "Each subsidiary benefits from centralized technology infrastructure, legal counsel, and operational support — reducing overhead and accelerating growth across the entire portfolio.",
                items: ["Technology Platform", "Legal Framework", "Operational Support"],
                icon: Handshake,
              },
              {
                title: "Autonomous Excellence",
                desc: "Subsidiaries operate with full autonomy, cultivating their own distinct teams, culture, and industry-specific expertise — ensuring agility and market responsiveness at every level.",
                items: ["Independent Teams", "Distinct Culture", "Market Agility"],
                icon: Sparkles,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white rounded-2xl p-8 border border-gold/10 shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold-light/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-gold-dark" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                  <div className="flex flex-col gap-2">
                    {item.items.map((subItem) => (
                      <div
                        key={subItem}
                        className="flex items-center gap-2 text-sm text-navy/70"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                        {subItem}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section id="contact" className="relative py-24 sm:py-32 bg-navy-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,164,89,0.1),transparent_70%)]" />
        <Particles />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-xs font-bold tracking-[0.2em] uppercase rounded-full mb-6">
                Partner With Us
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Ready to Build the
              <br />
              <span className="text-gradient-gold">Future Together?</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Whether you are an investor, partner, or visionary seeking collaboration,
              Jayralis Company Limited opens doors to unparalleled opportunities across
              industries and continents.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="mailto:info@jayralis.com"
                className="group px-10 py-4 bg-gold text-navy-dark font-bold rounded-full text-base shadow-xl shadow-gold/25 hover:shadow-gold/40 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="mailto:partnerships@jayralis.com"
                className="group px-10 py-4 border-2 border-gold/30 text-gold font-semibold rounded-full text-base hover:bg-gold/10 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Partnerships
                <ArrowUpRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-navy-dark border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-gold/30">
                  <img
                    src="/jayralis-logo.jpg"
                    alt="Jayralis Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-white font-bold text-lg">JAYRALIS</span>
                  <span className="block text-gold/60 text-[10px] tracking-[0.2em]">
                    COMPANY LIMITED
                  </span>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                A dynamic, Nigerian-rooted holding company dedicated to creating sustainable
                value through strategic investments and innovation.
              </p>
            </div>

            {/* Portfolio Links */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
                Our Portfolio
              </h4>
              <ul className="grid grid-cols-2 gap-2">
                {SUBSIDIARIES.map((sub) => (
                  <li key={sub.name}>
                    <span className="text-white/40 hover:text-gold text-sm transition-colors cursor-pointer">
                      {sub.name.replace("Jayralis ", "")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-4">
                Get In Touch
              </h4>
              <div className="flex flex-col gap-3 text-white/40 text-sm">
                <span>Abuja, Nigeria</span>
                <a
                  href="mailto:info@jayralis.com"
                  className="hover:text-gold transition-colors"
                >
                  info@jayralis.com
                </a>
                <a
                  href="mailto:partnerships@jayralis.com"
                  className="hover:text-gold transition-colors"
                >
                  partnerships@jayralis.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} Jayralis Company Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-white/30 text-sm">
              <span className="text-gold font-semibold">Vision</span>
              <span>&bull;</span>
              <span className="text-gold font-semibold">Opportunity</span>
              <span>&bull;</span>
              <span className="text-gold font-semibold">Growth</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
