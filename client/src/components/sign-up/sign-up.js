import React, { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import { signUpStart } from "../../redux/user/user.actions";

import './sign-up.scss';

const SignUp = () => {
    const [userCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Destructuring off of userCredentials state
    const { displayName, email, password, confirmPassword } = userCredentials;

    const dispatch = useDispatch();

    const handleSubmit = event => {
        // Prevent the default submit action
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Dispatch 'SIGN_UP_START' action
        dispatch(signUpStart({
            email,
            displayName,
            password
        }));
    };

    const handleChange = event => {
        const { name, value } = event.target;

        // Name is a dynamic property depending on what the name property of the FormInput is being changed
        setCredentials({
            ...userCredentials,
            [name]: value
        });
    }

    return (
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    )
}

export default SignUp;