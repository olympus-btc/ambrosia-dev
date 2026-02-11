import React from 'react';
import Translate from '@docusaurus/Translate';
import { CheckCircle2, Shield, Cpu, Layers, FileCode } from 'lucide-react';

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
          
          {/* Columna Izquierda: Lista de Beneficios */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-ambrosia-green-900 dark:text-neutral-100 mb-4">
              <Translate id="homepage.benefits.title">¿Por qué contribuir?</Translate>
            </h2>
            <p className="text-ambrosia-green-800 dark:text-neutral-400 text-lg mb-10 max-w-lg">
              <Translate id="homepage.benefits.subtitle">Únete a una comunidad de desarrolladores apasionados y deja tu huella en el futuro de los pagos libres.</Translate>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/40 dark:bg-white/5 border border-ambrosia-green-200/50 dark:border-white/10 text-ambrosia-green-800 dark:text-neutral-300 transition-all hover:translate-x-1 hover:bg-white/60 dark:hover:bg-white/10 group shadow-sm"
                >
                  <CheckCircle2 className="text-green-600 dark:text-green-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                  <span className="text-sm font-medium leading-snug">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Stats/Tech Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="group p-8 rounded-3xl bg-green-500/10 dark:bg-green-400/10 border border-green-500/30 dark:border-green-400/20 text-center transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/20">
              <div className="mb-4 inline-flex p-3 rounded-2xl bg-green-500/20 text-green-700 dark:text-green-400">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-1">MIT</h3>
              <p className="text-ambrosia-green-900/80 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider"><Translate id="stat.license">Open Source</Translate></p>
            </div>

            <div className="group p-8 rounded-3xl bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/30 dark:border-blue-400/20 text-center transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20">
              <div className="mb-4 inline-flex p-3 rounded-2xl bg-blue-500/20 text-blue-700 dark:text-blue-400">
                <Cpu size={32} />
              </div>
              <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-1">Kotlin</h3>
              <p className="text-blue-900/80 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider"><Translate id="stat.backend">Backend</Translate></p>
            </div>

            <div className="group p-8 rounded-3xl bg-yellow-500/10 dark:bg-yellow-400/10 border border-yellow-500/30 dark:border-yellow-400/20 text-center transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-yellow-500/20">
              <div className="mb-4 inline-flex p-3 rounded-2xl bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">
                <Layers size={32} />
              </div>
              <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-400 mb-1">React</h3>
              <p className="text-yellow-900/80 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider"><Translate id="stat.frontend">Frontend</Translate></p>
            </div>

            <div className="group p-8 rounded-3xl bg-purple-500/10 dark:bg-purple-400/10 border border-purple-500/30 dark:border-purple-400/20 text-center transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="mb-4 inline-flex p-3 rounded-2xl bg-purple-500/20 text-purple-700 dark:text-purple-400">
                <FileCode size={32} />
              </div>
              <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-400 mb-1">Docs</h3>
              <p className="text-purple-900/80 dark:text-neutral-400 text-xs font-bold uppercase tracking-wider"><Translate id="stat.docs">Documentación</Translate></p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
