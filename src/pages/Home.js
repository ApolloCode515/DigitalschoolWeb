import React from 'react'
import Sidebar from '../components/Sidebar'
import welImage from '../assets/images/welcome.jpg'

function Home() {
  return (
    <div>
    <Sidebar/>
    <div className='main-content-of-page'>
    <img src={welImage} width={"100%"} height={"100%"} alt="" srcset="" />
    </div>
     
    </div>
  )
}

export default Home