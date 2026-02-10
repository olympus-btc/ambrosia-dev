import React from 'react';

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="group p-8 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-green-400/30 transition-all duration-300 hover:bg-neutral-900/80">
      <div className="mb-6 inline-flex p-3 rounded-xl bg-green-400/10 text-green-400 group-hover:scale-110 transition-transform duration-300">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h3 className="text-xl font-bold text-neutral-100 mb-3 group-hover:text-green-400 transition-colors">
        {title}
      </h3>
      <p className="text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}