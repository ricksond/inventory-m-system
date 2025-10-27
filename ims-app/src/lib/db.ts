import { db } from "@/utils/firebase";
import { collection,addDoc,getDocs } from "firebase/firestore";


export const addInventory=async(item:{name:string,quantity:number})=>{
    const addItem=await addDoc(collection(db,"Inventory"),item)
    return addItem.id
}

export const getInventory=async()=>{
    const getItem=await getDocs(collection(db,"Inventory"))
    return getItem.docs.map(item=>({id:item.id,...item.data()}));
}