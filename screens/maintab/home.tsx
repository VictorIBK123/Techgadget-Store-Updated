import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, Dimensions, Touchable, TouchableOpacity, StatusBar } from 'react-native';
import HeaderComponent from '../../components/home/headercomponent';
import CategoriesList from '../../components/home/categorieslist';
import HotDealsComp from '../../components/home/hotdealscomp';
import HeaderSearch from '../../components/home/header_search';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { NavigationProp } from '@react-navigation/native';
import useGetDocs from '../../hooks/get_docs';
import { UserDetails } from '../../contexts/myContext';
import PopularComp from '../../components/home/popular';
import NewArrivalsComp from '../../components/home/new_arrivals';
import { auth } from '../../firebase-config';

type HomeScreenNavigationProp = NavigationProp<any>;
const HomeScreen = ({navigation}: {navigation: HomeScreenNavigationProp}) => {
    const {height, width}= Dimensions.get('window');
    const [categoriesInHome, setCategoriesInHome] = useState<{name: string, key: string, img_url: string}[]>([])
    const [textToSearch, setTextToSearch] = useState<string>('')
    const mainPageOpacity = useSharedValue(1)
    const mainPageAnimatedStyle= useAnimatedStyle(()=>({opacity:mainPageOpacity.value}))
    const textInputRef = React.useRef<TextInput|null>(null);
    const defaultTextInputConRef = useRef<View>(null);
    const headerComponentScaleY = useSharedValue(1)
    const headerComponentOpacity = useSharedValue(1)
    const headerScaleY = useSharedValue(0)
    const headerOpacity = useSharedValue(0)
    const headerTop = useSharedValue(-100)
    const top = useSharedValue(0) //80
    // This is for the home screen
    const headerSearchRef = useRef<View>(null)
    // This is for the search screen
    const scrollViewRef = useRef<Animated.ScrollView>(null)
    const context = useContext(UserDetails)
    const headerAnimatedStyle = useAnimatedStyle(()=>({transform:[{scaleY:headerScaleY.value}], opacity:headerOpacity.value, top:headerTop.value}))
    const headerComponentAnimatedStyle = useAnimatedStyle(()=>({transform:[{scaleY:headerComponentScaleY.value}], opacity:headerComponentOpacity.value}))
    const topStyle =useAnimatedStyle(()=>({top:top.value}))
    
    useEffect(()=>{
        (async()=>{
            await useGetDocs('categories',setCategoriesInHome,context?.userEmail)
        })()
    },[])
    const bringUpSearch =()=>{
        textInputRef.current?.focus()
        headerComponentScaleY.value = withTiming(0,{duration:50})
        headerComponentOpacity.value = withTiming(0,{duration:50})
        headerScaleY.value = withTiming(1,{duration:50})
        headerOpacity.value = withTiming(1,{duration:50})
        top.value = withTiming(-120,{duration:500})
        headerTop.value = withTiming(0,{duration:500})
        
    }
    //  when scrolling down
    const handleScroll =(event: any)=>{
            if (defaultTextInputConRef.current){
                defaultTextInputConRef.current?.measure((x, y, width, height, pX, pY)=>{
                    if (pY<=10 ){
                        headerComponentScaleY.value = withTiming(0,{duration:0})
                        headerComponentOpacity.value = withTiming(0,{duration:0})
                        headerScaleY.value = withTiming(1,{duration:0})
                        headerOpacity.value = withTiming(1,{duration:0})
                        top.value = withTiming(-120,{duration:0})
                        headerTop.value = withTiming(0,{duration:0})
                    }
                })
            }
    }
    // This is for bringing down search if brought up by scrolling
    const bringDownSearch2 =()=>{
        textInputRef.current?.blur()
        headerComponentScaleY.value = withTiming(1,{duration:500})
        headerComponentOpacity.value = withTiming(1,{duration:500})
        headerScaleY.value = withTiming(0,{duration:500})
        headerOpacity.value = withTiming(0,{duration:500})
        top.value = withTiming(0,{duration:500})
        scrollViewRef.current?.scrollTo({x:0,y:0,animated:true})
        headerTop.value = withTiming(-100,{duration:500})
    }
    return (
        <View style={{ flex: 1, }}>
            <StatusBar barStyle='dark-content' backgroundColor={'#572C4B'} />
            <Animated.View style={[{transformOrigin: 'center top', position:'absolute', zIndex:10, width:'100%', }, headerAnimatedStyle]}>
                    <HeaderSearch bringDownSearch2={bringDownSearch2}  textInputRef={textInputRef} setTextToSearch={setTextToSearch}  />
            </Animated.View>
            <Animated.ScrollView ref={scrollViewRef} scrollEventThrottle={16} onScroll={handleScroll} style={[{},mainPageAnimatedStyle ]}>
                <View>
                    <Animated.View style={[{transformOrigin: 'center top'},headerComponentAnimatedStyle]}>
                        <HeaderComponent navigation={navigation} headerSearchRef={headerSearchRef} defaultTextInputConRef={defaultTextInputConRef} onTextInputClicked={bringUpSearch} />
                    </Animated.View>
                    <Animated.View style={topStyle}>
                        <CategoriesList categories={categoriesInHome} navigation={navigation} />
                        <HotDealsComp categories={categoriesInHome} navigation={navigation} />
                        <PopularComp categories={categoriesInHome} navigation={navigation} />
                        <NewArrivalsComp categories={categoriesInHome} navigation={navigation} />
                    </Animated.View>
                </View>
            </Animated.ScrollView>
        </View>
    );
};



export default HomeScreen;



