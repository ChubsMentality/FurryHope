import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import '../css/ManageData.css'
import Sidebar from './Sidebar'
import Loading from './SubComponents/Loading'
import Overlay from './SubComponents/Overlay'
import Empty from './SubComponents/EmptyComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getAnimalData, deleteAnimalAction } from '../actions/animalActions.js'
import { MdDelete } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { AiTwotoneEdit } from 'react-icons/ai'

const ManageData = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('')

    const listOfAnimals = useSelector(state => state.animalData);
    const { loading, error, animalList } = listOfAnimals;

    const adminState = useSelector((state) => state.adminLogin)
    const { adminInfo } = adminState

    // Every time a new aninmal was added it will trigger in the useEffect and re-render
    const animalCreate = useSelector((state) => state.animalCreate);
    const { success: successCreate } = animalCreate;

    // Every time an animal's data was updated, it will trigger the useEFfect and re-render
    const animalUpdate = useSelector((state) => state.animalUpdate);
    const { success: successUpdate } = animalUpdate;

    // Every time an animal's data was deleted, it will trigger in the useEffect and re-render
    const animalDelete = useSelector((state) => state.animalDelete);
    const { success: successDelete } = animalDelete;

    // Gets the animal data, and re-render if something is either created, updated, or deleted
    useEffect(() => {
        dispatch(getAnimalData());
    }, [dispatch, successCreate, successUpdate, successDelete]);

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteAnimalAction(id))
        }
    }

    if(error) {
        window.alert(error)
    }

    // To filter the animals
    const [currentStatus, setCurrentStatus] = useState('No Filter')
    const [notAdopted, setNotAdopted] = useState()
    const [pending, setPending] = useState()
    const [adopted, setAdopted] = useState()
    const [filteredAnimals, setFilteredAnimals] = useState()

    const filterNotAdopted = (arr) => {
        return arr.adoptionStatus === 'Not Adopted'
    }

    const filterPending = (arr) => {
        return arr.adoptionStatus === 'Pending'
    }

    const filterAdopted = (arr) => {
        return arr.adoptionStatus === 'Adopted'
    }

    useEffect(() => {
        animalList && setNotAdopted(animalList.filter(filterNotAdopted))
        animalList && setPending(animalList.filter(filterPending))
        animalList && setAdopted(animalList.filter(filterAdopted))
        console.log(currentStatus)

        if(currentStatus === 'No Filter') {
            setFilteredAnimals(animalList)
        } else if (currentStatus === 'Not Adopted') {
            setFilteredAnimals(notAdopted)
        } else if (currentStatus === 'Pending') {
            setFilteredAnimals(pending)
        } else if (currentStatus === 'Adopted'){
            setFilteredAnimals(adopted)
        }

    }, [currentStatus, successCreate, successUpdate, successDelete ])

    const DataContainer = ({ currentAnimals }) => {
        return (
            <>
                {currentAnimals && currentAnimals.filter((animals) => {
                    if(searchQuery === '') {
                        return animals
                    } else if(animals.breed.toLowerCase().includes(searchQuery.toLowerCase())) {
                        return animals
                    }
                }).map((animal) => (
                        <div className="specAnimal-container" key={animal._id}>
                            <div className="specAnimal-name specAnimal-column">
                                <img src={animal.animalImg} className='specAnimal-name-profPic' />
                                
                                <div className="specAnimal-name-container">
                                    <p className='specAnimal-name-head'>{animal.name}</p>
                                </div>
                            </div>

                            <div className="specAnimal-email specAnimal-column">
                                <p className="specAnimal-email-info">{animal.breed}</p>
                            </div>

                            <div className="specAnimal-contactNo specAnimal-column">
                                <p className="specAnimal-contactNo-info">{animal.type}</p>
                            </div>

                            <div className="specAnimal-verified specAnimal-jobPos specAnimal-column">
                                <p className="specAnimal-verified-info">{animal.adoptionStatus}</p>
                            </div>

                            <div className="specAnimal-actions specAnimal-column">
                                <Link to={`update/${animal._id}`}>
                                    <button className="specAnimal-btn-container specAnimal-edit">
                                        <AiTwotoneEdit  className='specAnimal-btn' />
                                    </button>
                                </Link>

                                <button className="specAnimal-btn-container specAnimal-delete" onClick={() => deleteHandler()}>
                                    <MdDelete color='red' className='specAnimal-btn' />
                                </button>
                            </div>
                        </div>
                ))}
            </>
        )
    }

    const PaginatedData = ({ animalsPerPage }) => {
        // We start with an empty list of items.
        const [currentAnimals, setCurrentAnimals] = useState(null)
        const [pageCount, setPageCount] = useState(0)

        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0)

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + animalsPerPage
            // console.log(`Loading items from ${itemOffset} to ${endOffset}`)
        
            filteredAnimals && setCurrentAnimals(filteredAnimals.slice(itemOffset, endOffset))
            filteredAnimals && setPageCount(Math.ceil(filteredAnimals.length / animalsPerPage))
        }, [itemOffset, animalsPerPage])

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * animalsPerPage) % filteredAnimals.length;
            // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
            setItemOffset(newOffset);
        }

        return (
            <>
                <DataContainer currentAnimals={currentAnimals} />
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

    const [loadData, setLoadData] = useState(true)
    const [overlay, setOverlay] = useState(true)

    return (
        <div className='manage-body'>
            {loading && <Loading />}
            {loading && <Overlay />}
            <Sidebar />
            <div className='manage-content'>
                <div className="manage-header-container">
                    <p className='manage-header'>LIST OF ANIMALS</p>

                    <div className="manage-adminInfo">
                        <div className="manage-adminInfo-left">
                            <h3 className="manage-adminName">{adminInfo.fullName}</h3>
                            <p className="manage-adminPos">{adminInfo.jobPosition}</p>
                        </div>

                        <img src={adminInfo.profilePicture} alt="admin's profile picture" className="manage-adminProfile" />
                    </div>                    
                </div>

                <div className='manage-animals-container'>
                    <div className='manage-subHeader'>
                        <div className="manage-searchContainer">
                            <AiOutlineSearch className='manage-searchIcon' color='#111' />
                            <input type="text" className="manage-searchTxt" placeholder='Search for a specific breed...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <div className="manage-animals-right">
                            <div className="manage-filter-animals">
                                <p className="manage-filter-txt">Filter</p>
                                <select className='manage-select' value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)}>
                                    <option value='No Filter'>No Filter</option>
                                    <option value='Not Adopted'>Not Adopted</option>
                                    <option value='Pending'>Pending</option>
                                    <option value='Adopted'>Adopted</option>
                                </select>
                            </div>

                            <Link to='/add'>
                                <button className='manage-add-animal'>
                                    Add a new animal
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="manage-container-heading">
                        <div className="manage-table-label">
                            <p className="manage-label manage-label-name">Name</p>
                            <p className="manage-label manage-label-email">Breed</p>
                            <p className="manage-label manage-label-contactNo">Animal Type</p>
                            <p className="manage-label manage-label-jobPos">Adoption Status</p>
                            <p className="manage-label manage-label-actions">Actions</p>
                        </div>
                    </div>

                    <PaginatedData animalsPerPage={5} /> 
                </div>
            </div>
        </div>
    );
}

export default ManageData;