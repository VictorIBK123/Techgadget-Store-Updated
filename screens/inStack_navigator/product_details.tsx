import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Header from '../../components/product_details/header';
import OtherDetails from '../../components/product_details/other_details';
import QuantityCalc from '../../components/product_details/quantity-calc';
import { StatusBar } from 'expo-status-bar';

import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import AddToCartButton from '../../components/product_details/add-to-cart.button';
import { AProductData } from '../../Types/product_data';



type Props = {
    navigation: NavigationProp<any>; // Replace 'any' with the specific type if known, e.g., NavigationProp
    route: RouteProp<any>; // Replace 'any' with the specific type if known, e.g., RouteProp};
}
const ProductDetails: React.FC<Props> = ({ navigation,route }) => {
    return (
        <View style={{flex:1 }}>
            <Header navigation={navigation} />
            <ScrollView style={{}}>
                <View style={{}}>
                    <View style={{backgroundColor:'white', marginBottom:10}}>
                        <Image style={{alignSelf:'center', resizeMode:'contain',height:280, width:280}} source={{uri:route.params?.item.img_url}} />
                    </View>
                    <OtherDetails productData={route.params?.item} />
                    {/* <QuantityCalc /> */}
                    <AddToCartButton navigation={navigation} item={route.params?.item} category={route.params?.category}  />
                    
                </View>
            </ScrollView>
            
        </View>
        
    )
};

export default ProductDetails;