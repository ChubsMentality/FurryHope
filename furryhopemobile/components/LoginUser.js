import React, { useState, useContext, useRef } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image, TextInput, Touchable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logoBlack from '../assets/Login/logo-black.png'
import loginVector from '../assets/Login/login-vector.png'
import { CredentialsContext } from './CredentialsContext';

const LoginUser = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailFocused, setEmailFocused] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)

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
                <View style={styles.headerLeft}>
                    <Image source={logoBlack} style={styles.logoBlack} />
                    <Text style={styles.headerAdopt}>ADOPT,</Text>
                    <Text style={styles.headerDontShop}>DON'T SHOP</Text>
                </View>

                <Image source={loginVector} style={styles.loginVector} />
            </View>

            <Text style={styles.lblEmail}>Email</Text>
            <TextInput
                style={emailFocused ? styles.inputFocused : styles.input} 
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
            />
            <Text style={styles.lblPassword}>Password</Text>
            <TextInput
                style={passwordFocused ? styles.inputFocused : styles.input}
                value={password}
                onChangeText={setPassword} 
                secureTextEntry={true}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
            />
            
            <View style={styles.forgotPwdContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Re-verify')}>
                    <Text style={styles.forgotPwd}>Verify Account</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
                    <Text style={styles.forgotPwd}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            {/* <TouchableOpacity onPress={() => navigation.navigate('Verification')}>
                <Text style={styles.forgotPwd}>Verify Account</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
                {
                    loading ?
                            <ActivityIndicator color='white' size='large' style={{ marginTop: 15 }} /> 
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
        justifyContent: 'space-between',
        marginLeft: 45,
        marginRight: 45,
        marginTop: 100,
    },

    logoBlack: {
        height: 38,
        width: 38,
        marginBottom: 5,
    },

    headerAdopt: {
        fontFamily: 'PoppinsBlack',
        fontSize: 30,
    },

    headerDontShop: {
        fontFamily: 'PoppinsBlack',
        fontSize: 30,
    },

    loginVector: {
        height: 127,
        width: 118,
    },

    lblEmail: {
        fontFamily: 'PoppinsRegular',
        fontSize: 18,
        marginTop: 35,
        marginLeft: 45,
        marginBottom: 5,
    },

    lblPassword: {
        fontFamily: 'PoppinsRegular',
        fontSize: 18,
        marginTop: 20,
        marginLeft: 45,
        marginBottom: 5,
    },

    input: {
        height: 47,
        width: '78%',
        fontFamily: 'PoppinsRegular',
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 45,
        borderRadius: 5,
        borderColor: '#f1f3f7',
        borderWidth: 3,
        backgroundColor: '#f3f5f9',
        color: '#8c8c8e',
        fontSize: 14,
    },

    inputFocused: {
        height: 47,
        width: '78%',
        marginLeft: 45,
        backgroundColor: 'white',
        fontFamily: 'PoppinsRegular',
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#111',
        borderWidth: 1,
    },

    forgotPwdContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 45,
        marginRight: 45
    },

    forgotPwdTxt: {
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
    },

    forgotPwd: {
        color: '#551A8B',
        fontSize: 13,
        fontFamily: 'PoppinsRegular',
    },

    loginBtn: {
        backgroundColor: '#111111',
        borderRadius: 5,
        width: 323,
        height: 66,
        marginTop: 130,
        marginRight: 'auto',
        marginBottom: 30,
        marginLeft: 'auto',
    },

    loginTxt: {
        textAlign: 'center',
        fontFamily: 'PoppinsBold',
        fontSize: 26,
        marginTop: 13,
        color: '#fff',
        letterSpacing: 3,
    },

    registerSec: {
        flexDirection: 'row',
        marginLeft: 45,
    },

    registerTxt: {
        fontFamily: 'PoppinsRegular',
        fontSize: 14.5,
    },

    registerCTA: {
        fontFamily: 'PoppinsBold',
        fontSize: 14.5,
        marginTop: -2,
        marginLeft: 10,
        color: '#551A8B'
    },
});

export default LoginUser;