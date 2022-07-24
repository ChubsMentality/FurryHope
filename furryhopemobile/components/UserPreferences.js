import React, { useState, useEffect, useContext } from 'react'
import { CredentialsContext } from './CredentialsContext'
import { Image, SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, useWindowDimensions } from 'react-native'
import StepIndicator from 'react-native-step-indicator'
import BottomNav from './SubComponents/BottomNav'
import TopNav from './SubComponents/TopNav'
import dogOption from '../assets/UserPreference/dog-preference-icon.png'
import catOption from '../assets/UserPreference/cat-preference-icon.png'
import bothOption from '../assets/UserPreference/both-icon.png'
import axios from 'axios'
import prevIcon from '../assets/Icons/reg-previous-arrow.png'

const UserPreferences = ({ navigation }) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const [animals, setAnimals] = useState()
    const [cats, setCats] = useState()
    const [dogs, setDogs] = useState()
    const [animalPreference, setAnimalPreference] = useState('')
    const [breedPreferences, setBreedPreferences] = useState([])
    const [colorPreferences, setColorPreferences] = useState([])
    const [genderPreference, setGenderPreference] = useState('')
    const [sizePreference, setSizePreference] = useState()
    const [breedOptions, setBreedOptions] = useState()
    const [colorOptions, setColorOptions] = useState()
    const [currentStep, setCurrentStep] = useState(0)
    const [chosen, setChosen] = useState()

    let breeds = []
    let colors = []

    console.log(storedCredentials)

    const stepIndicatorStyle = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        currentStepStrokeWidth: 3,

        // Step border color
        stepStrokeCurrentColor: '#111',
        stepStrokeFinishedColor: '#111',
        stepStrokeUnFinishedColor: '#aaa',

        // Step Line separators
        separatorFinishedColor: '#111',
        separatorUnFinishedColor: '#aaa',

        // Step background colors
        stepIndicatorFinishedColor: '#111',
        stepIndicatorUnFinishedColor: '#aaa',

        // Fonts
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 15,
        currentStepLabelColor: '#111',
        labelColor: '#aaa',
    } 

    const stepLabels = [`Animal\nPreference`, `Preferences`]

    const getAnimals = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/animals/getBoth')
            setAnimals(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getDogs = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/animals/getDogs')
            setDogs(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCats = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/animals/getCats')
            setCats(data)
        } catch (error) {
            console.log(error)
        }
    }

    const preferDog = () => {
        if(animalPreference === 'Dog') {
            setAnimalPreference('')
        } else {
            setAnimalPreference('Dog')
        }
    }

    const preferCat = () => {
        if(animalPreference === 'Cat') {
            setAnimalPreference('')
        } else {
            setAnimalPreference('Cat')
        }
    }

    const preferBoth = () => {
        if(animalPreference === 'Both') {
            setAnimalPreference('')
        } else {
            setAnimalPreference('Both')
        }
    }

    const next = () => {
        if(animalPreference === '') {
            alert('Please pick your preference in the animal you want to adopt.')
        } else {
            chosen.forEach((c) => {
                breeds.push(c.breed)
                colors.push(c.color)
            })

            setBreedOptions([...new Set(breeds)])
            setColorOptions([...new Set(colors)])
            setCurrentStep(1)
        }
    }

    const goBack = () => {
        setCurrentStep(0)
    }

    const clearPreferences = () => {
        setBreedPreferences([])
        setColorPreferences([])
        setGenderPreference('')
        setSizePreference('')
    }

    const addToBreedPreference = (item) => {
        if(breedPreferences.includes(item)) {
            setBreedPreferences(breedPreferences.filter((breed) => {
                return breed !== item
            }))
        } else {
            setBreedPreferences([...breedPreferences, item])
        }
    }

    const addToColorPreferences = (item) => {
        if(colorPreferences.includes(item)) {
            setColorPreferences(colorPreferences.filter((color) => {
                return color !== item
            }))
        } else {
            setColorPreferences([...colorPreferences, item])
        }
    }

    const toggleMale = () => {
        if(genderPreference === 'Male') {
            setGenderPreference('')
        } else {
            setGenderPreference('Male')
        }
    }

    const toggleFemale = () => {
        if(genderPreference === 'Female') {
            setGenderPreference('')
        } else {
            setGenderPreference('Female')
        }
    }

    // const toggleBoth = () => {
    //     if(genderPreference === 'Both') {
    //         setGenderPreference('')
    //     } else {
    //         setAnimalGenderPreference('Both')
    //     }
    // }

    const toggleSmall = () => {
        if(sizePreference === 'Small') {
            setSizePreference('')
        } else {
            setSizePreference('Small')
        }
    }

    const toggleMedium = () => {
        if(sizePreference === 'Medium') {
            setSizePreference('')
        } else {
            setSizePreference('Medium')
        }
    }

    const toggleLarge = () => {
        if(sizePreference === 'Large') {
            setSizePreference('')
        } else {
            setSizePreference('Large')
        }
    }

    const updatePreference = async () => {
        // console.log(animalPreference)
        // console.log(breedPreferences)
        // console.log(colorPreferences)
        // console.log(genderPreference)
        // console.log(sizePreference)
        try {
            const { data } = await axios.put(`http://localhost:5000/api/users/updatePreference/${storedCredentials.id}`, { animalPreference, breedPreferences, colorPreferences, genderPreference, sizePreference })
            
            alert('Your preferences have been updated')
            setTimeout(() => {
                setAnimalPreference('')
                setCurrentStep(0)
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAnimals()
        getDogs()
        getCats()
    }, [])

    useEffect(() => {
        if(animalPreference === 'Both') {
            setChosen(animals)
        } else if(animalPreference === 'Dog') {
            setChosen(dogs)
        } else if(animalPreference === 'Cat') {
            setChosen(cats)
        }
    }, [animalPreference])

    return (
        <SafeAreaView style={styles.body}>
            <TopNav ScreenName='Change Animal Preference' />

            <View style={{ marginTop: 50, }}></View>

            <StepIndicator 
                customStyles={stepIndicatorStyle}
                currentPosition={currentStep}
                labels={stepLabels}
                stepCount={2}
                style={styles.stepIndicator}
            />

            {currentStep === 0 &&
                <>
                    <Text style={styles.step1Header}>Update your preferences</Text>
                    <Text style={styles.step1SubHeader}>Choose on which do you prefer</Text>
                    
                    <View style={styles.animalOptionsContainer}>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={animalPreference === 'Dog' ? styles.optionBtnActive : styles.optionBtn} onPress={() => preferDog()}>
                                <Image 
                                    source={dogOption}
                                    style={styles.optionBtnImg}
                                />
                            </TouchableOpacity>

                            <Text style={animalPreference === 'Dog' ? styles.optionTxtActive : styles.optionTxt}>DOGS</Text>
                        </View>

                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={animalPreference === 'Cat' ? styles.optionBtnActive : styles.optionBtn} onPress={() => preferCat()}>
                                <Image 
                                    source={catOption}
                                    style={styles.optionBtnImg}
                                />
                            </TouchableOpacity>

                            <Text style={animalPreference === 'Cat' ? styles.optionTxtActive : styles.optionTxt}>CATS</Text>
                        </View>

                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={animalPreference === 'Both' ? styles.optionBtnActive : styles.optionBtn} onPress={() => preferBoth()}>
                                <Image 
                                    source={bothOption}
                                    style={styles.optionBtnImg}
                                />
                            </TouchableOpacity>

                            <Text style={animalPreference === 'Both' ? styles.optionTxtActive : styles.optionTxt}>BOTH</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.nextBtn} onPress={() => next()}>
                        <Text style={styles.nextTxt}>Next</Text>
                    </TouchableOpacity>
                </>
            }

            {currentStep === 1 &&
                <>
                    <View style={styles.choosePreferencesContainer}>
                        <Text style={styles.choosePreferenceHead}>Choose</Text>
                        <TouchableOpacity style={styles.clearPreferenceBtn} onPress={() => clearPreferences()}>
                            <Text style={styles.clearPreferenceTxt}>Clear Preferences</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.animalChoiceLabel, styles.breedChoiceLabel]}>Breed</Text>
                    <View style={styles.animalChoiceContainer}>
                        {breedOptions.map((breed) => (
                            <TouchableOpacity style={styles.animalChoiceBtn} onPress={() => addToBreedPreference(breed)} key={breed}>
                                <Text style={breedPreferences.includes(breed) ? styles.choiceTxtActive : styles.animalChoiceTxt}>{breed}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                        
                    <Text style={[styles.animalChoiceLabel, styles.colorChoiceLabel]}>Color</Text>
                    <View style={styles.animalChoiceContainer}>
                        {colorOptions.map((color) => (
                            <TouchableOpacity style={styles.animalChoiceBtn} onPress={() => addToColorPreferences(color)} key={color}>
                                <Text style={colorPreferences.includes(color) ? styles.choiceTxtActive : styles.animalChoiceTxt}>{color}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={[styles.animalChoiceLabel, styles.genderChoiceLabel]}>Gender</Text>
                    <View style={styles.animalChoiceContainer}>
                        <TouchableOpacity style={styles.animalChoiceBtn} onPress={() => toggleMale()}>
                            <Text style={genderPreference === 'Male' ? styles.choiceTxtActive : styles.animalChoiceTxt}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.animalChoiceBtn} onPress={() => toggleFemale()}>
                            <Text style={genderPreference === 'Female' ? styles.choiceTxtActive : styles.animalChoiceTxt}>Female</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={styles.animalChoiceBtn} onPress={() => toggleBoth()}>
                            <Text style={genderPreference === 'Both' ? styles.choiceTxtActive : styles.animalChoiceTxt}>Both</Text>
                        </TouchableOpacity> */}
                    </View>

                    <Text style={[styles.animalChoiceLabel, styles.sizeChoiceLabel]}>Size</Text>
                    <View style={styles.animalChoiceContainer}>
                        <TouchableOpacity style={styles.animalChoiceBtn} onPress={() => toggleSmall()}>
                            <Text style={sizePreference === 'Small' ? styles.choiceTxtActive : styles.animalChoiceTxt}>Small</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.animalChoiceBtn} onPress={() => toggleMedium()}>
                            <Text style={sizePreference === 'Medium' ? styles.choiceTxtActive : styles.animalChoiceTxt}>Medium</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.animalChoiceBtn} onPress={() => toggleLarge()}>
                            <Text style={sizePreference === 'Large' ? styles.choiceTxtActive : styles.animalChoiceTxt}>Large</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.prevContContainer}>
                        <TouchableOpacity style={styles.prevBtn} onPress={() => goBack()}>
                            <Image style={styles.prevIcon} source={prevIcon} />
                            <Text style={styles.prevTxt}>Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.submitBtn} onPress={() => updatePreference()}>
                            <Text style={styles.submitTxt}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }

            <BottomNav />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
    },

    stepIndicator: {
        marginTop: 30,
    },

    step1Header: {
        fontFamily: 'PoppinsBold',
        fontSize: 25,
        marginTop: 50,
        marginLeft: 30,
    },

    step1SubHeader: {
        fontFamily: 'PoppinsLight',
        fontSize: 16,
        marginTop: 3,
        marginLeft: 30,
    },
    
    animalOptionsContainer: {
        marginTop: 40,
        marginLeft: 30,
        marginRight: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    optionContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    optionBtn: {
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C4C4C4',
        borderRadius: 100,
    },

    optionBtnActive: {
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111',
        borderRadius: 100,
    },

    optionBtnImg: {
        height: 45,
        width: 45,
    },

    optionTxt: {
        marginTop: 10,
    },

    optionTxtActive: {
        marginTop: 10,
        fontFamily: 'PoppinsSemiBold',
    },

    nextBtn: {
        marginTop: 140,
        marginRight: 30,
        marginLeft: 'auto',
        backgroundColor: '#111',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 120,
    },

    nextTxt: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 20,
        color: 'white',
    },





    choosePreferencesContainer: {
        marginTop: 40,
        marginRight: 40,
        marginLeft: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    choosePreferenceHead: {
        fontFamily: 'PoppinsMedium',
        fontSize: 17,
    },

    clearPreferenceTxt: {
        color: 'red',
        fontFamily: 'PoppinsMedium',
        fontSize: 13,
    },  

    animalChoiceLabel: {
        marginLeft: 40,
        fontFamily: 'PoppinsRegular',
        fontSize: 15,
    },

    breedChoiceLabel: {
        marginTop: 30,
    },

    colorChoiceLabel: {
        marginTop: 25,
    },

    genderChoiceLabel: {
        marginTop: 25,
    },

    sizeChoiceLabel: {
        marginTop: 25,
    },

    animalChoiceContainer: {
        marginRight: 40,
        marginLeft: 40,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    animalChoiceBtn: {
        marginTop: 5,
        marginRight: 7,
    },
    
    animalChoiceTxt: {
        width: 'flex-start', 
        borderRadius: 25,
        borderWidth: .5,
        borderColor: 'black',
        fontSize: 13.5,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        textAlign: 'center',
    },

    choiceTxtActive: {
        width: 'flex-start', 
        color: 'white',
        backgroundColor: 'black',
        borderRadius: 25,
        borderWidth: .5,
        borderColor: 'black',
        fontSize: 13.5,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        textAlign: 'center'
    },

    prevContContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 80,
        marginRight: 30,
        marginBottom: 500,
        marginLeft: 30,
    },

    prevBtn: {
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 120,
        borderColor: '#111',
        borderWidth: 1,
    },

    prevIcon: {
        height: 20,
        width: 20,
        marginRight: 5
    },

    prevTxt: {
        fontFamily: 'PoppinsRegular',
        fontSize: 20,
        marginLeft: 5,
    },

    submitBtn: {
        backgroundColor: '#111',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 120,
    },

    submitTxt: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 20,
        color: 'white',
    },
})

