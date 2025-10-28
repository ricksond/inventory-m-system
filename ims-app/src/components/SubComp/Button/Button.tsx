import React from "react";



export const Button=({children}:{children:any})=>{
    return (
        <>
        <button className=" bg-purple-600 text-white font-bold py-2 px-4 rounded-full hover:bg-purple-700">{children}</button>
        </>
    )
}

export default Button;