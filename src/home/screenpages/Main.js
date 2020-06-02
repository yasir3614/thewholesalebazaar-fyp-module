import React, {Component} from 'react';
import SplashScreen from '../../splash'
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import ViewProducts from '../components/ViewProducts';
import ViewWholeSalers from '../components/ViewWholeSalers';
// import Icon from 'react-native-vector-icons/FontAwesome';
// const myIcon = (<Icon name="rocket" size={40} color='#900'/> )

class Logo extends Component {
  render() {
    console.log("Tes");
    return (
      <
      
      Icon style={{marginRight:50}}   name="search" size={200}/>
    );
  }
}
class MainScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return  {
      headerTitle: <Logo />,
      headerRight: (
        <View>
          <TouchableOpacity style={{marginRight:20,width:"100%"}}onPress={() => navigation.navigate('Search')}>
          <Icon  name="search" size={35}/>
          </TouchableOpacity>
        </View>
      ),
    };;
  };


  state= {
    isLoading:false,
    isSelected:true
    // productColor: "#f0910e",
    // wholeSalerColor:  "#d5770f"
  }

  onPress(type){
    if(type=="product"){
      this.setState({
        isSelected:true
      })
    }else{
    this.setState({
      isSelected: false,
    })
  }
  }

  // onPressWholesaler(){
  //     this.setState({
  //       wholeSalerColor: "#d5770f",
  //       productColor:"#f0910e"
  //     })
    
  // }

  render() {
      
    

    return (

      <View style={styles.container}>
        <View style={styles.insideContainer}>
          <TouchableOpacity
          
           onPress={()=>this.onPress("product")}

          style={this.state.isSelected ? [styles.wholesaler ,{backgroundColor:"#d5770f",borderBottomWidth:2}]: [styles.product,{backgroundColor:"#f0910e"}]}>
            <Text style={styles.productText}>Products</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=>{this.onPress("wholesaler")}}
          style={!this.state.isSelected ? [styles.wholesaler ,{backgroundColor:"#d5770f",borderBottomWidth:2}]: [styles.product,{backgroundColor:"#f0910e"}]}>
    
            <Text style={styles.wholesalerText}>Wholesalers</Text>
            
          </TouchableOpacity>

        
        </View>
        {!this.state.isSelected ? <ViewWholeSalers navigation={this.props.navigation}></ViewWholeSalers>:
        <ViewProducts navigation={this.props.navigation} />}
      </View>
  );
  }}

const styles = StyleSheet.create({
  product: {
    width: '50%',
    backgroundColor: '#d5770f',
    // height: 40,

  },
  productText: {
    fontSize: 30,
    fontWeight:"bold",
    textAlign:"center",
    color:"white"
  },
  wholesalerText: {
    textAlign:"center",
    fontWeight:"bold",
    fontSize: 30,
    color:"white"
  },
  wholesaler: {
    width: '50%',
    // backgroundColor: '#f0910e',
  },
  container: {
    flex: 1,
  },
  insideContainer: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
});;

export default MainScreen;
