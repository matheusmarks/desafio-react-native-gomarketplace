import React, { useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    if (products) {
      const totalPrice = products.reduce((accumulator, product) => {
        const itemTotalPrice = product.price * product.quantity;
        return accumulator + itemTotalPrice;
      }, 0);

      return formatValue(totalPrice);
    }
    return formatValue(0);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    if (products) {
      const quantities = products.map(item => {
        return item.quantity;
      });

      const totalItems = quantities.reduce((currentValue, accumulator) => {
        return currentValue + accumulator;
      }, 0);

      return totalItems;
    }
    return 0;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
