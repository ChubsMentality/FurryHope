import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, FlatList, Image, ImageBackground, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { quickSort } from './SubComponents/QuickSort'
import { CredentialsContext } from './CredentialsContext'
import TopNav from './SubComponents/TopNav'
import BottomNav from './SubComponents/BottomNav'
import EmptyList from '../assets/Images/empty-adoption-list.png'
import catIllustration from '../assets/Images/catIllustration.png'
import dogIllustration from '../assets/Images/dogIllustration.png'
import axios from 'axios'

const ViewAnimals = ({ navigation }) => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    // console.log(storedCredentials)
    const [fName, setFName] = useState('')
    // const [currentTab, setCurrentTab] = useState('Browse')
    const [browseActive, setBrowseActive] = useState(true)
    // const [suggestedActive, setSuggestedActive] = useState(false)
    
    const [breedOptions, setBreedOptions] = useState()
    const [colorOptions, setColorOptions] = useState()
    const [animalTypeOptions, setAnimalTypeOptions] = useState()
    const [genderOptions, setGenderOptions] = useState()

    const [animalPreferences, setAnimalPreferences] = useState()
    const [breedPreference, setBreedPreference] = useState()
    const [colorPreference, setColorPreference] = useState()
    const [animals, setAnimals] = useState([])
    const [notAdopted, setNotAdopted] = useState([])

    const [list, setList] = useState([])

    const filterNotAdopted = (arr) => {
        return arr.adoptionStatus === 'Not Adopted'
    }

    const filterPreferences = async () => {
        try {
            const { data:userData } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
            const { data:animalData } = await axios.get('http://localhost:5000/api/animals')
            setAnimalPreferences(userData.animalPreference)
            setBreedPreference(userData.breedPreferences)
            setColorPreference(userData.colorPreferences)
            console.log(userData)
            setAnimals(animalData)
            setNotAdopted(animalData.filter(filterNotAdopted))

            let breeds = []
            let colors = []
            let animalType = []
            let animalGender = []
            
            animalData.forEach((item) => {
                breeds.push(item.breed)
                colors.push(item.color)
                animalType.push(item.type)
                animalGender.push(item.gender)
                // result = breeds.concat(colors, animalType, animalGender)    
            })

            // Removes duplicate values - using Set and the spread operator.
            // Each value only occurs once.
            setBreedOptions([...new Set(breeds)])
            setColorOptions([...new Set(colors)])
            setAnimalTypeOptions([...new Set(animalType)])
            setGenderOptions([...new Set(animalGender)])
        } catch (error) {
            console.log(error)
        }
    }

    const renderPreferences = () => {
        // console.log(breedPreference && breedPreference)
        // console.log(colorPreference && colorPreference)

        if(list.length >= 1) {
            console.log('List has already been set')
            return
        } else {
            let breeds = []
            let colors = []
            let animalGender = []
    
            notAdopted.forEach((item) => {
                breeds.push(item.breed)
                colors.push(item.color)
                animalGender.push(item.gender)
            })
    
            let uniqueBreeds = [...new Set(breeds)]
            let uniqueColors = [...new Set(colors)]
            let uniqueAnimalGender = [...new Set(animalGender)]
    
            breedPreference && breedPreference.forEach((pref) => {
                if(uniqueBreeds.includes(pref)) {
                    let filteredBreed = notAdopted.filter(animal => animal.breed === pref)
                    setList(...list, filteredBreed)
                    console.log(filteredBreed)
                } 
            })
    
            colorPreference && colorPreference.forEach((pref) => {
                if(uniqueColors.includes(pref)) {
                    let filteredColor = notAdopted.filter(animal => animal.color === pref)
                    setList(...list, filteredColor)
                    console.log(filteredColor)
                }
            })
        }


        // animalPreferences.forEach(preference => {
        //     if (uniqueBreeds.includes(preference)) {
        //         // console.log(preference)
        //         let filteredBreed = notAdopted.filter(animal => animal.breed === preference)
        //         setList(...list, filteredBreed)
        //         console.log(filteredBreed)
        //     } 

        // })

        // animalPreferences.forEach(preference => {
        //     if (uniqueColors.includes(preference)) {
        //         // console.log(preference)
        //         let filteredColor = notAdopted.filter(animal => animal.color === preference)
        //         setList(...list, filteredColor)
        //     } 
        // })
    }

    useEffect(() => {
        filterPreferences()
    }, [])

    useEffect(() => {
        let split = storedCredentials.fullName.split(' ')
        let firstName = split[0]
        setFName(firstName)
    }, [])

    // useEffect(() => {
    //     renderPreferences()
    // }, [])

    const toggleBrowse = () => {
        setBrowseActive(true)
    }

    const toggleSuggested = () => {
        renderPreferences()
        setBrowseActive(false)
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
            <ScrollView style={styles.flexContainer}>
                <View style={styles.topNavContainer}>
                    <TopNav ScreenName='View Animals' color='#111' />

                    <View style={styles.toggleTabContainer}>
                        <TouchableOpacity style={browseActive ? styles.toggleTabActive : styles.toggleTab} onPress={() => toggleBrowse()}>
                            <Text style={browseActive ? styles.toggleTabTxtActive : styles.toggleTabTxt}>Browse</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={browseActive ? styles.toggleTab : styles.toggleTabActive} onPress={() => toggleSuggested()}>
                            <Text style={browseActive ? styles.toggleTabTxt : styles.toggleTabTxtActive}>For You</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.top_margin}></View>

                {/* <FlatList 
                    data={notAdopted}
                    renderItem={renderData}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={emptyList}
                    //ListFooterComponent={renderLoadMore}
                /> */}

                {browseActive ?
                    <View>
                        <Text style={styles.heading}>Hello {fName}</Text>
                        <Text style={styles.subHeading}>Make a new friend today</Text>

                        <Text style={styles.categoryHeading}>Choose among our different animals</Text>
                        <TouchableOpacity style={styles.animalCategoryContainer} onPress={() => navigation.navigate('Dogs')}>
                            <Image source={dogIllustration} style={styles.dogIllustration} />
                            <Text style={styles.categoryTxt}>DOGS</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.animalCategoryContainer, styles.catCategory]} onPress={() => navigation.navigate('Cats')}>
                            <Image source={catIllustration} style={styles.catIllustration} />
                            <Text style={styles.categoryTxt}>CATS</Text>
                        </TouchableOpacity>
                    </View>
                    :   
                    <View>
                        {list && list.map((item) => (
                            <Text key={item._id}>{item._id}</Text>
                        ))}
                        {list && console.log(list)}
                    </View>
                }
                
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

    topNavContainer: {
        shadowColor: '#111',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },

    toggleTabContainer: {
        width: '85%',
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 40,
        marginRight: 30,
        marginBottom: 1,
        marginLeft: 30,
        borderBottomColor: '#111',
    },

    toggleTab: {
        width: '50%',
        paddingBottom: 7,
    },

    toggleTabActive: {
        width: '50%',
        borderBottomColor: '#111',
        borderBottomWidth: 2,
        paddingBottom: 7,
    },

    toggleTabTxt: {
        textAlign: 'center',
    },

    toggleTabTxtActive: {
        fontFamily: 'PoppinsMedium',
        textAlign: 'center',
    },

    top_margin: {
        marginTop: 55,
    },

    heading: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 40,
        marginLeft: 30,
    },

    subHeading: {
        fontFamily: 'PoppinsLight',
        fontSize: 21,
        marginLeft: 30,
    },

    categoryHeading: {
        fontFamily: 'PoppinsLight',
        fontSize: 16,
        marginTop: 40,
        marginBottom: 10,
        marginLeft: 30,
    },

    animalCategoryContainer: {
        borderRadius: 5,
        marginRight: 'auto',
        marginLeft: 'auto',
        height: 161,
        width: 352,
        overflow: 'hidden',
        backgroundColor: '#111',
        position: 'relative',
        zIndex: 1,
    },

    catCategory: {
        marginTop: 10,
    },

    dogIllustration: {
        height: 160,
        width: 160,
        position: 'absolute',
        top: 18,
        left: 16,
        zIndex: 2
    },

    catIllustration: {
        height: 150,
        width: 150,
        position: 'absolute',
        top: 12,
        left: 20,
        zIndex: 2
    },

    categoryTxt: {
        color: 'white',
        fontFamily: 'PoppinsBold',
        fontSize: 40,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 200,
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























// import React, { useState, useEffect, useCallback } from 'react'
// import { ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { quickSort } from './SubComponents/QuickSort'
// import TopNav from './SubComponents/TopNav'
// import BottomNav from './SubComponents/BottomNav'
// import AnimalCard from './SubComponents/AnimalCard'
// import EmptyList from '../assets/Images/empty-adoption-list.png'
// import axios from 'axios'

// const ViewAnimals = () => {
//     const [animals, setAnimals] = useState([])
//     const [modalId, setModalId] = useState('')
//     const [notAdopted, setNotAdopted] = useState([])

//     const [refreshing, setRefreshing] = useState(false)

//     const filterNotAdopted = (arr) => {
//         return arr.adoptionStatus === 'Not Adopted'
//     }

//     const getAnimals = async () => {
//         try {
//             const { data } = await axios.get('http://localhost:5000/api/animals');
 
//             // Quicksort implementation
//             const sortedData = quickSort(data, 0, data.length - 1)
//             setAnimals(sortedData)
//             console.log(sortedData)

//             setNotAdopted(sortedData.filter(filterNotAdopted))
//         } catch (error) {
//             console.log(error)
//         }  
//     }

//     useEffect(() => {
//         getAnimals()
//     }, [])

//     // Design - Sort by JS sort()
//     const [activeSort, setActiveSort] = useState('None')
//     const clearActive = activeSort === 'None'
//     const sortedNameActive = activeSort === 'Name'
//     const sortedBreedActive = activeSort === 'Breed'
//     const sortedColorActive = activeSort === 'Color'
//     const sortedTypeActive = activeSort === 'Type'
//     console.log(activeSort)
//     // The array changes without any separate state because the JS sort() alters the original array.

//     const clearSort = () => {
//         getAnimals()
//         setActiveSort('None')
//     }

//     const sortByName = () => {
//         let sortNameArr = notAdopted.sort((a, b) => {
//             return a.name.localeCompare(b.name)
//         })

//         setActiveSort('Name')
//     }

//     const sortByBreed = () => {
//         let sortBreedArr = notAdopted.sort((a,b) => {
//             return a.breed.localeCompare(b.breed)
//         })

//         setActiveSort('Breed')
//     }

//     const sortByColor = () => {
//         let sortColorArr = notAdopted.sort((a,b) => {
//             return a.color.localeCompare(b.color)
//         })

//         setActiveSort('Color')
//     }

//     const sortByAnimalType = () => {
//         let sortAnimalTypeArr = notAdopted.sort((a,b) => {
//             return a.type.localeCompare(b.type)
//         })

//         setActiveSort('Type')
//     }

//     // const wait = (timeout) => {
//     //     return new Promise(resolve => setTimeout(resolve, timeout))
//     // }

//     const refresh = useCallback(() => {
//         setRefreshing(true)

//         wait(2000).then(() => {
//             getAnimals()
//             setRefreshing(false)
//         })
//     }, [refreshing])

//     const renderData = ({item}) => {
//         return (
//             <AnimalCard
//                 key={item._id}
//                 _id={item._id}
//                 animalImg={item.animalImg}
//                 name={item.name}
//                 breed={item.breed}
//             />
//         )
//     }

//     const emptyList = () => {
//         return (
//             <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//             }}>
//                 <Image
//                     style={{
//                         width: 300,
//                         height: 300,
//                         marginLeft: 'auto',
//                         marginRight: 'auto',
//                     }}
//                     source={EmptyList}
//                 />
//                 <Text
//                     style={{
//                         textAlign: 'center',
//                         fontSize: 18,
//                         fontFamily: 'Poppins_300Light',
//                     }}
//                 >
//                     Oh, it seems like there are no animals{'\n'}
//                     for adoption. All our animals have{'\n'}
//                     been adopted.
//                 </Text>
//             </div>
//         )
//     }

//     const renderLoadMore = () => {
//         return (
//             <ActivityIndicator size='large' color='#111' style={styles.loadMoreIndicator}/>
//         )
//     }

//     return (
//         <SafeAreaView style={styles.body}>
//             <ScrollView
//                 style={styles.flexContainer}
//                 // refreshControl={
//                 //     <RefreshControl
//                 //         refreshing={refreshing}
//                 //         onRefresh={refresh}
//                 //     />
//                 // }
//             >
//                 <TopNav ScreenName='View Animals' id={modalId} />
//                 <View style={styles.top_margin}></View>

//                 <View style={styles.sortByContainer}>
//                     <Text style={styles.sortByLabel}>Sort By</Text>

//                     <View style={styles.sortByBtns}>
//                         <TouchableOpacity style={clearActive ? styles.activeSortBtn : styles.inactiveSortBtn} onPress={() => clearSort()}>
//                             <Text style={clearActive ? styles.activeSortTxt : styles.inactiveSortTxt}>None</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity style={sortedNameActive ? styles.activeSortBtn : styles.inactiveSortBtn} onPress={() => sortByName()}>
//                             <Text style={sortedNameActive ? styles.activeSortTxt : styles.inactiveSortTxt}>Name</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity style={sortedBreedActive ? styles.activeSortBtn : styles.inactiveSortBtn} onPress={() => sortByBreed()}>
//                             <Text style={sortedBreedActive ? styles.activeSortTxt : styles.inactiveSortTxt}>Breed</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity style={sortedColorActive ? styles.activeSortBtn : styles.inactiveSortBtn} onPress={() => sortByColor()}>
//                             <Text style={sortedColorActive ? styles.activeSortTxt : styles.inactiveSortTxt}>Color</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity style={sortedTypeActive ? styles.activeSortBtn : styles.inactiveSortBtn} onPress={() => sortByAnimalType()}>
//                             <Text style={sortedTypeActive ? styles.activeSortTxt : styles.inactiveSortTxt}>Type</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
                
//                 <FlatList 
//                     data={notAdopted}
//                     renderItem={renderData}
//                     keyExtractor={(item, index) => index.toString()}
//                     ListEmptyComponent={emptyList}
//                     //ListFooterComponent={renderLoadMore}
//                 />
                
//                 <View style={styles.bot_margin}></View>
//             </ScrollView>
//             <BottomNav />
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     body: {
//         flex: 1,
//         backgroundColor: '#ffffff',
//         position: 'relative',
//     },
    
//     top_margin: {
//         marginTop: 55,
//     },

//     sortByContainer: {
//         display: 'flex',
//         marginTop: 20,
//         marginRight: 60,
//         marginBottom: 20,
//         marginLeft: 60,
//     },

//     sortByLabel: {
//         fontFamily: 'Poppins_500Medium',
//         fontSize: 16,
//         marginBottom: 10,
//     },

//     sortByBtns: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'flex-start'
//     },

//     activeSortBtn: {
//         backgroundColor: '#111',
//         borderRadius: 50,
//         paddingTop: 3,
//         paddingRight: 10,
//         paddingBottom: 3,
//         paddingLeft: 10,
//         marginRight: 5,
//     },

//     activeSortTxt: {
//         color: 'white',
//         fontSize: 13.5,
//     },

//     inactiveSortBtn: {
//         backgroundColor: 'transparent',
//         borderRadius: 50,
//         borderWidth: 1,
//         borderColor: 'black',
//         paddingTop: 3,
//         paddingRight: 10,
//         paddingBottom: 3,
//         paddingLeft: 10,
//         marginRight: 5,
//     },

//     inactiveSortTxt: {
//         fontSize: 13.5,
//     },

//     bot_margin: {
//         marginBottom: 100,
//     },

//     loadMoreIndicator: {
//         marginTop: 15,
//         marginBottom: 20,
//     },
// })

// export default ViewAnimals


