import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/bmi', (_req, res) => {
    // res.send('BMI functionality')
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);

    try {
        console.log(calculateBmi(height, weight));
        res.send({ height, weight, bmi: calculateBmi(height, weight) });
    } catch {
        res.status(400).send({ error: 'malformatted parameters' });
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || isNaN(Number(target)) || target === null) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, Number(target));
    return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
