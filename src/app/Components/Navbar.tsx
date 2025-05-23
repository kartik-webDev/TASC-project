"use client"

import React from "react";
import { useRef, useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import {handleLogout} from "../Components/useAuthListener"
import LoginPage from "../loginPage/page";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/firebaseConfig";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"; // Logout icon


const Navbar = () => {

    
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    const ref = useRef<HTMLDivElement | null>(null);

    const context = useContext(AppContext);

    const logout = async () => {
    await handleLogout(setUser); // ✅ Clears Firebase session properly
    router.push("/"); // ✅ Redirect to home after logout
    };

      useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

    if (!context) {
        throw new Error('SomeComponent must be used within an AppContextProvider');
    }

    const {router, setShowUserLogin, user, setUser, setIsLoginFormOpen, isLoginFormOpen} = context

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/' },
        { name: 'Contact', path: '/' },
        { name: 'About', path: '/' },
    ];

    // const handlelLoginClick = ()=>{
    //     router.push('/loginPage')
    // }



    // useEffect(() => {
    //     const handleScroll = () => {
    //         setIsScrolled(ref.current.scrollTop > 10);
    //     };
    //     ref.current.addEventListener("scroll", handleScroll);
    //     return () => ref.current?.removeEventListener("scroll", handleScroll);

    // }, []);



  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        setIsScrolled(ref.current.scrollTop > 100);
      }
    };

    const node = ref.current;
    if (node){
      node.addEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    return (
        <div ref={ref} className="h-88 md:h-64 overflow-y-scroll">
            <p className="w-10 h-[500px]"></p>
            <nav className={`fixed top-0 left-0 bg-indigo-500 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <h2 className={` text-3xl text-white h-9 ${isScrolled && "invert opacity-80"}`} > TASC</h2>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <Link key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </Link>
                    ))}
                    
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    <svg className={`h-6 w-6 ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                {!user ? (
                    <button onClick={() => setIsLoginFormOpen(true)} className="cursor-pointer bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">
                        Login
                    </button>
                ) : (
                    <div className="relative group">
                        <img src={user.photoURL || "https://www.w3schools.com/howto/img_avatar.png"} className="w-8 h-8 rounded-full object-cover" alt="" />
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">

                            <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                                LogOut
                            </li>
                        </ul>
                    </div>
                )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    {!user ? (
                    <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                 ) : (
                    <div className="relative flex flex-col items-center gap-2">
            {/* User Profile Image */}
        <img
              src={user.photoURL || "https://www.w3schools.com/howto/img_avatar.png"}
              className="w-8 h-8 rounded-full object-cover border border-gray-300 cursor-pointer"
              alt="User Avatar"
              onClick={() => setShowLogout(!showLogout)}
            />


            {/* Logout Button (Icon-Based, Always Visible) */}
             {showLogout && (

            <button
              onClick={logout}
            >
              <ArrowLeftOnRectangleIcon className="w-8 h-8" />
            </button>
             )}
          </div>

                )}
                </div>
                

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}

                    

                {!user ? (
                    <button onClick={() => setIsLoginFormOpen(true)} className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
                        Login
                    </button>
                ) : (
                    <div className="relative group">
                        <img src={user.photoURL || "https://www.w3schools.com/howto/img_avatar.png"} className="w-8 h-8 rounded-full object-cover" alt="" />
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
  
                            <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                                LogOut
                            </li>
                        </ul>
                    </div>
                )}
                </div>
            </nav>
              {/* Render LoginPage as a modal when `isLoginFormOpen` is true */}
              {isLoginFormOpen && <LoginPage />}
        </div>
    );
}

export default Navbar