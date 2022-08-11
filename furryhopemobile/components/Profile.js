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
            console.log(data)
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
            <View style={styles.adoptionListContainer} key={item._id}>
                <View style={styles.adoptionListLeft}>
                    <Image source={item.animalImg} style={styles.animalImg} />

                    <View style={styles.adoptionInfo}>
                        <Text style={styles.animalName}>{item.animalName}</Text>
                        <Text style={styles.animalBreed}>{item.animalBreed}</Text>
                    </View>
                </View>

                {item.applicationStatus === 'Pending' &&
                    <Text style={styles.pending}>{item.adoptionStatus}</Text>
                }

                {item.applicationStatus === 'Accepted' &&
                    <Text style={styles.accepted}>{item.adoptionStatus}</Text>
                }

                {item.applicationStatus === 'Rejected' &&
                    <Text style={styles.rejected}>{item.adoptionStatus}</Text>
                }
            </View>
        )
    }

    const RegistrationListItem = ({ item }) => {
        return (
            <View style={styles.adoptionListContainer} key={item._id}>
                <View style={styles.adoptionListLeft}>
                    <Image source={item.animalImg} style={styles.animalImg} />

                    <View style={styles.adoptionInfo}>
                        <Text style={styles.animalName}>{item.animalName}</Text>
                        <Text style={styles.animalBreed}>{item.animalBreed}</Text>
                    </View>
                </View>

                {item.registrationStatus === 'Pending' &&
                    <Text style={styles.pending}>{item.registrationStatus}</Text>
                }

                {item.registrationStatus === 'Registered' &&
                    <Text style={styles.accepted}>{item.registrationStatus}</Text>
                }

                {item.adoptionStatus === 'Not Registered' &&
                    <Text style={styles.rejected}>{item.registrationStatus}</Text>
                }
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
                <View style={styles.profileHeaderContainer}>
                    <TopNav ScreenName='Profile' color='#111' />
                    
                    <View style={styles.profileVector}></View>
                    <View style={styles.profileVector2}></View>
                    <Text style={styles.userName}>{userData && userData.fullName}</Text>
                </View>

                <Image source={profilePicturePreview} style={styles.profilePicture} />
                <View style={styles.profileBtnsContainer}>
                    <TouchableOpacity style={styles.editProfileBtn} onPress={() => navigation.navigate('Edit Profile', { id: storedCredentials.id, successUpdateProfile: successUpdateProfile })}>
                        <Text style={styles.editProfileTxt}>EDIT PROFILE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.moreOptionsBtn} onPress={() => openMoreOptions()}>
                        <Ionicons name='ios-ellipsis-vertical' size={18} color='white' />
                    </TouchableOpacity>
                </View>
            
                <View style={styles.toggleBtnContainer}>
                    <TouchableOpacity style={toggleBtnActive === 'Adoptions' ? styles.toggleBtn : styles.toggleBtnInactive} onPress={() => setToggleBtnActive('Adoptions')}>
                        <Text style={toggleBtnActive === 'Adoptions' ? styles.toggleTxt : styles.toggleTxtInactive}>My Adoptions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={toggleBtnActive !== 'Adoptions' ? styles.toggleBtn : styles.toggleBtnInactive} onPress={() => setToggleBtnActive('Registrations')}>
                        <Text style={toggleBtnActive !== 'Adoptions' ? styles.toggleTxt : styles.toggleTxtInactive}>Pet Registrations</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.myPetsContainer}>
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

    profileHeaderContainer: {
        width: '100%',
        height: 210,
        backgroundColor: '#ffff88',
        position: 'relative',
        overflow: 'hidden',
    },

    profileVector: {
        position: 'absolute',
        bottom: -70,
        left: -70,
        height: 200,
        width: 200,
        backgroundColor: '#fff066',
        borderRadius: 100,
    },

    profileVector2: {
        position: 'absolute',
        top: -130,
        right: -130,
        height: 300,
        width: 300,
        backgroundColor: '#fff066',
        borderRadius: 150,
    },

    profilePicture: {
        height: 130,
        width: 130,
        borderRadius: 100,
        position: 'absolute',
        top: 130,
        left: 20,
        borderColor: 'white',
        borderWidth: 7,
    },

    userName: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 18,
        position: 'absolute',
        bottom: 10,
        left: 160,
    },

    profileBtnsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18,
        marginLeft: 35,
    },

    editProfileBtn: {
        alignSelf: 'flex-start',
        backgroundColor: '#111',
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
        color: 'white',
        textAlign: 'center',
        fontFamily: 'PoppinsRegular',
        fontSize: 13,
    },

    moreOptionsBtn: {
        alignSelf: 'flex-start',
        backgroundColor: '#111',
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
        marginTop: 35,
        flexDirection: 'row',
    },

    toggleBtn: {
        height: 50,
        width: '50%',
        backgroundColor: '#FFFF66',
        justifyContent: 'center',
        alignItems: 'center',
    },

    toggleTxt: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 14,
    },

    toggleBtnInactive: {
        height: 50,
        width: '50%',
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        alignItems: 'center',
    },

    toggleTxtInactive: {
        color: '#A1A1AA',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 14,
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

    myPetsContainer: {
        width: '100%',
        height: 415,
    },

    adoptionListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#b0b0b0',
        borderBottomWidth: 1,
        paddingTop: 18,
        paddingBottom: 18,
        paddingRight: 20,
        paddingLeft: 20,
        // backgroundColor: 'aqua'
    },

    adoptionListLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    animalImg: {
        height: 40,
        width: 40,
        borderRadius: 50
    },

    adoptionInfo: {
        marginLeft: 10,
    },

    animalName: {
        fontFamily: 'PoppinsMedium',
        fontSize: 14,
    },

    animalBreed: {
        fontFamily: 'PoppinsLight',
        fontSize: 12,
    },

    pending: {
        fontSize: 12,
        fontFamily: 'PoppinsMedium',
        backgroundColor: '#f4d952',
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        overflow: 'hidden',
        borderRadius: 5,
    },

    rejected: {
        fontSize: 12,
        fontFamily: 'PoppinsMedium',
        backgroundColor: '#ed5e68',
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        overflow: 'hidden',
        color: 'white',
    },

    accepted: {
        fontSize: 12,
        fontFamily: 'PoppinsMedium',
        backgroundColor: 'green',
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        borderRadius: 5,
        overflow: 'hidden',
        color: 'white',
    },
})

export default Profile
