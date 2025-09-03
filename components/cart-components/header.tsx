import React from 'react';
import { View, Text,  TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { NavigationProp } from '@react-navigation/native';

type HeaderProps = {
    navigation: NavigationProp<any>;
};

const Header = ({ navigation }: HeaderProps) => {
    return (
        <View style={{flexDirection:'row', paddingHorizontal:15, backgroundColor:'white',  alignItems:'center', flex:1/10, elevation:10}}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginRight:30}}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{fontSize:18, fontWeight:'600'}}>Cart</Text>
            </TouchableOpacity>
        </View>
    );
};


export default Header;