import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import { Terminal, Book, Code, Github } from 'lucide-react';
import { useColorMode } from '@docusaurus/theme-common';

export default function HomepageHero() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <section className={`relative overflow-hidden flex items-center justify-center px-4 py-20 md:py-32 transition-colors duration-300 ${isDark ? 'bg-[#000000]' : 'bg-neutral-50'}`}>
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
        
        {/* Columna Izquierda: Texto */}
        <div className="flex flex-col gap-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono w-fit border ${
            isDark 
              ? 'bg-green-400/10 border-green-400/20 text-green-400' 
              : 'bg-[#3EB489]/20 border-[#3EB489]/30 text-[#2EA379]'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-green-400' : 'bg-[#3EB489]'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isDark ? 'bg-green-500' : 'bg-[#2EA379]'}`}></span>
            </span>
            <Translate id="homepage.hero.eyebrow">DEVELOPER PORTAL v0.5.1</Translate>
          </div>

          <h1 className={`text-4xl md:text-6xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            <Translate id="homepage.hero.headline.docs">Documentación</Translate> <br/>
            <span className={isDark ? 'text-green-400' : 'text-[#3EB489]'}>Ambrosia POS</span>
          </h1>

          <p className={`text-lg max-w-xl leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            <Translate id="homepage.hero.subheadline.docs">
              Explora nuestra API de pagos, guías de integración de Lightning Network y documentación técnica para construir sobre el estándar libre de Bitcoin.
            </Translate>
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              to="/docs/API/General"
              className={`inline-flex items-center gap-2 px-6 py-3 font-bold rounded-lg transition-all hover:-translate-y-1 no-underline shadow-xl ${
                isDark 
                  ? 'bg-green-500 hover:bg-green-400 text-black hover:text-black shadow-green-500/40' 
                  : 'bg-[#3EB489] hover:bg-[#2EA379] text-white hover:text-white shadow-[#3EB489]/50'
              }`}
            >
              <Book size={20} />
              <Translate id="homepage.hero.cta.docs">Leer Docs</Translate>
            </Link>
            <Link
              to="https://github.com/olympus-btc/ambrosia"
              className={`inline-flex items-center gap-2 px-6 py-3 font-medium border rounded-lg transition-all no-underline shadow-xl hover:shadow-2xl ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10 text-white border-white/10 hover:text-white shadow-black/60' 
                  : 'bg-white hover:bg-neutral-100 text-neutral-900 border-neutral-200 hover:text-neutral-900'
              }`}
            >
              <Github size={20} />
              <Translate id="homepage.hero.cta.github">Repositorio</Translate>
            </Link>
          </div>
        </div>

        {/* Columna Derecha: Terminal */}
        <div className="hidden lg:block">
          <div className="relative group">
            <div className={`absolute -inset-1 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 ${
              isDark ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20' : 'bg-gradient-to-r from-[#3EB489]/30 to-[#90EE90]/30'
            }`}></div>
            
            <div className={`relative border rounded-2xl overflow-hidden shadow-2xl ${
              isDark ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-neutral-200'
            }`}>
              <div className={`flex items-center justify-between px-4 py-3 border-b ${
                isDark ? 'bg-white/5 border-white/5' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <div className="flex gap-1.5">
                  <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-red-500/20' : 'bg-red-500/40'}`}></div>
                  <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-yellow-500/20' : 'bg-yellow-500/40'}`}></div>
                  <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-green-500/20' : 'bg-green-500/40'}`}></div>
                </div>
                <div className={`text-[10px] font-mono uppercase tracking-widest text-center ${
                  isDark ? 'text-neutral-500' : 'text-neutral-400'
                }`}>bash — jordypirata@ambrosia</div>
                <Terminal size={14} className={isDark ? 'text-neutral-600' : 'text-neutral-400'} />
              </div>
              <div className={`p-6 font-mono text-sm leading-relaxed text-left ${
                isDark ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                <div className="flex gap-3">
                  <span className={isDark ? 'text-green-500' : 'text-[#3EB489]'}>»</span>
                  <span>git clone https://github.com/olympus-btc/ambrosia.git</span>
                </div>
                <div className="flex gap-3 mt-2">
                  <span className={isDark ? 'text-green-500' : 'text-[#3EB489]'}>»</span>
                  <span>cd ambrosia/server && ./gradlew run</span>
                </div>
                <div className="flex gap-3 mt-2">
                  <span className={isDark ? 'text-green-500' : 'text-[#3EB489]'}>»</span>
                  <span>cd ../client && npm run dev</span>
                </div>
                <div className={`mt-4 italic text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  # Build the future of Bitcoin payments
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Background Effects */}
      <div className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 ${
        isDark 
          ? 'bg-[radial-gradient(ellipse_at_50%_0%,rgba(74,222,128,0.15)_0%,transparent_50%),radial-gradient(ellipse_at_80%_50%,rgba(52,211,153,0.12)_0%,transparent_40%),radial-gradient(ellipse_at_20%_80%,rgba(163,230,53,0.08)_0%,transparent_40%)]' 
          : ''
      }`}>
        {!isDark && (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#3EB489]/25 blur-[120px]" />
            <div className="absolute bottom-[0%] right-[-5%] w-[45%] h-[45%] rounded-full bg-[#90EE90]/30 blur-[100px]" />
            <div className="absolute top-[20%] right-[10%] w-[35%] h-[35%] rounded-full bg-[#3EB489]/20 blur-[80px]" />
          </>
        )}
      </div>
      <div className={`absolute inset-0 z-0 pointer-events-none ${
        isDark 
          ? 'bg-gradient-to-b from-black via-transparent to-black' 
          : 'bg-gradient-to-t from-neutral-200/20 via-transparent to-transparent'
      }`}></div>
    </section>
  );
}
