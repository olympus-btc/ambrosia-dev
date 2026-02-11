import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageHero from "@site/src/components/HomepageHero";
import FeaturesSection from "@site/src/components/FeaturesSection";
import BenefitsSection from "@site/src/components/BenefitsSection";
import TechStackSection from "@site/src/components/TechStackSection";
import ContributorCTA from "@site/src/components/ContributorCTA";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Contribuye al Futuro`}
      description="Portal de desarrolladores para Ambrosia POS. Documentación, guías y recursos para contribuir al proyecto."
    >
      <HomepageHero />
      <main className="bg--card">
        <FeaturesSection />
        <BenefitsSection />
        <TechStackSection />
        <ContributorCTA />
      </main>
    </Layout>
  );
}