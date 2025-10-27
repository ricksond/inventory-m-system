import { NextApiRequest,NextApiResponse } from "next";
import { adminAuth } from "@/lib/firebaseAdmin";
import cookie from "cookie";

export default async function verifySession(req:NextApiRequest,res:NextApiResponse){
    try{
        const cookies=cookie.parse(req.headers.cookie || "")
        const sessionCookie=cookies.session || ""

        const userData=await adminAuth.verifySessionCookie(sessionCookie,true)
        res.status(200).json({message:"Authorized",user:userData})
    }catch(error){
        res.status(401).json({message:"Unauthorized"})
        console.log(error);
    }
}