"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const navLinks = [
    { label: "Início", href: "/" },
    { label: "Projetos", href: "#projetos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contacto", href: "#contacto" },
  ];

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const ignoreScroll = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ignoreScroll.current) return; // ignora scroll temporariamente

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = () => {
    setShowNavbar(true);
    ignoreScroll.current = true; // ativa bloqueio

    // desativa o bloqueio depois de 500ms (tempo para scroll automático terminar)
    setTimeout(() => {
      ignoreScroll.current = false;
    }, 500);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: showNavbar ? 0 : -100, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-500" onClick={handleNavClick}>
          Portfólio
        </Link>

        <div className="flex gap-10">
          {navLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.href}
                onClick={handleNavClick}
                className="text-gray-200 hover:text-blue-400 transition-colors text-lg"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}