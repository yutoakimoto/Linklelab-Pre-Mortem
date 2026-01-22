import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [log, setLog] = useState("時間跳躍を初期化中...");

  const logs = [
    "2026年の市場トレンドを分析中...",
    "競合のピボットをシミュレーション中...",
    "キャッシュバーンレートを計算中...",
    "致命的な法的脆弱性を検出中...",
    "破産申請書類を作成中...",
    "プレスリリースを起草中...",
    "崩壊後の光景を視覚化中..."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setLog(logs[i]);
        i++;
      }
    }, 1500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-pulse">
      <div className="w-16 h-16 border-4 border-red-900 border-t-red-500 rounded-full animate-spin mb-8"></div>
      <h3 className="text-2xl font-cinzel text-red-500 mb-2">Simulating Future Timeline</h3>
      {/* Fixed: Escape '>' characters for JSX compatibility */}
      <p className="font-mono text-slate-400 text-sm">&gt;&gt; {log}</p>
    </div>
  );
};

export default LoadingScreen;