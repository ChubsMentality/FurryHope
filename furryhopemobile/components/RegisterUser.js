import React, { useState, useEffect } from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Image, TextInput } from 'react-native'
import { StackActions } from '@react-navigation/native'
import StepIndicator from 'react-native-step-indicator'
import axios from 'axios';
import logoBlack from '../assets/Login/logo-black.png'
import prevIcon from '../assets/Icons/reg-previous-arrow.png'
import dogOption from '../assets/UserPreference/dog-preference-icon.png'
import catOption from '../assets/UserPreference/cat-preference-icon.png'
import bothOption from '../assets/UserPreference/both-icon.png'

const RegisterUser = ({ navigation }) => {
    const [loading, setLoading] = useState(false)

    // To register the user's info
    const register = async () => {
        setLoading(true)

        try {
            // async / await format 
            const { data } = await axios.post('http://localhost:5000/api/users', { fullName, email, contactNo, address, password, animalPreference, breedPreferences, colorPreferences, genderPreference, sizePreference }) 
            console.log(data)
            setLoading(false)
            navigation.dispatch(StackActions.replace('Verification', { User: data })) 
        } catch (error) {
            console.log(error)
            alert('Failed to create an account / The account already exists.')
            setLoading(false)
        }

        setLoading(false)
    }

    const [currentStep, setCurrentStep] = useState(0)
    const stepLabels = [`Account\nRegistration`, `Preference\nOverview`, `Animal\nPreference`, `Preferences`]
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

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [animalPreference, setAnimalPreference] = useState('')
    const [breedPreferences, setBreedPreferences] = useState([])
    const [colorPreferences, setColorPreferences] = useState([])
    const [genderPreference, setGenderPreference] = useState('')
    const [sizePreference, setSizePreference] = useState('')
    console.log(address)

    const [fNameFocused, setFNameFocused] = useState(false)
    const [emailFocused, setEmailFocused] = useState(false)
    const [contactNoFocused, setContactNoFocused] = useState(false)
    const [addressFocused, setAddressFocused] = useState(false)
    const [pwdFocused, setPwdFocused] = useState(false)
    const [confirmPwdFocused, setConfirmPwdFocused] = useState(false)

    const [notAdopted, setNotAdopted] = useState()
    const [notAdoptedDogs, setNotAdoptedDogs] = useState()
    const [notAdoptedCats, setNotAdoptedCats] = useState()
    const [chosen, setChosen] = useState()
    const [breedOptions, setBreedOptions] = useState()
    const [colorOptions, setColorOptions] = useState()

    const [breedOptionsEnabled, setBreedOptionsEnabled] = useState(true)
    const [colorOptionsEnabled, setColorOptionsEnabled] = useState(true)

    let breeds = []
    let colors = []

    const filterNotAdopted = (arr) => {
        return arr.adoptionStatus === 'Not Adopted'
    }

    const goToSecondStep = () => {
        // Using regex to create a strong password
        if(!fullName || !email || !contactNo || !address || !password || !confirmPassword) {
            alert('Please fill out all the necessary fields.')
        } else if (password.search(/[0-9]/) === -1) { // Password should contain a number
            alert('Your password should contain one or more numbers')
        } else if(password.search(/[a-z]/) === -1) { // Password should contain a lowercase letter
            alert('Your password should contain lowercase letters')
        } else if(password.search(/[A-Z]/) === -1) { // Password should contain an uppercase letter
            alert('Your password should contain an uppercase letter')
        } else if(password.search(/[!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) === -1) { // Password should contain special characters
            alert('Your password should also contain special characters')
        } else if(password !== confirmPassword) {
            alert('Passwords does not match');
        } else {
            setCurrentStep(1)
        }
    }

    const goToThirdStep = () => {
        setCurrentStep(2)
    }

    const goBackToFirstStep = () => {
        setCurrentStep(0)
    }

    const goToFourthStep = () => {
        if(animalPreference === '') {
            alert('Please pick your preference in the animal you want to adopt.')
        } else {
            chosen.forEach((c) => {
                breeds.push(c.breed)
                colors.push(c.color)
            })

            setBreedOptions([...new Set(breeds)])
            setColorOptions([...new Set(colors)])
            setCurrentStep(3)
        }
    }

    const goBackToSecondStep = () => {
        setCurrentStep(1)
    }

    const goBackToThirdStep = () => {
        setCurrentStep(2)
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

    const getAnimals = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/animals')
            setNotAdopted(data.filter(filterNotAdopted))
        } catch (error) {
            console.log(error)
        }
    }

    const getDogs = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/animals/getDogs')
            setNotAdoptedDogs(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getCats = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/animals/getCats')
            setNotAdoptedCats(data)
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
            setChosen(notAdopted)
        } else if(animalPreference === 'Dog') {
            setChosen(notAdoptedDogs)
        } else if(animalPreference === 'Cat') {
            setChosen(notAdoptedCats)
        }
    }, [animalPreference])

    const clearPreferences = () => {
        setBreedPreferences([])
        setColorPreferences([])
        setAnimalGenderPreference('')
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

    const toggleBoth = () => {
        if(genderPreference === 'Both') {
            setGenderPreference('')
        } else {
            setAnimalGenderPreference('Both')
        }
    }

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
 
    return (
        <SafeAreaView style={styles.body}>
            <ScrollView>
                {currentStep === 0 ?
                    <TouchableOpacity style={styles.returnContainer} onPress={() => navigation.navigate('Login')}>
                        <Image
                            style={styles.arrowReturn} 
                            source={require('../assets/arrowLeft.png')}
                        />
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                    :
                    <View style={styles.registrationHeader}>
                        <View style={styles.logoPrefContainer}>
                            <Image source={logoBlack} style={styles.logoBlack} />
                            <Text style={styles.logoPrefTxt}>Registration</Text>
                        </View>

                        {/* <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.cancelTxt}>Cancel</Text>
                        </TouchableOpacity> */}
                    </View>
                }

                <StepIndicator 
                    customStyles={stepIndicatorStyle}
                    currentPosition={currentStep}
                    labels={stepLabels}
                    stepCount={4}
                    style={styles.stepIndicator}
                />
                
                {currentStep === 0 &&
                    <>
                        <Text style={styles.createAnAccount}>Create an account.</Text>

                        <Text style={[styles.fullNameTxt, styles.labels]}>Full Name</Text>
                        <TextInput
                            style={fNameFocused ? styles.inputFocused : styles.input}
                            value={fullName} 
                            onChangeText={setFullName}
                            onFocus={() => setFNameFocused(true)}
                            onBlur={() => setFNameFocused(false)}
                        />

                        <Text style={[styles.emailTxt, styles.labels]}>Email</Text>
                        <TextInput 
                            style={emailFocused ? styles.inputFocused : styles.input}
                            value={email}
                            onChangeText={setEmail} 
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                        />

                        <Text style={[styles.emailTxt, styles.labels]}>Contact Number</Text>
                        <TextInput 
                            style={contactNoFocused ? styles.inputFocused : styles.input}
                            value={contactNo}
                            onChangeText={setContactNo} 
                            maxLength={11}
                            onFocus={() => setContactNoFocused(true)}
                            onBlur={() => setContactNoFocused(false)}
                        />

                        <Text style={[styles.emailTxt, styles.labels]}>Address</Text>
                        <TextInput 
                            style={addressFocused ? styles.inputFocused : styles.input}
                            value={address}
                            onChangeText={setAddress} 
                            onFocus={() => setAddressFocused(true)}
                            onBlur={() => setAddressFocused(false)}
                        />

                        <Text style={[styles.passwordTxt, styles.labels]}>Password</Text>
                        <TextInput 
                            style={pwdFocused ? styles.inputFocused : styles.input}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            onFocus={() => setPwdFocused(true)}
                            onBlur={() => setPwdFocused(false)}
                        />

                        <Text style={[styles.confirmPasswordTxt, styles.labels]}>Confirm Password</Text>
                        <TextInput 
                            style={confirmPwdFocused ? styles.inputFocused : styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                            onFocus={() => setConfirmPwdFocused(true)}
                            onBlur={() => setConfirmPwdFocused(false)}
                        />

                        <TouchableOpacity style={styles.continueBtn} onPress={() => goToSecondStep()}>
                            {
                                loading ? 
                                        <ActivityIndicator color='white' style={{ marginTop: 12 }} />
                                    :
                                        <Text style={styles.continueTxt}>CONTINUE</Text>
                            }
                        </TouchableOpacity>
                    </>
                }

                {currentStep === 1 &&
                    <>
                        <Text style={styles.step1Header}>
                            We want to know more {'\n'}
                            about which animals {'\n'}
                            you would like to adopt.
                        </Text>

                        <Text style={styles.step1SubHeader}>
                            On the next following steps {'\n'}
                            we would like to identify which {'\n'}
                            animals you would prefer to adopt {'\n'}
                            Whether it's a dog, a cat or you {'\n'}
                            would like to adopt both cats and {'\n'}
                            dogs and choose between a {'\n'}
                            specific breed, color, gender, etc.
                        </Text>

                        <View style={styles.prevContContainer}>
                            <TouchableOpacity style={styles.prevBtn} onPress={() => goBackToFirstStep()}>
                                <Image style={styles.prevIcon} source={prevIcon} />
                                <Text style={styles.prevTxt}>Back</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.stepContinueBtn} onPress={() => goToThirdStep()}>
                                <Text style={styles.stepContinueTxt}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }

                {currentStep === 2 &&
                    <>
                        <Text style={styles.animalPrefHeader}>Animal Preference</Text>
                        <Text style={styles.animalPrefSubHeader}>
                            Choose among whether you prefer to {'\n'}
                            adopt a dog, a cat, or you prefer to {'\n'}
                            adopt both. To choose, click one of {'\n'}
                            the options below.
                        </Text>

                        <View style={styles.animalOptionsContainer}>
                            <View style={styles.dogOptionContainer}>
                                <TouchableOpacity style={animalPreference === 'Dog' ? styles.chosenOptionBtn : [styles.optionBtn, styles.dogOptionBtn]} onPress={() => preferDog()}>
                                    <Image style={styles.optionImg} source={dogOption} />
                                </TouchableOpacity>

                                <Text style={animalPreference === 'Dog' ? styles.chosenOptionTxt : styles.dogOptionTxt}>Dog</Text>
                            </View>

                            <View style={styles.catOptionContainer}>
                                <TouchableOpacity style={animalPreference === 'Cat' ? styles.chosenOptionBtn : [styles.optionBtn, styles.catOptionBtn]} onPress={() => preferCat()}>
                                    <Image style={styles.optionImg} source={catOption} />
                                </TouchableOpacity>

                                <Text style={animalPreference === 'Cat' ? styles.chosenOptionTxt : styles.catOptionTxt}>Cat</Text>
                            </View>

                            <View style={styles.bothOptionContainer}>
                                <TouchableOpacity style={animalPreference === 'Both' ? styles.chosenOptionBtn : [styles.optionBtn, styles.bothOptionBtn]} onPress={() => preferBoth()}>
                                    <Image style={styles.optionImg} source={bothOption} />
                                </TouchableOpacity>

                                <Text style={animalPreference === 'Both' ? styles.chosenOptionTxt : styles.bothOptionTxt}>Both</Text>
                            </View>
                        </View>

                        <View style={[styles.prevContContainer, styles.thirdPrevContContainer]}>
                            <TouchableOpacity style={styles.prevBtn} onPress={() => goBackToSecondStep()}>
                                <Image style={styles.prevIcon} source={prevIcon} />
                                <Text style={styles.prevTxt}>Back</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.stepContinueBtn} onPress={() => goToFourthStep()}>
                                <Text style={styles.stepContinueTxt}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }

                {currentStep === 3 &&
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

                        <View style={[styles.prevContContainer, styles.thirdPrevContContainer]}>
                            <TouchableOpacity style={styles.prevBtn} onPress={() => goBackToThirdStep()}>
                                <Image style={styles.prevIcon} source={prevIcon} />
                                <Text style={styles.prevTxt}>Back</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.stepContinueBtn} onPress={() => register()}>
                                <Text style={styles.stepContinueTxt}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </ScrollView>
        </SafeAreaView>
    );
} 

