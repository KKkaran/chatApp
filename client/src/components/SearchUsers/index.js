import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { test } from '../../utils/queries'
import Header from '../Header'
import Auth from "../../utils/Auth"
import { Me_Query,User_Query,CREATE_CHANNEL } from '../../utils/queries'
import { useParams } from 'react-router-dom'
import { ALL_USERS } from '../../utils/queries'
import { Link } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'

const SearchedUsers = ({meChannels})=>{

    const [createChannel,{error:errorCreatingChannel}] = useMutation(CREATE_CHANNEL)
    const [getUserData,{loading:loadingUserData,error,data:userData}] = useLazyQuery(User_Query)
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

    //this method will see if there is already a common channel or not
    const showCommonChannel = async(id)=>{
        const {loading:l,data:d} = await getUserData({ variables: { _id: id } })
        if(d){
            const searchedUserChannels = d.find_user.channelModel.map(p=>p._id)
            
           const loggedUserChannels =  meChannels.map(t=>t._id)
           
           const compare = ()=>{
                //   loggedUserChannels.map(luc=>{
                //       searchedUserChannels.map(suc=>{
                //          if(luc === suc)
                //             console.log(luc)
                //              return luc
                //     })
                // })
                // return 0

                for (let i = 0; i < loggedUserChannels.length; i++) {
                    for (let j = 0; j < searchedUserChannels.length; j++) {
                        if(loggedUserChannels[i] === searchedUserChannels[j]){
                            return loggedUserChannels[i]
                        }
                      }
                  }
                  return 0
           }
           const val = compare()
           if(val !== 0){
               console.log("channel exists")
               window.location.assign(`/channel/${val}`);

           }else{
               console.log("channel created")
               //create a new channel
               console.log(d.find_user._id)
               console.log(Auth.getProfile().data._id)

               try {
                const { data:data3 } = await createChannel({
                  variables: { "users": [
                    {"_id":d.find_user._id},
                    {"_id":Auth.getProfile().data._id}
                  ] }
                });
                console.log(data3.createChannel._id);
                window.location.assign(`/channel/${data3.createChannel._id}`);

              } catch (e) {
                console.error(e);
              } 
           }
        }
        
    }

    return(
        
        <div className='container border border-dark p-1'>
            
            <div className='text-center'>
                <form action="">
                    <input type="text" value={searchData.data} onChange={(e)=>{
                        setSearchData({...searchData,name:e.target.value})
                    }} placeholder='Search for a Friend...' />
                </form>
            </div>

            <div className='text-center'>
                {
                    showResults ? (
                        showResults.map(s=>{
                            return (
                                /*<p className='border'>
                                { <Link key={s._id} to={`/channel/12345`}>{s.username}</Link>
                                </p> */
                                <a onClick={()=>{
                                    showCommonChannel(s.id)
                                } }>
                                    <p key={s.id}>{s.username}</p>
                                </a>
                            )
                        })
                    ):(
                    
                    <p>No result found</p>)
                }
                
            </div>

        </div>
        
    )

}

//window.location.assign('/channel/channelId');

export default SearchedUsers