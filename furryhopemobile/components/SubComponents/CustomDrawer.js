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
        marginRight: 'auto',
        marginLeft: 'auto',
        height: 95,
        width: 95,
        borderRadius: 50,
        zIndex: 50,
    },

    profileFullName: {
        fontFamily: 'PoppinsBold',
        fontSize: 15,
        marginTop: 13,
        marginBottom: 25,
        zIndex: 50,
        textAlign: 'center'
    },

    profilePicVector: {
        position: 'absolute',
        top: -30,
        left: -30,
        height: 110,
        width: 110,
        backgroundColor: '#fff066',
        // backgroundColor: '#FFED4F',
        // backgroundColor: '#ffeb33',
        // backgroundColor: '#ffe81a',
        borderRadius: 100,
        zIndex: -1
    },

    profilePicVector2: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        height: 50,
        width: 50,
        backgroundColor: '#fff066',
        // backgroundColor: '#ffeb33',
        // backgroundColor: '#ffe81a',
        borderRadius: 100,
        zIndex: 1
    },

    profilePicVector3: {
        position: 'absolute',
        bottom: -90,
        left: 5,
        height: 140,
        width: 140,
        backgroundColor: '#fff066',
        // backgroundColor: '#ffeb33',
        // backgroundColor: '#ffe81a',
        borderRadius: 100,
        zIndex: 1
    },

    profilePicVector4: {
        position: 'absolute',
        top: -90,
        right: -30,
        height: 140,
        width: 140,
        backgroundColor: '#fff066',
        // backgroundColor: '#ffeb33',
        // backgroundColor: '#ffe81a',
        borderRadius: 100,
        zIndex: 1
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
        marginTop: 95,
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