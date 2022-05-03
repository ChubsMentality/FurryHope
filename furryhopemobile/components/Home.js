import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { CredentialsContext } from './CredentialsContext';
import 'react-native-gesture-handler'
import TopNav from './SubComponents/TopNav'
import BottomNav from './SubComponents/BottomNav'
import SuggestedCard from './SubComponents/SuggestedCard'
import logoBlack from '../assets/Logo/logo-black.png'
import logoWhite from '../assets/Logo/logo-white.svg'
import adoptNow from '../assets/Home/adoptNowSvg.svg'
import giveHope from '../assets/Home/giveHopeSvg.svg'
import personIcon from '../assets/Icons/icon-person.svg'
import pets from '../assets/Home/pets-png.png'
import pawLeft from '../assets/Home/leftpaw.svg'
import pawRight from '../assets/Home/rightpaw.svg'
import dogIcon from '../assets/Home/dogIcon.svg'
import waveVector from '../assets/Home/wave-vector.svg'
import ViewAnimalsIcon from '../assets/BottomNav/ViewAnimals.svg'
import registerIcon from '../assets/Home/register.svg'
import feedbackIcon from '../assets/Home/feedback.svg'
import reportIcon from '../assets/Home/report.svg'
import axios from 'axios'

const Home = ({ navigation }) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const [animalPreferences, setAnimalPreferences] = useState([])
    const [animals, setAnimals] = useState()
    const [notAdopted, setNotAdopted] = useState()

    const [list, setList] = useState([])
    const [breedOptions, setBreedOptions] = useState()
    const [colorOptions, setColorOptions] = useState()
    const [animalTypeOptions, setAnimalTypeOptions] = useState()
    const [genderOptions, setGenderOptions] = useState()

    const filterNotAdopted = (arr) => {
        return arr.adoptionStatus === 'Not Adopted'
    }

    const filterPreferences = async () => {
        try {
            const { data:userData } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
            const { data:animalData } = await axios.get('http://localhost:5000/api/animals')

            setAnimalPreferences(userData.animalPreferences)
            setAnimals(animalData)
            console.log(animalData)
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
        console.log(animalPreferences)

        let breeds = []
        let colors = []
        let animalType = []
        let animalGender = []

        notAdopted.forEach((item) => {
            breeds.push(item.breed)
            colors.push(item.color)
            animalType.push(item.type)
            animalGender.push(item.gender)
        })

        let uniqueBreeds = [...new Set(breeds)]
        let uniqueColors = [...new Set(colors)]
        let uniqueAnimalType = [...new Set(animalType)]
        let uniqueAnimalGender = [...new Set(animalGender)]

        animalPreferences.forEach(preference => {
            if (uniqueBreeds.includes(preference)) {
                // console.log(preference)
                let filteredBreed = notAdopted.filter(animal => animal.breed === preference)
                setList(...list, filteredBreed)
                console.log(filteredBreed)
            } 

        })

        animalPreferences.forEach(preference => {
            if (uniqueColors.includes(preference)) {
                // console.log(preference)
                let filteredColor = notAdopted.filter(animal => animal.color === preference)
                setList(...list, filteredColor)
            } 
        })
    }

    useEffect(() => {
        filterPreferences()
    }, [])

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView style={styles.scroll}>
                <TopNav ScreenName='Home' />

                <Image style={styles.leftPaw} source={pawLeft} />
                <Image style={styles.rightPaw} source={pawRight} />

                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <Image style={styles.headerLogo} source={logoBlack} />
                        <Text style={styles.headerText}>FURRYHOPE</Text>
                    </View>

                    <Text style={styles.subHeader}>Adopt, Don't Shop.</Text>
                </View>

                <Image style={styles.petsSvg} source={pets} />
                <Text style={styles.welcomeUser}>Welcome, {storedCredentials.fullName}</Text>

                <Text style={styles.linksHeader}>What you can do</Text>
                <ScrollView horizontal={true} style={styles.linksContainer}>
                    <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Pet Care Tips')}>
                        <Image style={styles.linkIcon} source={dogIcon} />
                        <Text style={styles.linkText}>Pet Care</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('View Animals')}>
                        <Image style={styles.linkIcon} source={ViewAnimalsIcon} />
                        <Text style={styles.linkText}>View Animals</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register an Animal')}>
                        <Image style={styles.linkIcon} source={registerIcon} />
                        <Text style={styles.linkText}>Register your pet</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Report an Animal')}>
                        <Image style={styles.linkIcon} source={reportIcon} />
                        <Text style={styles.linkText}>Report a Stray Animal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Give a Feedback')}>
                        <Image style={styles.linkIcon} source={feedbackIcon} />
                        <Text style={styles.linkText}>Leave a Feedback</Text>
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView horizontal={true} style={styles.staticImg}>
                    <ImageBackground style={styles.adoptNow} source={adoptNow}>
                        <View style={styles.overlay}></View>
                        <Image style={styles.logoWhite} source={logoWhite} />
                        <Text style={styles.imageBgHeadingText}>ADOPT</Text>
                        <Text style={styles.imageBgSpanText}>NOW</Text>
                    </ImageBackground>

                    <ImageBackground style={styles.giveHope} source={giveHope}>
                        <View style={styles.overlay}></View>
                        <Image style={styles.logoWhite} source={logoWhite} />
                        <Text style={styles.imageBgHeadingText}>GIVE</Text>
                        <Text style={styles.imageBgSpanText}>HOPE</Text>
                    </ImageBackground>
                </ScrollView>

                <View style={styles.secondSection}>
                    <Text style={styles.secondSmallText}>WHAT ARE YOU WAITING FOR?</Text>
                    <Text style={styles.secondHeading}>YOUR NEW PET IS {'\n'} WAITING FOR YOU</Text>
                    <Text style={styles.secondSubText}>Choose from the different animals {'\n'} that are available in our care.</Text>
                    <Image style={styles.wavesSvg} source={waveVector} />
                </View>

                <View style={styles.suggestedAnimalsContainer}>
                    <Text style={styles.watermark_my}>MY</Text>
                    <Text style={styles.watermark_preference}>PREFERENCE</Text>
                    
                    <Text style={styles.suggestedAnimalsHeading}>SUGGESTED ANIMALS</Text>
                    <Text style={styles.suggestedAnimalsSubText}>
                        The following are animals suggested {'\n'}
                        based on 
                        your preferences.
                    </Text>

                    {/* 
                        Opens the modal to change the user's animal preference.
                        Add it whenever it's needed. 

                        or whatever it is to let the user pick his / her preference.
                    */}
                    <TouchableOpacity style={styles.suggestedCta} onPress={() => navigation.navigate('User Preferences')}>
                        <Image style={styles.suggestedCtaIcon} source={personIcon}/>
                        <Text style={styles.suggestedCtaText}>MY PREFERENCES</Text>
                    </TouchableOpacity>

                    <View style={styles.viewSuggestedContainer}>
                        <Text style={styles.suggestedAnimalsText}>SUGGESTED ANIMALS</Text>
                        <TouchableOpacity onPress={() => renderPreferences()}>
                            <Text style={styles.loadAnimalsText}>Load Animals...</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal={true} style={styles.suggestedResultContainer}>
                        {list && list.map((item) => (
                            <SuggestedCard
                                key={item._id}
                                _id={item._id}
                                animalImg={item.animalImg}
                                name={item.name}
                                breed={item.breed}
                            />
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

            <BottomNav />
        </SafeAreaView>
    );
} 

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
    },

    scroll: {
        position: 'relative',
        zIndex: 1,
    },

    leftPaw: {
        position: 'absolute',
        zIndex: -1,
        top: 90,
        left: 0,
        height: 150,
        width: 150,
        display: 'none',
    },

    rightPaw: {
        position: 'absolute',
        top: 500,
        right: 0,
        height: 300,
        width: 300,
        zIndex: -1,
        display: 'none',
    },


    headerContainer: {
        marginTop: 70,
        marginRight: 'auto',
        marginBottom: 90,
        marginLeft: 'auto',
        textAlign: 'center',
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 8,
    },

    headerLogo: {
        width: 75,
        height: 75,
    },
      
    headerText: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 43.2,
        marginLeft: -5,
    },

    subHeader: {
        fontFamily: 'Poppins_300Light',
        fontSize: 20.8,
        marginTop: -17,
    },

    petsSvg: {
        marginRight: 'auto',
        marginBottom: 50,
        marginLeft: 'auto',
        width: 340,
        height: 175,
    },

    welcomeUser: {
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
        textAlign: 'center',
        marginBottom: 120,
    },

    linksHeader: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 15,
        marginBottom: 10,
        marginLeft: 25,
    },

    linksContainer: {
        //marginRight: 25,
        marginBottom: 50,
        marginLeft: 25,
    },

    link: {
        alignSelf: 'flex-start',
        backgroundColor: '#111',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        marginBottom: 10,
        paddingTop: 10,
        paddingRight: 16,
        paddingBottom: 10,
        paddingLeft: 16,
        shadowColor: '#111111',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: .3,
        shadowRadius: 4,
    },

    linkIcon: {
        height: 20,
        width: 20,
        marginRight: 3,
    },

    linkText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: 'white',
        marginLeft: 3,
    },

    staticImg: {
        //marginRight: 25,
        marginBottom: 100,
        marginLeft: 25,
    },

    adoptNow: {
        borderRadius: 5,
        width: 267,
        height: 424,
        position: 'relative',
        zIndex: 0,
        overflow: 'hidden',
        marginRight: 15,
        marginBottom: 10,
    },

    giveHope: {
        borderRadius: 5,
        width: 267,
        height: 424,
        position: 'relative',
        zIndex: 0,
        overflow: 'hidden',
    },

    overlay: {
        backgroundColor: '#1111114d',
        width: '100%',
        height: '100%',
        zIndex: 1,
    },

    logoWhite: {
        width: 35,
        height: 35,
        position: 'absolute',
        top: 10,
        right: 5,
        zIndex: 2,
    },

    imageBgHeadingText: {
        color: 'white',
        fontFamily: 'Poppins_700Bold',
        fontSize: 50,
        textAlign: 'center',
        zIndex: 2,
        marginTop: -125,
    },

    imageBgSpanText: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 50,
        textAlign: 'center',
        color: '#FFFF66',
        zIndex: 2,
        marginTop: -30,
    },

    secondSection: {
        backgroundColor: '#FFFF66',
        height: 400,
        width: '100%',
        position: 'relative',
        textAlign: 'center',
    },

    secondSmallText: {
        fontFamily: 'Poppins_300Light',
        fontSize: 13.6,
        marginTop: 90,
        zIndex: 2,
    },

    secondHeading: {
        fontFamily: 'Poppins_900Black',
        fontSize: 35,
        zIndex: 2,
    },

    secondSubText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 19.2,
        marginTop: 15,
        zIndex: 2,
    },

    wavesSvg: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 104,
        width: 413,
    },

    suggestedAnimalsContainer: {
        backgroundColor: '#111111',
        width: '100%',
        height: 850,
        position: 'relative',
        zIndex: 1,
    },

    watermark_my: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 192,
        zIndex: -1,
        position: 'absolute',
        color: '#ffffff03',
        letterSpacing: 3,
        top: -35,
        left: 5,
    },

    watermark_preference: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 192,
        zIndex: -1,
        position: 'absolute',
        color: '#ffffff03',
        top: 110,
        left: 5,
    },

    suggestedAnimalsHeading: {
        color: 'white',
        fontFamily: 'Poppins_900Black',
        fontSize: 29.6,
        textAlign: 'center',
        marginTop: 80,
    },

    suggestedAnimalsSubText: {
        color: 'white',
        fontFamily: 'Poppins_200ExtraLight',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 30,
        marginTop: 6,
    },

    suggestedCta: {
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 155,
        height: 40,
        backgroundColor: '#FFEF3D',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 10,
        paddingRight: 7,
        paddingBottom: 10,
        paddingLeft: 7,
    },

    suggestedCtaIcon: {
        width: 20,
        height: 20,
    },

    suggestedCtaText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 13.6,
        marginLeft: 5,
    },

    viewSuggestedContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 130,
        marginRight: 18,
        marginLeft: 18,
    },

    suggestedAnimalsText: {
        color: '#ffffff80',
        fontFamily: 'Poppins_500Medium',
        fontSize: 12.8,
    },

    loadAnimalsText: {
        color: '#ffffff80',
        fontFamily: 'Poppins_500Medium',
        fontSize: 10,
        borderWidth: 1,
        borderColor: '#ffffff80',
        borderRadius: 25,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 10,
    },

    suggestedResultContainer: {
        marginTop: 20,
        marginRight: 18,
        marginLeft: 18,
    }
});

export default Home;