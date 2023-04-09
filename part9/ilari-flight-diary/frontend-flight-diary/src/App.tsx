import { DiaryEntry, Weather, Visibility } from './types';
import { useState, useEffect } from 'react';
import { getAllDiaries, createDiary } from './services/diariesService';

const Diary = ({ diary }: { diary: DiaryEntry }): JSX.Element => {
    return (
        <>
            <h2>{diary.date}</h2>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
        </>
    );
};
const DiaryEntries = ({ diaries }: { diaries: DiaryEntry[] }): JSX.Element => {
    return (
        <div>
            {diaries.map((entry) => (
                <Diary key={entry.id} diary={entry} />
            ))}
        </div>
    );
};
function App() {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [newDiary, setNewDiary] = useState('');
    const [weather, setWeather] = useState<Weather>(Weather.Cloudy);
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
    const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'));
    const [comment, setComment] = useState('');

    useEffect(() => {
        getAllDiaries().then((data) => setDiaries(data));
    }, []);

    const diaryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            createDiary({ date, visibility, comment, weather }).then((data) => {
                setDiaries(diaries.concat(data));
            });
            // setNewDiary('');
        } catch (error: unknown) {
            let errorMessage = 'Something went wrong.';
            if (error instanceof Error) {
                errorMessage += ' Error: ' + error.message;
            }
            window.alert(errorMessage);
        }
    };

    // const entries: DiaryEntry[] = [
    //     {
    //         id: 1,
    //         date: '2017-01-01',
    //         weather: Weather.Rainy,
    //         visibility: Visibility.Poor,
    //         comment: "Pretty scary flight, I'm glad I'm alive",
    //     },
    //     {
    //         id: 2,
    //         date: '2017-04-01',
    //         weather: Weather.Sunny,
    //         visibility: Visibility.Good,
    //         comment: "Everything went better than expected, I'm learning much",
    //     },
    //     {
    //         id: 3,
    //         date: '2017-04-15',
    //         weather: Weather.Windy,
    //         visibility: Visibility.Good,
    //         comment:
    //             "I'm getting pretty confident although I hit a flock of birds",
    //     },
    //     {
    //         id: 4,
    //         date: '2017-05-11',
    //         weather: Weather.Cloudy,
    //         visibility: Visibility.Good,
    //         comment: 'I almost failed the landing but I survived',
    //     },
    // ];

    return (
        <div>
            <h2>Add new entry</h2>
            <form onSubmit={diaryCreation}>
                date{' '}
                <input
                    type="date"
                    value={date}
                    min={(new Date().getMonth() - 12).toLocaleString('en-CA')}
                    max={date}
                    onChange={(event) => {
                        setDate(event.target.value);
                        console.log(date);
                    }}
                />
                <br />
                <div className="weather">
                    Weather:
                    <input
                        type="checkbox"
                        id="Sunny"
                        name="Sunny"
                        value={Weather.Sunny}
                        checked={weather == Weather.Sunny}
                        onChange={() => setWeather(Weather.Sunny)}
                    />
                    <label>Sunny</label>
                    <input
                        type="checkbox"
                        id="Cloudy"
                        name="Cloudy"
                        value={Weather.Cloudy}
                        checked={weather == Weather.Cloudy}
                        onChange={() => setWeather(Weather.Cloudy)}
                    />
                    <label>Cloudy</label>
                    <input
                        type="checkbox"
                        id="Rainy"
                        name="Rainy"
                        value={Weather.Rainy}
                        checked={weather == Weather.Rainy}
                        onChange={() => setWeather(Weather.Rainy)}
                    />
                    <label>Rainy</label>
                    <input
                        type="checkbox"
                        id="Stormy"
                        name="Stormy"
                        value={Weather.Stormy}
                        checked={weather == Weather.Stormy}
                        onChange={() => setWeather(Weather.Stormy)}
                    />
                    <label>Stormy</label>
                    <input
                        type="checkbox"
                        id="Windy"
                        name="Windy"
                        value={Weather.Windy}
                        checked={weather == Weather.Windy}
                        onChange={() => setWeather(Weather.Windy)}
                    />
                    <label>Windy</label>
                </div>
                <br />
                <div className="Visibility">
                    Visibility:
                    <input
                        type="checkbox"
                        id="Great"
                        name="Great"
                        value={Visibility.Great}
                        checked={visibility == Visibility.Great}
                        onChange={() => setVisibility(Visibility.Great)}
                    />
                    <label>Great</label>
                    <input
                        type="checkbox"
                        id="Good"
                        name="Good"
                        value={Visibility.Good}
                        checked={visibility == Visibility.Good}
                        onChange={() => setVisibility(Visibility.Good)}
                    />
                    <label>Good</label>
                    <input
                        type="checkbox"
                        id="Ok"
                        name="Ok"
                        value={Visibility.Ok}
                        checked={visibility == Visibility.Ok}
                        onChange={() => setVisibility(Visibility.Ok)}
                    />
                    <label>Ok</label>
                    <input
                        type="checkbox"
                        id="Poor"
                        name="Poor"
                        value={Visibility.Poor}
                        checked={visibility == Visibility.Poor}
                        onChange={() => setVisibility(Visibility.Poor)}
                    />
                    <label>Poor</label>
                </div>
                Comment:{' '}
                <input
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                />
                <br />
                <button type="submit">add</button>
            </form>
            <h1>Diary Entries</h1>
            <DiaryEntries diaries={diaries} />
        </div>
    );
}

export default App;
