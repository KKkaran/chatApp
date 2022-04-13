import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { test } from '../../utils/queries'
import Header from '../Header'
import Auth from "../../utils/Auth"
import { Me_Query } from '../../utils/queries'
import { useParams } from 'react-router-dom'
import { ALL_USERS } from '../../utils/queries'

const SearchedUsers = ()=>{

    const {loading,data} = useQuery(ALL_USERS)
    const userList = data?.users || []
    const usersData = userList.map(u=>{
        return {
            username: u.username,
            email:u.email,
            id:u._id
        }
    })
    const [showResults,setResults] = useState([])

    const [searchData, setSearchData] = useState({
        name:""
    })
    useEffect(()=>{
       const newList = usersData.filter(f=>{
           if(searchData.name !== ""){
                if(f.username.includes(searchData.name)){
                    return f
            }
           }
       })
       setResults(newList)
    },[searchData])

    useEffect(()=>{
       //console.log(showResults)

    },[showResults])

    return(
        
        <div className='container border border-dark p-1'>
            
            <div>
                <form action="">
                    <input type="text" value={searchData.data} onChange={(e)=>{
                        setSearchData({...searchData,name:e.target.value})
                    }} placeholder='Search for a Friend...' />
                </form>
            </div>

            <div>
                {
                    showResults ? (
                        showResults.map(s=>{
                            return (
                                <p className='border'>
                                {s.username}
                                </p>
                            )
                        })
                    ):(
                    
                    <p>No result found</p>)
                }
                
            </div>

        </div>
        
    )

}

export default SearchedUsers