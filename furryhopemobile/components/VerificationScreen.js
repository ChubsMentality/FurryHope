import { Keyboard, KeyboardAvoidingView, StyleSheet, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useRef } from 'react'
import axios from 'axios'
import VerifyPng from '../assets/Verification/verification.png'

const VerificationScreen = ({ navigation, route }) => {
    const { User } = route.params

    console.log(User)

    const [code1, setCode1] = useState('')
    const [code2, setCode2] = useState('')
    const [code3, setCode3] = useState('')
    const [code4, setCode4] = useState('')

    const firstCode = useRef()
    const secondCode = useRef()
    const thirdCode = useRef()
    const fourthCode = useRef()

    const verificationCode = code1 + code2 + code3 + code4
    //console.log(`${code1}, ${code2}, ${code3}, ${code4}`)
    
    const verifyUser = async () => {
        Keyboard.dismiss()

        try {
            const { data } = await axios.post(`http://localhost:5000/api/users/verifyUser/${User.id}`, { verificationCode })
            console.log(data)
            alert('Your account has been validated, you can proceed and login in the application.')
            navigation.navigate('Login')
        } catch (error) {
            console.log(error)
            alert('Invalid Code.')
        }
    }

    return (
        <KeyboardAvoidingView style={styles.body}>
            <Image style={styles.verificationImg} source={VerifyPng} />
            <Text style={styles.heading}>VERIFICATION</Text>
            <Text style={styles.subHeading}>
                We've sent a code to your email,{`\n`}
                Use the code we sent you to{`\n`}
                verify your account.
            </Text>

            <View style={styles.codeContainer}>
                <TextInput
                    value={code1}
                    onChangeText={setCode1}
                    keyboardType='numeric'
                    style={styles.codeInput}
                    maxLength={1}
                    ref={firstCode}
                />
                <TextInput
                    value={code2}
                    onChangeText={setCode2}
                    keyboardType='numeric'
                    style={styles.codeInput}
                    maxLength={1}
                    ref={secondCode}
                />
                <TextInput
                    value={code3}
                    onChangeText={setCode3}
                    keyboardType='numeric'
                    style={styles.codeInput}
                    maxLength={1}
                    ref={thirdCode}
                />
                <TextInput
                    value={code4}
                    onChangeText={setCode4}
                    keyboardType='numeric'
                    style={styles.codeInput}
                    maxLength={1}
                    ref={fourthCode}
                />
            </View>

            <TouchableOpacity style={styles.verifyBtn} onPress={() => verifyUser()}>
                <Text style={styles.verifyText}>SUBMIT & VERIFY</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flex: 1,
    },

    verificationImg: {
        height: 240,
        width: 240,
        marginTop: 35,
        marginRight: 'auto',
        marginLeft: 'auto',
    },

    heading: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 25,
    },
    
    subHeading: {
        textAlign: 'center',
        fontFamily: 'Poppins_300Light',
        fontSize: 18,
        marginTop: 10,
    },

    codeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 60,
    },

    codeInput: {
        height: 60,
        width: 65,
        borderColor: '#b0b0b0',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular',
        fontSize: 25,
        shadowColor: '#111111',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: .3,
        shadowRadius: 4,
    },

    verifyBtn: {
        height: 60,
        width: 350,
        backgroundColor: '#111111',
        marginTop: 105,
        marginRight: 'auto',
        marginLeft: 'auto',
    },

    verifyText: {
        textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 25,
        color: 'white',
        marginTop: 12,
    },
})

export default VerificationScreen