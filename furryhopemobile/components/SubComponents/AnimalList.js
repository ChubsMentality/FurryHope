import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const AnimalList = (props) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.cardBody} onPress={() => navigation.navigate('View Data', { animalId: props._id})}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                <Image source={props.animalImg} style={styles.animalImg} />

                <View style={styles.cardRightColumn}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.breed}>{props.breed}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate('View Data', { animalId: props._id })}>
                <Text style={styles.viewTxt}>VIEW</Text>
            </TouchableOpacity>

        </TouchableOpacity>
    )
}

export default AnimalList

const styles = StyleSheet.create({
    cardBody: {
        height: 105,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 20,
        shadowColor: '#111',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        fontSize: 16.5,
        marginLeft: 10,
    },

    breed: {
        fontFamily: 'PoppinsRegular',
        fontSize: 13,
        marginLeft: 10,
    },

    viewBtn: {
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingRight: 20,
        paddingBottom: 5,
        paddingLeft: 20,
        marginRight: 15,
        borderRadius: 5,
    },

    viewTxt: {
        color: 'white',
        fontFamily: 'PoppinsMedium',
        fontSize: 14,
    },
})