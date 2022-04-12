import { useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../utils/queries'
import Auth from "../../utils/Auth"


const Login = ()=>{

    const [data, setData] = useState({
        email:"",
        password:""
    })

    const [loginUser, { error }] = useMutation(LOGIN_USER);
    
    async function login(e){
        e.preventDefault()
        try {
            const { data: data2 } = await loginUser({
              variables: { ...data }
            });
        
            console.log(data2);
            Auth.login(data2.login.token);

          } catch (e) {
            console.error(e);
          }
        
    }
    
    

    return(
        
        <div className='container border border-dark'>
            <h1>Login</h1>
            <form className='border border-dark p-2' onSubmit={login} >
                <input type="text" required placeholder='email' value={data.email} onChange={ (e)=>setData({...data,email:e.target.value})} /><br />
                <input type="password" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} required placeholder='password'/><br />
                <input type="submit"/>

                {error && <div>Login failed</div>}

            </form>
        </div>
    )

}

export default Login