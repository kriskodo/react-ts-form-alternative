import React, {useState} from 'react';
import "./App.css";
import "./Form.css";
import {Validator} from "./validation/Validator";
import {InputsState, Steps} from "./types/types";
import {Form} from "./components/Form";

function App() {
    const fields: InputsState = {
        name: {type: "text", value: "", rules: [Validator.Required()]},
        age: {type: "text", value: "", rules: [Validator.Required(), Validator.AgeBetween(12, 70)]},
        email: {type: "email", value: "", rules: [Validator.Required(), Validator.Email()]},
        date_of_birth: {type: "date", value: "", rules: [Validator.Required()]},
        phone_number: {type: "tel", value: "", rules: [Validator.Required(), Validator.MinLength(10), Validator.MaxLength(10)]},
        country: {type: "select", value: "", rules: [], selectOptions: ["England", "USA", "Africa", "Bulgaria"]},
        favorite_color: {type: "color", value: "#ffffff", rules: []},
        terms_of_service: {type: "checkbox", value: "false", rules: [Validator.CheckboxRequired()]}
    };

    const [inputs, setInputs] = useState<InputsState>(fields);
    const steps: Steps = [
        {
            title: "Basic Information",
            fields: ["name", "age", "email"]
        },
        {
            title: "Additional Information",
            fields: ["date_of_birth", "phone_number"]
        },
        {
            title: "Final Steps",
            fields: ["country", "favorite_color", "terms_of_service"]
        }
    ];

    /* Form Submit handling */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(inputs);
    }

    return (
        <div className = "App">
            <Form
                steps = {steps}
                inputs = {inputs}
                setInputs = {setInputs}
                onSubmit = {(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
            />
        </div>
    );
}

export default App;