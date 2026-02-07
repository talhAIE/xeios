"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Twitter, Github } from "lucide-react";

export default function Contact() {
    return (
        <footer id="contact" className="bg-black pt-24 pb-8 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-xeios/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 mb-20">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            Ready to scale your <span className="text-xeios">vision?</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-12">
                            Let&apos;s discuss how XeiosTech can accelerate your digital transformation.
                            Schedule a consultation or drop us a message.
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: Mail, text: "hello@xeiostech.com" },
                                { icon: MapPin, text: "San Francisco, CA • Global Remote" },
                                { icon: Twitter, text: "@XeiosTech" },
                                { icon: Linkedin, text: "XeiosTech Solutions" },
                                { icon: Github, text: "github.com/xeiostech" },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-4 text-gray-600 hover:text-xeios transition-colors cursor-pointer group">
                                    <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-xeios/10 transition-colors">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <form className="glass-panel p-8 rounded-2xl bg-gray-50 border border-gray-200 shadow-lg">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Name</label>
                                <input type="text" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-xeios focus:ring-1 focus:ring-xeios outline-none transition-all" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Email</label>
                                <input type="email" className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-xeios focus:ring-1 focus:ring-xeios outline-none transition-all" placeholder="john@company.com" />
                            </div>
                        </div>
                        <div className="space-y-2 mb-6">
                            <label className="text-sm font-semibold text-gray-700">Project Type</label>
                            <select className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-xeios focus:ring-1 focus:ring-xeios outline-none transition-all">
                                <option>AI Integration</option>
                                <option>Mobile App Development</option>
                                <option>Web Platform</option>
                                <option>Data Infrastructure</option>
                            </select>
                        </div>
                        <div className="space-y-2 mb-8">
                            <label className="text-sm font-semibold text-gray-700">Message</label>
                            <textarea rows={4} className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:border-xeios focus:ring-1 focus:ring-xeios outline-none transition-all" placeholder="Tell us about your project..." />
                        </div>
                        <button className="w-full py-4 bg-xeios hover:bg-xeios-dark text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg">
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; 2026 XeiosTech Solutions. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-xeios transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-xeios transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer >
    );
}
