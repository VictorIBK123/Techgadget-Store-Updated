import React, { Dispatch, SetStateAction } from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
    textInputRef: React.RefObject<TextInput|null>;
    setTextToSearch: Dispatch<SetStateAction<string>>,
    setShowSearchBarOnly?:Dispatch<SetStateAction<boolean>>,
    bringDownSearch2?: ()=>void
}

const HeaderSearch: React.FC<HeaderProps> = ({ textInputRef,setTextToSearch, bringDownSearch2}) => {
    
    return (
        <View  style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingTop:10, paddingBottom:5, paddingHorizontal:13, backgroundColor:'#ffffff',flex:2/20,}}>
            <TouchableOpacity onPress={bringDownSearch2 } style={{}}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <View style={{backgroundColor:'#FBFBFB',paddingVertical:5, borderRadius:30, paddingHorizontal:30,width:'70%', borderWidth:1, borderColor:'#f1f1f1'}}>
                <TextInput onChangeText={(text)=>setTextToSearch(text)} ref={textInputRef} style={{width:'100%', alignSelf:'center'}} />
            </View>
            <TouchableOpacity style={{justifyContent:'flex-end', backgroundColor:'#FBFBFB', borderRadius:50,padding:17 }}>
                <Image  style={{alignSelf:'center'}} source={require('../../assets/filter-dark.png')} />
            </TouchableOpacity>
        </View>
    );
};

export default HeaderSearch;