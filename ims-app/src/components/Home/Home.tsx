"use client"
import React from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../SubComp/Button/Button";


export const Home=()=>{
    return (
    <div className="bg-gradient-to-br from-purple-700 via-white to-purple-400">
        <div className="min-h-screen p-15 flex flex-col items-center justify-center mb-2">
            <h1 className="Text font-extrabold text-7xl">Inventory Management System</h1>
            <p className="flex mt-4 text-gray-700 text-2xl">Streamline your inventory tracking with a powerful, easy-to-use management system. Track Products, Moniter stock levels and gain insights </p>
            <div className="flex gap-4 mt-4">
            <Button><Link href="/login">Log In</Link></Button>
            <Button><Link href="/signin">Sign In</Link></Button>
            </div>
        </div>
    </div>
    )
}

export default Home;
