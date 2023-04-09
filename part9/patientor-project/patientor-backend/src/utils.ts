import { NewPatient } from './types';
import { Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error(`In correct or missing name: ${name}`);
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateofBirth = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error(`In correct or missing date of Birth: ${name}`);
    }
    return date;
};
const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error(`In correct or missing ssn: ${ssn}`);
    }
    return ssn;
};
const isGender = (param: string): param is Gender => {
    return Object.values(Gender)
        .map((item) => item.toString())
        .includes(param);
};
const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error(`In correct or missing gender: ${gender}`);
    }
    return gender;
};
const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error(`In correct or missing occupation: ${occupation}`);
    }
    return occupation;
};
const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error(`In correct or missing data`);
    }
    if (
        'name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object
    ) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateofBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: [],
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
};
export default toNewPatient;
