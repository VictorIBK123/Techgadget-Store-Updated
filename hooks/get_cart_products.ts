import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase-config"
import { ProductsData } from "../Types/product_data"

export const useGetCartProducts =async(userEmail:string, categories:{name: string, key: string, img_url: string}[],)=>{
    const cartSnapshot = await getDoc(doc(db, 'users', userEmail ))
    const userCart:[] = cartSnapshot.data()?.cart
    let q;
    let categoryRef;
    let queryResults: ProductsData=[];
    const cartDetails = await Promise.all( categories.map(async(element)=>{
        categoryRef = collection (db, element.name.toLowerCase())
        q = query(categoryRef, where('name','in',userCart))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc)=>{
            queryResults.push({
                key: `${doc.id}`, 
                name:doc.data().name,
                description:doc.data().description,  
                price:doc.data().price, 
                img_url:(doc.data().img_url),
                inCart: true
            })
        })
       
    }))
    return queryResults
}