export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
// export interface Diagnose {
//     code: string;
//     name: string;
//     latin?: string;
// }
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export enum EntryTypes {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}
export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Array<Entry>;
}
export type Params = {
  id: string;
};
export type PatientFormValues = Omit<Patient, "id" | "entries">;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
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
  type: EntryTypes.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryTypes.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryTypes.Hospital;
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
