import { Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import logoBlack from '../assets/Login/logo-black.png'
import verifyVector from '../assets/Verification/verify-vector.png'

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
            alert('Your account has been validated, you will be logged in the application.')
            navigation.navigate('Login')
        } catch (error) {
            console.log(error)
            alert('Invalid Code.')
            return
        }

      
    }

    const goToSecondCode = () => {
        setTimeout(() => {
            secondCode.current.focus()
        }, 100)
    }

    const goToThirdCode = () => {
        setTimeout(() => {
            thirdCode.current.focus()
        }, 100)
    }

    const goToFourthCode = () => {
        setTimeout(() => {
            fourthCode.current.focus()
        }, 100)
    }

    return (
        <SafeAreaView style={styles.body}>
            <KeyboardAvoidingView>
                <View style={styles.screenNameContainer}>
                    <Image style={styles.logo} source={logoBlack} />
                    <Text style={styles.screenName}>ACCOUNT VERIFICATION</Text>
                </View>

                <Image style={styles.verificationImg} source={verifyVector} />
                <Text style={styles.heading}>CHECK YOUR EMAIL</Text>
                <Text style={styles.subHeading}>
                    We've sent a 4-digit code to your{`\n`}
                    email that will be used to verify your{`\n`}
                    newly created account.
                </Text>

                <View style={styles.codeContainer}>
                    <TextInput
                        value={code1}
                        onChangeText={setCode1}
                        keyboardType='numeric'
                        style={styles.codeInput}
                        maxLength={1}
                        ref={firstCode}
                        onKeyPress={goToSecondCode}
                    />
                    <TextInput
                        value={code2}
                        onChangeText={setCode2}
                        keyboardType='numeric'
                        style={styles.codeInput}
                        maxLength={1}
                        ref={secondCode}
                        onKeyPress={goToThirdCode}
                    />
                    <TextInput
                        value={code3}
                        onChangeText={setCode3}
                        keyboardType='numeric'
                        style={styles.codeInput}
                        maxLength={1}
                        ref={thirdCode}
                        onKeyPress={goToFourthCode}
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
                    <Text style={styles.verifyText}>VERIFY</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flex: 1,
    },

    screenNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 45,
        marginLeft: 28,
    },

    logo: {
        width: 21,
        height: 21,
    },

    screenName: {
        fontFamily: 'PoppinsMedium',
        fontSize: 12,
        marginLeft: 7,
    },

    verificationImg: {
        height: 190,
        width: 190,
        marginTop: 68,
        marginRight: 'auto',
        marginLeft: 'auto',
    },

    heading: {
        fontFamily: 'PoppinsBold',
        fontSize: 23,
        textAlign: 'center',
        marginTop: 25,
    },
    
    subHeading: {
        textAlign: 'center',
        fontFamily: 'PoppinsLight',
        fontSize: 18,
        marginTop: 10,
    },

    codeContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 60,
        marginRight: 30,
        marginLeft: 30,
    },

    codeInput: {
        height: 75,
        width: 75,
        borderColor: '#b0b0b0',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        fontFamily: 'PoppinsRegular',
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
        borderRadius: 5,
        marginTop: 100,
        marginRight: 'auto',
        marginLeft: 'auto',
    },

    verifyText: {
        textAlign: 'center',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 25,
        color: 'white',
        marginTop: 12,
    },
})

export default VerificationScreen