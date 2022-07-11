import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const AnimalList = (props) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.cardBody} onPress={() => navigation.navigate('View Data', { animalId: props._id})}>
            <Image source={props.animalImg} style={styles.animalImg} />

            <View style={styles.cardRightColumn}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.breed}>{props.breed}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AnimalList

const styles = StyleSheet.create({
    cardBody: {
        height: 105,
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 5,
        marginRight: 30,
        marginBottom: 20,
        marginLeft: 30,
        shadowColor: '#111',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    animalImg: {
        height: 70, 
        width: 70, 
        borderRadius: 50,
        marginLeft: 15,
        aspectRatio: 1 / 1,
    },

    name: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 18,
        marginLeft: 10,
    },

    breed: {
        fontFamily: 'PoppinsRegular',
        fontSize: 13.5,
        marginLeft: 10,
    },
})