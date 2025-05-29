import React from 'react'
import Image from 'next/image'

const Footer = ()=>{
    return (
        <div className='relative flex items-center justify-center w-full  mt-10 mb-5'>
            <div className='bg-[#f8db24] text-white p-4 mx-auto w-[1400px] h-[500px] rounded-2xl mt-auto'>
                {/* contact us div */}

                 <div className='bg-black text-3xl text-white p-2 mx-auto w-[1300px] rounded-md mt-2 flex items-center justify-start gap-2'>
                    <span className='ml-5'>CONTACT US</span>
                    <Image src='/mail.png' alt='mail' width={30} height={30} />
                </div>

                {/* get in touch div */}

                <div className=' text-black ml-8 mt-7 inline-block'>
                    <div className=' text-7xl font-bold'>
                        GET IN TOUCH.
                    </div>
                    
                    <div>
                        ------------------------------------------------------------------------------------------------------------------
                        <p>TASC is a web application dedicated to prioritizing passenger saftey, comfort, and choice in ride services.</p>
                    
                    </div>
                </div>

                {/* social media logos */}

                <div className=' absolute flex flex-wrap gap-5 mt-15 ml-8 cursor-pointer'>
                    <Image src='/instagram.png' alt='insta' width={30} height={30} />
                    <Image src='/linkedin.png' alt='insta' width={30} height={30} />
                    <Image src='/github.png' alt='insta' width={31} height={31} />
                </div>


                {/* all contact details */}

                <div className='absolute text-black font-bold text-2xl right-30 top-30 flex flex-col gap-3'>
                    <div className='flex flex-wrap gap-14'>
                        BASED IN
                        <span>INDIA</span>
                    </div>
                   
                    <div className='flex flex-wrap gap-7'>
                        PHONE NO.
                        <span>+91 1234567890</span>
                    </div>

                    <div className='flex flex-wrap gap-14'>
                        CONTACT 
                        <span>CONTACT@TASC.COM</span>
                    </div>

                    <div className='flex flex-wrap gap-15'>
                        SUPPORT 
                        <span>HELP@TASC.COM</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
