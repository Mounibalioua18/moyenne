import React from 'react';
import { ModuleConfig, SemesterState } from '../types';
import { calculateModuleAverage } from '../utils';

interface Props {
  modules: ModuleConfig[];
  state: SemesterState;
}

const Summary: React.FC<Props> = ({ modules, state }) => {
  let totalWeightedAverage = 0;
  let totalCoefficients = 0;

  modules.forEach((mod) => {
    const marks = state[mod.id] || {};
    const avg = calculateModuleAverage(mod, marks);
    totalWeightedAverage += avg * mod.coefficient;
    totalCoefficients += mod.coefficient;
  });

  const semesterAverage = totalCoefficients > 0 ? totalWeightedAverage / totalCoefficients : 0;
  const isPassing = semesterAverage >= 10;

  return (
    <div className="bg-[#1a195e] text-white rounded-[2rem] p-8 shadow-2xl mb-12 text-center transition-all relative overflow-hidden border border-indigo-500/20">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.4),transparent)] pointer-events-none"></div>
      
      <div className="relative flex flex-col items-center">
        <h2 className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-2">
          Semester Average
        </h2>
        
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-7xl md:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            {semesterAverage.toFixed(2)}
          </span>
          <span className="text-2xl md:text-3xl font-bold text-slate-500">/ 20</span>
        </div>

        <div className={`inline-flex items-center px-6 py-2 rounded-full border ${isPassing ? 'border-emerald-500/40 bg-emerald-500/5 text-emerald-300' : 'border-rose-500/40 bg-rose-500/5 text-rose-300'}`}>
          <span className={`w-2.5 h-2.5 rounded-full mr-3 ${isPassing ? 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]' : 'bg-rose-400 shadow-[0_0_15px_rgba(251,113,133,0.8)]'}`}></span>
          <span className="text-xs md:text-sm font-black uppercase tracking-widest">
            {isPassing ? 'Semester Passed' : 'Semester Failed'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Summary;