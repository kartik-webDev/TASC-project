// 'use client'
// import React from 'react'
// import { createContext ,useContext, useState, ReactNode } from 'react'
// import { useRouter } from 'next/navigation'

// export const AppContext = createContext<AppContextType | undefined>(undefined);

// interface AppContextType {
//   showUserLogin: any;
//   setShowUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
//   setIsLoginFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   setSelectedImage: React.Dispatch<React.SetStateAction<any>>;
//   user: any; // Replace 'any' with a specific user type if available
//   isLoginFormOpen: any; // Replace 'any' with a specific user type if available
//   selectedImage: any
//   setUser: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' accordingly
//   router: ReturnType<typeof useRouter>;
// }


// export const AppContextProvider = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();
//   const [showUserLogin, setShowUserLogin] = useState<boolean>(false);
//   const [isLoginFormOpen, setIsLoginFormOpen] = useState<boolean>(false);
//   const [user, setUser] = useState<any>(null); // Replace 'any' with a specific user type if available
//   const [selectedImage, setSelectedImage] = useState<string | null>(null)
  

//   const value: AppContextType = {
//     showUserLogin,
//     setShowUserLogin,
//     user,
//     setUser,
//     router,
//     setIsLoginFormOpen, isLoginFormOpen,
//     setSelectedImage, selectedImage
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };
//  const useAppContext = ()=> {
//     return useContext(AppContext)
// }

// export default useAppContext
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Define a more specific type for context
interface AppContextType {
  showUserLogin: boolean;
  setShowUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginFormOpen: boolean;
  setIsLoginFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  user:  any; // Replace 'UserType' with your actual user model type
  isMenuOpen: any
 setUser: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' accordingly
  router: ReturnType<typeof useRouter>;
}

// Create context with proper default values
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Context Provider
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [user, setUser] = useState< null>(null); // Use a proper user model type
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const value: AppContextType = {
    showUserLogin,
    setShowUserLogin,
    isLoginFormOpen,
    setIsLoginFormOpen,
    selectedImage,
    setSelectedImage,
    user,
    setUser,
    router,
    setIsMenuOpen, isMenuOpen
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom Hook to use Context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppContextProvider');
  return context;
};