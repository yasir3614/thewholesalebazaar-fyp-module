import React, {Component} from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';

import Connections from './Components/Connections';
import ClearStock from './Components/ClearStock';
import NewProducts from './Components/NewProducts';
import Discounts from './Components/Discounts';
import CustomButton from './Components/CustomButton';
import { ScrollView } from 'react-native';

// import {ScrollView} from 'react-native';

export default class NewsFeed extends Component {
  state = {
    selected: 'ClearStock',
  };
  buttonClick(name) {
    this.setState({selected: name});
  }
  render() {
    return (
      <View style={{width:"100%",flex:1}}>
        <View style={{flexDirection: 'row',paddingTop:10,paddingBottom:10,backgroundColor:'orange'}}>
         
         
          <CustomButton
            style={styles.btnStyle}
            onPress={() => this.buttonClick('ClearStock')}
            iconName="stumbleupon-circle">
              Clear Stock
          </CustomButton>
          
          <CustomButton
              style={styles.btnStyle}         
            onPress={() => this.buttonClick('Discounts')}
            iconName="home" >
            Discounts
          </CustomButton>

          <CustomButton
             style={styles.btnStyle}         
            onPress={() => this.buttonClick('NewProducts')}
            iconName="free-code-camp">
            New Products
          </CustomButton>

          <CustomButton
             style={styles.btnStyle}           
            onPress={() => this.buttonClick('Connections')}
            iconName="home">
            Connections
          </CustomButton>

        </View>

        <ScrollView style={{width:"100%",flex:1}}>
          {this.state.selected === 'ClearStock' ? (
            <ClearStock />
          ) : this.state.selected === 'Discounts' ? (
            <Discounts />
          ) : this.state.selected === 'NewProducts' ? (
            <NewProducts />
          ) : (
            <Connections />
          )}
       </ScrollView>

      </View>
    );
  }
}
styles=StyleSheet.create({
  btnStyle:{
    // marginRight:20,
    marginLeft:60,
    // backgroundColor:'red',
    // borderRadius:10,

  }
});