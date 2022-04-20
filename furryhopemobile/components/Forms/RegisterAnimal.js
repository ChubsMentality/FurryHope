import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import { CredentialsContext } from '../CredentialsContext'
import BottomNav from '../SubComponents/BottomNav'
import axios from 'axios'
import StepIndicator from 'react-native-step-indicator'
import returnIcon from '../../assets/Icons/returnIcon.svg'
import nextStepIcon from '../../assets/RegisterAnimal/nextStep.svg'
import prevStep from '../../assets/RegisterAnimal/prevStep.svg'
import pawBlack from '../../assets/AnimalCare/text-paw-unfilled-black.svg'

const RegisterAnimal = ({ navigation }) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    /*
    // Testing
    const getRegistration = async () => {
        // We will pass this config object containing the user's token for the authentication in the backend
        // It's used in authMiddleware.js
        const config = {
            headers: {
                Authorization: `Bearer ${storedCredentials.token}`
            }
        }

        const { data } = await axios.get('http://localhost:5000/api/users/getSpecificRegistrations', config)
        console.log(data)
    }

    useEffect(() => {
        getRegistration()
    }, [])
    */

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    var d = new Date()
    var month = months[d.getMonth()]
    var day = d.getDate()
    var year = d.getFullYear()
    var currentDate = `${month} ${day}, ${year}`

    const [animalType, setAnimalType] = useState('Dog')
    const [registrationType, setRegistrationType] = useState('New')
    const [name, setName] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [lengthOfStay, setLengthOfStay] = useState('')
    const [address, setAddress] = useState('')
    const [animalName, setAnimalName] = useState('')
    const [animalBreed, setAnimalBreed] = useState('')
    const [animalAge, setAnimalAge] = useState('')
    const [animalColor, setAnimalColor] = useState('')
    const [animalSex, setAnimalSex] = useState('Choose')
    const [date, setDate] = useState(d.toLocaleDateString())
    const [loading, setLoading] = useState(false)

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
        if(!name || !contactNo || !lengthOfStay || !address) {
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

        if(!animalName || !animalBreed || !animalAge || !animalColor) {
            alert('Please fill out all the necessary fields')
            setLoading(false)
            return
        } else if(animalSex === 'Choose') {
            alert('Please choose an appropriate sex of the animal')
            setLoading(false)
            return
        } else {
            try {
                const { data } = await axios.post('http://localhost:5000/api/users/registerAnimal', {
                    animalType, registrationType, name, contactNo, lengthOfStay, address,
                    animalName, animalBreed, animalAge, animalColor, animalSex, date
                }, config)

                console.log(data)
            } catch (error) {
                console.log(error)
                alert(error)                
            }

            /*
                fetch format
                
                axios.post('http://192.168.1.10:5000/api/users/registerAnimal', {
                    animalType, registrationType, name, contactNo, lengthOfStay, address,
                    animalName, animalBreed, animalAge, animalColor, animalSex, date
                }, config)
                    .then((response) => {
                        console.log(response)
                        alert('Successfully submited your registration')
                    })
                    .catch((error) => {
                        alert(error)
                        console.log(error)
                    })
            */
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
        setAnimalSex('Choose')
        setTimeout(() => {
            setCurrentStep(0)
        }, 2000)
    }
    
    return (
        <SafeAreaView style={styles.body}>
            <ScrollView>
                <View style={styles.backBtn}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={styles.icon} source={returnIcon}/>
                    </TouchableOpacity>

                    <Text style={styles.backBtnText}>Back</Text>
                </View>

                <StepIndicator 
                    customStyles={stepIndicatorStyle}
                    currentPosition={currentStep}
                    labels={stepLabels}
                    stepCount={2}
                    style={styles.stepIndicator}
                />

                {currentStep_0 &&
                    <View style={styles.secondStep}>
                        <Text style={styles.dateLabel}>DATE: <Text style={styles.dateValue}>{currentDate}</Text></Text>

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
                            style={styles.formInput}
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.formLabel}>Contact Number</Text>
                        <TextInput 
                            style={styles.formInput}
                            keyboardType='numeric'
                            value={contactNo}
                            onChangeText={setContactNo}
                            maxLength={11}
                        />

                        <Text style={styles.formLabel}>Length of Stay in the City</Text>
                        <TextInput 
                            style={styles.formInput}
                            value={lengthOfStay}
                            onChangeText={setLengthOfStay}
                        />

                        <Text style={styles.formLabel}>Address</Text>
                        <TextInput 
                            style={styles.formInputAddress}
                            value={address}
                            onChangeText={setAddress}
                            multiline={true}
                            numberOfLines={5}
                        />

                        <View style={[styles.stepBtns, styles.firstButtons]}>
                            {/* <TouchableOpacity style={styles.prevStepBtn} onPress={() => setCurrentStep(0)}>
                                <Image style={styles.prevStepIcon} source={prevStep} />
                                <Text style={styles.prevStepText}>PREVIOUS</Text>
                            </TouchableOpacity> */}

                            <TouchableOpacity style={styles.goToThirdStep} onPress={() => goToThirdStep()}>
                                <Text style={styles.nextStepText}>NEXT</Text>
                                <Image style={styles.nextStepIcon} source={nextStepIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                {currentStep_1 &&
                    <View style={styles.thirdStep}>
                        <Text style={[styles.formLabel, styles.animalNameLabel]}>Animal's Name</Text>
                        <TextInput 
                            style={styles.formInput}
                            value={animalName}
                            onChangeText={setAnimalName}
                        />

                        <Text style={styles.formLabel}>Animal's Breed</Text>
                        <TextInput 
                            style={styles.formInput}
                            value={animalBreed}
                            onChangeText={setAnimalBreed}
                        />

                        <Text style={styles.formLabel}>Age</Text>
                        <TextInput 
                            style={styles.formInputHalf}
                            value={animalAge}
                            onChangeText={setAnimalAge}
                        />

                        <Text style={styles.formLabel}>Color</Text>
                        <TextInput 
                            style={styles.formInputHalf}
                            value={animalColor}
                            onChangeText={setAnimalColor}
                        />

                        <Text style={styles.formLabel}>Sex</Text>
                        <Picker
                            itemStyle={styles.animalSexPickerLabel}
                            style={styles.animalSexPicker}
                            selectedValue={animalSex}
                            onValueChange={(itemValue, itemIndex) =>
                                setAnimalSex(itemValue)
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
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        marginBottom: 4,
        marginLeft: 46,
    },

    formInput: {
        borderColor: '#111',
        borderStyle: 'solid',
        borderWidth: 1,
        width: '77%',
        height: 40,
        fontFamily: 'Poppins_400Regular',
        marginBottom: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingTop: 5,
        paddingRight: 7,
        paddingBottom : 5,
        paddingLeft: 7,
    },

    formInputAddress: {
        borderColor: '#111',
        borderStyle: 'solid',
        borderWidth: 1,
        width: '77%',
        height: 100,
        fontFamily: 'Poppins_400Regular',
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
        fontFamily: 'Poppins_400Regular',
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

    backBtn: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25,
        marginBottom: 70,
        marginLeft: 20,
    },

    icon: {
        width: 23,
        height: 23,
    },

    backBtnText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14.5,
        marginTop: 2,
        marginLeft: 7,
    },

    firstStepHeader: {
        borderRadius: 25,
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        backgroundColor: '#FFF9B5',
        alignSelf: 'flex-start',
        marginTop: 50,
        marginBottom: 5,
        marginLeft: 35,
        paddingTop: 3,
        paddingRight: 7,
        paddingBottom: 3,
        paddingLeft: 7,
    },

    firstStepSubHeader: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 15,
        lineHeight: 26,
        marginRight: 40,
        marginLeft: 40,
    },

    reqHeader: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 15,
        marginTop: 35,
        marginLeft: 40,
    },

    reqContent: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 40,
        marginLeft: 40,
    },

    pawFilled: {
        width: 18,
        height: 15,
        marginTop: 12,
    },

    requirements: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        marginTop: 10,
        marginLeft: 5,
    },


    dateLabel: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
        marginTop: 40,
        marginBottom: 15,
        marginLeft: 46
    },

    dateValue: {
        fontFamily: 'Poppins_300Light',
        fontSize: 16,
        marginLeft: 5,
    },

    radioBtns: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 46,
    },

    radioBtnLabel: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
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
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
    },

    nextStepBtn: {
        width: 130,
        height: 45,
        backgroundColor: '#111',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        paddingTop: 5,
        marginTop: 70,
        marginRight: 46,
        marginBottom: 110
    },

    nextStepText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 23,
        color: 'white',
        marginLeft: 10,
    },

    nextStepIcon: {
        width: 30,
        height: 30,
        marginTop: 2,
        marginRight: 10,
    },

    goToThirdStep: {
        width: 130,
        height: 45,
        backgroundColor: '#111',
        borderRadius: 5,
        paddingTop: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    animalNameLabel: {
        marginTop: 50,
    },

    animalSexPicker: {
        width: '43.5%',
        height: 40,
        marginLeft: 46,
        paddingTop: 5,
        paddingRight: 7,
        paddingBottom: 5,
        paddingLeft: 7
    },

    animalSexPickerLabel: {
        fontFamily: 'Poppins_400Regular',
    },

    stepBtns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 90,
        marginRight: 46,
        marginBottom: 110,
        marginLeft: 46,
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
        justifyContent: 'space-around',
        paddingTop: 7,
    },

    prevStepIcon: {
        width: 25,
        height: 25,
        marginTop: 2,
    },

    prevStepText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 18,
        marginLeft: 5,
    },

    submitBtn: {
        width: 133,
        height: 48,
        backgroundColor: '#111',
        borderRadius: 5,
    },

    submitBtnText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 21,
        letterSpacing: 2,
        textAlign: 'center',
        color: 'white',
        marginTop: 7,
    },
})

