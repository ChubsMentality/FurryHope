import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import deleteIcon from '../../assets/Icons/delete-item.png'

const DonationItem = (props) => {
    // Props - item, itemName, quantity, deleteFromItems

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemLabel}>Item: <Text style={styles.itemValue}>{props.itemName}</Text></Text>  
                <Text style={styles.itemLabel}>Quantity: <Text style={styles.itemValue}>{props.quantity}</Text></Text>  
            </View>

            <TouchableOpacity style={styles.deleteItemBtn} onPress={() => props.deleteFromItems(props.id)}>
                <Image style={styles.deleteIcon} source={deleteIcon} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        // backgroundColor: '#111',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        width: '77%',
    },

    itemLabel: {
        // color: 'white',
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
    },

    itemValue: {
        fontFamily: 'Poppins_200ExtraLight',
    },

    deleteIcon: {
        height: 25,
        width: 25,
    },
})

export default DonationItem