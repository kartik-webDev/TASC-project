"use client";

import React, { useContext, useEffect, useState } from "react";
import { AppContext, useAppContext } from "@/context/AppContext";
import { handleLogout } from "../Components/useAuthListener";
import LoginPage from "../loginPage/page";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/firebaseConfig";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"; // Logout icon

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const context = useContext(AppContext);

    //  react context api

    const {setIsMenuOpen, isMenuOpen } = useAppContext()

  const logout = async () => {
    await handleLogout(setUser); // Clears Firebase session properly
    router.push("/"); // Redirect to home after logout
  };

  // Firebase Google login render
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (!context) {
    throw new Error("Navbar must be used within an AppContextProvider");
  }

  const { router, user, setUser, setIsLoginFormOpen, isLoginFormOpen } = context;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Guidelines", path: "/guidelines" },
    { name: "Feedback", path: "/feedback" },
    // { name: "About", path: "/" },
  ];

  return (
    <div className="mb-30">
      <nav className="fixed top-0 left-0 bg-gradient-to-br from-teal-600 via-blue-600 to-purple-600 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 duration-500 z-50 py-4 md:py-6">
        {/* Logo */}
        {/* <Link href="/" className="flex items-center gap-2">
        
          <span className=" md:text-2xl bg-gradient-to-r from-yellow-500 via-yellow-300 to-amber-600 bg-clip-text text-transparent font-bold">TASC</span>
        
          
        </Link> */}

          <div className="flex items-center gap-4">
            {/* navigate to home */}
            <Link href='/'>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl  font-black text-white">T</span>
              </div>
            </Link>
              <div>
                <h1 className="text-xl font-black text-white tracking-tight hidden md:block">TASC</h1>
                <p className="text-blue-100 font-medium text-sm hidden md:block">Thoda Aaram Se Chalaiye</p>
              </div>
          </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex text-xl items-center gap-4 lg:gap-18">
          {navLinks.map((link, i) => (
            <Link key={i} href={link.path} className="group flex flex-col gap-0.5 text-white">
              {link.name}
              <div className="bg-white h-0.5 w-0 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <button
              onClick={() => setIsLoginFormOpen(true)}
              className="cursor-pointer bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <img
                src={user.photoURL || "https://www.w3schools.com/howto/img_avatar.png"}
                className="w-8 h-8 rounded-full object-cover"
                alt=""
              />
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
            <svg
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-6 w-6 cursor-pointer"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          ) : (
            <div className="relative flex flex-col items-center gap-2">
              <img
                src={user.photoURL || "https://www.w3schools.com/howto/img_avatar.png"}
                className="w-8 h-8 rounded-full object-cover border border-gray-300 cursor-pointer"
                alt="User Avatar"
                onClick={() => setShowLogout(!showLogout)}
              />

              {showLogout && (
                <button onClick={logout}>
                  <ArrowLeftOnRectangleIcon className="w-8 h-8" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-70 h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {navLinks.map((link, i) => (
            <Link key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </Link>
          ))}

          {!user ? (
            <button
              onClick={() => setIsLoginFormOpen(true)}
              className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <img
                src={user.photoURL || "https://www.w3schools.com/howto/img_avatar.png"}
                className="w-8 h-8 rounded-full object-cover"
                alt=""
              />
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                  LogOut
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {isLoginFormOpen && <LoginPage />}
    </div>
  );
};

export default Navbar;