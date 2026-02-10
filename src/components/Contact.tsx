"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const quickLinks = [
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Showcase", href: "#showcase" },
  { name: "Reviews", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const services = [
  "Web Development",
  "Mobile Development",
  "AI Solutions",
  "VR Development",
  "Game Development",
  "Data Analytics",
];

export default function Contact() {
  return (
    <>
      {/* ════════════════════════════════════════════
          CONTACT SECTION
         ════════════════════════════════════════════ */}
      <section
        id="contact"
        className="relative bg-[#0A0118] pt-20 pb-24 overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-xeios/10 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/20 blur-[140px] rounded-full pointer-events-none" />

        {/* Top heading area */}
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-none mb-3">
              Contact{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-xeios via-purple-400 to-xeios-light">
                Us
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Start a conversation today.
            </p>
          </motion.div>

          {/* Two-column: Info + Form */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* ── Left: Contact Info ── */}
            <motion.div
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-xeios/10 border border-xeios/20 text-xeios text-sm font-semibold mb-6">
                Get in Touch
              </span>

              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                Contact Experts
              </h3>

              <p className="text-gray-400 leading-relaxed mb-10 max-w-md">
                From AI-powered systems and full-stack web/app development to
                AR/VR experiences, metaverse environments, and game development
                — we build what you imagine, beautifully and{" "}
                <span className="text-xeios-light italic">intelligently.</span>
              </p>

              {/* Contact details */}
              <div className="space-y-5 mb-10">
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-xeios" />
                    <span className="text-xs font-bold text-xeios uppercase tracking-wider">
                      Email Support
                    </span>
                  </div>
                  <a
                    href="mailto:contact@xeiostech.com"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    contact@xeiostech.com
                  </a>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-xeios" />
                    <span className="text-xs font-bold text-xeios uppercase tracking-wider">
                      Let&apos;s Talk
                    </span>
                  </div>
                  <div className="flex flex-col text-gray-300 text-sm">
                    <a
                      href="tel:+1234567890"
                      className="hover:text-white transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-xeios" />
                    <span className="text-xs font-bold text-xeios uppercase tracking-wider">
                      Head Office
                    </span>
                  </div>
                  <span className="text-gray-300 text-sm">
                    Global Remote • Serving Worldwide
                  </span>
                </div>
              </div>

              {/* Social media */}
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-4">
                  Follow our social media
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, href: "#", label: "Facebook" },
                    { icon: Instagram, href: "#", label: "Instagram" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 rounded-full bg-xeios/10 border border-xeios/20 flex items-center justify-center text-xeios hover:bg-xeios hover:text-white transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Right: Contact Form ── */}
            <motion.div
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <form className="bg-[#110822] border border-purple-900/40 rounded-2xl p-8 md:p-10 shadow-2xl shadow-xeios/5">
                <h3 className="text-xl font-bold text-white mb-1">
                  Send us a message
                </h3>
                <p className="text-gray-500 text-sm mb-8">
                  AI, Web &amp; App Development, AR/VR, Metaverse, Gaming
                </p>

                {/* Name + Company */}
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold text-gray-400 mb-1.5 block"
                    >
                      Name <span className="text-xeios">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="name"
                      required
                      className="w-full bg-[#1A0E2E] border border-purple-900/40 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-xeios focus:ring-1 focus:ring-xeios/50 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="text-xs font-semibold text-gray-400 mb-1.5 block"
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="company"
                      className="w-full bg-[#1A0E2E] border border-purple-900/40 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-xeios focus:ring-1 focus:ring-xeios/50 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Phone + Email */}
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label
                      htmlFor="phone"
                      className="text-xs font-semibold text-gray-400 mb-1.5 block"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="phone"
                      className="w-full bg-[#1A0E2E] border border-purple-900/40 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-xeios focus:ring-1 focus:ring-xeios/50 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-gray-400 mb-1.5 block"
                    >
                      Email <span className="text-xeios">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email"
                      required
                      className="w-full bg-[#1A0E2E] border border-purple-900/40 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-xeios focus:ring-1 focus:ring-xeios/50 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-5">
                  <label
                    htmlFor="subject"
                    className="text-xs font-semibold text-gray-400 mb-1.5 block"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="subject"
                    className="w-full bg-[#1A0E2E] border border-purple-900/40 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-xeios focus:ring-1 focus:ring-xeios/50 outline-none transition-all"
                  />
                </div>

                {/* Message */}
                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold text-gray-400 mb-1.5 block"
                  >
                    Message <span className="text-xeios">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="message"
                    required
                    className="w-full bg-[#1A0E2E] border border-purple-900/40 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-xeios focus:ring-1 focus:ring-xeios/50 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-xeios to-xeios-light text-white font-bold rounded-full hover:shadow-[0_0_25px_rgba(103,44,141,0.4)] hover:scale-105 transition-all duration-300"
                >
                  Send Message
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
         ════════════════════════════════════════════ */}
      <footer className="bg-[#060010] border-t border-purple-900/30 pt-16 pb-6">
        <div className="container mx-auto px-6">
          {/* Footer columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-bold text-lg mb-3 tracking-tight">
                XeiosTech
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-xs">
                Endless Possibilities.
                <br />
                Next Imagine.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Linkedin, label: "LinkedIn" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-xeios hover:border-xeios/30 transition-all duration-300"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-500 text-sm hover:text-xeios transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5">Services</h4>
              <ul className="space-y-3">
                {services.map((name) => (
                  <li key={name}>
                    <Link
                      href="#services"
                      className="text-gray-500 text-sm hover:text-xeios transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-sm mb-5">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:info@xeiostech.com"
                    className="text-gray-500 text-sm hover:text-xeios transition-colors"
                  >
                    info@xeiostech.com
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hr@xeiostech.com"
                    className="text-gray-500 text-sm hover:text-xeios transition-colors"
                  >
                    hr@xeiostech.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-purple-900/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 text-xs text-gray-600">
              <a href="#" className="hover:text-xeios transition-colors">
                Legal
              </a>
              <a href="#" className="hover:text-xeios transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-xeios transition-colors">
                Terms &amp; Conditions
              </a>
            </div>
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} XeiosTech. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
