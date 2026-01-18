
import { ModuleConfig, ModuleMarks } from './types.ts';
import { WEIGHTS } from './constants.ts';

export const calculateModuleAverage = (config: ModuleConfig, marks: ModuleMarks): number => {
  const e = marks.exam ?? 0;
  const d = marks.td ?? 0;
  const p = marks.tp ?? 0;

  if (config.hasTd && config.hasTp) {
    return (e * WEIGHTS.EXAM_WITH_BOTH) + (d * WEIGHTS.TD_POND) + (p * WEIGHTS.TP_POND);
  }

  if (!config.hasTd && !config.hasTp) {
    return e * WEIGHTS.EXAM_FULL;
  }

  if (!config.hasTd && config.hasTp) {
    return (e * WEIGHTS.EXAM_WITH_BOTH) + (p * WEIGHTS.DUO_POND_SECONDARY);
  }

  if (config.hasTd && !config.hasTp) {
    return (e * WEIGHTS.EXAM_WITH_BOTH) + (d * WEIGHTS.DUO_POND_SECONDARY);
  }

  return 0;
};

export const getStatusColor = (average: number): string => {
  if (average >= 14) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  if (average >= 10) return 'text-indigo-700 bg-indigo-50 border-indigo-200';
  if (average >= 8) return 'text-amber-700 bg-amber-50 border-amber-200';
  return 'text-rose-700 bg-rose-50 border-rose-200';
};
