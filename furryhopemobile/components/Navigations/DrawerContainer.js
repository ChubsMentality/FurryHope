import React, { useState, useEffect, useContext } from 'react';
import { CredentialsContext } from '../CredentialsContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Home';
import Profile from '../Profile'
import AnimalCare from '../AnimalCare'
import PetCare from '../PetCare';
import ViewAnimals from '../ViewAnimals'
import UserFeedback from '../Forms/UserFeedback';
import UserPreferences from '../UserPreferences';
import ReportAnimal from '../Forms/ReportAnimal'
import RegisterAnimal from '../Forms/RegisterAnimal'
import Donate from '../Donate'
import CustomDrawer from '../SubComponents/CustomDrawer';
import Ionicon from 'react-native-vector-icons/Ionicons'
import axios from 'axios';

const DrawerContainer = () => {
    const Drawer = createDrawerNavigator();
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const [profilePic, setProfilePic] = useState('')
    
    const getUser = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <Drawer.Navigator
            initialRouteName='Browse'
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerLabelStyle: {
                    fontFamily: 'PoppinsLight',
                    marginLeft: -20,
                },
                drawerActiveBackgroundColor: '#111',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#4d4d4d',
                headerShown: false,
            }}
           
        >
            <Drawer.Screen name='Browse' component={ViewAnimals} options={{
                drawerIcon: ({color}) => (
                    <Ionicon name='apps-sharp' size={20} color={color} />
                )}} 
            />

            <Drawer.Screen name='My Profile' component={Profile} options={{
                drawerIcon: ({color}) => (
                    <Ionicon name='md-person' size={20} color={color} />
                )}} 
            />

            <Drawer.Screen name='Pet Care' component={PetCare} options={{
                drawerIcon: ({color}) => (
                    <Ionicon name='information-circle-outline' size={20} color={color} />
                )}} 
            />

            {/* open-outline, ios-thumbs-up */}
            <Drawer.Screen name='Give a Feedback' component={UserFeedback} options={{
                drawerIcon: ({color}) => (
                    <Ionicon name='ios-thumbs-up' size={20} color={color} />
                )
            }} /> 

            <Drawer.Screen name='Report an Animal' component={ReportAnimal} options={{
                drawerIcon: ({color}) => (
                    <Ionicon name='ios-warning-sharp' size={20} color={color} />
                )}} 
            />

            <Drawer.Screen name='Pet Registration' component={RegisterAnimal} options={{
                drawerIcon: ({color}) => (
                    <Ionicon name='ios-reader-sharp' size={20} color={color} />
                )}} 
            />

            <Drawer.Screen name='Donate' component={Donate} options={{
                drawerIcon: ({color}) => (
                    <Ionicon name='paw-sharp' size={20} color={color} />
                )}}
            />

            <Drawer.Screen name='Change Preference' component={UserPreferences} options={{
                drawerIcon: ({color}) => (
                    <Ionicon name='settings-sharp' size={20} color={color} />
                )}}
            />
        </Drawer.Navigator>
    );
} 

export default DrawerContainer;