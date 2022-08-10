import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import OnBoardingJpg from '../assets/Images/onBoarding.jpg'
import TopLeft from '../assets/Images/TopLeft.png'
import MidLeft from '../assets/Images/MidLeft.png'
import BottomLeft from '../assets/Images/BottomLeft.png'
import Right1 from '../assets/Images/Right1.png'
import Right2 from '../assets/Images/Right2.png'
import Right3 from '../assets/Images/Right3.png'

const OnBoarding = ({ navigation }) => {
    const fade1 = useRef(new Animated.Value(0)).current
    const fade2 = useRef(new Animated.Value(0)).current
    const fade3 = useRef(new Animated.Value(0)).current
    const fade4 = useRef(new Animated.Value(0)).current
    const fade5 = useRef(new Animated.Value(0)).current
    const fade6 = useRef(new Animated.Value(0)).current
    const fadeHeader = useRef(new Animated.Value(0)).current
    const fadeSub = useRef(new Animated.Value(0)).current
    const fadeBtn = useRef(new Animated.Value(0)).current

    const fadeHandler = () => {
        Animated.parallel([
            Animated.timing(fadeHeader, {
                toValue: 1,
                easing: Easing.in,
                delay: 1000,
                useNativeDriver: true
            }),
            Animated.timing(fadeSub, {
                toValue: 1,
                easing: Easing.in,
                delay: 1200,
                useNativeDriver: true
            }),
            Animated.timing(fadeBtn, {
                toValue: 1,
                easing: Easing.in,
                delay: 1800,
                useNativeDriver: true
            }),
        ]).start()
    }

    const fadeImages = () => {
        Animated.parallel([
                Animated.stagger(300, [
                Animated.timing(fade1, {
                    toValue: 1,
                    easing: Easing.in,
                    useNativeDriver: true
                }),
                Animated.timing(fade2, {
                    toValue: 1,
                    easing: Easing.in,
                    useNativeDriver: true
                }),
                Animated.timing(fade3, {
                    toValue: 1,
                    easing: Easing.in,
                    useNativeDriver: true
                }),
            ]),
    
            Animated.stagger(250, [
                Animated.timing(fade6, {
                    toValue: 1,
                    easing: Easing.in,
                    useNativeDriver: true
                }),
                Animated.timing(fade5, {
                    toValue: 1,
                    easing: Easing.in,
                    useNativeDriver: true
                }),
                Animated.timing(fade4, {
                    toValue: 1,
                    easing: Easing.in,
                    useNativeDriver: true
                }),
            ])
        ]).start()
    }

    useEffect(() => {
        fadeImages()
        fadeHandler()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, position: 'relative', paddingLeft: 40, paddingRight: 40 }}>
            <View style={styles.container}>
                <View style={styles.containerLeft}>
                    <Animated.View style={[styles.item, styles.item1, { opacity: fade1 }]}>
                        <Image style={{ flex: 1 }} source={TopLeft} />
                    </Animated.View>

                    <Animated.View style={[styles.item, styles.item2, { opacity: fade2, }]}>
                        <Image style={{ flex: 1 }} source={MidLeft} />
                    </Animated.View>

                    <Animated.View style={[styles.item, styles.item3, { opacity: fade3, }]}>
                        <Image style={{ flex: 1 }} source={BottomLeft} />
                    </Animated.View>
                </View>

                <View style={styles.containerRight}>
                    <Animated.View style={[styles.item, styles.item4, { opacity: fade4, }]}>
                        <Image style={{ flex: 1 }} source={Right1} />
                    </Animated.View>

                    <View style={styles.cRightSubContainer}>
                        <Animated.View style={[styles.item, styles.item5, { opacity: fade5, }]}>
                            <Image style={{ flex: 1 }} source={Right2} />
                        </Animated.View>

                        <Animated.View style={[styles.item, styles.item6, { opacity: fade6, }]}>
                            <Image style={{ flex: 1 }} source={Right3} />
                        </Animated.View>
                    </View>
                </View>
            </View>

            <Animated.Text style={[styles.header, { opacity: fadeHeader }]}>Lorem ipsum dolor sit amet.</Animated.Text>
            <Animated.Text style={[styles.subHeader, { opacity: fadeSub }]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia et rerum voluptate deserunt, aut dolorem!</Animated.Text>

            <Animated.View style={{ opacity: fadeBtn }}>
                <TouchableOpacity style={styles.getStartedBtn} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.getStartedTxt}>GET STARTED</Text>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    )
}

export default OnBoarding

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        marginBottom: 35,
    },

    containerLeft: {
        gap: 8,
    },

    containerRight: {
        gap: 5,
    },

    cRightSubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    item: {
        // height: 30,
        // width: 30,
        // backgroundColor: '#b0b0b0',
        borderRadius: 5,
    },

    item1: {
        height: 72,
        width: 145,
    },

    item2: {
        height: 143,
        width: 145,
    },

    item3: {
        height: 114,
        width: 145,
    },

    item4: {
        height: 172,
        width: 177,
    },

    item5: {
        height: 168,
        width: 42,
    },
    
    item6: {
        height: 168,
        width: 127,
    },

    header: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 40,
    },

    subHeader: {
        fontFamily: 'PoppinsExtraLight',
        fontSize: 16,
        marginTop: 10,
    },

    getStartedBtn: {
        height: 60,
        backgroundColor: '#111',
        with: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 90,
    },

    getStartedTxt: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'PoppinsBold',
    },
})