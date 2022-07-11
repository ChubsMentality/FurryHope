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

import { IoArrowBack, IoClose } from 'react-icons/io5'

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

    const [email, setEmail] = useState()
    const [pickupDate, setPickupDate] = useState('')
    const [pickupTime, setPickupTime] = useState('')
    const [pickupHour, setPickupHour] = useState('1')
    const [pickupMinute, setPickupMinute] = useState('00')
    const [pickupTimePeriod, setPickupTimePeriod] = useState('AM')
    const [animalName, setAnimalName] = useState('')
    const [adopterName, setAdopterName] = useState('')
    const [validIdModal, setValidIdModal] = useState(false)
    const [validIdOverlay, setValidIdOverlay] = useState(false)

    const [selectedHour, setSelectedHour] = useState('1')
    const [selectedMinute, setSelectedMinute] = useState('00')
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('AM')

    const toggleValidIdModal = () => {
        setValidIdModal(!validIdModal)
        setValidIdOverlay(!validIdOverlay)
    }

    const toggleInterviewSched = () => {
        setSchedOverlayVisible(!schedOverlayVisible)
    }

    const getInterviewSched = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/admins/getInterviewSched/${match.params.id}`)
            setInterviewSched(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const submitInterviewSched = async () => { 
        let time = `${selectedHour}:${selectedMinute} ${selectedTimePeriod}`
        
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

    const acceptApplication = async (animalId, adoptionId, email, pickupDate, pickupHour, pickupMinute, pickupTimePeriod, animalName, adopterName ) => {
        const adoptionStatus = 'Adopted'
        const applicationStatus = 'Accepted'

        let pickupTime = `${pickupHour}:${pickupMinute} ${pickupTimePeriod}`
        console.log(pickupTime)
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
                <div className="specAdoption-nav-container">
                    <div className="specAdoption-back-container" onClick={() => history.goBack()}>
                        <IoArrowBack className='specAdoption-back-icon' color='#111'/>
                        <p className="specAdoption-back-txt">Back</p>
                    </div>

                    <div className="specAdoption-nav-statusContainer">
                        <p className="specAdoption-statusLabel">Status:</p>

                        {specificAdoption && specificAdoption.applicationStatus === 'Pending' &&
                            <p className="specAdoption-currentStatus-pending">{specificAdoption.applicationStatus}</p>
                        }

                        {specificAdoption && specificAdoption.applicationStatus === 'Accepted' &&
                            <p className="specAdoption-currentStatus-accepted">{specificAdoption.applicationStatus}</p>
                        }

                        {specificAdoption && specificAdoption.applicationStatus === 'Rejected' &&
                            <p className="specAdoption-currentStatus-rejected">{specificAdoption.applicationStatus}</p>
                        }
                    </div>
                </div>

                <div className="specAdoption-details">
                    <div className="specAdoption-applicantInfo specAdoption-info-container">
                        <p className='specAdoption-info-header'>Applicant's Information</p>

                        <p className="specAdoption-applicant-label">
                            Name: 
                            <span className="specAdoption-applicant-value">{specificAdoption && specificAdoption.applicantName}</span>
                        </p>

                        <p className="specAdoption-applicant-label">
                            Email: 
                            <span className="specAdoption-applicant-value">{specificAdoption && specificAdoption.email}</span>
                        </p>

                        <p className="specAdoption-applicant-label">
                            Contact Number: 
                            <span className="specAdoption-applicant-value">{specificAdoption && specificAdoption.contactNo}</span>
                        </p>

                        <p className="specAdoption-applicant-addressLbl">Address</p>
                        <p className="specAdoption-applicant-address">{specificAdoption && specificAdoption.address}</p>
                        
                        <p className="specAdoption-applicant-validId"></p>
                        <button className="specAdoption-applicant-validIdBtn" onClick={() => toggleValidIdModal()}>Click to see valid ID</button>
                    </div>

                    <div className="specAdoption-animalInfo specAdoption-info-container">
                        <p className="specAdoption-info-header">Animal's Information</p>

                        <p className="specAdoption-animal-label">
                            Name: 
                            <span className="specAdoption-animal-value">{specificAdoption && specificAdoption.animalName}</span>
                        </p>

                        <p className="specAdoption-animal-label">
                            Breed: 
                            <span className="specAdoption-animal-value">{specificAdoption && specificAdoption.animalBreed}</span>
                        </p>

                        <p className="specAdoption-animal-label">
                            Type: 
                            <span className="specAdoption-animal-value">{specificAdoption && specificAdoption.animalType}</span>
                        </p>

                        <p className="specAdoption-animal-label">
                            Gender: 
                            <span className="specAdoption-animal-value">{specificAdoption && specificAdoption.animalGender}</span>
                        </p>

                        <p className="specAdoption-animal-label">
                            Color: 
                            <span className="specAdoption-animal-value">{specificAdoption && specificAdoption.animalColor}</span>
                        </p>

                        <img src={specificAdoption && specificAdoption.animalImg} alt="Animal's Image" className="specAdoption-animalImg" />
                    </div>

                    <div className="specAdoption-setInterviewSched-container specAdoption-info-container">
                        {interviewSched && interviewSched.length >= 1 ?
                            <>
                                <p></p>
                            </>
                            :
                            <>
                                <p className="specAdoption-setInterviewSched-header">

                                </p>
                                <button className='specAdoption-setInterviewSched-btn'>Set Interview Schedule</button>
                            </>
                        }
                       
                    </div>

                    <div className="specAdoption-adoptionActions-container specAdoption-info-container">
                        <p>Buttons</p>
                        <button className="specAdoption-acceptAdoptionBtn">ACCEPT</button>
                        <button className="specAdoption-rejectAdoptionBtn">REJECT</button>
                    </div>
                </div>
            </div>

            {validIdModal &&
                <div className='specAdoption-validIdModal'>
                    <IoClose className='specAdoption-validId-closeIcon' color='#111' onClick={() => toggleValidIdModal()} />
                    <img src={specificAdoption && specificAdoption.validId} alt="Applicant's valid ID" className="specAdoption-validId-preview" />
                </div>
            }

            {validIdOverlay &&
                <Overlay />
            }

            {schedOverlayVisible &&
                <div className='specAdoption-setSchedModal'>
                </div>
            }

            {schedOverlayVisible &&
                <Overlay />
            }
        </div>
    )
}

// const Adoption = ({ match, history }) => {
//     const dispatch = useDispatch()
//     const sAdoption = useSelector(state => state.specificAdoptionState)
//     const { loading, error, specificAdoption } = sAdoption

//     // const iSchedState = useSelector(state => state.getInterviewSchedState)
//     // const { interviewSched } = iSchedState

//     const [interviewSched, setInterviewSched] = useState()
//     const [schedOverlayVisible, setSchedOverlayVisible] = useState(false)
//     const [acceptAdoptionOverlay, setAcceptAdoptionOverlay] = useState(false)
//     const [recipientEmail, setRecipientEmail] = useState('')
//     const [message, setMessage] = useState('')
//     const [date, setDate] = useState()

//     const [email, setEmail] = useState()
//     const [pickupDate, setPickupDate] = useState('')
//     const [pickupTime, setPickupTime] = useState('')
//     const [pickupHour, setPickupHour] = useState('1')
//     const [pickupMinute, setPickupMinute] = useState('00')
//     const [pickupTimePeriod, setPickupTimePeriod] = useState('AM')
//     const [animalName, setAnimalName] = useState('')
//     const [adopterName, setAdopterName] = useState('')

//     const [selectedHour, setSelectedHour] = useState('1')
//     const [selectedMinute, setSelectedMinute] = useState('00')
//     const [selectedTimePeriod, setSelectedTimePeriod] = useState('AM')


//     const getInterviewSched = async () => {
//         try {
//             const { data } = await axios.get(`http://localhost:5000/api/admins/getInterviewSched/${match.params.id}`)
//             setInterviewSched(data)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const submitInterviewSched = async () => { 
//         let time = `${selectedHour}:${selectedMinute} ${selectedTimePeriod}`
        
