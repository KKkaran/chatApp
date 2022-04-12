import { useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { test } from '../../utils/queries'
import Header from '../Header'
import Auth from "../../utils/Auth"
import { Me_Query } from '../../utils/queries'
import { useParams } from 'react-router-dom'

const Main = ()=>{

    // const {loading, data:data2} = useQuery(Me_Query)
    // const data = data2?.me || ""

    // console.log(data.password)
    
    return(
        
        <>
        
        <Header></Header>
        <div className='container'>
        
            
            {
                
                Auth.loggedIn() ? (
                    <div>
                        <h2>This is the MAIN PAGE</h2>      
                        <h3>Welcome {Auth.getProfile().data.username}</h3>
                        
                    </div>
                    
                ):(
                    <>
                        <>Need to log in bro</>
                    </>
                )
            }
        </div>
        
        </>
        
    )

}

export default Main