import React, { Component } from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './sign-up.scss';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        const { displayName, email, password, confirmPassword } = this.state;
        // Prevent the default submit action
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Auth method createUserWithEmailAndPassword creates a new user account with specified email and password from Email/Password authentication provider
            // Returns a userAuth object upon successful creation
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            // displayName is in an object because in the function we are destructuring the second parameter
            await createUserProfileDocument(user, { displayName });

            // If all promise methods succeed, we want to clear out our form by setting the state to the initial state again.
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        }
        catch (err) {
            console.error(err);
        }
    };

    handleChange = event => {
        const { name, value } = event.target;

        // Name is a dynamic property depending on what the name property of the FormInput is being changed
        this.setState({[name]: value});
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;