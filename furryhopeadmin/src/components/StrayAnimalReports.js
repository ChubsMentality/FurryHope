import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStrayAnimalReports, dismissReport, getDismissedReports, deleteReport, viewedReport } from '../actions/adminActions'
import { IoClose } from 'react-icons/io5'
import { FaCheck } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import Loading from './SubComponents/Loading'
import Overlay from './SubComponents/Overlay'
import Sidebar from './Sidebar'
import '../css/StrayAnimalReports.css'

const StrayAnimalReports = () => {
    const URL = 'https://furryhopebackend.herokuapp.com/'
    const [specificReport, setSpecificReport] = useState()
    const [modal, setModal] = useState(false)
    const [active, setActive] = useState('Not Dismissed')
    const [dismissed, setDismissed] = useState()
    const [activeArr, setActiveArr] = useState()

    const adminState = useSelector((state) => state.adminLogin)
    const { adminInfo } = adminState

    const dispatch = useDispatch()
    const reportList = useSelector(state => state.strayReports)
    const { loading, error, pendingReports } = reportList

    const dismissedState = useSelector(state => state.dismissedReportState)
    const { dismissedReports } = dismissedState

    dismissedReports && console.log(dismissedReports)

    const dismissState = useSelector(state => state.dismissReport)
    const { success:successDismiss } = dismissState

    const deleteState = useSelector(state => state.deleteReportState)
    const { success:successDelete } = deleteState

    const reportReadState = useSelector(state => state.reportViewedState)
    const { success:successViewed } = reportReadState
   
    const displaySpecificReport = async (id) => { 
        try {
            const { data } = await axios.get(`${URL}api/admins/getReports/${id}`)
            setSpecificReport(data)
            setModal(true)
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

    const deleteReportHandler = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteReport(id))
        }
    }

    const DataContainer = ({ currentReports }) => {
        return (
            <>
                {currentReports && currentReports.map((report) => (
                    <div className="report-container" key={report._id}>
                        <p className="report-id">Report <span>({report._id})</span></p> 
                        <p className="report-description">{report.description}</p>

                        <div className="report-subContainer">
                            <p className="report-dateSubmitted">Date: <span>{report.date}</span></p>

                            <div className="report-statusContainer">
                                {report.viewed === true ?
                                    <p className="report-viewed">Viewed</p>
                                    :
                                    <></>
                                }

                                {report.status === 'Dismissed' ?
                                    <p className="report-dismissed">Dismissed</p>
                                    :
                                    <></>
                                }
                            </div>
                        </div>

                        <div className="report-actions">
                            <button className='report-viewBtn' onClick={() => displaySpecificReport(report._id)}>VIEW</button>

                            <button className='report-deleteBtn' onClick={() => deleteReportHandler(report._id)}>DELETE</button>
                        </div>
                    </div>
                ))}
            </>
        )
    }

    const PaginatedData = ({ reportsPerPage }) => {
        // We start with an empty list of items.
        const [currentReports, setCurrentReports] = useState(null)
        const [pageCount, setPageCount] = useState(0)

        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0)

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + reportsPerPage
            // console.log(`Loading items from ${itemOffset} to ${endOffset}`)
        
            activeArr && setCurrentReports(activeArr.slice(itemOffset, endOffset))
            activeArr && setPageCount(Math.ceil(activeArr.length / reportsPerPage))
        }, [itemOffset, reportsPerPage])

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * reportsPerPage) % activeArr.length;
            // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
            setItemOffset(newOffset);
        }

        return (
            <>
                <DataContainer currentReports={currentReports} />
                <ReactPaginate
                    activeClassName='active-li-feedback'
                    activeLinkClassName='active-a-feedback'
                    className='pagination-container-feedback'
                    pageClassName='pagination-page-li-feedback'
                    pageLinkClassName='pagination-link-a-feedback'
                    nextClassName='next-li-feedback'
                    nextLinkClassName='next-a-feedback'
                    previousClassName='prev-li-feedback'
                    previousLinkClassName='prev-a-feedback'
                    breakClassName='page-break-li-feedback'
                    breakLinkClassName='page-break-a-feedback'
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

    const getDismissed = async () => {
        try {
            const { data } = await axios.get(`${URL}api/admins/dismissedReports`)
            console.log(data)
            setDismissed(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch(getStrayAnimalReports())
        getDismissed()
    }, [dispatch, successDelete, successDismiss, successViewed])

    useEffect(() => {
        if(active === 'Not Dismissed') {
            setActiveArr(pendingReports)
            console.log(active)
        } else if(active === 'Dismissed') {
            // setActiveArr(dismissedReports)
            // console.log(dismissedReports)
           setActiveArr(dismissed)
            console.log(active)
        }
    }, [active, successDelete, successDismiss, successViewed])


    return (
        <div className='strayAnimalReport-body'>
            <Sidebar />
            {loading && <Loading />}
            {loading && <Overlay />}

            <div className="strayAnimalReport-content">
                <div className="reports-header-container">
                    <p className='accounts-header'>LIST OF REPORTS</p>

                    <div className="accounts-adminInfo">
                        <div className="accounts-adminInfo-left">
                            <h3 className="accounts-adminName accounts-adminInfo-label">{adminInfo.fullName}</h3>
                            <p className="accounts-adminPos accounts-adminInfo-label">{adminInfo.jobPosition}</p>
                        </div>

                        <img src={adminInfo.profilePicture} alt="admin's profile picture" className="accounts-adminProfile" />
                    </div>                    
                </div>

                <label htmlFor="switch" className="reportsSwitchLabel">Status</label>
                <select name="switch" className="reportsSwitch" value={active} onChange={(e) => setActive(e.target.value)}>
                    <option value="Not Dismissed">Not Dismissed</option>
                    <option value="Dismissed">Dismissed</option>
                </select>

                <div className="listOfReports-container">
                    <PaginatedData reportsPerPage={5} />
                </div>
            </div>

            {modal &&
                <div className="strayAnimalModal">
                    <IoClose className='closeStrayAnimalModal' onClick={() => setModal(false)}/>
                    <div className="strayModal-heading-container">
                        <div className="strayModal-heading-left">
                            <p className="strayModal-heading">Report</p>
                            <p className="strayModal-reportId">ID: {specificReport && specificReport._id}</p>
                        </div>

                        {specificReport.status === 'Dismissed' ?
                            <p className="strayModal-status">Dismissed</p>
                            :
                            <></>
                        }
                    </div>

                    <p className="strayModal-dateSubmitted">Date Submitted: <span>{specificReport.date}</span></p>

                    <p className="strayModal-label">Where the animal was seen</p>
                    <p className="strayModal-location">{specificReport.location}</p>

                    <p className="strayModal-label strayModal-descLabel">Description</p>
                    <div className="strayModal-desc-container">
                        <p className="strayModal-desc">{specificReport.description}</p>
                    </div>

                    <div className="strayModalBottom">
                        <div className="strayModalViewed-container">
                            {specificReport && specificReport.viewed === true ?
                                <>
                                    <div className="strayModal-checked">
                                        <FaCheck className='strayModalViewedChecked' color='#fff' />
                                    </div>
                                    <p className="strayModal-viewedLabel-checked">Viewed</p>
                                </>
                                :
                                <>
                                    <input type="checkbox" className='strayModal-checkbox' value={specificReport.viewed} onClick={() => dispatch(viewedReport(specificReport._id))}/>
                                    <p className="strayModal-viewedLabel">Viewed</p>
                                </>
                            }

                        </div>

                        {specificReport && specificReport.status === 'Dismissed' ?
                            <button className="strayModal-dismissBtn" disabled>DISMISS</button>
                            :
                            <button className="strayModal-dismissBtn" onClick={() => dismissReportHandler(specificReport._id)}>DISMISS</button>
                        }
                    </div>
                </div>
            }

            {modal && <Overlay />}

        </div>
    )
}

export default StrayAnimalReports