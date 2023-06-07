import { CollegeOfArtsAndScience } from "./departments/CAS";
import { CollegeOfDentistry } from "./departments/Dentistry";


export interface Department {
    name: string;
    code: string;
    school: string;
}

export const departments: Department[] = [
    ...CollegeOfArtsAndScience,
    ...CollegeOfDentistry
];