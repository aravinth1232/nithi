import React from 'react'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    
    <>
    <div className=' bg-gradient'>
    <Navbar />
    <main>{children}</main>
    </div>
    </>

  )
}

export default Layout
