import React from 'react'
import Base from '../components/Base'
import SideBar from '../components/sidebar/SideBar'

const ManageCategory = () => {
  return (
    <Base>
        <div style={{display:'flex'}}>
            <div style={{flex:1}}><SideBar/></div>
            
            <div style={{flex:4}}>Manage Category</div>
        </div>
        {/* <SideBar/>
        <h1>Manage Category</h1> */}
    </Base>
  )
}

export default ManageCategory