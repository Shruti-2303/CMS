import React from 'react'
import Base from '../components/Base'
import cafeImg from "../assets/undraw_coffee_re_x35h.svg"
const Home = () => {
  return (
   
        <Base>
            <div style={{display: "flex", justifyContent:"space-around", alignItems:"center", height:"80vh"}}>
                <div><h1>Cafe Coffee Day</h1></div>
                <div><img src={cafeImg} alt="" /> </div>
            </div>
        </Base>

  )
}

export default Home