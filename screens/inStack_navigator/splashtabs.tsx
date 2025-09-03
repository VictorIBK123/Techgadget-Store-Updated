import React, { useRef, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { useSharedValue } from 'react-native-reanimated';
import { StackNavigationProp } from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator();


export default function SplashTabs({navigation}: {navigation: StackNavigationProp<any>}) {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const screenDimension = Dimensions.get('screen')
    const progress = useSharedValue<number>(0)
    const  carouselRef = useRef<ICarouselInstance>(null)
    const proceedToNextItem =()=>{
        carouselRef.current?.scrollTo({
            count:1,
            animated:true
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor:'black', justifyContent:'flex-end' }}>
            <Carousel
                data={[
                    {boldText:'Tech Shopping Made Easy & Secure', lightText:'Shop with confidence, secure payments, easy returns, and trusted brands', image:require('../../assets/man-vr.png')},
                    {boldText:'Explore Latest Gadgets', lightText:'Stay Ahead with Cutting-Edge Tech from smartwatches to gaming gear, explore the newest innovations at unbeatable prices', image:require('../../assets/latestgadgets.png')},
                    {boldText:'Get AI-powered product recommendations', lightText:'Our AI-powered suggestions help you choose the best tech based on your needs and preferences', image:require('../../assets/boy-looking-up.png')}
                ]}
                mode='parallax'
                ref={carouselRef}
                loop={false}
                onSnapToItem={(index:number)=>setCurrentIndex(index)}
                onProgressChange={progress}
                width={screenDimension.width}
                modeConfig={{
                    parallaxScrollingScale: 1,
                    parallaxAdjacentItemScale: 0.7,
                }}
                renderItem={({item, index}) => {
                    return (<ImageBackground  source={item.image} style={{ backgroundColor:'white', flex:1,  height:screenDimension.height}} imageStyle={{ flex:1,height:screenDimension.height ,width: screenDimension.width, resizeMode:'cover',opacity:1 }}   >
                        <LinearGradient
                        // Button Linear Gradient
                        colors={['#00000000', '#000000F2']}
                        style={{flex:1, justifyContent:'center'}}
                        >
                            {index!=2 && <TouchableOpacity onPress={()=>navigation.replace('create_account')}  style={{position:'absolute', backgroundColor:'#FFFFFF1A', paddingHorizontal:30,paddingVertical:10,  borderRadius:30, top:30, right:20}} >
                                <Text style={{color:'white', fontSize:14}}>Skip</Text>
                            </TouchableOpacity>}
                            <View style={{paddingHorizontal:15, }} >
                                
                                <Text style={{textAlign:'center', color:'#ffffff', fontWeight:'700', fontSize:24, lineHeight:36, marginBottom:15}}>{item.boldText}</Text>
                                <Text style={{textAlign:'center', color:'#ffffff', fontWeight:'500', fontSize:14, lineHeight:22}}>{item.lightText}</Text>
                            </View>
                            {index==2 && <TouchableOpacity onPress={()=>navigation.replace('create_account')} style={{alignItems:'center',flexDirection:'row',paddingVertical:13, justifyContent:'center', backgroundColor:'#ffffff',   borderRadius:50, marginTop:20, marginHorizontal:10}}>
                                <Text style={{color:'#000000', marginRight:10, fontSize:16, textAlign:'center'}}>Get started</Text>
                                <Image source={require('../../assets/next.png')} style={{height:14, width:20, }} />
                            </TouchableOpacity>}
                        </LinearGradient>
                    </ImageBackground>)
                }}
            />
            <View style={{position:'absolute',bottom:120, width:screenDimension.width}}>
                
                {currentIndex==0 && <View style={{flexDirection:'row', width:56, alignItems:'center', justifyContent:'space-between', alignSelf:'center',marginBottom:30 }}>
                    <View style={{backgroundColor:'#ffffff', width:32,height:8, borderRadius:8 }}>

                    </View>
                    <View style={{backgroundColor:'#ffffff', width:8,height:8, borderRadius:8 }}>

                    </View>
                    <View style={{backgroundColor:'#ffffff', width:8,height:8, borderRadius:8 }}>

                    </View>
                </View>}
                {currentIndex==1 && <View style={{flexDirection:'row', width:56, alignItems:'center', justifyContent:'space-between', alignSelf:'center',marginBottom:30 }}>
                    <View style={{backgroundColor:'#ffffff', width:8,height:8, borderRadius:8 }}>

                    </View>
                    <View style={{backgroundColor:'#ffffff', width:32,height:8, borderRadius:8 }}>

                    </View>
                    <View style={{backgroundColor:'#ffffff', width:8,height:8, borderRadius:8 }}>

                    </View>
                </View>}
                {currentIndex==2 && <View style={{flexDirection:'row', width:56, alignItems:'center', justifyContent:'space-between', alignSelf:'center',marginBottom:30 }}>
                    <View style={{backgroundColor:'#ffffff', width:8,height:8, borderRadius:8 }}>

                    </View>
                    <View style={{backgroundColor:'#ffffff', width:8,height:8, borderRadius:8 }}>

                    </View>
                    <View style={{backgroundColor:'#ffffff', width:32,height:8, borderRadius:8 }}>

                    </View>
                </View>}
                </View>
                {currentIndex!=2 && <TouchableOpacity onPress={()=>{proceedToNextItem()}} style={{alignSelf:'center',alignItems:'center', justifyContent:'center', backgroundColor:'#ffffff', width:20, height:20, padding:30, borderRadius:50,  position:'absolute', bottom:50}}>
                    <Image source={require('../../assets/next.png')} style={{height:14, width:20, }} />
                </TouchableOpacity>}
            
        </View>
    );
}