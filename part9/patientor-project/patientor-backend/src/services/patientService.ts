import { Patient, NonSsnPatient, NewPatient } from "../types";
import patients from "../../data/patients";
import { v1 as uuid } from "uuid";

const getPatients = (): Array<Patient> => {
  return patients;
};
const getPatientById = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);
  return patient as Patient;
};
const getNonSsnPatients = (): NonSsnPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (object: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...object,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSsnPatients, addPatient, getPatientById };
