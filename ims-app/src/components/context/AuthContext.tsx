"use client";
import React from "react";
import { createContext,useContext,useEffect,useState,ReactNode } from "react";
import { registerUser,logIn,logOut } from "@/lib/auth"
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
    const[user,setUser]=useState<User|null>(null);
    const[loading,setLoading]=useState(true)

    // Checking for Auth state changes
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,async(firebaseuser)=>{
            setLoading(true)
            try{
                if(firebaseuser){
                    setUser(firebaseuser)
                    try{
                        const idToken=await getIdToken(firebaseuser,true)
                        await axios.post("/api/session",{idToken})
                    }catch(error){
                        console.log("Error Creating Session",error)
                    }
                }else{
                    setUser(null)
                    try{
                        await axios.post("/api/logout")
                    }catch(error){
                        console.log("Error Logging out",error)
                    }
                }
            }catch(error){
                console.log("Error in Auth state",error)
            }finally{
                setLoading(false)
            }   
        });
    return ()=>unsubscribe() 
    },[])

    //Registering User
    const registerUser=async(email:string,password:string)=>{
        try{
            const userCred=await createUserWithEmailAndPassword(auth,email,password)
            const idToken=await userCred.user.getIdToken();
            await axios.post("/api/session",{idToken})
            setUser(userCred.user)
            return userCred.user;
        }catch(error){
            console.log("Error Registering",error)
            throw error;
        }
    }
    // Logging in User
    const logIn=async(email:string,password:string)=>{
        try{
            const userCred=await signInWithEmailAndPassword(auth,email,password)
            const idToken=await userCred.user.getIdToken();
            await axios.post("/api/session",{idToken})
            setUser(userCred.user)
            return userCred.user
        }catch(error){
            console.log("Error Logging In",error)
            throw error;
        }
    }
    // Logging out
    const logOut=async()=>{
        try{
            await signOut(auth)
            await axios.post("/api/logout")
            setUser(null)
        }catch(error){
            console.log("Error Logging out",error)
        }
    }
    return (
        <AuthContext.Provider value={{user,loading,registerUser,logIn,logOut}}>
            {children}
        </AuthContext.Provider>
    )
}