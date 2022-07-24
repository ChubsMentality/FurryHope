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

                <View style={styles.profilePicVector}></View>
                <View style={styles.profilePicVector2}></View>
                <View style={styles.profilePicVector3}></View>
                <View style={styles.profilePicVector4}></View>
                <View style={styles.profilePicVector5}></View>
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
        padding: 0,
    },    

    profilePicContainer: {
        backgroundColor: '#ffff88',
        marginTop: -4,
        marginBottom: 30,
        paddingTop: 40,
        flex: 1,
        overflow: 'hidden',
    },

    profilePic: {
        marginTop: 20,
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

    profilePicVector: {
        position: 'absolute',
        top: 20,
        left: -130,
        height: 300,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 120,
        zIndex: -1
    },

    profilePicVector2: {
        position: 'absolute',
        top: 20,
        left: -110,
        height: 300,
        width: 300,
        backgroundColor: '#fff066',
        borderRadius: 120,
        zIndex: -2
    },

    profilePicVector3: {
        position: 'absolute',
        top: 20,
        left: -90,
        height: 300,
        width: 300,
        backgroundColor: '#FFED4F',
        borderRadius: 120,
        zIndex: -3
    },

    profilePicVector4: {
        position: 'absolute',
        top: 20,
        left: -70,
        height: 300,
        width: 300,
        // backgroundColor: '#ffeb33',
        borderRadius: 120,
        zIndex: -3
    },

    profilePicVector5: {
        position: 'absolute',
        top: 20,
        left: -50,
        height: 300,
        width: 300,
        // backgroundColor: '#ffe81a',
        borderRadius: 120,
        zIndex: -3
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
        borderTopColor: '#e6e6e6',
        marginTop: 75,
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
        fontSize: 16,
        fontFamily: 'PoppinsLight',
        marginLeft: 10,
    },
})

export default CustomDrawer