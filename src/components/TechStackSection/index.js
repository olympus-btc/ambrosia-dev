import React from 'react';
import Translate from '@docusaurus/Translate';

export default function TechStackSection() {
  const technologies = [
    {
      name: "Kotlin",
      description: <Translate id="theme.techStack.ktor">Lenguaje principal del backend, seguro y conciso.</Translate>,
    },
    {
      name: "React",
      description: <Translate id="theme.techStack.react">Biblioteca para interfaces de usuario dinámicas.</Translate>,
    },
    {
      name: "Electron",
      description: <Translate id="theme.techStack.electron">Distribución multiplataforma para escritorio.</Translate>,
    },
    { name: "Lightning SDK", description: <Translate id="theme.techStack.ln">Integración profunda con LND y nodos.</Translate> },
    { name: "SQLite", description: <Translate id="theme.techStack.sqlite">Persistencia de datos ligera y local.</Translate> },
    {
      name: "Docusaurus",
      description: <Translate id="theme.techStack.docusaurus">Esta plataforma de documentación.</Translate>,
    },
  ];

  return (
    <section className="py-24 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ambrosia-green-900 dark:text-neutral-100 mb-4">
            <Translate id="theme.techStack.title">Nuestro Stack Tecnológico</Translate>
          </h2>
          <p className="text-ambrosia-green-800 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            <Translate id="theme.techStack.description">
              Herramientas modernas que los desarrolladores aman usar
            </Translate>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-white/50 dark:bg-white/5 border border-ambrosia-green-200 dark:border-white/10 hover:border-green-500/50 dark:hover:border-green-400/30 transition-all group shadow-sm">
              <h4 className="text-lg font-bold text-ambrosia-green-900 dark:text-neutral-100 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{tech.name}</h4>
              <p className="text-ambrosia-green-800 dark:text-neutral-400 text-sm leading-relaxed">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
