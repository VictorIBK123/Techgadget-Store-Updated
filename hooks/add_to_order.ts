import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Dispatch, SetStateAction, useContext, useRef } from "react";
import { ProductsData } from "../Types/product_data";
var usersRef: any

const UseAddToOrder =async(cartData: ProductsData, userEmail:string='', setAddToOrder: Dispatch<SetStateAction<boolean>>)=>{
    setAddToOrder(true)
    const stringifiedCartData = JSON.stringify(cartData)
    usersRef = doc(db, "users", userEmail);
    try {
        // Adding new products to cart using their name
        await updateDoc(usersRef, {
            orders: arrayUnion(stringifiedCartData)
        });
        setAddToOrder(false)
    } catch (error) {
        setAddToOrder(false)
        alert(error)
    }
    

}

export default UseAddToOrder