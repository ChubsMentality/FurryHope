import React, { useState, useEffect } from "react"
import ReactPaginate from "react-paginate"
import { useDispatch, useSelector } from "react-redux"
import { deleteAdminAccount, deleteUserAccount } from "../actions/adminActions"
import { Link } from 'react-router-dom'
import { FaUserEdit } from 'react-icons/fa'
import { IoPersonCircle } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { HiEye } from 'react-icons/hi'
import EditAdmin from "./Modals/EditAdmin"
import Switch from "react-switch"
import axios from "axios"
import Overlay from "./SubComponents/Overlay"
import Loading from "./SubComponents/Loading"
import Sidebar from "./Sidebar"
import "../css/AccountsList.css"
import ViewUser from "./Modals/ViewUser"

const AccountsList = () => {
    const [userAccounts, setUserAccounts] = useState()
    const [adminAccounts, setAdminAccounts] = useState()
    const [accounts, setAccounts] = useState()
    const [activeAccounts, setActiveAccounts] = useState(false)
    const [editAdmin, setEditAdmin] = useState(false)
    const [viewUser, setViewUser] = useState(false)
    const dispatch = useDispatch()
    const adminState = useSelector((state) => state.adminLogin)
    const { adminInfo } = adminState

    const adminDelete = useSelector((state) => state.adminAccDelete)
    const { success: adminDeleteSuccess } = adminDelete

    const userDelete = useSelector((state) => state.userAccDelete)
    const { success: userDeleteSuccess } = userDelete

    const [adminId, setAdminId] = useState('')
    const [userId, setUserId] = useState('')

    const openEditAdmin = (id) => {
        setEditAdmin(true)
        setAdminId(id)
    }

    const toggleEditAdmin = () => {
        setEditAdmin(!editAdmin)
    }

    const openViewUser = (id) => {
        setViewUser(true)
        setUserId(id)
    }

    const toggleViewUser = () => {
        setViewUser(!viewUser)
    }

    const getUserAccounts = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/admins/userAccounts"
            )
            console.log(data)
            setUserAccounts(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAdminAccounts = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/admins/adminAccounts"
            )
            console.log(data)
            setAdminAccounts(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSwitch = () => {
        setActiveAccounts(!activeAccounts)
    }

    const deleteAdminHandler = (id) => {
        try {
            if (window.confirm('Are you sure you want to delete?')) {
                dispatch(deleteAdminAccount(id))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUserHandler = (id) => {
        try {
            if (window.confirm('Are you sure you want to delete?')) {
                dispatch(deleteUserAccount(id))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const AdminsToPaginate = ({ adminAccounts }) => {
        return (
            <>
                {adminAccounts && 
                    adminAccounts.map((admin) => (
                        <div className="specAccount-container" key={admin._id}>
                            <div className="specAccount-name specAccount-column">
                                <img src={admin.profilePicture} className='specAccount-name-profPic' />
                                
                                <div className="specAccount-name-container">
                                    <p className='specAccount-name-head'>{admin.fullName}</p>
                                    <p className='specAccount-name-subHead'>{admin.role}</p>
                                </div>
                            </div>

                            <div className="specAccount-email specAccount-column">
                                <p className="specAccount-email-info">{admin.email}</p>
                            </div>

                            <div className="specAccount-contactNo specAccount-column">
                                <p className="specAccount-contactNo-info">{admin.contactNo}</p>
                            </div>

                            <div className="specAccount-verified specAcccount-jobPos specAccount-column">
                                <p className="specAccount-verified-info">{admin.jobPosition}</p>
                            </div>

                            <div className="specAccount-actions specAccount-column">
                                <button className="specAccount-btn-container specAccount-edit" onClick={() => openEditAdmin(admin._id)}>
                                    <FaUserEdit className='specAccount-btn' />
                                </button>

                                {activeAccounts ?
                                    <button className="specAccount-btn-container specAccount-delete" onClick={() => deleteAdminHandler(admin._id)}>
                                        <MdDelete color='red' className='specAccount-btn' />
                                    </button>
                                    :
                                    <button className="specAccount-btn-container specAccount-delete">
                                        <MdDelete color='red' className='specAccount-btn' />
                                    </button>
                                }
                            </div>
                        </div>
                ))}
            </>
        )
    }

    const PaginatedAdmins = ({ accountsPerPage }) => {
        const [currentAdmins, setCurrentAdmins] = useState(null)
        const [pageCount, setPageCount] = useState(0)
        const [itemOffset, setItemOffset] = useState(0)

        useEffect(() => {
            const endOffset = itemOffset + accountsPerPage

            adminAccounts && setCurrentAdmins(adminAccounts.slice(itemOffset, endOffset))
            adminAccounts && setPageCount(Math.ceil(adminAccounts.length / accountsPerPage))
        }, [itemOffset, accountsPerPage])

        const handlePageClick = (event) => {
            const newOffset = (event.selected * accountsPerPage) % adminAccounts.length
            setItemOffset(newOffset)
        }

        return (
            <>
                <AdminsToPaginate adminAccounts={currentAdmins} />
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

    const UsersToPaginate = ({ userAccounts }) => {
        return (
            <>
                {userAccounts && 
                    userAccounts.map((user) => (
                        <div className="specAccount-container" key={user._id}>
                            <div className="specAccount-name specAccount-column">
                                <img src={user.profilePicture} className='specAccount-name-profPic' />
                                
                                <div className="specAccount-name-container">
                                    <p className='specAccount-name-head-user'>{user.fullName}</p>
                                </div>
                            </div>

                            <div className="specAccount-email specAccount-column">
                                <p className="specAccount-email-info">{user.email}</p>
                            </div>

                            <div className="specAccount-contactNo specAccount-column">
                                <p className="specAccount-contactNo-info">{user.contactNo}</p>
                            </div>

                            <div className="specAccount-verified specAcccount-jobPos specAccount-column">
                                <p className="specAccount-verified-info">{user.verified ? 'true' : 'false'}</p>
                            </div>

                            <div className="specAccount-actions specAccount-column">
                                <button className="specAccount-btn-container specAccount-edit" onClick={() => openViewUser(user._id)}>
                                    <HiEye className="specAccount-btn" />
                                </button>

                                {activeAccounts ?
                                    <button className="specAccount-btn-container specAccount-delete">
                                        <MdDelete color='red' className='specAccount-btn' />
                                    </button>
                                    :
                                    <button className="specAccount-btn-container specAccount-delete" onClick={() => deleteUserHandler(user._id)}>
                                        <MdDelete color='red' className='specAccount-btn' />
                                    </button>
                                }
                            </div>
                        </div>
                ))}
            </>
        )
    }

    const PaginatedUsers = ({ accountsPerPage }) => {
        const [currentUsers, setCurrentUsers] = useState(null)
        const [pageCount, setPageCount] = useState(0)
        const [itemOffset, setItemOffset] = useState(0)

        useEffect(() => {
            const endOffset = itemOffset + accountsPerPage

            userAccounts && setCurrentUsers(userAccounts.slice(itemOffset, endOffset))
            userAccounts && setPageCount(Math.ceil(userAccounts.length / accountsPerPage))
        }, [itemOffset, accountsPerPage])

        const handlePageClick = (event) => {
            const newOffset = (event.selected * accountsPerPage) % userAccounts.length
            setItemOffset(newOffset)
        }

        return (
            <>
                <UsersToPaginate userAccounts={currentUsers} />
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
        // getAdminHandler()
        getUserAccounts()
        getAdminAccounts()
    }, [dispatch, adminDeleteSuccess, userDeleteSuccess])

    return (
        <div className='accounts-body'>
            <Sidebar />
            
            <div className='accounts-content'>
                <div className="accounts-header-container">
                    <p className='accounts-header'>LIST OF ACCOUNTS</p>

                    <div className="accounts-adminInfo">
                        <div className="accounts-adminInfo-left">
                            <h3 className="accounts-adminName accounts-adminInfo-label">{adminInfo.fullName}</h3>
                            <p className="accounts-adminPos accounts-adminInfo-label">{adminInfo.jobPosition}</p>
                        </div>

                        <img src={adminInfo.profilePicture} alt="admin's profile picture" className="accounts-adminProfile" />
                    </div>                    
                </div>

                <div className='accounts-container'>
                    <div className="accounts-container-heading">
                        {activeAccounts ? (
                            <div className='accounts-subHeader'>
                                <p className='accounts-admins-header'>Admin Accounts</p>

                                <div className='switch-container'>
                                    <div className="accounts-addAdmin-link">
                                        {adminInfo.role === 'Admin' ?
                                            <Link to={'/addAdmin'}>
                                                <button className='accounts-add-admin'>Add an account?</button>
                                            </Link>
                                            :
                                            <div></div>
                                        }
                                    </div>

                                    <p className='switch-users'>Users</p>
                                    <label>
                                        <Switch
                                            onChange={handleSwitch}
                                            checked={activeAccounts}
                                            offColor='#808080'
                                            onColor='#808080'
                                            height={20}
                                            width={40}
                                            handleDiameter={20}
                                            checkedIcon={false}
                                            uncheckedIcon={false}
                                            className='switch-accounts'
                                        />
                                    </label>
                                    <p className='switch-admins'>Admins</p>
                                </div>
                            </div>
                        ) : (
                            <div className='accounts-subHeader'>
                                <p className='accounts-users-header'>User Accounts</p>

                                <div className='switch-container'>
                                    <p className='switch-users'>Users</p>
                                    <label>
                                        <Switch
                                            onChange={handleSwitch}
                                            checked={activeAccounts}
                                            offColor='#808080'
                                            onColor='#808080'
                                            height={20}
                                            width={40}
                                            handleDiameter={20}
                                            checkedIcon={false}
                                            uncheckedIcon={false}
                                            className='switch-accounts'
                                        />
                                    </label>
                                    <p className='switch-admins'>Admins</p>
                                </div>
                            </div>
                        )}

                        <div className="accounts-table-label">
                            {activeAccounts ?
                                <>
                                    <p className="accounts-label accounts-label-name">Name</p>
                                    <p className="accounts-label accounts-label-email">Email</p>
                                    <p className="accounts-label accounts-label-contactNo">Contact Number</p>
                                    <p className="accounts-label accounts-label-jobPos">Job Position</p>
                                    <p className="accounts-label accounts-label-actions">Actions</p>
                                </>
                                : 
                                <>
                                    <p className="accounts-label accounts-label-name">Name</p>
                                    <p className="accounts-label accounts-label-email">Email</p>
                                    <p className="accounts-label accounts-label-contactNo">Contact Number</p>
                                    <p className="accounts-label accounts-label-verified">Verified</p>
                                    <p className="accounts-label accounts-label-actions">Actions</p>
                                </>
                            }
                        </div>
                    </div>

                    {activeAccounts ?
                        <PaginatedAdmins accountsPerPage={5} />
                        :
                        <PaginatedUsers accountsPerPage={5} />
                    }
                </div>
            </div>

            {editAdmin &&
                <EditAdmin
                    id={adminId} 
                    editAdmin={editAdmin}
                    setEditAdmin={setEditAdmin}
                    toggleModal={toggleEditAdmin}
                />
            }

            {editAdmin && <Overlay />}

            {viewUser &&
                <ViewUser
                    id={userId}
                    setViewUser={setViewUser}
                    viewUser={viewUser}
                    toggleModal={toggleViewUser}
                />
            }

            {viewUser && <Overlay />}
        </div>
    )
}

export default AccountsList

