import React, {useState} from "react";
import {InputsState, Steps} from "../types/types";
import {validateStepsInput} from "../utils/validateStepsInput";
import {FormNavigation} from "./FormNav/FormNavigation";
import FormNavigationStep from "./FormNav/FormNavigationStep";
import useWindowDimensions from "../hooks/useWindowDimensions";

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    steps: Steps,
    inputs: InputsState,
    setInputs: React.Dispatch<React.SetStateAction<InputsState>>,
}

export const Form = ({onSubmit, steps, inputs, setInputs}: Props) => {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);
    const {height, width} = useWindowDimensions();

    /* Steps handling */
    const handleNextStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const errors = validateStepsInput(steps, step, inputs);

        if (errors.length === 0) {
            setStep(step + 1);
            setErrors([]);
            return;
        }

        setErrors(errors);
    }

    const handleBackStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (step === 1) return;
        setStep(step - 1);
    }

    /* Input change handling */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const inputFieldName = e.target.name;
        const stateInput = inputs[inputFieldName];

        if (e.target.type === "checkbox") {
            setInputs({
                ...inputs,
                [inputFieldName]:
                    {
                        ...stateInput,
                        value: stateInput.value === "false" ? "true" : "false",
                    }
            });

            return;
        }

        setInputs({
            ...inputs,
            [inputFieldName]:
                {
                    ...stateInput,
                    value: e.target.value
                }
        });

        if (stateInput.isVisited) {
            handleValidation(e);
        }
    }

    /* Input validation */
    const handleValidation = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const inputFieldName = e.target.name;

        const inputValidations = inputs[inputFieldName].rules;
        const errors: string[] = [];

        inputValidations.forEach(validation => {
            const isValid = validation.isValid(e.target.value);

            if (!isValid) {
                errors.push(validation.message);
                e.target.classList.add("--danger");
            }
        })

        setErrors(errors);
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const inputFieldName = e.target.name;
        inputs[inputFieldName].isVisited = true;
    }

    const handleSubmitWithValidation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateStepsInput(steps, step, inputs);

        if (errors.length === 0) {
            setErrors([]);
            onSubmit(e);
            return;
        }

        setErrors(errors);
    }

    return (
        <form
            className = "form"
            onSubmit = {handleSubmitWithValidation}
        >
            {width > 790 && (
                <FormNavigation>
                    {steps.map((currentStep, idx) => {
                            if (!currentStep.number) {
                                currentStep.number = idx + 1;
                            }

                            return (
                                <FormNavigationStep
                                    id = {currentStep.number}
                                    key = {idx}
                                    title = {currentStep.title}
                                    step = {step}
                                />
                            )
                        }
                    )}
                </FormNavigation>
            )}

            {width <= 790 && (
                steps.map((currentStep, idx) => {
                    if (!currentStep.number) {
                        currentStep.number = idx + 1;
                    }

                    if(currentStep.number === step) {
                        return (
                            <h2 key={idx}>{currentStep.title}</h2>
                        )
                    }
                }))
            }

            <div className = "errors">
                {errors.map((error, idx) => (
                    <div
                        key = {idx}
                        className = "--danger"
                    >{error}</div>
                ))}
            </div>

            <div className = "form__controls">
                {steps.map((currentStep) => (
                    currentStep.number &&
                    currentStep.number === step &&
                    currentStep.fields.map((fieldName, idx) => {
                        const input = inputs[fieldName];
                        const label = `${fieldName[0].toUpperCase()}${fieldName.slice(1)}`
                            .split("_")
                            .join(" ");

                        return (
                            <div
                                className = "form__control"
                                key = {idx}
                            >
                                <label htmlFor = "name">{label}:</label>
                                {input.type === "select" && input.selectOptions !== undefined && (
                                    <select
                                        name = {fieldName}
                                        onChange = {(e) => handleChange(e)}
                                    >
                                        {input.selectOptions.map((option, idx) => (
                                            <option
                                                key = {idx}
                                                value = {option}
                                            >{
                                                option}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {input.type !== "select" && (
                                    <input
                                        type = {input.type}
                                        name = {fieldName}
                                        value = {input.value}
                                        onChange = {(e) => handleChange(e)}
                                        onBlur = {(e) => handleBlur(e)}
                                    />
                                )}
                            </div>
                        )
                    })
                ))}
            </div>

            <div className = "form__actions">
                <button
                    className = {`btn form__btn--primary ${step === 1 ? "--inactive-step" : ""}`}
                    onClick = {(e) => handleBackStep(e)}
                >
                    Back
                </button>


                {step !== steps.length && (
                    <button
                        className = "btn form__btn--primary"
                        onClick = {(e) => handleNextStep(e)}
                    >Next</button>
                )}

                {step === steps.length && (
                    <input
                        className = "btn form__btn--submit"
                        type = "submit"
                        value = "Submit"
                    />
                )}
            </div>
        </form>
    )
}