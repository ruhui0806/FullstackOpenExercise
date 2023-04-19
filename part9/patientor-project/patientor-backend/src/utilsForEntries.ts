import {
  Diagnose,
  EntryWithoutId,
  Discharge,
  SickLeave,
  HealthCheckRating,
  Type,
} from "./types";
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const parseString = (text: unknown): string => {
  if (!isString(text) || text.length === 0) {
    throw new Error(`In correct or missing name: ${text}`);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`In correct or missing date of Birth: ${name}`);
  }
  return date;
};
const parseDisCharge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error(`In correct or missing data`);
  }
  if ("date" in discharge && "criteria" in discharge) {
    const newDisCharge = {
      date: parseString(discharge.date),
      criteria: parseString(discharge.criteria),
    };
    return newDisCharge;
  }
  throw new Error(
    "Incorrect data: some fields are missing/incorrect in discharge field"
  );
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error(`In correct or missing data`);
  }
  if ("startDate" in sickLeave && "endDate" in sickLeave) {
    const newSickLeave = {
      startDate: parseDate(sickLeave.startDate),
      endDate: parseDate(sickLeave.endDate),
    };
    if (newSickLeave.startDate < newSickLeave.endDate) {
      return newSickLeave;
    }
  }
  throw new Error(
    "Incorrect data: some fields are missing/incorrect in sickLeave field"
  );
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((item) => Number(item))
    .includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (healthCheckRating === 0) {
    return healthCheckRating;
  }
  if (!healthCheckRating || !isHealthCheckRating(Number(healthCheckRating))) {
    throw new Error(
      `In correct or missing healthCheckRating: ${healthCheckRating}`
    );
  }
  return Number(healthCheckRating);
};

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnose["code"]>;
  }
  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error(`Incorrect or missing data`);
  }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object
  ) {
    switch (object.type) {
      case Type.HealthCheck:
        if ("healthCheckRating" in object) {
          const newHealthCheckEntry: EntryWithoutId = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: Type.HealthCheck,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          return newHealthCheckEntry;
        }
        throw new Error("Incorrect values in healthCheck fields");
      case Type.OccupationalHealthcare:
        if ("employerName" in object) {
          const entry: EntryWithoutId = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: Type.OccupationalHealthcare,
            employerName: parseString(object.employerName),
          };
          if ("sickLeave" in object) {
            const newOccupationalEntry = {
              ...entry,
              sickLeave: parseSickLeave(object.sickLeave),
            };
            return newOccupationalEntry;
          }
          if (!("sickLeave" in object)) {
            return entry;
          }
        }
        throw new Error("Incorrect values in sickLeave fields");

      case Type.Hospital:
        if ("discharge" in object) {
          const newHospitalEntry: EntryWithoutId = {
            description: parseString(object.description),
            date: parseDate(object.date),
            specialist: parseString(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            type: Type.Hospital,
            discharge: parseDisCharge(object.discharge),
          };
          return newHospitalEntry;
        }
        throw new Error("Incorrect values in discharge fields");
      default:
        throw new Error(`Incorrect entry type: ${object.type}`);
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};
