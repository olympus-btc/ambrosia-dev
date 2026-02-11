import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import { Cpu, BookOpen, Coffee, Github } from 'lucide-react';

export default function ContributorCTA() {
  return (
    <section className="py-24 px-4 bg-transparent border-t border-ambrosia-green-200 dark:border-white/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-ambrosia-green-900 dark:text-neutral-100 mb-6">
          <Translate id="homepage.contributor.title">¿Listo para escribir código?</Translate>
        </h2>
        <h3 className="text-xl text-ambrosia-green-800 dark:text-neutral-400 mb-10">
          <Translate id="homepage.contributor.subtitle">Revisa nuestros issues abiertos o lee la guía de contribución para empezar.</Translate>
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-neutral-900 font-bold rounded-xl transition-all hover:-translate-y-1 shadow-lg shadow-green-500/20 no-underline hover:text-neutral-900"
            to="/docs/Development/Setup"
          >
            <Cpu size={20} />
            <Translate id="homepage.contributor.cta.setup">Configurar Entorno</Translate>
          </Link>
          <Link
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/50 dark:bg-white/5 hover:bg-white/10 text-ambrosia-green-900 dark:text-neutral-100 font-bold rounded-xl border border-ambrosia-green-200 dark:border-white/10 transition-all hover:-translate-y-1 no-underline hover:text-ambrosia-green-900 dark:hover:text-neutral-100"
            to="/docs/API/Authentication/Auth"
          >
            <BookOpen size={20} />
            <Translate id="homepage.contributor.cta.docs">Documentación API</Translate>
          </Link>
        </div>
        <div className="mt-12 flex items-center justify-center gap-8 text-ambrosia-green-700 dark:text-neutral-500 text-sm">
          <span className="flex items-center gap-2">
            <Coffee size={16} />
            <Translate id="homepage.contributor.footer.coffee">Código hecho con café y pasión</Translate>
          </span>
          <span className="flex items-center gap-2">
            <Github size={16} />
            <Translate id="homepage.contributor.footer.prs">PRs son bienvenidos</Translate>
          </span>
        </div>
      </div>
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
