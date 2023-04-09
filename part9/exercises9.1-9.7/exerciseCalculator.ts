//
enum Rating {
    bad = 1,
    okay = 2,
    good = 3,
}
interface ReturnObj {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: Rating;
    ratingDescription: string;
}
// interface SlicedArgs {
//     array: Array<number>
//     last: number
// }
// const parseArguments = (args: Array<string>): SlicedArgs => {
//     if (args.length < 4) throw new Error('Not enough arguments')
//     const array1 = args.map((item) => Number(item))
//     return {
//         array: array1.slice(3),
//         last: array1[2],
//     }
// }

export const calculateExercises = (
    dailyExercisesHours: Array<number>,
    target: number
): ReturnObj => {
    let sum = 0;
    let count = 0;
    let countZeros = 0;
    let ratingDescription;
    let rating;
    let success;
    dailyExercisesHours.forEach((item, _index) => {
        if (item === 0) {
            countZeros++;
        }
        sum += item;
        count++;
    });
    const average = sum / count;
    const periodLength = count;
    const trainingDays = count - countZeros;
    if (average > target || average === target) {
        ratingDescription = 'congratulations! you reached your target!';
        rating = Rating.good;
        success = true;
    } else if (average < target && average > target / 2) {
        ratingDescription = 'not too bad but could be better';
        rating = Rating.okay;
        success = false;
    } else {
        ratingDescription = 'bad';
        rating = Rating.bad;
        success = false;
    }
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    };
};
// const dailyExercisesHours = parseArguments(process.argv).array
// const target = parseArguments(process.argv).last

// try {
//     console.log(dailyExercisesHours)
//     console.log(calculateExercises(dailyExercisesHours, target))
// } catch (error: unknown) {
//     let errorMessage = 'something went wrong'
//     if (error instanceof Error) {
//         errorMessage += 'Error: ' + error.message
//     }
//     console.log(errorMessage)
// }
