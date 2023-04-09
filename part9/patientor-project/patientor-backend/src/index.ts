import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosisRoutes';
import patientsRouter from './routes/patientRoutes';
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('ping request');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientsRouter);
app.listen(PORT || 3001, () =>
    console.log(`Server running on the port ${PORT}`)
);
