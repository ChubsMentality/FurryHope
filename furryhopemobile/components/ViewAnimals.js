import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { quickSort } from './SubComponents/QuickSort'
import TopNav from './SubComponents/TopNav'
import BottomNav from './SubComponents/BottomNav'
import SuggestedCard from './SubComponents/SuggestedCard'
import AnimalCard from './SubComponents/AnimalCard'
import EmptyList from '../assets/Images/empty-adoption-list.png'
import axios from 'axios'

const ViewAnimals = () => {
    const [animals, setAnimals] = useState([])
    const [modalId, setModalId] = useState('')
    const [notAdopted, setNotAdopted] = useState([])
    const [pending, setPending] = useState([])
    const [active, setActive] = useState('not adopted')

    const [refreshing, setRefreshing] = useState(false)

    const isNotAdoptedActive = active === 'not adopted'

    const filterNotAdopted = (arr) => {
        return arr.adoptionStatus === 'Not Adopted'
    }

    const filterPending = (arr) => {
        return arr.adoptionStatus === 'Pending'
    }

    const togglePending = () => {
        setActive('pending')
    }

    const toggleNotAdopted = () => {
        setActive('not adopted')
    }

    const getAnimals = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/animals');
 
            // Quicksort implementation
            const sortedData = quickSort(data, 0, data.length - 1)
            setAnimals(sortedData)
            console.log(sortedData)

            setNotAdopted(sortedData.filter(filterNotAdopted))
            setPending(animals.filter(filterPending))
        } catch (error) {
            console.log(error)
        }  
    }

    useEffect(() => {
        getAnimals()
    }, [])

    // const wait = (timeout) => {
    //     return new Promise(resolve => setTimeout(resolve, timeout))
    // }

    const refresh = useCallback(() => {
        setRefreshing(true)

        wait(2000).then(() => {
            getAnimals()
            setRefreshing(false)
        })
    }, [refreshing])

    const renderData = ({item}) => {
        return (
            <AnimalCard
                key={item._id}
                _id={item._id}
                animalImg={item.animalImg}
                name={item.name}
                breed={item.breed}
            />
        )
    }

    const emptyList = () => {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    style={{
                        width: 300,
                        height: 300,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                    source={EmptyList}
                />
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontFamily: 'Poppins_300Light',
                    }}
                >
                    Oh, it seems like there are no animals{'\n'}
                    for adoption. All our animals have{'\n'}
                    been adopted.
                </Text>
            </div>
        )
    }

    const renderLoadMore = () => {
        return (
            <ActivityIndicator size='large' color='#111' style={styles.loadMoreIndicator}/>
        )
    }

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView
                style={styles.flexContainer}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={refreshing}
                //         onRefresh={refresh}
                //     />
                // }
            >
                <TopNav ScreenName='View Animals' id={modalId} />
                <View style={styles.top_margin}></View>
                
                <FlatList 
                    data={notAdopted}
                    renderItem={renderData}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={emptyList}
                    //ListFooterComponent={renderLoadMore}
                />
                
                <View style={styles.bot_margin}></View>
            </ScrollView>
            <BottomNav />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        position: 'relative',
    },
    
    top_margin: {
        marginTop: 55,
    },

    toggleAnimals: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 45,
    },

    activeBtn: {
        alignSelf: 'flex-start',
        paddingTop: 7,
        paddingRight: 15,
        paddingBottom: 7,
        paddingLeft: 15,  
        backgroundColor: '#111',
        borderRadius: 25,
    },

    activeToggleText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        textAlign: 'center',
        color: 'white'
    },

    notActiveBtn: {
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 25,
        borderColor: '#111',
        paddingTop: 7,
        paddingRight: 15,
        paddingBottom: 7,
        paddingLeft: 15,
    },

    inactiveToggleText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        textAlign: 'center',
    },

    bot_margin: {
        marginBottom: 100,
    },

    loadMoreIndicator: {
        marginTop: 15,
        marginBottom: 20,
    },
})

export default ViewAnimals

// Design 1
/*
                {notAdopted && 
                    notAdopted.map((animal) => (
                        <AnimalCard
                            key={animal._id}
                            _id={animal._id}
                            animalImg={animal.animalImg}
                            name={animal.name}
                            breed={animal.breed}
                        />
                    ))
                }
*/

// Design 2
/*
                <FlatList 
                    data={notAdopted}
                    renderItem={renderData}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={emptyList}
                    //ListFooterComponent={renderLoadMore}
                />
*/

// Design 3
/*
            Design 3

                <View style={styles.toggleAnimals}>
                    {isNotAdoptedActive ?
                        <TouchableOpacity style={styles.activeBtn} onPress={() => toggleNotAdopted()}>
                            <Text style={styles.activeToggleText}>Not Adopted</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.notActiveBtn} onPress={() => toggleNotAdopted()}>
                            <Text style={styles.inactiveToggleText}>Not Adopted</Text>
                        </TouchableOpacity>
                    }

                    {isNotAdoptedActive ?
                        <TouchableOpacity style={styles.notActiveBtn} onPress={() => togglePending()}>
                            <Text style={styles.inactiveToggleText}>Pending</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.activeBtn} onPress={() => togglePending()}>
                            <Text style={styles.activeToggleText}>Pending</Text>
                        </TouchableOpacity>
                    }
                </View>
                
                <FlatList 
                    data={
                        isNotAdoptedActive ?
                            notAdopted
                        :
                            pending
                    }
                    renderItem={renderData}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={emptyList}
                    //ListFooterComponent={renderLoadMore}
                />
*/