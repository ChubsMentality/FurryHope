import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'

const ReVerify = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [emailFocused, setEmailFocused] = useState(false)

    const resendCodeHandler = async () => {
        if(!email) return alert('Please enter your email')

        try {
            const { data } = await axios.post('http://localhost:5000/api/users/resendCode', { email })
            console.log(data)
            navigation.navigate('ReVerification', { email: email })
        } catch (error) {
            console.log(error)
        }
    }

    const alreadHaveHandler = () => {
        if(!email) return alert('Please enter your email')
        navigation.navigate('ReVerification', { email: email })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', position: 'relative' }}>
            <TouchableOpacity style={styles.returnContainer} onPress={() => navigation.goBack()}>
                <Image
                    style={styles.arrowReturn} 
                    source={require('../assets/arrowLeft.png')}
                />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Image style={styles.verifyVector} source={require('../assets/Login/otp.png')}/>
            <Text style={styles.verifyHeader}>Verify your Account.</Text>
            <Text style={styles.verifySubHeader}>Enter your email to send the verification code.</Text>

            <Text style={styles.verifyLabel}>Email</Text>
            <TextInput
                style={emailFocused ? styles.verifyInputFocused : styles.verifyInput}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
            />

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.haveACodeBtn} onPress={() => alreadHaveHandler()}>
                    <Text style={styles.haveACodeTxt}>Already have a code.</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.sendCodeBtn} onPress={() => resendCodeHandler()}>
                    <Text style={styles.sendCodeTxt}>SEND CODE</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ReVerify

const styles = StyleSheet.create({
    returnContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 0,
        marginLeft: 38,
    },

    arrowReturn: {
        width: 23,
        height: 23,
        marginTop: 16,
    },

    backText: {
        fontFamily: 'PoppinsRegular',
        fontSize: 12.5,
        marginTop: 18,
        marginLeft: 5,
    },

    verifyVector: {
        marginTop: 50,
        marginRight: 'auto',
        marginLeft: 'auto',
        height: 240,
        width: 240,
    },

    verifyHeader: {
        fontFamily: 'PoppinsBold',
        fontSize: 30,
        marginTop: 40,
        textAlign: 'center',
    },

    verifySubHeader: {
        fontFamily: 'PoppinsLight',
        fontSize: 18,
        marginTop: 6,
        textAlign: 'center',
        marginRight: 38,
        marginLeft: 38,
    },

    verifyLabel: {
        fontFamily: 'PoppinsRegular',
        fontSize: 17,
        marginBottom: 5,
        marginTop: 35,
        marginLeft: 38,
    },

    verifyInput: {
        height: 45,
        width: '81%',
        borderRadius: 5,
        borderColor: '#f1f3f7',
        borderWidth: 3,
        backgroundColor: '#f3f5f9',
        color: '#8c8c8e',
        fontFamily: 'PoppinsRegular',
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 38,
        marginRight: 38,
    },

    verifyInputFocused: {
        height: 45,
        width: '80%',
        borderColor: '#111',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        fontFamily: 'PoppinsRegular',
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 38,
        marginRight: 38,
    },

    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 80,
        marginRight: 38,
        marginLeft: 38,
        gap: 10
    },

    haveACodeBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        height: 53,
        width: '53%',
    },

    haveACodeTxt: {
        fontFamily: 'PoppinsMedium',
        fontSize: 14,
    },

    sendCodeBtn: {
        height: 53,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111',
        borderRadius: 5,
    },

    sendCodeTxt: {
        color: 'white',
        fontFamily: 'PoppinsMedium',
        fontSize: 14
    },


})