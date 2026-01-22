import React, { useState, useEffect } from 'react';

interface ApiKeyGateProps {
  onReady: () => void;
}

const ApiKeyGate: React.FC<ApiKeyGateProps> = ({ onReady }) => {
  const [hasKey, setHasKey] = useState(false);
  const [checking, setChecking] = useState(true);

  const checkKey = async () => {
    try {
      if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
        setHasKey(true);
        onReady();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        // Assume success to avoid race condition
        setHasKey(true);
        onReady();
      } catch (e) {
        console.error("Key selection failed or cancelled", e);
        // Retry check if needed
        checkKey();
      }
    } else {
        alert("AI Studio環境が検出されませんでした。");
    }
  };

  if (checking) return null;

  if (hasKey) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-lg p-8 shadow-2xl text-center">
        <h2 className="text-2xl font-cinzel font-bold text-red-500 mb-4">Linklelab Pre-Mortem</h2>
        <p className="text-slate-300 mb-6 leading-relaxed">
          このシミュレーションに必要な高度なGemini 3 Proモデル（推論および画像生成）にアクセスするには、<br/>
          有効なAPIキーを接続する必要があります。
        </p>
        
        <button
          onClick={handleSelectKey}
          className="w-full py-3 px-6 bg-red-800 hover:bg-red-700 text-white font-bold rounded-md transition-colors shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-600"
        >
          Google AIキーを接続
        </button>
        
        <p className="mt-4 text-xs text-slate-500">
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400">
            課金と利用制限について確認する
          </a>
        </p>
      </div>
    </div>
  );
};

export default ApiKeyGate;