import {auth} from "../utils/firebase"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,User } from "firebase/auth";


// Sign In
export const registerUser=async(email:string,password:string):Promise<User|null>=>{
    try{
    const userCred=await createUserWithEmailAndPassword(auth,email,password)
    return userCred.user
    } catch(error){
        console.log("registration Failed",error)
        return null;
    }
}


// Log in
export const logIn=async(email:string,password:string):Promise<User | null>=>{
    try{
        const userCred=await signInWithEmailAndPassword(auth,email,password)
        return userCred.user
    }catch(error){
        console.log("Login Failed",error)
        return null;
    }
}


// Logout
export const logOut=async():Promise<void>=>{
    await signOut(auth)
}