//         if(recipientEmail === '' || date === '' || time === '') {
//             alert('Please fill out all the necessary fields')
//         } else {
//             try {
//                 const { data } = await axios.post(`http://localhost:5000/api/admins/createInterviewSched/${match.params.id}`, { recipientEmail, date, time })
//                 alert('Successfully sent the email.')
                
//                 toggleSchedOverlay()
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//     }

//     const toggleSchedOverlay = () => {
//         setSchedOverlayVisible(!schedOverlayVisible)
//         setRecipientEmail(specificAdoption.email)
//     }

//     const toggleAcceptOverlay = () => {
//         setAcceptAdoptionOverlay(!acceptAdoptionOverlay)
//         setAdopterName(specificAdoption.adopterName)
//         setEmail(specificAdoption.email)
//         console.log(adopterName)
//     }
    
//     const rejectApplication = async (email, adopterName, animalName, animalId, adoptionId) => {
//         const adoptionStatus = 'Not Adopted'
//         const applicationStatus = 'Rejected'

//         if(window.confirm('Are you sure you want to reject this adoption?')) {
//             dispatch(updateAdoptionApplication(animalId, adoptionId, adoptionStatus, applicationStatus))

//             try {
//                 const { data } = await axios.post('http://localhost:5000/api/admins/sendRejectMessage', {email, adopterName, animalName})
//                 console.log(data)
//                 alert('Message Sent')
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//     }

