import React from 'react';

type Props = {
    id: number;
    title: string;
    step: number;
}

const FormNavigationStep: React.FC<Props> = ({id, title, step}) => {
    return (
        <div
            className = {`form__navigation-step ${step < id
                ? "--inactive-step"
                : step === id
                    ? "--active-step"
                    : "--done-step"}`}
        >
            {title}
        </div>
    );
}

export default FormNavigationStep;