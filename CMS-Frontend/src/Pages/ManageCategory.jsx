import Base from '../components/Base'
import SideBar from '../components/sidebar/SideBar'

const ManageCategory = () => {
  return (
    <Base>
        <div style={{display:'flex'}}>
            <div style={{flex:1}}><SideBar/></div>
            
            <div style={{flex:4}}>Manage Category</div>
        </div>
    </Base>
  )
}

export default ManageCategory