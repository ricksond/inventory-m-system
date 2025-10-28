"use client"
import React,{useEffect,useRef} from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


export const Home=()=>{
    const containerref=useRef(null)
    const titleref=useRef(null)
    const paragraphref=useRef(null)
    const buttonsref=useRef<HTMLAnchorElement[]>([])

    const links=[
        {href:"/login", label:"Log in"},
        {href:"/signIn",label:"Sign In"}
    ]

    useGSAP(()=>{
        const tl=gsap.timeline({defaults:{duration:2,ease:"power1.inOut"}})

        // Animate gradient
        tl.to(containerref.current,{
            background:"linear-gradient(to bottom right,#7e22ce, #f0e5ff, #9333ea)",
            duration:3
        });

        tl.from(titleref.current,{y:50, opacity:0},"-=2")

        tl.from(paragraphref.current,{y:50,opacity:0},"-=1.5")

        tl.from(buttonsref.current,{y:30,opacity:0,stagger:0.5},"-=1")


    },[]);

    return (
    <div ref={containerref} className="bg-gradient-to-br from-purple-700 via-white to-purple-400">
        <div  className="min-h-screen p-15 flex flex-col items-center justify-center mb-2">
            <h1 ref={titleref} className="Text font-extrabold text-7xl">Inventory Management System</h1>
            <p ref={paragraphref} className="flex mt-4 text-gray-700 text-2xl">Streamline your inventory tracking with a powerful, easy-to-use management system. Track Products, Moniter stock levels and gain insights </p>
            <div className="flex gap-4 mt-4">
                {links.map((link,i)=>(
                    <Link key={link.label} href={link.href} className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 text-center" ref={(el)=>{if (el) buttonsref.current[i]=el}}>{link.label}</Link>
                ))}
            </div>
        </div>
    </div>
    )
}

export default Home;
