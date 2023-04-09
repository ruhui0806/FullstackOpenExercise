import CoursePart from './types';

const Part = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
    switch (coursePart.kind) {
        case 'basic':
            return (
                <>
                    <h2>
                        {coursePart.name} {coursePart.exerciseCount}
                    </h2>
                    <p> {coursePart.description}</p>
                    <br />
                </>
            );

        case 'group':
            return (
                <>
                    <h2>
                        {coursePart.name}
                        {coursePart.exerciseCount}
                    </h2>
                    <p>project exercise {coursePart.groupProjectCount} </p>
                    <br />
                </>
            );

        case 'background':
            return (
                <div>
                    <h2>
                        {coursePart.name}
                        {coursePart.exerciseCount}
                    </h2>
                    <p>{coursePart.description}</p>
                    <p>submit to {coursePart.backroundMaterial}</p>
                </div>
            );
        case 'special':
            return (
                <div>
                    <h2>
                        {coursePart.name}
                        {coursePart.exerciseCount}
                    </h2>
                    <p>
                        required skills:{' '}
                        {coursePart.requirements.map((item) => item + '; ')}
                    </p>
                    <p>{coursePart.description}</p>
                </div>
            );
        default:
            return <h1>Something is not included in the coursePart type</h1>;
    }
};

const Content = ({
    courseParts,
}: {
    courseParts: CoursePart[];
}): JSX.Element => {
    return (
        <div>
            {courseParts.map((part, index) => (
                <Part key={index} coursePart={part} />
            ))}
        </div>
    );
};
const Header = ({ name }: { name: string }): JSX.Element => {
    return <h1>{name}</h1>;
};

const Total = ({ totalCount }: { totalCount: number }): JSX.Element => {
    return <p>Number of exercises {totalCount}</p>;
};

const App = () => {
    const courseName = 'Half Stack application development';
    const courseParts: CoursePart[] = [
        {
            name: 'Fundamentals',
            exerciseCount: 10,
            description: 'This is an awesome course part',
            kind: 'basic',
        },
        {
            name: 'Using props to pass data',
            exerciseCount: 7,
            groupProjectCount: 3,
            kind: 'group',
        },
        {
            name: 'Basics of type Narrowing',
            exerciseCount: 7,
            description: 'How to go from unknown to string',
            kind: 'basic',
        },
        {
            name: 'Deeper type usage',
            exerciseCount: 14,
            description: 'Confusing description',
            backroundMaterial:
                'https://type-level-typescript.com/template-literal-types',
            kind: 'background',
        },
        {
            name: 'TypeScript in frontend',
            exerciseCount: 10,
            description: 'a hard part',
            kind: 'basic',
        },
        {
            name: 'Backend development',
            exerciseCount: 21,
            description: 'Typing the backend',
            requirements: ['nodejs', 'jest'],
            kind: 'special',
        },
    ];

    return (
        <div>
            <Header name={courseName} />
            <Content courseParts={courseParts} />
            <br />
            <Total
                totalCount={courseParts.reduce(
                    (carry, part) => carry + part.exerciseCount,
                    0
                )}
            />
        </div>
    );
};

export default App;
