import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase-config"
import { AProductData, ProductsData } from "../Types/product_data"

export const useGetOrderedProducts =async(userEmail:string, categories:{name: string, key: string, img_url: string}[],)=>{
    const cartSnapshot = await getDoc(doc(db, 'users', userEmail ))
    const userOrders = cartSnapshot.data()?.orders[0]
    const productNamesInOrder: string[] = JSON.parse(userOrders).map((element: AProductData)=>element.name)
    // console.log(userOrders)
    // console.log(productNamesInOrder)
    let q;
    let categoryRef;
    let queryResults: ProductsData=[];
    const cartDetails = await Promise.all( categories.map(async(element)=>{
        categoryRef = collection (db, element.name.toLowerCase())
        q = query(categoryRef, where('name','in',productNamesInOrder))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc)=>{
            queryResults.push({
                key: `${doc.id}`, 
                name:doc.data().name,
                description:doc.data().description,  
                price:doc.data().price, 
                img_url:(doc.data().img_url),
                inCart: true,
                quantity: userOrders[productNamesInOrder.indexOf(doc.data().name)].quantity
            })
        })
    }))
    console.log(queryResults)
    return queryResults
}