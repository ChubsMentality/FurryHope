import React, { useState, useEffect, useContext } from 'react'
import Vector from '../../assets/Feedback/feedback-vector.svg'
import headerIcon from '../../assets/Feedback/feedback.svg'
import returnIcon from '../../assets/Icons/returnIcon.svg'
import { CredentialsContext } from '../CredentialsContext'
import axios from 'axios'
import TopNav from '../SubComponents/TopNav'
import BottomNav from '../SubComponents/BottomNav'
import { useNavigation } from '@react-navigation/native'
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const UserFeedback = () => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    const navigation = useNavigation()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [profilePicture, setProfilePicture] = useState('')
    const [date, setDate] = useState('')
    
    const [fNameFocused, setFNameFocused] = useState(false)
    const [emailFocused, setEmailFocused] = useState(false)
    const [messageFocused, setMessageFocused] = useState(false)
    const d = new Date()
    
    const [rating, setRating] = useState()
    const [rating1, setRating1] = useState(false)
    const [rating2, setRating2] = useState(false)
    const [rating3, setRating3] = useState(false)
    const [rating4, setRating4] = useState(false)
    const [rating5, setRating5] = useState(false)

    const submitFeedback = async () => {
        if(message === '') {
            alert('Please fill out the necessary fields.')
        } else {
            try {
                const { data } = await axios.post('http://localhost:5000/api/users/submitFeedback', { fullName, email, message, profilePicture, date, rating })
                console.log(data)
                alert('Your feedback is much appreciated.')
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }

        setMessage('')
        setRating(0)

        // console.log(fullName)
        // console.log(email)
        // console.log(message)
        // console.log(profilePicture)
        // console.log(date)
    }

    const getUserById = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/users/getUserById/${storedCredentials.id}`)
        console.log(data)
        setFullName(data.fullName)
        setEmail(data.email)
        setProfilePicture(data.profilePicture)
    }

    useEffect(() => {
        getUserById()

        let dateNow = d.toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })

        setDate(dateNow)
    }, [])

    useEffect(() => {
        if(rating === 1) {
            setRating1(true)
            setRating2(false)
            setRating3(false)
            setRating4(false)
            setRating5(false)
        } else if(rating === 2) {
            setRating1(true)
            setRating2(true)
            setRating3(false)
            setRating4(false)
            setRating5(false)
        } else if(rating === 3) {
            setRating1(true)
            setRating2(true)
            setRating3(true)
            setRating4(false)
            setRating5(false)
        } else if(rating === 4) {
            setRating1(true)
            setRating2(true)
            setRating3(true)
            setRating4(true)
            setRating5(false)
        } else if(rating === 5) {
            setRating1(true)
            setRating2(true)
            setRating3(true)
            setRating4(true)
            setRating5(true)
        }
    }, [rating])

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView>
                <ImageBackground style={styles.vectorBg} source={Vector}>
                    <TopNav ScreenName='User Feedback' />


                    <Text style={styles.heading}>GIVE US YOUR {'\n'}FEEDBACK</Text>
                    <Text style={styles.subHeading}>
                        Help us improve your experience {'\n'}
                        while using the application and {'\n'}
                        the application itself.
                    </Text>

                    <Image style={styles.headerVector} source={headerIcon} />
                </ImageBackground>

                <View style={styles.feedbackContainer}>
                    <View style={styles.feedBackHeader}>
                        <View style={styles.feedBackHeaderLeft}>
                            <Text style={styles.feedbackHeaderTxt}>Rate the app</Text>
                            <Text style={styles.ratingResult}>{rating} / 5</Text>
                        </View>

                        <View style={styles.ratingContainer}>
                            <TouchableOpacity style={styles.starRatingContainer} onPress={() => setRating(1)}>
                                {rating1 ?
                                    <Ionicons size={21} name='ios-star' style={styles.starRating} color='gold' />
                                    :
                                    <Ionicons size={21} name='ios-star-outline' style={styles.starRating} color='#111' />
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.starRatingContainer} onPress={() => setRating(2)}>
                                {rating2 ?
                                    <Ionicons size={21} name='ios-star' style={styles.starRating} color='gold' />
                                    :
                                    <Ionicons size={21} name='ios-star-outline' style={styles.starRating} color='#111' />
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.starRatingContainer} onPress={() => setRating(3)}>
                                {rating3 ?
                                    <Ionicons size={21} name='ios-star' style={styles.starRating} color='gold' />
                                    :
                                    <Ionicons size={21} name='ios-star-outline' style={styles.starRating} color='#111' />
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.starRatingContainer} onPress={() => setRating(4)}>
                                {rating4 ?
                                    <Ionicons size={21} name='ios-star' style={styles.starRating} color='gold' />
                                    :
                                    <Ionicons size={21} name='ios-star-outline' style={styles.starRating} color='#111' />
                                }
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.starRatingContainer} onPress={() => setRating(5)}>
                                {rating5 ?
                                    <Ionicons size={21} name='ios-star' style={styles.starRating} color='gold' />
                                    :
                                    <Ionicons size={21} name='ios-star-outline' style={styles.starRating} color='#111' />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.feedbackLabel}>Tell us what you think</Text>
                    <TextInput
                        style={messageFocused ? styles.feedbackMessageFocused : styles.feedbackMessage}
                        value={message}
                        onChangeText={setMessage}
                        multiline={true}
                        numberOfLines={7}
                        onFocus={() => setMessageFocused(true)}
                        onBlur={() => setMessageFocused(false)}
                    />
                </View>

                <TouchableOpacity style={styles.btnSubmit} onPress={() => submitFeedback()}>
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

    vectorBg: {
        width: '100%',
        height: 474,
        position: 'relative',
    },

    heading: {
        fontFamily: 'PoppinsBold',
        fontSize: 40,
        lineHeight: 45,
        marginTop: 75,
        marginLeft: 30,
    },

    subHeading: {
        fontFamily: 'PoppinsLight',
        fontSize: 19.2,
        lineHeight: 30,
        marginTop: 10,
        marginLeft: 30,
        marginRight: 20,
    },

    headerVector: {
        position: 'absolute',
        top: 90,
        right: 40,
        width: 60,
        height: 60,
    },

    feedbackContainer: {
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: 'white',
        shadowColor: '#111',
        shadowOpacity: .05,
        shadowOffset: {
            height: 4,
            width: 0,
        },
        shadowRadius: 15,
    },

    feedBackHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 35,
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: 1,
        paddingBottom: 20,
    },

    feedbackHeaderTxt: {
        fontFamily: 'PoppinsMedium',
        fontSize: 14,
        marginLeft: 20
    },

    ratingResult: {
        fontFamily: 'PoppinsLight',
        fontSize: 12,
        marginLeft: 20,
    },

    feedbackLabel: {
        fontFamily: 'PoppinsRegular',
        fontSize: 14,
        marginBottom: 10,
        marginLeft: 20,
    },

    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },

    starRating: {
        marginRight: 10,
    },

    feedbackInput: {
        borderRadius: 5,
        borderColor: '#f1f3f7',
        borderWidth: 3,
        backgroundColor: '#f3f5f9',
        width: '82%',
        height: 43,
        fontFamily: 'PoppinsRegular',
        marginBottom: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 8,
    },

    feedbackInputFocused: {
        borderRadius: 5,
        borderColor: '#111',
        borderWidth: 1,
        backgroundColor: 'white',
        width: '82%',
        height: 43,
        fontFamily: 'PoppinsRegular',
        marginBottom: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 8,

    },

    feedbackMessage: {
        borderRadius: 5,
        borderColor: '#f1f3f7',
        borderWidth: 3,
        backgroundColor: '#f3f5f9',
        fontFamily: 'PoppinsRegular',
        fontSize: 12,
        marginBottom: 40,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 10,
        width: '88%',
        height: 180,
    },

    feedbackMessageFocused: {
        borderRadius: 5,
        borderColor: '#111',
        borderWidth: 1,
        backgroundColor: '#ffff',
        fontFamily: 'PoppinsRegular',
        fontSize: 12,
        marginBottom: 40,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 10,
        width: '88%',
        height: 180,
    },

    btnSubmit: {
        width: '86%',
        height: 60,
        backgroundColor: '#111',
        marginTop: 70,
        marginRight: 'auto',
        marginBottom: 100,
        marginLeft: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    btnText: {
        color: 'white',
        fontFamily: 'PoppinsMedium',
        fontSize: 23.36,
        letterSpacing: 2,
    }
})

export default UserFeedback
