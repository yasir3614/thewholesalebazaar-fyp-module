import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CustomCard extends Component {
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
    const {
      name,
      quantity,
      price,
      category,
      tags,
      color,
      imgUrl,
    } = this.props.products;

    return (
      <View style={{margin:10}}> 
        <View
          style={styles.productView}
          >
          <View style={{flexDirection: 'row'}}>
            <Icon name="bullhorn" size={30} />
            <View
              style={{
                marginLeft: 30,
                padding: 10,
                height: '100%',
                borderRadius: 30,
                borderWidth: 1,
                borderColor: 'orange',
                width: '30%',
              }}>
              <Image
                style={{
                  marginLeft: 10,
                  height: '100%',
                  width: 100,
                  resizeMode: 'contain',
                }}
                source={{uri: imgUrl}}
              />
            </View>

            <View style={{padding: 1, marginLeft: 10}}>
              {this.props.children}
            </View>
          </View>
        </View>
      </View>
    );;
  }
}

const styles = StyleSheet.create({
  itemDescription: {
    fontSize: 15,
    color: 'black',
  },
  productView: {
    // borderRadius:30,
    // backgroundColor:"red",
    elevation: 2,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    height: 150,
    width: '100%',
    marginLeft: 15,
    // marginRight: 20,
    marginTop: 10,
    // borderWidth: 0.14,
    // borderRadius:10
    // marginBottom:50,
    // borderColor:"black"
  },
});
