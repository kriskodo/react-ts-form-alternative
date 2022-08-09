import {ValidationRule} from "../validation/Validator";

type ValidationRestrictions = string | number | boolean | [number,number];

export type InputsState = {
    [key: string]: {
        type: string,
        value: string | number,
        rules: ValidationRule<ValidationRestrictions>[],
        isVisited?: boolean,
        selectOptions?: string[],
    }
}

export type Steps = ({ title: string; fields: string[] } & {number?: number})[];