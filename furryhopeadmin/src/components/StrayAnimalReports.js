import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStrayAnimalReports, dismissReport } from '../actions/adminActions'
import axios from 'axios'
import Sidebar from './Sidebar'
import '../css/StrayAnimalReports.css'

const StrayAnimalReports = () => {
    const [reports, setReports] = useState()
    const [specificReport, setSpecificReport] = useState()
    const [pendingReports, setPendingReports] = useState()

    const dispatch = useDispatch()
    const reportList = useSelector(state => state.strayReports)
    const { loading, error, strayReportList } = reportList

    

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

    const dismissReport = async (id) => {
        try {
            if(window.confirm('Are you sure you want to dismiss this report?')) {
                const status = 'Dismissed'
                const { data } = await axios.put(`http://localhost:5000/api/admins/dismissReport/${id}`, { status })
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getReports()
    }, [])

    return (
        <div className='strayAnimalReport-body'>
            <Sidebar />

            <div className="strayAnimalReport-content">
                <div className="listOfReports-container">
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

                            <button className='dismiss-report-btn' onClick={() => dismissReport(specificReport._id)}>DISMISS</button>
                        </div>
                        :
                        <div className="no-report-container">
                            <p className='no-report-text'>Click one of the reports to<br />see its details</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default StrayAnimalReports