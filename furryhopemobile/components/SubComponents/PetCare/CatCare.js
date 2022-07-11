import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import {feedCat1, feedCat2, feedCat3, feedCat4, catGrooming, catLitter, catMeds1, catMeds2, catNeuter1, catNeuter2 } from '../AnimalCareSubComp'
import Ionicons from 'react-native-vector-icons/Ionicons' // md-paw-sharp, md-paw-outline

const CatCare = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingBottom: 15 }}>
            <ScrollView style={{ paddingRight: 30, paddingLeft: 30 }}>
                <Text style={styles.tipsHeader}>Feeding</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{feedCat1}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{feedCat2}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{feedCat3}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{feedCat4}</Text>
                <Text style={styles.tipsHeader}>Grooming</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{catGrooming}</Text>
                <Text style={styles.tipsHeader}>Cat Litter</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{catLitter}</Text>
                <Text style={styles.tipsHeader}>Medicine & Health</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{catMeds1}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{catMeds2}</Text>
                <Text style={styles.tipsHeader}>Neutering & Vaccination</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{catNeuter1}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{catNeuter2}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CatCare

const styles = StyleSheet.create({
    header: {
        fontFamily: 'PoppinsBold',
        fontSize: 30,
        lineHeight: 42,
        marginTop: 50,
        marginBottom: 38,
    },

    tipsHeader: {
        fontFamily: 'PoppinsBold',
        fontSize: 20,
        marginTop: 30,
        marginBottom: 10,
    },

    tipOlImg: {
        marginTop: 3,
        marginRight: 8,
    },

    tipTxt: {
        fontFamily: 'PoppinsLight',
        fontSize: 15,
        lineHeight: 30,
        marginBottom: 20,
        textAlign: 'justify',
    },
})