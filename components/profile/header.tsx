import React from 'react';
import { View, Text,  TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { NavigationProp } from '@react-navigation/native';
import { auth } from '../../firebase-config';

type HeaderProps = {
    navigation: NavigationProp<any>;
};

const Header = ({ navigation }: HeaderProps) => {
    return (
        <View style={{flexDirection:'row',elevation:10, paddingBottom:5,paddingHorizontal:15, backgroundColor:'white', paddingTop:5, alignItems:'center', zIndex:10, width:'100%', flex:1/10}}>
            {auth.currentUser?.email && <TouchableOpacity onPress={()=>{auth.signOut();navigation.navigate('main',{screen:'home'})}} style={{position:'absolute', top:20, right:10, borderRadius:10, elevation:2, paddingHorizontal:20, paddingVertical:5}}>
                <Text style={{color:'blue', fontSize:16}}>Log out</Text>
            </TouchableOpacity>}
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginRight:30}}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{fontSize:18, fontWeight:'600'}}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};


export default Header;