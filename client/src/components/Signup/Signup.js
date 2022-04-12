import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../../utils/queries'
import Auth from "../../utils/Auth"

const Signup = ()=>{

    const [addUser, { error }] = useMutation(ADD_USER);


    const [data, setData] = useState({
        username:"",
        email:"",
        password:""
    })
    
    async function signup(e){
        e.preventDefault()
        //console.log(data)
        try {
            const { data:data3 } = await addUser({
              variables: { ...data }
            });
            console.log(data3);

            Auth.login(data3.addUser.token)

          } catch (e) {
            console.error(e);
          }
    }
    
    return(
        
        <div className='container border border-dark'>
            <h1>Signup</h1>
            <form className='border border-dark p-2' onSubmit={signup} >
                <input type="text" required placeholder='username' value={data.username} onChange={ (e)=>setData({...data,username:e.target.value})} /><br />
                <input type="text" required placeholder='email' value={data.email} onChange={ (e)=>setData({...data,email:e.target.value})} /><br />
                <input type="password" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} required placeholder='password'/><br />
                <input type="submit"/>

                {error && <div>Sign up failed</div>}

            </form>
        </div>
    )

}

export default Signup