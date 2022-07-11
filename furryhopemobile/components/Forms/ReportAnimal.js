import React, { useState, useEffect } from 'react'
import axios from 'axios'
import returnIcon from '../../assets/ReportAnimal/returnIcon-white.svg'
import cameraIcon from '../../assets/ReportAnimal/camera-icon.png'
import galleryIcon from '../../assets/ReportAnimal/gallery-icon.png'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import BottomNav from '../SubComponents/BottomNav'

const ReportAnimal = () => {
    const navigation = useNavigation()
    const [description, setDescription] = useState('')
    const [img, setImg] = useState('http://res.cloudinary.com/drvd7jh0b/image/upload/v1640256598/hyr5slabmcd9zf8xddrv.png')
    const [image, setImage] = useState('')
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false)
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('The location is still being identified')
    const [userLocation, setUserLocation] = useState('')
    const [googleApiKey, setGoogleApiKey] = useState('')

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync()

        if(!enabled) {
            Alert.alert(
                'Location Service is not enabled',
                'Please enable your location services to continue',
                [{ text: 'OK' }],
                { cancelable: false }
            )
        } else {
            setLocationServiceEnabled(true)
        }
    }

    // const getCurrentLocation = async () => {
    //     // Location.setGoogleApiKey('AIzaSyCLNKnr-vbq5V32GjiJf4CUlmSNhzu4itM')
    //     let { status } = await Location.requestForegroundPermissionsAsync();

    //     if (status !== 'granted') {
    //         Alert.alert(
    //         'Permission not granted',
    //         'Allow the app to use location service.',
    //         [{ text: 'OK' }],
    //         { cancelable: false }
    //         );
    //     }

    //     let { coords } = await Location.getCurrentPositionAsync();

    //     if (coords) {
    //         const { latitude, longitude } = coords;
    //         let response = await Location.reverseGeocodeAsync({
    //             latitude,
    //             longitude
    //         });

    //         for (let item of response) {
    //             let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
    //             setDisplayCurrentAddress(address);
    //         }
    //     }
    // }
    
    const pickAnImage_Gallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        })

        console.log(result)

        if(!result.cancelled) {
            let base64Img = `data:image/jpg;base64,${result.base64}`
            uploadHandler(base64Img)
            setImg(result.uri)
        }
    }

    const captureAnImage_Camera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)

        if(granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })

            if(!data.cancelled) {
                let base64Img = `data:image/jpg;base64,${result.base64}`
                uploadHandler(base64Img)
            }
        } else {
            alert('')
        }
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
            setImage(response)
        })
        .catch((error) => {
            console.log(error)    
        })
        
    }

    // const getCurrentLocation = async () => {
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied');
    //         return;
    //     }

    //     let location = await Location.getCurrentPositionAsync({})
    //     let address = await Location.reverseGeocodeAsync(location.coords)
    //     console.log(address)
    //     setUserLocation(location);
    //     console.log(location)
    // }


    useEffect(() => {
        console.log(image)
        // getCurrentLocation()
    }, [image])


    // useEffect(() => {
    //     checkIfLocationEnabled()
    //     getCurrentLocation()
    // }, [])


    const submitReport = async () => {
        if(image == '') {
            setImage(img)
        } else if(!description || !image) {
            alert('Please enter the necessary information')
        } else {
            
            /*
                Fetch format

                axios.post('http://192.168.1.10:5000/api/users/report', { description, image })
                .then((response) => {
                    console.log(response)
                    console.log(description, image)
                    alert('Thank you for notifying us.')
                })
                .catch(error => console.log(error))

                setDescription('')
                setImg(noImage)
            */

            try {
                const { data } = await axios.post('http://localhost:5000/api/users/report', { description, image })
                console.log(data)
                alert('Thank you for notifying us.')

                setDescription('')
                setImg('http://res.cloudinary.com/drvd7jh0b/image/upload/v1640256598/hyr5slabmcd9zf8xddrv.png')
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }
    }

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView>
                <View style={styles.returnHeader} onPress={() => navigation.goBack()}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={styles.icon} source={returnIcon}/>
                    </TouchableOpacity>

                    <Text style={styles.iconText}>Back</Text>
                </View>

                <Text style={styles.heading}>REPORT A STRAY {'\n'}ANIMAL</Text>
                    <Text style={styles.subHeading}>
                        Saw an animal wandering around {'\n'}
                        your neighborhood? or somewhere {'\n'}
                        along the streets. Notify us.
                </Text>

                <Text style={styles.reportLabel}>Description</Text>
                <TextInput
                    style={styles.description}
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={7}
                    placeholder='Describe the situation (location of the animal, the state of the animal, etc.)'
                />

                <Text style={styles.imageCaptureText}>Image Upload (Optional)</Text>
                <View style={styles.imageCaptureContainer}>
                    <TouchableOpacity style={styles.imageCaptureCamera} onPress={() => captureAnImage_Camera()}>
                        <Image style={styles.cameraIcon} source={cameraIcon}/>
                        <Text style={styles.captureText}>CAMERA</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.imageCaptureGallery} onPress={() => pickAnImage_Gallery()}>
                        <Image style={styles.galleryIcon} source={galleryIcon} />
                        <Text style={styles.captureText}>GALLERY</Text>
                    </TouchableOpacity>
                </View>

                <Image style={styles.reportAnimalImage} source={img} />

                <TouchableOpacity style={styles.btnSubmit} onPress={() => submitReport()}>
                    <Text style={styles.btnText}>SUBMIT</Text>
                </TouchableOpacity>
            </ScrollView>

            <BottomNav />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#111',
        position: 'relative',
    },

    returnHeader: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 20,
    },

    icon: {
        width: 23,
        height: 23,
    },

    iconText: {
        color: 'white',
        fontFamily: 'Poppins_500Medium',
        fontSize: 13.6,
        marginTop: 2,
        marginLeft: 7,
    },

    heading: {
        color: 'white',
        fontFamily: 'Poppins_700Bold',
        fontSize: 40,
        lineHeight: 45,
        marginTop: 65,
        marginLeft: 35,
    },

    subHeading: {
        color: 'white',
        fontFamily: 'Poppins_200ExtraLight',
        fontSize: 19.2,
        lineHeight: 32,
        marginTop: 10,
        marginLeft: 35,
        marginRight: 20,
        marginBottom: 80,
    },
    
    reportLabel: {
        color: 'white',
        fontFamily: 'Poppins_200ExtraLight',
        fontSize: 16,
        marginBottom: 4,
        marginLeft: 35,
    },

    description: {
        fontFamily: 'Poppins_400Regular',
        backgroundColor: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 40,
        paddingTop: 10,
        paddingRight: 7,
        paddingBottom : 10,
        paddingLeft: 7,
        width: '82.5%',
    },

    imageCaptureText: {
        color: 'white',
        fontFamily: 'Poppins_200ExtraLight',
        fontSize: 16,
        marginBottom: 12,
        marginLeft: 35,
    },

    imageCaptureContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginRight: 35,
        marginBottom: 30,
        marginLeft: 35,
    },

    imageCaptureCamera: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 140,
        height: 43,
        marginRight: 10,
    },

    cameraIcon: {
        width: 20,
        height: 18,
        marginLeft: 8
    },

    imageCaptureGallery: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 140,
        height: 43,
    },

    galleryIcon: {
        width: 20,
        height: 20,
        marginTop: 2,
        marginLeft: 8,
    },

    captureText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        marginRight: 10,
        color: 'white',
    },

    reportAnimalImage: {
        marginRight: 35,
        marginBottom: 80,
        marginLeft: 35,
        width: '82.95%',
        height: 250,
    },

    btnSubmit: {
        width: '82.95%',
        height: 50,
        backgroundColor: 'transparent',
        borderWidth: .5,
        borderColor: 'white',
        borderRadius: 5,
        marginRight: 'auto',
        marginBottom: 100,
        marginLeft: 'auto',
    },

    btnText: {
        color: 'white',
        fontFamily: 'Poppins_500Medium',
        fontSize: 23.36,
        letterSpacing: 2,
        marginTop: 7,
        textAlign: 'center',
    }

})
export default ReportAnimal