export default RegisterAnimal

            /* {currentStep_0 &&
                    <View style={styles.firstStep}>
                        <Text style={styles.firstStepHeader}>Animal Registration</Text>
                        <Text style={styles.firstStepSubHeader}>
                            Register your animal to the City Veterinary{'\n'}
                            Office. To register your animals there{'\n'}
                            are requirements needed to process the{'\n'}
                            registration of your pet.
                        </Text>

                        <Text style={styles.reqHeader}>Requirements</Text>

                        <View style={styles.reqContent}>
                            <Image style={styles.pawFilled} source={pawBlack} />
                            <Text style={styles.requirements}>
                                Application from CVO (City Veterinary Office)
                            </Text>
                        </View>

                        <View style={styles.reqContent}>
                            <Image style={styles.pawFilled} source={pawBlack} />
                            <Text style={styles.requirements}>
                                Certificate of residency issued by the barangay{'\n'}
                                or any valid id 
                            </Text>
                        </View>

                        <View style={styles.reqContent}>
                            <Image style={styles.pawFilled} source={pawBlack} />
                            <Text style={styles.requirements}>
                                Two (2) pieces of 2x2 picture of owner
                            </Text>
                        </View>

                        <View style={styles.reqContent}>
                            <Image style={styles.pawFilled} source={pawBlack} />
                            <Text style={styles.requirements}>
                                Photo of the animal (3R in size, side-view and {'\n'}
                                whole body)
                            </Text>
                        </View>

                        <View style={styles.reqContent}>
                            <Image style={styles.pawFilled} source={pawBlack} />
                            <Text style={styles.requirements}>
                                Registration fee of 75 pesos
                            </Text>
                        </View>
                        
                        <View style={styles.reqContent}>
                            <Image style={styles.pawFilled} source={pawBlack} />
                            <Text style={styles.requirements}>
                                Photocopy of the vaccination certificate that{'\n'}
                                proves that the animal is already vaccinated
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.nextStepBtn} onPress={() => setCurrentStep(1)}>
                            <Text style={styles.nextStepText}>NEXT</Text>
                            <Image style={styles.nextStepIcon} source={nextStepIcon} />
                        </TouchableOpacity>
                    </View>
                } */
