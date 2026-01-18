
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
  const colorClass = getStatusColor(average);

  const handleInputChange = (part: keyof ModuleMarks, val: string) => {
    if (val === "") {
        onChange(config.id, part, undefined as any);
        return;
    }
    const num = parseFloat(val);
    onChange(config.id, part, isNaN(num) ? 0 : Math.min(20, Math.max(0, num)));
  };

  const inputClasses = "w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-black font-bold text-lg placeholder:text-slate-400 placeholder:font-normal";

  // Dynamic weights for labels
  const isExamOnly = !config.hasTd && !config.hasTp;
  const examWeight = isExamOnly ? "100%" : "60%";
  const tdWeight = config.hasTp ? "20%" : "40%";
  const tpWeight = config.hasTd ? "20%" : "40%";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 leading-tight">{config.name}</h3>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">
            Coefficient: {config.coefficient}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full border text-sm font-black ${colorClass}`}>
          {average.toFixed(2)}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-tight">EXAMEN ({examWeight})</label>
          <input
            type="number"
            min="0"
            max="20"
            step="0.25"
            value={marks.exam ?? ''}
            onChange={(e) => handleInputChange('exam', e.target.value)}
            className={inputClasses}
            placeholder="0.00"
          />
        </div>

        {config.hasTd && (
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-tight">TD ({tdWeight})</label>
            <input
              type="number"
              min="0"
              max="20"
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
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-tight">TP ({tpWeight})</label>
            <input
              type="number"
              min="0"
              max="20"
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
