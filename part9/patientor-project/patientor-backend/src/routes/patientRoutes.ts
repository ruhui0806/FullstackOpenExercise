import express from 'express';
import patientService from '../services/patientService';
import entryService from '../services/entryService';
import toNewPatient from '../utils';
import { toNewEntry } from '../utilsForEntries';
const patientsRouter = express.Router();
patientsRouter.get('/', (_req, res) => {
    res.send(patientService.getNonSsnPatients());
});

patientsRouter.get('/:id', (req, res) => {
    res.send(patientService.getPatientById(req.params.id));
});
patientsRouter.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'something went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
patientsRouter.post('/:id/entries', (req, res) => {
    try {
        //const patient = patientService.getPatientById(req.params.id);
        console.log("new entry post",req.body);
        const newEntry = toNewEntry(req.body);
        const addedEntry = entryService.addNewEntry(req.params.id, newEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'something went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
export default patientsRouter;
