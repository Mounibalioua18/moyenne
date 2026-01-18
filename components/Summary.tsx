
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
    <div className="bg-indigo-900 text-white rounded-3xl p-6 md:p-8 shadow-xl mb-8 md:sticky md:top-4 z-20 overflow-hidden text-center transition-all">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-800 rounded-full opacity-50 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-700 rounded-full opacity-30 blur-3xl pointer-events-none"></div>

      <div className="relative flex flex-col items-center">
        <h2 className="text-indigo-200 font-semibold uppercase tracking-widest text-xs md:text-sm mb-1">
          Moyenne du Semestre
        </h2>
        
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-5xl md:text-7xl font-black tracking-tighter">
            {semesterAverage.toFixed(2)}
          </span>
          <span className="text-xl md:text-2xl font-medium text-indigo-300">/ 20</span>
        </div>

        <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
          <span className={`w-3 h-3 rounded-full mr-3 ${isPassing ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse`}></span>
          <span className="text-sm md:text-base font-black uppercase tracking-tight">
            {isPassing ? 'Semestre Validé' : 'Semestre Non Validé'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Summary;
