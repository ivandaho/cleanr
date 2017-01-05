import React from 'react';
import { HeaderComponent } from '../components/HeaderComponent.jsx';
import { HomeComponent } from '../components/HomeComponent.jsx';

export const App = ( { children } ) => (
    <div>
        <HeaderComponent />
        <HomeComponent />
        {/* { children } */}
    </div>
)
