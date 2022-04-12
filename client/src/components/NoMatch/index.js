import { useQuery } from '@apollo/client'
import React from 'react'
import { useState } from 'react'
import { test } from '../../utils/queries'
import Header from '../Header'

const Main = ()=>{

    return(
        
        <div className='container'>
            <Header></Header>
            <div className='container p-4'>
            <h2>Oops!! we couldnt find that page.</h2>
            </div>
        </div>
    )

}

export default Main