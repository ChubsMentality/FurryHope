import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { tip1, tip2, tip3, tip3_1, tip3_2, tip3_3, tip3_4, tip3_5, tip4_1, tip4_2, tip4_3, tip5_1, tip5_2, tip5_3, tip5_4 } from '../AnimalCareSubComp'
import Ionicons from 'react-native-vector-icons/Ionicons' // md-paw-sharp, md-paw-outline

const ThingsToConsider = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingBottom: 40, }}>
            <ScrollView style={{ paddingRight: 30, paddingLeft: 30 }}>
                <Text style={styles.header}>Things to consider before adopting a pet</Text>

                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{tip1}</Text>

                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{tip2}</Text>

                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{tip3}</Text>

                <Text style={styles.subTipTxt}><Ionicons name='md-paw-outline' size={15.5} color='#111' style={styles.tipOlImg} />{tip3_1}</Text>

                <Text style={styles.subTipTxt}><Ionicons name='md-paw-outline' size={15.5} color='#111' style={styles.tipOlImg} />{tip3_2}</Text>

                <Text style={styles.subTipTxt}><Ionicons name='md-paw-outline' size={15.5} color='#111' style={styles.tipOlImg} />{tip3_3}</Text>

                <Text style={styles.subTipTxt}><Ionicons name='md-paw-outline' size={15.5} color='#111' style={styles.tipOlImg} />{tip3_4}</Text>

                <Text style={styles.subTipTxt}><Ionicons name='md-paw-outline' size={15.5} color='#111' style={styles.tipOlImg} />{tip3_5}</Text>

                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{tip4_1}</Text>

                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{tip4_2}</Text>

                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{tip4_3}</Text>

                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{tip5_1}</Text>
                
                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{tip5_2}</Text>

                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{tip5_3}</Text>

                <Text style={styles.tipTxt}><Ionicons name='md-paw-sharp' size={15.5} color='#111' style={styles.tipOlImg} />{tip5_4}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ThingsToConsider

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

    subTipTxt: {
        fontFamily: 'PoppinsLight',
        fontSize: 15,
        lineHeight: 30,
        marginBottom: 25,
        marginLeft: 15,
        textAlign: 'justify',
    },

})