export default UserPreferences

// const [notAdopted, setNotAdopted] = useState([])
    // const [modalVisible, setModalVisible] = useState(false)
    // const [overlay, setOverlay] = useState(false)
    // const [breedOptions, setBreedOptions] = useState()
    // const [colorOptions, setColorOptions] = useState()
    // const [animalTypeOptions, setAnimalTypeOptions] = useState()
    // const [genderOptions, setGenderOptions] = useState()
    // const [preferences, setPreferences] = useState()
    // const [success, setSuccess] = useState(false)
    // const window = useWindowDimensions()
    
    // // To set the options for the user's pick his / her preference
    // const breeds = []
    // const colors = []
    // const animalType = []
    // const animalGender = []
    // let result
    // let animalPreferences = []
    // let breedPreferences = []
    // let colorPreferences = []
    // let animalTypePreferences = []
    // let animalGenderPreferences = []
 
    // const filterNotAdopted = (arr) => {
    //     return arr.adoptionStatus === 'Not Adopted'
    // }

    // const fetchData = async () => {
    //     try {
    //         const { data: responseData } = await axios.get('http://localhost:5000/api/animals')
    //         console.log(responseData)
    //         setNotAdopted(responseData.filter(filterNotAdopted))
    //     } catch (error) {
    //         console.log(error)
    //         alert(error)
    //     }
    // }

    // const fetchUserById = async () => {
    //     try {
    //         const { data } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
    //         console.log(data)
    //         setPreferences(data.animalPreferences)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     fetchData()
    //     fetchUserById()
    // }, [success])

    // const addToBreedPreference = (item) => {
    //     if(breedPreferences.includes(item)) {
    //         alert(`You've already picked this, choose another one.`)
    //     } else {
    //         breedPreferences.push(item)
    //         animalPreferences.push(item)
    //         alert(`You've added ${item} to your breed preference`)
    //         console.log(`Breeds: ${breedPreferences}`)
    //     }
    // }

    // const addToColorPreference = (item) => {
    //     if(colorPreferences.includes(item)) {
    //         alert(`You've already picked this, choose another one.`)
    //     } else {
    //         colorPreferences.push(item)
    //         animalPreferences.push(item)
    //         alert(`You've added ${item} to your color preference`)
    //         console.log(`Color(s): ${colorPreferences}`)
    //     }
    // }

    // const addToTypePreference = (item) => {
    //     if(animalTypePreferences.includes(item)) {
    //         alert(`You've already picked this, choose another one.`)
    //     } else {
    //         animalTypePreferences.push(item)
    //         animalPreferences.push(item)
    //         alert(`You've added ${item} to your animal type preference`)
    //         console.log(`Animal Type: ${animalTypePreferences}`)
    //     }
    // }

    // const addToGenderPreference = (item) => {
    //     if(animalGenderPreferences.includes(item)) {
    //         alert(`You've already picked this, choose another one.`)
    //     } else {
    //         animalGenderPreferences.push(item)
    //         animalPreferences.push(item)
    //         alert(`You've added ${item} to your gender preference`)
    //         console.log(`Gender: ${animalGenderPreferences}`)
    //     }
    // }

    // const doneHandler = async () => {
    //     try {
    //         const { data } = await axios.put(`http://localhost:5000/api/users/updatePreference/${storedCredentials.id}`, { animalPreferences, breedPreferences, colorPreferences, animalTypePreferences, animalGenderPreferences })
    //         console.log(data)
    //         setSuccess(true)
    //     } catch (error) {
    //         console.log(error)
    //     }

    //     setTimeout(() => {
    //         animalPreferences = []
    //         breedPreferences = []
    //         colorPreferences = []
    //         animalTypePreferences = []
    //         animalGenderPreferences = []
    //         setModalVisible(!modalVisible)
    //         setOverlay(!overlay)
    //     }, 2000)
    // }







