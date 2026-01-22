import React from 'react';
import { GeneratedResult } from '../types';

interface DoomResultProps {
  result: GeneratedResult;
  onReset: () => void;
}

const DoomResult: React.FC<DoomResultProps> = ({ result, onReset }) => {
  const { scenario, imageUrl } = result;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 pb-20 animate-in fade-in duration-1000">
      
      {/* Layer 1: The News */}
      <section className="bg-slate-100 text-slate-900 rounded-sm overflow-hidden shadow-2xl relative">
        <div className="bg-red-700 text-white px-4 py-1 font-bold text-xs uppercase tracking-wider flex justify-between items-center">
          <span>速報</span>
          <span>{scenario.date}</span>
        </div>
        
        <div className="p-6 md:p-10">
          <h1 className="font-serif-news text-3xl md:text-5xl font-black mb-6 leading-tight border-b-4 border-slate-900 pb-4">
            {scenario.headline}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div className="order-2 md:order-1 font-serif-news text-lg leading-relaxed text-slate-800">
              <p className="whitespace-pre-line">{scenario.articleBody}</p>
            </div>
            
            <div className="order-1 md:order-2">
              {imageUrl ? (
                <div className="border border-slate-300 bg-slate-200 p-2 shadow-inner transform rotate-1">
                  <img src={imageUrl} alt="Collapse Visualization" className="w-full h-auto grayscale contrast-125" />
                  <p className="text-xs text-slate-500 mt-2 italic text-center font-serif-news">図1. 崩壊の爪痕</p>
                </div>
              ) : (
                <div className="w-full h-64 bg-slate-300 flex items-center justify-center text-slate-500 italic">
                  時間転送中に画像データが破損しました
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Layer 2: Autopsy */}
      <section>
        <div className="flex items-center gap-4 mb-8">
           <div className="h-px bg-red-900 flex-grow"></div>
           <h2 className="text-3xl font-cinzel text-red-500 uppercase tracking-widest text-center">死因徹底解剖</h2>
           <div className="h-px bg-red-900 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenario.failureAnalysis.map((category, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800 p-6 rounded-lg hover:border-red-900/50 transition-colors">
                    <h3 className="text-xl font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2">{category.categoryName}</h3>
                    <ul className="space-y-3">
                        {category.reasons.map((reason, rIdx) => (
                            <li key={rIdx} className="flex gap-3 text-slate-400 text-sm">
                                <span className="text-red-500 mt-1">✕</span>
                                <span>{reason}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </section>

      {/* Layer 3: Survival Guide */}
      <section className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-8 border border-green-900/30 shadow-[0_0_50px_rgba(20,83,45,0.1)]">
        <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
            <span>⚡</span> 時間パラドックス検知: 生存戦略
        </h2>
        <p className="text-slate-400 mb-6">
            このタイムラインはまだ確定していません。以下の変更を直ちに実行することで、上記の破滅を回避できる可能性が74%あります。
        </p>

        <div className="space-y-4">
            {scenario.survivalTips.map((tip, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-slate-950/50 rounded-lg border-l-4 border-green-600">
                    <span className="font-mono text-green-600 font-bold">0{idx + 1}</span>
                    <p className="text-slate-200">{tip}</p>
                </div>
            ))}
        </div>
      </section>

      <div className="flex justify-center pt-10">
        <button 
            onClick={onReset}
            className="px-8 py-3 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-full font-bold transition-all border border-slate-600"
        >
            別のシミュレーションを実行
        </button>
      </div>

    </div>
  );
};

export default DoomResult;