import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import seeInfoIcon from '../../assets/Icons/icon-see-info-white.svg'

const AnimalCard = (props) => {
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

                    <TouchableOpacity style={styles.seeInfoBtn} onPress={() => navigation.navigate('View Data', { animalId: props._id })}>
                        <Image style={styles.seeInfoIcon} source={seeInfoIcon} />
                        <Text style={styles.seeInfoText}>See Info</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardBody: {
        height: 390,
        width: 290,
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
    },

    overlay: {
        height: 390,
        width: 290,
        backgroundColor: '#1111114d',
        position: 'absolute',
    },

    cardContent: {
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 317,
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
        fontSize: 13,
        color: 'white',
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
        height: 35,
        width: 90,
        marginTop: 13,
        marginRight: 13,
    },

    seeInfoIcon: {
        width: 15,
        height: 15,
        marginRight: 3,
    },

    seeInfoText: {
        fontFamily: 'Poppins_300Light',
        fontSize: 12,
        color: 'white',
        marginLeft: 3,
    }
})

export default AnimalCard

/*
    <View style={styles.animalCardBody} key={props._id}>
        <View style={styles.animalImgContainer}>
            <Image style={styles.cardImg} source={props.animalImg}/>
        </View>

        <View style={styles.animalCardContent}>
            <View style={styles.cardTextContent}>
                <Text style={styles.animalName}>{props.name}</Text>
                <Text style={styles.animalBreed}>{props.breed}</Text>
            </View>
            <TouchableOpacity style={styles.seeInfoBtn} onPress={() => navigation.navigate('View Data', { animalId: props._id})}>
                <Text style={styles.seeInfoText}>See Info</Text>
                <Image style={styles.seeInfoIcon} source={seeInfoIcon}/>
            </TouchableOpacity>
        </View>
    </View>

    animalCardBody: {
        width: 260,
        height: 290,
        backgroundColor: 'white',
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    animalImgContainer: {
        width: '100%',
        height: '75%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },

    cardImg: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: '100%',
        height: '100%',
    },

    animalCardContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    cardTextContent: {
        marginTop: 13,
        marginLeft: 15,
    },

    animalName: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
    },  

    animalBreed: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
    },

    seeInfoBtn: {
        width: 85,
        height: 27,
        backgroundColor: '#111111',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 23,
        marginRight: 15,
        paddingTop: 5,
        paddingRight: 5,
    },

    seeInfoText: {
        color: 'white',
        fontFamily: 'Poppins_500Medium',
        fontSize: 10.5,
        marginRight: 5,
        marginLeft: 11.5,
    },

    seeInfoIcon: {
        width: 15,
        height: 15,
    },

*/