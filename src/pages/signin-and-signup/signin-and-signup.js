import React from "react";
import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";
import './signin-and-signup.scss';

const SignInAndSignUpPage = () => {
    return (
        <div className="signin-and-signup">
            <SignIn />
            <SignUp />
        </div>
    )
}

export default SignInAndSignUpPage;