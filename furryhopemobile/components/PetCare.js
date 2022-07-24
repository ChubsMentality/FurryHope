import React, { useState, useRef } from 'react'
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { section1, section2, section3, section4, section5, section6, section7, section8, section9, section10 } from './SubComponents/AnimalCareSubComp'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TopNav from './SubComponents/TopNav'
import BottomTabNav from './SubComponents/BottomNav'
import RASections from './SubComponents/RASections'
import viewMore from '../assets/AnimalCare/view-more-arrow.svg'
import viewLess from '../assets/AnimalCare/view-less-arrow.svg'


const PetCare = () => {
    const navigation = useNavigation()

    // RA 8485
    const [showSectionOne, setShowSectionOne] = useState(false)
    const [showSectionTwo, setShowSectionTwo] = useState(false)
    const [showSectionThree, setShowSectionThree] = useState(false)
    const [showSectionFour, setShowSectionFour] = useState(false)
    const [showSectionFive, setShowSectionFive] = useState(false)
    const [showSectionSix, setShowSectionSix] = useState(false)
    const [showSectionSeven, setShowSectionSeven] = useState(false)
    const [showSectionEight, setShowSectionEight] = useState(false)
    const [showSectionNine, setShowSectionNine] = useState(false)
    const [showSectionTen, setShowSectionTen] = useState(false)

    const viewMoreOrLess1 = showSectionOne ? viewLess : viewMore
    const viewMoreOrLess2 = showSectionTwo ? viewLess : viewMore
    const viewMoreOrLess3 = showSectionThree ? viewLess : viewMore
    const viewMoreOrLess4 = showSectionFour ? viewLess : viewMore
    const viewMoreOrLess5 = showSectionFive ? viewLess : viewMore
    const viewMoreOrLess6 = showSectionSix ? viewLess : viewMore
    const viewMoreOrLess7 = showSectionSeven ? viewLess : viewMore
    const viewMoreOrLess8 = showSectionEight ? viewLess : viewMore
    const viewMoreOrLess9 = showSectionNine ? viewLess : viewMore
    const viewMoreOrLess10 = showSectionTen ? viewLess : viewMore

    const toggleSectionOne = () => {
        if(showSectionOne === false) {
            setShowSectionOne(true)
        } else {
            setShowSectionOne(false)
        }
       
    }

    const toggleSectionTwo = () => {
        if(showSectionTwo === false) {
            setShowSectionTwo(true)
        } else {
            setShowSectionTwo(false)
        }
    }
    
    const toggleSectionThree = () => {
        if(showSectionThree === false) {
            setShowSectionThree(true)
        } else {
            setShowSectionThree(false)
        }
    }

    const toggleSectionFour = () => {
        if(showSectionFour === false) {
            setShowSectionFour(true)
        } else {
            setShowSectionFour(false)
        }
    }

    const toggleSectionFive = () => {
        if(showSectionFive === false) {
            setShowSectionFive(true)
        } else {
            setShowSectionFive(false)
        }
    }

    const toggleSectionSix = () => {
        if(showSectionSix === false) {
            setShowSectionSix(true)
        } else {
            setShowSectionSix(false)
        }
    }

    const toggleSectionSeven = () => {
        if(showSectionSeven === false) {
            setShowSectionSeven(true)
        } else {
            setShowSectionSeven(false)
        }
    }

    const toggleSectionEight = () => {
        if(showSectionEight === false) {
            setShowSectionEight(true)
        } else {
            setShowSectionEight(false)
        }
    } 

    const toggleSectionNine = () => {
        if(showSectionNine === false) {
            setShowSectionNine(true)
        } else {
            setShowSectionNine(false)
        }
    }

    const toggleSectionTen = () => {
        if(showSectionTen === false) {
            setShowSectionTen(true)
        } else {
            setShowSectionTen(false)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <ImageBackground 
                    style={{ width: '100%', height: 470 }}
                    source={require('../assets/PetCare/petCare-hero-section.png')}
                >
                    <TopNav ScreenName='Pet Care' />
                </ImageBackground>

                <Text style={styles.heading}>TIPS ON HOW TO TAKE {'\n'}CARE OF YOUR PETS</Text>
                <Text style={styles.subHeading}>
                    In this screen we provided some tips {'\n'}
                    and information that can help you {'\n'}
                    take care of your pets and hopefully it {'\n'}
                    can help.
                </Text>

                <View style={styles.tipsContainer}>
                    <TouchableOpacity style={styles.cardBody} onPress={() => navigation.navigate('Tips for Adopting')}>
                        <ImageBackground style={styles.cardImage} source={require('../assets/PetCare/thingsToConsider.jpg')}>
                            <LinearGradient
                                colors={['rgba(0, 0, 0, 0)', 'rgb(23, 22, 22)']}
                                style={styles.linearGradient}
                                start={{ x: 0, y: 0.6 }}
                                end={{ x: 0, y: 1.1 }}
                            >
                                <Text style={styles.cardTitle}>Things to Consider</Text>

                                <TouchableOpacity style={styles.viewMoreBtn}>
                                    <Text style={styles.viewMoreTxt}>View More</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cardBody} onPress={() => navigation.navigate('Adoption Benefits')}>
                        <ImageBackground style={styles.cardImage} source={require('../assets/PetCare/benefits.jpg')}>
                            <LinearGradient
                                colors={['rgba(0, 0, 0, 0)', 'rgb(23, 22, 22)']}
                                style={styles.linearGradient}
                                start={{ x: 0, y: 0.6 }}
                                end={{ x: 0, y: 1.1 }}
                            >
                                <Text style={styles.cardTitle}>Benefits of Adopting</Text>

                                <TouchableOpacity style={styles.viewMoreBtn}>
                                    <Text style={styles.viewMoreTxt}>View More</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cardBody} onPress={() => navigation.navigate('Dog Care')}>
                        <ImageBackground style={styles.cardImage} source={require('../assets/PetCare/dogCare.jpg')}>
                            <LinearGradient
                                colors={['rgba(0, 0, 0, 0)', 'rgb(23, 22, 22)']}
                                style={styles.linearGradient}
                                start={{ x: 0, y: 0.6 }}
                                end={{ x: 0, y: 1.1 }}
                            >
                                <Text style={styles.cardTitle}>Dog Care</Text>

                                <TouchableOpacity style={styles.viewMoreBtn}>
                                    <Text style={styles.viewMoreTxt}>View More</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </ImageBackground>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cardBody} onPress={() => navigation.navigate('Cat Care')}>
                        <ImageBackground style={styles.cardImage} source={require('../assets/PetCare/catCare.jpg')}>
                            <LinearGradient
                                colors={['rgba(0, 0, 0, 0)', 'rgb(23, 22, 22)']}
                                style={styles.linearGradient}
                                start={{ x: 0, y: 0.6 }}
                                end={{ x: 0, y: 1.1 }}
                            >
                                <Text style={styles.cardTitle}>Cat Care</Text>

                                <TouchableOpacity style={styles.viewMoreBtn}>
                                    <Text style={styles.viewMoreTxt}>View More</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

                <View style={styles.petQuoteContainer}>
                    <Text style={styles.petQuote}>
                        The greatness of a nation and its {'\n'}
                        moral progress can be judged by the {'\n'}
                        way its animals are treated. {'\n'}
                    </Text>

                    <Text style={styles.quotedBy}>~ Mahatma Gandhi</Text>

                    <View style={styles.quoteVectorLeft}></View>
                    <View style={styles.quoteVectorRight}></View>
                </View>

                <View style={styles.RA8485Container}>
                    <Text style={styles.RAHeading}>DID YOU {'\n'}KNOW</Text>
                    
                    <View style={styles.questionMarkContainer}>
                        <Ionicons name='ios-help' size={80} color='#111' />
                    </View>

                    <Text style={styles.RASubHeading1}>
                        There's a law in the Philippines
                        that aims to promote and
                        protect the welfare of all
                        animals in the country
                    </Text>

                    <Text style={styles.RASubHeading2}>
                        Republic Act 8485 (or the
                        animal welfare act of 1998)
                        which was approved on
                        February 11, 1998.
                    </Text>


                    <Text style={styles.RATitle}>R.A. 8485</Text>
                    <Text style={styles.RASubTitle}>
                        The following are the provisions {'\n'}
                        of Republic Act 8485:
                    </Text>

                    <RASections sectionName='SECTION 1' toggleFunction={toggleSectionOne} viewState={showSectionOne} viewMoreOrLess={viewMoreOrLess1} sectionContent={section1} />
                    <RASections sectionName='SECTION 2' toggleFunction={toggleSectionTwo} viewState={showSectionTwo} viewMoreOrLess={viewMoreOrLess2} sectionContent={section2} />
                    <RASections sectionName='SECTION 3' toggleFunction={toggleSectionThree} viewState={showSectionThree} viewMoreOrLess={viewMoreOrLess3} sectionContent={section3} />
                    <RASections sectionName='SECTION 4' toggleFunction={toggleSectionFour} viewState={showSectionFour} viewMoreOrLess={viewMoreOrLess4} sectionContent={section4} />
                    <RASections sectionName='SECTION 5' toggleFunction={toggleSectionFive} viewState={showSectionFive} viewMoreOrLess={viewMoreOrLess5} sectionContent={section5} />
                    <RASections sectionName='SECTION 6' toggleFunction={toggleSectionSix} viewState={showSectionSix} viewMoreOrLess={viewMoreOrLess6} sectionContent={section6} />
                    <RASections sectionName='SECTION 7' toggleFunction={toggleSectionSeven} viewState={showSectionSeven} viewMoreOrLess={viewMoreOrLess7} sectionContent={section7} />
                    <RASections sectionName='SECTION 8' toggleFunction={toggleSectionEight} viewState={showSectionEight} viewMoreOrLess={viewMoreOrLess8} sectionContent={section8} />
                    <RASections sectionName='SECTION 9' toggleFunction={toggleSectionNine} viewState={showSectionNine} viewMoreOrLess={viewMoreOrLess9} sectionContent={section9} />
                    <RASections sectionName='SECTION 10' toggleFunction={toggleSectionTen} viewState={showSectionTen} viewMoreOrLess={viewMoreOrLess10} sectionContent={section10} />
                </View>
            </ScrollView>

            <BottomTabNav />
        </SafeAreaView>
    )
}

