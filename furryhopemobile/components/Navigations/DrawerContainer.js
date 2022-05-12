import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Home';
import Profile from '../Profile'
import AnimalCare from '../AnimalCare'
import ViewAnimals from '../ViewAnimals'
import UserFeedback from '../Forms/UserFeedback'
import UserPreferences from '../UserPreferences';
import ReportAnimal from '../Forms/ReportAnimal'
import RegisterAnimal from '../Forms/RegisterAnimal'
import Donate from '../Donate'

const DrawerContainer = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator 
            initialRouteName='Report an Animal'
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#111',
                   
                },
                drawerLabelStyle: {
                    fontFamily: 'Poppins_300Light',
                    color: 'white',
                },
                drawerActiveTintColor: 'white',
                drawerInactiveTintColor: '#fcfcfc',
                headerShown: false,
            }}
           
        >
            <Drawer.Screen name='Home' component={Home} />
            <Drawer.Screen name='My Profile' component={Profile} />
            <Drawer.Screen name='Pet Care Tips' component={AnimalCare} />
            <Drawer.Screen name='View Animals' component={ViewAnimals} />
            <Drawer.Screen name='Give a Feedback' component={UserFeedback} />
            <Drawer.Screen name='User Preferences' component={UserPreferences} />
            <Drawer.Screen name='Report an Animal' component={ReportAnimal} />
            <Drawer.Screen name='Register an Animal' component={RegisterAnimal} />
            <Drawer.Screen name='Donate' component={Donate} />
        </Drawer.Navigator>
    );
} 

export default DrawerContainer;