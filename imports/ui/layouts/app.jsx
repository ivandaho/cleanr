import React from 'react';
import NavbarContainer from '../containers/NavbarContainer.jsx';
{/* import { HomeComponent } from '../components/HomeComponent.jsx'; */}

export const App = ( { children } ) => (
    <div>
        <NavbarContainer />
        {/* <HomeComponent /> */}
        { children }
    </div>
)
