import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';
const baseUrl = '/api/diaries';

export const getAllDiaries = () => {
    return axios.get<DiaryEntry[]>(baseUrl).then((res) => res.data);
};

export const createDiary = (object: NewDiaryEntry) => {
    return axios.post(baseUrl, object).then((res) => res.data);
};
