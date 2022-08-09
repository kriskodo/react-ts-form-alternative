import React from "react";

export type ValidationRule<T> = {
    message: string,
    isValid(value: string): boolean;
}

export class Validator {
    static Required(): ValidationRule<string> {
        return {
            message: "The field is required.",
            isValid: (value) => value.length > 0
        };
    }

    static MinLength(length: number): ValidationRule<string> {
        return {
            message: "The field cannot be less than " + length + " symbols",
            isValid: (value) => value.length >= length
        };
    }

    static MaxLength(length: number): ValidationRule<string> {
        return {
            message: "The field cannot be more than " + length + " symbols",
            isValid: (value) => value.length <= length
        };
    }

    static AgeBetween(min: number, max: number): ValidationRule<[number, number]> {
        return {
            message: "Age must be between " + min + " and " + max,
            isValid: (value) =>
                +value >= min && +value <= max
        }
    }

    static Email(): ValidationRule<string> {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

        return {
            message: "Please enter a valid email address.",
            isValid: (value) => regexEmail.test(value)
        }
    }

    static CheckboxRequired(): ValidationRule<boolean> {
        return {
            message: "Checkbox field is required.",
            isValid:(value) => value === "true"
        }
    }
}