// import React, { useState, useEffect, useContext } from 'react'
// import { CredentialsContext } from './CredentialsContext'
// import { Image, SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, useWindowDimensions } from 'react-native'
// import backArrow from '../assets/Icons/returnIcon.svg'
// import BottomNav from './SubComponents/BottomNav'
// import leftPaw from '../assets/UserPreference/leftPaw.svg'
// import rightPaw from '../assets/UserPreference/rightPaw.svg'
// import cogIcon from '../assets/UserPreference/cog.svg'
// import axios from 'axios'

// // Modal imports
// import closeModalIcon from '../assets/UserPreference/closeModalRed.svg'
 
// const UserPreferences = ({ navigation }) => {
//     const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

//     const [notAdopted, setNotAdopted] = useState([])
//     const [modalVisible, setModalVisible] = useState(false)
//     const [overlay, setOverlay] = useState(false)
//     const [breedOptions, setBreedOptions] = useState()
//     const [colorOptions, setColorOptions] = useState()
//     const [animalTypeOptions, setAnimalTypeOptions] = useState()
//     const [genderOptions, setGenderOptions] = useState()
//     const [preferences, setPreferences] = useState()
//     const [success, setSuccess] = useState(false)
//     const window = useWindowDimensions()
    
//     // To set the options for the user's pick his / her preference
//     const breeds = []
//     const colors = []
//     const animalType = []
//     const animalGender = []
//     let result
//     let animalPreferences = []
//     let breedPreferences = []
//     let colorPreferences = []
//     let animalTypePreferences = []
//     let animalGenderPreferences = []
 
