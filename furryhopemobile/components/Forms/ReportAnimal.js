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
import TopNav from '../SubComponents/TopNav'

const ReportAnimal = () => {
    const navigation = useNavigation()
    const [date, setDate] = useState()
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [img, setImg] = useState('http://res.cloudinary.com/drvd7jh0b/image/upload/v1640256598/hyr5slabmcd9zf8xddrv.png')
    const [image, setImage] = useState('http://res.cloudinary.com/drvd7jh0b/image/upload/v1640256598/hyr5slabmcd9zf8xddrv.png')
   

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

    useEffect(() => {
        let d = new Date()
        console.log(d.toLocaleDateString())
        setDate(d.toLocaleDateString())
    }, [])

    const submitReport = async () => {
        if(image == '') {
            setImage(img)
        } else if(!description || !image) {
            alert('Please enter the necessary information')
        } else {
            try {
                const { data } = await axios.post('http://localhost:5000/api/users/report', { date, location, description, image })
                console.log(data)
                alert('Thank you for notifying us.')

                setLocation('')
                setDescription('')
                setImg('http://res.cloudinary.com/drvd7jh0b/image/upload/v1640256598/hyr5slabmcd9zf8xddrv.png')
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }

        // console.log(date)
        // console.log(location)
        // console.log(description)
        // console.log(image)
    }

    const [locationFocused, setLocationFocused] = useState()
    const [descFocused, setDescFocused] = useState(false)

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView>
                <TopNav ScreenName='Stray Animal Report' />

                <Text style={styles.heading}>REPORT A STRAY {'\n'}ANIMAL</Text>
                <Text style={styles.subHeading}>
                    Saw an animal wandering around {'\n'}
                    your neighborhood? or somewhere {'\n'}
                    along the streets. Notify us.
                </Text>

                <Text style={styles.reportLabel}>Location where you saw the animal</Text>
                <TextInput
                    style={locationFocused ? styles.reportInputFocused : styles.reportInput}
                    onFocus={() => setLocationFocused(true)}
                    onBlur={() => setLocationFocused(false)}
                    value={location}
                    onChangeText={setLocation}
                />

                <Text style={styles.reportLabel}>Description</Text>
                <TextInput
                    style={descFocused ? styles.descriptionFocused : styles.description}
                    value={description}
                    onChangeText={setDescription}
                    onFocus={() => setDescFocused(true)}
                    onBlur={() => setDescFocused(false)}
                    multiline={true}
                    numberOfLines={7}
                    placeholder='Describe the situation (the state of the animal, etc.)'
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
        backgroundColor: 'white',
        position: 'relative',
    },

    heading: {
        fontFamily: 'PoppinsBold',
        fontSize: 40,
        lineHeight: 45,
        marginTop: 55,
        marginLeft: 35,
    },

    subHeading: {
        fontFamily: 'PoppinsExtraLight',
        fontSize: 19.2,
        lineHeight: 32,
        marginTop: 10,
        marginLeft: 35,
        marginRight: 20,
        marginBottom: 70,
    },
    
    reportLabel: {
        fontFamily: 'PoppinsRegular',
        fontSize: 16,
        marginBottom: 4,
        marginLeft: 35,
    },

    reportInput: {
        height: 45,
        width: '82.5%',
        borderRadius: 5,
        borderColor: '#f1f3f7',
        borderWidth: 3,
        backgroundColor: '#f3f5f9',
        color: '#8c8c8e',
        fontFamily: 'PoppinsRegular',
        fontSize: 13,
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 35,
        marginLeft: 35,
    },

    reportInputFocused: {
        height: 45,
        width: '82.5%',
        borderColor: '#111',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        fontFamily: 'PoppinsRegular',
        fontSize: 13,
        marginRight: 35,
        marginLeft: 35,
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },

    description: {
        fontFamily: 'PoppinsLight',
        fontSize: 13,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 40,
        padding: 10,
        width: '82.5%',
        borderColor: '#f1f3f7',
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: '#f3f5f9',
        color: '#8c8c8e',
    },

    descriptionFocused: {
        fontFamily: 'PoppinsLight',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 40,
        padding: 10,
        fontSize: 13,
        width: '82.5%',
        borderColor: '#111',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
    },

    imageCaptureText: {
        fontFamily: 'PoppinsRegular',
        fontSize: 16,
        marginTop: 20,
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
        backgroundColor: '#111',
        borderWidth: 1,
        borderColor: '#111',
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
        backgroundColor: '#111',
        borderWidth: 1,
        borderColor: '#111' ,
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
        color: 'white',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 16,
        marginRight: 10,
    },

    reportAnimalImage: {
        marginRight: 35,
        marginBottom: 80,
        marginLeft: 35,
        width: '82.95%',
        height: 240,
        borderRadius: 5,
    },

    btnSubmit: {
        width: '82.95%',
        height: 60,
        backgroundColor: '#111',
        borderWidth: .5,
        borderRadius: 5,
        marginRight: 'auto',
        marginBottom: 100,
        marginLeft: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnText: {
        color: 'white',
        fontFamily: 'PoppinsMedium',
        fontSize: 23.36,
        letterSpacing: 2,
    }
})
export default ReportAnimal
