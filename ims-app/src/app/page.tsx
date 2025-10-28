import React from "react";
import { Metadata } from "next";
import Home from "@/components/Home/Home";

export const metadata:Metadata={
  title:"Inventory Management | Home Page"
}

export default function homePage(){
  return (
    <>
    <Home/>
    </>
  )
}