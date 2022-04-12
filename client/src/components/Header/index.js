import { useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { test } from '../../utils/queries'
import { Link } from 'react-router-dom'
import Auth from '../../utils/Auth'
const Header = ()=>{

    const logout = (e)=>{
        e.preventDefault()
        Auth.logout()
    }

    return(
        
        <header className="align-center">
            <div className="container d-flex justify-content-between">
                <Link to="/" className='p-2' style={{ textDecoration: 'none' }}>
                    <h1>Let's Chats</h1>
                </Link>

                
                {
                    Auth.loggedIn()? (<div className='d-flex'>
                    <Link to="/profile" className='p-4' style={{ textDecoration: 'none' }}><h4>Dashboard</h4></Link>
                    <a href="/" onClick={logout} className='p-4' style={{ textDecoration: 'none' }}>
                        <h4>Logout</h4>
                    </a>
                </div>) : (
                        <div className='d-flex'>
                    <Link to="/login" className='p-4' style={{ textDecoration: 'none' }}><h4>Login</h4></Link>
                    <Link to="/signup" className='p-4' style={{ textDecoration: 'none' }}><h4>Signup</h4></Link>
                </div>
                    )
                }
                
            </div>
        </header>
    )

}

export default Header