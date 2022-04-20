import React, { useState, useEffect, useContext } from 'react'
import { CredentialsContext } from './CredentialsContext'
import { Image, SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, useWindowDimensions } from 'react-native'
import backArrow from '../assets/Icons/returnIcon.svg'
import BottomNav from './SubComponents/BottomNav'
import leftPaw from '../assets/UserPreference/leftPaw.svg'
import rightPaw from '../assets/UserPreference/rightPaw.svg'
import cogIcon from '../assets/UserPreference/cog.svg'
import axios from 'axios'

// Modal imports
import closeModalIcon from '../assets/UserPreference/closeModalRed.svg'
 
const UserPreferences = ({ navigation }) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    const [data, setData] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const [breedOptions, setBreedOptions] = useState()
    const [colorOptions, setColorOptions] = useState()
    const [animalTypeOptions, setAnimalTypeOptions] = useState()
    const [genderOptions, setGenderOptions] = useState()
    const [preferences, setPreferences] = useState()
    const [success, setSuccess] = useState(false)
    const window = useWindowDimensions()
    
    // To set the options for the user's pick his / her preference
    const breeds = []
    const colors = []
    const animalType = []
    const animalGender = []
    let result
    let animalPreferences = []
    let breedPreferences = []
    let colorPreferences = []
    let animalTypePreferences = []
    let animalGenderPreferences = []
 
    const fetchData = async () => {
        try {
            const { data: responseData } = await axios.get('http://localhost:5000/api/animals')
            console.log(responseData)
            setData(responseData)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    const fetchUserById = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
            console.log(data)
            setPreferences(data.animalPreferences)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
        fetchUserById()
    }, [success])
    
    const openModal = () => {
        setModalVisible(true)
        setOverlay(true)
        console.log(data)

        data.forEach((item) => {
            breeds.push(item.breed)
            colors.push(item.color)
            animalType.push(item.type)
            animalGender.push(item.gender)
            result = breeds.concat(colors, animalType, animalGender)    
        })

        // Removes duplicate values - using Set and the spread operator.
        // Each value only occurs once.
        setBreedOptions([...new Set(breeds)])
        setColorOptions([...new Set(colors)])
        setAnimalTypeOptions([...new Set(animalType)])
        setGenderOptions([...new Set(animalGender)])
        // setOptionPreferences([...new Set(result)])
    }   

    const closeModal = () => {
        setModalVisible(false)
        setOverlay(false)
    }

    const addToBreedPreference = (item) => {
        if(breedPreferences.includes(item)) {
            alert(`You've already picked this, choose another one.`)
        } else {
            breedPreferences.push(item)
            animalPreferences.push(item)
            alert(`You've added ${item} to your breed preference`)
            console.log(`Breeds: ${breedPreferences}`)
        }
    }

    const addToColorPreference = (item) => {
        if(colorPreferences.includes(item)) {
            alert(`You've already picked this, choose another one.`)
        } else {
            colorPreferences.push(item)
            animalPreferences.push(item)
            alert(`You've added ${item} to your color preference`)
            console.log(`Color(s): ${colorPreferences}`)
        }
    }

    const addToTypePreference = (item) => {
        if(animalTypePreferences.includes(item)) {
            alert(`You've already picked this, choose another one.`)
        } else {
            animalTypePreferences.push(item)
            animalPreferences.push(item)
            alert(`You've added ${item} to your animal type preference`)
            console.log(`Animal Type: ${animalTypePreferences}`)
        }
    }

    const addToGenderPreference = (item) => {
        if(animalGenderPreferences.includes(item)) {
            alert(`You've already picked this, choose another one.`)
        } else {
            animalGenderPreferences.push(item)
            animalPreferences.push(item)
            alert(`You've added ${item} to your gender preference`)
            console.log(`Gender: ${animalGenderPreferences}`)
        }
    }

    const doneHandler = async () => {
        try {
            const { data } = await axios.put(`http://localhost:5000/api/users/updatePreference/${storedCredentials.id}`, { animalPreferences, breedPreferences, colorPreferences, animalTypePreferences, animalGenderPreferences })
            console.log(data)
            setSuccess(true)
        } catch (error) {
            console.log(error)
        }

        setTimeout(() => {
            animalPreferences = []
            breedPreferences = []
            colorPreferences = []
            animalTypePreferences = []
            animalGenderPreferences = []
            setModalVisible(!modalVisible)
            setOverlay(!overlay)
        }, 2000)
    }

    return (
        <SafeAreaView style={styles.body}>
            <Image style={styles.left_Paw} source={leftPaw} />
            <Image style={styles.right_Paw} source={rightPaw} />

            <ScrollView style={styles.scrollBody}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnContainer}>
                    <Image style={styles.backBtnIcon} source={backArrow} />
                    <Text style={styles.backBtnText}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.changePreferHeader}>My Preferences</Text>
                <View style={styles.preferencesContainer}>
                    {preferences && preferences ? 
                        preferences.map((item) => (
                            <Text style={styles.preferences} key={item}>{item}</Text>
                        ))
                        :
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: 'Poppins_200ExtraLight',
                            marginTop: 40,
                            marginBottom: 90,
                        }}>You haven't picked your preferences.</Text>
                    }
                </View>

                <TouchableOpacity style={styles.changePreferBtn} onPress={() => openModal()}>
                    <Image style={styles.changePreferIcon} source={cogIcon}/>
                    <Text style={styles.changePreferText}>CHANGE PREFERENCE</Text>
                </TouchableOpacity>

                {/* <View style={styles.suggestedAnimals}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: 'Poppins_200ExtraLight',
                    }}>THERE ARE CURRENTLY NO SUGGESTED ANIMALS</Text>
                </View> */}

            </ScrollView>

            {modalVisible && 
                <View style={styles.modalBody}>
                    <TouchableOpacity style={styles.closeModalBtn} onPress={() => closeModal()}>
                        <Image style={styles.closeModalIcon} source={closeModalIcon} />
                    </TouchableOpacity>
                    
                    {/* <Text style={styles.choicesText}>Choices</Text>
                    <View style={styles.optionsContainer}>
                        {optionPreferences && optionPreferences.map((option) => ( 
                            <TouchableOpacity style={styles.optionBtn} onPress={() => addToPreferences(option)} key={option}>
                                <Text style={styles.optionTxt}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View> */}

                    <Text style={[styles.choicesText, styles.breedText]}>Breed</Text>
                    <View style={styles.optionsContainer}>
                        {breedOptions && breedOptions.map((option) => ( 
                            <TouchableOpacity style={styles.optionBtn} onPress={() => addToBreedPreference(option)} key={option}>
                                <Text style={styles.optionTxt}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={[styles.choicesText, styles.colorText]}>Color</Text>
                    <View style={styles.optionsContainer}>
                        {colorOptions && colorOptions.map((option) => ( 
                            <TouchableOpacity style={styles.optionBtn} onPress={() => addToColorPreference(option)} key={option}>
                                <Text style={styles.optionTxt}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* <Text style={[styles.choicesText, styles.animalTypeText]}>Animal Type</Text>
                    <View style={styles.optionsContainer}>
                        {animalTypeOptions && animalTypeOptions.map((option) => ( 
                            <TouchableOpacity style={styles.optionBtn} onPress={() => addToTypePreference(option)} key={option}>
                                <Text style={styles.optionTxt}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View> 

                    <Text style={[styles.choicesText, styles.animalGenderText]}>Gender</Text>
                    <View style={styles.optionsContainer}>
                        {genderOptions && genderOptions.map((option) => ( 
                            <TouchableOpacity style={styles.optionBtn} onPress={() => addToGenderPreference(option)} key={option}>
                                <Text style={styles.optionTxt}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View> */}

                    <View style={styles.modalBtns}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={() => closeModal()}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.doneBtn} onPress={() => doneHandler()}>  
                            <Text style={styles.doneText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            {overlay &&
                <View style={{
                    width: window.width, 
                    height: window.height, 
                    backgroundColor: '#111',
                    opacity: .5,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 5
                }}></View>
            }

            <BottomNav />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    // Default Device (Google Pixel 2)
    body: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden',
    },

    scrollBody: {
        flex: 1,
    },

    backBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 20,
        alignSelf:'flex-start',
    },

    backBtnIcon: {
        width: 23,
        height: 23,
    },

    backBtnText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14.5,
        marginTop: 2,
        marginLeft: 7,
    },

    changePreferHeader: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
        marginTop: 45,
        marginBottom: 7,
        marginLeft: 23,
    },

    preferencesContainer: {
        marginRight: 23,
        marginLeft: 23,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    preferences: {
        backgroundColor: '#111',
        borderRadius: 25,
        color: 'white',
        marginTop: 5,
        marginRight: 5,
        alignSelf: 'flex-start',
        paddingTop: 3,
        paddingRight: 15,
        paddingBottom: 3,
        paddingLeft: 15,
    },  
    
    changePreferBtn: {
        marginTop: 100,
        marginRight: 'auto',
        marginBottom: 120,
        marginLeft: 'auto',
        width: 200,
        height: 40,
        backgroundColor: '#111',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    changePreferIcon: {
        width: 25,
        height: 25,
        marginTop: 7,
    },  

    changePreferText: {
        color: 'white',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 13,
        marginTop: 10,
        marginLeft: 5,
    },

    suggestedAnimals: {
        width: '100%',
        height: 200,
        backgroundColor: '#111',
    },

    left_Paw: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 200,
        height: 200,
    },

    right_Paw: {
        position: 'absolute',
        top: 200,
        right: 0,
        width: 350,
        height: 350,
    },

    modalBody: {
        backgroundColor: 'white',
        borderRadius: 5,
        // height: 620,
        width: 320,
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: [{
            translateX: '-50%',
            translateY: '-15%',
        }],
        zIndex: 10,
    },

    closeModalBtn: {
        display: 'flex',
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 12,
    },

    closeModalIcon: {
        width: 23,
        height: 23,
        zIndex: 11,
    },

    choicesText: {
        fontFamily: 'Poppins_500Medium',
        marginTop: 30,
        marginBottom: 7,
        marginLeft: 25,
    },

    breedText: {
        marginTop: 15,
    },

    colorText: {
        marginTop: 10,
    },

    animalTypeText: {
        marginTop: 10,
    },

    animalGenderText: {
        marginTop: 10,
    },

    optionsContainer: {
        marginRight: 25,
        marginLeft: 25,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    optionBtn: {
        marginRight: 5,
        marginBottom: 10,
    },

    optionTxt: {
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#111',
        borderRadius: 50,
        color: '#111',
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        paddingTop: 3,
        paddingRight: 8,
        paddingBottom: 3,
        paddingLeft: 8,
    },

    modalBtns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        marginRight: 25,
        marginBottom: 30,
        marginLeft: 25,
        // position: 'absolute',
        // bottom: 35,
        // left: '12%',
    },

    cancelBtn: {
        width: 120,
        height: 40,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#626262',
        borderRadius: 5,
        marginRight: 10,
    },

    cancelText: {
        color: '#626262',
        fontFamily: 'Poppins_400Regular',
        fontSize: 18,
        marginTop: 5,
        textAlign: 'center',
    },

    doneBtn: {
        width: 120,
        height: 40,
        backgroundColor: '#111',
        borderRadius: 5,
    },

    doneText: {
        color: 'white',
        fontFamily: 'Poppins_400Regular',
        fontSize: 18,
        marginTop: 5,
        textAlign: 'center',
    },
    
})

export default UserPreferences
