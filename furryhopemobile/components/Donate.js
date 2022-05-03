import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, useWindowDimensions, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useContext } from 'react'
import { Picker } from '@react-native-picker/picker'
import { CredentialsContext } from './CredentialsContext'
import DonationItem from './SubComponents/DonationItem'
import uuid from 'react-native-uuid'
import axios from 'axios'
import BottomNav from './SubComponents/BottomNav'
import returnIcon from '../assets/Icons/returnIcon.svg'
import closeModalIcon from '../assets/UserPreference/closeModalRed.svg'
import addIcon from '../assets/Icons/add-icon-plus.png'


const Donate = () => {
    const navigation = useNavigation() 
    const window = useWindowDimensions()
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [loading, setLoading] = useState(false)

    // Date of Donation
    const [selectedMonth, setSelectedMonth] = useState('January')
    const [selectedDay, setSelectedDay] = useState('01')
    const [selectedYear, setSelectedYear] = useState('2022')

    // Time
    const [hour, setHour] = useState('1')
    const [minute, setMinute] = useState('00')
    const [timePeriod, setTimePeriod] = useState('AM')

    let yearOptions = []
    for(var i = 2022; i <= 2050; i++) {
        yearOptions.push(i)
    }

    const [items, setItems] = useState([])
    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [overlay, setOverlay] = useState(false)
    const [addItemModal, setAddItemOverlay] = useState(false)

    console.log(`${hour}:${minute} ${timePeriod}`)

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedCredentials.token}`
        }
    }

    const toggleModal = () => {
        setAddItemOverlay(!addItemModal)
        setOverlay(!overlay)
    }

    const addToItemsHandler = () => {
        setItems([...items, { id: uuid.v4(), itemName: itemName, quantity: quantity }])
        setItemName('')
        setQuantity('')
        toggleModal()
    }

    const deleteFromItems = (id) => {
        alert('Successfully removed the item')
        setItems(items.filter((item) => item.id !== id))
    }

    const submitHandler = async () => {
        setLoading(true)

        if(!name || !email || !contactNo || !selectedMonth || !selectedDay || !selectedYear || !hour || !minute || !timePeriod || !items ) {
            alert('Fill out the necessary fields.')
        }

        if(selectedMonth === 'February' && selectedDay === '29') {
            alert('Invalid Date, Choose a valid one')
        } else if(selectedMonth === 'February' && selectedDay === '30') {
            alert('Invalid Date, Choose a valid one')
        } else if(selectedMonth === 'February' && selectedDay === '31') {
            alert('Invalid Date, Choose a valid one')
        } else if(selectedMonth === 'April' && selectedDay === '31') {
            alert('Invalid Date, Choose a valid one')
        } else if(selectedMonth === 'June' && selectedDay === '31') {
            alert('Invalid Date, Choose a valid one')
        } else if(selectedMonth === 'September' && selectedDay === '31') {
            alert('Invalid Date, Choose a valid one')
        } else if(selectedMonth === 'November' && selectedDay === '31') {
            alert('Invalid Date, Choose a valid one')
        } else {
            let dateOfDonation = `${selectedMonth} ${selectedDay}, ${selectedYear}`
            let time = `${hour}:${minute} ${timePeriod}`

            console.log(dateOfDonation)
            console.log(time)

            try {
                const { data } = await axios.post('http://localhost:5000/api/users/submitDonation', 
                { dateOfDonation, time, name, email, contactNo, items }, config)

                console.log(data)
                alert('Thank you for donating, it will help the animals.')
            } catch (error) {
                console.log(error)
            }

            setName('')
            setEmail('')
            setContactNo('')
            setItems([])
        }

        setLoading(false)
    }

    // console.log(items)

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Image style={styles.backIcon} source={returnIcon} />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>

                <Text style={[styles.label, styles.date]}>Date of Donation</Text>
                <View style={styles.dateContainer}>
                    {/* Month */}
                    <Picker
                        selectedValue={selectedMonth}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedMonth(itemValue)
                        }}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label='January' value='January' />
                        <Picker.Item label='February' value='February' />
                        <Picker.Item label='March' value='March' />
                        <Picker.Item label='April' value='April' />
                        <Picker.Item label='May' value='May' />
                        <Picker.Item label='June' value='June' />
                        <Picker.Item label='July' value='July' />
                        <Picker.Item label='August' value='August' />
                        <Picker.Item label='September' value='September' />
                        <Picker.Item label='October' value='October' />
                        <Picker.Item label='November' value='November' />
                        <Picker.Item label='December' value='December' />
                    </Picker>

                    {/* Day */}
                    <Picker
                        selectedValue={selectedDay}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedDay(itemValue)
                        }}
                        style={[styles.picker, styles.middlePicker]}
                        itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                        <Picker.Item label='7' value='7' />
                        <Picker.Item label='8' value='8' />
                        <Picker.Item label='9' value='9' />
                        <Picker.Item label='10' value='10' />
                        <Picker.Item label='11' value='11' />
                        <Picker.Item label='12' value='12' />
                        <Picker.Item label='13' value='13' />
                        <Picker.Item label='14' value='14' />
                        <Picker.Item label='15' value='15' />
                        <Picker.Item label='16' value='16' />
                        <Picker.Item label='17' value='17' />
                        <Picker.Item label='18' value='18' />
                        <Picker.Item label='19' value='19' />
                        <Picker.Item label='20' value='20' />
                        <Picker.Item label='21' value='21' />
                        <Picker.Item label='22' value='22' />
                        <Picker.Item label='23' value='23' />
                        <Picker.Item label='24' value='24' />
                        <Picker.Item label='25' value='25' />
                        <Picker.Item label='26' value='26' />
                        <Picker.Item label='27' value='27' />
                        <Picker.Item label='28' value='28' />
                        <Picker.Item label='29' value='29' />
                        <Picker.Item label='30' value='30' />
                        <Picker.Item label='31' value='31' />
                    </Picker>

                    {/* Year */}
                    <Picker
                        selectedValue={selectedYear}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedYear(itemValue)
                        }}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                        {yearOptions.map((year) => (
                            <Picker.Item label={year} value={year} key={year} />
                        ))}
                    </Picker>
                </View>   

                <Text style={[styles.label, styles.time]}>Time</Text>
                <View style={styles.timeContainer}>
                    {/* Hour */}
                    <Picker 
                        selectedValue={hour}
                        onValueChange={(itemValue, itemIndex) => {
                            setHour(itemValue)
                        }}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                        <Picker.Item label='7' value='7' />
                        <Picker.Item label='8' value='8' />
                        <Picker.Item label='9' value='9' />
                        <Picker.Item label='10' value='10' />
                        <Picker.Item label='11' value='11' />
                        <Picker.Item label='12' value='12' />
                    </Picker>

                    {/* Minute */}
                    <Picker
                        selectedValue={minute}
                        onValueChange={(itemValue, itemIndex) => {
                            setMinute(itemValue)
                        }}
                        style={[styles.picker, styles.middlePicker]}
                        itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label='00' value='00' />
                        <Picker.Item label='01' value='01' />
                        <Picker.Item label='02' value='02' />
                        <Picker.Item label='03' value='03' />
                        <Picker.Item label='04' value='04' />
                        <Picker.Item label='05' value='05' />
                        <Picker.Item label='06' value='06' />
                        <Picker.Item label='07' value='07' />
                        <Picker.Item label='08' value='08' />
                        <Picker.Item label='09' value='09' />
                        <Picker.Item label='10' value='10' />
                        <Picker.Item label='11' value='11' />
                        <Picker.Item label='12' value='12' />
                        <Picker.Item label='13' value='13' />
                        <Picker.Item label='14' value='14' />
                        <Picker.Item label='15' value='15' />
                        <Picker.Item label='16' value='16' />
                        <Picker.Item label='17' value='17' />
                        <Picker.Item label='18' value='18' />
                        <Picker.Item label='19' value='19' />
                        <Picker.Item label='20' value='20' />
                        <Picker.Item label='21' value='21' />
                        <Picker.Item label='22' value='22' />
                        <Picker.Item label='23' value='23' />
                        <Picker.Item label='24' value='24' />
                        <Picker.Item label='25' value='25' />
                        <Picker.Item label='26' value='26' />
                        <Picker.Item label='27' value='27' />
                        <Picker.Item label='28' value='28' />
                        <Picker.Item label='29' value='29' />
                        <Picker.Item label='30' value='30' />
                        <Picker.Item label='31' value='31' />
                        <Picker.Item label='32' value='32' />
                        <Picker.Item label='33' value='33' />
                        <Picker.Item label='34' value='34' />
                        <Picker.Item label='35' value='35' />
                        <Picker.Item label='36' value='36' />
                        <Picker.Item label='37' value='37' />
                        <Picker.Item label='38' value='38' />
                        <Picker.Item label='39' value='39' />
                        <Picker.Item label='40' value='40' />
                        <Picker.Item label='41' value='41' />
                        <Picker.Item label='42' value='42' />
                        <Picker.Item label='43' value='43' />
                        <Picker.Item label='44' value='44' />
                        <Picker.Item label='45' value='45' />
                        <Picker.Item label='46' value='46' />
                        <Picker.Item label='47' value='47' />
                        <Picker.Item label='48' value='48' />
                        <Picker.Item label='49' value='49' />
                        <Picker.Item label='50' value='50' />
                        <Picker.Item label='51' value='51' />
                        <Picker.Item label='52' value='52' />
                        <Picker.Item label='53' value='53' />
                        <Picker.Item label='54' value='54' />
                        <Picker.Item label='55' value='55' />
                        <Picker.Item label='56' value='56' />
                        <Picker.Item label='57' value='57' />
                        <Picker.Item label='58' value='58' />
                        <Picker.Item label='59' value='59' />
                    </Picker>

                    {/* Time Period */}
                    <Picker
                        selectedValue={timePeriod}
                        onValueChange={(itemValue, itemIndex) => {
                            setTimePeriod(itemValue)
                        }}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label='AM' value='AM' />
                        <Picker.Item label='PM' value='PM' />
                    </Picker>
                </View>

                <Text style={[styles.label, styles.name]}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Contact Number</Text>
                <TextInput
                    style={styles.input}
                    value={contactNo}
                    onChangeText={setContactNo}
                    maxLength={11}
                />

                <View style={styles.addItemContainer}>
                    <Text style={styles.itemsLabel}>Items to Donate</Text>
                    
                    <TouchableOpacity style={styles.toggleAddItemModal} onPress={() => toggleModal()}>
                        <Image style={styles.addIcon} source={addIcon} />
                        <Text style={styles.addText}>Add</Text>
                    </TouchableOpacity>
                </View>

                {items && items.map((item) => (
                    <DonationItem
                        key={item.id}
                        id={item.id}
                        itemName={item.itemName}
                        quantity={item.quantity}
                        deleteFromItems={deleteFromItems}
                    />
                ))}

                <TouchableOpacity style={styles.submitBtn} onPress={() => submitHandler()}>
                    {loading ?
                        <ActivityIndicator color='white' style={{ marginTop: 12 }} /> 
                        :
                        <Text style={styles.submitText}>SUBMIT</Text>
                    }
                </TouchableOpacity>
            </ScrollView>

            <BottomNav />

            {addItemModal &&
                <View style={styles.addItemModal}>
                    <TouchableOpacity style={styles.closeModalBtn} onPress={() => toggleModal()}>
                        <Image style={styles.closeModalIcon} source={closeModalIcon} />
                    </TouchableOpacity>

                    <Text style={styles.addItemLabel}>Add an Item</Text>
                    <TextInput
                        style={[styles.input, styles.inputItemName]}
                        value={itemName}
                        onChangeText={setItemName}
                        placeholder='Item Name (e.g. Dog Treats)' 
                    />

                    <TextInput 
                        style={[styles.input, styles.inputQuantity]}
                        value={quantity}
                        onChangeText={setQuantity}
                        placeholder='Quantity'
                    />

                    <TouchableOpacity style={styles.addToItemsBtn} onPress={() => addToItemsHandler()}>
                        <Text style={styles.addToItemsText}>ADD</Text>
                    </TouchableOpacity>
                </View>
            }

            {overlay &&
                <View style={{
                    width: window.width, 
                    height: window.height, 
                    backgroundColor: '#111',
                    opacity: .5,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 5
                }}></View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
    },

    backBtn: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 20,
    },

    backIcon: {
        height: 23,
        width: 23,
    },

    backText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14.5,
        marginTop: 2,
        marginLeft: 7,
    },

    label: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        marginBottom: 4,
        marginLeft: 46,
    },

    name: {
      marginTop: 30,  
    },

    input: {
        borderColor: '#b0b0b0',
        borderStyle: 'solid',
        borderWidth: 1,
        width: '77%',
        height: 40,
        fontFamily: 'Poppins_400Regular',
        marginBottom: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingTop: 5,
        paddingRight: 7,
        paddingBottom : 5,
        paddingLeft: 7,
    },

    date: {
        marginTop: 45,
    }, 
    
    time: {
        marginTop: 10,
    },

    dateContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 46,
        marginLeft: 46,
    },

    timeContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 46,
        marginLeft: 46,
    },

    picker: {
        fontSize: 14,
        fontFamily: 'Poppins_300Light',
        paddingTop: 2,
        paddingRight: 5,
        paddingBottom: 2,
        paddingLeft: 5,
    },

    middlePicker: {
        marginRight: 5,
        marginLeft: 5,
    },

    pickerItem: {
        fontFamily: 'Poppins_300Light',
        fontSize: 11,
    },

    addItemContainer: {
        marginTop: 40,
        marginRight: 46,
        marginBottom: 10,
        marginLeft: 46,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '77%',
    },

    itemsLabel: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
    },

    toggleAddItemModal: {
        backgroundColor: '#111',
        borderRadius: 25,
        alignSelf: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 10,
    },

    addIcon: {
        width: 16,
        height: 16,
        marginRight: 1,
    },

    addText: {
        color: 'white',
        marginLeft: 1,
        fontSize: 13,
        fontFamily: 'Poppins_500Medium'
    },

    addItemModal: {
        position: 'fixed',
        zIndex: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        top: '25%',
        left: '50%',
        transform: [{
            translateX: '-50%',
            translateY: '-25%',
        }],
        height: 300,
        width: 300,
        paddingTop: 10,
        paddingBottom: 10,
    },

    closeModalBtn: {
        display: 'flex',
        alignSelf: 'flex-end',
        marginRight: 12,
    },

    closeModalIcon: {
        width: 23,
        height: 23,
        zIndex: 11,
    },

    addItemLabel: {
        marginTop: 15,
        marginBottom: 5,
        marginLeft: 35,
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
    },

    inputItemName: {
        marginTop: 3,
        marginBottom: 0,
    },

    inputQuantity: {
        marginTop: 10,
        marginBottom: 0,
    },

    addToItemsBtn: {
        width: '77%',
        height: 45,
        backgroundColor: '#111',
        marginTop: 45,
        marginRight: 'auto',
        marginLeft: 'auto',
    },

    addToItemsText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        marginTop: 'auto',
        marginBottom: 'auto',
    },

    submitBtn: {
        width: '77%',
        height: 50,
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundColor: '#111',
        marginTop: 60,
        marginBottom: 100,
    },

    submitText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 21,
        color: 'white',
        textAlign: 'center',
        marginTop: 8,
    }, 
})

export default Donate