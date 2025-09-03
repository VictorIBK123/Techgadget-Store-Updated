import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { app, auth, db } from '../../firebase-config';
import { NavigationProp } from '@react-navigation/native';
import useGetDocs from '../../hooks/get_docs';
import { UserDetails } from '../../contexts/myContext';

interface AllCategoriesCompProp {
    navigation: NavigationProp<any>;
}

const AllCategoriesComp: React.FC<AllCategoriesCompProp> = ({navigation}) => {
    const [categories, setCategories] = React.useState<{name: string, key: string, img_url: string}[]>([])
    const context = useContext(UserDetails)
     useEffect(()=>{
            if (!auth.currentUser?.email){
                navigation.setOptions({
                    headerRight:()=><TouchableOpacity onPress={()=>navigation.navigate('login')} style={{position:'absolute', top:20, right:10, borderRadius:10, elevation:2, paddingHorizontal:20, paddingVertical:5}}>
                                                <Text style={{color:'blue', fontSize:16}}>Login</Text>
                                    </TouchableOpacity>
                                
                })
            }
        },[])
         useEffect(()=>{
            (async ()=>{
                await useGetDocs('categories',setCategories,context?.userEmail)
            })()
            },[])
    return (
        <FlatList
        ListEmptyComponent={()=><ActivityIndicator size={'large'} color={'#2F1528'} />}
        style={{flex:17/20, marginBottom:20}}
            contentContainerStyle={{marginTop:20, paddingHorizontal:10, paddingBottom:50}}
            data={categories}
            numColumns={2}
            renderItem={({item})=>{
                return(
                    <TouchableOpacity onPress={()=>navigation.navigate('products_in_category',{productName: item.name.toLowerCase()})} style={{flex:1/2, marginRight:3, marginBottom:10, backgroundColor:'white', borderRadius:4}}>
                        <View style={{justifyContent:'center', height:132}}>
                            <Image style={{alignSelf:'center', height:130, width:130, resizeMode:'contain'}} source={{uri: item.img_url}} />
                        </View>
                        <Text style={{textAlign:'center', marginTop:10,marginVertical:5, fontSize:12, fontWeight:'400', paddingHorizontal:3}}>{item.name}</Text>
                    </TouchableOpacity>
                )
            }}
            />
    );
};


export default AllCategoriesComp;