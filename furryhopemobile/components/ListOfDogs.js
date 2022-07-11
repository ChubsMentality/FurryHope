import React, { useState, useEffect } from 'react'
import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import AnimalList from './SubComponents/AnimalList'

const ListOfDogs = ({ navigation }) => {

    const window = useWindowDimensions()
    const [sortBy, setSortBy] = useState('')
    const [sortByModal, setSortByModal] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const [sortedList, setSortedList] = useState([])
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

    const dogList = ({ item }) => {
        return (
            <AnimalList 
                _id={item._id}
                animalImg={item.animalImg}
                name={item.name}
                breed={item.breed}
            />
        )
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

    // useEffect(() => {
    //     if(sortBy === 'name') {
    //         setCurrentList(prevState => sortArray(prevState, 0, prevState.length - 1, 'name'))
    //         console.log(currentList)
    //     } else if(sortBy === 'breed') {
    //         setCurrentList(prevState => sortArray(prevState, 0, prevState.length - 1, 'breed'))
    //         console.log(currentList)
    //     } else if(sortBy === 'color') {
    //         setCurrentList(prevState => sortArray(prevState, 0, prevState.length - 1, 'color'))
    //         console.log(currentList)
    //     } else if(sortBy === 'size') {
    //         setCurrentList(prevState => sortArray(prevState, 0, prevState.length - 1, 'size'))
    //         console.log(currentList)
    //     } else if(sortBy === '') {
    //         setCurrentList(dogs)
    //     }
    // }, [sortBy, currentList])

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
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 150, }}>
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

                    <TouchableOpacity style={styles.optionsBtn} onPress={() => toggleSortByModal()}>
                        <Ionicons name='ios-options-outline' color='#111' size={26} />
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <TouchableOpacity onPress={() => sortByNameHandler()}>
                    <Text>Name</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => sortByBreedHandler()}>
                    <Text>Breed</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => sortByColorHandler()}>
                    <Text>Color</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => sortBySizeHandler()}>
                    <Text>Size</Text>
                </TouchableOpacity>
            </View>

            {currentList && currentList.filter((animals) => {
                if(searchQuery === '') {
                    return animals
                } else if(animals.breed.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return animals
                }
            }).map((item) => (
                <AnimalList 
                    key={item._id}
                    _id={item._id}
                    animalImg={item.animalImg}
                    name={item.name}
                    breed={item.breed}
                />
            ))}

            {/* <TouchableOpacity style={styles.scrollUpCta}>
                <Ionicons name='arrow-up' size={26} color='white' />
            </TouchableOpacity> */}

            {sortByModal &&
                <View style={styles.sortByModal}>
                    <View style={styles.sortByHeaderContainer}>
                        <Text style={styles.sortByHeader}>Sort By</Text>

                        <TouchableOpacity onPress={() => toggleSortByModal()}>
                            <Ionicons name='md-close' size={27} color='#111' />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.sortOptionsContainer}>
                        <TouchableOpacity style={styles.sortBtnContainer} onPress={() => setSortBy('name')}>
                            <TouchableOpacity style={styles.sortByBtn}>
                                <Text style={sortBy === 'name' ? styles.sortByTxtActive : styles.sortByTxt}>Name</Text>
                            </TouchableOpacity>
                            
                            <View style={styles.checkedBox}>
                                {sortBy === 'name' ?
                                    <Ionicons name='checkmark-outline' size={20} color='green' />
                                    :
                                    <View></View>
                                }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sortBtnContainer} onPress={() => setSortBy('breed')}>
                            <TouchableOpacity style={styles.sortByBtn}>
                                <Text style={sortBy === 'breed' ? styles.sortByTxtActive : styles.sortByTxt}>Breed</Text>
                            </TouchableOpacity>
                            
                            <View style={styles.checkedBox}>
                                {sortBy === 'breed' ? 
                                    <Ionicons name='checkmark-outline' size={20} color='green' />
                                    :
                                    <View></View>
                                }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sortBtnContainer} onPress={() => setSortBy('color')}>
                            <TouchableOpacity style={styles.sortByBtn}>
                                <Text style={sortBy === 'color' ? styles.sortByTxtActive : styles.sortByTxt}>Color</Text>
                            </TouchableOpacity>
                            
                            <View style={styles.checkedBox}>
                                {sortBy === 'color' ?
                                    <Ionicons name='checkmark-outline' size={20} color='green' />
                                    :
                                    <View></View>
                                }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sortBtnContainer} onPress={() => setSortBy('size')}>
                            <TouchableOpacity style={styles.sortByBtn}>
                                <Text style={sortBy === 'size' ? styles.sortByTxtActive : styles.sortByTxt}>Size</Text>
                            </TouchableOpacity>
                            
                            <View style={styles.checkedBox}>
                                {sortBy === 'size' ?
                                    <Ionicons name='checkmark-outline' size={20} color='green' />
                                    :
                                    <View></View>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.sortByModalEnd}>
                        <TouchableOpacity style={styles.resetBtn} onPress={() => setSortBy('')}>
                            <Text style={[styles.modalEndTxt, styles.resetTxt]}>Reset</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.doneBtn} onPress={() => sortHandler()}>
                            <Text style={[styles.modalEndTxt, styles.doneTxt]}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            {overlay &&
                <Pressable onPress={() => toggleSortByModal()} style={{
                    width: window.width, 
                    height: window.height, 
                    backgroundColor: '#111',
                    opacity: .5,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 11,
                }}></Pressable>
            }
            
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

    sortByModal: {
        zIndex: 15,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
    },

    sortByHeaderContainer: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#b0b0b0',
        paddingTop: 25,
        paddingRight: 20,
        paddingBottom: 25,
        paddingLeft: 20,
    },

    sortByHeader: {
        fontFamily: 'PoppinsMedium',
        fontSize: 17,
    },

    sortBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        height: 65,
        borderBottomColor: 'gray',
    },

    sortByTxt: {
        fontFamily: 'PoppinsLight',
        fontSize: 15,
    },

    sortByTxtActive: {
        fontFamily: 'PoppinsMedium',
        fontSize: 15,
    },

    checkedBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#808080',
    },

    sortByModalEnd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 30,
        paddingRight: 20,
        paddingBottom: 30,
        paddingLeft: 20,
    },

    resetBtn: {
        height: 45,
        width: '47%',
        backgroundColor: '#e6e6e6',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    doneBtn: {
        height: 45,
        width: '47%',
        backgroundColor: '#111',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    doneTxt: {
        color: 'white',
    },

    modalEndTxt: {
        fontFamily: 'PoppinsMedium',
        fontSize: 17,
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