"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Technologies", href: "#technologies" },
    { name: "Showcase", href: "#showcase" },
    { name: "Reviews", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/70 backdrop-blur-md border-b border-gray-100/40 py-2 shadow-sm"
                    : "bg-white/70 backdrop-blur-md border-b border-gray-100/40 py-3"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center group">
                    {/* Negative margins let the logo render larger without increasing header height.
                        The logo image has significant internal whitespace, so we oversize the
                        container and let object-contain handle the rest. */}
                    <div className="relative h-20 w-56 md:h-24 md:w-72 -my-4 transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src="/xeios_logo.png"
                            alt="XeiosTech Solutions"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-600 hover:text-xeios transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-xeios transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    <motion.div
                        animate={{
                            boxShadow: [
                                "0 0 15px -5px rgba(103,44,141,0.5)",
                                "0 0 25px 0px rgba(103,44,141,0.6)",
                                "0 0 15px -5px rgba(103,44,141,0.5)",
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="rounded-full"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="#contact"
                            className="block px-5 py-2 text-sm font-semibold text-white bg-xeios/80 hover:bg-xeios rounded-full transition-colors duration-300"
                        >
                            Get Started
                        </Link>
                    </motion.div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-600 hover:text-xeios"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-200 overflow-hidden shadow-lg"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-gray-600 hover:text-xeios transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="#contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full text-center py-3 font-semibold text-white bg-xeios rounded-lg hover:bg-xeios/90 transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
