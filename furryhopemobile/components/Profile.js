import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View, } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { CredentialsContext } from './CredentialsContext'
import { Picker } from '@react-native-picker/picker'
import { quickSort } from './SubComponents/QuickSort'
import { useNavigation } from '@react-navigation/native'
import BottomNav from './SubComponents/BottomNav'
import TopNav from './SubComponents/TopNav'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Profile = () => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    const [userData, setUserData] = useState()
    const window = useWindowDimensions()
    const navigation = useNavigation()

    const [adoptions, setAdoptions] = useState()
    const [registrations, setRegistrations] = useState()
    const [moreOptionsModal, setMoreOptionsModal] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const [profilePicture, setProfilePicture] = useState('')
    const [profilePicturePreview, setProfilePicturePreview] = useState('https://res.cloudinary.com/drvd7jh0b/image/upload/v1650026769/tcgfy3tbaoowhjfufvob.png')
    const [successChangedPicture, setSuccessChangedPicture] = useState(false)
    const [successUpdateProfile, setSuccessUpdateProfile] = useState(false)
    const [toggleBtnActive, setToggleBtnActive] = useState('Adoptions')

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
            setUserData(data)
            setProfilePicturePreview(data.profilePicture)
        } catch (error) {
            console.log(error)
        }
    } 

    const config = {
        headers: {
            Authorization: `Bearer ${storedCredentials.token}`
        }
    }

    const myAdoptions = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/users/getSpecificAdoptions', config)
            console.log(data)
            setAdoptions(quickSort(data, 0, data.length - 1))
        } catch (error) {
            console.log(error)
        }
    }

    const petRegistrations = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/users/getSpecificRegistrations', config)
            setRegistrations(quickSort(data, 0, data.length - 1))
        } catch (error) {
            console.log(error)
        }
    }

    const navigateToChangePwd = () => {
        setOverlay(!overlay)
        setMoreOptionsModal(!moreOptionsModal)
        navigation.navigate('Change Password', { id: storedCredentials.id })
    }

    const changedProfileHandler = () => {
        setSuccessUpdateProfile(!successUpdateProfile)
    }

    useEffect(() => { 
        fetchUser()
        myAdoptions()
        petRegistrations()
    }, [successChangedPicture, successUpdateProfile])

    const openMoreOptions = () => {
        setOverlay(!overlay)
        setMoreOptionsModal(true)
    }

    const closeMoreOptions = () => {
        setOverlay(!overlay)
        setMoreOptionsModal(false)
    }

    const MoreOptions = () => {
        return (
            <View style={styles.moreOptionsContainer}>
                <TouchableOpacity style={styles.moreOptionsLink} onPress={() => navigateToChangePwd()}>
                    <Text style={styles.moreOptionsTxt}>Change Password</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const AdoptListItem = ({ item }) => {
        return (
            <View>
                <Text>Hello</Text>
            </View>
        )
    }

    const RegistrationListItem = ({ item }) => {
        return (
            <View>

            </View>
        )
    }

    const emptyList = () => {
        return (
            <Text>Empty List</Text>
        )
    }

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView>
                <TopNav ScreenName='Profile' color='#111' />
                
                <Image source={profilePicturePreview} style={styles.profilePicture} />
                <View style={styles.container}>
                    <Text style={styles.userName}>{userData && userData.fullName}</Text>

                    <View style={styles.profileBtnsContainer}>
                        <TouchableOpacity style={styles.editProfileBtn} onPress={() => navigation.navigate('Edit Profile', { id: storedCredentials.id, successUpdateProfile: successUpdateProfile })}>
                            <Text style={styles.editProfileTxt}>EDIT PROFILE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.moreOptionsBtn} onPress={() => openMoreOptions()}>
                            <Ionicons name='ios-ellipsis-vertical' size={18} color='#111' />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: .05, width: '85.5%', marginTop: 10, marginRight: 30, marginLeft: 30, borderColor: '#B0B0B0', borderWidth: .05}}></View>
            
                <View style={styles.toggleBtnContainer}>
                    <TouchableOpacity style={toggleBtnActive === 'Adoptions' ? styles.toggleBtn : styles.toggleBtnInactive} onPress={() => setToggleBtnActive('Adoptions')}>
                        <Text style={toggleBtnActive === 'Adoptions' ? styles.toggleTxt : styles.toggleTxtInactive}>My Adoptions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={toggleBtnActive !== 'Adoptions' ? styles.toggleBtn : styles.toggleBtnInactive} onPress={() => setToggleBtnActive('Registrations')}>
                        <Text style={toggleBtnActive !== 'Adoptions' ? styles.toggleTxt : styles.toggleTxtInactive}>Pet Registrations</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    {toggleBtnActive === 'Adoptions' ? 
                        <FlatList
                            data={adoptions}
                            renderItem={AdoptListItem}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={emptyList}
                        />
                        :
                        <FlatList
                            data={registrations}
                            renderItem={RegistrationListItem}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={emptyList}
                        />
                    }
                </ScrollView>
            </ScrollView>

            {moreOptionsModal && <MoreOptions />}

            {overlay &&
                <Pressable onPress={() => closeMoreOptions()} style={{
                    width: window.width, 
                    height: window.height, 
                    backgroundColor: '#111',
                    opacity: .5,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 5
                }}></Pressable>
            }

            <BottomNav />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#ffffff',
        flex: 1,
        position: 'relative',
    },

    profilePicture: {
        height: 120,
        width: 120,
        borderRadius: 100,
        marginTop: 50,
        marginLeft: 27,
    },

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginRight: 30,
        marginLeft: 30,
    },

    userName: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 16,
    },

    profileBtnsContainer: {
        flexDirection: 'row',
    },

    editProfileBtn: {
        alignSelf: 'flex-start',
        borderColor: '#111',
        borderRadius: 5,
        borderWidth: .5,
        marginTop: -5,
        marginRight: 10,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: {
            height: 1,
        },
        shadowRadius: 10,
        shadowOpacity: .5,
    },

    editProfileTxt: {
        color: '#111',
        textAlign: 'center',
        fontFamily: 'PoppinsRegular',
        fontSize: 13,
    },

    moreOptionsBtn: {
        alignSelf: 'flex-start',
        borderColor: '#111',
        borderRadius: 5,
        borderWidth: .5,
        marginTop: -5,
        paddingTop: 5,
        paddingRight: 2,
        paddingBottom: 5,
        paddingLeft: 2,
    },

    toggleBtnContainer: {
        marginTop: 15,
        marginRight: 30,
        marginLeft: 30,
        flexDirection: 'row',
    },

    toggleBtn: {
        height: 45,
        width: '50%',
        backgroundColor: '#FFFF66',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    toggleTxt: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 13,
    },

    toggleBtnInactive: {
        height: 45,
        width: '50%',
        backgroundColor: '#FAFAFA',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    toggleTxtInactive: {
        color: '#A1A1AA',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 13,
    },

    moreOptionsContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 2,
        left: 0,
        zIndex: 10,
    },

    moreOptionsLink: {
        height: 60,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
    },

    moreOptionsTxt: {
        fontFamily: 'PoppinsMedium',
        fontSize: 15,
        marginLeft: 30,
    },
})

export default Profile