const styles = StyleSheet.create({
    body: {
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff'
    },

    returnContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 28,
        marginBottom: 75,
        marginLeft: 38,
    },

    arrowReturn: {
        width: 25,
        height: 25,
        marginTop: 16,
    },

    backText: {
        fontFamily: 'PoppinsRegular',
        fontSize: 13.6,
        marginTop: 18,
        marginLeft: 5,
    },

    registrationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 45,
        marginRight: 38,
        marginBottom: 75,
        marginLeft: 38,
    },

    logoPrefContainer: {
        flexDirection: 'row',
    },

    logoBlack: {
        height: 21,
        width: 21,
    },

    logoPrefTxt: {
        fontFamily: 'PoppinsMedium',
        fontSize: 14,
        marginLeft: 5,
    },

    cancelTxt: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 14,
        color: '#ff3333',
    },

    createAnAccount: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 15,
        marginTop: 65,
        marginLeft: 40,
    },

    labels: {
        fontFamily: 'PoppinsRegular',
        fontSize: 14.5,
        marginLeft: 40,
        marginBottom: 5,
    },

    fullNameTxt: {
        marginTop: 30,
    },

    input: {
        height: 46,
        width: '80%',
        borderColor: '#f1f3f7',
        borderWidth: 3,
        backgroundColor: '#f3f5f9',
        color: '#8c8c8e',
        marginLeft: 40,
        marginBottom: 20,
        fontFamily: 'PoppinsLight',
        fontSize: 13,
        paddingLeft: 10,
        paddingRight: 10,
    },

    inputFocused: {
        height: 46,
        width: '80%',
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: 'black',
        marginLeft: 40,
        marginBottom: 20,
        backgroundColor: 'white',
        fontFamily: 'PoppinsLight',
        fontSize: 13,
        paddingLeft: 10,
        paddingRight: 10,
    },

    continueBtn: {
        backgroundColor: '#111',
        borderRadius: 5,
        borderColor: '#111',
        borderWidth: 1,
        width: 328.8,
        height: 66,
        marginTop: 50,
        marginRight: 'auto',
        marginBottom: 30,
        marginLeft: 'auto',
    },

    continueTxt: {
        textAlign: 'center',
        fontFamily: 'PoppinsBold',
        fontSize: 24.5,
        marginTop: 14,
        color: '#fff',
    },

    step1Header: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 26,
        marginTop: 40,
        marginRight: 40,
        marginLeft: 40,
    },

    step1SubHeader: {
        fontFamily: 'PoppinsLight',
        fontSize: 17,
        lineHeight: 38,
        marginTop: 15,
        marginRight: 40,
        marginLeft: 40,
    },

    prevContContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 80,
        marginRight: 40,
        marginBottom: 50,
        marginLeft: 40,
    },

    prevBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    prevIcon: {
        height: 22,
        width: 22,
    },

    prevTxt: {
        fontFamily: 'PoppinsRegular',
        fontSize: 18,
        marginLeft: 3,
    },

    stepContinueBtn: {
        backgroundColor: '#111',
        borderRadius: 5,
        height: 45,
        width: 140,
    },

    stepContinueTxt: {
        borderRadius: 5,
        color: 'white',
        fontFamily: 'PoppinsMedium',
        fontSize: 18,
        marginTop: 8,
        textAlign: 'center',
    },

    animalPrefHeader: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 23,
        marginTop: 45,
        marginLeft: 40,
    },

    animalPrefSubHeader: {
        fontFamily: 'PoppinsLight',
        fontSize: 16,
        lineHeight: 30,
        marginTop: 5,
        marginRight: 40,
        marginLeft: 40,
    },

    animalOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
        marginRight: 40,
        marginLeft: 40,
    },

    dogOptionContainer: {
        width: '33%',
    },

    dogOptionTxt: {
        textAlign: 'center',
        color: '#808080',
    },

    catOptionContainer: {
        width: '33%',
    },

    catOptionTxt: {
        textAlign: 'center',
        color: '#808080',
    },

    bothOptionContainer: {
        width: '33%',
    },

    bothOptionTxt: {
        textAlign: 'center',
        color: '#808080',
    },

    optionBtn: {
        height: 86,
        width: 86,
        backgroundColor: '#C4C4C4',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 'auto',
        marginBottom: 10,
        marginLeft: 'auto',
    },

    chosenOptionBtn: {
        height: 86,
        width: 86,
        backgroundColor: '#111',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 'auto',
        marginBottom: 10,
        marginLeft: 'auto',
    },

    chosenOptionTxt: {
        color: '#111',
        fontFamily: 'PoppinsMedium',
        textAlign: 'center',
    },

    optionImg: {
        height: 40,
        width: 40,
    },

    thirdPrevContContainer: {
        marginTop: 100, 
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
        textAlign: 'center',
    },
});

export default RegisterUser;