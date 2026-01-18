
import React, { useState, useEffect } from 'react';
import { MODULES } from './constants.ts';
import { SemesterState, ModuleMarks } from './types.ts';
import ModuleCard from './components/ModuleCard.tsx';
import Summary from './components/Summary.tsx';

const App: React.FC = () => {
  // Persistence logic
  const [semesterState, setSemesterState] = useState<SemesterState>(() => {
    try {
      const saved = localStorage.getItem('semester_marks');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Error reading from localStorage:", e);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('semester_marks', JSON.stringify(semesterState));
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

  return (
    <div className="min-h-screen pb-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <header className="relative z-30 flex flex-col items-center mb-8">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight text-center">
            Moyenne du <span className="text-indigo-600">Semestre</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Calculez vos résultats en quelques clics</p>
        </header>

        <Summary modules={MODULES} state={semesterState} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((module) => (
            <ModuleCard
              key={module.id}
              config={module}
              marks={semesterState[module.id] || {}}
              onChange={handleMarkChange}
            />
          ))}
        </div>

        <footer className="mt-16 text-center text-slate-400 text-sm font-medium pb-8 border-t border-slate-200 pt-8">
          <p>Règles : Examen (60%), TD (20%), TP (20%)</p>
          <p className="mt-1">Sauvegarde automatique activée.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
