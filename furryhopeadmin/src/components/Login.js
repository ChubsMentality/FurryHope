import React, { useState, useEffect, useRef } from 'react'
import '../css/Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/adminActions'
import { gsap, Power1, Power3, Power2, Bounce } from 'gsap'

import leftPaw from '../assets/Login/leftPaw.svg'
import rightPaw from '../assets/Login/rightPaw.svg'
import logoBlack from '../assets/Login/logo-black.svg'
import loginVector from '../assets/Login/login-vector.svg'
import loginBtnVector from '../assets/Login/login-btn-vector.svg'

const Login = ({history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    console.log(window.screen.availWidth)

    // To call adminActions
    const dispatch = useDispatch();

    // To access the state
    const adminLogin = useSelector((state) => state.adminLogin);
    const { loading, error, adminInfo } = adminLogin;

    // When the user attempts to login, it will call the login function in adminActions.js that will authenticate the admin,
    // and if it's successfull it will store the admin credentials to the local storage
    const submitHandler = (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert('Enter your login credentials')
        }
        // To login the admin, uses the login function in adminActions.js
        dispatch(login(email, password));

        if(error) {
            console.log(error);
            alert(error);
        }
    }

    useEffect(() => {
        // if there's data inside the local storage push to the dashboard
        if(adminInfo) {
            history.push('/manage')
        } 
    }, [history, adminInfo]);

    // Animations
    const formRef = useRef()
    const headerRef = useRef()
    const subHeaderRef = useRef()
    const adoptImg = useRef()

    useEffect(() => {
        gsap.from(formRef.current, { opacity: 0, x: -60, delay: .75, ease: Power3.in })

        gsap.from(headerRef.current, { opacity: 0, y: -60, delay: 1.25, ease: Power1.out })
        
        gsap.from(subHeaderRef.current, { opacity: 0, y: -60, delay: 1.25, ease: Power1.out })

        gsap.from(adoptImg.current, { opacity: 0, y: 60, delay: 1.25, ease: Power2.in })
    }, [])

    return (
        <div className='login-body'>
            <div className='login-left-column'>
                <form className='login-form' onSubmit={submitHandler} ref={formRef}>
                    <div className='login-header'>
                        <img src={logoBlack} className='login-header-img' />
                        <p className='login-header-text'>ADMIN LOGIN</p>
                    </div>
                    <label htmlFor='username' className='login-label username'>Email</label><br /> 
                    <input type='text' name='username' className='username-input login-input' value={email} onChange={(e) => setEmail(e.target.value)} /><br />

                    <label htmlFor='password' className='login-label password'>Password</label><br /> 
                    <input type='password' name='password' className='password-input login-input' value={password} onChange={(e) => setPassword(e.target.value)} /><br />

                    <center>
                        <button className='btn-login'>
                            <img src={loginBtnVector} className='btn-login-icon' />
                            LOGIN
                        </button>
                    </center>
                </form>
            </div>

            <div className='login-right-column'>
                <h1 className='right-column-header' ref={headerRef}>FURRYHOPE
                    <sup className='right-column-sup'>ADMIN</sup>
                </h1>
                <p className='right-column-subHeader' ref={subHeaderRef}>MARIKINA CITY VETERINARY OFFICE</p>

                <img src={loginVector} className='right-column-vector' ref={adoptImg} />
            </div>

            <img src={leftPaw} className='leftpaw' />
            <img src={rightPaw} className='rightpaw' />
        </div>
    )
}

export default Login;

/*
*/