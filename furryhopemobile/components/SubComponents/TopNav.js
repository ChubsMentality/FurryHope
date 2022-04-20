import React, { useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import downArrow from '../../assets/Icons/topNav-downArrow.svg'
import logoutIcon from '../../assets/Icons/logout-icon.svg'
import profileIcon from '../../assets/Icons/profile-icon.png'
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CredentialsContext } from '../CredentialsContext';

export default function TopNav(props) {
    // Context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    const navigation = useNavigation();
    const [moreSection, setMoreSection] = useState(false)

    const logout = () => {
        // Clear the data in async storage
        AsyncStorage
            .removeItem('UserInfo')
            // Once in the then block, the items have already been removed
            .then(() => {
                setStoredCredentials(null)
            })
            .catch()
    }

    const toggleMoreSection = () => {
        if(moreSection === false) {
            setMoreSection(true)
        } else {
            setMoreSection(false)
        }

        setMoreSection(!moreSection)
    }

    const navigateToProfile = () => {
        navigation.navigate('My Profile')
        setMoreSection(!moreSection)
    }


    const TopNavMoreSection = () => {
        return (
            <View style={styles.moreSection}>
                <TouchableOpacity style={styles.moreContainer} onPress={() => navigateToProfile()}>
                    <Image style={styles.moreIcon} source={profileIcon}/>
                    <Text style={styles.moreText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreContainer} onPress={() => logout()}>
                    <Image style={styles.moreIcon} source={logoutIcon}/>
                    <Text style={styles.moreText}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.navContainer}>
            <View style={styles.topNavigation}>
                <View style={styles.firstColumn}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Image
                            style={styles.hamburgerMenu}
                            source={require('../../assets/TopNav/hamburger-menu.svg')} 
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerScreenTxt}>{props.ScreenName}</Text> 
                </View>
                <TouchableOpacity style={styles.secondColumn} onPress={() => toggleMoreSection()}>
                    <Text style={styles.name}>{storedCredentials.fullName}</Text>
                    <TouchableOpacity style={styles.showMoreSection} onPress={() => toggleMoreSection()}>
                        <Image style={styles.topNavDownArrow} source={downArrow}/>
                    </TouchableOpacity>

                    {moreSection && <TopNavMoreSection />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navContainer: {
        width: '100%',
        height: 'auto',
        marginTop: 5,
        zIndex: 99,
    },

    topNavigation: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    firstColumn: {
        flexDirection: 'row'
    },

    hamburgerMenu: {
        width: 20,
        height: 20,
        marginTop: 27,
        marginLeft: 25,
    },

    headerScreenTxt: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 12.8,
        marginTop: 27,
        marginLeft: 10,
    },

    secondColumn: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 27,
        marginRight: 25,
        position: 'relative',
    },

    name: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        marginRight: 5,
    },

    topNavDownArrow: {
        width: 17,
        height: 17,
    },

    moreSection: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#111',
        // borderRadius: 5,
        position: 'absolute',
        zIndex: 20,
        top: 25,
        right: 0,
    },

    moreContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        width: 140,
        borderBottomColor: '#b0b0b0',
        borderBottomWidth: 1,
    },

    moreIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
        marginLeft: 15,
    },

    moreText: {
        color: 'white',
        fontFamily: 'Poppins_400Regular',
        fontSize: 14.4,    
    }
})
