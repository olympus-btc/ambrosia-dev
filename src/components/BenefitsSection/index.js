import React from 'react';
import Translate from '@docusaurus/Translate';
import { BookOpen } from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    <Translate id="benefit.learnBitcoin">Domina los protocolos de Bitcoin y Lightning</Translate>,
    <Translate id="benefit.realExperience">Experiencia real en desarrollo de productos financieros</Translate>,
    <Translate id="benefit.mentorship">Mentoría directa de los maintainers del proyecto</Translate>,
    <Translate id="benefit.network">Networking con otros desarrolladores del ecosistema</Translate>,
    <Translate id="benefit.portfolio">Construye un portafolio público sólido en GitHub</Translate>,
    <Translate id="benefit.earlyAccess">Acceso temprano a nuevas herramientas y features</Translate>,
    <Translate id="benefit.swag">Posibilidad de ganar swag exclusivo del proyecto</Translate>,
    <Translate id="benefit.impact">Ayuda a la adopción masiva de Bitcoin</Translate>,
  ];

  return (
    <section className="py-24 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-ambrosia-green-900 dark:text-neutral-100 mb-8">
              Beneficios para Contribuidores
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-ambrosia-green-200 dark:border-white/10 text-ambrosia-green-800 dark:text-neutral-300 shadow-sm"
                >
                  <BookOpen className="text-green-600 dark:text-green-400 shrink-0" size={20} />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 rounded-2xl bg-green-500/5 dark:bg-green-400/10 border border-green-500/20 dark:border-green-400/20 text-center">
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">MIT</h3>
              <p className="text-ambrosia-green-700 dark:text-neutral-400 text-sm font-medium"><Translate id="stat.license">Licencia Open Source</Translate></p>
            </div>
            <div className="p-8 rounded-2xl bg-blue-500/5 dark:bg-blue-400/10 border border-blue-500/20 dark:border-blue-400/20 text-center">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">Kotlin</h3>
              <p className="text-blue-700 dark:text-neutral-400 text-sm font-medium"><Translate id="stat.backend">Backend Robusto</Translate></p>
            </div>
            <div className="p-8 rounded-2xl bg-yellow-500/5 dark:bg-yellow-400/10 border border-yellow-500/20 dark:border-yellow-400/20 text-center">
              <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">React</h3>
              <p className="text-yellow-700 dark:text-neutral-400 text-sm font-medium"><Translate id="stat.frontend">Frontend Moderno</Translate></p>
            </div>
            <div className="p-8 rounded-2xl bg-purple-500/5 dark:bg-purple-400/10 border border-purple-500/20 dark:border-purple-400/20 text-center">
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">Docs</h3>
              <p className="text-purple-700 dark:text-neutral-400 text-sm font-medium"><Translate id="stat.docs">Documentación Clara</Translate></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
