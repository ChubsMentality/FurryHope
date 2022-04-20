import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootSiblingParent } from 'react-native-root-siblings'
import { CredentialsContext } from './components/CredentialsContext';
import {
  useFonts, Poppins_200ExtraLight, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold,
  Poppins_700Bold, Poppins_800ExtraBold, Poppins_900Black
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import Constants from 'expo-constants'
import Login from './components/LoginUser';
import Register from './components/RegisterUser';
import DrawerContainer from './components/Navigations/DrawerContainer';
import ViewAnimalData from './components/ViewAnimalData';
import ViewAnimalDataPending from './components/ViewAnimalDataPending'
import ViewAnimalDataAdopted from './components/ViewAnimalDataAdopted'
import AdoptionForm from './components/Forms/AdoptionForm';
import Verification from './components/VerificationScreen'
import ForgotPassword from './components/ForgotPassword';
import ProfileSettings from './components/ProfileSettings'
import { Platform } from 'react-native';

// Push Notif
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const Stack = createNativeStackNavigator();

/*
  To add:
    1. Form handling components - error, success, etc.
*/

// Sets the parameters for the push notif
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  })
})

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState('');
  const [currentCount, setCurrentCount] = useState(Number)
  const [animals, setAnimals] = useState([])

  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  // This block of code returns an error, that's why it's commented. This code is used
  // to request for the user's permission to use notifications.
  /*
  // Push Notif - to get permissions
  useEffect(() => {
    const getPermission = async () => {
      if(Constants.isDevice) { // To check whether a physical device is used (Mobile phone, etc.)
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
  
        if(existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync()
          finalStatus = status
        }
  
        if(finalStatus !== 'granted') {
          alert('Please allow push notifications in order to receive notifications.')
          await AsyncStorage.setItem('expopushtoken', '')
          return
        }
  
        const token = (await Notifications.getExpoPushTokenAsync()).data
        await AsyncStorage.setItem('expopushtoken', token)
      } else {
        alert('Must use a physical device for Push Notifications')
      }
  
      if(Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C'
        })
      }
    }

    getPermission()
  }, [])
  */

  
  // To send push notifications.
  const sendNotif = async () => {
    await Notifications.scheduleNotificationAsync({
      // Content of the notification
      content: {
        title: 'Title',
        body: 'Body',
        data: { data: 'data goes here' }
      },

      // And when to send the notification, when this function is called
      trigger: { seconds: 1 }
    })
  }

  /*
    Everytime a new animal is added, it will run this code, ideally it works
    when a new animal is added, a certain count will be updated causing the app to re-render
    and it will trigger this useEffect hook and (ideally) send a push notification to the user. 
    and if another animal was added then the count will update then it will run this code again.
  */
  useEffect(() => {
    const getCurrentCount = async () => {
      const { data } = await axios.get('http://localhost:5000/api/animals/totalCount')
      setCurrentCount(data.currentCount)
      console.log(`Current Count: (${currentCount})`)
    }

    getCurrentCount()

    const interval = setInterval(() => {
      getCurrentCount()
    }, 30000)

    console.log('A new animal was added, current count: ', currentCount) // put the function to send a push notification here.

    // Cleanup function
    return () => clearInterval(interval)

  }, [currentCount])
  
  let fontsLoaded = useFonts({
    Poppins_200ExtraLight, 
    Poppins_300Light, 
    Poppins_400Regular, 
    Poppins_500Medium, 
    Poppins_600SemiBold,
    Poppins_700Bold, 
    Poppins_800ExtraBold, 
    Poppins_900Black
  });

  if(!fontsLoaded) { 
    return <AppLoading />
  }

  // Checks if there's data inside async storage
  const checkLoginCredentials = () => {
    AsyncStorage
      .getItem('UserInfo')
      .then((result) => {
        if(result !== null) {
          // If there is data in the storage, set it as the state of the app.
          // We cannot store anything in async storage other than String data, so we parse the value
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch(error => console.log(error))
  }

  if(!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)} 
        onError={console.warn}
      />
    )
  }

  return (
    // Setting the initial values of the state (context) in CredentialsContext.Provider
    // To access the values of a context, a consumer is needed

    // Line 89 - 101
    // If there's data in the storage, the user will be directed to the homepage, otherwise it would direct to the login and register


    <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
      <CredentialsContext.Consumer>
        {({storedCredentials}) => (
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#111111',
                  fontFamily: 'Poppins_700Bold',
                },
                headerTintColor: '#fff',
                headerShown: false,
              }}
            >
              {storedCredentials ? (
                // Screens available if a user has logged in
                <Stack.Group>
                  <Stack.Screen name="DrawerContainer" component={DrawerContainer} />
                  <Stack.Screen name="View Data" component={ViewAnimalData} />
                  <Stack.Screen name="View Pending" component={ViewAnimalDataPending} />
                  <Stack.Screen name="View Adopted" component={ViewAnimalDataAdopted}  />
                  <Stack.Screen name="Adoption Form" component={AdoptionForm} />
                  <Stack.Screen name='Profile Settings' component={ProfileSettings} />
                </Stack.Group>
              ) : (
                // If not, only the login and register screens are available
                <Stack.Group>
                  <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                  <Stack.Screen name='Forgot Password' component={ForgotPassword} options={{headerShown: false }} />
                  <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                  <Stack.Screen name='Verification' component={Verification} options={{ headerShown: false }} />
                </Stack.Group>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </CredentialsContext.Consumer>
    </CredentialsContext.Provider>
  );
}

export default App;

/*
  const registerForPushNotification = async () => {
    // gets the permission from the user
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)

    // If permission is not granted we will ask the user for permission
    if(status != 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    }

    // If the permission is still not granted we will alert the user
    if(status != 'granted') {
      alert('Failed to get the push token')
      return
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data
    return token
  }
  */

