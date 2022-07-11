import React from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'

/*
    Props to pass:
    1. sectionName
    2. toggleFunction
    3. viewState
    4. viewMoreOrLess
    5. sectionContent
*/

const RASections = (props) => {
    return (
        <View style={styles.RA_Sections}>
            <TouchableOpacity style={styles.RA_Section_Header} onPress={() => props.toggleFunction()}>
                <Text style={styles.RA_Section_Name}>{props.sectionName}</Text>

                <TouchableOpacity style={styles.RA_View_Options} onPress={() => props.toggleFunction()}>
                    <Text style={styles.viewOption}>{props.viewState ? 'View Less' : 'View More'}</Text>
                    <Image source={props.viewMoreOrLess} style={styles.viewOptionImage} />
                </TouchableOpacity>
            </TouchableOpacity>

            {props.viewState ?
                <View style={styles.RA_Section_Content}>
                    <Text style={styles.content}>{props.sectionContent}</Text>
                </View>
                :
                <View style={styles.emptyView}></View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    emptyView: {
        display: 'none',
    },

    RA_Sections: {
        marginTop: 20,
    },

    RA_Section_Header: {
        backgroundColor: '#111',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingRight: 20,
        paddingBottom: 15,
        paddingLeft: 20,
    },

    RA_Section_Name: {
        color: 'white',
        fontFamily: 'PoppinsBold',
        fontSize: 14.4,
    },

    RA_View_Options: {
        display: 'flex',
        flexDirection: 'row',
    },

    viewOption: {
        color: 'white',
        fontFamily: 'PoppinsLight',
        fontSize: 11.2,
        marginTop: 2,
        marginRight: 5,
    },

    viewOptionImage: {
        width: 20,
        height: 20,
    },

    RA_Section_Content: {
        backgroundColor: '#232020',
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 15,
        paddingLeft: 15,
    },

    content: {
        color: 'white',
        fontFamily: 'PoppinsRegular',
        fontSize: 13,
        lineHeight: 30,
        textAlign: 'justify',
    }
})

export default RASections
