import React, { useState, useEffect, useRef } from 'react'
import { Image, ScrollView, View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import RASections from './SubComponents/RASections'
import TopNav from './SubComponents/TopNav'
import BottomNav from './SubComponents/BottomNav'
import viewMore from '../assets/AnimalCare/view-more-arrow.svg'
import viewLess from '../assets/AnimalCare/view-less-arrow.svg'
import viewMoreBlack from '../assets/AnimalCare/view-more-arrow-black.svg'
import viewLessBlack from '../assets/AnimalCare/view-less-arrow-black.svg'
import textPawFilledBlack from '../assets/AnimalCare/text-paw-filled-black.svg'
import textPawUnfilledBlack from '../assets/AnimalCare/text-paw-unfilled-black.svg'
import textPawFilledWhite from '../assets/AnimalCare/text-paw-filled-white.svg'
import textPawUnfilledWhite from '../assets/AnimalCare/text-paw-unfilled-white.svg'
import arrowUp from '../assets/AnimalCare/arrowUp.svg'

import {
    feedDog1, feedDog2, feedDog3, feedDog4, feedDog5, feedDog6,
    dogExercise, dogGrooming, dogMeds, dogNeuter1, dogNeuter2, dogNeuter3,
    feedCat1, feedCat2, feedCat3, feedCat4,
    catGrooming, catLitter, catMeds1, catMeds2, catNeuter1, catNeuter2,
    benefit1, benefit2, benefit3, 
    section1, section2, section3, section4, section5,
    section6, section7, section8, section9, section10,
    tip1, tip2, tip3, tip3_1, tip3_2, tip3_3, tip3_4, tip3_5, tip4_1, tip4_2, tip4_3,
    tip5_1, tip5_2, tip5_3, tip5_4,
} from './SubComponents/AnimalCareSubComp'

const AnimalCare = () => {
    // Adoption Tips
    const [showTipsPrepareHome, setShowTipsPrepareHome] = useState(false)
    const [showTipsConsiderDog, setShowTipsConsiderDog] = useState(false)
    const [showTipsConsiderCat, setShowTipsConsiderCat] = useState(false)

    const togglePrepareHome = () => {
        if(showTipsPrepareHome === false) {
            setShowTipsPrepareHome(true)
        } else {
            setShowTipsPrepareHome(false)
        }
    }

    const toggleConsiderDog = () => {
        if(showTipsConsiderDog === false) {
            setShowTipsConsiderDog(true)
        } else {
            setShowTipsConsiderDog(false)
        }
    }

    const toggleConsiderCat = () => {
        if(showTipsConsiderCat === false) {
            setShowTipsConsiderCat(true)
        } else {
            setShowTipsConsiderCat(false)
        }
    }

    const EmptyView = () => {
        return (
            <View style={styles.empty}></View>
        )
    }

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

    // Scroll to top functionality
    const scrollRef = useRef(null)
    const [contentOffSet, setContentOffset] = useState(0)
    const CONTENT_THRESHOLD = 2234

    const getScrollPosition = (event) => {
        setContentOffset(event.nativeEvent.contentOffset.y)
    }

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView
                style={styles.scroll}
                onScroll={getScrollPosition}
                scrollEventThrottle={1500}
                ref={scrollRef}
            >
                <TopNav ScreenName='Pet Care' color='white' />
                <Text style={styles.header}>Learn how to take care {'\n'}your newfound pets.</Text>
                <Text style={styles.subHeadOne}>
                    In this page we’ve provided some{'\n'}
                    tips, any information that can help{'\n'}
                    you on how to take care of your pets.
                </Text>
                <Text style={styles.subHeadTwo}>
                    And we also included the provisions of{'\n'}
                    R.A. 8485 or the Animal Welfare act of the{'\n'}
                    Philippines, the law to protect our beloved{'\n'}
                    pets from mistreatment, abuse, etc.
                </Text>

                <View style={styles.adoptionTipsContainer}>
                    <Text style={styles.tipsHeader}>Some tips to consider {'\n'}before adopting a pet</Text>
                    <Text style={styles.tipTitle}>Are you ready to adopt?</Text>
                    <View style={styles.textFlex}>
                        <Image style={styles.pawIcon} source={textPawFilledBlack}/>
                        <Text style={styles.tipContent}>
                            {tip1}
                        </Text>
                    </View>

                    <Text style={styles.tipTitle}>Which pet is right for you?</Text>
                    <View style={styles.textFlex}>
                        <Image style={styles.pawIcon} source={textPawFilledBlack}/>
                        <Text style={styles.tipContent}>{tip2}</Text>
                    </View>

                    {/* Prepare Home */}
                    <Text style={styles.tipTitle}>Preparing your home for a new pet</Text>
                    <View style={styles.textFlex}>
                        <Image style={styles.pawIcon} source={textPawFilledBlack}/>
                        <Text style={styles.tipContent}>{tip3}</Text>
                    </View>

                    <View style={styles.tipsMoreContentSection}>
                        <TouchableOpacity style={styles.tipsToggleViewBtn} onPress={() => togglePrepareHome()}>
                            <Image style={styles.tipsToggleViewArrow} source={showTipsPrepareHome ? viewLessBlack : viewMoreBlack}/>
                            <Text style={styles.tipsToggleViewText}>{showTipsPrepareHome ? 'View Less' : 'View More'}</Text>
                        </TouchableOpacity>
                        {
                            showTipsPrepareHome ?
                            <View>
                                <View style={styles.textFlex}>
                                    <Image style={styles.tipsViewPawIcon} source={textPawUnfilledBlack}/>
                                    <Text style={styles.tipsViewText}>{tip3_1}</Text>
                                </View>

                                <View style={styles.textFlex}>
                                    <Image style={styles.tipsViewPawIcon} source={textPawUnfilledBlack}/>
                                    <Text style={styles.tipsViewText}>{tip3_2}</Text>
                                </View>

                                <View style={styles.textFlex}>
                                    <Image style={styles.tipsViewPawIcon} source={textPawUnfilledBlack}/>
                                    <Text style={styles.tipsViewText}>{tip3_3}</Text>
                                </View>
                                
                                <View style={styles.textFlex}>
                                    <Image style={styles.tipsViewPawIcon} source={textPawUnfilledBlack}/>
                                    <Text style={styles.tipsViewText}>{tip3_4}</Text>
                                </View>

                                <View style={styles.textFlex}>
                                    <Image style={styles.tipsViewPawIcon} source={textPawUnfilledBlack}/>
                                    <Text style={styles.tipsViewText}>{tip3_5}</Text>
                                </View>
                            </View>
                            :
                            <EmptyView />
                        }
                    </View>
                    
                    {/* Consider Dog */}
                    <Text style={styles.tipTitle}>If you're considering adopting a dog:</Text>
                    <View style={styles.textFlex}>
                        <Image style={styles.pawIcon} source={textPawFilledBlack}/>
                        <Text style={styles.tipContent}>
                            Loyal and loving, dogs are social animals who thrive on being upstanding members of their families.
                        </Text>
                    </View>

                    <View style={styles.tipsMoreContentSection}>
                        <TouchableOpacity style={styles.tipsToggleViewBtn} onPress={() => toggleConsiderDog()}>
                            <Image style={styles.tipsToggleViewArrow} source={showTipsConsiderDog ? viewLessBlack : viewMoreBlack}/>
                            <Text style={styles.tipsToggleViewText}>{showTipsConsiderDog ? 'View Less' : 'View More'}</Text>
                        </TouchableOpacity>
                        {
                            showTipsConsiderDog ?
                            <View>
                                <View style={styles.textFlex}>
                                    <Image style={styles.tipsViewPawIcon} source={textPawUnfilledBlack}/>
                                    <Text style={styles.tipsViewText}>{tip4_1}</Text>
                                </View>

                                <View style={styles.textFlex}>
                                    <Image style={styles.tipsViewPawIcon} source={textPawUnfilledBlack}/>
                                    <Text style={styles.tipsViewText}>{tip4_2}</Text>
                                </View>

                                <View style={styles.textFlex}>
                                    <Image style={styles.tipsViewPawIcon} source={textPawUnfilledBlack}/>
                                    <Text style={styles.tipsViewText}>{tip4_3}</Text>
                                </View>
                            </View>
                            :
                            <EmptyView />
                        }
                    </View>

                    {/* Consider Cat */}
                    <Text style={styles.tipTitle}>If you're considering adopting a cat:</Text>
                    <View style={styles.textFlex}>
                        <Image style={styles.pawIcon} source={textPawFilledBlack}/>
                        <Text style={styles.tipContent}>
                            Cats are known to be graceful, athletic, playful, sensitive and affectionate.
                        </Text>
                    </View>

                    <View style={styles.tipsMoreContentSection}>
                        <TouchableOpacity style={styles.tipsToggleViewBtn} onPress={() => toggleConsiderCat()}>
                            <Image style={styles.tipsToggleViewArrow} source={showTipsConsiderCat ? viewLessBlack : viewMoreBlack}/>
                            <Text style={styles.tipsToggleViewText}>{showTipsConsiderCat ? 'View Less' : 'View More'}</Text>
                        </TouchableOpacity>
                        {
                            showTipsConsiderCat ?
                            <View>
                                <View style={styles.textFlex}>
                                    <Image style={styles.tipsViewPawIcon} source={textPawUnfilledBlack}/>
                                    <Text style={styles.tipsViewText}>{tip5_1}</Text>
                                </View>

                                <View style={styles.textFlex}>
                                    <Image style={styles.tipsViewPawIcon} source={textPawUnfilledBlack}/>
                                    <Text style={styles.tipsViewText}>{tip5_2}</Text>
                                </View>

                                <View style={styles.textFlex}>
                                    <Image style={styles.tipsViewPawIcon} source={textPawUnfilledBlack}/>
                                    <Text style={styles.tipsViewText}>{tip5_3}</Text>
                                </View>
                                
                                <View style={styles.textFlex}>
                                    <Image style={styles.tipsViewPawIcon} source={textPawUnfilledBlack}/>
                                    <Text style={styles.tipsViewText}>{tip5_4}</Text>
                                </View>
                            </View>
                            :
                            <EmptyView />
                        }
                    </View>
                </View>

                <View style={styles.adoptionBenefitsContainer}>
                    <Text style={styles.benefitsHeader}>Benefits of adopting {'\n'}instead of buying a pet</Text>
                    <View style={styles.textFlex}>
                        <Image style={styles.benefitIcon} source={textPawFilledBlack}/>
                        <Text style={styles.benefitText}>{benefit1}</Text>
                    </View>

                    <View style={styles.textFlex}>
                        <Image style={styles.benefitIcon} source={textPawFilledBlack}/>
                        <Text style={styles.benefitText}>{benefit2}</Text>
                    </View>
                    
                    <View style={styles.textFlex}>
                        <Image style={styles.benefitIcon} source={textPawFilledBlack}/>
                        <Text style={styles.benefitText}>{benefit3}</Text>
                    </View>
                </View>

                <View style={styles.petCareContainer}>
                    <Text style={styles.watermarkPet}>PET</Text>
                    <Text style={styles.watermarkCare}>CARE</Text>

                    <Text style={styles.dogCareHeader}>DOG CARE</Text>
                    <View style={styles.dogFeedingContainer}>
                        <Text style={styles.petCareHeading}>Feeding</Text>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{feedDog1}</Text>
                        </View>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{feedDog2}</Text>
                        </View>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{feedDog3}</Text>
                        </View>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{feedDog4}</Text>
                        </View>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{feedDog5}</Text>
                        </View>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{feedDog6}</Text>
                        </View>
                    </View>

                    <View style={styles.dogExerciseContainer}>
                        <Text style={styles.petCareHeading}>Exercise</Text>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{dogExercise}</Text>
                        </View>
                    </View>

                    <View style={styles.dogGroomingContainer}>
                        <Text style={styles.petCareHeading}>Grooming</Text>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{dogGrooming}</Text>
                        </View>
                    </View>

                    <View style={styles.dogMedicineContainer}>
                        <Text style={styles.petCareHeading}>Medicine and Poisoining</Text>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{dogMeds}</Text>
                        </View>
                    </View>

                    <View style={styles.dogNeuterContainer}>
                        <Text style={styles.petCareHeading}>Spraying and Neutering</Text>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{dogNeuter1}</Text>
                        </View>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{dogNeuter2}</Text>
                        </View>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{dogNeuter3}</Text>
                        </View>
                    </View>

                    <Text style={styles.catCareHeader}>CAT CARE</Text>
                    <View style={styles.catFeedingContainer}>
                        <Text style={styles.petCareHeading}>Feeding</Text>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{feedCat1}</Text>
                        </View>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{feedCat2}</Text>
                        </View>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{feedCat3}</Text>
                        </View>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{feedCat4}</Text>
                        </View>
                    </View>

                    <View style={styles.catGroomingContainer}>
                        <Text style={styles.petCareHeading}>Grooming</Text>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{catGrooming}</Text>
                        </View>
                    </View>

                    <View style={styles.catLitterContainer}>
                        <Text style={styles.petCareHeading}>Litter Box</Text>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{catLitter}</Text>
                        </View>
                    </View>

                    <View style={styles.catMedicineContainer}>
                        <Text style={styles.petCareHeading}>Medicine and Health</Text>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{catMeds1}</Text>
                        </View>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{catMeds2}</Text>
                        </View>
                    </View>

                    <View style={styles.catNeuterContainer}>
                        <Text style={styles.petCareHeading}>Neutering and Vaccination</Text>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{catNeuter1}</Text>
                        </View>
                        <View style={styles.textFlex}>
                            <Image style={styles.petCarePawIcon} source={textPawFilledWhite}/>
                            <Text style={styles.petCareText}>{catNeuter2}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.RA8485_Container}>
                    <Text style={styles.RA_Title}>REPUBLIC ACT 8485</Text>
                    <Text style={styles.RA_Description_1}>
                        Republic act No. 8485 or R.A. 8485 is a law that was {'\n'}
                        passed in 1998 to promote animal welfare in the {'\n'}
                        Philippines. It’s also known as the “ANIMAL WELFARE {'\n'}
                        ACT OF 1998”
                    </Text>
                    <Text style={styles.RA_Description_2}>
                        Be it enacted by the Senate and House of {'\n'}
                        Representatives of the Philippines in Congress {'\n'}
                        assembled the following: 
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
                    
                    <View style={styles.marginBottom}></View>
                </View>
            </ScrollView>

            {contentOffSet > CONTENT_THRESHOLD &&
                <TouchableOpacity style={styles.scrollToTopBtn}
                    onPress={() => scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <Image
                        style={styles.scrollToTop_Img}
                        source={arrowUp}
                    />
                </TouchableOpacity>
            }
            
            <BottomNav />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    empty: {
        display: 'none',
    },

    textFlex: {
        display: 'flex',
        flexDirection: 'row',
    },

    body: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
    },

    scroll: {
        flex: 1,
    },

    scrollToTopBtn: {
        position: 'absolute',
        bottom: 95,
        right: 15,
        zIndex: 5,
        width: 38,
        height: 38,
        backgroundColor: '#EC4814',
        borderRadius: 50,
    },

    scrollToTop_Img: {
        height: 32,
        width: 32,
        marginTop: 2.5,
        marginRight: 'auto',
        marginLeft: 'auto',
    },

    header: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 27.2,
        marginTop: 80,
        marginLeft: 35,
        marginRight: 35,

    },

    subHeadOne: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        lineHeight: 30,
        marginTop: 25,
        marginLeft: 35,
        marginRight: 35,
    },

    subHeadTwo: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        lineHeight: 30,
        marginTop: 15,
        marginRight: 35,
        marginLeft: 35,
    },

    adoptionTipsContainer: {
        backgroundColor: '#ffff66',
        marginTop: 80,
        paddingTop: 60,
        paddingRight: 35,
        paddingBottom: 60,
        paddingLeft: 35,
    },

    tipsHeader: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 28,
        textAlign: 'center',
    },

    tipTitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 19,
        marginTop: 40,
    },

    pawIcon: {
        width: 15,
        height: 15,
        marginTop: 14,
    },

    tipContent: {   
        fontFamily: 'Poppins_400Regular',
        fontSize: 14.5,
        lineHeight: 30,
        marginTop: 10,
        marginLeft: 7,
    },

    tipsToggleViewBtn: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 10,
        marginLeft: -30,
        transform: [{ scale: .85 }],
    },

    tipsToggleViewArrow: {
        width: 17,
        height: 17,
    },

    tipsToggleViewText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14.5,
        marginLeft: 5,
    },

    tipsViewText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14.5,
        lineHeight: 30,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 5,
        position: 'relative',
    },

    tipsViewPawIcon: {
        width: 15,
        height: 15,
        marginTop: 14,
        marginLeft: 33,
    },

    adoptionBenefitsContainer: {
        paddingTop: 60,
        paddingRight: 35,
        paddingBottom: 60,
        paddingLeft: 35,
        backgroundColor: 'white',
    },

    benefitsHeader: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 28,
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center',
    },

    benefitIcon: {
        width: 15,
        height: 15,
        marginTop: 33,
    },

    benefitText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14.5,
        lineHeight: 30,
        marginTop: 30,
        marginLeft: 7,
        position: 'relative', 
    },

    petCareContainer: {
        backgroundColor: '#111',
        paddingTop: 60,
        paddingRight: 35,
        paddingBottom: 60,
        paddingLeft: 35,
        position: 'relative',
    },

    watermarkPet: {
        color: '#0000001a',
        fontFamily: 'Poppins_900Black',
        fontSize: 160,
        position: 'absolute',
        top: 0,
        left: 0,
    },

    watermarkCare: {
        color: '#0000001a',
        fontFamily: 'Poppins_900Black',
        fontSize: 160,
        position: 'absolute',
        top: 0,
        left: 0,
    },

    dogCareHeader: {
        color: 'white',
        fontFamily: 'Poppins_700Bold',
        fontSize: 35,
        marginBottom: 10,
        textAlign: 'center',
    },

    catCareHeader: {
        color: 'white',
        fontFamily: 'Poppins_700Bold',
        fontSize: 35,
        marginTop: 100,
        marginBottom: 10,
        textAlign: 'center',
    },

    petCareHeading: {
        color: 'white',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 21,
        marginTop: 30,
        marginBottom: 5,
    },

    petCarePawIcon: {
        width: 15,
        height: 15,
        marginTop: 10,
    },

    petCareText: {
        color: 'white',
        fontFamily: 'Poppins_200ExtraLight',
        fontSize: 14.5,
        lineHeight: 30,
        marginTop: 7,
        marginBottom: 7,
        marginLeft: 7,
    },

    RA8485_Container: {
        paddingRight: 35,
        paddingBottom: 100,
        paddingLeft: 35,
        backgroundColor: '#FFFF66',
    },

    RA_Title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 24,
        marginTop: 60,
    },

    RA_Description_1: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 13.2,
        marginTop: 20,
        lineHeight: 30,
    },

    RA_Description_2: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 13.2,
        marginTop: 10,
        marginRight: 35,
        marginBottom: 10,
        lineHeight: 30,
    },
});

export default AnimalCare;
