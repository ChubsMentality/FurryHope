import React, { useState, useEffect } from 'react'
import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import AnimalCard from './SubComponents/AnimalCard'
import AnimalList from './SubComponents/AnimalList'

const ListOfDogs = ({ navigation }) => {

    const window = useWindowDimensions()
    const [sortBy, setSortBy] = useState('')
    const [sortByModal, setSortByModal] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const [sortBtnsActive, setSortBtnsActive] = useState(false)
    const [dogs, setDogs] = useState()
    const [currentList, setCurrentList] = useState()
    const [searchQuery, setSearchQuery] = useState('')

    const [searchResult, setSearchResult] = useState()
    // const [sortedByName, setSortedByName] = useState()
    // const [sortedByBreed, setSortedByBreed] = useState()
    // const [sortedByColor, setSortedByColor] = useState()
    // const [sortedBySize, setSortedBySize] = useState()

    const filterSearch = (arr) => {
        return arr.breed === searchQuery
    }

    const pivot = (nums, left, right, attributeToSort) => {
        let p = right
        let j = left
        let i = left - 1
    
        while(j <= p) {
            if(nums[j][attributeToSort] < nums[p][attributeToSort]) {
                i++;
                [nums[i], nums[j]] = [nums[j], nums[i]];
                j++;
            } else {
                j++
            }
        }
    
        i++;
        [nums[i], nums[p]] = [nums[p], nums[i]];
    
        return i
    }

    const sortArray = (nums, left = 0, right = nums.length - 1, attributeToSort) => {
        if(left < right) { 
            let pIdx = pivot(nums, left, right, attributeToSort); // Finds the pivot index
        
            sortArray(nums, left, pIdx - 1, attributeToSort); // Checks the values less than the index
            sortArray(nums, pIdx + 1, right, attributeToSort); // Checks the values greater than the index
        }
    
        return nums
    }

    const fetchDogs = async () => {
        const { data } = await axios.get('http://localhost:5000/api/animals/getDogs')
        setDogs(data)
        setCurrentList(data)
    }
  
    const submitSearch = () => {
        console.log(searchQuery)
        setSearchResult(currentList.filter(filterSearch))
        console.log(searchResult)
        setCurrentList(searchResult)
    }

    const toggleSortBtns = () => {
        setSortBtnsActive(!sortBtnsActive)
    }

    const toggleSortByModal = () => {
        setOverlay(!overlay)
        setSortByModal(!sortByModal)
    }

    const sortHandler = () => {
        setOverlay(!overlay)
        setSortByModal(!sortByModal)
    }

    useEffect(() => {
        fetchDogs()
    }, [])

    const sortByNameHandler = () => {
        setSortBy('name')
        setCurrentList(prevState => sortArray(prevState, 0, prevState.length - 1, 'name'))
        console.log('sorted by name')
    }

    const sortByBreedHandler = () => {
        setSortBy('breed')
        setCurrentList(prevState => sortArray(prevState, 0, prevState.length - 1, 'breed'))
        console.log('sorted by breed')
    }

    const sortByColorHandler = () => {
        setSortBy('color')
        setCurrentList(prevState => sortArray(prevState, 0, prevState.length - 1, 'color'))
    }

    const sortBySizeHandler = () => {
        setSortBy('size')
        setCurrentList(prevState => sortArray(prevState, 0, prevState.length - 1, 'size'))
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 150, paddingBottom: 300 }}>
            <View style={styles.screenHeadingContainer}>
                <View style={styles.navigationContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='arrow-back-sharp' size={26} color='#111' />
                    </TouchableOpacity>
                    <Text style={styles.screenName}>Dogs</Text>
                </View>
    
                <View style={styles.optionsContainer}>
                    <View style={styles.searchBarContainer}>
                        <TextInput
                            style={styles.searchBarInput}
                            placeholder='Search for a specific breed'
                            placeholderTextColor='#808080'
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={submitSearch}
                        />

                        <TouchableOpacity style={styles.searchBarIcon} onPress={() => submitSearch()}>
                            <Ionicons name='md-search' size={20} color='gray' />
                        </TouchableOpacity>  
                    </View>

                    {sortBtnsActive ? 
                        <TouchableOpacity style={styles.optionsBtnDark} onPress={() => toggleSortBtns()}>
                            <Ionicons name='ios-options-outline' color='#fff' size={26} />
                        </TouchableOpacity>
                    :
                        <TouchableOpacity style={styles.optionsBtn} onPress={() => toggleSortBtns()}>
                            <Ionicons name='ios-options-outline' color='#111' size={26} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
            
            {sortBtnsActive ?
                <>
                    <Text style={styles.sortByHeader}>Sort By</Text>
                    <View style={styles.sortBtnsContainer}>
                        <TouchableOpacity style={sortBy === 'name' ? styles.sortByBtnActive : styles.sortByBtn} onPress={() => sortByNameHandler()}>
                            <Text style={sortBy === 'name' ? styles.sortByTxtActive : styles.sortByTxt}>Name</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={sortBy === 'breed' ? styles.sortByBtnActive : styles.sortByBtn} onPress={() => sortByBreedHandler()}>
                            <Text style={sortBy === 'breed' ? styles.sortByTxtActive : styles.sortByTxt}>Breed</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={sortBy === 'color' ? styles.sortByBtnActive : styles.sortByBtn} onPress={() => sortByColorHandler()}>
                            <Text style={sortBy === 'color' ? styles.sortByTxtActive : styles.sortByTxt}>Color</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={sortBy === 'size' ? styles.sortByBtnActive : styles.sortByBtn} onPress={() => sortBySizeHandler()}>
                            <Text style={sortBy === 'size' ? styles.sortByTxtActive : styles.sortByTxt}>Size</Text>
                        </TouchableOpacity>
                    </View>
                </>
            :
                <></>
            }

            <View style={styles.dogsContainer}>
                {currentList && currentList.filter((animals) => {
                    if(searchQuery === '') {
                        return animals
                    } else if(animals.breed.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return animals
                    }
                }).map((item) => (
                    <AnimalCard 
                        key={item._id}
                        _id={item._id}
                        animalImg={item.animalImg}
                        name={item.name}
                        breed={item.breed}
                    />
                ))}
            </View>
            
            <View style={{ marginTop: 150 }}></View>
            {/* <TouchableOpacity style={styles.scrollUpCta}>
                <Ionicons name='arrow-up' size={26} color='white' />
            </TouchableOpacity> */}
        </SafeAreaView>
    )
}