//     const filterNotAdopted = (arr) => {
//         return arr.adoptionStatus === 'Not Adopted'
//     }

//     const fetchData = async () => {
//         try {
//             const { data: responseData } = await axios.get('http://localhost:5000/api/animals')
//             console.log(responseData)
//             setNotAdopted(responseData.filter(filterNotAdopted))
//         } catch (error) {
//             console.log(error)
//             alert(error)
//         }
//     }

//     const fetchUserById = async () => {
//         try {
//             const { data } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
//             console.log(data)
//             setPreferences(data.animalPreferences)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         fetchData()
//         fetchUserById()
//     }, [success])
    
//     const openModal = () => {
//         setModalVisible(true)
//         setOverlay(true)
//         console.log(notAdopted)

//         notAdopted.forEach((item) => {
//             breeds.push(item.breed)
//             colors.push(item.color)
//             animalType.push(item.type)
//             animalGender.push(item.gender)
//             result = breeds.concat(colors, animalType, animalGender)    
//         })

//         // Removes duplicate values - using Set and the spread operator.
//         // Each value only occurs once.
//         setBreedOptions([...new Set(breeds)])
//         setColorOptions([...new Set(colors)])
//         setAnimalTypeOptions([...new Set(animalType)])
//         setGenderOptions([...new Set(animalGender)])
//         // setOptionPreferences([...new Set(result)])
//     }   

