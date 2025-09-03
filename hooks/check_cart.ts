import { doc, getDoc,  } from "firebase/firestore";
import { db } from "../firebase-config";

const useCheckCart =async(collectionName:string, email:string, productName:string):Promise<boolean>=>{
    try {
        const snapshot1 = await getDoc(doc(db, collectionName, email));
        return (snapshot1.data()?.cart.includes(productName))
    } catch (error) {
        return false
    }
    
    
}
export default useCheckCart