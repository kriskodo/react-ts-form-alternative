import {InputsState, Steps} from "../types/types";
import React from "react";

export const validateStepsInput = (steps: Steps, step: number, inputValues: InputsState): string[] => {
    const fieldsToValidate = steps[step - 1].fields;
    const errors: React.SetStateAction<string[]> = [];

    fieldsToValidate.forEach((field) => {
        const input = inputValues[field];
        input.rules.forEach(rule => {
            const isValid = rule.isValid(input.value.toString());

            if (!isValid) {
                errors.push(rule.message);
            }
        })
    })

    return errors;
}