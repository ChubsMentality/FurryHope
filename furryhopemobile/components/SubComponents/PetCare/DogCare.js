import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { feedDog1, feedDog2, feedDog3, feedDog4, feedDog5, feedDog6, dogExercise, dogMeds, dogGrooming, dogNeuter1, dogNeuter2, dogNeuter3 } from '../AnimalCareSubComp'
import Ionicons from 'react-native-vector-icons/Ionicons' // md-paw-sharp, md-paw-outline

const DogCare = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingBottom: 15 }}>
            <ScrollView style={{ paddingRight: 30, paddingLeft: 30 }}>
                <Text style={styles.tipsHeader}>Feeding</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{feedDog1}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{feedDog2}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{feedDog3}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{feedDog4}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{feedDog5}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{feedDog6}</Text>
                <Text style={styles.tipsHeader}>Excercise & Health</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{dogExercise}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{dogMeds}</Text>
                <Text style={styles.tipsHeader}>Grooming</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{dogGrooming}</Text>
                <Text style={styles.tipsHeader}>Spraying & Neutering</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{dogNeuter1}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{dogNeuter2}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{dogNeuter3}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DogCare

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