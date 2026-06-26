import { Hero } from "@/components/sections/hero";
import { ClientsMarquee } from "@/components/sections/clients-marquee";
import { GuideSection } from "@/components/sections/guide-section";
import { StatsSection } from "@/components/sections/stats-section";
import { ServicesSection } from "@/components/sections/services-section";
import { MagnitudesSection } from "@/components/sections/magnitudes-section";
import { ProcessSection } from "@/components/sections/process-section";
import { AccreditationsSection } from "@/components/sections/accreditations-section";
import { CertificadosSection } from "@/components/sections/certificados-section";
import { VaisalaSection } from "@/components/sections/vaisala-section";
import { LabShowcase } from "@/components/sections/lab-showcase";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqJsonLd } from "@/components/seo/json-ld";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientsMarquee />
      <GuideSection />
      <StatsSection />
      <ServicesSection />
      <VaisalaSection />
      <LabShowcase />
      <MagnitudesSection />
      <ProcessSection />
      <AccreditationsSection />
      <CertificadosSection />
      <FaqSection />
      <CtaSection />
      <FaqJsonLd />
    </>
  );
}