//     const closeModal = () => {
//         setModalVisible(false)
//         setOverlay(false)
//     }

//     const addToBreedPreference = (item) => {
//         if(breedPreferences.includes(item)) {
//             alert(`You've already picked this, choose another one.`)
//         } else {
//             breedPreferences.push(item)
//             animalPreferences.push(item)
//             alert(`You've added ${item} to your breed preference`)
//             console.log(`Breeds: ${breedPreferences}`)
//         }
//     }

//     const addToColorPreference = (item) => {
//         if(colorPreferences.includes(item)) {
//             alert(`You've already picked this, choose another one.`)
//         } else {
//             colorPreferences.push(item)
//             animalPreferences.push(item)
//             alert(`You've added ${item} to your color preference`)
//             console.log(`Color(s): ${colorPreferences}`)
//         }
//     }

//     const addToTypePreference = (item) => {
//         if(animalTypePreferences.includes(item)) {
//             alert(`You've already picked this, choose another one.`)
//         } else {
//             animalTypePreferences.push(item)
//             animalPreferences.push(item)
//             alert(`You've added ${item} to your animal type preference`)
//             console.log(`Animal Type: ${animalTypePreferences}`)
//         }
//     }

//     const addToGenderPreference = (item) => {
//         if(animalGenderPreferences.includes(item)) {
//             alert(`You've already picked this, choose another one.`)
//         } else {
//             animalGenderPreferences.push(item)
//             animalPreferences.push(item)
//             alert(`You've added ${item} to your gender preference`)
//             console.log(`Gender: ${animalGenderPreferences}`)
//         }
//     }

