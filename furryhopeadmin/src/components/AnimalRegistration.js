import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAnimalRegistrations, registerAnimal } from '../actions/adminActions'
import { MdDelete } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import ReactPaginate from 'react-paginate'
import Loading from './SubComponents/Loading'
import Overlay from './SubComponents/Overlay'
import axios from 'axios'
import Sidebar from './Sidebar'
import Switch from 'react-switch'
import '../css/AnimalRegistration.css'

const AnimalRegistration = () => {
    const dispatch = useDispatch()
    // const registrations = useSelector(state => state.getRegistrations)
    // const { animalRegistrations, loading } = registrations

    const adminState = useSelector((state) => state.adminLogin)
    const { adminInfo } = adminState

    const registeredState = useSelector(state => state.animalRegister)
    const { success, registerLoading } = registeredState

    const [overlay, setOverlay] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState([])
    const [animalRegistrations, setAnimalRegistrations] = useState()
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState('')
    const [activeState, setActiveState] = useState(true)
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
        try {
            const { data } = await axios.get(`http://localhost:5000/api/users/animalRegistration/${id}`)
            setModalData(data)
        } catch (error) {
            console.log(error)            
        }

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
            console.log(data)
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

    
    const handleSwitch = () => {
        if(active === 'Not Registered') {
            setActive('Registered')
            setActiveArr(registered)
            setActiveState(false)
            console.log('Not Registered')
        } else {
            setActive('Not Registered')
            setActiveArr(notRegistered)
            setActiveState(true)
            console.log('Registered')
        }
    }
    
    const deleteHandler = (id) => {        
        if(window.confirm('Are you sure you want to delete?')) {
            axios.delete(`http://localhost:5000/api/users/animalRegistration/${id}`)
                .then((response) => {
                    console.log(response)
                })
                .catch(error => console.log(error))
            }
    }

    const RegistrationsContainer = ({ currentRegistrations }) => {
        return (
            <>
                {currentRegistrations &&
                    currentRegistrations.map((registration) => (
                        <div className="specReg-container" key={registration._id}>
                            <div className="specReg-applicant specReg-column">
                                <img src={registration.applicantImg} alt="Applicant's Image" className="specReg-applicantImg" />
                                <p className="specReg-applicantName">{registration.name}</p>
                            </div>

                            <div className="specReg-pet specReg-column">
                                <p className="specReg-petName">{registration.animalName}</p>
                                <p className="specReg-petBreed">{registration.animalBreed}</p>
                            </div>

                            <div className="specReg-regType specReg-column">
                                <p className="specRegType">{registration.registrationType}</p>
                            </div>

                            <div className="specReg-status specReg-column">
                                {registration.registered === 'Registered' ?
                                    <p className="specRegStatus-registered">{registration.registered}</p>
                                    :
                                    <p className="specRegStatus-notRegistered">{registration.registered}</p>
                                }
                            </div>

                            <div className="specReg-actions specReg-column">
                                <button className="specReg-viewData" onClick={() => openModal(registration._id)}>
                                    View Registration
                                </button>

                                <MdDelete className='specReg-deleteReg' color='#ed5e68' onClick={() => deleteHandler(registration._id)} />
                            </div>
                        </div>
                    ))
                }
            </>
        )
    }

    const PaginatedRegistrations = ({ registrationsPerPage }) => {
        const [currentRegistrations, setCurrentRegistrations] = useState(null)
        const [pageCount, setPageCount] = useState(0)

        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0)

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + registrationsPerPage
            // console.log(`Loading items from ${itemOffset} to ${endOffset}`)
        
            activeArr && setCurrentRegistrations(activeArr.slice(itemOffset, endOffset))
            activeArr && setPageCount(Math.ceil(activeArr.length / registrationsPerPage))
        }, [itemOffset, registrationsPerPage])

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * registrationsPerPage) % activeArr.length;
            // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
            setItemOffset(newOffset);
        }

        return (
            <>
                <RegistrationsContainer currentRegistrations={currentRegistrations} />
                <ReactPaginate
                    activeClassName='active-li'
                    activeLinkClassName='active-a'
                    className='pagination-container'
                    pageClassName='pagination-page-li'
                    pageLinkClassName='pagination-link-a'
                    nextClassName='next-li'
                    nextLinkClassName='next-a'
                    previousClassName='prev-li'
                    previousLinkClassName='prev-a'
                    breakClassName='page-break-li'
                    breakLinkClassName='page-break-a'
                    breakLabel='...'
                    nextLabel='>'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel='<'
                    renderOnZeroPageCount={null}
                />
            </>
        )
    }
    
    useEffect(() => {
        getAnimalHandler()
    }, [dispatch, success])
    
    return (
        <div className='animalRegistration-body'>
            <Sidebar />

            <div className='animalRegistration-content'>
                <div className="animalRegistration-headerContainer">
                    <p className='animalRegistration-header'>PET REGISTRATION</p>

                    <div className="animalReg-adminInfo">
                        <div className="animalReg-adminInfo-left">
                            <h3 className="animalReg-adminName">{adminInfo.fullName}</h3>
                            <p className="animalReg-adminPos">{adminInfo.jobPosition}</p>
                        </div>

                        <img src={adminInfo.profilePicture} alt="admin's profile picture" className="animalReg-adminProfile" />
                    </div>
                </div>

                <div className="animalRegSwitch">
                    {active === 'Registered' ? (
                        <div className='animalReg-switch-container'>
                            <div className='switch-container'>
                                <p className='switch-reg'>Registered</p>
                                <label>
                                    <Switch
                                        onChange={handleSwitch}
                                        checked={activeState}
                                        offColor='#808080'
                                        onColor='#808080'
                                        checkedIcon={false}
                                        uncheckedIcon={false}
                                        className='switch-accounts'
                                    />
                                </label>
                                <p className='switch-notReg'>Not Registered</p>
                            </div>
                        </div>
                    ) : (
                        <div className='animalReg-switch-container'>

                            <div className='switch-container'>
                                <p className='switch-reg'>Registered</p>
                                <label>
                                    <Switch
                                        onChange={handleSwitch}
                                        checked={activeState}
                                        offColor='#808080'
                                        onColor='#808080'
                                        size={5}
                                        checkedIcon={false}
                                        uncheckedIcon={false}
                                    />
                                </label>
                                <p className='switch-notReg'>Not Registered</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className='animalReg-container'>
                    <div className="animalReg-label-container">
                        <p className="animalReg-label animalReg-label-applicant">Applicant</p>
                        <p className="animalReg-label animalReg-label-pet">Pet</p>
                        <p className="animalReg-label animalReg-label-regType">Registration Type</p>
                        <p className="animalReg-label animalReg-label-status">Status</p>
                        <p className="animalReg-label animalReg-label-actions">Actions</p>
                    </div>

                    <PaginatedRegistrations registrationsPerPage={5} /> 
                </div>
            </div>

            {modal && <Overlay />}

            {modal &&
                <div className='animalReg-modal-container'>
                    <IoClose className='animalReg-closeModal' onClick={() => closeModal()} />

                </div>
            }

            {loading && <Loading />}
            {loading && <Overlay />}
        </div>
    )
}

export default AnimalRegistration