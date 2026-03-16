import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Carousel from './components/Carousel';
import Products from './components/Products';
import Policy from './components/Policy';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import CTA from './components/CTA';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after all components mount
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Journey />
      <Carousel />
      <Products />
      <Policy />
      <FAQ />
      <Contact />
      <CTA />
      <Footer />
    </>
  );
}
