import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image,TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AllUserDetails } from '../../contexts/myContext';
import { auth } from '../../firebase-config';
import { NavigationProp } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';

interface HeaderComponentProps {
    onTextInputClicked: () => void;
    defaultTextInputConRef: React.RefObject<View|null>;
    headerSearchRef: React.RefObject<View|null>;
    navigation: NavigationProp<any>
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({headerSearchRef, onTextInputClicked, defaultTextInputConRef, navigation}) => {
    const UserDetailsContextAll = useContext(AllUserDetails)
    const { values } = UserDetailsContextAll || {};
    const [userLoggedIn, setUserLoggedIn] = useState(false)
        useEffect(()=>{
            const unSub = onAuthStateChanged(auth,(user)=>{
                if (auth.currentUser?.email){
                    setUserLoggedIn(true)
                }
                else{
                    setUserLoggedIn(false)
                }
            })
            return unSub
        },[])
    return (
        <View >
        <LinearGradient
                colors={['#572C4B', '#2F1528']}
                style={{paddingHorizontal:13, borderBottomLeftRadius:30, borderBottomRightRadius:30}}
            >
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:30, marginBottom:45}}>
                    <View>
                        <View style={{flexDirection:'row', marginBottom:15}}>
                            <Image source={require('../../assets/location.png')} style={{height:16, width:12, marginRight:10}} />
                            <Text style={{fontSize:12, color:'white'}}>Location</Text>
                        </View>
                        {userLoggedIn && <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:12, color:'white', marginRight:10}}>{values?.address1}</Text>
                        </TouchableOpacity>}
                        {!userLoggedIn && 
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                                    <Text style={{color:'white', fontWeight:'bold', fontSize:14}}>Login</Text>
                                </TouchableOpacity>
                                <Text style={{marginHorizontal:10, color:'#dddddd', fontSize:14}}>or</Text>
                                <TouchableOpacity onPress={()=>navigation.navigate('create_account')}>
                                    <Text style={{color:'white', fontWeight:'bold', fontSize:14}}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>}
                    </View>
                    <TouchableOpacity style={{backgroundColor:'#FFFFFF1A', padding:10, borderRadius:50}}>
                        <Image  source={require('../../assets/notification.png')} />
                    </TouchableOpacity>
                </View>
                <View  style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:20, }}>
                    <TouchableOpacity ref={defaultTextInputConRef} onPress={onTextInputClicked} style={{flexDirection:'row', alignItems:'center',backgroundColor:'white', borderRadius:30, paddingHorizontal:20, paddingVertical:10 }}>
                        <Image style={{marginRight:10}} source={require('../../assets/search.png')} />
                        <Text style={{width:'70%', color:'#8E9295'}}>Search gadget</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'#FFFFFF1A', padding:10, borderRadius:50}}>
                        <Image source={require('../../assets/filter.png')} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            </View>
    );
};


export default HeaderComponent;