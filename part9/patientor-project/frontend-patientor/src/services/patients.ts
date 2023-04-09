import axios from "axios";
import { Patient, PatientFormValues, Entry, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};
const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  console.log("single patient info", { data });
  return data;
};
const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);
  return data;
};

const createEntry = async (patientID: string, object: EntryWithoutId) => {
  console.log("createEntry", object);
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientID}/entries`,
    object
  );
  console.log("createEntry", { data });
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  getById,
  createEntry,
};
