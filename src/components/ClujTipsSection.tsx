import React, { useState } from 'react';
import { PRACTICAL_TIPS } from '../data/clujData';
import { CreditCard, PlaneTakeoff, Footprints, Smile, Coffee, ShieldCheck, ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  CreditCard,
  PlaneTakeoff,
  Footprints,
  Smile,
  Coffee,
  ShieldCheck,
};

export const ClujTipsSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="my-16 py-12 px-6 sm:px-10 rounded-3xl bg-stone-900 text-stone-100 relative overflow-hidden shadow-2xl">
      {/* Background Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold mb-3 border border-orange-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ghid de Supraviețuire & Ponturi Utile</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
            Prima dată la Cluj? Ce trebuie să știi
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-2 max-w-2xl mx-auto">
            Lucruri practice care îți fac cele 3 zile mult mai lejere: de la transport contactless până la ritmul ardelenesc.
          </p>
        </div>

        {/* Grid of Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRACTICAL_TIPS.map((tip, idx) => {
            const IconComponent = iconMap[tip.icon] || HelpCircle;
            const isOpen = openIndex === idx;

            return (
              <div
                key={tip.title}
                onClick={() => toggleIndex(idx)}
                className={`cursor-pointer rounded-2xl border transition-all duration-200 p-5 ${
                  isOpen
                    ? 'bg-stone-800/90 border-orange-500/50 shadow-lg shadow-orange-950/30'
                    : 'bg-stone-800/40 border-stone-800 hover:border-stone-700 hover:bg-stone-800/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-white">
                        {tip.title}
                      </h3>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {tip.summary}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen ? 'rotate-180 text-orange-400' : ''
                    }`}
                  />
                </div>

                {isOpen && (
                  <div className="mt-4 pt-3 border-t border-stone-700/60 text-xs sm:text-sm text-stone-300 leading-relaxed animate-in fade-in duration-200">
                    {tip.details}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
