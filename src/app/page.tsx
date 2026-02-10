import About from "@/components/About";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import Technologies from "@/components/Technologies";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-xeios/30 selection:text-white overflow-hidden">
      <Header />
      <Hero />
      <About />
      <Services />
      <Technologies />
      <Showcase />
      <Testimonials />
      <Contact />
    </main>
  );
}
