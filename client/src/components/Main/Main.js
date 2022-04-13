import { useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { test } from '../../utils/queries'
import Header from '../Header'
import SearchedUsers from '../SearchUsers'
import Auth from "../../utils/Auth"
import { Me_Query } from '../../utils/queries'
import { useParams } from 'react-router-dom'

const Main = ()=>{

    // const {loading, data:data2} = useQuery(Me_Query)
    // const data = data2?.me || ""

    // console.log(data.password)
    
    return(
        
        <>
        
        <Header/>
        <SearchedUsers/>
        <div className='container'>
        
            
            {
                
                Auth.loggedIn() ? (
                    <div>
                            
                        <h3>Welcome {Auth.getProfile().data.username}</h3>
                        <h4>Recent Chats:</h4>  
                        {
                        //dynamically grab the chats of the logged in user
                        }
                        <div className='border border-dark p-2'>
                            <p className='border border-dark'>Tim</p>
                            <p className='border border-dark'>Harry</p>
                        </div>
                        
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