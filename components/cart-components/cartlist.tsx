import { View, TouchableHighlight,Image,Text, TouchableOpacity } from "react-native";
import { AProductData } from "../../Types/product_data";
import React, { memo } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface cartItem{
    item:AProductData, 
    index:number , 
    calcQuantity:(operation:string, index:number)=>void,
    removeFromCart: (item: AProductData)=>void
}
const CartItemComp:React.FC<cartItem> =({item, index, calcQuantity, removeFromCart}) => (
    <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:20, alignItems:'center', paddingHorizontal:0, borderBottomWidth:2, borderColor:'#F7F7F7',}}>
        <TouchableOpacity onPress={()=>removeFromCart(item)} style={{flex:0.3/3, alignItems:'center', justifyContent:'center',opacity:0.8}} >
                <MaterialIcons name="delete" size={24} color="black" />
        </TouchableOpacity>
        <View style={{flexDirection:'row', alignItems:'center',flex:1.8/3, }}>
            <View style={{marginRight:10, borderColor:'#F7F7F7', borderWidth:1, padding:3, borderRadius:5}}>
                <Image style={{height:45, width:45}} source={{uri: item.img_url}} />
            </View>
            <View>
                <Text adjustsFontSizeToFit={true}  style={{marginBottom:5, fontWeight:'500',overflow:'hidden', width:160}}>{item.name}</Text>
                <Text style={{fontSize:12, color:'#8E9295'}}>₦{parseInt(item.price).toLocaleString()}</Text>
            </View>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', flex:0.9/3}}>
            <TouchableHighlight underlayColor={'green'} onPress={()=>calcQuantity('subtract', index)} style={{paddingHorizontal:14, borderRightWidth:0.5, paddingVertical:7, borderTopLeftRadius:20, borderBottomLeftRadius:20, backgroundColor:'#E0E0E0'}}>
                <Text>-</Text>
            </TouchableHighlight>
            <View style={{paddingHorizontal:10, paddingVertical:7,  borderRightWidth:0.5,backgroundColor:'#E0E0E0'}}>
                <Text >{item.quantity}</Text>
            </View>
            <TouchableHighlight underlayColor={'green'} onPress={()=>calcQuantity('add', index)} style={{paddingHorizontal:14, paddingVertical:7,  borderLeftWidth:0, borderTopRightRadius:20, borderBottomRightRadius:20, backgroundColor:'#E0E0E0'}}> 
                <Text >+</Text>
            </TouchableHighlight>
        </View>
            
        
    </View>
)
export default memo(CartItemComp)