import React, { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";

import './sign-in.scss';

const SignIn = () => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' });

    // Destructuring from userCredentials state
    const { email, password } = userCredentials;

    const dispatch = useDispatch();

    // Handles the onSubmit event from the form
    const handleSubmit = (event) => {
        // Need to prevent the default submit action from firing 
        // We want to full control over exactly what the submit will do
        event.preventDefault();

        dispatch(emailSignInStart({email, password}));
    }

    // Handles the onChange event from all inputs
    const handleChange = (event) => {
        // Grab both the name and value properties from the inputs
        const { name, value } = event.target;

        // Dynamically set the state based on the name of the inputs
        // If the input being changed is 'email' then the state of email will be changed
        setCredentials({
            // Need to spread userCredentials in the case that there are more properties inside useState object
            ...userCredentials,
            [name] : value
        })

    }

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    handleChange={handleChange}
                    label="Email" 
                    name="email" 
                    type="email" 
                    value={email}  
                    required 
                />
                <FormInput 
                    handleChange={handleChange}
                    label="Password" 
                    name='password' 
                    type="password" 
                    value={password}  
                    required 
                />
                <div className="buttons">
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton type='button' onClick={() => dispatch(googleSignInStart())} isGoogleSignIn>Sign In with Google</CustomButton>
                </div>

            </form>
        </div>
    )
}

export default SignIn;