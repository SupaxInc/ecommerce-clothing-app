import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

// Components that are passed through the WithSpinner function will obtain the functionality inside the function
const WithSpinner = WrappedComponent => ({ isLoading }) => {

    // If the component is loading then run the spinner overlay.
    // Else, render the component that was passed in as normal.
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (
        <WrappedComponent />
    )
}

export default WithSpinner;