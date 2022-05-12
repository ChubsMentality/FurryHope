import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAnimalRegistrations, registerAnimal } from '../actions/adminActions'
import Loading from './SubComponents/Loading'
import Overlay from './SubComponents/Overlay'
import axios from 'axios'
import Sidebar from './Sidebar'
import closeModalIcon from '../assets/Icons/close-modal.svg'
import '../css/AnimalRegistration.css'

const AnimalRegistration = () => {
    const dispatch = useDispatch()
    // const registrations = useSelector(state => state.getRegistrations)
    // const { animalRegistrations, loading } = registrations

    const registeredState = useSelector(state => state.animalRegister)
    const { success, registerLoading } = registeredState

    const [overlay, setOverlay] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState([])
    const [animalRegistrations, setAnimalRegistrations] = useState()
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState('')
    const [activeArr, setActiveArr] = useState()
    const [registered, setRegistered] = useState()
    const [notRegistered, setNotRegistered] = useState()

    const filterRegistered = (arr) => {
        return arr.registered === 'Registered'
    }

    const filterNotRegistered = (arr) => {
        return arr.registered === 'Not Registered'
    }

    const openModal = async (id) => {
        const { data } = await axios.get(`http://localhost:5000/api/users/animalRegistration/${id}`)
        setModalData(data)

        console.log(data)

        setOverlay(true)
        setModal(true)
    }

    const closeModal = () => {
        setOverlay(false)
        setModal(false)
    }

    const getAnimalHandler = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('http://localhost:5000/api/admins/getAllRegistrations')
            setAnimalRegistrations(data)
            setRegistered(data.filter(filterRegistered))
            setNotRegistered(data.filter(filterNotRegistered))
            setLoading(false)
            setActiveArr(data.filter(filterNotRegistered))
            setActive('Not Registered')

        } catch (error) {
            console.log(error)
        }
    }

    const registerAnimalHandler = async (id, email, name, animalName) => {
        dispatch(registerAnimal(id))

        try {
            const { data } = await axios.post('http://localhost:5000/api/admins/sendRegisteredMessage', { email, name, animalName })
        } catch (error) {
            console.log(error)
        }

        alert('The animal has been registered')
        setOverlay(false)
        setModal(false)
    }

    useEffect(() => {
        getAnimalHandler()

    }, [dispatch, success])

    const deleteHandler = (id) => {        
        if(window.confirm('Are you sure you want to delete?')) {
            axios.delete(`http://localhost:5000/api/users/animalRegistration/${id}`)
                .then((response) => {
                    console.log(response)
                })
                .catch(error => console.log(error))
        }
    }

    const toggleNotRegistered = () => {
        setActive('Not Registered')
        setActiveArr(notRegistered)
    }

    const toggleRegistered = () => {
        setActive('Registered')
        setActiveArr(registered)
    }

    const isNotRegisteredActive = active === 'Not Registered'
    const isRegisteredActive = active === 'Registered'

    return (
        <div className='animalRegistration-body'>
            <Sidebar />
            {loading && <Loading />}
            {loading && <Overlay />}
            <div className='animalRegistration-content'>
                <p className='animalRegistration-header'>ANIMAL REGISTRATIONS</p>

                <div className="toggleRegistrationsBtnContainer">
                    <button className={isNotRegisteredActive ? 'toggle-reg-btn notReg-active' : 'toggle-reg-btn notReg-inactive'} onClick={() => toggleNotRegistered()}>Not Registered</button>
                    <button className={isRegisteredActive ? 'toggle-reg-btn reg-active' : 'toggle-reg-btn reg-inactive'} onClick={() => toggleRegistered()}>Registered</button>
                </div>
                {
                    activeArr && activeArr.length === 0 ?
                        <p>There are no registrations!</p>
                    :
                        <table className='registration-table'>
                            <thead>
                                <tr>
                                    <th className='registration-header registration-owner'>Owner's Name</th>
                                    <th className='registration-header registration-address'>Address</th>
                                    <th className='registration-header registration-contact'>Contact Number</th>
                                    <th className='registration-header registration-registered'>Registered</th>
                                    <th className='registration-header registration-actions'></th>
                                </tr>
                            </thead>

                            <tbody>
                            {
                                activeArr && activeArr.map((item) => (
                                    <tr key={item._id} className='registration-data-row'>
                                        <td className='registration-data data-owner'>{item.name}</td>
                                        <td className='registration-data data-address'>{item.address}</td>
                                        <td className='registration-data data-contact'>{item.contactNo}</td>
                                        <td className='registration-data data-registered'>{item.registered}</td>
                                        <td className='registration-data data-btns'>
                                            <button className='registration-btns registration-view' onClick={() => openModal(item._id)}>View</button>
                                            <button className='registration-btns registration-delete' onClick={() => deleteHandler(item._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                }
            </div>

            {modal && 
                <div className='viewRegistration-modal'>
                    <img src={closeModalIcon} className='close-modal-icon' onClick={() => closeModal()} />
                    <h1 className='viewRegistration-modal-header'>ANIMAL REGISTRATION</h1>
                    <p className='modalLabel-date'>Date:<span className='modalValue'>{modalData.date}</span></p>

                    {/* <p className='owner-information-header'>Owner's Information</p> */}
                    <p className='modalLabel'>Animal Type:
                        <span className='modalValue'>{modalData.animalType}</span>
                    </p>
                    <p className='modalLabel'>Registration Type:
                        <span className='modalValue'>{modalData.registrationType}</span>
                    </p>
                    <p className='modalLabel'>Owner's Name:
                        <span className='modalValue'>{modalData.name}</span>
                    </p>
                    <p className='modalLabel'>Email:
                        <span className='modalValue'>{modalData.email}</span>
                    </p>
                    <p className='modalLabel'>Contact Number: 
                        <span className='modalValue'>{modalData.contactNo}</span>
                    </p>
                    <p className='modalLabel-address'>Address:</p>
                    <p className='modalValue-address'>{modalData.address}</p>
                    
                    {/* <p className='animal-information-header'>Animal's Information</p>  */}
                    <p className='modalLabel'>Animal's Name: 
                        <span className='modalValue'>{modalData.animalName}</span>
                    </p>
                    <p className='modalLabel'>Animal's Breed: 
                        <span className='modalValue'>{modalData.animalBreed}</span>
                    </p>
                    <p className='modalLabel'>Animal's Age: 
                        <span className='modalValue'>{modalData.animalAge}</span>
                    </p>
                    <p className='modalLabel'>Animal's Sex: 
                        <span className='modalValue'>{modalData.animalSex}</span>
                    </p>

                    <button className="registerAnimalBtn" onClick={() => registerAnimalHandler(modalData._id, modalData.email, modalData.name, modalData.animalName)}>REGISTER</button>
                </div>
            }

            {overlay && <div className='viewRegistration-overlay'></div>}
        </div>
    )
}

export default AnimalRegistration
