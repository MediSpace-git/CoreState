import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CompanyIntro from "@/components/CompanyIntro";
import Capabilities from "@/components/Capabilities";
import Products from "@/components/Products";
import Solutions from "@/components/Solutions";
import Industries from "@/components/Industries";
import Ecosystem from "@/components/Ecosystem";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { coreStateGraph } from "@/lib/json-ld";
import { homeSeo, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(homeSeo);

export default function Home() {
  return (
    <>
      <JsonLd data={coreStateGraph()} />
      <Navbar />
      <main>
        <Hero />
        <CompanyIntro />
        <Capabilities />
        <Products />
        <Solutions />
        <Industries />
        <Ecosystem />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
