import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDonations, deleteDonationHandler, receivedDonation } from '../actions/adminActions'
import axios from 'axios'
import Sidebar from './Sidebar'
import Loading from './SubComponents/Loading'
import Overlay from './SubComponents/Overlay'
import closeModalIcon from '../assets/Icons/close-modal.svg'
import '../css/Donations.css'

const Donations = () => {
    const dispatch = useDispatch()

    const donationsList = useSelector(state => state.getDonationsState)
    const { donations, loading, error } = donationsList
    console.log(donations)

    const deleteDonation = useSelector(state => state.donationDelete)
    const { success:successDelete, error:deleteError } = deleteDonation

    const updateReceivedDonation = useSelector(state => state.receivedDonation)
    const { success:successUpdate } = updateReceivedDonation

    const [donation, setDonation] = useState([])
    const [modal, setModal] = useState(false)
    const [overlay, setOverlay] = useState(false)

    const [itemName, setItemName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [donatedBy, setDonatedBy] = useState('')
    const [dateOfDonation, setDateOfDonation] = useState('')

    const viewDonation = async (id) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/admins/getDonationById/${id}`)
            setDonation(data)
            console.log(data)

            setModal(true)
            setOverlay(true)
            setItemName(data.itemName)
            setQuantity(data.quantity)
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
        // dispatch(receivedDonation(id))
        
        // try {
        //     const { data } = await axios.post('http://localhost:5000/api/admins/addToDonationInventory', { })
        //     console.log(data)
        // } catch (error) {
        //     console.log(error)
        // }

        // setModal(false)
        // setOverlay(false)
     

        console.log(itemName)
        console.log(quantity)
    } 

    const closeModal = () => {
        setModal(false)
        setOverlay(false)
    }
    
    useEffect(() => {
        dispatch(getDonations())
    }, [dispatch, successDelete, successUpdate])

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
                        <button className='donations-received-btn' onClick={() => receivedDonationHandler(donation._id)}>RECEIVED</button>
                    }
                </div>
            }
            <div className="donations-content">
                <p className='donations-header'>DONATIONS</p>

                {donations && donations.length === 0 ?
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
                                donations && donations.map((donation) => (
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
        </div>
    )
}

export default Donations