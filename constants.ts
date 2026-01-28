import { ModuleConfig } from './types';

export const MODULES: ModuleConfig[] = [
  { id: 'algo', name: 'Algorithme', coefficient: 3, hasTd: true, hasTp: true },
  { id: 'anglais', name: 'Anglais', coefficient: 2, hasTd: true, hasTp: false },
  { id: 'asbgd', name: 'ASBGD', coefficient: 3, hasTd: false, hasTp: true },
  { id: 'gestion_projet', name: 'Gestion de projet', coefficient: 3, hasTd: false, hasTp: false },
  { id: 'meps', name: 'MEPS', coefficient: 3, hasTd: true, hasTp: false },
  { id: 'reseaux', name: 'Réseaux et protocoles', coefficient: 3, hasTd: false, hasTp: true },
  { id: 'se', name: 'SE', coefficient: 3, hasTd: true, hasTp: true },
];

export const WEIGHTS = {
  EXAM_FULL: 1.0,
  EXAM_WITH_BOTH: 0.6,
  TD_POND: 0.2,
  TP_POND: 0.2,
  DUO_POND_SECONDARY: 0.4
};