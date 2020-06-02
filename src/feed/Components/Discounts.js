import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CustomCard from './CustomCard';
import {ScrollView} from 'react-native';
export default class Discounts extends Component {
  state = {
    product: [
      {
        name: 'Mug',
        quantity: 2,
        price: 199,
        category: 'Kitchen ware',
        tags: ['mug', 'kitchen', 'utensils'],
        color: 'White',
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/61KB6fUhcSL._SL1500_.jpg',
      },
      {
        name: 'Samsung A50',
        quantity: 6,
        price: 15000,
        category: 'Mobile Phone',
        tags: ['mug', 'kitchen', 'phone'],
        color: 'Black',
        imageUrl:
          'https://johnlewis.scene7.com/is/image/JohnLewis/238087827?$rsp-pdp-port-1440$',
      },
      {
        name: 'Nokia A50',
        quantity: 6,
        price: 15000,
        category: 'Mobile Phone',
        tags: ['mug', 'kitchen', 'phone'],
        color: 'Black',
        imageUrl:
          'https://assets.mspimages.in/wp-content/uploads/2019/03/Nokia-X71-696x435.jpg',
      },
      {
        name: 'QMobile A50',
        quantity: 6,
        price: 15000,
        category: 'Mobile Phone',
        tags: ['mug', 'kitchen', 'phone'],
        color: 'Black',
        imageUrl:
          'https://www.whatmobile.com.pk/admin/images/Qmobile/NoirJ5b.jpg',
      },
    ],
  };
  render() {
    return (
      <View>
        <Text>New Discounts</Text>
        {this.state.product.map((data, index) => {
          return (
            <CustomCard products={data} key={index}>
              <View>
                <Text>CLear Stock product</Text>
              </View>
            </CustomCard>
          );
        })}
      </View>
    );
  }
}
