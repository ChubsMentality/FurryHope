import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpecificAdoption, getInterviewSchedule, submitInterviewSchedule, updateAdoptionApplication } from '../actions/adminActions'
import returnIcon from '../assets/Icons/returnIcon.svg'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker'
import Sidebar from './Sidebar'
import Loading from './SubComponents/Loading'
import Overlay from './SubComponents/Overlay'
import '../css/Adoption.css' 
import axios from 'axios'
import closeModal from '../assets/Icons/close-modal.svg'

const Adoption = ({ match, history }) => {
    const dispatch = useDispatch()
    const sAdoption = useSelector(state => state.specificAdoptionState)
    const { loading, error, specificAdoption } = sAdoption

    // const iSchedState = useSelector(state => state.getInterviewSchedState)
    // const { interviewSched } = iSchedState

    const [interviewSched, setInterviewSched] = useState()
    const [schedOverlayVisible, setSchedOverlayVisible] = useState(false)
    const [acceptAdoptionOverlay, setAcceptAdoptionOverlay] = useState(false)
    const [recipientEmail, setRecipientEmail] = useState('')
    const [message, setMessage] = useState('')
    const [date, setDate] = useState()
    const [time, setTime] = useState()

    const [email, setEmail] = useState()
    const [pickupDate, setPickupDate] = useState('')
    const [pickupTime, setPickupTime] = useState('')
    const [animalName, setAnimalName] = useState('')
    const [adopterName, setAdopterName] = useState('')

    const getInterviewSched = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/admins/getInterviewSched/${match.params.id}`)
            setInterviewSched(data)
        } catch (error) {
            console.log(error)
        }
    }

    const submitInterviewSched = async () => { 
        if(recipientEmail === '' || date === '' || time === '') {
            alert('Please fill out all the necessary fields')
        } else {
            try {
                const { data } = await axios.post(`http://localhost:5000/api/admins/createInterviewSched/${match.params.id}`, { recipientEmail, date, time })
                alert('Successfully sent the email.')
                
                toggleSchedOverlay()
            } catch (error) {
                console.log(error)
            }
        }
    }

    const toggleSchedOverlay = () => {
        setSchedOverlayVisible(!schedOverlayVisible)
        setRecipientEmail(specificAdoption.email)
    }

    const toggleAcceptOverlay = () => {
        setAcceptAdoptionOverlay(!acceptAdoptionOverlay)
        setAdopterName(specificAdoption.adopterName)
        setEmail(specificAdoption.email)
        console.log(adopterName)
    }
    
    const rejectApplication = async (email, adopterName, animalName, animalId, adoptionId) => {
        const adoptionStatus = 'Not Adopted'
        const applicationStatus = 'Rejected'

        if(window.confirm('Are you sure you want to reject this adoption?')) {
            dispatch(updateAdoptionApplication(animalId, adoptionId, adoptionStatus, applicationStatus))

            try {
                const { data } = await axios.post('http://localhost:5000/api/admins/sendRejectMessage', {email, adopterName, animalName})
                console.log(data)
                alert('Message Sent')
            } catch (error) {
                console.log(error)
            }
        }
    }

    const acceptApplication = async (animalId, adoptionId, email, pickupDate, pickupTime, animalName, adopterName ) => {
        const adoptionStatus = 'Adopted'
        const applicationStatus = 'Accepted'
        dispatch(updateAdoptionApplication(animalId, adoptionId, adoptionStatus, applicationStatus))

        try {
            if(!email || !pickupDate || !pickupTime || !animalName || !adopterName) {
                alert('Please fill out all the necessary fields')
            } else {
                const { data } = await axios.post('http://localhost:5000/api/admins/sendPickupMessage', { email, pickupDate, pickupTime, animalName, adopterName })
                alert('Successfully sent the message')
                setAcceptAdoptionOverlay(!acceptAdoptionOverlay)
            }
        } catch (error) {
            console.log(error) 
        }  
    }
 
    useEffect(() => {
        dispatch(getSpecificAdoption(match.params.id))
    }, [match.params.id])

    useEffect(() => {
        getInterviewSched()
    }, [])

    specificAdoption && console.log(specificAdoption)

    const isInterviewSchedEmpty = interviewSched && interviewSched.length === 0
    const hideAdoptionButtons = specificAdoption && specificAdoption.applicationStatus === 'Rejected' || specificAdoption && specificAdoption.applicationStatus === 'Accepted'

    return (
        <div className='specAdoption-body'>
            <Sidebar />
            <div className="specAdoption-content">
                <p className='specAdoption-back-btn' onClick={() => history.goBack()}>
                    <img className='specAdoption-back-icon' src={returnIcon} />
                    Back
                </p>

               
                {specificAdoption && 
                    <details className='specAdoption-details'>
                        <summary className='specAdoption-details-header'>Adoption Details</summary>
                        <div className="specAdoption-information-container">
                            <div className="specAdoption-userInfo">
                                <p className='specAdoption-userInfo-header'>Adopter's Information</p>
                                <p className='specAdoption-userInfo-label'>
                                    Name: 
                                    <span className='specAdoption-userInfo-value'>{specificAdoption.adopterName}</span>
                                </p>

                                <p className='specAdoption-userInfo-label'>
                                    Email: 
                                    <span className='specAdoption-userInfo-value'>{specificAdoption.email}</span>
                                </p>

                                <p className='specAdoption-userInfo-label'>
                                    Contact Number: 
                                    <span className='specAdoption-userInfo-value'>{specificAdoption.contactNo}</span>
                                </p>

                                <p className='specAdoption-userInfo-label'>Address</p>
                                <p className='specAdoption-userInfo-address'>{specificAdoption.address}</p>

                                <p className='specAdoption-userInfo-label-validId'>Valid Id</p>
                                <img className='specAdoption-valid-id' src={specificAdoption.validId} />
                            </div>

                            <div className="specAdoption-animalInfo">
                                <p className='specAdoption-animalInfo-header'>Animal's Information</p>
                                <p className='specAdoption-animalInfo-label'>
                                    Name: 
                                    <span className='specAdoption-animalInfo-value'>{specificAdoption.animalName}</span>
                                </p>

                                <p className='specAdoption-animalInfo-label'>
                                    Type: 
                                    <span className='specAdoption-animalInfo-value'>{specificAdoption.animalType}</span>
                                </p>

                                <p className='specAdoption-animalInfo-label'>
                                    Breed: 
                                    <span className='specAdoption-animalInfo-value'>{specificAdoption.animalBreed}</span>
                                </p>

                                <p className='specAdoption-animalInfo-label'>
                                    Color: 
                                    <span className='specAdoption-animalInfo-value'>{specificAdoption.animalColor}</span>
                                </p>

                                <p className='specAdoption-animalInfo-label'>
                                    Adoption Status: 
                                    <span className='specAdoption-animalInfo-value'>{specificAdoption.adoptionStatus}</span>
                                </p>

                                <p className='specAdoption-animalInfo-label-image'>Image</p>
                                <img className='specAdoption-img' src={specificAdoption.animalImg} />
                            </div>
                        </div>
                    </details>
                }


                {specificAdoption && 
                    <details className='specAdoption-schedule'>
                        <summary className='specAdoption-schedule-header'>Send message for interview</summary>
                        <div className="specAdoption-schedule-content">
                            {interviewSched && interviewSched.map((sched) => (
                                <div className='specAdoption-details-container' key={sched._id}>
                                    <p className='specAdoption-details-label'>Email: <span className='specAdoption-details-value'>{sched.recipientEmail}</span></p>
                                    <p className='specAdoption-details-label'>Date: <span className='specAdoption-details-value'>{sched.date}</span></p>
                                    <p className='specAdoption-details-label'>Time: <span className='specAdoption-details-value'>{sched.time}</span></p>
                                </div>
                            ))}

                            {isInterviewSchedEmpty &&
                                <div className="specAdoption-no-schedule">
                                    <p className='specAdoption-no-schedule-header'>Not scheduled for an interview yet</p>
                                    <button className='specAdoption-set-sched-btn' onClick={() => toggleSchedOverlay()}>Set schedule</button>
                                </div>
                            }
                        </div>
                    </details>
                }

                {specificAdoption && interviewSched && interviewSched.length === 0 ?
                    <div style={{display: 'none'}}></div>
                    :
                    hideAdoptionButtons ?
                        <div style={{display: 'none'}}></div>
                    :
                        <div className="specAdoption-btns-container">
                            <button className='specAdoption-reject-btn' onClick={() => rejectApplication(specificAdoption.email, specificAdoption.adopterName, specificAdoption.animalName, specificAdoption.animalId, specificAdoption._id)}>REJECT</button>
                            <button className='specAdoption-accept-btn' onClick={() => toggleAcceptOverlay()}>ACCEPT</button>
                        </div> 
                }
            </div>

            {loading && <Loading />}
            {loading && <Overlay />}

            {schedOverlayVisible && 
                <div className='specAdoption-set-sched-container'>
                    <img className='specAdoption-close-modal' src={closeModal} onClick={() => toggleSchedOverlay()} />
                    <p className='specAdoption-set-sched-header'>Send an email</p>
                    <form className="set-sched-form">
                            <label className='set-sched-label' htmlFor='recipientEmail'>Recipient's Email</label>
                            <input className='set-sched-input' type="text" name="recipientEmail" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)}/>

                            <br />

                            {/* <label className='set-sched-label' htmlFor='message'>Message</label>
                            <textarea className='sched-message' placeholder='Enter the details of the interview, (Where, when) will the interview will be held' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

                            <br /> */}
        
                            <label className='set-sched-label' htmlFor='datePicker'>Date</label>
                            <DatePicker className='set-sched-date-picker' name='datePicker' selected={date} onChange={(date) => setDate(date)} />

                            <br />

                            <label className='set-sched-label' htmlFor='timePicker'>Time</label>
                            <TimePicker className='set-sched-time-picker' name='timePicker' value={time} onChange={setTime} />
                    </form>

                    <button 
                        className='set-sched-btn' 
                        onClick={() => submitInterviewSched()}
                    >
                        Send Message
                    </button>
                </div>
            }

            {schedOverlayVisible && <Overlay />}


            {acceptAdoptionOverlay &&
                <div className="specAdoption-accept-overlay">
                    <img className='specAdoption-close-modal' src={closeModal} onClick={() => toggleAcceptOverlay()} />
                    <p className='accept-adoption-header'>Set Pickup time for the adoption</p>
                    <label className='accept-adoption-label'>Email</label>
                    <input className='accept-adoption-input' type='text' name='accept-email' value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label className='accept-adoption-label'>Pickup Date</label>
                    <DatePicker className='accept-adoption-date-picker' selected={pickupDate} value={pickupDate} onChange={(date) => setPickupDate(date)} />

                    <label className='accept-adoption-label'>Pickup Time</label>
                    <TimePicker className='accept-adoption-time-picker' name='accept-timePicker' value={pickupTime} onChange={setPickupTime} />

                    <button className='accept-adoption-btn'
                        onClick={() => acceptApplication(
                                specificAdoption.animalId, 
                                specificAdoption._id,
                                email,
                                pickupDate,
                                pickupTime,
                                specificAdoption.animalName,
                                specificAdoption.adopterName,
                            )}
                    >
                        Accept Adoption
                    </button>
                </div>
            }

            {acceptAdoptionOverlay && <Overlay />}
        </div>
    )
}

export default Adoption