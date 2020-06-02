import {createStackNavigator} from 'react-navigation-stack';
import {View,Text} from 'react-native';
import React from 'react';

import Cart from './Cart';
import CartCheckout from './cartCheckout';


const cartStack=createStackNavigator({
    Cart: {
        screen: Cart,
        navigationOptions: {
          headerTitle: 'Shopping Cart',
        },
      },
    Checkout:{
      screen:CartCheckout,
     
    }
  
  });
  export default cartStack;