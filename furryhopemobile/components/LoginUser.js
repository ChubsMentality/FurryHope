import React, { useState, useContext } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image, TextInput, Touchable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import blackLogo from '../assets/Logo/logo-black.png'
import { CredentialsContext } from './CredentialsContext';

const LoginUser = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // Context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    // To login the user
    const handleLogin = async () => {
        setLoading(true)
        if(!email || !password) {
            alert('Please enter your account details');
            setLoading(false)
        } else {
            // async / await format
            try {
                const { data } = await axios.post('http://localhost:5000/api/users/loginUser', {email, password})
                console.log(data)

                // Stores the user's credential inside async storage, and will automatically navigate to the home page
                // and it will keep the user logged in
                // due to the logic in App.js line 148 - 162
                persistLogin(data)
                setLoading(false)
            } catch (error) {
                console.log(error);
                alert('Invalid user credentials / Account is not verified');
                setLoading(false)
            }
            setLoading(false)
        }
    }

    // To put the login credentials inside async storage and update the value of the context
    const persistLogin = (userCredentials) => {
        AsyncStorage.setItem('UserInfo', JSON.stringify(userCredentials))
            .then(() => {
                setStoredCredentials(userCredentials)
            })
            .catch((error) => {
                console.log(error);
                alert('Persisting login failed');                
            })
    }

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.headerContainer}>
                <Image source={blackLogo} style={styles.headerImage} />
                <Text style={styles.headerTxt}>FURRYHOPE</Text>
            </View>
            <Text style={styles.subTxt}>Let's Begin</Text>
            <Text style={styles.lblEmail}>Email</Text>
            <TextInput
                style={styles.input} 
                value={email}
                onChangeText={setEmail}
            />
            <Text style={styles.lblPassword}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword} 
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
                <Text style={styles.forgotPwd}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
                {
                    loading ?
                            <ActivityIndicator color='white' style={{ marginTop: 12 }} /> 
                        :
                            <Text style={styles.loginTxt}>LOGIN</Text>
                }
            </TouchableOpacity>
            <View style={styles.registerSec}>
                <Text style={styles.registerTxt}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerCTA}>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
} 

const styles = StyleSheet.create({
    body: {
        height: '100%',
        width: '100%',
        position: 'relative',
        backgroundColor: '#ffffff'
    },

    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 35,
        marginTop: 80,
    },

    headerImage: {
        width: 70,
        height: 70,
    },

    headerTxt: {
        fontFamily: 'Poppins_800ExtraBold',
        fontSize: 40,
    },

    subTxt: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 13.6,
        backgroundColor: '#ffef3d80',
        width: 83,
        paddingTop: 3,
        paddingRight: 5,
        paddingLeft: 5,
        marginLeft: 50,
    },

    lblEmail: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 19.2,
        marginTop: 50,
        marginLeft: 50,
        marginBottom: 5,
    },

    lblPassword: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 19.2,
        marginTop: 15,
        marginLeft: 50,
        marginBottom: 5,
    },

    input: {
        height: 40,
        width: '75%',
        borderColor: '#bfbfbf',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        marginLeft: 50,
        backgroundColor: '#ffffff',
        fontFamily: 'Poppins_400Regular',
        paddingLeft: 10,
        paddingRight: 10,
        //backgroundColor: '#d9d9d9',
    },

    forgotPwd: {
        marginLeft: 'auto',
        color: '#551A8B',
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        marginTop: 15,
        marginRight: 50,
    },

    // 317.25px
    loginBtn: {
        backgroundColor: '#111111',
        width: 317.25,
        height: 45,
        marginTop: 130,
        marginRight: 'auto',
        marginBottom: 30,
        marginLeft: 'auto',
    },

    loginTxt: {
        textAlign: 'center',
        fontFamily: 'Poppins_700Bold',
        fontSize: 20.8,
        marginTop: 5,
        color: '#fff',
        letterSpacing: 3,
    },

    registerSec: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    registerTxt: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 15.2,
    },

    registerCTA: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
        textDecorationLine: 'underline',
        marginTop: -2,
        marginLeft: 10,
        color: '#551A8B'
    },
});

export default LoginUser;