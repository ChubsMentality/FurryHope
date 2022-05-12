import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import '../css/ManageData.css'
import Sidebar from './Sidebar'
import Loading from './SubComponents/Loading'
import Overlay from './SubComponents/Overlay'
import Empty from './SubComponents/EmptyComponent'
import AnimalComponent from './SubComponents/AnimalsComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getAnimalData, deleteAnimalAction } from '../actions/animalActions.js'

const ManageData = () => {
    const dispatch = useDispatch();
    const listOfAnimals = useSelector(state => state.animalData);
    const { loading, error, animalList } = listOfAnimals;

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
            <div>
                {currentAnimals && 
                    currentAnimals.map((animal) => (
                        <AnimalComponent 
                            key={animal._id} 
                            _id={animal._id}
                            animalImg={animal.animalImg}
                            name={animal.name}
                            type={animal.type}
                            breed={animal.breed} 
                            gender={animal.gender}
                            adoptionStatus={animal.adoptionStatus}
                            deleteHandler={deleteHandler} 
                        />
                    ))}
            </div>
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
                <h1 className='manage-data-header'>MANAGE DATA</h1>
                <p className='manage-animal-count'>Animals ({filteredAnimals && filteredAnimals.length})</p>
                <select className='manage-select' value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)}>
                    <option value='No Filter'>No Filter</option>
                    <option value='Not Adopted'>Not Adopted</option>
                    <option value='Pending'>Pending</option>
                    <option value='Adopted'>Adopted</option>
                </select>

                {/* If there are no animals in the database, show the 'Empty' component. Otherwise display the  
                    contents of the database (animals) */}
                {animalList && !animalList.length ? 
                    <Empty />
                    :
                    animalList ?
                        <div className='pagination-div'>
                            <PaginatedData animalsPerPage={5} /> 
                        </div>
                        : 
                        <>
                            {loading && <Loading />}
                            {loading && <Overlay />}
                        </>
                }
            </div>
        </div>
    );
}

export default ManageData;

/*
    // No Pagination Implemented

    animalList ? animalList.map((animal) => {
        return (
            <AnimalComponent 
                key={animal._id} 
                _id={animal._id}
                animalImg={animal.animalImg}
                name={animal.name}
                type={animal.type}
                breed={animal.gender} 
                gender={animal.gender}
                adoptionStatus={animal.adoptionStatus}
                deleteHandler={deleteHandler} 
            />
        )
    }) : <Loading loading={loading}/> /* Insert loading component here */

