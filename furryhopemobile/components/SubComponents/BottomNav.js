import React, { useState, useEffect, useContext } from 'react'
import { Image, Text, TouchableOpacity, StyleSheet, View, } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CredentialsContext } from '../CredentialsContext'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'

const BottomTabNav = () => {
    const navigation = useNavigation()
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const [profilePic, setProfilePic] = useState('')
    const [activeTab, setActiveTab] = useState('')

    const toggleBrowse = () => {
        navigation.navigate('Browse')
        // setActiveTab((prevState) => prevState = 'Browse')
    }

    const togglePetCare = () => {
        navigation.navigate('Pet Care')
        // setActiveTab((prevState) => prevState = 'Pet Care Tips')
    }

    const toggleProfile = () => {
        navigation.navigate('My Profile')
        // setActiveTab((prevState) => prevState = 'My Profile')
    }
    
    const getUser = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
        setProfilePic(data.profilePicture)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <View style={styles.body}>
            <TouchableOpacity style={styles.navContainer} onPress={() => toggleBrowse()}>
                {activeTab === 'Browse' ?
                    <View>
                        <Ionicons name='apps-sharp' style={{marginTop: -10, marginLeft: 'auto', marginRight: 'auto' }} size={24} color='#111' />
                        <Text style={styles.bottomNavBold}>Browse</Text>
                    </View>
                    :
                    <>
                        <Ionicons name='apps-outline' style={{marginTop: -10, marginLeft: 'auto', marginRight: 'auto' }} size={24} color='#111' />
                        <Text style={styles.bottomNavText}>Browse</Text>
                    </>
                }
            </TouchableOpacity>

            <TouchableOpacity style={[styles.navContainer, styles.viewAnimalsContainer]} onPress={() => togglePetCare()}>
                {activeTab === 'Pet Care Tips' ?
                    <View>
                        <Ionicons name='md-information-circle' style={{marginTop: -12, marginLeft: 'auto', marginRight: 'auto' }} size={28} color='#111' />
                        <Text style={[styles.bottomNavTextBold, styles.petCareTxt]}>Pet Care</Text>
                    </View>
                    :
                    <View>
                        <Ionicons name='md-information-circle-outline' style={{marginTop: -12, marginLeft: 'auto', marginRight: 'auto' }} size={28} color='#111' />
                        <Text style={[styles.bottomNavText, styles.petCareTxt]}>Pet Care</Text>
                    </View>
                }
            </TouchableOpacity>

            <TouchableOpacity style={styles.navContainer} onPress={() => toggleProfile()}>

                
                {/* <Image source={profilePic} style={{ height: 25, width: 25, borderRadius: 50, marginTop: -10, marginLeft: 'auto', marginRight: 'auto' }} /> */}
                <Ionicons name='md-person-outline' style={{ marginTop: -12, marginLeft: 'auto', marginRight: 'auto', }} size={25} color='#111' />
                <Text style={[styles.bottomNavText, styles.profileTxt]}>Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: 75,
        backgroundColor: 'white',
        // borderTopColor: '#b0b0b0',
        // borderTopWidth: .1,
        // borderTopLeftRadius: 25,
        // borderTopRightRadius: 25,
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 1,
        shadowColor: '#111',
        shadowOffset: {
            height: -1.5,
            width: 0,
        },
        shadowRadius: 15,
        shadowOpacity: .08,
    },

    viewAnimalsContainer: {
    },

    bottomNavIcon: {
        width: 26,
        height: 26,
        marginBottom: 2,
    },

    homeIcon: {
        marginLeft: 3.3,
    },

    petCareIcon: {
        marginLeft: 11.5,
    },

    viewAnimalsIcon: {
        marginLeft: 23,
    },

    bottomNavText: {
        fontFamily: 'PoppinsLight',
        fontSize: 12,
        marginTop: 3,
    },

    bottomNavTextBold: {
        fontFamily: 'PoppinsMedium',
        fontSize: 12,
        marginTop: 3,
    },

    petCareTxt: {
        marginTop: 2,
    },

    profileTxt: {
        marginTop: 3,
    },
})

export default BottomTabNav
