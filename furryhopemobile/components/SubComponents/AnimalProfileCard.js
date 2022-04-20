import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

const AnimalProfileCard = ({ _id, animalImg, name, breed }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate('View Data', { animalId: _id })}>
            <ImageBackground 
                style={styles.cardBody}
                source={animalImg}
            >
                <View style={styles.overlay}></View>

                <View style={styles.cardContent}>
                    <View style={styles.animalDescription}>
                        <Text style={styles.animalName}>{name}</Text>
                        <Text style={styles.animalBreed}>{breed}</Text>
                    </View>

                    {/* <TouchableOpacity style={styles.seeInfoBtn} onPress={() => navigation.navigate('View Data', { animalId: props._id })}>
                        <Image style={styles.seeInfoIcon} source={seeInfoIcon} />
                        <Text style={styles.seeInfoText}>See Info</Text>
                    </TouchableOpacity> */}
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardBody: {
        height: 260,
        width: 170,
        marginRight: 'auto',
        marginBottom: 25,
        marginLeft: 'auto',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 5,
        marginRight: 10,
    },

    overlay: {
        height: 290,
        width: 190,
        backgroundColor: '#1111114d',
        position: 'absolute',
    },

    cardContent: {
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
    },

    animalDescription: {
        marginLeft: 13,  
    },

    animalName: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 25,
        color: 'white',
    },

    animalBreed: {
        fontFamily: 'Poppins_200ExtraLight',
        fontSize: 15,
        color: 'white',
        marginTop: -3,
    },

    seeInfoBtn: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 2,
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 80,
        marginTop: 13,
        marginRight: 8,
    },

    seeInfoIcon: {
        width: 13,
        height: 13,
        marginRight: 3,
    },

    seeInfoText: {
        fontFamily: 'Poppins_300Light',
        fontSize: 11,
        color: 'white',
        marginLeft: 3,
    }
})

export default AnimalProfileCard