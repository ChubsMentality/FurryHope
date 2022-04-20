import React from "react"
import "../css/Sidebar.css"
import { Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../actions/adminActions"

import add from "../assets/Sidebar/add.svg"
import adoptIcon from "../assets/Sidebar/adoptIcon.svg"
import donationsIcon from "../assets/Sidebar/donationsIcon.svg"
import logo from "../assets/Sidebar/logo-white.svg"
import logoutIcon from "../assets/Sidebar/logoutIcon.svg"
import manageIcon from "../assets/Sidebar/manageData.svg"
import registrationIcon from "../assets/Sidebar/registration-icon.svg"
import vaccineIcon from "../assets/Sidebar/vaccineIcon.svg"

const Sidebar = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin

    const logoutHandler = () => {
        dispatch(logout())
        history.push("/")
    }

    return (
        <div className='sidebar-body'>
            <Link to='/manage' className='sidebar-header'>
                <img src={logo} className='sidebar-logo' />
                <h5 className='sidebar-furryhope'>
                    FURRYHOPE<sup className='sidebar-sup'>ADMIN</sup>
                </h5>
            </Link>
            <div className='sidebar-links'>
                <ul>
                    <li className='sidebar-li'>
                        <Link to='/manage' className='sidebar-a'>
                            <img
                                src={manageIcon}
                                className='sidebar-icons manage-icon'
                            />
                            Manage Animal's Data
                        </Link>
                    </li>
                    <li className='sidebar-li'>
                        <Link to='/add' className='sidebar-a'>
                            <img
                                src={add}
                                className='sidebar-icons add-animal-icon'
                            />
                            Add An Animal
                        </Link>
                    </li>
                    <li className='sidebar-li'>
                        <Link to='/accountsList' className='sidebar-a'>
                            <img
                                src={add}
                                className='sidebar-icons add-admin-icon'
                            />
                            List of Accounts
                        </Link>
                    </li>
                    {/* <li className='sidebar-li'>
                        <Link to='/adoptions' className='sidebar-a'>
                            <img
                                src={adoptIcon}
                                className='sidebar-icons adopt-icon'
                            />
                            Adoption Applications
                        </Link>
                    </li> */}
                    <li className='sidebar-li'>
                        <Link to='/animalRegistration' className='sidebar-a'>
                            <img
                                src={registrationIcon}
                                className='sidebar-icons animalRegistration-icon'
                            />
                            Animal Registrations
                        </Link>
                    </li>
                    <li className='sidebar-li'>
                        <Link to='/reports' className='sidebar-a'>
                            <img
                                src={adoptIcon}
                                className='sidebar-icons adopt-icon'
                            />
                            Stray animal reports
                        </Link>
                    </li>
                    
                    <li className='sidebar-li'>
                        <Link to='/donations' className='sidebar-a'><img src={donationsIcon} className='sidebar-icons donations-icon'/>Donations</Link>
                    </li>
                    
                </ul>
            </div>
            <div className='sidebar-footer'>
                <div className='sidebar-account-details'>
                    <p className='sidebar-admin-username'>
                        {adminInfo.username}
                    </p>
                    <p className='sidebar-admin-name'>{adminInfo.name}</p>
                </div>
                <button className='sidebar-logout-btn' onClick={logoutHandler}>
                    <img src={logoutIcon} className='sidebar-logout-icon' />
                    LOGOUT
                </button>
            </div>
        </div>
    )
}

export default Sidebar
