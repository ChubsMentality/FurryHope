import React from 'react'
import '../../css/ForgotPwdModal.css'
import { IoClose } from 'react-icons/io5'

const ForgotPassword = (props) => {
    return (
        <div className="forgotPwdModal">
            <IoClose className='forgotPwdModal-close' color='#111' onClick={() => props.toggleModal()} />

            <div className="forgotPwdContainer">
                <p className="forgotPwdHeader">Forgot Your Password?</p>
                <p className="forgotPwdSubHeader">Don't Worry, Just enter your email.</p>

                <label htmlFor="email" className="forgotPwdLabel">Email</label>
                <input type="email" name="email" className='forgotPwdInput' placeholder='Enter your email' />

                <button className="forgotPwdSubmitBtn">Reset Password</button>
            </div>
        </div>
    )
}

export default ForgotPassword