import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {  StyleSheet, } from 'react-native';
import CheckoutScreen from './screens/inStack_navigator/checkout';
import SplashTabs from './screens/inStack_navigator/splashtabs';
import MainTabs from './screens/inStack_navigator/main';
import ProductDetails from './screens/inStack_navigator/product_details';
import CreateAccount from './screens/auth/createaccount';
import PersonalInformation from './screens/auth/personalinfo';
import Login from './screens/auth/login';
import ProductsInCategory from './screens/inStack_navigator/products_in_category';
import AllCategoriesComp from './screens/inStack_navigator/all_categories';
import { useEffect, useState } from 'react';
import { AllUserDetails, CategoriesContext, UserDetails } from './contexts/myContext';
import ProductsInDeals from './screens/inStack_navigator/products_in_deals';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase-config';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import ForgotPasswordComp from './screens/auth/forgotpassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const Stack = createStackNavigator()
  const [userEmail, setUserEmail] = useState<string|undefined>('')
  const [categoriesGlobal, setCategoriesGlobal] = useState<{name: string, key: string, img_url: string}[]>([])
  const [values, setValues] = useState<{
      address1:string, 
      address2:string, 
      city: string, 
      country:string, 
      dateOfBirth: string, 
      firstName:string, 
      lastName: string, 
      state: string, 
      zip:string, 
  }>({
      address1: '',
      address2: '',
      city: '',
      country: '',
      dateOfBirth: '',
      firstName: '',
      lastName: '',
      state: '',
      zip: '',
  })
  useEffect(()=>{
    (
      async()=>{
        if (userEmail && userEmail.length>0){
          const snapShot = await getDoc(doc(db,'users',userEmail))
          const data = snapShot.data();
          if (data) {
            setValues({
              address1: data.address1 || '',
              address2: data.address2 || '',
              city: data.city || '',
              country: data.country || '',
              dateOfBirth: data.dateOfBirth || '',
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              state: data.state || '',
              zip: data.zip || '',
            });
          }
          
        }
      }
    )()
  },[userEmail])
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if (!auth.currentUser?.email){
        setUserEmail(undefined)
      }
    })
  },[])
  // useEffect(()=>{
  //   (async()=>{
  //     try {
  //       const storageData = await AsyncStorage.getItem('userEmail')
  //       if (storageData){
  //         const jsonData: {userEmail: string}= JSON.parse(storageData)
  //         signInWithEmailAndPassword
  //         setUserEmail(jsonData.userEmail)
  //       }
  //       else {
  //         await AsyncStorage.setItem('userEmail',JSON.stringify({userEmail: ''}) )
  //       }
  //     } catch (error) {
        
  //     }
  //   })()
  // },[])
  // useEffect(()=>{
  //   (async()=>{
  //     await AsyncStorage.setItem('userEmail',JSON.stringify({userEmail}) )
  //   })()
  // },[auth.currentUser?.email])
  return (
    <AllUserDetails.Provider value={{values, setValues}}>
    <CategoriesContext.Provider value={{categoriesGlobal, setCategoriesGlobal}}>
      <UserDetails.Provider value={{userEmail, setUserEmail}}>
        <SafeAreaView style={{flex:1}}>
        <PaperProvider>
          <StatusBar barStyle={'light-content'}/>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="splashtabs"  screenOptions={{headerTitleAlign:'center'}}>
              <Stack.Screen name="splashtabs" options={{headerShown:false}} component={SplashTabs} />
              <Stack.Screen name='create_account' options={{headerShown:false, title:'Create your account', headerTitleAlign:'center', headerStyle:{height:70}}} component={CreateAccount} />
              <Stack.Screen name='personal_info' component={PersonalInformation} options={{title:'Personal Information'}} />
              <Stack.Screen name='login' options={{headerShown:false}} component={Login} />
              <Stack.Screen name='forgot_password' options={{headerShown:false}} component={ForgotPasswordComp} />
              <Stack.Screen name="main" options={{headerShown:false}} component={MainTabs} />
              <Stack.Screen name="product_details" options={{headerShown:false}} component={ProductDetails} />
              <Stack.Screen name="checkout" options={{headerShown:false}} component={CheckoutScreen} />
              <Stack.Screen name='products_in_category' options={{headerShown:true, title:'Products in Category',headerStyle:{height:70}}} component={ProductsInCategory} />
              <Stack.Screen name='all_categories' options={{headerShown:true, title:'Categories',headerStyle:{height:70}}} component={AllCategoriesComp} />
              <Stack.Screen name='products_in_deals' options={{headerShown:true, title:'Products in Deals',headerStyle:{height:70}}} component={ProductsInDeals} />
            </Stack.Navigator>
        </NavigationContainer>
        </PaperProvider>
        </SafeAreaView>
      </UserDetails.Provider>
    </CategoriesContext.Provider>
    </AllUserDetails.Provider>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
