import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems } from '../store/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const inCart = cartItems.some(item => item.id === product.id);
  const quantity = cartItems.find(item => item.id === product.id)?.quantity || 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    Alert.alert('Added to Cart', `${product.title} has been added to your cart.`, [{ text: 'OK' }]);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>

        <TouchableOpacity style={[styles.button, inCart && styles.buttonInCart]} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>{inCart ? `In Cart (${quantity})` : 'Add to Cart'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  image: {
    width: 100, height: 100, borderRadius: 8, backgroundColor: '#f0f0f0'
  },
  details: { flex: 1, marginLeft: 12 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  description: { fontSize: 14, color: '#666', marginBottom: 8 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#27ae60', marginBottom: 8 },
  button: { backgroundColor: '#3498db', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 4, alignSelf: 'flex-start' },
  buttonInCart: { backgroundColor: '#2ecc71' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default ProductCard;
