import { NextApiRequest,NextApiResponse } from "next";
import cookie from "cookie"


export const loggingOut=async(req:NextApiRequest,res:NextApiResponse)=>{
    res.setHeader("Set-Cookie",
        cookie.serialize("session","",{
            maxAge:-1,
            path:"/"
        })
    );
    res.status(200).json({message:"LoggedOut"});
}