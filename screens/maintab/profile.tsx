import { SafeAreaView, TouchableOpacity, View, Text } from "react-native"
import Header from "../../components/profile/header"
import React, { useContext, useState } from "react"
import { NavigationProp } from "@react-navigation/native"
import { MainComp } from "../../components/profile/main-comp"
import { AllUserDetails, UserDetails } from "../../contexts/myContext"


interface ProfileScreenProps{
    navigation: NavigationProp<any>
}
export const ProfileScreen:React.FC<ProfileScreenProps> =({navigation})=>{
    const allUserDetails= useContext(AllUserDetails)
    const [inputDisabled, setInputDisabled] = useState<boolean>(true)
    const userContext = useContext(UserDetails)
    if (userContext?.userEmail) {
        return (
            <SafeAreaView style={{flex:1}}>
                <Header navigation={navigation}/>
                <MainComp allUserDetails={allUserDetails} setInputDisabled={setInputDisabled} inputDisabled={inputDisabled} />
            </SafeAreaView>
        )
    }
    else{
         return(
            <View style={{justifyContent:'center', alignItems:'center',flexDirection:'row', flex:1, marginHorizontal:10}}>
                <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                    <Text style={{color:'blue', fontSize:16}}>Login</Text>
                </TouchableOpacity>
                <Text style={{marginHorizontal:10}}>or</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('create_account')}>
                    <Text style={{color:'blue', fontSize:16}}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={{marginHorizontal:10}}>to continue</Text>
            </View>
        )
    }
    
}