import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import returnIcon from '../assets/arrowLeft.png'
import ForgotPasswordPng from '../assets/forgot-password.png'
import resetPasswordPng from '../assets/Images/resetPassword-vector.png'
import axios from 'axios'
import React, { useState, useRef } from 'react'

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [focused, setFocused] = useState(false)

    const submitHandler = async () => {
        if (!email) {
            alert('Please provide an email.')
        }

        try {
            const { data } = await axios.post('http://localhost:5000/api/users/sendResetPassword', { email })
            console.log(data)
            alert('Check your email for the link.')
        } catch (error) {
            console.log(error)   
        }

        setEmail('')
    }

    return (
        <SafeAreaView style={styles.body}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Login')}>
                <Image style={styles.backIcon} source={returnIcon} />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Image style={styles.forgotPwdPng} source={resetPasswordPng} />

            <Text style={styles.forgotPwdHead}>RESET YOUR PASSWORD</Text>
            <Text style={styles.forgotPwdSub}>
                Enter your email, then a link will be {`\n`}
                sent to your email. Where you can {'\n'}
                change / reset your password.
            </Text>

            <Text style={styles.emailLabel}>Email</Text>
            <TextInput
                style={focused ? styles.inputFocused : styles.emailInput}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}    
            />

            <TouchableOpacity style={styles.submitBtn} onPress={() => submitHandler()}>
                <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flex: 1,
    },

    backBtn: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 35,
        marginLeft: 38,
    },

    backIcon: {
        height: 23,
        width: 23,
    },

    backText: {
        fontFamily: 'PoppinsMedium',
        fontSize: 14.5,
        marginTop: 2,
        marginLeft: 7,
    },

    forgotPwdPng: {
        height: 185,
        width: 185,
        marginTop: 73,
        marginRight: 'auto',
        marginLeft: 'auto',
    },

    forgotPwdHead: {
        textAlign: 'center',
        fontFamily: 'PoppinsBold',
        fontSize: 23,
        marginTop: 50,
        marginBottom: 7,
    },

    forgotPwdSub: {
        textAlign: 'center',
        fontFamily: 'PoppinsLight',
        fontSize: 17,
    },

    emailLabel: {
        fontFamily: 'PoppinsRegular',
        fontSize: 16,
        marginTop: 35,
        marginBottom: 3,
        marginLeft: 42,
    },

    emailInput: {
        height: 45,
        width: '80%',
        backgroundColor: '#E8E8E8',
        borderRadius: 5,
        marginRight: 42,
        marginLeft: 42,
        paddingRight: 10,
        paddingLeft: 10,
    },

    inputFocused: {
        height: 45,
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1.5,
        marginRight: 42,
        marginLeft: 42,
        paddingRight: 10,
        paddingLeft: 10,
    },

    submitBtn: {
        height: 60,
        width: '80%',
        backgroundColor: '#111',
        borderRadius: 5,
        marginTop: 110,
        marginRight: 42,
        marginLeft: 42,
    },

    submitText: {
        textAlign: 'center',
        fontFamily: 'PoppinsBold',
        fontSize: 25,
        color: 'white',
        marginTop: 10,
    },
})

export default ForgotPassword