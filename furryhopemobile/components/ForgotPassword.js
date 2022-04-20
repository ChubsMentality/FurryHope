import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import returnIcon from '../assets/arrowLeft.png'
import ForgotPasswordPng from '../assets/forgot-password.png'
import axios from 'axios'
import React, { useState } from 'react'

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('')

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

            <Image style={styles.forgotPwdPng} source={ForgotPasswordPng} />

            <Text style={styles.forgotPwdHead}>RESET PASSWORD</Text>
            <Text style={styles.forgotPwdSub}>
                Enter your email, so that we can {`\n`}
                send a link to reset your password.
            </Text>

            <Text style={styles.emailLabel}>Email</Text>
            <TextInput
                style={styles.emailInput}
                value={email}
                onChangeText={setEmail}
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
        marginTop: 25,
        marginLeft: 20,
    },

    backIcon: {
        height: 23,
        width: 23,
    },

    backText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14.5,
        marginTop: 2,
        marginLeft: 7,
    },

    forgotPwdPng: {
        height: 250,
        width: 250,
        marginTop: 30,
        marginRight: 'auto',
        marginLeft: 'auto',
    },

    forgotPwdHead: {
        textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 7,
    },

    forgotPwdSub: {
        textAlign: 'center',
        fontFamily: 'Poppins_300Light',
        fontSize: 18,
    },

    emailLabel: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        marginTop: 15,
        marginBottom: 3,
        marginLeft: 54,
    },

    emailInput: {
        height: 45,
        width: 300,
        borderWidth: 1,
        borderColor: '#111',
        marginLeft: 55,
        paddingRight: 10,
        paddingLeft: 10,
    },

    submitBtn: {
        height: 60,
        width: 300,
        backgroundColor: '#111',
        marginTop: 110,
        marginLeft: 55,
    },

    submitText: {
        textAlign: 'center',
        fontFamily: 'Poppins_700Bold',
        fontSize: 25,
        color: 'white',
        marginTop: 10,
    },
})

export default ForgotPassword