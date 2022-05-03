import React, { useState } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, TextInput } from 'react-native';
import { StackActions } from '@react-navigation/native'
import axios from 'axios';

const RegisterUser = ({navigation}) => {

    const [loading, setLoading] = useState(false)

    // To register the user's info
    const register = async () => {
        setLoading(true)

        // Using regex to create a strong password
        if (password.search(/[0-9]/) === -1) { // Password should contain a number
            alert('Your password should contain one or more numbers')
        } else if(password.search(/[a-z]/) === -1) { // Password should contain a lowercase letter
            alert('Your password should contain lowercase letters')
        } else if(password.search(/[A-Z]/) === -1) { // Password should contain an uppercase letter
            alert('Your password should contain an uppercase letter')
        } else if(password.search(/[!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) === -1) { // Password should contain special characters
            alert('Your password should also contain special characters')
        } else if(password !== confirmPassword) {
            alert('Passwords does not match');
        } else if(!fullName || !email || !contactNo || !password || !confirmPassword) {
            alert('Please fill out all the necessary fields');
        }
         else {
            try {
                // async / await format 
                const { data } = await axios.post('http://localhost:5000/api/users', { fullName, email, contactNo, password }) 
                console.log(data)
                setLoading(false)
                navigation.dispatch(StackActions.replace('Verification', { User: data })) 
            } catch (error) {
                console.log(error)
                alert('Failed to create an account / The account already exists.')
                setLoading(false)
            }
        }

        setLoading(false)
    }

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <ScrollView style={styles.body}>
            <TouchableOpacity style={styles.returnContainer} onPress={() => navigation.navigate('Login')}>
                <Image
                    style={styles.arrowReturn} 
                    source={require('../assets/arrowLeft.png')}
                />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.header}>REGISTER</Text>
            <Text style={styles.headerAesthetic}></Text>

            <Text style={[styles.fullNameTxt, styles.labels]}>Full Name</Text>
            <TextInput
                style={styles.input}
                value={fullName} 
                onChangeText={setFullName}
            />

            <Text style={[styles.emailTxt, styles.labels]}>Email</Text>
            <TextInput 
                style={styles.input}
                value={email}
                onChangeText={setEmail} 
            />

            <Text style={[styles.emailTxt, styles.labels]}>Contact Number</Text>
            <TextInput 
                style={styles.input}
                value={contactNo}
                onChangeText={setContactNo} 
                maxLength={11}
            />

            <Text style={[styles.passwordTxt, styles.labels]}>Password</Text>
            <TextInput 
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            <Text style={[styles.confirmPasswordTxt, styles.labels]}>Confirm Password</Text>
            <TextInput 
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={() => register()}>
                {
                    loading ? 
                            <ActivityIndicator color='white' style={{ marginTop: 12 }} />
                        :
                            <Text style={styles.submitTxt}>SUBMIT</Text>
                }
            </TouchableOpacity>
        </ScrollView>
    );
} 

const styles = StyleSheet.create({
    body: {
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff'
    },

    returnContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
    },

    arrowReturn: {
        width: 24,
        height: 24,
        marginTop: 15,
        marginLeft: 20
    },

    backText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 13.6,
        marginTop: 18,
        marginLeft: 5,
    },

    header: {
        fontFamily: 'Poppins_900Black',
        fontSize: 32,
        marginTop: 35,
        marginLeft: 40
    },
    headerAesthetic: {
        width: 70,
        height: 9,
        backgroundColor: '#ffef3d80',
        borderRadius: 50,
        marginTop: -6,
        marginLeft: 40,
    },

    labels: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 17.2,
        marginLeft: 40,
        marginBottom: 5,
    },

    fullNameTxt: {
        marginTop: 35
    },

    input: {
        height: 40,
        width: '80%',
        borderColor: '#bfbfbf',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        marginLeft: 40,
        marginBottom: 20,
        backgroundColor: '#ffffff',
        fontFamily: 'Poppins_400Regular',
        paddingLeft: 10,
        paddingRight: 10,
        //backgroundColor: '#d9d9d9',
    },

    submitBtn: {
        backgroundColor: '#111111',
        width: 328.8,
        height: 50,
        marginTop: 50,
        marginRight: 'auto',
        marginBottom: 30,
        marginLeft: 'auto',
    },

    submitTxt: {
        textAlign: 'center',
        fontFamily: 'Poppins_700Bold',
        fontSize: 22.4,
        marginTop: 10,
        color: '#fff',
    },

});

export default RegisterUser;