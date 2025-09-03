import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { UserDetails } from '../../contexts/myContext';
import { StatusBar } from 'expo-status-bar';
import { NavigationProp, RouteProp } from '@react-navigation/native';


type PersonalInformationProps = {
    navigation: NavigationProp<any>,
    route: RouteProp<any>
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ navigation, route }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const emailContext= useContext(UserDetails)
    const [values, setValues]= useState<{firstName: string, lastName: string, dateOfBirth: string, country: string,state:string, address1:string, address2:string, city:string, zip:string}>({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        country: '',
        state: '',
        address1: '',
        address2: '',
        city: '',
        zip: ''
    });
    const [valids, setValids]= useState<{firstName: boolean, lastName: boolean, dateOfBirth: boolean, country: boolean, state: boolean, address1: boolean, address2: boolean, city: boolean, zip: boolean}>({
        firstName: false,
        lastName: false,
        dateOfBirth: false,
        country: false,
        state: false,
        address1: false,
        address2: false,
        city: false,
        zip: false
    });
    useEffect(()=>{
        const validsValues= Object.values(valids)
        if (validsValues.filter(element=>element).length===validsValues.length){
            setAllInputsValid(true)
        }
        else{
            setAllInputsValid(false)
        }
    },[valids])
    const [allInputsValid, setAllInputsValid]= useState<boolean>(false)
    const inputChanged =(type:string, text:string)=>{
        switch (type) {
            case 'firstName':
                setValues({...values, firstName:text})
                setValids({...valids, firstName:text.length>0 && !text.trim().includes(' ')})
                break;
            case 'lastName':
                setValues({...values, lastName:text})
                setValids({...valids, lastName:text.length>0 && !text.trim().includes(' ')})
                break;
            case 'dateOfBirth':
                setValues((text.length==2 || text.length==5) && text.length>0 && text.length>values.dateOfBirth.length? {...values, dateOfBirth:text+'/'} : {...values, dateOfBirth:text})
                setValids({...valids, dateOfBirth:text.length==10 && !text.trim().includes(' ')})
                break;
            case 'country':
                setValues({...values, country:text})
                setValids({...valids, country:text.length>0 && !text.trim().includes(' ')})
                break;
            case 'state':
                setValues({...values, state:text})
                setValids({...valids, state:text.length>0 && !text.trim().includes(' ')})
                break;
            case 'address1':
                setValues({...values, address1:text})
                setValids({...valids, address1:text.length>0 })
                break;
            case 'address2':
                setValues({...values, address2:text})
                setValids({...valids, address2:text.length>0 })
                break;
            case 'city':
                setValues({...values, city:text})
                setValids({...valids, city:text.length>0 && !text.trim().includes(' ')})
                break;
            case 'zip':
                setValues({...values, zip:text})
                setValids({...valids, zip:text.length>0 && !text.trim().includes(' ')})
                break;
        }
    }
    const continueButtonHandler =async()=>{
        setLoading(true)
        // Add a new document in collection "cities"
        try {
            emailContext?.setUserEmail(route.params?.email)
            await setDoc(doc(db, "users", route.params?.email), {...values, cart:[], orders:[]});
            setLoading(false)
            navigation.navigate('main')
        } catch (error) {
            setLoading(false)
            alert(error)
        }

    }
    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.label}>First name  *</Text>
            <View style={styles.inputView}>
                <TextInput onChangeText={(text)=>inputChanged('firstName', text)} style={styles.textInput} value={values?.firstName} placeholder='First name' />
            </View>
            <View style={{ marginLeft:10, marginBottom:12}}>
                    {!valids.firstName && <Text style={{color:'#dd3333'}}>Please enter your first name correctly</Text>}
                    {valids.firstName && <Text style={{ color:'green'}}>Input rules passed</Text>}
            </View>
            <Text style={styles.label}>Last name  *</Text>
            <View style={styles.inputView}>
                <TextInput onChangeText={(text)=>inputChanged('lastName', text)} style={styles.textInput} value={values?.lastName} placeholder='Last name' />
            </View>
            <View style={{ marginLeft:10, marginBottom:12}}>
                    {!valids.lastName && <Text style={{color:'#dd3333'}}>Please enter your last name correctly</Text>}
                    {valids.lastName && <Text style={{ color:'green'}}>Input rules passed</Text>}
            </View>
            <Text style={styles.label} >Date of Birth</Text>
            <View style={styles.inputView}>
                <AntDesign style={styles.iconB4} name="calendar" size={18} color="black" />
                <TextInput style={styles.textInput} maxLength={10}keyboardType='numeric' onChangeText={(text)=>inputChanged('dateOfBirth', text)} value={values?.dateOfBirth} placeholder='dd/mm/yyyy' />
            </View>
            <View style={{ marginLeft:10, marginBottom:12}}>
                    {!valids.dateOfBirth && <Text style={{color:'#dd3333'}}>Please enter correct date of birth</Text>}
                    {valids.dateOfBirth && <Text style={{ color:'green'}}>Input rules passed</Text>}
            </View>
            <Text style={styles.label}>Country of Residence</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} onChangeText={(text)=>inputChanged('country', text)} value={values?.country} placeholder='Select' />
                <AntDesign style={styles.eyeIcon} name="caretdown" size={15} color="#6B777F" />
            </View>
            <View style={{ marginLeft:10, marginBottom:12}}>
                    {!valids.country && <Text style={{color:'#dd3333'}}>Please enter your country's name correctly</Text>}
                    {valids.country && <Text style={{ color:'green'}}>Input rules passed</Text>}
            </View>
            <Text style={styles.label}>State/Territory</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} onChangeText={(text)=>inputChanged('state', text)} value={values?.state} placeholder='State/Territory' />
                <AntDesign style={styles.eyeIcon} name="caretdown" size={15} color="#6B777F" />
            </View>
            <View style={{ marginLeft:10, marginBottom:12}}>
                    {!valids.state && <Text style={{color:'#dd3333'}}>Please enter your state's name correctly</Text>}
                    {valids.state && <Text style={{ color:'green'}}>Input rules passed</Text>}
            </View>
            <Text style={styles.label}>Address line 1</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} onChangeText={(text)=>inputChanged('address1', text)} value={values?.address1} placeholder='Address line 1' />
            </View>
            <View style={{ marginLeft:10, marginBottom:12}}>
                    {!valids.address1 && <Text style={{color:'#dd3333'}}>Please enter correct address</Text>}
                    {valids.address1 && <Text style={{ color:'green'}}>Input rules passed</Text>}
            </View>
            <Text style={styles.label}>Address line 2</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} onChangeText={(text)=>inputChanged('address2', text)} value={values?.address2} placeholder='Address line 2' />
            </View>
            <View style={{ marginLeft:10, marginBottom:12}}>
                    {!valids.address2 && <Text style={{color:'#dd3333'}}>Please enter correct address</Text>}
                    {valids.address2 && <Text style={{ color:'green'}}>Input rules passed</Text>}
            </View>
            <Text style={styles.label}>City</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} value={values?.city} onChangeText={(text)=>inputChanged('city', text)} placeholder='Address' />
            </View>
            <View style={{ marginLeft:10, marginBottom:12}}>
                    {!valids.city && <Text style={{color:'#dd3333'}}>Please enter your city's name correctly</Text>}
                    {valids.city && <Text style={{ color:'green'}}>Input rules passed</Text>}
            </View>
            <Text style={styles.label}>Postal/Zip Code</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} keyboardType='numeric' value={values?.zip} onChangeText={(text)=>inputChanged('zip', text)} placeholder='Postal' />
            </View>
            <View style={{ marginLeft:10, marginBottom:12}}>
                    {!valids.zip && <Text style={{color:'#dd3333'}}>Please enter your postal/zip code correctly</Text>}
                    {valids.zip && <Text style={{ color:'green'}}>Input rules passed</Text>}
            </View>
            {!loading && <TouchableOpacity disabled={!allInputsValid} onPress={continueButtonHandler} style={styles.signUpContainer}>
                <Text style={styles.signUp}>Continue</Text>
            </TouchableOpacity>}
            { loading && <ActivityIndicator size={'large'} color={'blue'} animating={loading} />}        
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:30,
        paddingHorizontal:20
    },
    label:{
        alignItems:'center',
        fontSize:14,
        marginBottom:10,
        // fontWeight:'100'
    },
    inputView:{
        flexDirection:'row',
        backgroundColor:'white',
        elevation:3,
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:10,
    },
    iconB4:{
        alignSelf:'center',
        marginRight:10,

    },
    textInput:{
        alignSelf:'center',
        width:'100%'
    },
    eyeIcon:{
        position:'absolute',
        right:10,
        alignSelf:'center',
        marginLeft:50
    },
    signUpContainer:{
        backgroundColor:'#2F1528',
        paddingVertical:15,
        borderRadius:20,
        marginVertical:20,
    },
    signUp:{
        textAlign:'center',
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    },
    alreadyHaveAccount:{
        fontSize:16,
        fontWeight:'500',
        letterSpacing:0,
        textAlign:'center',
        marginTop:10
    }
});

export default PersonalInformation;