//     const acceptApplication = async (animalId, adoptionId, email, pickupDate, pickupHour, pickupMinute, pickupTimePeriod, animalName, adopterName ) => {
//         const adoptionStatus = 'Adopted'
//         const applicationStatus = 'Accepted'

//         let pickupTime = `${pickupHour}:${pickupMinute} ${pickupTimePeriod}`
//         console.log(pickupTime)
//         dispatch(updateAdoptionApplication(animalId, adoptionId, adoptionStatus, applicationStatus))

//         try {
//             if(!email || !pickupDate || !pickupTime || !animalName || !adopterName) {
//                 alert('Please fill out all the necessary fields')
//             } else {
//                 const { data } = await axios.post('http://localhost:5000/api/admins/sendPickupMessage', { email, pickupDate, pickupTime, animalName, adopterName })
//                 alert('Successfully sent the message')
//                 setAcceptAdoptionOverlay(!acceptAdoptionOverlay)
//             }
//         } catch (error) {
//             console.log(error) 
//         }  
//     }
 
//     useEffect(() => {
//         dispatch(getSpecificAdoption(match.params.id))
//     }, [match.params.id])

//     useEffect(() => {
//         getInterviewSched()
//     }, [])

//     specificAdoption && console.log(specificAdoption)

//     const isInterviewSchedEmpty = interviewSched && interviewSched.length === 0
//     const hideAdoptionButtons = specificAdoption && specificAdoption.applicationStatus === 'Rejected' || specificAdoption && specificAdoption.applicationStatus === 'Accepted'

//     return (
//         <div className='specAdoption-body'>
//             <Sidebar />
//             <div className="specAdoption-content">
//                 <p className='specAdoption-back-btn' onClick={() => history.goBack()}>
//                     <img className='specAdoption-back-icon' src={returnIcon} />
//                     Back
//                 </p>

               
//                 {specificAdoption && 
//                     <details className='specAdoption-details'>
//                         <summary className='specAdoption-details-header'>Adoption Details</summary>
//                         <div className="specAdoption-information-container">
//                             <div className="specAdoption-userInfo">
//                                 <p className='specAdoption-userInfo-header'>Adopter's Information</p>
//                                 <p className='specAdoption-userInfo-label'>
//                                     Name: 
//                                     <span className='specAdoption-userInfo-value'>{specificAdoption.adopterName}</span>
//                                 </p>

//                                 <p className='specAdoption-userInfo-label'>
//                                     Email: 
//                                     <span className='specAdoption-userInfo-value'>{specificAdoption.email}</span>
//                                 </p>

//                                 <p className='specAdoption-userInfo-label'>
//                                     Contact Number: 
//                                     <span className='specAdoption-userInfo-value'>{specificAdoption.contactNo}</span>
//                                 </p>

//                                 <p className='specAdoption-userInfo-label'>Address</p>
//                                 <p className='specAdoption-userInfo-address'>{specificAdoption.address}</p>

