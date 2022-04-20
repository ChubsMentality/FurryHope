import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../css/AdoptionHistory.css'

const AdoptionHistory = (props) => {
    const [data, setData] = useState()

    const getAdoptions = async () => {
        try {
            const { data:response } = await axios.get(`http://localhost:5000/api/admins/adoptionsPerAnimal/${props.paramId}`)
            console.log(response)
            setData(response)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteAdoptionById = async (id) => {
        try {
            if(window.confirm('Are you sure you want to delete?')) {
                const { data } = await axios.delete(`http://localhost:5000/api/admins/adoptions/${id}`)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAdoptions()
    }, [])

    console.log(props.paramId)
    return (
        <table className='adoptions-table'>
            <thead className='adoptions-table-head'>
                <tr className='adoptions-table-row'>
                    <th className='adoptions-row-head'>Name</th>
                    <th className='adoptions-row-head'>Address</th>
                    <th className='adoptions-row-head'>Contact No.</th>
                    <th className='adoptions-row-head'>Status</th>
                    <th className='adoptions-row-head'></th>
                </tr>
            </thead>
            <tbody className='adoptions-table-body'>
                {data && data.map((item) => (
                    <tr key={item._id} className='adoptions-table-body-row'>
                        <td className='adoptions-row-body adoptions-row-center'>{item.adopterName}</td>
                        <td className='adoptions-row-body'>{item.address}</td>
                        <td className='adoptions-row-body adoptions-row-center'>{item.contactNo}</td>
                        <td className='adoptions-row-body adoptions-row-center'>{item.applicationStatus}</td>
                        <td className='adoptions-row-body adoptions-row-body-actions'>
                            <Link to={`/adoption/${item._id}`} style={{textDecoration: 'none'}}>
                                <button className='adoptions-body-view-btn'>VIEW</button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default AdoptionHistory