export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum Type {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Array<Entry>;
}
export type NonSsnPatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
}
export interface Discharge {
  date: string;
  criteria: string;
}
export interface SickLeave {
  startDate: string;
  endDate: string;
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
export interface HealthCheckEntry extends BaseEntry {
  type: Type.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: Type.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type: Type.Hospital;
  discharge: Discharge;
}
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;
