import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { CredentialsContext } from '../CredentialsContext'
import * as DocumentPicker from 'expo-document-picker'
import axios from 'axios'
import returnIcon from '../../assets/arrowLeft.png'

const AdoptionForm = ({ route, navigation }) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)
    const d = new Date()
    const { animalId } = route.params

    const [adopterName, setAdopterName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [address, setAddress] = useState('')  
    const [animalName, setAnimalName] = useState('')
    const [animalBreed, setAnimalBreed] = useState('')
    const [animalType, setAnimalType] = useState('')
    const [animalGender, setAnimalGender] = useState('')
    const [animalColor, setAnimalColor] = useState('')
    const [animalImg, setAnimalImg] = useState('')
    const [validId, setValidId] = useState()
    const [fileName, setFileName] = useState()
    const [date, setDate] = useState(d.toLocaleDateString())
    const [loading, setLoading] = useState(false)

    const applicationStatus = 'Pending'

    // update adoption status to 'Pending'
    const adoptionStatus = 'Pending'

    const getAnimalById = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/animals/${animalId}`)
        console.log(data)

        setAnimalName(data.name)
        setAnimalBreed(data.breed)
        setAnimalType(data.type)
        setAnimalGender(data.gender)
        setAnimalColor(data.color)
        setAnimalImg(data.animalImg)
    }

    useEffect(() => {
        getAnimalById()
    }, [animalId])

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: true, base64: true})
            .then((response) => {
                if(response.type = 'success') {

                    let { name, uri, size } = response
                    let nameParts = name.split('.')
                    let fileType = nameParts[nameParts.length - 1]

                    var fileToUpload = {
                        name: name,
                        size: size,
                        uri: uri,
                        type: 'application/' + fileType
                    }

                    console.log(fileToUpload)
                    uploadHandler(fileToUpload.uri)
                    setFileName(fileToUpload.name)  
                }
            })
    }

    const uploadHandler = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'furryhopeimg')
        data.append('cloud_name', 'drvd7jh0b')
        fetch('https://api.cloudinary.com/v1_1/drvd7jh0b/image/upload', {
            method: 'post',
            body: data,
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            let response = data.url
            setValidId(response)
            console.log(response)
        })
        .catch((error) => {
            console.log(error)    
        })
        
    }

    const submit = async () => {
        setLoading(true)

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedCredentials.token}`
            }
        }

        if(!adopterName || !email || !contactNo || !address) {
            alert('Please fill out all the necessary fields')
            setLoading(false)
            return
        } else if(contactNo.match(/[^$,.\d]/)) {
            alert('Invalid contact number, please enter a valid contact number.')
            setLoading(false)
            return 
        } else {
            try {
                const data = await axios.post('http://localhost:5000/api/users/submitAdoption', {
                    animalId, adopterName, email, contactNo, address, validId, animalName, animalBreed,
                    animalType, animalGender, animalColor, animalImg, adoptionStatus, applicationStatus, date
                }, config)

                console.log(data)
                alert('Successfully submitted, check your profile to see your adoptions.')
            } catch (error) {
                console.log(error)
                alert(error)
            }

            try {                
                const data = await axios.put(`http://localhost:5000/api/admins/updateAdoptionStatus/${animalId}`, { adoptionStatus })
                // console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        setAdopterName('')
        setEmail('')
        setContactNo('')
        setAddress('')
        setLoading(false)

        setTimeout(() => {
            navigation.navigate('View Animals')
        }, 500)
    }

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Image style={styles.icon} source={returnIcon}/>
                    <Text style={styles.backBtnText}>Back</Text>
                </TouchableOpacity>
                
                <View style={styles.paddedView}>
                    <Text style={styles.header}>ADOPTION FORM</Text>
                    <View style={styles.headerUnderline}></View>

                    <Text style={styles.dateLabel}>Date:
                        <Text style={styles.dateValue}>{d.toLocaleDateString()}</Text>
                    </Text>

                    <Text style={styles.adopterInfoHeader}>Adopter's Information</Text>
                    <Text style={styles.adopterInfoLabel}>Adopter's Name</Text>
                    <TextInput
                        style={styles.adopterInfoInput}
                        value={adopterName}
                        onChangeText={setAdopterName} 
                    />

                    <Text style={styles.adopterInfoLabel}>Email Address</Text>
                    <TextInput
                        style={styles.adopterInfoInput}
                        value={email}
                        onChangeText={setEmail} 
                    />

                    <Text style={styles.adopterInfoLabel}>Contact Number</Text>
                    <TextInput
                        style={styles.adopterInfoInput}
                        keyboardType='numeric'
                        value={contactNo}
                        onChangeText={setContactNo} 
                        maxLength={11}
                    />
                    
                    <Text style={styles.adopterInfoLabel}>Address</Text>
                    <TextInput
                        style={styles.adopterInfoInput_address}
                        value={address}
                        onChangeText={setAddress}
                        multiline={7}
                    />

                    <Text style={styles.adopterInfoLabel}>Please attach your valid Id</Text>
                    <View style={styles.chooseFileContainer}>
                        <TouchableOpacity style={styles.chooseFileBtn} onPress={() => pickDocument()}>
                            <Text style={styles.chooseFileText}>Choose File</Text>
                        </TouchableOpacity>

                        <Text style={styles.fileName}>{fileName}</Text>
                    </View>

                    <Text style={styles.animalInfoHeader}>Animal's Information</Text>
                    <Text style={styles.animalInfoLabel}>Animal's Name</Text>
                    <View style={styles.animalInfoInput}>
                        <Text style={styles.animalInfoInputText}>{animalName}</Text>
                    </View>

                    <Text style={styles.animalInfoLabel}>Animal's Breed</Text>
                    <View style={styles.animalInfoInput}>
                        <Text style={styles.animalInfoInputText}>{animalBreed}</Text>
                    </View>

                    <Text style={styles.animalInfoLabel}>Animal Type</Text>
                    <View style={styles.animalInfoInputHalf}>
                        <Text style={styles.animalInfoInputText}>{animalType}</Text>
                    </View>

                    <Text style={styles.animalInfoLabel}>Gender</Text>
                    <View style={styles.animalInfoInputHalf}>
                        <Text style={styles.animalInfoInputText}>{animalGender}</Text>
                    </View>

                    <Text style={styles.animalInfoLabel}>Color</Text>
                    <View style={styles.animalInfoInputHalf}>
                        <Text style={styles.animalInfoInputText}>{animalColor}</Text>
                    </View>

                    <TouchableOpacity style={styles.submitBtn} onPress={() => submit()}>
                        {loading ?
                                <ActivityIndicator color='white' style={{ marginTop: '14px' }} />
                            :
                                <Text style={styles.submitBtnText}>SUBMIT</Text>
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AdoptionForm

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
    },

    paddedView: {
        paddingLeft: 45,
        paddingRight: 45,
    },

    backBtn: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25,
        marginBottom: 60,
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

    header: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 25,
    },

    dateLabel: {
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
        marginTop: 5,

    },

    dateValue: {
        fontFamily: 'Poppins_300Light',
        fontSize: 16,
        marginLeft: 5,
    },

    adopterInfoHeader: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFF9B5',
        fontFamily: 'Poppins_300Light',
        fontSize: 11,
        marginTop: 40,
        marginBottom: 10,
        paddingTop: 3,
        paddingRight: 7,
        paddingBottom: 3,
        paddingLeft: 7,
    },

    adopterInfoLabel: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        marginBottom: 3,
    },

    adopterInfoInput: {
        width: '100%',
        height: 40,
        borderColor: '#b0b0b0',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 15,
        paddingTop: 5,
        paddingRight: 7,
        paddingBottom : 5,
        paddingLeft: 7,
    },

    adopterInfoInput_address: {
        width: '100%',
        height: 100,
        borderColor: '#b0b0b0',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 15,
        paddingTop: 5,
        paddingRight: 7,
        paddingBottom : 5,
        paddingLeft: 7,
    },

    chooseFileContainer: {
        display: 'flex',
    },

    chooseFileBtn: {
        borderWidth: .5,
        borderColor: '#000',
        borderStyle: 'solid',
        marginTop: 3,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        alignSelf: 'flex-start',
    },

    chooseFileText: {
        color: '#000',
    },

    fileName: {
        color: 'green',
        fontFamily: 'Poppins_300Light',
        marginTop: 10,
    },

    animalInfoHeader: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFF9B5',
        fontFamily: 'Poppins_300Light',
        fontSize: 11,
        marginTop: 40,
        marginBottom: 10,
        paddingTop: 3,
        paddingRight: 7,
        paddingBottom: 3,
        paddingLeft: 7,
    },

    animalInfoLabel: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        marginBottom: 3,
    },

    animalInfoInput: {
        width: '100%',
        height: 40,
        borderColor: '#b0b0b0',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 15,
        paddingTop: 10,
        paddingRight: 7,
        paddingLeft: 7,
    },

    animalInfoInputHalf: {
        width: '50%',
        height: 40,
        borderColor: '#b0b0b0',
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 15,
        paddingTop: 10,
        paddingRight: 7,
        paddingLeft: 7,
    },

    animalInfoInputText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
    },

    submitBtn: {
        width: '100%',
        height: 50,
        backgroundColor: '#111',
        marginTop: 80,
        marginBottom: 20,
    },

    submitBtnText: {
        color: 'white',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 21,
        letterSpacing: 2,
        textAlign: 'center',
        marginTop: 8,
    },
})
