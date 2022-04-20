import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { CredentialsContext } from './CredentialsContext'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import closeIcon from '../assets/Icons/close_cross.png'

const ProfileSettings = ({ navigation, route }) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const [userData, setUserData] = useState()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)


    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
            setUserData(data)
            setFullName(data.fullName)
            setEmail(data.email)
            setContactNo(data.contactNo)
        } catch (error) {
            console.log(error)            
        }
    }

    const updateProfile = async () => {
        if(!password || !confirmPassword) {

        } else if(password !== confirmPassword) {
            alert('Password does not match')
        } else {
            try {
                setLoading(true)
                const { data } = await axios.put(`http://localhost:5000/api/users/updateUserProfile/${storedCredentials.id}`, { fullName, email, contactNo, password })
                console.log(data)
                setPassword('')
                setConfirmPassword('')
                setLoading(false)
                navigation.navigate('My Profile')
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <ScrollView style={styles.body}>
            <TouchableOpacity style={styles.closeContainer} onPress={() => navigation.navigate('My Profile')}>
                <Image style={styles.close} source={closeIcon} onPress={() => navigation.goBack()} />
            </TouchableOpacity>

            <Text style={styles.editProfileTxt}>EDIT PROFILE</Text>

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

            <TouchableOpacity style={styles.submitBtn} onPress={() => updateProfile()}>
                {
                    loading ? 
                            <ActivityIndicator color='white' style={{ marginTop: 12 }} />
                        :
                            <Text style={styles.submitTxt}>SUBMIT</Text>
                }
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
    },

    closeContainer: {
        position: 'absolute',
        top: 15,
        right: 35,
    },

    close: {
        height: 30,
        width: 30,
    },

    editProfileTxt: {
        marginTop: 70,
        marginLeft: 40,
    },

    labels: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 17.2,
        marginLeft: 40,
        marginBottom: 5,
    },

    fullNameTxt: {
        marginTop: 40,
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
})


export default ProfileSettings