import React, {ReactNode} from 'react';

type Props = {
    children?: | React.ReactNode
}

export const FormNavigation: React.FC<Props> = ({children}) => {
    return (
        <div className="form__navigation">
            {children}
        </div>
    );
}