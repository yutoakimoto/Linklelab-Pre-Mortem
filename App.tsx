import React, { useState } from 'react';
import ApiKeyGate from './components/ApiKeyGate';
import InputForm from './components/InputForm';
import LoadingScreen from './components/LoadingScreen';
import DoomResult from './components/DoomResult';
import { ProjectInput, GeneratedResult } from './types';
import { generateDoomScenario, generateDoomImage } from './services/geminiService';

const App: React.FC = () => {
  const [apiKeyReady, setApiKeyReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedResult | null>(null);

  const handleFormSubmit = async (data: ProjectInput) => {
    setLoading(true);
    try {
      // 1. Generate the textual scenario
      const scenario = await generateDoomScenario(data);
      
      // 2. Generate the image based on the scenario
      // We pass the scenario and project name to give context
      const imageUrl = await generateDoomImage(scenario, data.name);
      
      setResult({ scenario, imageUrl });
    } catch (error) {
      console.error("Simulation failed:", error);
      alert("シミュレーションに失敗しました。タイムラインが不安定です。もう一度試してください。");
    } finally {
      setLoading(false);
    }
  };

  const resetSimulation = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-red-900 selection:text-white pb-20">
      <ApiKeyGate onReady={() => setApiKeyReady(true)} />

      <header className="py-8 px-4 text-center border-b border-slate-900 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
        <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500 mb-2">
          Linklelab <span className="text-red-600">Pre-Mortem</span>
        </h1>
        <p className="text-slate-500 text-sm md:text-base font-light tracking-wide">
          〜あなたの事業が3年後に詰む理由〜
        </p>
      </header>

      <main className="container mx-auto px-4 pt-12">
        {!apiKeyReady ? (
          <div className="flex h-64 items-center justify-center text-slate-600">
            ニューラルリンク(API Key)の接続待機中...
          </div>
        ) : (
          <>
            {!result && !loading && (
              <div className="animate-in slide-in-from-bottom-10 fade-in duration-700">
                 <p className="text-center text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    現在のプロジェクト詳細を入力してください。AIが2027年へ時間旅行し、<br className="hidden md:inline" />
                    致命的な失敗ポイントを特定して、生存に必要なデータを持ち帰ります。
                 </p>
                 <InputForm onSubmit={handleFormSubmit} isLoading={loading} />
              </div>
            )}

            {loading && <LoadingScreen />}

            {result && !loading && (
              <DoomResult result={result} onReset={resetSimulation} />
            )}
          </>
        )}
      </main>

      <footer className="mt-20 py-8 text-center text-slate-700 text-xs border-t border-slate-900">
        <p>Powered by Google Gemini 3 Pro & Gemini 3 Pro Image Preview</p>
        <p className="mt-2">精神的なダメージに対する責任は負いかねます。</p>
      </footer>
    </div>
  );
};

export default App;