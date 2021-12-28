import React from "react";

import Spinner from "../spinner/spinner";

// Components that are passed through the WithSpinner function will obtain the functionality inside the function
const WithSpinner = WrappedComponent => ({ isLoading }) => {
    // If the component is loading then run the spinner overlay.
    // Else, render the component that was passed in as normal.
    return isLoading ? (
        <Spinner />
    ) : (
        <WrappedComponent />
    )
}

export default WithSpinner;