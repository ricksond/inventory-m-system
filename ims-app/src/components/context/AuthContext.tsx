"use client";
import React, { Children } from "react";
import { createContext,useContext,useEffect,useState,ReactNode } from "react";
import { registerUser,logIn,logOut } from "@/lib/auth";
import axios from "axios";
import { onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,User,signOut,getIdToken} from "firebase/auth";
import { auth } from "@/utils/firebase";

interface AuthContextOption{
    user:User|null,
    loading:boolean,
    registerUser:(email:string,password:string)=>Promise<User|null>,
    logIn:(email:string,password:string)=>Promise<User|null>,
    logOut:()=>Promise<void>
}

const AuthContext=createContext<AuthContextOption>({
    user:null,
    loading:true,
    registerUser:async(email:string,password:string)=>null,
    logIn:async(email:string,password:string)=>null,
    logOut:async()=>{}
})

export const useAuth=()=>useContext(AuthContext);

export const AuthProvider=({children}:{children:ReactNode})=>{
    const {registerUser,logIn,logOut}=useAuth();
    const[user,SetUser]=useState<User|null>(null);
    const[loading,SetLoading]=useState(true)
}