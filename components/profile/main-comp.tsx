
import { doc, updateDoc } from 'firebase/firestore';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { db } from '../../firebase-config';
import {  UserDetails } from '../../contexts/myContext';
import { Snackbar } from 'react-native-paper';



interface InputProps extends TextInputProps {
  inputDisabled: boolean,
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: object;
}
interface valuesType{
    address1:string, 
    address2:string, 
    city: string, 
    country:string, 
    dateOfBirth: string, 
    firstName:string, 
    lastName: string, 
    state: string, 
    zip:string, 
}
interface MainCompProps{
    setInputDisabled: Dispatch<SetStateAction<boolean>>,
    inputDisabled: boolean,
    allUserDetails: {values: valuesType, setValues: Dispatch<SetStateAction<valuesType>>  }|undefined
}
export const MainComp: React.FC<MainCompProps> = ({setInputDisabled, inputDisabled, allUserDetails}) => {
  const [sthChanged, setSthChanged] = useState<boolean>(false)
  const [snackBarVisible, setSnackBarVisible] = useState<boolean>(false)
  const userEmailContext = useContext(UserDetails)
   const [saving, setSaving] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>(allUserDetails?.values.firstName || '');
    const [lastName, setLastName] = useState<string>(allUserDetails?.values.lastName || '');
    const [dateOfBirth, setDateOfBirth] = useState<string>(allUserDetails?.values.dateOfBirth || '');
    const [address1, setAddress1] = useState<string>(allUserDetails?.values.address1 || '');
    const [address2, setAddress2] = useState<string>(allUserDetails?.values.address2 || '');
    const [city, setCity] = useState<string>(allUserDetails?.values.city || '');
    const [state, setState] = useState<string>(allUserDetails?.values.state || '');
    const [zip, setZip] = useState<string>(allUserDetails?.values.zip || '');
    const [country, setCountry] = useState<string>(allUserDetails?.values.country || '');

  useEffect(()=>{
    setFirstName(allUserDetails?.values.firstName||'')
    setLastName(allUserDetails?.values.lastName||'')
    setDateOfBirth(allUserDetails?.values.dateOfBirth || '')
    setAddress1(allUserDetails?.values.address1||'')
    setAddress2(allUserDetails?.values.address2||'')
    setCity(allUserDetails?.values.city||'')
    setState(allUserDetails?.values.state||'')
    setZip(allUserDetails?.values.zip||'')
    setCountry(allUserDetails?.values.country||'')
  },[allUserDetails?.values])

  const handleChange = (key: string,  value: string) => {
    switch (key) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'dateOfBirth':
        setDateOfBirth(value);
        break;
      case 'address1':
        setAddress1(value);
        break;
      case 'address2':
        setAddress2(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'state':
        setState(value);
        break;
      case 'zip':
        setZip(value);
        break;
      case 'country':
        setCountry(value);
        break;
    }
  };
  const saveChanges = async()=>{
    setSaving(true)
      await updateDoc((doc(db,'users',userEmailContext?.userEmail||'')),{
        firstName,lastName,dateOfBirth,address1,address2,city,state,zip,country
      })
      .then(()=>{
        setSnackBarVisible(true)
        setSthChanged(false)
        setInputDisabled(true);
        allUserDetails?.setValues({firstName,lastName,dateOfBirth,address1,address2,city,state,zip,country});
        setSaving(false)})
      .catch((e)=>{alert(e);setSaving(false)})
    }
  return (
    <View style={{flex:9/10}}>
    <ScrollView contentContainerStyle={styles.container}>
        
      <View style={styles.fieldGroup}>
        <Input inputDisabled={inputDisabled} label="First Name" value={firstName} onChangeText={(val) => handleChange('firstName', val)} />
        <Input inputDisabled={inputDisabled} label="Last Name" value={lastName} onChangeText={(val) => handleChange('lastName', val)} />
        <Input inputDisabled={inputDisabled} label="Date of Birth" value={dateOfBirth} onChangeText={(val) => handleChange('dateOfBirth', val)} placeholder="MM-DD-YYYY" />
        <Input inputDisabled={inputDisabled} label="Address 1" value={address1} onChangeText={(val) => handleChange('address1', val)} placeholder="" />
        <Input inputDisabled={inputDisabled} label="Address 2" value={address2} onChangeText={(val) => handleChange('address2', val)} placeholder="" />

        

        <View style={styles.row}>
          <Input
            inputDisabled={inputDisabled}
            label="City"
            value={city}
            onChangeText={(val) => handleChange('city', val)}
            containerStyle={styles.halfInput}
          />
          <Input
            inputDisabled={inputDisabled}
            label="State"
            value={state}
            onChangeText={(val) => handleChange('state', val)}
            containerStyle={styles.halfInput}
          />
        </View>

        <View style={styles.row}>
          <Input
            inputDisabled={inputDisabled}
            label="ZIP Code"
            value={zip}
            onChangeText={(val) => handleChange('zip', val)}
            containerStyle={styles.halfInput}
          />
          <Input
            inputDisabled={inputDisabled}
            label="Country"
            value={country}
            onChangeText={(val) => handleChange('country', val)}
            containerStyle={styles.halfInput}
          />
        </View>
      </View>

      {(!inputDisabled && !saving) &&  <TouchableOpacity onPress={saveChanges} style={[styles.saveButton,]}>
        <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
      </TouchableOpacity>}
      {saving && <ActivityIndicator size={'large'}  style={{ alignSelf:'center', marginTop:5}} color={'blue'} />}
      {inputDisabled && <TouchableOpacity onPress={()=>setInputDisabled(false)} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>EDIT PROFILE</Text>
      </TouchableOpacity>}
      <Snackbar 
        onDismiss={()=>setSnackBarVisible(false)}
        visible={snackBarVisible}
        duration={5000}
        icon={()=><MaterialIcons name="cancel" size={24} color="white" />}
        onIconPress={()=>setSnackBarVisible(false)}
    >
        <Text style={{color:'white'}}>Profile updated successfully!</Text>
    </Snackbar>
    </ScrollView>
    </View>
  );
};

const Input: React.FC<InputProps> = ({inputDisabled, label, value, onChangeText, containerStyle, ...props }) => (
  <View style={[styles.inputContainer, containerStyle]}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
    
      editable={!inputDisabled}
      value={value}
      onChangeText={onChangeText}
      style={styles.textInput}
      placeholderTextColor="#999"
      {...props}
    />
    
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal:20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#111',
  },
  fieldGroup: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#f9f9f9',
    elevation:1,
  },
  saveButton: {
    marginTop: 30,
    marginBottom:20,
    backgroundColor: '#2F1528',
    paddingVertical: 14,
    borderRadius: 12,
    
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

