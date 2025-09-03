import React, { useContext, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { AProductData, } from '../../Types/product_data';
import UseAddToCart from '../../hooks/add_to_cart';
import { UserDetails } from '../../contexts/myContext';
import UseRemoveFromCart from '../../hooks/remove_from_cart';
import { Snackbar } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const AddToCartButton: React.FC<any> = ({item}) => {
    const context = useContext(UserDetails)
    const [snackBarVisible, setSnackBarVisible] = useState<boolean>(false)
    const [inCartOnPage, setInCartOnPage] = useState<boolean>(item.inCart)
    const [addingToCart, setAddingToCart]= useState<boolean>(false)
    const [removingFromCart, setRemovingFromCart] = useState<boolean>(false)
    const addToCartFunc = async(item: AProductData)=>{
        setAddingToCart(true)
        try {
            await UseAddToCart(item.name,context?.userEmail, setAddingToCart )
            setSnackBarVisible(true)
            setAddingToCart(false)
            setInCartOnPage(true)
        } catch (error) {
            setAddingToCart(false)
            alert(error)
        }
        
    }
    const removeFromCartFunc =async (item:AProductData)=>{
        setRemovingFromCart(true)
        try {
            await UseRemoveFromCart(item.name,context?.userEmail, setAddingToCart )
            setSnackBarVisible(true)
            setRemovingFromCart(false)
            setInCartOnPage(false)
        } catch (error) {
            setRemovingFromCart(false)
            alert(error)
        }
    }
    return (
        <View>
        {(!inCartOnPage && !addingToCart )&&
        <TouchableOpacity onPress={()=>(context?.userEmail? addToCartFunc(item): alert('Please, log in to perform action'))} style={styles.button} >
            <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>}
        {addingToCart && <ActivityIndicator style={{marginTop:5}} color={'blue'}  size={'large'}  />}
        {(!removingFromCart && inCartOnPage) &&
        <TouchableOpacity onPress={()=>removeFromCartFunc(item)} style={styles.button} >
            <Text style={styles.buttonText}>Remove from Cart</Text>
        </TouchableOpacity>}
        {removingFromCart && <ActivityIndicator style={{ marginTop:5}} color={'blue'}  size={'large'}  />}
        <Snackbar 
            onDismiss={()=>setSnackBarVisible(false)}
            visible={snackBarVisible}
            duration={5000}
            icon={()=><MaterialIcons name="cancel" size={24} color="white" />}
            onIconPress={()=>setSnackBarVisible(false)}
        >
            {inCartOnPage && <Text style={{color:'white'}}>Added to Cart successfully</Text>}
            {!inCartOnPage && <Text style={{color:'white'}}>Removed from cart successfully</Text>}
        </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2F1528',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal:15,
        paddingVertical:15,
        marginBottom:30
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddToCartButton;