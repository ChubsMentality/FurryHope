import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteAdminAccount, deleteUserAccount } from "../actions/adminActions"
import { Link } from 'react-router-dom'
import Switch from "react-switch"
import axios from "axios"
import Overlay from "./SubComponents/Overlay"
import Loading from "./SubComponents/Loading"
import Sidebar from "./Sidebar"
import "../css/AccountsList.css"

const AccountsList = () => {
    const [userAccounts, setUserAccounts] = useState()
    const [adminAccounts, setAdminAccounts] = useState()
    const [activeAccounts, setActiveAccounts] = useState(false)

    const dispatch = useDispatch()
    const adminDelete = useSelector((state) => state.adminAccDelete)
    const { success: adminDeleteSuccess } = adminDelete

    const userDelete = useSelector((state) => state.userAccDelete)
    const { success: userDeleteSuccess } = userDelete

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

    useEffect(() => {
        getUserAccounts()
        getAdminAccounts()
    }, [dispatch, adminDeleteSuccess, userDeleteSuccess])


    return (
        <div className='accounts-body'>
            <Sidebar />
            <div className='accounts-content'>
                <p className='accounts-header'>LIST OF ACCOUNTS</p>
                {activeAccounts ? (
                    <div className='accounts-subHeader'>
                        <div className='accounts-admins-container'>
                            <p className='accounts-admins-header'>Admin Accounts</p>

                            <Link to={'/addAdmin'}>
                                <button className='accounts-add-admin'>Add an account?</button>
                            </Link>
                        </div>

                        <div className='switch-container'>
                            <p className='switch-users'>Users</p>
                            <label>
                                <Switch
                                    onChange={handleSwitch}
                                    checked={activeAccounts}
                                    offColor='#808080'
                                    onColor='#808080'
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
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                />
                            </label>
                            <p className='switch-admins'>Admins</p>
                        </div>
                    </div>
                )}

                <div className='align-table-accounts'>
                    {activeAccounts ? (
                        // Admin Accounts
                        <>
                            {adminAccounts && adminAccounts.length === 0 ? (
                                <p className='no-admin-accounts'>There are no admin accounts</p>
                            ) : adminAccounts ? (
                                <table className='accounts-table'>
                                    <thead>
                                        <tr>
                                            <th className='accounts-th admin-id'>
                                                Admin ID
                                            </th>
                                            <th className='accounts-th admin-username'>
                                                Username
                                            </th>
                                            <th className='accounts-th admin-name'>
                                                Name
                                            </th>
                                            <th className='accounts-th delete-admin-account'></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {adminAccounts &&
                                            adminAccounts.map(admin => (
                                                <tr
                                                    key={admin._id}
                                                    className='accounts-table-row'
                                                >
                                                    <td className='accounts-data data-admin-id'>
                                                        {admin._id}
                                                    </td>
                                                    <td className='accounts-data data-admin-username'>
                                                        {admin.username}
                                                    </td>
                                                    <td className='accounts-data data-admin-name'>
                                                        {admin.name}
                                                    </td>
                                                    <td className='accounts-action delete-account-admin'>
                                                        <button className='delete-admin-btn' onClick={() => deleteAdminHandler(admin._id)}>DELETE</button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            ) : (
                                <>
                                    <Loading />
                                    <Overlay />
                                </>
                            )}
                        </>
                    ) : (
                        // User Accounts
                        <>
                            {userAccounts && userAccounts.length === 0 ? (
                                <p className='no-user-accounts'>There are no users registered</p>
                            ) : userAccounts ? (
                                <table className='accounts-table'>
                                    <thead>
                                        <tr>
                                            
                                            <th className='accounts-th user-username'>
                                                Name
                                            </th>
                                            <th className='accounts-th user-name'>
                                                Email
                                            </th>
                                            <th className='accounts-th user-verified'>
                                                Verified
                                            </th>
                                            <th className='accounts-th delete-user-account'></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {userAccounts &&
                                            userAccounts.map(user => (
                                                <tr
                                                    className='accounts-table-row'
                                                    key={user._id}
                                                >
                                                    <td className='accounts-data data-user-name'>
                                                        {user.fullName}
                                                    </td>
                                                    <td className='accounts-data data-user-email'>
                                                        {user.email}
                                                    </td>
                                                    <td className='accounts-data data-user-verified'>
                                                        {user.verified ? 'Verified' : 'Not Verified'}
                                                    </td>
                                                    <td className='accounts-action delete-account-user'>
                                                        <button className='delete-user-btn' onClick={() => deleteUserHandler(user._id)}>DELETE</button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            ) : (
                                <>
                                    <Loading />
                                    <Overlay />
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AccountsList
