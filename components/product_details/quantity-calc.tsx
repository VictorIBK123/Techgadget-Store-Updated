import React, { useState } from 'react';
import { View, Text,  TouchableHighlight } from 'react-native';

interface QuantityCalcProps {
    initialQuantity?: number;
}

const QuantityCalc: React.FC<QuantityCalcProps> = ({ initialQuantity = 1 }) => {
    const [quantity, setQuantity] = useState<number>(initialQuantity);

    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

    return (
        <View style={{backgroundColor:'white', paddingHorizontal:15, paddingBottom:20}} >
            <Text style={{fontSize:13, fontWeight:'500', marginTop:20,marginBottom:10}}>Quantity</Text>
            <View style={{flexDirection:'row', alignItems:'center', }}>
                <TouchableHighlight underlayColor={'green'} onPress={decrement} style={{paddingHorizontal:25, borderRightWidth:0.5, paddingVertical:12, borderTopLeftRadius:20, borderBottomLeftRadius:20, backgroundColor:'#E0E0E0'}}>
                    <Text>-</Text>
                </TouchableHighlight>
                <View style={{paddingHorizontal:25, paddingVertical:12,  borderRightWidth:0.5,backgroundColor:'#E0E0E0'}}>
                    <Text >{quantity}</Text>
                </View>
                <TouchableHighlight underlayColor={'green'} onPress={increment} style={{paddingHorizontal:25, paddingVertical:12,  borderLeftWidth:0, borderTopRightRadius:20, borderBottomRightRadius:20, backgroundColor:'#E0E0E0'}}> 
                    <Text >+</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};



export default QuantityCalc;