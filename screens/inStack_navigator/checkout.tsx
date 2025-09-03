import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Header from '../../components/checkout/header';
import OrderSummary from '../../components/checkout/order-summary';
import ScientificCalculator from '../../components/checkout/delivery-details';
import PayButton from '../../components/checkout/pay-button';
import { StatusBar } from 'expo-status-bar';
import { NavigationProp, Route, RouteProp } from '@react-navigation/native';
import DeliveryDetails from '../../components/checkout/delivery-details';
import UseAddToOrder from '../../hooks/add_to_order';
import { UserDetails } from '../../contexts/myContext';
import UseRemoveFromCart from '../../hooks/remove_from_cart';
import { db } from '../../firebase-config';
import { doc, updateDoc } from 'firebase/firestore';

interface CheckoutScreenProps {
    navigation: NavigationProp<any>;
    route: RouteProp<any>
}
const CheckoutScreen:React.FC<CheckoutScreenProps> = ({navigation, route}) => {
    const userContext = useContext(UserDetails)
    const [addingToOrder, setAddingToOrder] = useState<boolean>(false)
    const [clearingCart, setClearingCart] = useState<boolean>(false)
    const cartData = route.params?.cartData
    const itemQuantity= route.params?.itemQuantity
    const itemTotal = route.params?.itemTotal
    const addToOrder =async()=>{
        const usersRef = doc(db, "users", userContext?.userEmail||'');
        setClearingCart(true)
            try {
                
                // Adding new products to cart using their name
                await updateDoc(usersRef, {
                    cart: []
                });
                setClearingCart(false)
                
            } catch (error) {
                setClearingCart(false)
                alert(error)
            }        
        Alert.alert('Order successful', `You will get your products of ${parseFloat(itemTotal).toLocaleString()} Naira  in the next few  days.`, [{text:'ok', onPress:()=>navigation.navigate('main', {screen:'home'})}])
    }
    return (
        <ScrollView  style={{flex:1, }}>
            <ActivityIndicator animating={addingToOrder} style={{position:'absolute',alignSelf:'center', zIndex:200, top:100}} color={'blue'} size={'large'}/>
            <Header navigation={navigation} />
            {/* <ScrollView> */}
                <View style={styles.container}>
                    <OrderSummary itemQuantity={itemQuantity} itemTotal={itemTotal} />
                    <DeliveryDetails />
                    {!clearingCart && <PayButton addToOrder={addToOrder} addingToOrder={addingToOrder} />}
                    {clearingCart && <ActivityIndicator size={'large'} color={'blue'} />}
                </View>
            {/* </ScrollView> */}
        </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ffffff',
    },
   
});

export default CheckoutScreen;