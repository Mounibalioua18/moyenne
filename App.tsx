import React, { useState, useEffect } from 'react';
import { MODULES } from './constants.ts';
import { SemesterState, ModuleMarks } from './types.ts';
import ModuleCard from './components/ModuleCard.tsx';
import Summary from './components/Summary.tsx';

const App: React.FC = () => {
  const [semesterState, setSemesterState] = useState<SemesterState>(() => {
    try {
      const saved = localStorage.getItem('semester_marks_v2');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('semester_marks_v2', JSON.stringify(semesterState));
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
    if (window.confirm("Are you sure you want to clear all grades?")) {
      setSemesterState({});
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-[#020617] text-slate-100 selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <header className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-white tracking-tight leading-none">
              M1 RSD Average <span className="text-indigo-400">Calculator</span>
            </h1>
          </div>
          <button 
            onClick={resetAll}
            className="px-6 py-2.5 bg-slate-900 border border-slate-800 text-rose-400 font-bold rounded-2xl hover:bg-rose-500/10 hover:border-rose-500/30 transition-all shadow-sm active:scale-95"
          >
            Reset
          </button>
        </header>

        <Summary modules={MODULES} state={semesterState} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((module) => (
            <ModuleCard
              key={module.id}
              config={module}
              marks={semesterState[module.id] || {}}
              onChange={handleMarkChange}
            />
          ))}
        </div>

        <footer className="mt-20 py-12 border-t border-slate-900 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> EXAM 60%</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> TD/TP 20-40%</span>
            </div>
            <p className="text-sm font-medium text-slate-600 italic">
              Automatic local save active.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;