//     const doneHandler = async () => {
//         try {
//             const { data } = await axios.put(`http://localhost:5000/api/users/updatePreference/${storedCredentials.id}`, { animalPreferences, breedPreferences, colorPreferences, animalTypePreferences, animalGenderPreferences })
//             console.log(data)
//             setSuccess(true)
//         } catch (error) {
//             console.log(error)
//         }

//         setTimeout(() => {
//             animalPreferences = []
//             breedPreferences = []
//             colorPreferences = []
//             animalTypePreferences = []
//             animalGenderPreferences = []
//             setModalVisible(!modalVisible)
//             setOverlay(!overlay)
//         }, 2000)
//     }

//     return (
//         <SafeAreaView style={styles.body}>
//             <Image style={styles.left_Paw} source={leftPaw} />
//             <Image style={styles.right_Paw} source={rightPaw} />

//             <ScrollView style={styles.scrollBody}>
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnContainer}>
//                     <Image style={styles.backBtnIcon} source={backArrow} />
//                     <Text style={styles.backBtnText}>Back</Text>
//                 </TouchableOpacity>

//                 <Text style={styles.changePreferHeader}>My Preferences</Text>
//                 <View style={styles.preferencesContainer}>
//                     {preferences && preferences ? 
//                         preferences.map((item) => (
//                             <Text style={styles.preferences} key={item}>{item}</Text>
//                         ))
//                         :
//                         <Text style={{
//                             textAlign: 'center',
//                             fontFamily: 'Poppins_200ExtraLight',
//                             marginTop: 40,
//                             marginBottom: 90,
//                         }}>You haven't picked your preferences.</Text>
//                     }
//                 </View>

//                 <TouchableOpacity style={styles.changePreferBtn} onPress={() => openModal()}>
//                     <Image style={styles.changePreferIcon} source={cogIcon}/>
//                     <Text style={styles.changePreferText}>CHANGE PREFERENCE</Text>
//                 </TouchableOpacity>