export default ListOfDogs

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
        alignItems: 'center',
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

    optionsBtnDark: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderColor: '#111',
        borderWidth: .01,
        borderRadius: 5,
        height: 40,
        backgroundColor: '#111',
    },

    sortByHeader: {
        fontFamily: 'PoppinsSemiBold',
        marginTop: 20,
        marginLeft: 30,
        fontSize: 16,
    },

    sortBtnsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginRight: 30,
        marginBottom: 10,
        marginLeft: 30,
    },

    sortByBtn: {
        alignSelf: 'flex-start',
        borderColor: '#808080',
        borderWidth: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 3,
        paddingRight: 15,
        paddingBottom: 3,
        paddingLeft: 15,
        marginRight: 10,
    },

    sortByTxt: {
        fontFamily: 'PoppinsLight',
        color: '#808080',
        fontSize: 12,
    },

    sortByBtnActive: {
        alignSelf: 'flex-start',
        borderColor: '#111',
        borderWidth: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 3,
        paddingRight: 15,
        paddingBottom: 3,
        paddingLeft: 15,
        backgroundColor: '#111',
        marginRight: 10,
    },
    
    sortByTxtActive: {
        color: 'white',
        fontFamily: 'PoppinsMedium',
        fontSize: 12,
    },

    dogsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 11,
        marginTop: 30,
        marginRight: 30,
        marginLeft: 30,
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