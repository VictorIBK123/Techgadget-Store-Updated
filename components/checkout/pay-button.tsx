import React, { Dispatch, SetStateAction } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { ProductsData } from '../../Types/product_data';

interface Props{
    addToOrder: ()=>void,
    addingToOrder: boolean
}
const PayButton: React.FC<Props> = ({addToOrder, addingToOrder}) => {
    
    return (
        <View style={{ paddingHorizontal:10, paddingVertical:10, flex:1/10 }}>
            <TouchableOpacity onPress={addToOrder} disabled={addingToOrder} style={{backgroundColor:'#2F1528', justifyContent:'center', alignItems:'center', paddingVertical:15, borderRadius:30}}>
                {/* <Text style={{color:'#ffffff'}}>Make payment</Text> */}
                <Text style={{color:'#ffffff'}}>Order now</Text>
            </TouchableOpacity>
        </View>
        );
};


export default PayButton;