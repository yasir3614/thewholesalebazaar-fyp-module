import {createStackNavigator} from 'react-navigation-stack';
import {View,Text} from 'react-native';
import React,{Component} from 'react';
import Image from 'react-native';
import HomeScreen from './screenpages/Main';
import ProductDetailScreen from './screenpages/ProductDetail';
import ProductCheckoutScreen from './screenpages/ProductCheckout';
import ProductCartScreen from './screenpages/ProductCart';
import ChatScreen from './screenpages/Chat';
import SearchScreen from './screenpages/Search';
import OrderDetailScreen from './screenpages/OrderDetail';
import WholeSalerDetail from './components/WholeSalerDetail';
import Logo from "./components/Logo";



const homeStack=createStackNavigator({
  
    Main: {
      screen: HomeScreen,
      
      navigationOptions: {
        headerTitle: <Logo/>,
        // headerTitle: <Image style={{height: 125, width: 200}} resizeMode="contain" source={require('../../images/Logo_w.png')}/>,
        // headerTintColor:'black',
        // headerTitleStyle:{fontSize:30},
        
        // headerStyle: { backgroundColor: '#f0910e' },
      },
    },
    ProductDetail:{
      screen:ProductDetailScreen,
      navigationOptions:{
        headerTitle:"back button product name"
      }
    },
    ProductCheckout:{
        screen:ProductCheckoutScreen,
        navigationOptions:{
          headerTitle:"back button product name"
        }
      },
    OrderDetail:{
      screen:OrderDetailScreen,
      navigationOptions:{
        headerTitle:"Order Detail"
      }
    },
      
    ProductCart:{
        screen:ProductCartScreen,
        navigationOptions:{
          headerTitle:"back button product name"
        }
      },
    Chat:{
        screen:ChatScreen,
        navigationOptions:{
            headerTitle:"back button product name"
        },
      },
    Search:{
      screen:SearchScreen
    },
    WholeSalerDetail:{
      screen:WholeSalerDetail
    }
    
      
 
  });
  export default homeStack;