//                                 <p className='specAdoption-userInfo-label-validId'>Valid Id</p>
//                                 <img className='specAdoption-valid-id' src={specificAdoption.validId} />
//                             </div>

//                             <div className="specAdoption-animalInfo">
//                                 <p className='specAdoption-animalInfo-header'>Animal's Information</p>
//                                 <p className='specAdoption-animalInfo-label'>
//                                     Name: 
//                                     <span className='specAdoption-animalInfo-value'>{specificAdoption.animalName}</span>
//                                 </p>

//                                 <p className='specAdoption-animalInfo-label'>
//                                     Type: 
//                                     <span className='specAdoption-animalInfo-value'>{specificAdoption.animalType}</span>
//                                 </p>

//                                 <p className='specAdoption-animalInfo-label'>
//                                     Breed: 
//                                     <span className='specAdoption-animalInfo-value'>{specificAdoption.animalBreed}</span>
//                                 </p>

//                                 <p className='specAdoption-animalInfo-label'>
//                                     Color: 
//                                     <span className='specAdoption-animalInfo-value'>{specificAdoption.animalColor}</span>
//                                 </p>

//                                 <p className='specAdoption-animalInfo-label'>
//                                     Adoption Status: 
//                                     <span className='specAdoption-animalInfo-value'>{specificAdoption.adoptionStatus}</span>
//                                 </p>

//                                 <p className='specAdoption-animalInfo-label-image'>Image</p>
//                                 <img className='specAdoption-img' src={specificAdoption.animalImg} />
//                             </div>
//                         </div>
//                     </details>
//                 }


//                 {specificAdoption && 
//                     <details className='specAdoption-schedule'>
//                         <summary className='specAdoption-schedule-header'>Send message for interview</summary>
//                         <div className="specAdoption-schedule-content">
//                             {interviewSched && interviewSched.map((sched) => (
//                                 <div className='specAdoption-details-container' key={sched._id}>
//                                     <p className='specAdoption-details-label'>Email: <span className='specAdoption-details-value'>{sched.recipientEmail}</span></p>
//                                     <p className='specAdoption-details-label'>Date: <span className='specAdoption-details-value'>{sched.date}</span></p>
//                                     <p className='specAdoption-details-label'>Time: <span className='specAdoption-details-value'>{sched.time}</span></p>
//                                 </div>
//                             ))}

//                             {isInterviewSchedEmpty &&
//                                 <div className="specAdoption-no-schedule">
//                                     <p className='specAdoption-no-schedule-header'>Not scheduled for an interview yet</p>
//                                     <button className='specAdoption-set-sched-btn' onClick={() => toggleSchedOverlay()}>Set schedule</button>
//                                 </div>
//                             }
//                         </div>
//                     </details>
//                 }

//                 {specificAdoption && interviewSched && interviewSched.length === 0 ?
//                     <div style={{display: 'none'}}></div>
//                     :
//                     hideAdoptionButtons ?
//                         <div style={{display: 'none'}}></div>
//                     :
//                         <div className="specAdoption-btns-container">
//                             <button className='specAdoption-reject-btn' onClick={() => rejectApplication(specificAdoption.email, specificAdoption.adopterName, specificAdoption.animalName, specificAdoption.animalId, specificAdoption._id)}>REJECT</button>
//                             <button className='specAdoption-accept-btn' onClick={() => toggleAcceptOverlay()}>ACCEPT</button>
//                         </div> 
//                 }
//             </div>

//             {loading && <Loading />}
//             {loading && <Overlay />}

//             {schedOverlayVisible && 
//                 <div className='specAdoption-set-sched-container'>
//                     <img className='specAdoption-close-modal' src={closeModal} onClick={() => toggleSchedOverlay()} />
//                     <p className='specAdoption-set-sched-header'>Send an email</p>
//                     <form className="set-sched-form">
//                             <label className='set-sched-label' htmlFor='recipientEmail'>Recipient's Email</label>
//                             <input className='set-sched-input' type="text" name="recipientEmail" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)}/>

//                             <br />

//                             {/* <label className='set-sched-label' htmlFor='message'>Message</label>
//                             <textarea className='sched-message' placeholder='Enter the details of the interview, (Where, when) will the interview will be held' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

