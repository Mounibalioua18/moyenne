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
    <div className="relative mb-20">
      <div className="relative bg-white rounded-[3rem] p-12 md:p-16 border border-slate-200 shadow-sm flex flex-col items-center overflow-hidden">
        
        <div className="relative z-10 flex flex-col items-center">
          
          
          <div className="flex flex-col md:flex-row items-center justify-center mb-10 text-slate-900">
            <div className="flex items-baseline">
              <span className="text-8xl md:text-9xl font-black tracking-tighter leading-none">
                {semesterAverage.toFixed(2)}
              </span>
              <span className="text-4xl md:text-6xl font-black tracking-tighter text-slate-200 ml-4">
                / 20
              </span>
            </div>
          </div>

          <div className={`flex items-center px-10 py-5 rounded-2xl border transition-all duration-300 ${
            isPassing 
            ? 'bg-emerald-600 border-emerald-700 text-white' 
            : 'bg-slate-800 border-slate-900 text-white'
          }`}>
            <div className={`w-3 h-3 rounded-full mr-4 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] ${isPassing ? 'animate-pulse' : ''}`}></div>
            <span className="text-base font-black uppercase tracking-widest">
              {isPassing ? 'Semestre Validé' : 'Semestre Non-Validé'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;