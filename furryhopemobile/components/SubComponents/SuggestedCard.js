import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import seeInfoIcon from '../../assets/Icons/icon-see-info-white.svg'

const SuggestedCard = (props) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate('View Data', { animalId: props._id })}>
            <ImageBackground 
                style={styles.cardBody}
                source={props.animalImg}
            >
                <View style={styles.overlay}></View>

                <View style={styles.cardContent}>
                    <View style={styles.animalDescription}>
                        <Text style={styles.animalName}>{props.name}</Text>
                        <Text style={styles.animalBreed}>{props.breed}</Text>
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
        height: 230,
        width: 150,
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
        marginTop: 160,
    },

    animalDescription: {
        marginLeft: 13,  
    },

    animalName: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 24,
        color: 'white',
    },

    animalBreed: {
        fontFamily: 'PoppinsExtraLight',
        fontSize: 16,
        color: 'white',
        marginTop: -3,
    },
})

export default SuggestedCard