export default PetCare

const styles = StyleSheet.create({
    heading: {  
        fontFamily: 'PoppinsBold',
        fontSize: 30,
        marginTop: 80,
        marginRight: 30,
        marginLeft: 30,        
    },

    subHeading: {
        alignSelf: 'flex-start',
        fontFamily: 'PoppinsLight',
        fontSize: 18,
        lineHeight: 35,
        marginTop: 10,
        marginRight: 30,
        marginLeft: 30,
    },

    tipsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        rowGap: 15,
        marginTop: 40,
        marginRight: 30,
        marginLeft: 30,
    },

    cardBody: {
        height: 300,
        width: 170,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },

    linearGradient: {
        flex: 1,
        zIndex: 5,
    },

    cardImage: {
        flex: 1,
        zIndex: 2,
        borderRadius: 10,
        overflow: 'hidden',
    },

    cardTitle: {
        color: 'white',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 24,
        marginTop: 'auto',
        marginRight: 10,
        marginBottom: 60,
        marginLeft: 10,
        lineHeight: 30,
    },

    viewMoreBtn: {
        height: 27,
        width: 80,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 25,
        left: 10
    },

    viewMoreTxt: {
        color: 'white',
        fontFamily: 'PoppinsLight',
        fontSize: 12,
    },

    petQuoteContainer: {
        height: 240,
        width: '85.5%', 
        position: 'relative',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        marginTop: 80,
        marginRight: 30,
        marginLeft: 30,
        backgroundColor: '#ffff88',
        overflow: 'hidden',
    },

    petQuote: {
        fontFamily: 'PlayfairMedium',
        fontSize: 19.5,
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: 30,
    },

    quotedBy: {
        fontFamily: 'PoppinsLight',
        fontSize: 15,
        marginTop: 15,
        marginBottom: 'auto',
        marginLeft: 15,
    },

    quoteVectorLeft: {
        height: 80,
        width: 80,
        position: 'absolute',
        top: -20,
        left: -20,
        backgroundColor: '#FFF066',
        borderRadius: 100,
        zIndex: -1,
    },

    quoteVectorRight: {
        height: 140,
        width: 140,
        position: 'absolute',
        bottom: -35,
        right: -35,
        backgroundColor: '#FFF066',
        borderRadius: 100,
        zIndex: -1,
    },

    RA8485Container: {
        marginTop: 80,
        marginRight: 30,
        marginBottom: 100,
        marginLeft: 30,
    },

    RAHeading: {
        fontFamily: 'PoppinsBold',
        fontSize: 57,
        lineHeight: 65,
    },

    questionMarkContainer: {
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -5,
        right: 40,
        backgroundColor: '#ffff66',
        borderRadius: 50,
        zIndex: -1,
    },

    RASubHeading1: {
        fontFamily: 'PoppinsLight',
        fontSize: 18,
        lineHeight: 35,
        marginTop: 18,
    },

    RASubHeading2: {
        fontFamily: 'PoppinsLight',
        fontSize: 18,
        lineHeight: 35,
        marginTop: 20,
    },

    RATitle: {
        fontFamily: 'PoppinsMedium',
        fontSize: 30,
        marginTop: 80,  
    },

    RASubTitle: {
        fontFamily: 'PoppinsLight',
        fontSize: 18,
        lineHeight: 35,
        marginTop: 10,
    },
})