import React,{Component} from 'react';
import {View, Text, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from './src/splash'
import Login from './src/login'
// const myIcon = (<Icon name="rocket" size={40} color='#900'/> )



/* NEW CODE */
// import React from 'react';
// import {Text, View, Button} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Icons from 'react-native-vector-icons/Ionicons';

import AuthStack from './src/profile/AuthStack';
import HomeStack from './src/home/HomeStack';
import CategoryStack from './src/category/CategoryStack';
import FeedBack from './src/feed/FeedStack';
import cartStack from './src/cart/CartStack';
// import StackSchedule from './src/features/schedule/StackSchedule';
import Icon from 'react-native-vector-icons/FontAwesome';
console.disableYellowBox = true;
const MainTabsStack = createBottomTabNavigator({

  Home: {
    screen: HomeStack,
    navigationOptions: {
      // tabBarLabel:"Home",
      tabBarIcon: () => (
        <Icon style={{marginTop:5}} name="home" size={40} color='black'/>
      )
    },
  },
  Cart: {
    screen: cartStack,
    navigationOptions: {
      // tabBarLabel:"Home",
      tabBarIcon: () => (
        <Icon style={{marginTop:5}} name="shopping-cart" size={30} color='black'/>
      )
    },
    
  },
  Profile: {
    screen: AuthStack,
    navigationOptions: {
      // tabBarLabel:"Home",
      tabBarIcon: () => (
        <Icon style={{marginTop:5}} name="user" size={30} color='black'/>
      )
    },
 
  },
  Feed: {
    screen: FeedBack,
    navigationOptions: {
      tabBarLabel: 'feed',
    },
    navigationOptions: {
      // tabBarLabel:"Home",
      tabBarIcon: () => (
        <Icon style={{marginTop:5}} name="rss-square" size={30} color='black'/>
      )
    },
  },
  
  // Schedule:{
  //   screen:StackSchedule,

  // }
});

const swNav=createSwitchNavigator({
  splash:SplashScreen,
  MainScreen:MainTabsStack,
})

// export default createAppContainer(MainTabsStack);
export default createAppContainer(swNav);



/* OLD CODE */




// class App extends Component {

//   performTimeConsumingTask = async() => {
//     return new Promise((resolve) =>
//       setTimeout(
//         () => { resolve('result') },
//         5000
//       )
//     );
//   }

//   async componentDidMount(){
      
//   const data = await this.performTimeConsumingTask();

//   if (data !== null) {
//     this.setState({ isLoading: false });
//   }
//   }
 

//   constructor(props){
//     super(props);
//     this.state={isLoading:true}

//   }



//   render(){
//     if(this.state.isLoading){
//       return <SplashScreen/>
//     }else{
//     return(

//       <View style={{width:'100%',flex:1,backgroundColor:" #3f729b"}}>
//         <Login/>
//         {/* {myIcon} */}
//       </View>
//     )
//   }
//   }

// }
// export default App;