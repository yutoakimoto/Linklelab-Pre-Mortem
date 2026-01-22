import React, { useState } from 'react';
import { ProjectInput } from '../types';

interface InputFormProps {
  onSubmit: (data: ProjectInput) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ProjectInput>({
    name: '',
    description: '',
    target: '',
    monetization: '',
    challenges: '',
    techStack: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/50 p-6 md:p-8 rounded-xl border border-slate-800 backdrop-blur-sm">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-slate-100 flex items-center gap-2">
        <span className="text-red-500">⚠️</span> プロジェクト診断カルテ
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">プロジェクト / サービス名</label>
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-red-900 focus:border-red-700 outline-none transition"
            placeholder="例: 猫用Uber (Uber for Cats)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">概要：どのような価値を提供しますか？</label>
          <textarea
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full bg-slate-950 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-red-900 focus:border-red-700 outline-none transition"
            placeholder="サービスの核心となる価値提案を入力してください..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">ターゲット層</label>
            <input
              name="target"
              value={formData.target}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-red-900 focus:border-red-700 outline-none transition"
              placeholder="例: 多忙な専門職、Z世代"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">マネタイズ戦略</label>
            <input
              name="monetization"
              value={formData.monetization}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-red-900 focus:border-red-700 outline-none transition"
              placeholder="例: サブスクリプション、広告モデル"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">現状の課題 / 不安要素</label>
          <textarea
            name="challenges"
            value={formData.challenges}
            onChange={handleChange}
            rows={2}
            className="w-full bg-slate-950 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-red-900 focus:border-red-700 outline-none transition"
            placeholder="夜も眠れない悩みはありますか？（正直に書くほどシミュレーション精度が上がります）"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">技術スタック & チーム体制</label>
          <input
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-red-900 focus:border-red-700 outline-none transition"
            placeholder="例: React/Node.js, ジュニア開発者2名"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 text-lg font-bold rounded-md shadow-lg transition-all 
              ${isLoading 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600 text-white shadow-red-900/20'
              }`}
          >
            {isLoading ? '崩壊シナリオを生成中...' : '3年後の未来をシミュレーションする'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;