//                             <br /> */}
        
//                             <label className='set-sched-label' htmlFor='datePicker'>Date</label>
//                             <DatePicker className='set-sched-date-picker' name='datePicker' selected={date} onChange={(date) => setDate(date)} />

//                             <br />

//                             <label className='set-sched-label sched-time-picker' htmlFor='timePicker'>Time</label>
//                             <div className="time-picker-container">
//                                 <select className='set-sched-hour' value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
//                                     <option value="1">1</option>
//                                     <option value="2">2</option>
//                                     <option value="3">3</option>
//                                     <option value="4">4</option>
//                                     <option value="5">5</option>
//                                     <option value="6">6</option>
//                                     <option value="7">7</option>
//                                     <option value="8">8</option>
//                                     <option value="9">9</option>
//                                     <option value="10">10</option>
//                                     <option value="11">11</option>
//                                     <option value="12">12</option>
//                                 </select>

//                                 <select className='set-sched-minute-picker' value={selectedMinute} onChange={(e) => setSelectedMinute(e.target.value)}>
//                                     <option value="00">00</option>
//                                     <option value="01">01</option>
//                                     <option value="02">02</option>
//                                     <option value="03">03</option>
//                                     <option value="04">04</option>
//                                     <option value="05">05</option>
//                                     <option value="06">06</option>
//                                     <option value="07">07</option>
//                                     <option value="08">08</option>
//                                     <option value="09">09</option>
//                                     <option value="10">10</option>
//                                     <option value="11">11</option>
//                                     <option value="12">12</option>
//                                     <option value="13">13</option>
//                                     <option value="14">14</option>
//                                     <option value="15">15</option>
//                                     <option value="16">16</option>
//                                     <option value="17">17</option>
//                                     <option value="18">18</option>
//                                     <option value="19">19</option>
//                                     <option value="20">20</option>
//                                     <option value="21">21</option>
//                                     <option value="22">22</option>
//                                     <option value="23">23</option>
//                                     <option value="24">24</option>
//                                     <option value="25">25</option>
//                                     <option value="26">26</option>
//                                     <option value="27">27</option>
//                                     <option value="28">28</option>
//                                     <option value="29">29</option>
//                                     <option value="30">30</option>
//                                     <option value="31">31</option>
//                                     <option value="32">32</option>
//                                     <option value="33">33</option>
//                                     <option value="34">34</option>
//                                     <option value="35">35</option>
//                                     <option value="36">36</option>
//                                     <option value="37">37</option>
//                                     <option value="38">38</option>
//                                     <option value="39">39</option>
//                                     <option value="40">40</option>
//                                     <option value="41">41</option>
//                                     <option value="42">42</option>
//                                     <option value="43">43</option>
//                                     <option value="44">44</option>
//                                     <option value="45">45</option>
//                                     <option value="46">46</option>
//                                     <option value="47">47</option>
//                                     <option value="48">48</option>
//                                     <option value="49">49</option>
//                                     <option value="50">50</option>
//                                     <option value="51">51</option>
//                                     <option value="52">52</option>
//                                     <option value="53">53</option>
//                                     <option value="54">54</option>
//                                     <option value="55">55</option>
//                                     <option value="56">56</option>
//                                     <option value="57">57</option>
//                                     <option value="58">58</option>
//                                     <option value="59">59</option>
//                                 </select>

//                                 <select className='set-sched-timePeriod' value={selectedTimePeriod} onChange={(e) => setSelectedTimePeriod(e.target.value)}>
//                                     <option value="AM">AM</option>
//                                     <option value="PM">PM</option>
//                                 </select>
//                             </div>
//                     </form>

//                     <button 
//                         className='set-sched-btn' 
//                         onClick={() => submitInterviewSched()}
//                     >
//                         Send Message
//                     </button>
//                 </div>
//             }

//             {schedOverlayVisible && <Overlay />}


//             {acceptAdoptionOverlay &&
//                 <div className="specAdoption-accept-overlay">
//                     <img className='specAdoption-close-modal' src={closeModal} onClick={() => toggleAcceptOverlay()} />
//                     <p className='accept-adoption-header'>Set Pickup time for the adoption</p>
//                     <label className='accept-adoption-label'>Email</label>
//                     <input className='accept-adoption-input' type='text' name='accept-email' value={email} onChange={(e) => setEmail(e.target.value)} />

