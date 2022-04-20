import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/AddAdmin.css'
import { useDispatch, useSelector } from 'react-redux'
import { addAnAdmin } from '../actions/adminActions'
import { css } from '@emotion/css'
import ClipLoader from 'react-spinners/ClipLoader'
import Sidebar from './Sidebar'

const override = css`
    display: block;
    border-color: white;
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
`

const AddAdmin = () => {

    // loading state
    const [color] = useState('#111111')

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('');

    const dispatch = useDispatch();
    const addAdmin = useSelector(state => state.addAdmin) 
    const { loading, error } = addAdmin

    const submitAdmin = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert('Passwords does not match!')
        }
        else {
            dispatch(addAnAdmin(username, password, name))
            alert('Successfully created an admin account.')
            setUsername('')
            setPassword('')
            setConfirmPassword('')
            setName('')
        }
    }

    if(error) {
        window.alert(error)
    }

    return ( 
        <div className="body">
            <Sidebar />
            <div className='content'>
                <p className='add-admin-header'>ADD AN ADMIN ACCOUNT</p>
                <Link to={'/accountsList'}>
                    <button className='addAdmin-back-link'>back to accounts</button>
                </Link>
                
                <form className="addAdmin-form-container" onSubmit={submitAdmin}>   

                    <label htmlFor="name" className="lbl-name lbl-add">Full Name</label><br />
                    <input type="text" name="name" className="addAdminName input-add-admin" required value={name} onChange={(e) => setName(e.target.value)}/><br />

                    <br />

                    <label htmlFor="username" className="lbl-username lbl-add">Username</label><br />
                    <input type="text" name="username" className="addUsername input-add-admin" required value={username} onChange={(e) => setUsername(e.target.value)} /><br />

                    <br />

                    <label htmlFor="password" className="lbl-breed lbl-add">Password</label><br />
                    <input type="password" name="password" className="addPassword input-add-admin" required value={password} onChange={(e) => setPassword(e.target.value)}/><br />

                    <br />
                    
                    <label htmlFor="confirmpassword" className="lbl-breed lbl-add">Confirm Password</label><br />
                    <input type="password" name="confirmpassword" className="addPassword input-add-admin" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br />

                    <br />

                    <button className="btn-submit-admin">{loading ? <ClipLoader color={color} css={override} loading={loading} size={35} /> : <p className='submit-admin-text'>SUBMIT</p>}</button>
                </form>
            </div>
        </div>
    )
}

export default AddAdmin;