//                 {/* <View style={styles.suggestedAnimals}>
//                     <Text style={{
//                         textAlign: 'center',
//                         fontFamily: 'Poppins_200ExtraLight',
//                     }}>THERE ARE CURRENTLY NO SUGGESTED ANIMALS</Text>
//                 </View> */}

//             </ScrollView>

//             {modalVisible && 
//                 <View style={styles.modalBody}>
//                     <TouchableOpacity style={styles.closeModalBtn} onPress={() => closeModal()}>
//                         <Image style={styles.closeModalIcon} source={closeModalIcon} />
//                     </TouchableOpacity>
                    
//                     {/* <Text style={styles.choicesText}>Choices</Text>
//                     <View style={styles.optionsContainer}>
//                         {optionPreferences && optionPreferences.map((option) => ( 
//                             <TouchableOpacity style={styles.optionBtn} onPress={() => addToPreferences(option)} key={option}>
//                                 <Text style={styles.optionTxt}>{option}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View> */}

//                     <Text style={[styles.choicesText, styles.breedText]}>Breed</Text>
//                     <View style={styles.optionsContainer}>
//                         {breedOptions && breedOptions.map((option) => ( 
//                             <TouchableOpacity style={styles.optionBtn} onPress={() => addToBreedPreference(option)} key={option}>
//                                 <Text style={styles.optionTxt}>{option}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>

//                     <Text style={[styles.choicesText, styles.colorText]}>Color</Text>
//                     <View style={styles.optionsContainer}>
//                         {colorOptions && colorOptions.map((option) => ( 
//                             <TouchableOpacity style={styles.optionBtn} onPress={() => addToColorPreference(option)} key={option}>
//                                 <Text style={styles.optionTxt}>{option}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>

//                     {/* <Text style={[styles.choicesText, styles.animalTypeText]}>Animal Type</Text>
//                     <View style={styles.optionsContainer}>
//                         {animalTypeOptions && animalTypeOptions.map((option) => ( 
//                             <TouchableOpacity style={styles.optionBtn} onPress={() => addToTypePreference(option)} key={option}>
//                                 <Text style={styles.optionTxt}>{option}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View> 

//                     <Text style={[styles.choicesText, styles.animalGenderText]}>Gender</Text>
//                     <View style={styles.optionsContainer}>
//                         {genderOptions && genderOptions.map((option) => ( 
//                             <TouchableOpacity style={styles.optionBtn} onPress={() => addToGenderPreference(option)} key={option}>
//                                 <Text style={styles.optionTxt}>{option}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View> */}

//                     <View style={styles.modalBtns}>
//                         <TouchableOpacity style={styles.cancelBtn} onPress={() => closeModal()}>
//                             <Text style={styles.cancelText}>Cancel</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity style={styles.doneBtn} onPress={() => doneHandler()}>  
//                             <Text style={styles.doneText}>Done</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             }

//             {overlay &&
//                 <View style={{
//                     width: window.width, 
//                     height: window.height, 
//                     backgroundColor: '#111',
//                     opacity: .5,
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     zIndex: 5
//                 }}></View>
//             }

//             <BottomNav />
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     // Default Device (Google Pixel 2)
//     body: {
//         flex: 1,
//         backgroundColor: 'white',
//         position: 'relative',
//         overflow: 'hidden',
//     },

//     scrollBody: {
//         flex: 1,
//     },

//     backBtnContainer: {
//         display: 'flex',
//         flexDirection: 'row',
//         marginTop: 25,
//         marginLeft: 20,
//         alignSelf:'flex-start',
//     },

//     backBtnIcon: {
//         width: 23,
//         height: 23,
//     },

//     backBtnText: {
//         fontFamily: 'Poppins_500Medium',
//         fontSize: 14.5,
//         marginTop: 2,
//         marginLeft: 7,
//     },

//     changePreferHeader: {
//         fontFamily: 'Poppins_600SemiBold',
//         fontSize: 20,
//         marginTop: 45,
//         marginBottom: 7,
//         marginLeft: 23,
//     },

