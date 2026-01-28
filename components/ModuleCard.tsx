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

  const inputClasses = "w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-white font-bold text-lg placeholder:text-slate-700 placeholder:font-normal";

  const getWeightLabel = (part: 'exam' | 'td' | 'tp') => {
    if (part === 'exam') return !config.hasTd && !config.hasTp ? "100%" : "60%";
    if (part === 'td') return config.hasTp ? "20%" : "40%";
    if (part === 'tp') return config.hasTd ? "20%" : "40%";
    return "";
  };

  return (
    <div className="group bg-slate-900 rounded-3xl shadow-lg border border-slate-800 p-6 transition-all hover:shadow-2xl hover:border-slate-700 duration-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-100 leading-tight">{config.name}</h3>
          <span className="inline-block px-2 py-0.5 mt-2 bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-md">
            COEFF {config.coefficient}
          </span>
        </div>
        <div className={`px-4 py-2 rounded-xl border font-black tabular-nums text-lg ${statusClasses}`}>
          {average.toFixed(2)}
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-1.5 px-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">EXAM</label>
            <span className="text-[10px] font-bold text-indigo-400/50">{getWeightLabel('exam')}</span>
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

        {config.hasTd && (
          <div>
            <div className="flex justify-between mb-1.5 px-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">TD</label>
              <span className="text-[10px] font-bold text-indigo-400/50">{getWeightLabel('td')}</span>
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
          <div>
            <div className="flex justify-between mb-1.5 px-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">TP</label>
              <span className="text-[10px] font-bold text-indigo-400/50">{getWeightLabel('tp')}</span>
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
    </div>
  );
};

export default ModuleCard;