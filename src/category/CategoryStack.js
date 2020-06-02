import {createStackNavigator} from 'react-navigation-stack';
import {View,Text} from 'react-native';
import React from 'react';

import Main from './Main';
import WholesalerCategoryScreen from './screenpages/Wholesaler';
import ProductCategoryScreen from './screenpages/Product';

const Example =()=>{
    return(
        <View><Text>category</Text></View>
    );
  }
const categoryStack=createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
          headerTitle: 'Landing',
        },
      },
  
      WholesalerCategory: {
      screen: WholesalerCategoryScreen,
      navigationOptions: {
        headerTitle: 'Landing',
      },
    },
    ProductCategory:{
      screen: ProductCategoryScreen,
      navigationOptions: {
        headerTitle: 'Products of whole saler',
      },
    }
  });
  export default categoryStack;