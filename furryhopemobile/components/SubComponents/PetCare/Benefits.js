import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { benefit1, benefit2, benefit3 } from '../AnimalCareSubComp'
import Ionicons from 'react-native-vector-icons/Ionicons' // md-paw-sharp, md-paw-outline

const Benefits = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={{ paddingRight: 30, paddingLeft: 30 }}>
                <Text style={styles.header}>Benefits of Adopting an animal instead of buying one.</Text>

                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{benefit1}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{benefit2}</Text>
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{benefit3}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Benefits

const styles = StyleSheet.create({
    header: {
        fontFamily: 'PoppinsBold',
        fontSize: 30,
        lineHeight: 42,
        marginTop: 50,
        marginBottom: 38,
    },

    tipOlImg: {
        marginTop: 3,
        marginRight: 8,
    },

    tipTxt: {
        fontFamily: 'PoppinsLight',
        fontSize: 15,
        lineHeight: 30,
        marginBottom: 25,
        textAlign: 'justify',
    },
})