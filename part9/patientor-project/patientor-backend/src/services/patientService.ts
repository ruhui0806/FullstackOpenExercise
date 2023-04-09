import { Patient, NonSsnPatient, NewPatient } from '../types';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getPatients = (): Array<Patient> => {
    return patients;
};
const getPatientById = (id: string): Patient => {
    const patient = patients.find((p) => p.id === id);
    // const patientForReturn = {
    //     ...patient,
    //     // entries: [],
    // };
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

// const addNewEntry = (patientID: string, object: EntryWithoutId): Entry => {
//     const id: string = uuid();
//     const patient = getPatientById(patientID);
//     const newEntry = {
//         id: id,
//         ...object,
//     };
//     patient.entries.push(newEntry);
//     return newEntry;
// };
export default { getPatients, getNonSsnPatients, addPatient, getPatientById };
