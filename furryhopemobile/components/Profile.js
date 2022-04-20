import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { CredentialsContext } from './CredentialsContext'
import { Picker } from '@react-native-picker/picker'
import { quickSort } from './SubComponents/QuickSort'
import { useNavigation } from '@react-navigation/native'
import BottomNav from './SubComponents/BottomNav'
import returnIcon from '../assets/Icons/returnIcon.svg'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'

const Profile = () => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    const [userData, setUserData] = useState()
    const window = useWindowDimensions()
    const navigation = useNavigation()

    const [currentStatus, setCurrentStatus] = useState('Pending')
    const [adoptions, setAdoptions] = useState([])
    const [pending, setPending] = useState([])
    const [adopted, setAdopted] = useState([])
    const isPending = currentStatus === 'Pending'

    const [changeProfileModal, setChangeProfileModal] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const [profilePicture, setProfilePicture] = useState('')
    const [profilePicturePreview, setProfilePicturePreview] = useState('https://res.cloudinary.com/drvd7jh0b/image/upload/v1650026769/tcgfy3tbaoowhjfufvob.png')
    const [fileName, setFileName] = useState('')
    const [successChangedPicture, setSuccessChangedPicture] = useState(false)
    const [successUpdateProfile, setSuccessUpdateProfile] = useState(false)

    const filterPending = (arr) => {
        return arr.adoptionStatus === 'Pending'
    }

    const filterAdopted = (arr) => {
        return arr.adoptionStatus === 'Adopted'
    }

    const fetchAdoptions = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${storedCredentials.token}`
            }
        }

        try {
            const { data } = await axios.get('http://localhost:5000/api/users/getSpecificAdoptions', config)
            const sortedData = quickSort(data, 0, data.length - 1)
            setAdoptions(sortedData)
            setPending(sortedData.filter(filterPending))
            setAdopted(sortedData.filter(filterAdopted))
        
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
            setUserData(data)
            console.log(data)
            setProfilePicturePreview(data.profilePicture)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { 
        fetchAdoptions()
        fetchUser()
    }, [successChangedPicture])

    const renderData = ({item}) => {
        const isPending = item.adoptionStatus === 'Pending'
        return (
            <TouchableOpacity onPress={() => navigation.navigate(isPending ? 'View Pending' : 'View Adopted', { animalId: item.animalId })}>
                <ImageBackground 
                    style={styles.cardBody}
                    source={item.animalImg}
                >
                    <View style={styles.overlay}></View>

                    <View style={styles.cardContent}>
                        <View style={styles.animalDescription}>
                            <Text style={styles.animalName}>{item.animalName}</Text>
                            <Text style={styles.animalBreed}>{item.animalBreed}</Text>
                        </View>

                        {/* <TouchableOpacity style={styles.seeInfoBtn} onPress={() => navigation.navigate('View Data', { animalId: props._id })}>
                            <Image style={styles.seeInfoIcon} source={seeInfoIcon} />
                            <Text style={styles.seeInfoText}>See Info</Text>
                        </TouchableOpacity> */}
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    const emptyList = () => {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{textAlign: 'center'}}>There currently no animals in this list.</Text>
            </div>
        )
    }

    const openChangeProfilePicture = () => {
        setOverlay(!overlay)
        setChangeProfileModal(!changeProfileModal)
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
            setProfilePicture(response)
            set
        })
        .catch((error) => {
            console.log(error)    
        })
        
    }

    const choosePicture = async () => {
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
            setProfilePicturePreview(result.uri)
        }
    }

    const saveBtnHandler = async () => {
        if(profilePicture === '') {
            alert('Please choose a file.')
        } else {
            try {
                const { data } = await axios.put(`http://localhost:5000/api/users/updateProfilePicture/${storedCredentials.id}`, { profilePicture })
                console.log(data)

                setSuccessChangedPicture(!successChangedPicture)
                setChangeProfileModal(!changeProfileModal)
                setOverlay(!overlay)
            } catch (error) {
                console.log(error)
            }
        }
    } 

    const cancelBtnHandler = () => {
        setChangeProfileModal(!changeProfileModal)
        setOverlay(!overlay)
    }

    const ChangeProfilePicture = () => {
        return (
            <View style={styles.changeProfilePicModal}>
                <Image style={styles.changeProfilePicImg} source={profilePicturePreview} />
                <TouchableOpacity style={styles.chooseFileBtn}>
                    <Text style={styles.chooseFileTxt} onPress={() => choosePicture()}>Change Profile Photo</Text>
                </TouchableOpacity>

                <View style={styles.btnsContainer}>
                    <TouchableOpacity style={styles.saveBtn} onPress={() => saveBtnHandler()}>
                        <Text style={styles.saveBtnTxt}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelBtn} onPress={() => cancelBtnHandler()}>
                        <Text style={styles.cancelBtnTxt}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView>
                <TouchableOpacity style={styles.backBtnContainer} onPress={() => navigation.goBack()}>
                    <Image style={styles.backIcon} source={returnIcon}/>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>

                
                <View style={styles.profileContentContainer}>
                    <View style={styles.infoContainer}>
                        <View style={styles.profilePictureContainer}>
                            <Image style={styles.profileIcon} source={userData && userData.profilePicture} />
                            <TouchableOpacity style={styles.changePictureBtn} onPress={() => openChangeProfilePicture()}>
                                <Text style={styles.changePictureTxt}>Change Profile Picture</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.userInfoContainer}>
                            <Text style={[styles.userInfoLabel, styles.userName]}>NAME</Text>
                            <Text style={styles.userInfoValue}>{userData && userData.fullName}</Text>

                            <Text style={[styles.userInfoLabel, styles.userEmail]}>EMAIL</Text>
                            <Text style={styles.userInfoValue}>{userData && userData.email}</Text>

                            <Text style={[styles.userInfoLabel, styles.userEmail]}>CONTACT NUMBER</Text>
                            <Text style={styles.userInfoValue}>{userData && userData.contactNo}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.editProfileBtn} onPress={() => navigation.navigate('Profile Settings', { successUpdateProfile: successUpdateProfile, setSuccessUpdateProfile: setSuccessUpdateProfile() }) }>
                        <Text style={styles.editProfileTxt}>EDIT PROFILE</Text>
                    </TouchableOpacity>

                    <View style={styles.myAdoptionsContainer}>
                        <Text style={styles.myAdoptionsHeader}>My Adoptions</Text>
                        <View style={styles.adoptionStatus}>
                            <Text style={styles.statusLabel}>Status</Text>

                            <Picker
                                style={styles.statusPicker}
                                itemStyle={styles.itemPicker}
                                selectedValue={currentStatus}
                                onValueChange={(itemValue, itemIndex) => setCurrentStatus(itemValue)}
                            >
                                <Picker.Item label='Pending' value='Pending' />
                                <Picker.Item label='Adopted' value='Adopted' />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.myAdoptionsScroll}>
                        <FlatList
                            data={isPending ?
                                pending
                                :
                                adopted
                            }
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderData}
                            horizontal={true}
                            ListEmptyComponent={emptyList}
                        />
                    </View>
                </View>
            </ScrollView>

            {changeProfileModal && <ChangeProfilePicture />}

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
    body: {
        backgroundColor: '#ffffff',
        flex: 1,
        position: 'relative',
    },

    backBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 20,
        alignSelf: 'flex-start',
    },

    backIcon: {
        height: 23,
        width: 23,
    },

    backText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14.5,
        marginTop: 2,
        marginLeft: 7,
    },

    profileContentContainer: {
        marginTop: 5,
        marginRight: 25,
        marginBottom: 90,
        marginLeft: 25,
    },

    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 40,
    },

    profilePictureContainer: {
        marginLeft: 10,
    },

    profileIcon: {
        width: 110,
        height: 110,
        borderRadius: '50%',
        marginLeft: 10,
    },

    changePictureBtn: {

    },

    changePictureTxt: {
        color: '#551A8B',
        marginTop: 15,
    },

    userInfoContainer: {
        marginLeft: 15,
    },

    userInfoLabel: {
        fontFamily: 'Poppins_600SemiBold',
    },

    userName: {
        marginTop: 1,
    },

    userEmail: {
        marginTop: 10,
    },
    
    editProfileBtn: {
        marginTop: 30,
        borderWidth: .1,
        borderRadius: 5,
       
        width: '100%',
        paddingTop: 8,
        paddingBottom: 8,
    },

    editProfileTxt: {
        textAlign: 'center',
    },

    myAdoptionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 60,
        marginBottom: 15,
    },

    myAdoptionsHeader: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
    },

    adoptionStatus: {
        display: 'flex',
        flexDirection: 'row',
    },

    statusLabel: {
        marginRight: 7,
    },

    statusPicker: {
        width: 80,
        height: 25,
        marginTop: -3,
    },

    itemPicker: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
    },

    myAdoptionsScroll: {
        // marginLeft: 20,
    },

    changeProfilePicModal: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 340,
        width: 300,
        zIndex: 10,
        position: 'fixed',
        top: '15%',
        left: '50%',
        transform: [{
            translateX: '-50%',
            translateY: '-15%',
        }],
    },

    changeProfilePicImg: {
        height: 110,
        width: 110,
        marginTop: 40,
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: '50%',
    },

    chooseFileBtn: {
        borderWidth: .5,
        borderRadius: 5,
        // borderColor: '#551A8B',
        marginTop: 40,
        marginRight: 30,
        marginLeft: 30,
        paddingTop: 8,
        paddingBottom: 8,
        width: '80%',
    },

    chooseFileTxt: {
        textAlign: 'center',
        // color: '#551A8B',
    },

    btnsContainer: {
        marginTop: 50,
        marginRight: 30,
        marginLeft: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    saveBtn: {
        borderWidth: .5,
        borderRadius: 5,
        backgroundColor: '#111',
        paddingTop: 5,
        paddingRight: 15,
        paddingBottom: 5,
        paddingLeft: 20,
    },

    saveBtnTxt: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
    },

    cancelBtn: {
        borderWidth: .5,
        borderColor: '#111',
        borderRadius: 5,
        paddingTop: 5,
        paddingRight: 15,
        paddingBottom: 5,
        paddingLeft: 15,
        marginLeft: 5,
    },

    cancelTxt: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 15,
        textAlign: 'center',
    },

    cardBody: {
        height: 290,
        width: 190,
        marginRight: 'auto',
        marginBottom: 25,
        marginLeft: 'auto',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 5,
        marginRight: 10,
    },

    overlay: {
        height: 290,
        width: 190,
        backgroundColor: '#1111114d',
        position: 'absolute',
    },

    cardContent: {
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 218,
    },

    animalDescription: {
        marginLeft: 13,  
    },

    animalName: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 25,
        color: 'white',
    },

    animalBreed: {
        fontFamily: 'Poppins_200ExtraLight',
        fontSize: 15,
        color: 'white',
        marginTop: -3,
    },
})

export default Profile
