import { getDocs, collection, query, where } from "firebase/firestore"
import { db } from "../firebase-config"
import { ProductsData } from "../Types/product_data"
import useCheckCart from "./check_cart"

const useFetchDeals =async(type:string,categories: {name: string, key: string, img_url: string}[], userEmail:string )=>{
    const snapShot = await getDocs(collection(db, type))
    var queryResults: ProductsData=[]
    const hotDealsProductName:string[]= snapShot.docs.map((element)=>element.data().name)    
    var querySnapShotLength = 0
        await Promise.all(
            categories.map(async(category:{name: string, key: string, img_url: string} )=>{
                const productsRef = collection(db, category.name.toLowerCase())
                const q= query(productsRef, where('name', 'in', hotDealsProductName ))
                const querySnapshot = await getDocs(q)
                querySnapShotLength+=querySnapshot.docs.length
                querySnapshot.forEach(async(doc)=>{
                    queryResults.push({
                        key: `${doc.id}`, 
                        name:doc.data().name,
                        description:doc.data().description,  
                        price:doc.data().price, 
                        img_url:(doc.data().img_url),
                        inCart: await useCheckCart('users', userEmail, doc.data().name,)
                    })
                })
            })
        )
        return queryResults
    }
export default useFetchDeals