import { Entry, EntryWithoutId, Patient } from '../types';
import patientService from './patientService';
import { v1 as uuid } from 'uuid';
const addNewEntry = (patientID: string, object: EntryWithoutId): Entry => {
    const id: string = uuid();
    const patient: Patient = patientService.getPatientById(patientID);
    const newEntry = {
        id: id,
        ...object,
    };
    patient.entries.push(newEntry);
    return newEntry;
};

export default { addNewEntry };
