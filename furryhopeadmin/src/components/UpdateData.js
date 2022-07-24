import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import AdoptionHistory from './SubComponents/AdoptionHistory'
import UpdateInfoForm from './SubComponents/UpdateInfoForm'
import Sidebar from './Sidebar'
import '../css/UpdateData.css'

const UpdateData = ({ match }) => {
    const [currentTab, setCurrentTab] = useState("update")
    const activeTabIsUpdate = currentTab === "update" 
    
    const switchToAdoptionHistory = () => {
        setCurrentTab('history')
    }

    const switchToUpdateInfo = () => {
        setCurrentTab('update')
    }

    return (
        <div className="body-update">
            <Sidebar />
            <div className='update-content'>
                <Link to='/manage' className="update-back-btn">
                    <IoArrowBack className='update-back-icon' />
                    <p className="update-back-txt">Back</p>
                </Link>
                
                <div className="update-container">
                    <div className="tabPages-container">
                        {activeTabIsUpdate ?
                            <>
                                <button className="update-active-tab update-tab" onClick={() => switchToUpdateInfo()}>Update Info</button>
                                <button className="update-inactive-tab update-tab" onClick={() => switchToAdoptionHistory()}>Adoption History</button>
                            </>
                            :
                            <>
                                <button className="update-inactive-tab update-tab" onClick={() => switchToUpdateInfo()}>Update Info</button>
                                <button className="update-active-tab update-tab" onClick={() => switchToAdoptionHistory()}>Adoption History</button>
                            </>
                        }
                    </div>

                    {activeTabIsUpdate ?
                        <UpdateInfoForm
                            paramId={match.params.id}
                        />
                        :
                        <AdoptionHistory
                            paramId={match.params.id} 
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default UpdateData;
