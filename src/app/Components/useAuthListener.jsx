"use client"

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useContext } from "react";
import {  AppContext } from "@/context/AppContext";

import { auth } from "../Config/firebaseConfig";

const useAuthListener = () => {
    const context = useContext(AppContext);
    
    const {router, setShowUserLogin, user, setUser} = context

    useEffect(() => {
        // ✅ Listen for Firebase auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({ uid: user.uid, name: user.displayName, email: user.email });
            } else {
                setUser(null); // ✅ User is logged out
            }
        });

        // ✅ Cleanup listener when component unmounts
        return () => unsubscribe();
    }, []);

    return null;
};
export const handleLogout = async (setUser) => {
    try {
        await signOut(auth); // ✅ Logs out the user from Firebase
        setUser(null); // ✅ Explicitly clear user state
        console.log("User logged out successfully!");
    } catch (error) {
        console.error("Logout Error:", error);
    }
};


export default useAuthListener;