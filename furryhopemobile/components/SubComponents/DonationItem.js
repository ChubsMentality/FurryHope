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
        backgroundColor: '#111',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginRight: 35,
        marginLeft: 35,
        paddingTop: 10,
        paddingRight: 15,
        paddingBottom: 10,
        paddingLeft: 15,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 1,
        //     height: 3,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 10,
        width: '82.5%',
    },

    itemLabel: {
        color: 'white',
        fontFamily: 'PoppinsMedium',
        fontSize: 13,
    },

    itemValue: {
        color: 'white',
        fontFamily: 'PoppinsLight',
    },

    deleteIcon: {
        height: 25,
        width: 25,
    },
})

export default DonationItem