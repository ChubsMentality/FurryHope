import React, { useState, useEffect } from 'react'
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ViewAnimalData = ({ navigation, route }) => {
    const [id, setId] = useState('')
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('')
    const [gender, setGender] = useState('');
    const [animalType, setAnimalType] = useState('');
    const [size, setSize] = useState('')
    const [adoptionStatus, setAdoptionStatus] = useState('');
    const [animalImg, setAnimalImg] = useState('');

    const pendingAdoption = adoptionStatus === 'Pending'
    const adopted = adoptionStatus === 'Adopted'

    const { animalId } = route.params;

    const getDataById = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/animals/${animalId}`)
            console.log(data)
            setId(data._id)
            setName(data.name)
            setBreed(data.breed)
            setDescription(data.description)
            setColor(data.color)
            setGender(data.gender)
            setAnimalType(data.type)
            setSize(data.size)
            setAdoptionStatus(data.adoptionStatus)
            setAnimalImg(data.animalImg)
            
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    useEffect(() => {
        getDataById();
    }, [animalId]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', position: 'relative' }}>
            <ImageBackground style={styles.animalImgBg} source={animalImg}>
                <TouchableOpacity style={styles.returnBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back' size={24} color='#111' />
                </TouchableOpacity>
            </ImageBackground>
            
            <View style={styles.animalInfoContainer}>
                <ScrollView>
                    <View>
                        <View style={styles.mainInfoContainer}>
                            <View style={styles.nameBreedContainer}>
                                <Text style={styles.name}>{name},</Text>
                                <Text style={styles.breed}> {breed}</Text>
                            </View>
                            <Text style={styles.idLabel}>ID: <Text style={styles.idValue}>{id}</Text></Text>
                        </View>
                    </View>

                    <View style={styles.otherInfo}>
                        <View style={styles.otherInfoContainer}>
                            <Text style={styles.otherInfoValue}>{color}</Text>
                            <Text style={styles.otherInfoLabel}>Color</Text>
                        </View>

                        <View style={styles.otherInfoContainer}>
                            <Text style={styles.otherInfoValue}>{size}</Text>
                            <Text style={styles.otherInfoLabel}>Size</Text>
                        </View>

                        <View style={styles.otherInfoContainer}>
                            <Text style={styles.otherInfoValue}>{gender}</Text>
                            <Text style={styles.otherInfoLabel}>Gender</Text>
                        </View>
                    </View>

                    <Text style={styles.descriptionLabel}>Description</Text>
                    <Text style={styles.description}>{description}</Text>
                
                </ScrollView>

                <TouchableOpacity style={styles.adoptBtn} onPress={() => navigation.navigate('Adoption Form', { animalId: animalId })}>
                    <Text style={styles.adoptTxt}>ADOPT ME</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    animalImgBg: {
        height: 400,
        width: '100%',
        backgroundColor: 'aqua',
        position: 'relative',
    },

    returnBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 33,
        width: 33,
        position: 'absolute',
        top: 25,
        left: 30, // 20
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#111',
        shadowOffset: {
            height: 0,
            width: 0,
        }, 
        shadowRadius: 5,
        shadowOpacity: .25,
    },

    animalInfoContainer: {
        flex: 1,
        backgroundColor: 'white',
        zIndex: 10,
        marginTop: -60,
        paddingRight: 30,
        paddingLeft: 30,
        position: 'relative',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        shadowColor: '#111',
        shadowOffset: {
            height: -1,
            width: 0,
        },
        shadowRadius: 8,
        shadowOpacity: .1,
    },

    nameBreedContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: 35,
    },

    idLabel: {
        fontFamily: 'PoppinsLight',
        fontSize: 13,
    },

    name: {
        fontFamily: 'PoppinsSemiBold',
        fontSize: 24,
    },

    breed: {
        fontFamily: 'PoppinsRegular',
        fontSize: 18,
    },

    otherInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 35,
    },

    otherInfoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 95,
        width: 95,
        backgroundColor: '#ffff66',
        borderRadius: 5,
    },

    otherInfoValue: {
        fontFamily: 'PoppinsMedium',
        fontSize: 16,
    },

    otherInfoLabel: {
        fontFamily: 'PoppinsLight',
        fontSize: 13,
    },

    descriptionLabel: {
        fontFamily: 'PoppinsMedium',
        fontSize: 16,
        marginTop: 25,
    },

    description: {
        fontFamily: 'PoppinsLight',
        fontSize: 14,
        marginTop: 3,
        flexWrap: 'wrap',
    },

    adoptBtn: {
        position: 'absolute',
        bottom: 20,
        height: 60,
        width: '88%',
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
    },

    adoptTxt: {
        color: 'white',
        fontFamily: 'PoppinsSemiBold',
        fontSize: 20,
    },
})

export default ViewAnimalData





































// import React, { useState, useEffect } from 'react'
// import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import axios from 'axios'
// import backArrow from '../assets/Icons/backArrow.svg'
// import disabledSvg from '../assets/Icons/disabled-hint.svg'

// const ViewAnimalData = ({ navigation, route }) => {
//     const [name, setName] = useState('');
//     const [breed, setBreed] = useState('');
//     const [description, setDescription] = useState('');
//     const [color, setColor] = useState('')
//     const [gender, setGender] = useState('');
//     const [animalType, setAnimalType] = useState('');
//     const [adoptionStatus, setAdoptionStatus] = useState('');
//     const [animalImg, setAnimalImg] = useState('');

//     const pendingAdoption = adoptionStatus === 'Pending'
//     const adopted = adoptionStatus === 'Adopted'

//     const { animalId } = route.params;

//     const getDataById = async () => {
//         try {
//             const { data } = await axios.get(`http://localhost:5000/api/animals/${animalId}`)
//             console.log(data)
//             setName(data.name);
//             setBreed(data.breed);
//             setDescription(data.description);
//             setColor(data.color)
//             setGender(data.gender);
//             setAnimalType(data.type);
//             setAdoptionStatus(data.adoptionStatus);
//             setAnimalImg(data.animalImg);
            
//         } catch (error) {
//             console.log(error)
//             alert(error)
//         }
//     }

//     useEffect(() => {
//         getDataById();
//     }, [animalId]);

//     return (
//         <ScrollView style={styles.body}>
//             <ImageBackground style={styles.animalImgContainer} source={animalImg}>
//                 <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}> 
//                     <Image style={styles.btnIcon} source={backArrow} />
//                     <Text style={styles.btnBackText}>Back</Text>
//                 </TouchableOpacity>
//             </ImageBackground>

//             <View style={styles.paddedView}>
//                 <Text style={styles.label}>
//                     Name: 
//                     <Text style={styles.value}>{name}</Text>
//                 </Text>

//                 <Text style={styles.label}>
//                     Breed: 
//                     <Text style={styles.value}>{breed}</Text>
//                 </Text>


//                 <Text style={styles.label}>
//                     Gender: 
//                     <Text style={styles.value}>{gender}</Text>
//                 </Text>

//                 <Text style={styles.label}>
//                     Color: 
//                     <Text style={styles.value}>{color}</Text>
//                 </Text>

//                 <Text style={styles.label}>
//                     Animal Type: 
//                     <Text style={styles.value}>{animalType}</Text>
//                 </Text>

//                 <Text style={styles.label}>
//                     Adoption Status: 
//                     <Text style={styles.value}>{adoptionStatus}</Text>
//                 </Text>

//                 <Text style={styles.labelDescription}>Description</Text>
//                 <Text style={styles.description}>{description}</Text>

//                 {pendingAdoption ?
//                         <>
//                             <Text style={styles.disabledButtonHint}>
//                                 <Image style={styles.disabledIcon} source={disabledSvg} />
//                                 {'\t'}This button is currently disabled due to the pending adoption status of the animal.
//                             </Text>
                        
//                             <TouchableOpacity style={styles.adoptBtnDisabled} disabled={true}>
//                                 <Text style={styles.adoptTextDisabled}>ADOPT</Text>
//                             </TouchableOpacity>
//                         </>
//                     : adopted ?
//                         <TouchableOpacity style={styles.adoptBtnDisabled} disabled={true}>
//                                 <Text style={styles.adoptTextDisabled}>ADOPT</Text>
//                         </TouchableOpacity>
//                         :
//                         <TouchableOpacity style={styles.adoptBtn} onPress={() => navigation.navigate('Adoption Form', { animalId: animalId })}>
//                             <Text style={styles.adoptText}>ADOPT</Text>
//                         </TouchableOpacity>
//                 }
//             </View>
//         </ScrollView>
//     )
// }

// const styles = StyleSheet.create({
//     body: {
//         flex: 1,
//         backgroundColor: 'white',
//     },

//     animalImgContainer: {
//         width: '100%',
//         height: 350,
//         position: 'relative',
//     },

//     backBtn: {
//         alignSelf: 'flex-start',
//         backgroundColor: '#111',
//         borderRadius: 25,
//         display: 'flex',
//         flexDirection: 'row',
//         paddingTop: 5,
//         paddingRight: 13,
//         paddingBottom: 5,
//         paddingLeft: 10,
//         position: 'absolute',
//         top: 15,
//         left: 20,
//     },  
    
//     btnIcon: {
//         width: 20,
//         height: 20,
//     },

//     btnBackText: {
//         color: 'white',
//         marginLeft: 5,
//     },

//     paddedView: {
//         paddingTop: 30,
//         paddingLeft: 35,
//         paddingRight: 35,
//     },

//     name: {
//         fontFamily: 'Poppins_700Bold',
//         fontSize: 23,
//         marginTop: 30,
//         marginBottom: 15,
//     },

//     breed: {
//         fontFamily: 'Poppins_300Light',
//         fontSize: 20,
//         marginLeft: 7,
//     },

//     label: {
//         fontFamily: 'Poppins_600SemiBold',
//         fontSize: 16,
//         marginBottom: 10,
//     },

//     value: {
//         fontFamily: 'Poppins_300Light',
//         fontSize: 16,
//         marginLeft: 5,
//     },

//     labelDescription: {
//         fontFamily: 'Poppins_600SemiBold',
//         fontSize: 16,
//         marginTop: 5,
//         marginBottom: 7,
//     },

//     description: {
//         fontFamily: 'Poppins_300Light',
//         fontSize: 15,
//         marginBottom: 70,
//     },

//     adoptBtn: {
//         backgroundColor: '#111',
//         marginBottom: 25,
//         width: '100%',
//         height: 50,
//     },

//     adoptText: {
//         color: 'white',
//         fontFamily: 'Poppins_600SemiBold',
//         fontSize: 21,
//         letterSpacing: 2,
//         marginTop: 8,
//         textAlign: 'center',
//     },

//     disabledHint: {
//         display: 'flex',
//         flexDirection: 'row',
//     },

//     disabledButtonHint: {
//         fontFamily: 'Poppins_400Regular',
//         fontSize: 13,
//         lineHeight: 22,
//         marginBottom: 10,
//         position: 'relative',
//     },

//     disabledIcon: {
//         height: 18,
//         width: 18,
//         top: 2,
//         left: 0,
//         position: 'absolute',
//     },


//     adoptBtnDisabled: {
//         backgroundColor: '#111',
//         marginBottom: 25,
//         width: '100%',
//         height: 50,
//         opacity: .4,
//     },

//     adoptTextDisabled: {
//         color: 'white',
//         fontFamily: 'Poppins_600SemiBold',
//         fontSize: 21,
//         letterSpacing: 2,
//         marginTop: 8,
//         textAlign: 'center',
//     },
// })

// export default ViewAnimalData
