import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { quickSort } from './SubComponents/QuickSort'
import TopNav from './SubComponents/TopNav'
import BottomNav from './SubComponents/BottomNav'
import AnimalCard from './SubComponents/AnimalCard'
import EmptyList from '../assets/Images/empty-adoption-list.png'
import axios from 'axios'

const ViewAnimals = () => {
    const [animals, setAnimals] = useState([])
    const [modalId, setModalId] = useState('')
    const [notAdopted, setNotAdopted] = useState([])

    const [refreshing, setRefreshing] = useState(false)

    const filterNotAdopted = (arr) => {
        return arr.adoptionStatus === 'Not Adopted'
    }

    const getAnimals = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/animals');
 
            // Quicksort implementation
            const sortedData = quickSort(data, 0, data.length - 1)
            setAnimals(sortedData)
            console.log(sortedData)

            setNotAdopted(sortedData.filter(filterNotAdopted))
        } catch (error) {
            console.log(error)
        }  
    }

    useEffect(() => {
        getAnimals()
    }, [])

    // Design - Sort by JS sort()
    const [activeSort, setActiveSort] = useState('None')
    const clearActive = activeSort === 'None'
    const sortedNameActive = activeSort === 'Name'
    const sortedBreedActive = activeSort === 'Breed'
    const sortedColorActive = activeSort === 'Color'
    const sortedTypeActive = activeSort === 'Type'
    console.log(activeSort)
    // The array changes without any separate state because the JS sort() alters the original array.

    const clearSort = () => {
        getAnimals()
        setActiveSort('None')
    }

    const sortByName = () => {
        let sortNameArr = notAdopted.sort((a, b) => {
            return a.name.localeCompare(b.name)
        })

        setActiveSort('Name')
    }

    const sortByBreed = () => {
        let sortBreedArr = notAdopted.sort((a,b) => {
            return a.breed.localeCompare(b.breed)
        })

        setActiveSort('Breed')
    }

    const sortByColor = () => {
        let sortColorArr = notAdopted.sort((a,b) => {
            return a.color.localeCompare(b.color)
        })

        setActiveSort('Color')
    }

    const sortByAnimalType = () => {
        let sortAnimalTypeArr = notAdopted.sort((a,b) => {
            return a.type.localeCompare(b.type)
        })

        setActiveSort('Type')
    }

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

                <View style={styles.sortByContainer}>
                    <Text style={styles.sortByLabel}>Sort By</Text>

                    <View style={styles.sortByBtns}>
                        <TouchableOpacity style={clearActive ? styles.activeSortBtn : styles.inactiveSortBtn} onPress={() => clearSort()}>
                            <Text style={clearActive ? styles.activeSortTxt : styles.inactiveSortTxt}>None</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={sortedNameActive ? styles.activeSortBtn : styles.inactiveSortBtn} onPress={() => sortByName()}>
                            <Text style={sortedNameActive ? styles.activeSortTxt : styles.inactiveSortTxt}>Name</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={sortedBreedActive ? styles.activeSortBtn : styles.inactiveSortBtn} onPress={() => sortByBreed()}>
                            <Text style={sortedBreedActive ? styles.activeSortTxt : styles.inactiveSortTxt}>Breed</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={sortedColorActive ? styles.activeSortBtn : styles.inactiveSortBtn} onPress={() => sortByColor()}>
                            <Text style={sortedColorActive ? styles.activeSortTxt : styles.inactiveSortTxt}>Color</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={sortedTypeActive ? styles.activeSortBtn : styles.inactiveSortBtn} onPress={() => sortByAnimalType()}>
                            <Text style={sortedTypeActive ? styles.activeSortTxt : styles.inactiveSortTxt}>Type</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
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

    sortByContainer: {
        display: 'flex',
        marginTop: 20,
        marginRight: 60,
        marginBottom: 20,
        marginLeft: 60,
    },

    sortByLabel: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
        marginBottom: 10,
    },

    sortByBtns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    activeSortBtn: {
        backgroundColor: '#111',
        borderRadius: 50,
        paddingTop: 3,
        paddingRight: 10,
        paddingBottom: 3,
        paddingLeft: 10,
        marginRight: 5,
    },

    activeSortTxt: {
        color: 'white',
        fontSize: 13.5,
    },

    inactiveSortBtn: {
        backgroundColor: 'transparent',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        paddingTop: 3,
        paddingRight: 10,
        paddingBottom: 3,
        paddingLeft: 10,
        marginRight: 5,
    },

    inactiveSortTxt: {
        fontSize: 13.5,
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
// import { Picker } from '@react-native-picker/picker'
// import TopNav from './SubComponents/TopNav'
// import BottomNav from './SubComponents/BottomNav'
// import AnimalCard from './SubComponents/AnimalCard'
// import EmptyList from '../assets/Images/empty-adoption-list.png'
// import axios from 'axios'

// const ViewAnimals = () => {
//     const [modalId, setModalId] = useState('')
//     const [refreshing, setRefreshing] = useState(false)

//     const filterNotAdopted = (arr) => {
//         return arr.adoptionStatus === 'Not Adopted'
//     }

//     const getAnimals = async () => {
//         try {
//             const { data } = await axios.get('http://localhost:5000/api/animals');
 
//             // Quicksort implementation
//             const sortedData = quickSort(data, 0, data.length - 1)
//             console.log(sortedData)
//             setActivePickerArr(sortedData.filter(filterNotAdopted))
//         } catch (error) {
//             console.log(error)
//         }  
//     }

//     useEffect(() => {
//         getAnimals()
//     }, [])

//     // Design - Sort by using the react-native/picker package
//     const [activePickerArr, setActivePickerArr] = useState()
//     const [pickerValue, setPickerValue] = useState('None')

//     if(pickerValue === 'Name') {
//         activePickerArr.sort((a, b) => {
//             return a.name.localeCompare(b.name)
//         })
//     } else if(pickerValue === 'Breed') {
//         activePickerArr.sort((a, b) => {
//             return a.breed.localeCompare(b.breed)
//         })
//     } else if(pickerValue === 'Color') {
//         activePickerArr.sort((a, b) => {
//             return a.color.localeCompare(b.color)
//         })
//     } else if(pickerValue === 'Type') {
//         activePickerArr.sort((a, b) => {
//             return a.type.localeCompare(b.type)
//         })
//     } else if(pickerValue === 'Default') {
//         getAnimals()
//         setPickerValue('None')
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
                
//                 <View style={styles.sortPickerContainer}>
//                     <Text style={styles.sortPickerLabel}>Sort By</Text>
//                     <Picker
//                         itemStyle={styles.sortPickerItem}
//                         style={styles.sortPicker}
//                         selectedValue={pickerValue}
//                         onValueChange={(itemValue, itemIndex) => 
//                             setPickerValue(itemValue)
//                         }
//                     >
//                         <Picker.Item label="Default" value="Default" />
//                         <Picker.Item label="Name" value="Name" />
//                         <Picker.Item label="Breed" value="Breed" />
//                         <Picker.Item label="Color" value="Color" />
//                         <Picker.Item label="Type" value="Type" />
//                     </Picker>
//                 </View>

//                 <FlatList 
//                     data={activePickerArr}
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

//     sortPickerContainer: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         marginTop: 15,
//         marginRight: 60,
//         marginBottom: 25,
//         marginLeft: 60,
//     },

//     sortPickerLabel: {
//         fontFamily: 'Poppins_500Medium',
//         fontSize: 14,
//         marginRight: 5,
//     },

//     sortPicker: {
//         padding: 3,
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

