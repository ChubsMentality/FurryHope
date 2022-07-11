import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import React, { useState, useEffect, useContext } from 'react'
import { CredentialsContext } from '../CredentialsContext'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import logoutIcon from '../../assets/Drawer/logout-icon.png'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const CustomDrawer = (props) => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    const [profilePicture, setProfilePicture] = useState('')
    const navigation = useNavigation()

    const getUser = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
        setProfilePicture(data.profilePicture)
    }

    const logout = async () => {
        AsyncStorage.removeItem('UserInfo').then(() => setStoredCredentials(null)).catch()
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <DrawerContentScrollView style={styles.drawerContainer} {...props}>
            <View style={styles.profilePicContainer}>
                <Image style={styles.profilePic} source={profilePicture} />
                <Text style={styles.profileFullName}>{storedCredentials.fullName}</Text>
            </View>
            <DrawerItemList {...props} />

            <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}>
                    <Image style={styles.logoutIcon} source={logoutIcon} />
                    <Text style={styles.logoutTxt}>Logout</Text>
                </TouchableOpacity>
            </View>

        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    drawerContainer: {
        position: 'relative',
    },    

    profilePicContainer: {
        marginTop: 40,
        marginRight: 10,
        marginBottom: 30,
        borderBottomColor: '#B0B0B0',
        borderBottomWidth: .1,
        flex: 1,
    },

    profilePic: {
        height: 95,
        width: 95,
        borderRadius: 50,
        marginLeft: 16,
    },

    profileFullName: {
        fontFamily: 'PoppinsBold',
        fontSize: 15,
        marginTop: 13,
        marginBottom: 25,
        marginLeft: 16,
    },

    profileBtn: {
        flexDirection: 'row',
        marginTop: 3,
        marginLeft: 16,
    },

    profileBtnTxt: {
        fontFamily: 'PoppinsLight',
        fontSize: 14,
        marginTop: 2,
        marginLeft: 4,
    },

    drawerIcon: {
        height: 24,
        width: 24,
    },

    logoutContainer: {
        borderTopWidth: .5,
        borderTopColor: '#b0b0b0',
        marginTop: 140,
    },

    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 0,
        marginTop: 20,
        marginLeft: 20,
    },

    logoutIcon: {
        height: 19,
        width: 19,
    },

    logoutTxt: {
        fontSize: 18,
        fontFamily: 'PoppinsLight',
        marginLeft: 10,
    },
})

export default CustomDrawer