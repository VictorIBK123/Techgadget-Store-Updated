import React from 'react';
import { View, Text, } from 'react-native';
import { AProductData } from '../../Types/product_data';
import Markdown from 'react-native-markdown-display';

type OtherDetailsProps = {
   productData: AProductData
};

const OtherDetails: React.FC<OtherDetailsProps> = ({productData }) => {
    return (
        <View style={{backgroundColor:'white',paddingHorizontal:15, paddingVertical:20}} >
            <Text style={{fontSize:15,fontWeight:'500', }}>{productData.name}</Text>
            <View style={{flexDirection:'row', marginTop:4, alignItems:'center'}}>
                <Text style={{marginRight:10, fontSize:19}}>₦{parseFloat(productData.price).toLocaleString()}</Text>
                <Text style={{color:'#515151', fontSize:15, textDecorationLine:'line-through', textDecorationStyle:'solid'}}>₦{(parseFloat(productData.price)+ ((10/100)*parseFloat(productData.price))).toLocaleString()}</Text>
            </View>
            {/* style={{fontWeight:'500', fontSize:13.5, color:'#515151', marginBottom:10 */}
            <Markdown style={{
                body:{fontWeight:'500', fontSize:13.5, color:'#515151', marginBottom:20,paddingTop:20, letterSpacing:0.3},
                heading3:{marginVertical:20, color:'black', fontWeight:'500', marginBottom:8},
                bullet_list:{paddingBottom:20},
                }} >{productData.description}</Markdown>
            <Text><Text style={{fontSize:13}}>Color:</Text> <Text style={{color: '#515151', fontWeight:'500', fontSize:13}}>Lilac</Text></Text>
        </View>
    );
};


export default OtherDetails;