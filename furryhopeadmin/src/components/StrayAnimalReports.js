import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStrayAnimalReports, dismissReport } from '../actions/adminActions'
import axios from 'axios'
import Loading from './SubComponents/Loading'
import Overlay from './SubComponents/Overlay'
import Sidebar from './Sidebar'
import '../css/StrayAnimalReports.css'

const StrayAnimalReports = () => {
    const [reports, setReports] = useState()
    const [specificReport, setSpecificReport] = useState()
    const [pendingReports, setPendingReports] = useState()

    const adminState = useSelector((state) => state.adminLogin)
    const { adminInfo } = adminState

    const dispatch = useDispatch()
    const reportList = useSelector(state => state.strayReports)
    const { loading, error, strayReportList } = reportList

    const dismissState = useSelector(state => state.dismissReport)
    const { success:successDelete } = dismissState
    
    const filterPending = (arr) => {
        return arr.status === "Pending"
    }

    const getReports = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/admins/getReports')
            setReports(data)
            setPendingReports(data.filter(filterPending))
        } catch (error) {
            console.log(error)
        }
    }

    const displaySpecificReport = async (id) => { 
        try {
            const { data } = await axios.get(`http://localhost:5000/api/admins/getReports/${id}`)
            setSpecificReport(data)
            console.log(pendingReports)
        } catch (error) {
            console.log(error) 
        }
    }

    const dismissReportHandler = async (id) => {
        try {
            if(window.confirm('Are you sure you want to dismiss this report?')) {
                dispatch(dismissReport(id))
                alert('Report has been dismissed.')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getReports()
    }, [dispatch, successDelete])

    pendingReports && console.table(pendingReports)

    return (
        <div className='strayAnimalReport-body'>
            <Sidebar />
            {loading && <Loading />}
            {loading && <Overlay />}

            <div className="strayAnimalReport-content">
                <div className="accounts-header-container">
                    <p className='accounts-header'>LIST OF REPORTS</p>

                    <div className="accounts-adminInfo">
                        <div className="accounts-adminInfo-left">
                            <h3 className="accounts-adminName accounts-adminInfo-label">{adminInfo.fullName}</h3>
                            <p className="accounts-adminPos accounts-adminInfo-label">{adminInfo.jobPosition}</p>
                        </div>

                        <img src={adminInfo.profilePicture} alt="admin's profile picture" className="accounts-adminProfile" />
                    </div>                    
                </div>

                <div className="listOfReports-container">
                    <div className="strayReport">1</div>
                    <div className="strayReport">2</div>
                    <div className="strayReport">3</div>
                    <div className="strayReport">4</div>
                    <div className="strayReport">5</div>
                    <div className="strayReport">6</div>
                    <div className="strayReport">7</div>
                    <div className="strayReport">8</div>
                    <div className="strayReport">9</div>
                    {/* <div className="strayReport">10</div> */}
                </div>
            </div>
        </div>
    )
}

{/* <div className="listOfReports-container">
    {pendingReports && pendingReports.map((report) => (
        <div className="reportContainer" key={report._id} onClick={() => displaySpecificReport(report._id)}>
            <p className='reportContainer-date'>Date: <span>{report.createdAt.slice(0, 10)}</span></p>
            <p className="reportContainer-message">{report.description}</p>
        </div>
    ))}
</div>

<div className="reportContent">
    {specificReport ?
        <div className='specificReportContainer'>
            <p className='specificReport-header'>Description</p>
            <p className='specificReport-description'>{specificReport.description}</p>

            <p className='specificReport-image-header'>Stray Animal Image</p>
            <img className='specificReport-image' src={specificReport.image } />

            <button className='dismiss-report-btn' onClick={() => dismissReportHandler(specificReport._id)}>DISMISS</button>
        </div>
        :
        <div className="no-report-container">
            <p className='no-report-text'>Click one of the reports to<br />see its details</p>
        </div>
    }
</div> */}
export default StrayAnimalReports