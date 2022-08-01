import React from 'react'
import '../../css/ForgotPwdModal.css'
import { IoClose } from 'react-icons/io5'

const ForgotPassword = (props) => {
    return (
        <div className="forgotPwdModal">
            <IoClose className='forgotPwdModal-close' color='#111' />
        </div>
    )
}

export default ForgotPassword