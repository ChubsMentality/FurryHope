import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const TopNav = (props) => {
    // Context
    const navigation = useNavigation();

    return (
        <View style={{ height: 'auto', width: '100%', flexDirection: 'row', alignItems: 'center', zIndex: 5, }}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Ionicons name='ios-menu-sharp' size={30} style={{ marginTop: 27, marginLeft: 27 }} color={props.color} />
            </TouchableOpacity>
            <Text style={{ color: `${props.color}`, fontFamily: 'PoppinsMedium', fontSize: 12.8, marginTop: 27, marginLeft: 10 }}>{props.ScreenName}</Text> 
        </View>
    )
}

export default TopNav
