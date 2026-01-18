
export interface ModuleConfig {
  id: string;
  name: string;
  coefficient: number;
  hasTd: boolean;
  hasTp: boolean;
}

export interface ModuleMarks {
  exam?: number;
  td?: number;
  tp?: number;
}

export interface SemesterState {
  [moduleId: string]: ModuleMarks;
}
