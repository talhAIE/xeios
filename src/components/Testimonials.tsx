"use client";

import { Testimonials as TestimonialsUI } from "@/components/ui/testimonials";

const testimonials = [
    {
        text: "XeiosTech completely transformed how we handle predictive analytics. Their AI models reduced our forecasting errors by 60%, saving us millions in inventory costs.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Sarah Mitchell",
        username: "Marketing Director | USA",
        social: "https://twitter.com/sarahmitchell"
    },
    {
        text: "Their team built us a custom automation pipeline that cut our manual processing time from 12 hours to under 30 minutes. Absolutely game-changing for our operations.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "James Whitfield",
        username: "Operations Director | UK",
        social: "https://twitter.com/jwhitfield"
    },
    {
        text: "We needed a partner who understood both AI and healthcare compliance. XeiosTech delivered a fully compliant solution that our entire staff adopted within weeks.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Sophia Nguyen",
        username: "Product Manager | Australia",
        social: "https://twitter.com/sophianguyen"
    },
    {
        text: "From initial consultation to deployment, XeiosTech demonstrated exceptional professionalism. Our e-commerce platform now handles 3x the traffic with zero downtime.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Ahmed Raza",
        username: "CEO, TechVentures | Pakistan",
        social: "https://twitter.com/ahmedraza"
    },
    {
        text: "The machine learning models they developed for our supply chain gave us real-time visibility we never had before. Our logistics costs dropped by 35% in six months.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Claire Dubois",
        username: "VP of Innovation | France",
        social: "https://twitter.com/clairedubois"
    },
    {
        text: "XeiosTech's approach to data engineering is world-class. They migrated our legacy systems to a modern cloud architecture without a single hour of downtime.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Markus Weber",
        username: "Head of Engineering | Germany",
        social: "https://twitter.com/mweber"
    },
    {
        text: "Working with XeiosTech felt like having an in-house AI team. Their developers integrated seamlessly with our workflow and delivered ahead of schedule.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Fatima Zahra",
        username: "Software Architect | Pakistan",
        social: "https://twitter.com/fzahra"
    },
    {
        text: "Their UI/UX team redesigned our analytics dashboard, and user engagement jumped 45%. The design is intuitive, fast, and our clients absolutely love it.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Erik Lindqvist",
        username: "CTO, NordicData | Sweden",
        social: "https://twitter.com/elindqvist"
    },
    {
        text: "We evaluated five agencies before choosing XeiosTech. Best decision we made — they delivered a scalable AI solution that grew with our business from day one.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Emily Thornton",
        username: "Head of Digital | UK",
        social: "https://twitter.com/ethornton"
    }
];

export default function Testimonials() {
    return (
        <section id="reviews" className="py-20 bg-background relative overflow-hidden">
            {/* Subtle background effects */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-xeios/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <TestimonialsUI
                    testimonials={testimonials}
                    title="Trusted by Teams Worldwide"
                    description="Hear from professionals across the globe who scaled their businesses with our AI-driven solutions."
                    maxDisplayed={6}
                />
            </div>
        </section>
    )
}
