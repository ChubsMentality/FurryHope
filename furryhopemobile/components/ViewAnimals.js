import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, FlatList, Image, ImageBackground, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { quickSort } from './SubComponents/QuickSort'
import { CredentialsContext } from './CredentialsContext'
import SuggestedCard from './SubComponents/SuggestedCard'
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

    const [animalPreferences, setAnimalPreferences] = useState()
    const [breedPreference, setBreedPreference] = useState()
    const [colorPreferences, setColorPreferences] = useState()
    const [genderPreference, setGenderPreference] = useState()
    const [sizePreference, setSizePreference] = useState()
    const [notAdopted, setNotAdopted] = useState([])

    const [list, setList] = useState([])
    const [breedList, setBreedList] = useState([])
    const [colorList, setColorList] = useState([])
    const [genderList, setGenderList] = useState([])
    const [sizeList, setSizeList] = useState([])

    const filterPreferences = async () => {
        let user = {}

        try {
            const { data } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
            user = data
        } catch (error) {
            console.log(error)
        }

        if(user && user.animalPreference === 'Dog') {
            console.log('get dogs')
            try {
                const { data:userData } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
                const { data:animalData } = await axios.get('http://localhost:5000/api/animals/getDogs')
                setAnimalPreferences(userData.animalPreference)
                setBreedPreference(userData.breedPreferences)
                setColorPreferences(userData.colorPreferences)
                setGenderPreference(userData.genderPreference)
                setSizePreference(userData.sizePreference)
                setNotAdopted(animalData)
            } catch (error) {
                console.log(error)
            }
        } else if(user && user.animalPreference === 'Cat') {
            console.log('get cats')
            try {
                const { data:userData } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
                const { data:animalData } = await axios.get('http://localhost:5000/api/animals/getCats')
                setAnimalPreferences(userData.animalPreference)
                setBreedPreference(userData.breedPreferences)
                setColorPreferences(userData.colorPreferences)
                setGenderPreference(userData.genderPreference)
                setSizePreference(userData.sizePreference)
                setNotAdopted(animalData)
            } catch (error) {
                console.log(error)
            }
        } else if(user && user.animalPreference === 'Both') {
            console.log('get both')
            try {
                const { data:userData } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
                const { data:animalData } = await axios.get('http://localhost:5000/api/animals/getBoth')
                setAnimalPreferences(userData.animalPreference)
                setBreedPreference(userData.breedPreferences)
                setColorPreferences(userData.colorPreferences)
                setGenderPreference(userData.genderPreference)
                setSizePreference(userData.sizePreference)
                setNotAdopted(animalData)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const renderPreferences = () => {
        // console.log(breedPreference && breedPreference)
        // console.log(colorPreference && colorPreference)

        if(breedList.length >= 1) {
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
                    setBreedList(...breedList, filteredBreed)
                    console.log(filteredBreed)
                } 
            })

            colorPreferences && colorPreferences.forEach((pref) => {
                if(uniqueColors.includes(pref)) {
                    let filtered = notAdopted.filter(animal => animal.color === pref)
                    setColorList(...colorList, filtered)
                }
            })

            let filteredGender = notAdopted.filter(animal => animal.gender === genderPreference)
            setGenderList(...genderList, filteredGender)

            let filteredSize = notAdopted.filter(animal => animal.size === sizePreference)
            setSizeList(...sizeList, filteredSize)
        }
    }

    const getUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
            let split = data.fullName.split(' ')
            let firstName = split[0]
            setFName(firstName)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        filterPreferences()
        getUser()
    }, [])

    // useEffect(() => {
    //     let split = storedCredentials.fullName.split(' ')
    //     let firstName = split[0]
    //     setFName(firstName)
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
                    <TopNav ScreenName='Animals' color='#111' />

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
                        <Text style={{ fontSize: 25, fontFamily: 'PoppinsBold', marginLeft: 30, marginRight: 30 ,marginBottom: 15, }}>Animals suggested for you</Text>

                        <Text style={styles.suggestedLabel}>Based on breed</Text>
                        <ScrollView horizontal={true}>
                            <View style={styles.suggestedContainer}>
                                {breedList && breedList.map((item) => (
                                    <SuggestedCard
                                        key={item._id}
                                        _id={item._id}
                                        animalImg={item.animalImg}
                                        name={item.name}
                                        breed={item.breed} 
                                    />
                                ))}

                                {breedList && breedList.length === 0 &&
                                    <>
                                        <Text style={{ textAlign: 'center' }}>No animals</Text>
                                    </>

                                }
                                </View>
                        </ScrollView>

                        <Text style={styles.suggestedLabel}>Based on color</Text>
                        <ScrollView horizontal={true}>
                            <View style={styles.suggestedContainer}>
                                {colorList && colorList.map((item) => (
                                    <SuggestedCard
                                        key={item._id}
                                        _id={item._id}
                                        animalImg={item.animalImg}
                                        name={item.name}
                                        breed={item.breed}
                                    />
                                ))}

                                {colorList && colorList.length === 0 &&
                                    <>
                                        <Text style={{ textAlign: 'center' }}>No animals</Text>
                                    </>

                                }
                            </View>
                        </ScrollView>

                        <Text style={styles.suggestedLabel}>Based on gender</Text>
                        <ScrollView horizontal={true}>
                            <View style={styles.suggestedContainer}>
                                {genderList && genderList.map((item) => (
                                    <SuggestedCard
                                        key={item._id}
                                        _id={item._id}
                                        animalImg={item.animalImg}
                                        name={item.name}
                                        breed={item.breed}
                                    />
                                ))}

                                {genderList && genderList.length === 0 &&
                                    <>
                                        <Text style={{ textAlign: 'center' }}>No animals</Text>
                                    </>

                                }
                            </View>
                        </ScrollView>

                        <Text style={styles.suggestedLabel}>Based on size</Text>
                        <ScrollView horizontal={true}>
                            <View style={styles.suggestedContainer}>
                                {sizeList && sizeList.map((item) => (
                                    <SuggestedCard
                                        key={item._id}
                                        _id={item._id}
                                        animalImg={item.animalImg}
                                        name={item.name}
                                        breed={item.breed}
                                    />
                                ))}

                                {sizeList && sizeList.length === 0 &&
                                    <>
                                        <Text style={{ textAlign: 'center' }}>No animals</Text>
                                    </>

                                }
                            </View>
                        </ScrollView>
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

    suggestedLabel: {
        marginTop: 25,
        marginLeft: 30,
        marginBottom: 10,
        fontFamily: 'PoppinsMedium',
        fontSize: 12.5,
        backgroundColor: '#e6e6e6',
        borderRadius: 5,
        alignSelf: 'flex-start',
        padding: 5,
    },

    suggestedContainer: {
        flexDirection: 'row',
        // marginRight: 30,
        alignItems: 'center',
        gap: 12,
        marginLeft: 30,
        marginBottom: 12,
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
        marginTop: -10,
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