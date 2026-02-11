import React from 'react';
import Translate from '@docusaurus/Translate';
import { Code2, Atom, Monitor, Zap, Database, Globe } from 'lucide-react';

export default function TechStackSection() {
  const technologies = [
    {
      name: "Kotlin",
      icon: <Code2 />,
      description: <Translate id="theme.techStack.kotlin">Framework de Backend para Kotlin.</Translate>,
    },
    {
      name: "React",
      icon: <Atom />,
      description: <Translate id="theme.techStack.react">Biblioteca para interfaces de usuario dinámicas.</Translate>,
    },
    {
      name: "Electron",
      icon: <Monitor />,
      description: <Translate id="theme.techStack.electron">Distribución multiplataforma para escritorio.</Translate>,
    },
    { 
      name: "Lightning SDK", 
      icon: <Zap />,
      description: <Translate id="theme.techStack.ln">Integración profunda con phoenixd.</Translate> 
    },
    { 
      name: "SQLite", 
      icon: <Database />,
      description: <Translate id="theme.techStack.sqlite">Base de datos local.</Translate> 
    },
    {
      name: "Docusaurus",
      icon: <Globe />,
      description: <Translate id="theme.techStack.docusaurus">Esta plataforma de documentación.</Translate>,
    },
  ];

  return (
    <section className="py-24 px-4 bg-transparent relative overflow-hidden">
      {/* Neon Glow Effects (Solo visibles/destacados en dark mode) */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-500/10 dark:bg-green-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 dark:bg-green-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-ambrosia-green-900 dark:text-neutral-100 mb-4">
            <Translate id="theme.techStack.title">Nuestro Stack Tecnológico</Translate>
          </h2>
          <p className="text-ambrosia-green-800 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            <Translate id="theme.techStack.description">
              Herramientas modernas que los desarrolladores aman usar
            </Translate>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-3xl bg-white/50 dark:bg-neutral-900/40 border border-ambrosia-green-200 dark:border-white/5 hover:border-green-500/50 dark:hover:border-green-400/40 transition-all duration-300 group shadow-sm hover:shadow-2xl dark:hover:shadow-[0_0_30px_rgba(74,222,128,0.15)] hover:-translate-y-2"
            >
              <div className="mb-6 inline-flex p-3 rounded-2xl bg-green-500/10 dark:bg-green-400/10 text-green-600 dark:text-green-400 group-hover:scale-110 group-hover:bg-green-500/20 dark:group-hover:bg-green-400/20 group-hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] transition-all duration-300">
                {React.cloneElement(tech.icon, { size: 28 })}
              </div>
              <h4 className="text-xl font-bold text-ambrosia-green-900 dark:text-neutral-100 mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {tech.name}
              </h4>
              <p className="text-ambrosia-green-800 dark:text-neutral-400 text-sm leading-relaxed">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
