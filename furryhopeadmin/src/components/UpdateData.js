import React, { useState } from 'react'
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
                {/* <p className='update-data-header'>UPDATING DATA</p>
                <p className='update-data-sub'>{name}'s data</p> */}
                
                <div className="tabPages-container">
                    {activeTabIsUpdate ?
                        <>
                            <button className="active-tab update-tab" onClick={() => switchToUpdateInfo()}>Update Info</button>
                            <button className="inactive-tab" onClick={() => switchToAdoptionHistory()}>Adoption History</button>
                        </>
                        :
                        <>
                            <button className="inactive-tab update-tab" onClick={() => switchToUpdateInfo()}>Update Info</button>
                            <button className="active-tab" onClick={() => switchToAdoptionHistory()}>Adoption History</button>
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
    )
}

export default UpdateData;
