import React from 'react'
import Navbar from './Components/Navbar'
import LandingPage from './Components/LandintPage'
import Footer from './Components/Footer'
const page = () => {
  return (
    <div className=''>
      {/* <div className='justify-center text-4xl items-center mt-50 flex'>Hi my name is NextJS</div> */}
      
      {/* <Navbar/> */}
      <LandingPage/>
      <Footer/>
    </div>
  )
}

export default page
