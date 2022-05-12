import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDonations, deleteDonationHandler, receivedDonation, addToInventory, getDonationInventory } from '../actions/adminActions'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import Sidebar from './Sidebar'
import Loading from './SubComponents/Loading'
import Overlay from './SubComponents/Overlay'
import closeModalIcon from '../assets/Icons/close-modal.svg'
import '../css/Donations.css'

const Donations = () => {
    const dispatch = useDispatch()

    const donationsList = useSelector(state => state.getDonationsState)
    const { loading, error } = donationsList

    const deleteDonation = useSelector(state => state.donationDelete)
    const { success:successDelete, error:deleteError } = deleteDonation

    const updateReceivedDonation = useSelector(state => state.receivedDonation)
    const { success:successUpdate } = updateReceivedDonation

    const getInventory = useSelector(state => state.donationInventoryState)
    const { inventoryList } = getInventory

    const [donation, setDonation] = useState([])
    const [modal, setModal] = useState(false)
    const [overlay, setOverlay] = useState(false)

    const [donations, setDonations] = useState()
    const [notReceived, setNotReceived] = useState()
    const [dataItems, setDataItems] = useState([])
    const [itemName, setItemName] = useState([])
    const [quantity, setQuantity] = useState([])
    const [donatedBy, setDonatedBy] = useState('')
    const [dateOfDonation, setDateOfDonation] = useState('')
    const [isReceived, setIsReceived] = useState()
    const [activeTab, setActiveTab] = useState('Donations')
    const isDonationReceived = isReceived === 'Received'
    const isDonationsActive = activeTab === 'Donations'
    const isInventoryActive = activeTab === 'Inventory'

    const filterReceived = (arr) => {
        return arr.received === 'Not Received'
    }

    const getDonations = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/admins/getDonations')
            setDonations(data)
            setNotReceived(data.filter(filterReceived))
            console.log(data)
            
        } catch (error) {
            console.log(error)
        }
    }

    const viewDonation = async (id) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/admins/getDonationById/${id}`)
            // console.log(data)
            setDataItems(data.items)

            setDonation(data)
            setModal(true)
            setOverlay(true)
            setDonatedBy(data.name)
            setIsReceived(data.received)
            setDateOfDonation(data.dateOfDonation)
        } catch (error) {
            console.log(error)
        }

    } 

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteDonationHandler(id))
        }
    }

    const receivedDonationHandler = async (id) => {
        dispatch(receivedDonation(id))
        dispatch(addToInventory(dataItems, donatedBy, dateOfDonation))

        setModal(false)
        setOverlay(false)

        // console.log(dataItems)
        // console.log(donatedBy)
        // console.log(dateOfDonation)
        // console.log(isReceived)
    } 

    const closeModal = () => {
        setModal(false)
        setOverlay(false)
    }

    const toggleDonations = () => {
        setActiveTab('Donations')
    }

    const toggleInventory = () => {
        setActiveTab('Inventory')
        console.log(inventoryList)
    }
    
    useEffect(() => {
        getDonations()
        dispatch(getDonationInventory())
    }, [dispatch, successDelete, successUpdate])

    useEffect(() => {

    })

    const DataContainer = ({ currentDonations }) => {
        return (
            <div>
                {currentDonations && currentDonations.length === 0 ?
                    <p>There are no donations</p>
                    :
                    <table className='donations-table'>
                        <thead className='donations-table-head'>
                            <tr>
                                <th className='donations-head donations-name'>Name</th>
                                <th className='donations-head donations-email'>Email</th>
                                <th className='donations-head donations-contact'>ContactNo</th>
                                <th className='donations-head donations-received'>Received</th>
                                <th className='donations-head donations-action'></th>
                            </tr>
                        </thead>
                        <tbody className='donations-table-body'>
                            {
                                currentDonations && currentDonations.map((donation) => (
                                    <tr key={donation._id} className='registration-data-row'>
                                        <td className='donations-body-data'>{donation.name}</td>
                                        <td className='donations-body-data'>{donation.email}</td>
                                        <td className='donations-body-data'>{donation.contactNo}</td>
                                        <td className='donations-body-data'>{donation.received}</td>
                                        <td className='donations-body-data donations-buttons-container'>
                                            <button className='donations-view-btn donations-btn' onClick={() => viewDonation(donation._id)}>VIEW</button>
                                            <button className='donations-delete-btn donations-btn' onClick={() => deleteHandler(donation._id)}>DELETE</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
            </div>
        )
    }

    const PaginatedData = ({ donationsPerPage }) => {
        // We start with an empty list of items.
        const [currentDonations, setCurrentDonations] = useState(null)
        const [pageCount, setPageCount] = useState(0)

        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0)

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + donationsPerPage
            // console.log(`Loading items from ${itemOffset} to ${endOffset}`)
        
            notReceived && setCurrentDonations(notReceived.slice(itemOffset, endOffset))
            notReceived && setPageCount(Math.ceil(notReceived.length / donationsPerPage))
        }, [itemOffset, donationsPerPage])

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * donationsPerPage) % notReceived.length;
            // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
            setItemOffset(newOffset);
        }

        return (
            <>
                <DataContainer currentDonations={currentDonations} />
                <ReactPaginate
                    activeClassName='active-li'
                    activeLinkClassName='active-a'
                    className='pagination-container-donations'
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

    return (
        <div className='donations-body'>
            <Sidebar />
            {loading && <Loading />}
            {loading && <Overlay />}
            {overlay && <Overlay />}
            {modal &&
                <div className='donations-modal'>
                    <img className='donations-close-modal' src={closeModalIcon} onClick={() => closeModal()} />
                    
                    <div className="donations-modal-columns">
                        <div className="donations-modal-left-column">
                            <p className='donation-modal-label'>
                                Name:
                                <span className='donation-modal-value'>{donation.name}</span>
                            </p>

                            <p className='donation-modal-label'>
                                Email:
                                <span className='donation-modal-value'>{donation.email}</span>
                            </p>

                            <p className='donation-modal-label'>
                                Contact Number:
                                <span className='donation-modal-value'>{donation.contactNo}</span>
                            </p>
                            
                            <p className='date-of-donation-header'>Date / Time of Donation</p>
                            <p className='donation-modal-label'>
                                Date:
                                <span className='donation-modal-value'>{donation.dateOfDonation}</span>
                            </p>

                            <p className='donation-modal-label'>
                                Time:
                                <span className='donation-modal-value'>{donation.time}</span>
                            </p>
                        </div>

                        <div className="donations-modal-right-column">
                            <table className='donations-modal-table'>
                                <thead className='donations-modal-tableHead'>
                                    <tr className='donations-modal-head-row'>
                                        <th className='donations-modal-tableHeading head-itemName'>Item Name</th>
                                        <th className='donations-modal-tableHeading head-quantity'>Quantity</th>
                                    </tr>
                                </thead>

                                <tbody className='donations-modal-body'>
                                    {donation.items && donation.items.map((item) => (
                                        <tr key={item.id} className='donations-modal-body-row'>
                                            <td className='donations-modal-itemName'>{item.itemName}</td>
                                            <td className='donations-modal-quantity'>{item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {donation &&
                        isDonationReceived ?
                            <button className='disabled-received-btn' disabled={true}>RECEIVED</button>
                            :
                            <button className='donations-received-btn' onClick={() => receivedDonationHandler(donation._id)}>RECEIVED</button>

                    }
                </div>
            }
            <div className="donations-content">
                <p className='donations-header'>DONATIONS</p>
                <div className="toggleRegistrationsBtnContainer">
                    <button className={isDonationsActive ? 'toggle-donation-btn donation-active' : 'toggle-donation-btn donation-inactive'} onClick={() => toggleDonations()}>Donations</button>
                    <button className={isInventoryActive ? 'toggle-donation-btn inventory-active' : 'toggle-donation-btn donation-inactive'} onClick={() => toggleInventory()}>Received Donations</button>
                </div>

                {isDonationsActive ?
                    <PaginatedData donationsPerPage={5} />
                    :      
                    <table className='inventory-table'>
                        <thead className='inventory-table-head'>
                            <tr className='inventory-head-row'>
                                <th className='inventory-table-header'>Donated By</th>
                                <th className='inventory-table-header'>Date</th>
                                <th className='inventory-table-header'>Items</th>
                                <th className='inventory-table-header'>Quantity</th>

                            </tr>
                        </thead>
                        <tbody>
                        {inventoryList && inventoryList.map((inventory) => (
                            <tr className='inventory-body-row' key={inventory._id}>
                                <td className='inventory-body-td td-donatedBy'>{inventory.donatedBy}</td>
                                <td className='inventory-body-td td-dateOfDonation'>{inventory.dateOfDonation}</td>
                                <td className='inventory-body-td td-itemName'>
                                    {inventory.dataItems.map((item) => (
                                        <p className='inventory-itemName'>{item.itemName}</p>
                                    ))}
                                </td>
                                <td className='inventory-body-td td-quantity'>
                                    {inventory.dataItems.map((item) => (
                                        <p className='inventory-quantity'>{item.quantity}</p>
                                    ))}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default Donations