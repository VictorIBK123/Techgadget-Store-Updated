import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import {Fontisto } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase-config";
import { StackNavigationProp } from "@react-navigation/stack";

type Prop={
    navigation: StackNavigationProp<any>
}
const ForgotPasswordComp:React.FC<Prop> = ({navigation}) =>{
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [validated, setValidated] = useState<boolean>(false)
    const [emailSent, setEmailSent] = useState<boolean>(false)
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    useEffect(()=>{
        if (!re.test(email)){
            setValidated(false)
        }
        else{
            setValidated(true)
        }
    },[email])
    const resetPassword =async()=>{
        setLoading(true)
        try {
            await sendPasswordResetEmail(auth,email)
            setEmailSent(true)
        } catch (error) {
            alert(error)
        }
        setLoading(false)
    }
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{width:'85%', marginBottom:50, fontSize:18, fontWeight:'bold', }}>Email reset</Text>
            <Text style={{width:'85%', marginBottom:10}}>Enter your email address</Text>
            <View style={styles.inputView}>
                <Fontisto style={styles.iconB4} name="email" size={18} color="black" />
                <TextInput keyboardType='email-address'  onChangeText={(text)=>setEmail(text)} value={email} style={styles.textInput} placeholder='Email' />
            </View>
            {emailSent && <Text style={{width:'85%', color:'#444444', marginTop:10}}>A password reset email has been sent to {email}</Text>}
            <View style={{marginTop:45, width:'85%'}}>
                {!loading && !emailSent && <TouchableOpacity onPress={resetPassword} disabled={!validated} style={{opacity:validated?1:0.5,alignSelf:'flex-end', backgroundColor:'#2F1528',paddingHorizontal:20, paddingVertical:5, borderRadius:5,}} >
                    <Text style={{color:'white'}}>Send</Text>
                </TouchableOpacity>}
                {emailSent && <TouchableOpacity onPress={()=>navigation.navigate('login')} disabled={!validated} style={{opacity:validated?1:0.5,alignSelf:'flex-end', backgroundColor:'#2F1528',paddingHorizontal:20, paddingVertical:5, borderRadius:5,}} >
                    <Text style={{color:'white'}}>Go to login</Text>
                </TouchableOpacity>}
                <ActivityIndicator style={{alignSelf:'flex-end',paddingHorizontal:10 }} animating={loading} color="blue" size={30}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    inputView:{
        flexDirection:'row',
        backgroundColor:'white',
        elevation:10,
        paddingVertical:10,
        paddingHorizontal:10,
        borderRadius:10,
        width:'85%',
    },
    iconB4:{
        alignSelf:'center',
        marginRight:10,

    },
    textInput:{
        alignSelf:'center',
        width:'100%'
    },
})
export default ForgotPasswordComp