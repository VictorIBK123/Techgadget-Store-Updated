import React from 'react';
import { View,  TouchableOpacity, Text } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { auth } from '../../firebase-config';

type HeaderProps = {
    navigation: NavigationProp<any>; // Replace 'any' with the specific type if known, e.g., NavigationProp
};

const Header: React.FC<HeaderProps> = ({navigation}) => {
    return (
        <View style={{elevation:10,flexDirection:'row', justifyContent:'space-between', paddingBottom:10,paddingHorizontal:15, backgroundColor:'white', paddingTop:20}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            {auth.currentUser?.email && <TouchableOpacity onPress={()=>navigation.navigate('main',{screen:'cart'})}>
                <AntDesign name="shoppingcart" size={24} color="black"  />
            </TouchableOpacity>}
            {!auth.currentUser?.email && <TouchableOpacity onPress={()=>navigation.navigate('login')} style={{position:'absolute', top:20, right:10, borderRadius:10, elevation:2, paddingHorizontal:20, paddingVertical:5}}>
                        <Text style={{color:'blue', fontSize:16}}>Login</Text>
            </TouchableOpacity>}
        </View>
    );
};



export default Header;