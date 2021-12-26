import React from "react";

import './form-input.scss';

const FormInput = (({ handleChange, label, ...otherProps }) => {
    return (
        <div className="group">
            <input className="form-input" onChange={handleChange} {...otherProps}/>
            {
                /* 
                    Show the label only if the developer enters a value into the property from the FormInput component.
                    If there is a label then we use the 'shrink' class to animate the label.
                */
                label ?
                (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                    {label}
                </label>)
                : null
            }
        </div>
    )
});

export default FormInput;