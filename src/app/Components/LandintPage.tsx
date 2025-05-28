"use client"
import React from 'react'
import Image from 'next/image'
const LandingPage = () => {

    const riderSaftey = ()=>{
        location.href='#saftey'
    }

    const ride =()=>{
        location.href='#ride'
    }

    const vehicleCon =()=>{
        location.href= '#vehicle-con'
    }

    const behavior =()=>{
        location.href = '#behavior'
    }

    const honk = ()=>{
        location.href = '#honk'
    }

  return (
  <div className='bg-gray-200 overflow-hidden flex flex-col space-y-10 '>
    <div className="relative">
        <div className="relative px-10 py-50 bg-amber-300">
            <div className="absolute text-5xl top-10 left-20">Thoda Aaram Se Chalaiye</div>
        
            <div className="absolute top-[100px] left-[70px]">
            <p className="whitespace-pre-line w-142 p-4 text-justify">
                TASC (Thoda Aaram Se Chalaiye) is a web application dedicated to prioritizing passenger safety, comfort, and choice in ride services. The application empowers passengers to provide comprehensive feedback on their ride experiences, which directly impacts driver ratings. This passenger-centric approach aims to improve overall ride quality and safety standards across the transportation ecosystem.
            </p>
            </div>
            <div >

            <Image onClick={vehicleCon} className='cursor-pointer absolute right-50 top-20' src="/car.png" alt="new" height={60} width={60} />
            <Image onClick={behavior} className='cursor-pointer absolute right-50 top-45' src="/decision.png" alt="new" height={50} width={50} />
            <Image onClick={ride} className='cursor-pointer absolute right-90 top-21' src="/drive.png" alt="new" height={45} width={45} />
            <Image onClick={honk} className='cursor-pointer absolute right-88.5 top-45' src="/honk.png" alt="new" height={55} width={55} />
            </div>
            <div className="absolute top-[300px] left-20">
            <button onClick={riderSaftey} className="cursor-pointer justify-center text-2xl px-4 py-2 rounded-4xl bg-black text-white">
                Guidelines 
            </button>
            </div>
        </div>
        
    </div>


{/* guideline section */}
    
<div id='saftey' className="flex items-center justify-center w-full h-screen mb-10  ">
  <div className="bg-white p-4 mx-auto w-[1400px] h-auto rounded-lg mt-auto top-0">

    {/* rider saftey */}

    <div className='flex font-bold flex-col gap-6 px-15'>
        <p className='text-4xl'>The Rider's Guide to Safe Transportation</p>
        <p className='text-3xl'>Passenger should avoid following things in driver</p>
    </div>

    <div className='flex flex-col gap-6 px-15 mt-5 text-2xl'>
        <p>Shouting</p>
        <p>Use of drugs</p>
        <p>Untidy clothes</p>
        <p>Rash driving</p>
        <p>Unnecessary honking</p>
        <p>Name calling other drivers</p>
        <p>Talks in rude tone</p>
        <p>Does not cooperate in transactions</p>
        <p>Over-filling passenger capacity</p>
    </div>

{/* unmaintained vehicle */}
    <div className='px-15 mt-5 flex flex-col gap-5'>
        <p className='text-3xl font-bold'>Pessanger should aslo avoid unmaintained vehicles </p>
        <p className='text-3xl font-bold'>What are the signs of unmaintained vehicles?</p>
    </div>
    
{/* unmaintained vehicle signs */}

    <div className='flex flex-col gap-6 px-15 mt-5 text-2xl'>
        <p>Visible external damage (dents, scratches, broken lights)</p>
        <p>Unusual noises from the engine or brakes</p>
        <p>Worn-out tires with low tread</p>
        <p>Broken or malfunctioning seatbelts</p>
        <p>Interior dashboard warning lights active</p>
        <p>Leaking fluids underneath the vehicle</p>
        <p>Misaligned doors or windows that don't close properly</p>
        <p>Strong odors (burning oil, overheating)</p>
        <p>Excessive exhaust smoke</p>
        <p>Missing or broken mirrors</p>
        <p>Malfunctioning lights (headlights, brake lights, turn signals)</p>
        <p>Cracked or damaged windshield</p>
        <p>Suspension issues (vehicle sits unevenly or bounces excessively)</p>
    </div>

    {/* safe choices */}

    <div className='px-15 mt-9 flex flex-col gap-5'>
        <p className='text-3xl font-bold'>How can passenge make a safe choice? </p>
    </div>
    
{/* safe vehicle signs */}

    <div className='flex flex-col gap-6 px-15 mt-5 text-2xl'>
        <p>Always check the vehicle condition</p>
        <p>If the behavior of the driver is not good give the rating accordingly</p>
        <p>Always follow the saftey guideline</p>
        <p>Remember the saftey is in your hands</p>
    </div>


  </div>
</div>


{/* conditions section */}

    <div id='behavior' className="w-[600px] ml-20 h-auto bg-white rounded-2xl shadow-black transition duration-300 hover:shadow-2xl flex items-center justify-start px-8 p-4 mt-300 ">
        <div className="flex text-2xl flex-col gap-4">
        <p>Rude communication</p>
        <p>Unnecessary arguments</p>
        <p>Inappropriate comments</p>
        <p>Unwanted conversation</p>
        <p>Refusal to follow route preferences</p>
        <p>Pressuring for tips</p>
        </div>
    </div>

    <div id='vehicle-con' className="w-[600px] ml-210 mt-70 h-auto bg-white rounded-2xl shadow-black transition duration-300 hover:shadow-2xl flex items-center justify-start p-4 px-8">
        <div className="flex text-2xl flex-col gap-4">
        <p>Poor vehicle condition</p>
        <p>Uncomfortable seating</p>
        <p>Poor shock absorbers</p>
        <p>Cleanliness issues</p>
        <p>AC/ventilation problems</p>
        <p>Seatbelt functionality</p>
        <p>Door/window functionality</p>
        <p>Vehicle odor</p>
        </div>
    </div>

    <div id='honk' className="w-[600px] h-auto  ml-20 mt-70 bg-white rounded-2xl shadow-black transition duration-300 hover:shadow-2xl flex items-center justify-start p-4 px-8">
        <div className="flex text-2xl flex-col gap-4">
        <p>Excessive honking</p>
        <p>Loud music</p>
        <p>Distracting conversations (phone)</p>
        <p>Vehicle noise issues</p>
        </div>
    </div>

    <div id='ride' className="w-[600px] h-auto mt-70 ml-210 bg-white rounded-2xl shadow-black transition duration-300 hover:shadow-2xl flex items-center justify-start p-4 px-8">
        <div className="flex text-2xl flex-col gap-4">
        <p>Overcharging</p>
        <p>Taking longer routes</p>
        <p>Refusing to use meter/app pricing</p>
        <p>Abrupt stops and starts</p>
        <p>Ride cancellation after accepting</p>
        <p>Delay in arrival</p>
        <p>Uncomfortable driving style</p>
        </div>
  </div>


</div>
  )
}

export default LandingPage
