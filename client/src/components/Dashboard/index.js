import { useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { test } from '../../utils/queries'
import Header from '../Header'
import Auth from "../../utils/Auth"
import { Me_Query, User_Query } from '../../utils/queries'
import { useParams  } from 'react-router-dom'
const Dashboard = ()=>{

    const userParam = useParams() //get the params
    const { loading, data } = useQuery(userParam.username ? User_Query : Me_Query, {
        variables: { username: userParam.username }
      });
    const user = data?.me || data?.find_user || {};
    return(
        
        <>
        
        <Header></Header>
        <div className='container'>
        
        {
            Auth.loggedIn() ? (
                
                user ? (
                    <>
                        {user.email} <br />
                        {user.username}
                    </>
                ):(
                    <>
                        Loading...
                    </>
                )



            ):(
                <>
                    You need to log in first
                </>
            )
        }            
        </div>
        
        </>
        
    )

}

export default Dashboard