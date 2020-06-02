import {createStackNavigator} from 'react-navigation-stack';

import NewsFeed from './NewsFeed';
const feedStack = createStackNavigator({
  NewsFeed: {
    screen: NewsFeed,
    navigationOptions: {
      headerTitle: 'NewsFeed',
    },
  },
});
export default feedStack;
