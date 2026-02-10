import React from 'react';

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="group p-8 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/5 hover:border-green-500/50 dark:hover:border-green-400/30 transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-900/80 shadow-sm hover:shadow-md">
      <div className="mb-6 inline-flex p-3 rounded-xl bg-green-500/10 dark:bg-green-400/10 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
        {title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}