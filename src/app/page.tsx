"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   BESPOKE SVG ICONS — Custom-designed for Jayralis brand theme
   Navy & Gold aesthetic with consistent stroke width and style
   ═══════════════════════════════════════════════════════════════ */

function IconMedia({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2.2" />
      <polygon points="20,18 20,32 32,25" fill="currentColor" opacity="0.85" />
      <circle cx="12" cy="14" r="1.5" fill="currentColor" />
      <circle cx="17" cy="14" r="1.5" fill="currentColor" />
      <line x1="6" y1="17" x2="42" y2="17" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

function IconFashion({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M17 8 L12 16 L16 16 L16 40 L32 40 L32 16 L36 16 L31 8 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M20 8 Q24 14 28 8" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="16" y1="28" x2="32" y2="28" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <line x1="24" y1="16" x2="24" y2="40" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
    </svg>
  );
}

function IconAdvertising({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="8" y="6" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="2.2" />
      <rect x="12" y="10" width="10" height="8" rx="1.5" fill="currentColor" opacity="0.2" />
      <line x1="26" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="16" x2="33" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M12 24 L16 20 L20 23 L26 17 L36 24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
      <path d="M18 30 L18 38 L24 42 L30 38 L30 30" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

function IconEvents({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="8" width="36" height="34" rx="4" stroke="currentColor" strokeWidth="2.2" />
      <line x1="6" y1="18" x2="42" y2="18" stroke="currentColor" strokeWidth="2" />
      <line x1="15" y1="4" x2="15" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="33" y1="4" x2="33" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="28" r="2" fill="currentColor" />
      <circle cx="16" cy="28" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="32" cy="28" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="24" cy="35" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function IconFoundation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 10 C20 10 17 13 17 17 C17 23 24 28 24 28 C24 28 31 23 31 17 C31 13 28 10 24 10Z" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.15" />
      <path d="M10 22 C10 22 14 18 18 22 C22 26 14 30 10 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M38 22 C38 22 34 18 30 22 C26 26 34 30 38 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M14 36 L14 42" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M34 36 L34 42" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M10 42 L38 42" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function IconVentures({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="8" y="30" width="6" height="12" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="17" y="22" width="6" height="20" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="26" y="14" width="6" height="28" rx="1" fill="currentColor" opacity="0.8" />
      <rect x="35" y="6" width="6" height="36" rx="1" fill="currentColor" />
      <path d="M8 8 L16 16 L24 12 L40 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="38,2 42,4 40,8" fill="currentColor" />
    </svg>
  );
}

function IconAcquisition({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 6 L28 14 L24 12 L20 14 Z" fill="currentColor" opacity="0.6" />
      <circle cx="16" cy="20" r="8" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="32" cy="20" r="8" stroke="currentColor" strokeWidth="2.2" />
      <path d="M20 20 C20 17.8 22 16 24 16 C26 16 28 17.8 28 20" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
      <path d="M16 28 L16 40" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M32 28 L32 40" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 40 L20 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 40 L36 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconInnovation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 4 C18 4 14 9 14 15 C14 20 18 24 18 28 L30 28 C30 24 34 20 34 15 C34 9 30 4 24 4Z" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.12" />
      <line x1="18" y1="32" x2="30" y2="32" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="19" y1="36" x2="29" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 40 C20 42 22 44 24 44 C26 44 28 42 28 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="28" x2="24" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="24" y1="12" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="24" y1="12" x2="28" y2="16" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="24" cy="11" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/* ─── How We Operate bespoke icons ─── */

function IconStrategy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.6" />
      <line x1="24" y1="6" x2="24" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="34" x2="24" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="24" x2="14" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="34" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 12 L16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M32 16 L36 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 36 L16 32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M32 32 L36 36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconSharedResources({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="14" cy="34" r="7" stroke="currentColor" strokeWidth="2" />
      <circle cx="34" cy="34" r="7" stroke="currentColor" strokeWidth="2" />
      <line x1="20" y1="22" x2="17" y2="28" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line x1="28" y1="22" x2="31" y2="28" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <line x1="20" y1="34" x2="28" y2="34" stroke="currentColor" strokeWidth="2" opacity="0.5" strokeDasharray="3 2" />
      <circle cx="24" cy="16" r="3" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function IconAutonomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 4 L44 24 L24 44 L4 24 Z" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.08" />
      <path d="M24 12 L36 24 L24 36 L12 24 Z" stroke="currentColor" strokeWidth="1.8" opacity="0.4" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
      <path d="M24 4 L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 36 L24 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 24 L12 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 24 L44 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 4 L30 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M24 4 L18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/* ─── JC Monogram Silhouette for Hero ─── */

function JCMonogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 440" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* J stem */}
      <path
        d="M120 60 L120 280 C120 340 160 380 220 380 C280 380 320 340 320 280"
        stroke="currentColor"
        strokeWidth="36"
        strokeLinecap="round"
        fill="none"
      />
      {/* J top serif */}
      <path
        d="M80 60 L180 60"
        stroke="currentColor"
        strokeWidth="28"
        strokeLinecap="round"
      />
      {/* C shape */}
      <path
        d="M340 100 C340 80 310 60 270 60 C200 60 160 110 160 180 C160 250 200 300 270 300 C310 300 340 280 340 260"
        stroke="currentColor"
        strokeWidth="28"
        strokeLinecap="round"
        fill="none"
      />
      {/* Decorative diamond accent */}
      <path
        d="M200 400 L210 390 L220 400 L210 410 Z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

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
    IconComponent: IconMedia,
    color: "from-amber-500/20 to-yellow-600/10",
    accent: "text-amber-600",
    border: "border-amber-200/50",
  },
  {
    name: "Jayralis Fashion",
    description:
      "Redefining contemporary African fashion with bold designs, premium craftsmanship, and a global aesthetic rooted in cultural heritage and modern innovation.",
    IconComponent: IconFashion,
    color: "from-rose-500/20 to-pink-600/10",
    accent: "text-rose-600",
    border: "border-rose-200/50",
  },
  {
    name: "Jayralis Advertising",
    description:
      "Delivering high-impact advertising solutions that amplify brand presence, drive engagement, and convert audiences through strategic creative campaigns.",
    IconComponent: IconAdvertising,
    color: "from-emerald-500/20 to-green-600/10",
    accent: "text-emerald-600",
    border: "border-emerald-200/50",
  },
  {
    name: "Jayralis Events",
    description:
      "Curating unforgettable experiences and world-class events that leave lasting impressions, from corporate galas to cultural celebrations and festivals.",
    IconComponent: IconEvents,
    color: "from-violet-500/20 to-purple-600/10",
    accent: "text-violet-600",
    border: "border-violet-200/50",
  },
  {
    name: "Jayralis Foundation",
    description:
      "Uplifting underserved communities through targeted philanthropic programs, educational initiatives, healthcare access, and sustainable development projects.",
    IconComponent: IconFoundation,
    color: "from-sky-500/20 to-blue-600/10",
    accent: "text-sky-600",
    border: "border-sky-200/50",
  },
  {
    name: "Jayralis Ventures",
    description:
      "Fueling the next generation of innovative startups and high-growth businesses through strategic capital investment and hands-on operational support.",
    IconComponent: IconVentures,
    color: "from-orange-500/20 to-amber-600/10",
    accent: "text-orange-600",
    border: "border-orange-200/50",
  },
  {
    name: "Jayralis Acquisition",
    description:
      "Identifying and acquiring high-potential businesses that align with our strategic vision, expanding our portfolio with precision and purpose-driven growth.",
    IconComponent: IconAcquisition,
    color: "from-teal-500/20 to-cyan-600/10",
    accent: "text-teal-600",
    border: "border-teal-200/50",
  },
  {
    name: "Jayralis Innovation",
    description:
      "Pioneering breakthrough technologies and disruptive business models that reshape industries, drive efficiency, and create entirely new market opportunities.",
    IconComponent: IconInnovation,
    color: "from-indigo-500/20 to-blue-600/10",
    accent: "text-indigo-600",
    border: "border-indigo-200/50",
  },
];

const STATS = [
  { value: "8", label: "Subsidiary Brands", suffix: "+" },
  { value: "6", label: "Industry Sectors", suffix: "" },
  { value: "1", label: "Unified Vision", suffix: "" },
  { value: "\u221E", label: "Growth Potential", suffix: "" },
];

const LEADERSHIP = [
  {
    name: "Abang-Friday Marjorie Enobong",
    role: "Vice Chairwoman",
    subtitle: "Board of Directors",
    bio: "Marjorie provides strategic oversight and governance as Vice Chairwoman of the Jayralis Board of Directors, guiding the long-term vision and stewardship of the holding company across its diversified portfolio.",
    image: "/staff-marjorie.jpg",
    imagePosition: "center 25%",
    initials: "AM",
  },
  {
    name: "Abang James Osang",
    role: "Chief Operating Officer",
    subtitle: "Member, Board of Directors",
    bio: "James drives day-to-day operational excellence across all Jayralis subsidiaries, ensuring strategic alignment, financial discipline, and the seamless delivery of shared resources that empower each brand.",
    image: "/staff-james.jpg",
    imagePosition: "center top",
    initials: "AJ",
  },
  {
    name: "Enobong",
    role: "Cohost",
    subtitle: "Gist & Grits",
    bio: "Enobong brings voice and vision to Jayralis Media as co-host of Gist & Grits, blending sharp cultural commentary with compelling storytelling that connects audiences across digital and traditional platforms.",
    image: "/staff-enobong.jpg",
    imagePosition: "center 20%",
    initials: "E",
  },
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
const PARTICLE_SEEDS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x1: ((i * 37 + 13) % 100),
  y1: ((i * 53 + 7) % 100),
  y2: ((i * 71 + 29) % 100),
  duration: 6 + (i % 8) * 1.25,
  delay: (i % 4) * 1.0,
}));

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLE_SEEDS.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 rounded-full bg-gold/30"
          initial={{
            x: `${p.x1}%`,
            y: `${p.y1}%`,
            opacity: 0,
          }}
          animate={{
            y: [`${p.y1}%`, `${p.y2}%`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
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
          {/* Radial glow behind monogram */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gold/6 blur-[150px]" />
        </motion.div>

        <Particles />

        {/* JC Monogram Silhouette — dominates hero */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <JCMonogram className="w-[340px] h-[370px] sm:w-[440px] sm:h-[480px] md:w-[560px] md:h-[610px] lg:w-[640px] lg:h-[700px] text-gold/[0.07]" />
          </motion.div>
          {/* Secondary offset silhouette for depth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: -20, y: -20 }}
            animate={{ opacity: 1, scale: 1, x: -20, y: -20 }}
            transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute"
          >
            <JCMonogram className="w-[340px] h-[370px] sm:w-[440px] sm:h-[480px] md:w-[560px] md:h-[610px] lg:w-[640px] lg:h-[700px] text-gold/[0.03]" />
          </motion.div>
        </motion.div>

        {/* Hero content overlay */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold/80" />
            <span className="text-gold text-sm font-medium tracking-wide">
              Abuja, Nigeria
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="text-white">Jayralis</span>
            <br />
            <span className="text-gradient-gold">Company Limited</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/60 font-light max-w-2xl mx-auto mb-4 tracking-wide"
          >
            Vision. Opportunity. Growth.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-base sm:text-lg text-white/40 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Creating sustainable value through strategic investments and innovation across industries.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
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

      {/* ─── LEADERSHIP SECTION (About Us — Our People) ─── */}
      <section className="relative py-24 sm:py-32 bg-white noise-overlay">
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
                About Us &mdash; Our Leadership
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-6"
            >
              The People Behind
              <span className="text-gradient-gold"> Jayralis</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Visionary leaders and operators shaping the future of our holding company,
              driving excellence across every subsidiary and community we serve.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-8 flex items-center justify-center gap-3"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
              <div className="w-2 h-2 rounded-full bg-gold" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
            </motion.div>
          </motion.div>

          {/* Leadership cards grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {LEADERSHIP.map((person, i) => (
              <motion.div
                key={person.name}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -10, transition: { duration: 0.4 } }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-navy/5 shadow-[0_8px_30px_rgba(15,22,41,0.06)] hover:shadow-[0_24px_60px_rgba(15,22,41,0.15)] transition-all duration-500"
              >
                {/* Decorative gold corner accent */}
                <div className="absolute top-0 left-0 w-20 h-20 z-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gold/60 to-transparent" />
                  <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-gold/60 to-transparent" />
                </div>

                {/* Image with proper positioning */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-navy/5 to-navy/10">
                  <img
                    src={person.image}
                    alt={`${person.name} — ${person.role} at Jayralis Company Limited`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ objectPosition: person.imagePosition }}
                  />
                  {/* Bottom gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/30 to-transparent" />
                  {/* Subtle gold border on hover */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/30 transition-all duration-500" />

                  {/* Role badge */}
                  <div className="absolute top-5 right-5">
                    <span className="px-3.5 py-1.5 bg-gold text-navy-dark text-[10px] font-bold tracking-[0.15em] uppercase rounded-full shadow-lg shadow-gold/20">
                      {person.role}
                    </span>
                  </div>

                  {/* Initials watermark */}
                  <div className="absolute top-5 left-5 w-10 h-10 rounded-full border border-white/40 backdrop-blur-sm bg-white/10 flex items-center justify-center">
                    <span className="text-white text-xs font-bold tracking-wider">
                      {person.initials}
                    </span>
                  </div>

                  {/* Name overlay at bottom of image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl sm:text-2xl leading-tight mb-1.5">
                      {person.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-px bg-gold" />
                      <p className="text-gold text-[11px] font-semibold tracking-[0.18em] uppercase">
                        {person.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bio section */}
                <div className="p-6 sm:p-7">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {person.bio}
                  </p>
                  <div className="pt-5 border-t border-navy/5 flex items-center justify-between">
                    <span className="text-gold-dark text-[10px] font-bold tracking-[0.25em] uppercase">
                      Jayralis Company Limited
                    </span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-gold/60" />
                      <div className="w-1 h-1 rounded-full bg-gold/40" />
                      <div className="w-1 h-1 rounded-full bg-gold/20" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-20 text-center max-w-3xl mx-auto"
          >
            <p className="text-navy/70 text-lg sm:text-xl font-light italic leading-relaxed">
              &ldquo;Our leadership team brings together decades of combined experience in
              governance, operations, and media &mdash; united by a shared commitment to
              building lasting value for our brands, our people, and our communities.&rdquo;
            </p>
            <div className="mt-6 inline-flex items-center gap-3">
              <div className="h-px w-8 bg-gold/60" />
              <span className="text-gold-dark text-xs font-bold tracking-[0.25em] uppercase">
                The Jayralis Board
              </span>
              <div className="h-px w-8 bg-gold/60" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PORTFOLIO SECTION ─── */}
      <section id="portfolio" className="relative py-24 sm:py-32 bg-cream noise-overlay">
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
              const Icon = sub.IconComponent;
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
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sub.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-8 h-8 ${sub.accent}`} />
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
                      <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6 text-gold">
                        <path d="M24 6 C14 6 6 14 6 24 C6 34 14 42 24 42 C34 42 42 34 42 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="24" cy="24" r="5" fill="currentColor" opacity="0.6" />
                        <path d="M36 8 L42 6 L40 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="24" y1="19" x2="24" y2="10" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                      </svg>
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
                      <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6 text-gold">
                        <path d="M24 4 L28 18 L42 18 L30 28 L34 42 L24 34 L14 42 L18 28 L6 18 L20 18 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
                        <path d="M22 20 L24 14 L26 20 L26 28 L24 30 L22 28 Z" fill="currentColor" opacity="0.4" />
                      </svg>
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
                IconComponent: IconStrategy,
              },
              {
                title: "Shared Resources",
                desc: "Each subsidiary benefits from centralized technology infrastructure, legal counsel, and operational support — reducing overhead and accelerating growth across the entire portfolio.",
                items: ["Technology Platform", "Legal Framework", "Operational Support"],
                IconComponent: IconSharedResources,
              },
              {
                title: "Autonomous Excellence",
                desc: "Subsidiaries operate with full autonomy, cultivating their own distinct teams, culture, and industry-specific expertise — ensuring agility and market responsiveness at every level.",
                items: ["Independent Teams", "Distinct Culture", "Market Agility"],
                IconComponent: IconAutonomy,
              },
            ].map((item, i) => {
              const Icon = item.IconComponent;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i}
                  className="bg-white rounded-2xl p-8 border border-gold/10 shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold-light/10 flex items-center justify-center mb-6">
                    <Icon className="w-9 h-9 text-gold-dark" />
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
                href="mailto:Ceo@jayralis.fyi"
                className="group px-10 py-4 bg-gold text-navy-dark font-bold rounded-full text-base shadow-xl shadow-gold/25 hover:shadow-gold/40 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="mailto:Ceo@jayralis.fyi"
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
                  href="mailto:Ceo@jayralis.fyi"
                  className="hover:text-gold transition-colors"
                >
                  Ceo@jayralis.fyi
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
