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
  if (average >= 14) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  if (average >= 10) return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
  if (average >= 8) return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
};