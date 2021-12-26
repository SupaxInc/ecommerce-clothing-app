import React from 'react';
import Directory from '../../components/directory/directory';

import { HomePageContainer } from './homepage.styles'; // styled component that replaced homepage.scss

const Homepage = () => {

    return (
        <HomePageContainer>
            <Directory />
        </HomePageContainer>
    )
}

export default Homepage;