import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Dispatch, SetStateAction, useContext, useRef } from "react";
var usersRef: any

const UseAddToCart =async(productName: string, userEmail:string='', setAddingToCart: Dispatch<SetStateAction<boolean>>)=>{
    setAddingToCart(true)
    usersRef = doc(db, "users", userEmail);
    try {
        // Adding new products to cart using their name
        await updateDoc(usersRef, {
            cart: arrayUnion(productName)
        });
        setAddingToCart(false)
    } catch (error) {
        setAddingToCart(false)
        alert(error)
    }
    

}

export default UseAddToCart