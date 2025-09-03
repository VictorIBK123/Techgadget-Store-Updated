import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Header from '../../components/cart-components/header';
import OrderSummary from '../../components/cart-components/order-summary';
import { NavigationProp } from '@react-navigation/native';
import { useGetCartProducts } from '../../hooks/get_cart_products';
import { CategoriesContext, UserDetails } from '../../contexts/myContext';
import { AProductData, ProductsData } from '../../Types/product_data';
import useGetDocs from '../../hooks/get_docs';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import UseRemoveFromCart from '../../hooks/remove_from_cart';
import { useGetOrderedProducts } from '../../hooks/get_ordered_products';

type OrderScreenNavigationProp = NavigationProp<any>;

const OrderScreen = ({navigation}: {navigation: OrderScreenNavigationProp}) => {
    const userContext = useContext(UserDetails)
    const categoriesContext = useContext(CategoriesContext)
    const [loadingCart, setLoadingCart]= useState<boolean>(false)
    const [orderData, setOrderData] = useState<ProductsData>([])
    const [categories, setCategories] = useState<{ name: string; key: string; img_url: string; }[]>([])
    const [total, setTotal] = useState<number>(0)
    const [removingFromCart, setRemovingFromCart] = useState<boolean>(false)
    const getOrderPrFunc =async()=>{
        await useGetDocs('categories',setCategories,userContext?.userEmail)
        if (userContext?.userEmail){
            const result=await useGetOrderedProducts(userContext?.userEmail,categories)
            setOrderData(result.map((element)=>(
                {...element}
            )))
        }
    }
    
    useEffect(()=>{
        let sum:number=0;
        orderData.forEach((e)=>{
            if (e.quantity){
                sum+=parseInt(e.price)*e.quantity
            }
            
            
        })
        setTotal(sum)
    },[orderData])

    useEffect(()=>{
        (async()=>{
            if (userContext?.userEmail){
                const result = await useGetOrderedProducts(userContext?.userEmail,categories)
                setOrderData(result.map((element)=>(
                    {...element}
                )))
            }

        })()
        
    },[categories])
    
    const calcQuantity = useCallback((operation: string, index:number)=>{
        if (operation=='add'){
            setOrderData( [...orderData.slice(0,index),{name: orderData[index].name, key: orderData[index].key, img_url: orderData[index].img_url, price:orderData[index].price, description:orderData[index].description, inCart: orderData[index].inCart, quantity: orderData[index].quantity!=undefined?orderData[index].quantity+1:0}, ...orderData.slice(index+1, orderData.length) ] )
        }
        else {
            // the quantity must be greater than 1 to add 
            setOrderData( [...orderData.slice(0,index),{name: orderData[index].name, key: orderData[index].key, img_url: orderData[index].img_url, price:orderData[index].price, description:orderData[index].description, inCart: orderData[index].inCart, quantity: orderData[index].quantity!=undefined && orderData[index].quantity>1 ?orderData[index].quantity-1:1}, ...orderData.slice(index+1, orderData.length) ] )
        }
    },[orderData,setOrderData])
    const removeFromCart =(item: AProductData)=>{
        Alert.alert('Delete','Are you sure you want to remove this product from cart?',[{text:'No'},{text:'Remove', onPress: async() => await UseRemoveFromCart(item.name,userContext?.userEmail, setRemovingFromCart ) }])
    }
    if (userContext?.userEmail) {
        return (
            <View style={{flex:1}}>
                <Header navigation={navigation} />
                <OrderSummary removeFromCart={removeFromCart} navigation={navigation} cartData={orderData} total={total} calcQuantity={calcQuantity} />
                <ActivityIndicator size={'large'} color={'#2F1528'} style={{position:'absolute',alignSelf:'center',top:100}} animating={removingFromCart}  />
            </View>
        );
    }
    else{
        return(
            <View style={{justifyContent:'center', alignItems:'center',flexDirection:'row', flex:1, marginHorizontal:10}}>
                <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                    <Text style={{color:'blue', fontSize:16}}>Login</Text>
                </TouchableOpacity>
                <Text style={{marginHorizontal:10}}>or</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('create_account')}>
                    <Text style={{color:'blue', fontSize:16}}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={{marginHorizontal:10}}>to continue</Text>
            </View>
        )
    }
    
};



export default OrderScreen;