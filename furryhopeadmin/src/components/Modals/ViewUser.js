import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../css/ViewUser.css'

const ViewUser = (props) => {
    const [user, setUser] = useState()
    const [fullName, setFullName] = useState()
    const [email, setEmail] = useState()
    const [contactNo, setContactNo] = useState()
    const [address, setAddress] = useState()
    const [verified, setVerified] = useState()
    const [profilePicture, setProfilePicture] = useState()

    const getUser = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/users/getUserById/${props.id}`)
            setUser(data)
            setFullName(data.fullName)
            setEmail(data.email)
            setContactNo(data.contactNo)
            setAddress(data.address)
            setVerified(data.verified)
            setProfilePicture(data.profilePicture)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    user && console.log(user)

    return (
        <div className='viewUser-modal'>
            <div className="viewUser-left">
                <label htmlFor="name" className="viewUser-label viewUser-name">Name</label>
                <input type="text" name="name" className="viewUser-input" value={fullName} disabled />

                <br />

                <label htmlFor="name" className="viewUser-label">Email</label>
                <input type="text" name="name" className="viewUser-input" value={email} disabled />

                <br />

                <label htmlFor="name" className="viewUser-label">Contact Number</label>
                <input type="text" name="name" className="viewUser-input" value={contactNo} disabled />

                <br />
                
                <label htmlFor="name" className="viewUser-label">Address</label>
                <input type="text" name="name" className="viewUser-input" value={address} disabled />

                <br />

                <label htmlFor="name" className="viewUser-label">Verified</label>
                <input type="text" name="name" className="viewUser-input" value={verified} disabled />
            </div>

            <div className="viewUser-right">
                <label htmlFor="" style={{ marginTop: 10 }} className="viewUser-label">Profile Picture</label>
                <img src={user && user.profilePicture} alt="" className="viewUser-preview" />

                <button className="viewUser-close" onClick={() => props.toggleModal()}>CLOSE</button>
            </div>
        </div>
    )
}

export default ViewUser