"use client";

import React, { useState, useContext, SyntheticEvent } from "react";
import { auth, provider } from "../Config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { AppContext } from "@/context/AppContext";
// next auth sign in
import { signIn } from "next-auth/react"

const LoginPage = () => {

  // react context
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("LoginPage must be used within an AppContextProvider");
  }

  const { router, setUser, setIsLoginFormOpen,  } = context;
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const GoogleSignUp = async (e: SyntheticEvent) => {
  //   e.preventDefault();
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     console.log("User Info:", result.user);
  //     toast.success(`Welcome, ${result.user.displayName || "User"}!`);
  //     setIsLoginFormOpen(false);
  //   } catch (error) {
  //     console.error("Error signing in:", error);
  //     toast.error("Login failed. Try again!");
  //   }
  // };

  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!email || !password || (state === "register" && !name)) {
      return toast.error("All fields are required!");
    }

    try {
      let userCredential;
      if (state === "register") {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      const user = userCredential.user;

      router.replace("/");
      setIsLoginFormOpen(false);
      toast.success(`Welcome, ${userCredential.user.displayName || name}!`);
    } catch (error) {
      toast.error("Authentication failed. Please try again!");
      console.error(error);
    }
  };

  return (
    <div onClick={() => setIsLoginFormOpen(false)} className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/50">
      <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
        <p className="text-2xl font-medium m-auto">
          <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {/* Name Input for Registration */}
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
          </div>
        )}

        {/* Email Input */}
        <div className="w-full">
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
        </div>

        {/* Password Input */}
        <div className="w-full">
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
        </div>
        {state === "login" && (
            <a className="text-blue-600 cursor-pointer ">Forgot Password</a>
          )}
        {state === "register" ? (
            <p>Already have an account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">Click here</span></p>
        ) : (
            <p>Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">Click here</span></p>
        )}

        {/* Sign Up or Login Button */}
        <button className="bg-black transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>

        {/* Google Sign-In */}
        {state === "login" && (
        <button onClick={()=> signIn('google')} type="button" className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800">
            <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon"/>
            Log in with Google
        </button>
        )}
      </form>
    </div>
  );
};

export default LoginPage;