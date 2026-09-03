import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CompanyIntro from "@/components/CompanyIntro";
import Capabilities from "@/components/Capabilities";
import Products from "@/components/Products";
import Solutions from "@/components/Solutions";
import Industries from "@/components/Industries";
import Technology from "@/components/Technology";
import Ecosystem from "@/components/Ecosystem";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CompanyIntro />
        <Capabilities />
        <Products />
        <Solutions />
        <Industries />
        <Technology />
        <Ecosystem />
        <Process />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
