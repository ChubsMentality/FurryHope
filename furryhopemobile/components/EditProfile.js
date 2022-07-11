import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker'

const EditProfile = ({ navigation, route }) => {
    const { id, successUpdateProfile, setSuccessUpdateProfile } = route.params
    const [loading, setLoading] = useState(false)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [address, setAddress] = useState('') 
    const [profilePicture, setProfilePicture] = useState('')
    const [preview, setPreview] = useState('')

    const [fNameFocused, setFNameFocused] = useState(false)
    const [emailFocused, setEmailFocused] = useState(false)
    const [contactNoFocused, setContactNoFocused] = useState(false)
    const [addressFocused, setAddressFocused] = useState(false)
    
    const getUser = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/users/getUserById/${id}`)
        setFullName(data.fullName)
        setEmail(data.email)
        setContactNo(data.contactNo)
        setAddress(data.address)
        setPreview(data.profilePicture)   
    }

    const uploadHandler = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'furryhopeimg')
        data.append('cloud_name', 'drvd7jh0b')
        fetch('https://api.cloudinary.com/v1_1/drvd7jh0b/image/upload', {
            method: 'post',
            body: data,
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            let response = data.url
            setProfilePicture(response)
        })
        .catch((error) => {
            console.log(error)    
        })
    }

    const changePicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        })

        console.log(result)

        if(!result.cancelled) {
            let base64Img = `data:image/jpg;base64,${result.base64}`
            uploadHandler(base64Img)
            setPreview(result.uri)
        }
    }

    const updateHandler = async () => {
        try {
            const { data } = await axios.put(`http://localhost:5000/api/users/updateProfilePicture/${id}`, { profilePicture })
        } catch (error) {
           console.log(error) 
        }

        try {
            setLoading(true)
            const { data } = await axios.put(`http://localhost:5000/api/users/updateUserProfile/${id}`, { fullName, email, contactNo, address })
            setLoading(false)
            navigation.navigate('My Profile')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <ScrollView>

                <View style={styles.changePictureContainer}>
                    <Image source={preview} style={styles.profilePicture} />

                    <View>
                        <TouchableOpacity style={styles.changePictureBtn} onPress={() => changePicture()}>
                            <Ionicons name='image-outline' size={22} color='black' />
                            <Text style={styles.changePictureTxt}>Change Profile Picture</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={[styles.editLabel, styles.nameLabel]}>Name</Text>
                <TextInput
                    style={fNameFocused ? styles.editInputFocused : styles.editInput}
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() => setFNameFocused(true)}
                    onBlur={() => setFNameFocused(false)}
                />

                <Text style={styles.editLabel}>Email</Text>
                <TextInput
                    style={emailFocused ? styles.editInputFocused : styles.editInput}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                />

                <Text style={styles.editLabel}>Contact Number</Text>
                <TextInput
                    style={contactNoFocused ? styles.editInputFocused : styles.editInput}
                    value={contactNo}
                    onChangeText={setContactNo}
                    onFocus={() => setContactNoFocused(true)}
                    onBlur={() => setContactNoFocused(false)}
                />

                <Text style={styles.editLabel}>Address</Text>
                <TextInput
                    style={addressFocused ? styles.editInputFocused : styles.editInput}
                    value={address}
                    onChangeText={setAddress}
                    onFocus={() => setAddressFocused(true)}
                    onBlur={() => setAddressFocused(false)}
                />

                <TouchableOpacity style={styles.saveBtn} onPress={() => updateHandler()}>
                    {loading ?
                        <ActivityIndicator size='small' color='white' />
                    :
                        <Text style={styles.saveTxt}>SAVE</Text>
                    }
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    changePictureContainer: {
        flexDirection: 'row',
        marginTop: 40,
        marginRight: 35,
        marginLeft: 35,
        alignItems: 'center',
    },

    profilePicture: {
        height: 120,
        width: 120,
        borderRadius: 100,
    },

    changePictureBtn: {
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: .05,
        borderRadius: 5,
        flexDirection: 'row',
        marginLeft: 15,
        padding: 5,
    },

    changePictureTxt: {
        marginLeft: 5,
    },

    editLabel: {
        fontFamily: 'PoppinsRegular',
        fontSize: 14.5,
        marginLeft: 35,
        marginBottom: 5,
    },

    nameLabel: {
        marginTop: 50,
    },

    editInputFocused: {
        height: 46,
        width: '80%',
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: 'black',
        marginLeft: 35,
        marginBottom: 20,
        backgroundColor: 'white',
        fontFamily: 'PoppinsLight',
        fontSize: 13,
        paddingLeft: 10,
        paddingRight: 10,
    },

    editInput: {
        height: 46,
        width: '80%',
        borderRadius: 5,
        marginLeft: 35,
        marginBottom: 20,
        backgroundColor: '#E8E8E8',
        fontFamily: 'PoppinsLight',
        fontSize: 13,
        paddingLeft: 10,
        paddingRight: 10,
    },

    saveBtn: {
        height: 55,
        width: '80%',
        backgroundColor: '#111',
        marginTop: 90,
        marginRight: 30,
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },

    saveTxt: {
        color: 'white',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 22,
    },
})

export default EditProfile