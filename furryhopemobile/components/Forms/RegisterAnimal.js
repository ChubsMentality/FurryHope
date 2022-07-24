import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import { CredentialsContext } from '../CredentialsContext'
import TopNav from '../SubComponents/TopNav'
import BottomNav from '../SubComponents/BottomNav'
import axios from 'axios'
import StepIndicator from 'react-native-step-indicator'
import returnIcon from '../../assets/Icons/returnIcon.svg'
import nextStepIcon from '../../assets/RegisterAnimal/nextStep.svg'
import prevStep from '../../assets/RegisterAnimal/prevStep.svg'
import Ionicons from 'react-native-vector-icons/Ionicons'

const RegisterAnimal = ({ navigation }) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var d = new Date()
    var month = months[d.getMonth()]
    var day = d.getDate()
    var year = d.getFullYear()
    var currentDate = `${month} ${day}, ${year}`
    var d = new Date()
    // console.log(d.toLocaleDateString())

    const [animalType, setAnimalType] = useState('Dog')
    const [registrationType, setRegistrationType] = useState('New')
    const [applicantImg, setApplicantImg] = useState('')
    const [name, setName] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [lengthOfStay, setLengthOfStay] = useState('')
    const [address, setAddress] = useState('')
    const [animalName, setAnimalName] = useState('')
    const [animalBreed, setAnimalBreed] = useState('')
    const [animalAge, setAnimalAge] = useState('')
    const [animalColor, setAnimalColor] = useState('')
    const [tagNo, setTagNo] = useState('')
    const [animalGender, setAnimalGender] = useState('Choose')
    const [date, setDate] = useState(d.toLocaleDateString())
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const [nameFocused, setNameFocused] = useState(false)
    const [emailFocused, setEmailFocused] = useState(false)
    const [contactNoFocused, setContactNoFocused] = useState(false)
    const [lengthOfStayFocused, setLengthOfStayFocused] = useState(false)
    const [addressFocused, setAddressFocused] = useState(false)
    const [animalNameFocused, setAnimalNameFocused] = useState(false)
    const [animalBreedFocused, setAnimalBreedFocused] = useState(false)
    const [animalAgeFocused, setAnimalAgeFocused] = useState(false)
    const [animalColorFocused, setAnimalColorFocused] = useState(false)
    const [tagNoFocused, setTagNoFocused] = useState(false)

    // Step Indicator
    const [currentStep, setCurrentStep] = useState(0)
    const currentStep_0 = currentStep === 0
    const currentStep_1 = currentStep === 1
    const currentStep_2 = currentStep === 2

    // const stepLabels = [`Registration\nProcess` ,`Owner's\nInformation`, `Animal's\nInformation`]
    const stepLabels = [`Owner's\nInformation`, `Animal's\nInformation`]
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

    const goToThirdStep = () => {
        if(!name || !email || !contactNo || !lengthOfStay || !address) {
            alert('Please fill out all the necessary fields')
            return
        } else if(contactNo.match(/[^$,.\d]/)) {
            alert('Invalid Contact Number, Please enter a valid contact number.')
        } else {
            setCurrentStep(1)
        }
    }

    const submit = async () => {
        setLoading(true)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedCredentials.token}`
            }
        }

        if(!animalName || !animalBreed || !animalAge || !animalColor || !email) {
            alert('Please fill out all the necessary fields')
            setLoading(false)
            return
        } else if(animalGender === 'Choose') {
            alert('Please choose an appropriate sex of the animal')
            setLoading(false)
            return
        } else {
            try {
                const { data } = await axios.post('http://localhost:5000/api/users/registerAnimal', {
                    animalType, registrationType, applicantImg, name, contactNo, lengthOfStay, address,
                    animalName, animalBreed, animalAge, animalColor, animalGender, tagNo, date, email
                }, config)

                alert('Submitted the Registration, Check your emails for updates soon.')
                console.log(data)
            } catch (error) {
                console.log(error)
                alert(error)                
            }
        }

        setLoading(false)
        setAnimalType('Dog')
        setRegistrationType('New')
        setName('')
        setContactNo('')
        setLengthOfStay('')
        setAddress('')
        setAnimalName('')
        setAnimalBreed('')
        setAnimalAge('')
        setAnimalColor('')
        setAnimalGender('Choose')
        setEmail('')
        setTimeout(() => {
            setCurrentStep(0)
        }, 2000)
    }

    useEffect(() => {
        setApplicantImg(storedCredentials.profilePicture)
        setName(storedCredentials.fullName)
        setEmail(storedCredentials.email)
        setContactNo(storedCredentials.contactNo)
        setAddress(storedCredentials.address)
    }, [])
    
    return (
        <SafeAreaView style={styles.body}>
            <ScrollView>
                <TopNav ScreenName='Pet Registration' />

                <View style={{ marginTop: 50 }}></View>                
                <StepIndicator 
                    customStyles={stepIndicatorStyle}
                    currentPosition={currentStep}
                    labels={stepLabels}
                    stepCount={2}
                    style={styles.stepIndicator}
                />

                {currentStep_0 &&
                    <View style={styles.secondStep}>
                        {/* <Text style={styles.dateLabel}>DATE: <Text style={styles.dateValue}>{currentDate}</Text></Text> */}

                        <Text style={[styles.radioBtnsContainerLabel, { marginTop: 35 }]}>Type of Animal</Text>
                        <View style={styles.radioBtns}>
                            <View style={styles.dogRadioBtn}>
                                <Text style={styles.radioBtnLabel}>Dog</Text>
                                <RadioButton 
                                    value='Dog'
                                    status={ animalType === 'Dog' ? 'checked' : 'unchecked'}
                                    onPress={() => setAnimalType('Dog')}
                                    color='#111'
                                    uncheckedColor='#aaa'
                                />
                            </View>

                            <View style={styles.catRadioBtn}>
                                <Text style={styles.radioBtnLabel}>Cat</Text>
                                <RadioButton 
                                    value='Cat'
                                    status={ animalType === 'Cat' ? 'checked' : 'unchecked'}
                                    onPress={() => setAnimalType('Cat')}
                                    color='#111'
                                    uncheckedColor='#aaa'
                                />
                            </View>
                        </View>

                        <Text style={[styles.radioBtnsContainerLabel, { marginTop: 20, }]}>Registration Type</Text>
                        <View style={styles.radioBtns}>
                            <View style={styles.newRadioBtn}>
                                <Text style={styles.radioBtnLabel}>New</Text>
                                <RadioButton 
                                    value='New'
                                    status={ registrationType === 'New' ? 'checked' : 'unchecked'}
                                    onPress={() => setRegistrationType('New')}
                                    color='#111'
                                    uncheckedColor='#aaa'
                                />
                            </View>

                            <View style={styles.renewRadioBtn}>
                                <Text style={styles.radioBtnLabel}>Renewal</Text>
                                <RadioButton 
                                    value='Renewal'
                                    status={ registrationType === 'Renewal' ? 'checked' : 'unchecked'}
                                    onPress={() => setRegistrationType('Renewal')}
                                    color='#111'
                                    uncheckedColor='#aaa'
                                />
                            </View>
                        </View>

                        <Text style={[styles.formLabel, styles.nameLabel]}>Name of Owner</Text>
                        <TextInput 
                            style={nameFocused ? styles.formInputFocused : styles.formInput}
                            value={name}
                            onChangeText={setName}
                            onFocus={() => setNameFocused(true)}
                            onBlur={() => setNameFocused(false)}
                        />

                        <Text style={styles.formLabel}>Email</Text>
                        <TextInput 
                            style={emailFocused ? styles.formInputFocused : styles.formInput}
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}
                        />

                        <Text style={styles.formLabel}>Contact Number</Text>
                        <TextInput 
                            style={contactNoFocused ? styles.formInputFocused : styles.formInput}
                            keyboardType='numeric'
                            value={contactNo}
                            onChangeText={setContactNo}
                            maxLength={11}
                            onFocus={() => setContactNoFocused(true)}
                            onBlur={() => setContactNoFocused(false)}
                        />

                        <Text style={styles.formLabel}>Address</Text>
                        <TextInput 
                            style={addressFocused ? styles.formInputFocused : styles.formInput}
                            value={address}
                            onChangeText={setAddress}
                            onFocus={() => setAddressFocused(true)}
                            onBlur={() => setAddressFocused(false)}
                        />

                        <Text style={styles.formLabel}>Length of Stay in the City</Text>
                        <TextInput 
                            style={lengthOfStayFocused ? styles.formInputFocused : styles.formInput}
                            value={lengthOfStay}
                            onChangeText={setLengthOfStay}
                            onFocus={() => setLengthOfStayFocused(true)}
                            onBlur={() => setLengthOfStayFocused(false)}
                        />

                        <View style={styles.petRegistrationContainer}>
                            <Text style={styles.petRegReqHeader}>
                                Requirements for registering a pet:
                                </Text>
                            <Text style={styles.petRegRequirements}>
                                <Ionicons name='ios-paw-sharp' color='white' size={13} style={{ marginRight: 7 }} />
                                Registration fee of ₱ 75.00
                                </Text>
                            <Text style={styles.petRegRequirements}>
                                <Ionicons name='ios-paw-sharp' color='white' size={13} style={{ marginRight: 7 }} />
                                Certificate of Residency issued by barangay or any valid ID.
                                </Text>
                            <Text style={styles.petRegRequirements}>
                                <Ionicons name='ios-paw-sharp' color='white' size={13} style={{ marginRight: 7 }} />
                                Two (2) pcs of 2x2 picture of owner
                            </Text>
                            <Text style={styles.petRegRequirements}>
                                <Ionicons name='ios-paw-sharp' color='white' size={13} style={{ marginRight: 7 }} />
                                Photo of the pet in 3R size (Whole body, Side view)
                            </Text>
                            <Text style={styles.petRegRequirements}>
                                <Ionicons name='ios-paw-sharp' color='white' size={13} style={{ marginRight: 7 }} />
                                Certificate or proof of Anti-Rabies Vaccination
                            </Text>
                            <Text style={styles.petRegRequirements}>
                                <Ionicons name='ios-paw-sharp' color='white' size={13} style={{ marginRight: 7 }} />
                                Photocopy of the certificate that the pet has already been vaccinated for anti-rabies.
                            </Text>
                        </View>

                        
                            {/* <TouchableOpacity style={styles.prevStepBtn} onPress={() => setCurrentStep(0)}>
                                <Image style={styles.prevStepIcon} source={prevStep} />
                                <Text style={styles.prevStepText}>PREVIOUS</Text>
                            </TouchableOpacity> */}

                            <TouchableOpacity style={styles.nextStepBtn} onPress={() => goToThirdStep()}>
                                <Text style={styles.nextStepText}>NEXT</Text>
                            </TouchableOpacity>
                        
                    </View>
                }

                {currentStep_1 &&
                    <View style={styles.thirdStep}>
                        <Text style={[styles.formLabel, styles.animalNameLabel]}>Animal's Name</Text>
                        <TextInput 
                            style={animalNameFocused ? styles.formInputFocused : styles.formInput}
                            value={animalName}
                            onChangeText={setAnimalName}
                            onFocus={() => setAnimalNameFocused(true)}
                            onBlur={() => setAnimalNameFocused(false)}
                        />

                        <Text style={styles.formLabel}>Animal's Breed</Text>
                        <TextInput 
                            style={animalBreedFocused ? styles.formInputFocused : styles.formInput}
                            value={animalBreed}
                            onChangeText={setAnimalBreed}
                            onFocus={() => setAnimalBreedFocused(true)}
                            onBlur={() => setAnimalBreedFocused(false)}
                        />

                        <Text style={styles.formLabel}>Age</Text>
                        <TextInput 
                            style={animalAgeFocused ? styles.formInputFocused : styles.formInput}
                            value={animalAge}
                            onChangeText={setAnimalAge}
                            onFocus={() => setAnimalAgeFocused(true)}
                            onBlur={() => setAnimalAgeFocused(false)}
                        />

                        <Text style={styles.formLabel}>Color</Text>
                        <TextInput 
                            style={animalColorFocused ? styles.formInputFocused : styles.formInput}
                            value={animalColor}
                            onChangeText={setAnimalColor}
                            onFocus={() => setAnimalColorFocused(true)}
                            onBlur={() => setAnimalColorFocused(false)}
                        />

                        <Text style={styles.formLabel}>Tag No.</Text>
                        <TextInput 
                            style={tagNoFocused ? styles.formInputFocused : styles.formInput}
                            value={tagNo}
                            onChangeText={setTagNo}
                            onFocus={() => setTagNoFocused(true)}
                            onBlur={() => setTagNoFocused(false)}
                        />

                        <Text style={styles.formLabel}>Gender</Text>
                        <Picker
                            itemStyle={styles.animalSexPickerLabel}
                            style={styles.animalSexPicker}
                            selectedValue={animalGender}
                            onValueChange={(itemValue, itemIndex) =>
                                setAnimalGender(itemValue)
                            }
                        >
                            <Picker.Item label='Choose' value='Choose' />
                            <Picker.Item label='Male' value='Male' />
                            <Picker.Item label='Female' value='Female' />
                        </Picker>
                        
                        <View style={styles.stepBtns}>
                            <TouchableOpacity style={styles.prevStepBtn} onPress={() => setCurrentStep(0)}>
                                <Image style={styles.prevStepIcon} source={prevStep} />
                                <Text style={styles.prevStepText}>PREVIOUS</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.submitBtn} onPress={() => submit()}>
                                {
                                    loading ? 
                                        <ActivityIndicator color='white' style={{ marginTop: '14px' }} />
                                    :
                                        <Text style={styles.submitBtnText}>SUBMIT</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </ScrollView>

            <BottomNav />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        flex: 1,
    },

    formLabel: {
        fontFamily: 'PoppinsRegular',
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 35,
    },

    formInput: {
        height: 45,
        width: '83%',
        borderRadius: 5,
        borderColor: '#f1f3f7',
        borderWidth: 3,
        backgroundColor: '#f3f5f9',
        color: '#8c8c8e',
        fontFamily: 'PoppinsRegular',
        fontSize: 13,
        marginBottom: 25,
        marginLeft: 35,
        paddingLeft: 10,
        paddingRight: 10,
    },

    formInputFocused: {
        height: 45,
        width: '83%',
        borderColor: '#111',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        fontFamily: 'PoppinsRegular',
        fontSize: 13,
        marginBottom: 25,
        marginLeft: 35,
        paddingLeft: 10,
        paddingRight: 10,
    },

    formInputAddress: {
        borderColor: '#111',
        borderStyle: 'solid',
        borderWidth: 1,
        width: '77%',
        height: 100,
        fontFamily: 'PoppinsRegular',
        marginBottom: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingTop: 5,
        paddingRight: 7,
        paddingBottom : 5,
        paddingLeft: 7,
    },

    formInputHalf: {
        borderColor: '#111',
        borderStyle: 'solid',
        borderWidth: 1,
        width: '43.5%',
        height: 40,
        fontFamily: 'PoppinsRegular',
        marginBottom: 20,
        marginRight: 46,
        marginLeft: 46,
        paddingTop: 5,
        paddingRight: 7,
        paddingBottom : 5,
        paddingLeft: 7,
    },

    nameLabel: {
        marginTop: 50,
    },

    dateLabel: {
        fontFamily: 'PoppinsMedium',
        fontSize: 16,
        marginTop: 40,
        marginBottom: 15,
        marginLeft: 46
    },

    dateValue: {
        fontFamily: 'PoppinsLight',
        fontSize: 16,
        marginLeft: 5,
    },

    radioBtnsContainerLabel: {
        marginBottom: 5,
        marginLeft: 35,
        fontSize: 16,
        fontFamily: 'PoppinsMedium',
    },

    radioBtns: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 35,
    },

    radioBtnLabel: {
        fontFamily: 'PoppinsExtraLight',
        fontSize: 14,
    },

    dogRadioBtn: {
        display: 'flex',
        flexDirection: 'row'
    },

    catRadioBtn: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 5,
    },

    newRadioBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    renewRadioBtn: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 3,
        alignItems: 'center',
    },

    radioBtnLabel: {
        marginTop: 5,
        fontFamily: 'PoppinsRegular',
        fontSize: 16,
    },

    nextStepBtn: {
        // width: 130,
        // height: 45,
        width: 133,
        height: 48,
        backgroundColor: '#111',
        borderRadius: 5,
        backgroundColor: '#111',
        borderRadius: 5,
        marginTop: 80,
        marginRight: 35,
        marginBottom: 130,
        marginLeft: 'auto',
        // paddingTop: 9,
        // paddingRight: 28,
        // paddingBottom: 9,
        // paddingLeft: 28,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    nextStepText: {
        fontFamily: 'PoppinsRegular',
        fontSize: 24,
        color: 'white',
    },

    animalNameLabel: {
        marginTop: 50,
    },

    animalSexPicker: {
        width: '43.5%',
        height: 40,
        marginLeft: 35,
        paddingTop: 5,
        paddingRight: 7,
        paddingBottom: 5,
        paddingLeft: 7
    },

    animalSexPickerLabel: {
        fontFamily: 'PoppinsRegular',
    },

    stepBtns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 90,
        marginRight: 35,
        marginBottom: 110,
        marginLeft: 35,
    },

    firstButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },

    prevStepBtn: {
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#111',
        width: 133,
        height: 48,
    },

    prevStepIcon: {
        width: 20,
        height: 20,
    },

    prevStepText: {
        fontFamily: 'PoppinsMedium',
        fontSize: 16,
        marginLeft: 5,
    },

    submitBtn: {
        width: 133,
        height: 48,
        backgroundColor: '#111',
        borderRadius: 5,
    },

    submitBtnText: {
        fontFamily: 'PoppinsMedium',
        fontSize: 21,
        letterSpacing: 2,
        textAlign: 'center',
        color: 'white',
        marginTop: 7,
    },

    // 

    petRegistrationContainer: {
        backgroundColor: '#111',
        padding: 20,
        marginTop: 40,
        overflow: 'hidden',
        borderRadius: 5,
        marginRight: 35,
        marginLeft: 35,
        paddingTop: 30,
        paddingBottom: 30
    },

    petRegReqHeader: {
        fontFamily: 'PoppinsMedium',
        color: 'white',
        fontSize: 25,
        marginBottom: 8,
    },

    petRegRequirements: {
        color: 'white',
        fontFamily: 'PoppinsExtraLight',
        fontSize: 13.5,
        marginTop: 10,
        lineHeight: 30
    },
})

export default RegisterAnimal