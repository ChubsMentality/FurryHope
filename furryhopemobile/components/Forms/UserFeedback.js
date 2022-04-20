import React, { useState } from 'react'
import Vector from '../../assets/Feedback/feedback-vector.svg'
import headerIcon from '../../assets/Feedback/feedback.svg'
import returnIcon from '../../assets/Icons/returnIcon.svg'
import axios from 'axios'
import BottomNav from '../SubComponents/BottomNav'
import { useNavigation } from '@react-navigation/native'
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const UserFeedback = () => {
    const navigation = useNavigation()
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const submitFeedback = async () => {
        if(fullName === '' || message === '') {
            alert('Please fill out the necessary fields.')
        } else {
            try {
                const { data } = await axios.post('http://localhost:5000/api/users/submitFeedback', { fullName, email, message })
                console.log(data)
                alert('Your feedback is much appreciated.')
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }

        setFullName('')
        setEmail('')
        setMessage('')
    }

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView>
                <ImageBackground style={styles.vectorBg} source={Vector}>
                    <View style={styles.returnHeader} onPress={() => navigation.goBack()}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image style={styles.icon} source={returnIcon}/>
                        </TouchableOpacity>

                        <Text style={styles.iconText}>Back</Text>
                    </View>

                    <Text style={styles.heading}>GIVE US YOUR {'\n'}FEEDBACK</Text>
                    <Text style={styles.subHeading}>
                        Help us improve your experience {'\n'}
                        while using the application and {'\n'}
                        the application itself.
                    </Text>

                    <Image style={styles.headerVector} source={headerIcon} />
                </ImageBackground>

                <Text style={styles.feedbackLabel}>Name</Text>
                <TextInput
                    style={styles.feedbackInput}
                    value={fullName}
                    onChangeText={setFullName}
                />

                <Text style={styles.feedbackLabel}>Email</Text>
                <TextInput
                    style={styles.feedbackInput}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.feedbackLabel}>Message</Text>
                <TextInput
                    style={styles.feedbackMessage}
                    value={message}
                    onChangeText={setMessage}
                    multiline={true}
                    numberOfLines={7}
                />

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
        fontFamily: 'Poppins_500Medium',
        fontSize: 14.5,
        marginTop: 2,
        marginLeft: 7,
    },

    heading: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 40,
        lineHeight: 45,
        marginTop: 75,
        marginLeft: 46,
    },

    subHeading: {
        fontFamily: 'Poppins_300Light',
        fontSize: 19.2,
        lineHeight: 30,
        marginTop: 10,
        marginLeft: 46,
        marginRight: 20,
    },

    headerVector: {
        position: 'absolute',
        top: 90,
        right: 40,
        width: 60,
        height: 60,
    },

    feedbackLabel: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        marginBottom: 4,
        marginLeft: 46,
    },

    feedbackInput: {
        borderColor: '#b0b0b0',
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

    feedbackMessage: {
        borderColor: '#b0b0b0',
        borderStyle: 'solid',
        borderWidth: 1,
        fontFamily: 'Poppins_400Regular',
        marginBottom: 80,
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingTop: 10,
        paddingRight: 7,
        paddingBottom : 10,
        paddingLeft: 7,
        width: '77%',
    },

    btnSubmit: {
        width: '77%',
        height: 50,
        backgroundColor: '#111',
        marginRight: 'auto',
        marginBottom: 100,
        marginLeft: 'auto',
    },

    btnText: {
        color: 'white',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 23.36,
        letterSpacing: 2,
        marginTop: 5,
        textAlign: 'center',
    }
})

export default UserFeedback
