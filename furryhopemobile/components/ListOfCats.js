import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AnimalList from './SubComponents/AnimalList'

const ListOfCats = ({ navigation }) => {
    const [notAdopted, setNotAdopted] = useState()

    const filterNotAdopted = (arr) => {
        return arr.adoptionStatus === 'Not Adopted'
    }

    const fetchCats = async () => {
        const { data } = await axios.get('http://localhost:5000/api/animals/getCats')
        setNotAdopted(data.filter(filterNotAdopted))
    }

    const catList = ({ item }) => {
        return (
            // <TouchableOpacity style={styles.cardBody} onPress={() => navigation.navigate('View Data', { animalId: item._id })}>
            //     <Image source={item.animalImg} style={styles.animalImg} />

            //     <View style={styles.cardRightColumn}>
            //         <Text style={styles.name}>{item.name}</Text>
            //         <Text style={styles.breed}>{item.breed}</Text>
            //     </View>
            // </TouchableOpacity>
            <AnimalList 
                _id={item._id}
                animalImg={item.animalImg}
                name={item.name}
                breed={item.breed}
            />
        )
    }

    useEffect(() => {
        fetchCats()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 140, }}>
            <View style={styles.screenHeadingContainer}>
                <View style={styles.navigationContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='arrow-back-sharp' size={26} color='#111' />
                    </TouchableOpacity>
                    <Text style={styles.screenName}>Cats</Text>
                </View>
    
                <View style={styles.optionsContainer}>
                    <View style={styles.searchBarContainer}>
                        <TextInput
                            style={styles.searchBarInput}
                            placeholder='Search for a specific breed'
                            placeholderTextColor='#808080'
                            // onSubmitEditing={}
                        />

                        <TouchableOpacity style={styles.searchBarIcon}>
                            <Ionicons name='md-search' size={20} color='gray' />
                        </TouchableOpacity>  
                    </View>

                    <TouchableOpacity style={styles.optionsBtn}>
                        <Ionicons name='ios-options-outline' color='#111' size={26} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={notAdopted}
                renderItem={catList} 
                keyExtractor={(item, index) => index.toString()}
            />

            {/* <TouchableOpacity style={styles.scrollUpCta}>
                <Ionicons name='arrow-up' size={26} color='white' />
            </TouchableOpacity> */}
        </SafeAreaView>
    )
}

export default ListOfCats

const styles = StyleSheet.create({
    screenHeadingContainer: {
        height: 130,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        backgroundColor: 'white',
        shadowColor: '#111',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },

    navigationContainer: {
        flexDirection: 'row',
        marginTop: 25,
        paddingLeft: 30,
    },

    screenName: {
        fontFamily: 'PoppinsMedium',
        fontSize: 16,
        marginLeft: 10,  
    },

    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginRight: 30,
        marginLeft: 30,
    },

    searchBarContainer: {
        position: 'relative',
    },

    searchBarIcon: {
        position: 'absolute',
        top: 8,
        left: 9,
    },

    searchBarInput: {
        height: 40,
        width: 300,
        borderWidth: .01,
        borderRadius: 5,
        borderColor: '#111',
        fontFamily: 'PoppinsRegular',
        fontSize: 12,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 40,
    },

    optionsBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderColor: '#111',
        borderWidth: .01,
        borderRadius: 5,
        height: 40,
    },

    scrollUpCta: {
        position: 'absolute',
        bottom: 35,
        right: 15,
        zIndex: 5,
        width: 45,
        height: 45,
        backgroundColor: '#111',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    /* Animal List Card */
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