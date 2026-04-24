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
  // If the module is validated (average >= 10), make it turn green (emerald)
  if (average >= 10) {
    return 'bg-emerald-600 text-white border-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
  }
  // If not validated, keep it in a professional dark slate/black as per "no red" preference
  return 'bg-slate-900 text-white border-black';
};