import { useAppContext } from '@/context/AppContext';
import React from 'react';

const SafteyNav = () => {
    // react context api
    
  const { setSelectedImage, selectedImage, isMenuOpen } = useAppContext();

  return (
    <div>
      <nav className={`fixed top-13 md:top-23 left-0 bg-[#fbfbfb] w-full z-40 md:py-1 md:px-60 duration-300 ${isMenuOpen ? 'z-40' : ''}`}>
        {/* Navbar Links */}
        <div className='flex py-2 gap-9 text-gray-500 text-xl'>
          <p 
            onClick={() => setSelectedImage(null)} 
            className={`${selectedImage === null ? 'text-black font-semibold ' : ''} hover:text-black duration-100 cursor-pointer`}
          >
            Overview
          </p>
          <p 
            onClick={() => setSelectedImage('WhyTASC')} 
            className={`${selectedImage === 'WhyTASC' ? 'text-black font-semibold ' : ''} hover:text-black duration-100 cursor-pointer`}
          >
            Why TASC
          </p>
          <p 
            onClick={() => setSelectedImage('HowTASC')} 
            className={`${selectedImage === 'HowTASC' ? 'text-black font-semibold ' : ''} hover:text-black duration-100 cursor-pointer`}
          >
            How TASC
          </p>
        </div>
      </nav>
    </div>
  );
};

export default SafteyNav;