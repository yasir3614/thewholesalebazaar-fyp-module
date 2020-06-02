import {createStackNavigator} from 'react-navigation-stack';

import ViewProductsScheduledRetailer from './ViewProductsScheduledRetailer';
import ViewProductsScheduledWholeSaler from './ViewProductsScheduledWholeSaler';
const FeatureStack = createStackNavigator({
  ViewProductsScheduledRetailer: {
    screen: ViewProductsScheduledRetailer,
    navigationOptions: {
      headerTitle: 'My Scheduled products',
    },
  },
  ViewProductsScheduledWholeSaler: {
    screen: ViewProductsScheduledWholeSaler,
    navigationOptions: {
      headerTitle: 'My Scheduled products',
    },
  },
});
export default FeatureStack;
