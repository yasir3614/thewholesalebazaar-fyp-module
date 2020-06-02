import {createBottomTabNavigator} from 'react-navigation-tabs';
const Example =()=>{
    return(
        <View><Text>build this later</Text></View>
    );
  }

const MainTabs = createBottomTabNavigator({
    Home: {
      screen: homeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
      },
    },
    Categories: {
      screen: categoryStack,
      navigationOptions: {
        tabBarLabel: 'Catagories',
      },
    },
    Profile: {
      screen: profileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
      },
    },
    Feed: {
      screen: feedStack,
      navigationOptions: {
        tabBarLabel: 'feed',
      },
    },
  });