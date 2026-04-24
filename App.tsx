import React, { useState, useEffect } from 'react';
import { MODULES } from './constants.ts';
import { SemesterState, ModuleMarks } from './types.ts';
import ModuleCard from './components/ModuleCard.tsx';
import Summary from './components/Summary.tsx';

const App: React.FC = () => {
  const STORAGE_KEY = 'semester_marks_fancy_v3';

  const [semesterState, setSemesterState] = useState<SemesterState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(semesterState));
  }, [semesterState]);

  const handleMarkChange = (moduleId: string, part: keyof ModuleMarks, value: number) => {
    setSemesterState((prev) => ({
      ...prev,
      [moduleId]: {
        ...(prev[moduleId] || {}),
        [part]: value,
      },
    }));
  };

  const resetAll = () => {
    if (window.confirm("Voulez-vous vraiment réinitialiser toutes les notes ?")) {
      setSemesterState({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <header className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight uppercase">
              M1 RSD S1
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={resetAll}
              className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl transition-all hover:bg-slate-800 active:scale-95 shadow-lg shadow-slate-200"
            >
              Reset All Data
            </button>
          </div>
        </header>

        <Summary modules={MODULES} state={semesterState} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MODULES.map((module) => (
            <ModuleCard
              key={module.id}
              config={module}
              marks={semesterState[module.id] || {}}
              onChange={handleMarkChange}
            />
          ))}
        </div>

        <footer className="mt-32 text-center space-y-6">
          <div className="inline-block px-10 py-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span> 
                Exam 60%
              </span>
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-slate-400"></span> 
                TD/TP 20-40%
              </span>
              <div className="w-px h-4 bg-slate-200 hidden md:block"></div>
              <span className="text-slate-600">M1 RSD S1 • {currentYear}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Automatic local save active
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;