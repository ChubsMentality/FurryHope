import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ChangePassword = ({ navigation, route }) => {
    const { id } = route.params
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const [pwdFocused, setPwdFocused] = useState(false)
    const [confirmPwdFocused, setConfirmPwdFocused] = useState(false)

    const changePassword = async () => {
        if (!password || !confirmPwd) {
            alert('Please fill out the necessary fields.')
        } else if (password.search(/[0-9]/) === -1) { // Password should contain a number
            alert('Your password should contain one or more numbers')
        } else if(password.search(/[a-z]/) === -1) { // Password should contain a lowercase letter
            alert('Your password should contain lowercase letters')
        } else if(password.search(/[A-Z]/) === -1) { // Password should contain an uppercase letter
            alert('Your password should contain an uppercase letter')
        } else if(password.search(/[!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) === -1) { // Password should contain special characters
            alert('Your password should also contain special characters')
        } else if(password !== confirmPwd) {
            alert('Passwords does not match');
        } else if(password.length < 8) {
            alert('Passwords should be atleast 8 characters of more.')
        } else {
            try {
                setLoading(true)
                const { data } = await axios.put(`http://localhost:5000/api/users/updatePassword/${id}`, { password })
                setLoading(false)
                navigation.goBack()
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <Text style={styles.changePwdHeader}>Your password must be different from your old one.</Text>
            <Text style={styles.changePwdSubHeader}>We suggest that you use a combination of capital letters, numbers, special characters, etc., for your password to make it more secure.</Text>

            <Text style={[styles.pwdLabel, styles.password]}>Password</Text>
            <TextInput
                style={pwdFocused ? styles.pwdInputFocused : styles.pwdInput}
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
                onFocus={() => setPwdFocused(true)}
                onBlur={() => setPwdFocused(false)}
            />

            <Text style={styles.pwdLabel}>Confirm Password</Text>
            <TextInput
                style={confirmPwdFocused ? styles.pwdInputFocused : styles.pwdInput}
                value={confirmPwd}
                secureTextEntry={true}
                onChangeText={setConfirmPwd}
                onFocus={() => setConfirmPwdFocused(true)}
                onBlur={() => setConfirmPwdFocused(false)}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={() => changePassword()}>
                {loading ?
                    <ActivityIndicator size='small' color='white' />
                    :
                    <Text style={styles.saveTxt}>SAVE</Text>
                }
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    changePwdHeader: {
        marginTop: 35,
        marginRight: 35,
        marginLeft: 35,
        fontFamily: 'PoppinsBold',
        fontSize: 24,
    }, 

    changePwdSubHeader: {
        marginTop: 5,
        marginRight: 35,
        marginLeft: 35,
        fontFamily: 'PoppinsLight',
        fontSize: 14,
        lineHeight: 28,

    },

    password: {
        marginTop: 50,
    },

    pwdLabel: {
        fontFamily: 'PoppinsRegular',
        fontSize: 14.5,
        marginLeft: 35,
        marginBottom: 5,
    },

    pwdInput: {
        height: 45,
        width: '80%',
        marginLeft: 35,
        marginBottom: 20,
        fontFamily: 'PoppinsLight',
        fontSize: 13,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        borderColor: '#f1f3f7',
        borderWidth: 3,
        backgroundColor: '#f3f5f9',
    },

    pwdInputFocused: {
        height: 46,
        width: '80%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        marginLeft: 35,
        marginBottom: 20,
        backgroundColor: 'white',
        fontFamily: 'PoppinsLight',
        fontSize: 13,
        paddingLeft: 10,
        paddingRight: 10,
    },

    saveBtn: {
        height: 55,
        width: '80%',
        backgroundColor: '#111',
        marginTop: 60,
        marginRight: 35,
        marginLeft: 35,
        justifyContent: 'center',
        alignItems: 'center',

    },

    saveTxt: {
        color: 'white',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 22,
    },
})