import React, { useContext, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AllUserDetails } from '../../contexts/myContext';

const DeliveryDetails = () => {
    const allUserDetails = useContext(AllUserDetails)
    // for phone number part
    const [phone, setPhone] = useState<string>('0000000000')
    const [enableIn1, setEnableIn1] = useState<boolean>(false)
    const ref1 = useRef<TextInput>(null)

    // for address part
    const [address, setAddress] = useState<string|undefined>(allUserDetails?.values.address1)
    const [enableIn2, setEnableIn2] = useState<boolean>(false)
    const ref2 = useRef<TextInput>(null)
    return (
        <View style={{flex:4.6/10, }}>
            <View style={{paddingHorizontal:10, paddingVertical:10, }}>
                <Text style={{fontSize:14, fontWeight:'500'}}>Delivery details</Text>
            </View>
            <View style={{backgroundColor:'#ffffff', paddingVertical:10}}>
                <View style={[styles.orderSummaryItemContainer, ]}>
                    <View>
                        <Text style={styles.orderSummaryLeftText}>Customer name</Text>
                    </View>
                    <View>
                        <Text style={{fontSize:14}}>{allUserDetails?.values.firstName} {allUserDetails?.values.lastName}</Text>
                    </View>
                </View>
                <View style={[styles.orderSummaryItemContainer, {flexDirection:'row', justifyContent:'space-between'}]}>
                    <View>
                        <View>
                            <Text style={styles.orderSummaryLeftText}>Phone number</Text>
                        </View>
                        <View>
                            <TextInput onEndEditing={()=>setEnableIn1(false)} onChangeText={(text:string)=>setPhone(text)} maxLength={11} keyboardType='number-pad' ref={ref1} editable={enableIn1} style={{fontSize:14, color:'black'}} value={phone}/>
                        </View>
                    </View>
                    {!enableIn1 && <TouchableOpacity  onPress={()=>{setEnableIn1(true);ref1.current?.focus()}} style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:12, marginRight:3, color:'#2F1528', fontWeight:400}}>Change</Text>
                        <AntDesign name="right" size={15} color="#2F1528" />
                    </TouchableOpacity>}
                </View>
                <View style={[styles.orderSummaryItemContainer,{flexDirection:'row', justifyContent:'space-between'}]}>
                    <View>
                        <View>
                            <Text style={[styles.orderSummaryLeftText,]}>Delivery address</Text>
                        </View>
                        <View>  
                            <TextInput  ref={ref2} editable={enableIn2} keyboardType='default' onChangeText={(text:string)=>setAddress(text)} onEndEditing={()=>setEnableIn2(false)} style={{fontSize:14, fontWeight:'500', color:'black'}} value={address}  />
                        </View>
                    </View>
                    {!enableIn2 && <TouchableOpacity onPress={()=>{setEnableIn2(true);ref2.current?.focus()}} style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{fontSize:12, marginRight:3, color:'#2F1528', fontWeight:'400'}}>Change</Text>
                        <AntDesign name="right" size={15} color="#2F1528" />
                    </TouchableOpacity>}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    orderSummaryItemContainer:{
        flexDirection:'column',
        paddingHorizontal:17,
        paddingVertical:10,
        justifyContent:'space-between',
        alignItems:'flex-start'
    },
    orderSummaryLeftText:{
        color:'#8E9295',
        fontSize:14,
        fontWeight:'500'
    }
})


export default DeliveryDetails;