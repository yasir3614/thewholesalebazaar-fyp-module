import React from 'react';

import {Text,View,Button} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import SignInScreen from './screenpages/SignIn';
import CreateAccount from './screenpages/CreateAccount';
import LandingScreen from './screenpages/Landing';
import ResetPasswordScreen from './screenpages/ResetPassword';
import CreateAccountScreen from './screenpages/CreateAccount';
import WholeSalerProducts from './screenpages/WholeSalerScreens/WholeSalerProducts';
import AddDealForm from './components/AddDealForm';
import ClearStockForm from './components/ClearStockForm';
import RequestProduct from './screenpages/RetailerScreens/RequestProduct';
import WholeSalerUpdateProduct from './screenpages/WholeSalerScreens/WholeSalerUpdateProducts';
import AddShopDetails from './screenpages/WholeSalerScreens/AddShopDetails';
import ProductPromotion from './screenpages/WholeSalerScreens/ProductPromotion';
import OrdersWholeSaler from './screenpages/WholeSalerScreens/OrdersWholeSaler';
import OrdersRetailer from './screenpages/RetailerScreens/OrdersRetailer';
import Sales from './screenpages/WholeSalerScreens/MySales';


// import ViewProductsScheduledRetailer from '../features/schedule/ViewProductsScheduledRetailer';
import ViewProductsScheduledRetailer from '../features/schedule/ViewProductsScheduledRetailer';

import ViewProductsScheduledWholeSaler from '../features/schedule/ViewProductsScheduledWholeSaler';
import TrackOrder from './screenpages/TrackOrder';

const Example =()=>{
    return(
        <View><Text>auth this later</Text></View>
    );
  }

const AuthStack = createStackNavigator({
    Landing: {
      screen: LandingScreen,
      navigationOptions: {
        headerTitle: 'Landing',
      },
    },
    
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        headerTitle: 'Sign In',
      },
    },
    CreateAccount: {
      screen: CreateAccountScreen,
      navigationOptions: {
        headerTitle: 'Create Account',
      },
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
      navigationOptions: {
        headerTitle: 'Reset Password',
      },
    },
    WholeSalerUpdateProduct:{
      screen:
          WholeSalerUpdateProduct
      ,
      navigationOptions: {
        headerTitle: 'Update Stock',
      },
    },
    AddShopDetails:{
      screen:AddShopDetails,
      navigationOptions: {
        headerTitle: 'Add Shop Details',
      },

    },
    WholeSalerProducts:{
      screen:
        WholeSalerProducts
      ,
      navigationOptions: {
        headerTitle: 'WholeSaler Products',
      },
    },
    TrackOrder:{
      screen:
        TrackOrder
      ,
      navigationOptions: {
        headerTitle: 'Track My Products',
      },
    },
    AddDealForm:{
      screen:
        AddDealForm
      ,
      navigationOptions: {
        headerTitle: 'Adding Deal to Product',
      },
    },
    ClearStockForm:{
      screen:
        ClearStockForm
      ,
      navigationOptions: {
        headerTitle: 'Clear Stock of Product',
      },
    },
    RequestProduct:{
      screen:
        RequestProduct
      ,
      navigationOptions: {
        headerTitle: 'Request Product',
      },
    },
    ProductPromotion:{
      screen:
        ProductPromotion
      ,
      navigationOptions: {
        headerTitle: 'Product Promotion',
        
      },
    },
    ViewProductsScheduledRetailer:{
      screen:ViewProductsScheduledRetailer,
      navigationOptions: {
        headerTitle: 'Your Scheduled Products',
        
      },

    },
    ViewProductsScheduledWholeSaler:{
      screen:ViewProductsScheduledWholeSaler,
      navigationOptions:{
        headerTitle:'You need to deliver these products'
      }
    }
    ,
    OrdersWholeSaler:{
      screen:OrdersWholeSaler,
      navigationOptions:{
        headerTitle:'Order Requests'
      }
    }
    ,
    OrdersRetailer:{
      screen:OrdersRetailer,
      navigationOptions:{
        headerTitle:'My orders'
      }
    }
    ,
    MySales:{
      screen:Sales,
      navigationOptions:{
        headerTitle:'Sales Analytics'
      }
    }
  });
  

  export default AuthStack;