//     preferencesContainer: {
//         marginRight: 23,
//         marginLeft: 23,
//         display: 'flex',
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },

//     preferences: {
//         backgroundColor: '#111',
//         borderRadius: 25,
//         color: 'white',
//         marginTop: 5,
//         marginRight: 5,
//         alignSelf: 'flex-start',
//         paddingTop: 3,
//         paddingRight: 15,
//         paddingBottom: 3,
//         paddingLeft: 15,
//     },  
    
//     changePreferBtn: {
//         marginTop: 100,
//         marginRight: 'auto',
//         marginBottom: 120,
//         marginLeft: 'auto',
//         width: 200,
//         height: 40,
//         backgroundColor: '#111',
//         borderRadius: 5,
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },

//     changePreferIcon: {
//         width: 25,
//         height: 25,
//         marginTop: 7,
//     },  

//     changePreferText: {
//         color: 'white',
//         fontFamily: 'Poppins_600SemiBold',
//         fontSize: 13,
//         marginTop: 10,
//         marginLeft: 5,
//     },

//     suggestedAnimals: {
//         width: '100%',
//         height: 200,
//         backgroundColor: '#111',
//     },

//     left_Paw: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: 200,
//         height: 200,
//     },

//     right_Paw: {
//         position: 'absolute',
//         top: 200,
//         right: 0,
//         width: 350,
//         height: 350,
//     },

//     modalBody: {
//         backgroundColor: 'white',
//         borderRadius: 5,
//         // height: 620,
//         width: 320,
//         position: 'absolute',
//         top: '15%',
//         left: '50%',
//         transform: [{
//             translateX: '-50%',
//             translateY: '-15%',
//         }],
//         zIndex: 10,
//     },

//     closeModalBtn: {
//         display: 'flex',
//         alignSelf: 'flex-end',
//         marginTop: 10,
//         marginRight: 12,
//     },

//     closeModalIcon: {
//         width: 23,
//         height: 23,
//         zIndex: 11,
//     },

//     choicesText: {
//         fontFamily: 'Poppins_500Medium',
//         marginTop: 30,
//         marginBottom: 7,
//         marginLeft: 25,
//     },

//     breedText: {
//         marginTop: 15,
//     },

//     colorText: {
//         marginTop: 10,
//     },

//     animalTypeText: {
//         marginTop: 10,
//     },

//     animalGenderText: {
//         marginTop: 10,
//     },

//     optionsContainer: {
//         marginRight: 25,
//         marginLeft: 25,
//         display: 'flex',
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },

//     optionBtn: {
//         marginRight: 5,
//         marginBottom: 10,
//     },

//     optionTxt: {
//         alignSelf: 'flex-start',
//         borderWidth: 1,
//         borderColor: '#111',
//         borderRadius: 50,
//         color: '#111',
//         fontFamily: 'Poppins_400Regular',
//         fontSize: 12,
//         paddingTop: 3,
//         paddingRight: 8,
//         paddingBottom: 3,
//         paddingLeft: 8,
//     },

//     modalBtns: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 50,
//         marginRight: 25,
//         marginBottom: 30,
//         marginLeft: 25,
//         // position: 'absolute',
//         // bottom: 35,
//         // left: '12%',
//     },

//     cancelBtn: {
//         width: 120,
//         height: 40,
//         backgroundColor: 'transparent',
//         borderWidth: 1,
//         borderColor: '#626262',
//         borderRadius: 5,
//         marginRight: 10,
//     },

//     cancelText: {
//         color: '#626262',
//         fontFamily: 'Poppins_400Regular',
//         fontSize: 18,
//         marginTop: 5,
//         textAlign: 'center',
//     },

//     doneBtn: {
//         width: 120,
//         height: 40,
//         backgroundColor: '#111',
//         borderRadius: 5,
//     },

//     doneText: {
//         color: 'white',
//         fontFamily: 'Poppins_400Regular',
//         fontSize: 18,
//         marginTop: 5,
//         textAlign: 'center',
//     },
    
// })

// export default UserPreferences

