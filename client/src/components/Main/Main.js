import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { test } from '../../utils/queries'
import Header from '../Header'
import SearchedUsers from '../SearchUsers'
import Auth from "../../utils/Auth"
import { Me_Query } from '../../utils/queries'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Main = ()=>{
    
     const {loading, data:data2} = useQuery(Me_Query)
     const data = data2?.me || ""
     let channels;
     if(data){
         channels = data.channelModel.map(c=>{
            return{
                id:c._id,
                friend: c.users.filter(h=>{
                    if(h.username === Auth.getProfile().data.username){
                        return false
                    }
                    return h.username
                }),
                msgs: c.messages
            }
         })

     }

    
    return(
        
        <>
        <Header/>
        <div className='container'>
        
            
            {
                
                Auth.loggedIn() ? (
                    
                    <div>
                        <SearchedUsers meChannels={data.channelModel}></SearchedUsers>
                        <h3>Welcome {Auth.getProfile().data.username}</h3>
                        <h4>Recent Chats:</h4>  
                        {
                        //dynamically grab the chats of the logged in user
                        }
                        <div className='border border-dark p-2'>
                           {
                               channels?(
                                   <>
                                   {
                                       channels.map(c=> {
                                           
                                           return <p>

                                               {c.msgs.length !== 0 ? (
                                                   <p>
                                                       <Link to={`/channel/${c.id}`} >{c.friend.map(v=>v.username)}</Link>
                                                   </p>
                                               ):("")}
                                               
                                               </p>
                                       })
                                    }
                                   </>
                               ):(<>
                                No chats
                               </>)
                           }
                        </div>
                        
                        <h2>
                           
                        </h2>
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