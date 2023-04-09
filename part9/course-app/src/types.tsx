export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    description?: string;
}

export interface CoursePartBasic extends CoursePartBase {
    kind: 'basic';
}
interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: 'group';
}
interface CoursePartBackround extends CoursePartBase {
    backroundMaterial: string;

    kind: 'background';
}
interface CoursePartRequirement extends CoursePartBase {
    requirements: Array<string>;
    kind: 'special';
}
type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackround
    | CoursePartRequirement;

export default CoursePart;
