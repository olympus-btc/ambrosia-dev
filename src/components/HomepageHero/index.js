import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import { Terminal, Book, Code, Github } from 'lucide-react';

export default function HomepageHero() {
  return (
    <section className="relative overflow-hidden flex items-center justify-center px-4 py-20 md:py-32 bg-[#000000]">
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
        
        {/* Columna Izquierda: Texto */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-400/10 border border-green-400/20 rounded-full text-xs font-mono text-green-400 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <Translate id="homepage.hero.eyebrow">DEVELOPER PORTAL v0.5.1</Translate>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            <Translate id="homepage.hero.headline.docs">Documentación</Translate> <br/>
            <span className="text-green-400">Ambrosia POS</span>
          </h1>

          <p className="text-lg text-neutral-400 max-w-xl leading-relaxed">
            <Translate id="homepage.hero.subheadline.docs">
              Explora nuestra API de pagos, guías de integración de Lightning Network y documentación técnica para construir sobre el estándar libre de Bitcoin.
            </Translate>
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              to="/docs/API/General"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-all hover:-translate-y-0.5 no-underline hover:text-black"
            >
              <Book size={20} />
              <Translate id="homepage.hero.cta.docs">Leer Docs</Translate>
            </Link>
            <Link
              to="https://github.com/olympus-btc/ambrosia"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 rounded-lg transition-all no-underline hover:text-white"
            >
              <Github size={20} />
              <Translate id="homepage.hero.cta.github">Repositorio</Translate>
            </Link>
          </div>
        </div>

        {/* Columna Derecha: Terminal */}
        <div className="hidden lg:block">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                </div>
                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest text-center">bash — ambrosia-setup</div>
                <Terminal size={14} className="text-neutral-600" />
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed text-left">
                <div className="flex gap-3">
                  <span className="text-green-500">$</span>
                  <span className="text-neutral-300">git clone https://github.com/olympus-btc/ambrosia.git</span>
                </div>
                <div className="flex gap-3 mt-2">
                  <span className="text-green-500">$</span>
                  <span className="text-neutral-300">cd ambrosia && npm install</span>
                </div>
                <div className="flex gap-3 mt-2">
                  <span className="text-green-500">$</span>
                  <span className="text-neutral-300 text-green-400/80">npm run dev</span>
                </div>
                <div className="mt-4 text-neutral-500 italic text-xs">
                  # Ready to accept Bitcoin & Lightning payments
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Grid background sutil */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(74,222,128,0.15)_0%,transparent_50%),radial-gradient(ellipse_at_80%_50%,rgba(52,211,153,0.12)_0%,transparent_40%),radial-gradient(ellipse_at_20%_80%,rgba(163,230,53,0.08)_0%,transparent_40%)]"></div>
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#39FF14 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0 pointer-events-none"></div>
    </section>
  );
}
