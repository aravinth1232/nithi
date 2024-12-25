import React from 'react'
import Sidebar from './Sidebar'

const DashboardLayout = ({children}) => {
  return (
    <>
    <div className='flex flex-row'>
    <Sidebar />
    <main>{children}</main>
    </div>
    </>
  )
}

export default DashboardLayout
