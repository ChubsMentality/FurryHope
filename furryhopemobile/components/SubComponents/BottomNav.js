import React from 'react'
import { Image, Text, TouchableOpacity, StyleSheet, View, } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import HomeIcon from '../../assets/BottomNav/Home.svg'
import PetCareIcon from '../../assets/BottomNav/PetCare.svg'
import ViewAnimalsIcon from '../../assets/BottomNav/ViewAnimals.svg'

const BottomTabNav = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.body}>
            <TouchableOpacity style={styles.navContainer} onPress={() => navigation.navigate('Home')}>
                <Image style={[styles.bottomNavIcon, styles.homeIcon]} source={HomeIcon}/>
                <Text style={styles.bottomNavText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.navContainer, styles.viewAnimalsContainer]} onPress={() => navigation.navigate('View Animals')}>
                <Image style={[styles.bottomNavIcon, styles.viewAnimalsIcon]} source={ViewAnimalsIcon}/>
                <Text style={styles.bottomNavText}>View Animals</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navContainer} onPress={() => navigation.navigate('Pet Care Tips')}>
                <Image style={[styles.bottomNavIcon, styles.petCareIcon]} source={PetCareIcon}/>
                <Text style={styles.bottomNavText}>Pet Care</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: 75,
        backgroundColor: '#111',
        paddingTop: 15,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',

        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 1,
    },

    navContainer: {

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
        color: 'white',
        fontFamily: 'Poppins_300Light',
        fontSize: 12,
    },
})

export default BottomTabNav
