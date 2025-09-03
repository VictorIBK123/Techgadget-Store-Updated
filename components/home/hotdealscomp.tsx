import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Image } from 'react-native';

import { NavigationProp } from '@react-navigation/native';
import { CategoriesContext, UserDetails } from '../../contexts/myContext';
import { ProductsData } from '../../Types/product_data';
import useFetchDeals from '../../hooks/fetch_deals';

const HotDealsComp = ({navigation, categories}: {navigation: NavigationProp<any>, categories:{name: string, key: string, img_url: string}[] }) => {
    const context = useContext(UserDetails)
    const [hotDealsProductDetails, setHotDealsProductDetails] = useState<ProductsData>([])
    useEffect(()=>{
        (async()=>{
            var queryResults: ProductsData=[]
            queryResults = await useFetchDeals('hot_deals',categories,context?.userEmail?context.userEmail:'')
            setHotDealsProductDetails(queryResults)
        })()
    },[categories])
    return (
        <View style={{marginTop:20, marginHorizontal:15, backgroundColor:'white', paddingVertical:10, paddingHorizontal:10, borderRadius:12}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <View  >
                    <Text style={{fontWeight:'500', fontSize:16}}>Hot Deals</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('products_in_deals',{productName: 'hot_deals', categories})} style={{flexDirection:'row', alignItems:'center'}}>   
                    <Text style={{fontSize:12, fontWeight:400}}>More</Text>
                    <Image source={require('../../assets/right.png')} />
                </TouchableOpacity>
            </View>
            <FlatList
                scrollEnabled={false}
                data={hotDealsProductDetails}
                numColumns={4}
                renderItem={({item, index})=>{
                    return(
                        index<4 ?
                        <TouchableOpacity onPress={()=>navigation.navigate('product_details',{item})} style={{flex:1/4, marginRight:3, }}>
                            <View style={{height:80, justifyContent:'center', borderWidth:1, borderColor:'#F7F7F7', alignSelf:'center'}}>
                                <Image style={{height:80,width:80, resizeMode:'contain'}} source={{uri: item.img_url}} />
                            </View>
                            <Text style={{textAlign:'center', marginVertical:15, fontSize:12, fontWeight:'400', paddingHorizontal:3, height:60}}>{item.name}</Text>
                            <Text adjustsFontSizeToFit={true} style={{textAlign:'center', fontSize:14, fontWeight:'700'}}>₦{parseFloat(item.price)}</Text>
                            <Text style={{fontWeight:'500', fontSize:12, textAlign:'center', textDecorationLine:'line-through', textDecorationStyle:'solid', color:'#8E9295'}}>₦{(parseFloat(item.price)+((10/100)*parseFloat(item.price))).toLocaleString()}</Text>
                        </TouchableOpacity>:
                        <></>
                    )
                }}
                />
        </View>
    );
};



export default HotDealsComp;