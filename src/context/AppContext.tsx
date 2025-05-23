'use client'
import React from 'react'
import { createContext ,useContext, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextType {
  showUserLogin: any;
  setShowUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoginFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: any; // Replace 'any' with a specific user type if available
  isLoginFormOpen: any; // Replace 'any' with a specific user type if available
  setUser: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' accordingly
  router: ReturnType<typeof useRouter>;
}


export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null); // Replace 'any' with a specific user type if available

  const value: AppContextType = {
    showUserLogin,
    setShowUserLogin,
    user,
    setUser,
    router,
    setIsLoginFormOpen, isLoginFormOpen
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = ()=> {
    return useContext(AppContext)
}