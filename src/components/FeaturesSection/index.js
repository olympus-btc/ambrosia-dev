import React from 'react';
import Translate from '@docusaurus/Translate';
import { Code, Zap, Terminal } from 'lucide-react';
import FeatureCard from '@site/src/components/FeatureCard';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Code />,
      title: <Translate id="feature.api.title">API Reference</Translate>,
      description:
        <Translate id="feature.api.description">
          Documentación completa de endpoints para autenticación, gestión de inventario y cobros.
        </Translate>,
    },
    {
      icon: <Zap />,
      title: <Translate id="feature.lightning.title">Lightning Network</Translate>,
      description: 
        <Translate id="feature.lightning.description">
          Guías para conectar tu nodo LND o CLN y empezar a recibir pagos instantáneos con bajas comisiones.
        </Translate>,
    },
    {
      icon: <Terminal />,
      title: <Translate id="feature.cli.title">CLI Tools</Translate>,
      description:
        <Translate id="feature.cli.description">
          Herramientas de línea de comandos para automatizar tareas, configurar tu entorno POS y gestionar sats.
        </Translate>,
    },
  ];

  return (
    <section className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4">
            <Translate id="feature.devResources.title">Recursos para Desarrolladores</Translate>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            <Translate id="feature.devResources.description">Todo lo que necesitas para integrar pagos de Bitcoin en tu infraestructura.</Translate>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
