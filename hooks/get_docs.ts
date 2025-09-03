import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import useCheckCart from "./check_cart";

const useGetDocs =async(collectionName:string, setFunc:(data:any)=>void, userEmail:string|undefined, max=20, )=>{
            const querySnapshot = await getDocs(collection(db, collectionName));
            var fetchedData:{name: string, key: string, img_url: string, price?:string, description?:string, inCart?: boolean}[] =[];
            var added=0
            try{
                const mapped= await Promise.all(querySnapshot.docs.map(async(doc)=>{
                    
                    if (added<max && collectionName=='categories'){
                        added+=1
                        fetchedData.push({key: `${doc.id}`, name:doc.data().name, img_url:(doc.data().img_url) })
                        
                    }
                    else if (added<max && userEmail!=undefined){
                        added+=1
                        fetchedData.push({
                            key: `${doc.id}`, 
                            name:doc.data().name,
                            description:doc.data().description,  
                            price:doc.data().price, 
                            img_url:(doc.data().img_url),
                            inCart: await useCheckCart('users', userEmail, doc.data().name,)
                        })
                    }
                }))
                setFunc(fetchedData)
            }
            catch(error){
                alert(error)
            }
        }
export  default useGetDocs