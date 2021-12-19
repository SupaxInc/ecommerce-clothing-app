import React, { Component } from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import './sign-in.scss';

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    // Handles the onSubmit event from the form
    handleSubmit = async (event) => {
        const { email, password } = this.state;
        // Need to prevent the default submit action from firing 
        // We want to full control over exactly what the submit will do
        event.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);

            this.setState({
                email: '',
                password: ''
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    // Handles the onChange event from all inputs
    handleChange = (event) => {
        // Grab both the name and value properties from the inputs
        const { name, value } = event.target;

        // Dynamically set the state based on the name of the inputs
        // If the input being changed is 'email' then the state of email will be changed
        this.setState({
            [name] : value
        })

    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        handleChange={this.handleChange}
                        label="Email" 
                        name="email" 
                        type="email" 
                        value={this.state.email}  
                        required 
                    />
                    <FormInput 
                        handleChange={this.handleChange}
                        label="Password" 
                        name='password' 
                        type="password" 
                        value={this.state.password}  
                        required 
                    />
                    <div className="buttons">
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                    </div>

                </form>
            </div>
        )
    }
}

export default SignIn;