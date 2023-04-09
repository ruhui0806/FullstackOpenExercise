//The BMI is expressed in kg/m2

export const calculateBmi = (height: number, weight: number) => {
    let text;
    if (Number(weight) > 0 && Number(height) > 0) {
        const BMI = (weight * 10000) / (height * height);
        if (BMI < 25) {
            text = `Normal (healthy weight): ${BMI}`;
        } else if (BMI > 30 || BMI === 30) {
            text = `obese: ${BMI}`;
        } else {
            text = `overweight: ${BMI}`;
        }
        return text;
    } else {
        throw new Error(
            `Provide both height and weight should be non-zero numbers`
        );
    }
};
// //npm run calculateBmi 178 78
// const height: number = Number(process.argv[2])
// const weight: number = Number(process.argv[3])
// try {
//     console.log(calculateBmi(height, weight))
// } catch (error: unknown) {
//     let errorMessage = 'something went wrong'
//     if (error instanceof Error) {
//         errorMessage += 'Error: ' + error.message
//     }
//     console.log(errorMessage)
// }
