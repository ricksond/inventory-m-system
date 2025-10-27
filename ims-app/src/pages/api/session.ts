import { NextApiRequest,NextApiResponse } from "next";
import { adminAuth } from "@/lib/firebaseAdmin";
import cookie from "cookie";

export default async function createSession(req:NextApiRequest,res:NextApiResponse){
    if(req.method=="POST"){
        const {idToken}=req.body
        try{
            const expiresIn=60*60*24*5*1000;
            const session=await adminAuth.createSessionCookie(idToken,{expiresIn});

            // Set Cookie
            res.setHeader("Set-Cookie",
                cookie.serialize("session",session,{
                    maxAge:expiresIn/1000,
                    httpOnly:true,
                    secure:process.env.NODE_ENV==="production",
                    path:"/"
                })  
            );
            res.status(200).json({status:"Success"})
            }catch(error){
                res.status(401).json({error:"Unauthorized"})
            }
        }
        else{
            res.setHeader("Allow",["POST"])
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
}