//                     <label className='accept-adoption-label'>Pickup Date</label>
//                     <DatePicker className='accept-adoption-date-picker' selected={pickupDate} value={pickupDate} onChange={(date) => setPickupDate(date)} />

//                     <label className='accept-adoption-label'>Pickup Time</label>
//                     <div className="time-picker-container">
//                         <select className='set-sched-hour' value={pickupHour} onChange={(e) => setPickupHour(e.target.value)}>
//                             <option value="1">1</option>
//                             <option value="2">2</option>
//                             <option value="3">3</option>
//                             <option value="4">4</option>
//                             <option value="5">5</option>
//                             <option value="6">6</option>
//                             <option value="7">7</option>
//                             <option value="8">8</option>
//                             <option value="9">9</option>
//                             <option value="10">10</option>
//                             <option value="11">11</option>
//                             <option value="12">12</option>
//                         </select>

//                         <select className='set-sched-minute-picker' value={pickupMinute} onChange={(e) => setPickupMinute(e.target.value)}>
//                             <option value="00">00</option>
//                             <option value="01">01</option>
//                             <option value="02">02</option>
//                             <option value="03">03</option>
//                             <option value="04">04</option>
//                             <option value="05">05</option>
//                             <option value="06">06</option>
//                             <option value="07">07</option>
//                             <option value="08">08</option>
//                             <option value="09">09</option>
//                             <option value="10">10</option>
//                             <option value="11">11</option>
//                             <option value="12">12</option>
//                             <option value="13">13</option>
//                             <option value="14">14</option>
//                             <option value="15">15</option>
//                             <option value="16">16</option>
//                             <option value="17">17</option>
//                             <option value="18">18</option>
//                             <option value="19">19</option>
//                             <option value="20">20</option>
//                             <option value="21">21</option>
//                             <option value="22">22</option>
//                             <option value="23">23</option>
//                             <option value="24">24</option>
//                             <option value="25">25</option>
//                             <option value="26">26</option>
//                             <option value="27">27</option>
//                             <option value="28">28</option>
//                             <option value="29">29</option>
//                             <option value="30">30</option>
//                             <option value="31">31</option>
//                             <option value="32">32</option>
//                             <option value="33">33</option>
//                             <option value="34">34</option>
//                             <option value="35">35</option>
//                             <option value="36">36</option>
//                             <option value="37">37</option>
//                             <option value="38">38</option>
//                             <option value="39">39</option>
//                             <option value="40">40</option>
//                             <option value="41">41</option>
//                             <option value="42">42</option>
//                             <option value="43">43</option>
//                             <option value="44">44</option>
//                             <option value="45">45</option>
//                             <option value="46">46</option>
//                             <option value="47">47</option>
//                             <option value="48">48</option>
//                             <option value="49">49</option>
//                             <option value="50">50</option>
//                             <option value="51">51</option>
//                             <option value="52">52</option>
//                             <option value="53">53</option>
//                             <option value="54">54</option>
//                             <option value="55">55</option>
//                             <option value="56">56</option>
//                             <option value="57">57</option>
//                             <option value="58">58</option>
//                             <option value="59">59</option>
//                         </select>

//                         <select className='set-sched-timePeriod' value={pickupTimePeriod} onChange={(e) => setPickupTimePeriod(e.target.value)}>
//                             <option value="AM">AM</option>
//                             <option value="PM">PM</option>
//                         </select>
//                     </div>

//                     <button className='accept-adoption-btn'
//                         onClick={() => acceptApplication(
//                                 specificAdoption.animalId, 
//                                 specificAdoption._id,
//                                 email,
//                                 pickupDate,
//                                 pickupHour,
//                                 pickupMinute,
//                                 pickupTimePeriod,
//                                 specificAdoption.animalName,
//                                 specificAdoption.adopterName,
//                             )}
//                     >
//                         Accept Adoption
//                     </button>
//                 </div>
//             }

//             {acceptAdoptionOverlay && <Overlay />}
//         </div>
//     )
// }

export default Adoption