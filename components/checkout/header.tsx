import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import { NavigationProp } from '@react-navigation/native';

type HeaderProps = {
    navigation: NavigationProp<any>;
};

const Header: React.FC<HeaderProps> = ({navigation}) => {
    return (
        <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#ffff', paddingTop:20,paddingBottom:20, paddingHorizontal:10, width:'100%', zIndex:20, flex:0.4/10}}>
            <TouchableOpacity style={{marginRight:30}} onPress={()=>navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <View>
                <Text style={{fontSize:18, fontWeight:'600'}}>Checkout</Text>
            </View>
        </View>
    );
};



export default Header;