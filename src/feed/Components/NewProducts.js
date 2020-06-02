import React, {Component} from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
import CustomCard from './CustomCard';


import {StyleSheet, View, Text, Image} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import jsonItems from '../../../items.json';
import {TouchableOpacity} from 'react-native';
// import ad from '../../../images/';
import firebase from '../../config/firebase';

export default class NewProducts extends Component {
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
  
    
  
    products: [],
    imUrl: '',
  };
   readUserData() {

    // firebase.LogLevel = LogLevel.Verbose;
    // firebase.database().DefaultInstance.LogLevel = LogLevel.Verbose; 
    
     console.log('firebase product loading');
    firebase
      .database()
      .ref('Product/').orderByChild("dateProductAddedIn")
      .on('value', (snapshot)=> {
        var products = [];

        console.log(snapshot.val());
        var x = snapshot.val();
        for (let i in x) {
          console.log(i);
          // console.log(x[i]);
          var temp = {
            name:x[i].name,
            productId: i,
            category: x[i].category,
            imgUrl: x[i].imgUrl,
            isBuyNowPayLater: x[i].isBuyNowPayLater,
            offerPrice: x[i].offerPrice,
            price: x[i].price,
            quantity: x[i].quantity,
            wholesalerId: x[i].wholesalerId,
          };
          products.push(temp);
          console.log(temp);
        }
        console.log('==============');
        console.log(products);
        products.reverse();
        this.setState({products: products});
        // return products;
        console.log(this.state.products)
      },error=>{
        console.log(error);
      });
  }
  componentWillMount() {
    this.readUserData();
  }
  render() {
    return (
      <View>
        <Text>Recently added products</Text>
        {this.state.product.map((data, index) => {
          console.log(data);
          return (
            <CustomCard products={data} key={index}>
              <View>
                  <Text>
                      {data.name}
                  </Text>
              </View>
            </CustomCard>
          );
        })}
      </View>
    );
  }
}
