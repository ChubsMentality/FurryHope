import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAnimalRegistrations, registerAnimal, getPendingRegistrations, getRegisteredPets, getNotRegisteredPets, deleteRegistration } from '../actions/adminActions'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import ReactPaginate from 'react-paginate'
import Loading from './SubComponents/Loading'
import Overlay from './SubComponents/Overlay'
import axios from 'axios'
import Sidebar from './Sidebar'
import Switch from 'react-switch'
import { sortArray } from './SubComponents/QuickSortArrOfObjs'
import '../css/AnimalRegistration.css'

const AnimalRegistration = () => {
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('applicantName')
    // const registrations = useSelector(state => state.getRegistrations)
    // const { animalRegistrations, loading } = registrations

    const adminState = useSelector((state) => state.adminLogin)
    const { adminInfo } = adminState

    const pendingState = useSelector(state => state.pendingPetsState)
    const { loading, pendingRegistrations } = pendingState

    const registeredState = useSelector(state => state.registeredPetsState)
    const { registeredPets } = registeredState

    registeredPets && console.log(registeredPets)

    const notRegisteredState = useSelector(state => state.notRegisteredPetsState)
    const { notRegisteredPets } = notRegisteredState

    notRegisteredPets && console.log(notRegisteredPets)

    const deleteRegState = useSelector(state => state.deleteRegistrationState)
    const { success:successDelete } = deleteRegState

    const [active, setActive] = useState('Pending')
    const [activeState, setActiveState] = useState(true)
    const [activeArr, setActiveArr] = useState()
    const [notReg, setNotReg] = useState()
    const [reg, setReg] = useState()

    // const getAnimalHandler = async () => {
    //     try {
    //         setLoading(true)
    //         const { data } = await axios.get('http://localhost:5000/api/admins/getAllRegistrations')
    //         console.log(data)
    //         setRegistered(data.filter(filterRegistered))
    //         setNotRegistered(data.filter(filterNotRegistered))
    //         setActiveArr(data.filter(filterNotRegistered))
    //         setActive('Not Registered')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const registerAnimalHandler = async (id, email, name, animalName) => {
        dispatch(registerAnimal(id))

        try {
            const { data } = await axios.post('http://localhost:5000/api/admins/sendRegisteredMessage', { email, name, animalName })
        } catch (error) {
            console.log(error)
        }

        alert('The animal has been registered')
    }

    const deleteHandler = (id) => {        
        if(window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteRegistration(id))
        }
    }

    const getNotReg = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/admins/getNotRegisteredPets')
            setNotReg(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getReg = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/admins/getRegisteredPets')
            setReg(data)
        } catch (error) {
            console.log(error)
        }
    }

    const RegistrationsContainer = ({ currentRegistrations }) => {
        return (
            <>
                {currentRegistrations && currentRegistrations.filter((reg) => {
                    if(searchQuery === '') {
                        return reg
                    } else if(reg.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return reg
                    }
                }).map((registration) => (
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
                            {registration.registrationStatus === 'Pending' &&
                                <p className="specRegStatus-pending">{registration.registrationStatus}</p>
                            }

                            {registration.registrationStatus === 'Registered' &&
                                <p className="specRegStatus-registered">{registration.registrationStatus}</p>
                            }

                            {registration.registrationStatus === 'Not Registered' &&
                                <p className="specRegStatus-notRegistered">{registration.registrationStatus}</p>
                            }
                        </div>

                        <div className="specReg-actions specReg-column">
                            <Link to={`/specReg/${registration._id}`}>
                                <button className="specReg-viewData">
                                    View Registration
                                </button>
                            </Link>

                            <MdDelete className='specReg-deleteReg' color='#ed5e68' onClick={() => deleteHandler(registration._id)} />
                        </div>
                    </div>
                ))}
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
        // getAnimalHandler()
        dispatch(getPendingRegistrations())
        // dispatch(getRegisteredPets())
        // dispatch(getNotRegisteredPets())
        getNotReg()
        getReg()
    }, [dispatch, successDelete])

    useEffect(() => {
        if(active === 'Pending') {
            setActiveArr(pendingRegistrations)
        } else if(active === 'Not Registered') {
            setActiveArr(notReg)
        } else if(active === 'Registered') {
            setActiveArr(reg)
        }

        // if(sortBy === 'name') {
        //     setActiveArr(prevState => sortArray(prevState, 0, prevState.length - 1, 'name'))
        // } else if(sortBy === 'animalName') {
        //     setActiveArr(prevState => sortArray(prevState, 0, prevState.length - 1, 'animalName'))
        // } else if(sortBy === 'animalBreed') {
        //     setActiveArr(prevState => sortArray(prevState, 0, prevState.length - 1, 'animalBreed'))
        // } else if(sortBy === 'status') {
        //     setActiveArr(prevState => sortArray(prevState, 0, prevState.length - 1, 'registrationStatus'))
        // }
    }, [active, sortBy])
    
    return (
        <div className='animalRegistration-body'>
            <Sidebar />

            <div className='animalRegistration-content'>
                <div className="accounts-header-container">
                    <p className='accounts-header'>PET REGISTRATION</p>

                    <div className="accounts-adminInfo">
                        <div className="accounts-adminInfo-left">
                            <h3 className="accounts-adminName">{adminInfo.fullName}</h3>
                            <p className="accounts-adminPos">{adminInfo.jobPosition}</p>
                        </div>

                        <img src={adminInfo.profilePicture} alt="admin's profile picture" className="accounts-adminProfile" />
                    </div>
                </div>

                <div className="animalReg-subContainer">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15}}>
                        <div className="animalReg-select-container">
                            <p className="animalReg-select-label">Status</p>
                            <select value={active} onChange={(e) => setActive(e.target.value)} className='animalReg-select'>
                                <option value='Pending'>Pending</option>
                                <option value='Not Registered'>Not Registered</option>
                                <option value='Registered'>Registered</option>
                            </select>
                        </div>

                        {/* <div className="animalReg-select-container">
                            <p className="animalReg-select-label">Status</p>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='animalReg-select'>
                                <option value='name'>Applicant's Name</option>
                                <option value='animalName'>Animal's Name</option>
                                <option value='animalBreed'>Animal's Breed</option>
                                <option value='status'>Status</option>
                            </select>
                        </div> */}
                    </div>

                    <div className="manage-searchContainer">
                        <AiOutlineSearch className='manage-searchIcon' color='#111' />
                        <input type="text" className="manage-searchTxt" placeholder='Search for a specific breed...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
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

            {loading && <Loading />}
            {loading && <Overlay />}
        </div>
    )
}

export default AnimalRegistration