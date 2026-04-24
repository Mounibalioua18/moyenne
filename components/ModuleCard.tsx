import React from 'react';
import { ModuleConfig, ModuleMarks } from '../types.ts';
import { calculateModuleAverage, getStatusColor } from '../utils.ts';

interface Props {
  config: ModuleConfig;
  marks: ModuleMarks;
  onChange: (moduleId: string, part: keyof ModuleMarks, value: number) => void;
}

const ModuleCard: React.FC<Props> = ({ config, marks, onChange }) => {
  const average = calculateModuleAverage(config, marks);
  const statusClasses = getStatusColor(average);

  const handleInputChange = (part: keyof ModuleMarks, val: string) => {
    if (val === "") {
      onChange(config.id, part, undefined as any);
      return;
    }
    const num = parseFloat(val);
    const safeNum = isNaN(num) ? 0 : Math.min(20, Math.max(0, num));
    onChange(config.id, part, safeNum);
  };

  const inputClasses = "w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all text-slate-900 font-extrabold text-xl placeholder:text-slate-300 placeholder:font-normal";

  const getWeightLabel = (part: 'exam' | 'td' | 'tp') => {
    if (part === 'exam') return !config.hasTd && !config.hasTp ? "100%" : "60%";
    if (part === 'td') return config.hasTp ? "20%" : "40%";
    if (part === 'tp') return config.hasTd ? "20%" : "40%";
    return "";
  };

  return (
    <div className="group relative bg-white rounded-[2.5rem] border border-slate-200 p-9 transition-all hover:border-indigo-200 duration-300 shadow-sm">
      
      <div className="flex justify-between items-start mb-10">
        <div className="max-w-[70%]">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest rounded-full">
              Coeff {config.coefficient}
            </span>
          </div>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">{config.name}</h3>
        </div>
        <div className={`px-6 py-4 rounded-2xl border font-black tabular-nums text-2xl transition-colors duration-300 ${statusClasses}`}>
          {average.toFixed(2)}
        </div>
      </div>

      <div className="space-y-8">
        <div className="relative">
          <div className="flex justify-between mb-3 px-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">EXAM</label>
            <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-slate-400">{getWeightLabel('exam')}</span>
          </div>
          <input
            type="number"
            step="0.25"
            value={marks.exam ?? ''}
            onChange={(e) => handleInputChange('exam', e.target.value)}
            className={inputClasses}
            placeholder="0.00"
          />
        </div>

        {(config.hasTd || config.hasTp) && (
          <div className="grid grid-cols-1 gap-6">
            {config.hasTd && (
              <div className="relative">
                <div className="flex justify-between mb-3 px-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">TD</label>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-slate-400">{getWeightLabel('td')}</span>
                </div>
                <input
                  type="number"
                  step="0.25"
                  value={marks.td ?? ''}
                  onChange={(e) => handleInputChange('td', e.target.value)}
                  className={inputClasses}
                  placeholder="0.00"
                />
              </div>
            )}

            {config.hasTp && (
              <div className="relative">
                <div className="flex justify-between mb-3 px-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">TP</label>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-slate-400">{getWeightLabel('tp')}</span>
                </div>
                <input
                  type="number"
                  step="0.25"
                  value={marks.tp ?? ''}
                  onChange={(e) => handleInputChange('tp', e.target.value)}
                  className={inputClasses}
                  placeholder="0.00"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleCard;