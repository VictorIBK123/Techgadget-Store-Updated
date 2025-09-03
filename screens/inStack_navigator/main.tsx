import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import CartScreen from '../maintab/cart';
import HomeScreen from '../maintab/home';
import { ProfileScreen } from '../maintab/profile';

const Tab = createMaterialTopTabNavigator();


export default function MainTabs() {
    return (
        <View style={{ flex: 1 }}>
            
            <Tab.Navigator  tabBarPosition='bottom' screenOptions={{swipeEnabled:false,tabBarStyle:{height:60}, animationEnabled:false }}>
                <Tab.Screen name="home" options={{tabBarIcon:({focused, color})=>(focused? <Entypo name="home" size={24} color="black" />: <Feather name="home" size={24} color="black" /> ), title:'Home'}} component={HomeScreen} />
                <Tab.Screen name="cart" options={{tabBarIcon:({focused, color})=>(focused? <Entypo name="shopping-cart" size={24} color="black" />: <AntDesign name="shoppingcart" size={24} color="black"  /> ), title:'Cart'}} component={CartScreen} />
                {/* <Tab.Screen name="orders" options={{tabBarIcon:({focused, color})=>(focused? <Entypo name="shopping-cart" size={24} color="black" />: <AntDesign name="shoppingcart" size={24} color="black"  /> ), title:'Orders'}} component={OrderScreen} /> */}
                <Tab.Screen name='profile_screen' options={{tabBarIcon:({focused, color})=>(focused? <Image source={require('../../assets/profile-dark.png')} style={{height:24, width:24}}/>: <Image source={require('../../assets/profile-light.png')} style={{height:24, width:24}}/> ), title:'Profile'}} component={ProfileScreen} />
            </Tab.Navigator>
        </View>
    );
}