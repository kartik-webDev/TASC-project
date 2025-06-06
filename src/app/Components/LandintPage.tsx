"use client"
import React, { useContext } from 'react'
import { AppContext } from '@/context/AppContext';
import GuidelinesPage from '../guidelines/page';
import Image from 'next/image'
const LandingPage = () => {

    const context = useContext(AppContext);

    if(!context){
        throw new Error("Some context nedded")
    }

    const {router} =context

    const guideline = ()=>{
        router.push('/guidelines')
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
  <div className='overflow-hidden flex flex-col space-y-10 '>
    <div className="relative">
        <div className="relative px-10 py-50 bg-amber-300">
            <div className="absolute text-5xl top-10 left-20 items-center">Thoda Aaram Se Chalaiye</div>
        
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
            <button onClick={guideline} className="cursor-pointer justify-center text-2xl px-4 py-2 rounded-4xl bg-black text-white">
                Guidelines 
            </button>
            </div>
        </div>
        
    </div>

    {/* what tasc is  */}

    <div className='ml-20 mr-20'>      
        <div className=' flex flex-col gap-9 text-2xl text-justify space-x-10 '>
            <h1 className='text-4xl text-teal-800 font-bold flex justify-center'>Welcome to TASC — Thoda Aaram Se Chalaiye</h1>
            <h1 className='text-4xl text-teal-800 font-bold flex justify-center'>What TASC is?</h1>
            <p>
                TASC is a web platform built to prioritize passenger safety, comfort, and choice in everyday ride services. Whether it’s a cab, auto, or shared ride, TASC empowers you—the passenger—to share honest feedback about your experience, which directly impacts driver ratings and improves ride standards for everyone.
            </p>

            <p>
                Through a quick feedback interface, TASC makes it easy for riders to report issues, appreciate good service, and help build a more respectful and reliable transportation ecosystem.
            </p>

            <p>
                TASC is part of a movement to make rides safer, smoother, and more human—because your voice matters.
            </p>
            

        </div>
    </div>

    {/* why  tasc */}

    <div>
       
    
      <div className=" mt-9">
        <h2 className="text-5xl font-bold text-teal-800 mb-4 flex justify-center">Why TASC?</h2>
        <p className="text-2xl text-gray-600 text-center">
          Because passengers deserve more than just a ride. They deserve <strong>respect, safety, and comfort.</strong>
        </p>
      </div>

      {/* Problem Section */}
      <div className="space-y-4 ml-10 mt-5">
        <h3 className="text-3xl font-semibold text-red-600 flex justify-center"> The Problem</h3>
        <p className='text-2xl ml-13 mr-5 mt-10'>
          Ride services today often prioritize speed, pricing, or driver availability — but overlook the actual ride
          experience from the passenger’s point of view.
        </p>
        <ul className="list-disc list-inside space-y-1 text-2xl text-gray-700 ml-18 ">
          <li>Unsafe driving practices (rash driving, phone use, ignoring traffic rules)</li>
          <li>Poor vehicle condition (broken seats, bad smell, no seatbelts)</li>
          <li>Unprofessional behavior (rudeness, inappropriate comments, pressure for tips)</li>
          <li>Noise discomfort (honking, loud music, loud phone calls)</li>
          <li>Route manipulation or overcharging</li>
        </ul>
        <p className='text-2xl ml-13 mr-5'>
          These issues may seem “minor” individually — but collectively, they erode trust, dignity, and safety in
          everyday commuting.
        </p >
      </div>

      {/* The Gap Section */}
      <div className="space-y-4 ml-10 mt-8">
        <h3 className="text-4xl font-semibold text-yellow-600 flex justify-center mt-18"> The Gap</h3>
        <p className='text-2xl ml-13 mr-5'>Current ride platforms often offer limited or general feedback options that:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700 ml-18 text-2xl">
          <li>Don’t capture the specific issue</li>
          <li>Don’t allow for evidence (photos, voice notes)</li>
          <li>Don’t show real impact (passenger feedback goes into a void)</li>
        </ul>
        <p className='text-2xl ml-13 mr-5'>
          As a result, passengers feel disempowered, and the system fails to correct repeat offenders or recognize great
          drivers.
        </p>
      </div>

      {/* The Solution Section */}
      <div className="space-y-4 ml-10 mt-8">
        <h3 className="text-4xl font-semibold text-green-600 flex justify-center mt-18"> The TASC Solution</h3>
        <p className='text-2xl ml-13 mr-5'>
          TASC (Thoda Aaram Se Chalaiye) flips the narrative:
        </p >
        <ul className="list-disc list-inside space-y-1 text-gray-700 ml-18 text-2xl">
          <li>It puts passengers first by enabling detailed, actionable feedback</li>
          <li>It gives every rider a voice that matters</li>
          <li>It allows both criticism and appreciation — creating a balanced ecosystem</li>
        </ul>

      </div>

      {/* Outcomes Section */}
      <div className="space-y-4 ml-10 mt-8">
        <h3 className="text-4xl font-semibold text-blue-600 flex justify-center"> Meaningful Outcomes</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700 ml-18 text-2xl mt-12">
          <li>Unsafe drivers are flagged more quickly</li>
          <li>Great drivers are rewarded and encouraged</li>
          <li>Passenger communities gain power to influence service standards</li>
          <li>Data-driven improvements help ride companies improve training and maintenance</li>
        </ul>
      </div>

        
    </div>

    {/* how tasc is */}

    <div className='mt-9'>
      <h1 className='text-5xl font-bold text-teal-800 flex justify-center'>How TASC work?</h1>
      <ul className='text-2xl ml-33 mr-30 list-disc list flex flex-col gap-5 mt-10'>
        
        <li>
          After a ride, passengers can rate their experience and highlight safety concerns, vehicle conditions, driver behavior, and overall ride quality.
        </li>
        <li>Users can check the rating before choosing the driver, TASC help them to achieve comfort, secure and safe ride.</li>
        <li>Instead of just giving a star rating, users can provide detailed feedback, helping ride-hailing services identify issues more precisely.</li>
        <li>Feedback is aggregated and used to adjust driver scores, encouraging better driving practices and enhancing passenger trust.</li>
        <li>Passengers can report issues anonymously, ensuring safety and honest feedback without fear of repercussions.</li>
        
      </ul>
    </div>

    {/* guidelines */}

    <div className='mt-12'>
      <h1 className='text-4xl font-bold text-teal-800 flex justify-center'>Passenger Guidlines</h1>
      <p className='text-2xl text-center mt-5'>Here are the complete passenger guidelines</p>
      <div className='mt-5 flex justify-center'>
        <button onClick={guideline} className='bg-black text-white text-3xl rounded-3xl p-3 cursor-pointer'>
          Guidelines
        </button>
      </div>
    </div>

  </div>

  )
}

export default LandingPage
