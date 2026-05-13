import React from 'react'
import Header from '../Common/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Common/Fotter'

const Layout=()=> {
  return (
    <div>
        <Header/>
         <main>
            <Outlet/>
        </main>
        <Footer/>

    </div>
  )
}

export default Layout