import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { AProductData, ProductsData } from "../Types/product_data";

const useGetSearchResult =async (categories: AProductData[])=>{
        let q;
        let categoryRef;
        let queryResults: ProductsData=[];
        const cartDetails = categories.map(async(element: AProductData)=>{
            categoryRef = collection (db, element.name.toLowerCase())
            q = query(categoryRef, where('name','',userCart))
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
            setFunc(queryResults)
        })
}