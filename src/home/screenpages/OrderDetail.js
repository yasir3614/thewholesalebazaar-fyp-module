import React, { Component } from 'react'
import {Text,View,StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native';
const myIcon = (<Icon name="Home" size={40} color='#900'/> );

export default class OrderDetailScreen extends Component {
      static navigationOptions = ({navigation}) => {
    return  {
   
      headerRight: (
        <View >
          <TouchableOpacity style={{marginTop:5,marginRight:10,marginLeft:10}}  onPress={() => navigation.navigate('Main')}>
          <Icon  name="times-circle" size={40} color='red'/>
          </TouchableOpacity>
        </View>
      ),
      headerLeft: (
        <View>
        
        </View>
      ),
    };
  };
    render() {
        let OrderDetail = this.props.navigation.getParam("OrderDetail", 1);
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity>
                    
                </TouchableOpacity>
                
                <Text style={styles.heading}>Order Details</Text>
                <Text style={styles.trackingNumber}>TRN# {OrderDetail.trn}</Text>
                
                <View style={styles.content}>
               

                <Text style={styles.subText}>Quantity: {OrderDetail.quantity}</Text>
                <Text style={styles.subText}>Address: {OrderDetail.address}</Text>
                <Text style={styles.subText}>Payment Mode: {OrderDetail.paymentmode}</Text>
                <Text style={styles.subText}>Total Amount: PKR {OrderDetail.item.price*OrderDetail.quantity}</Text>
               
                </View>
                <View style={styles.content}>
                    <Text>Thankyou for placing an order, it will be delivered to you within 3-4 days.</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    thanks:{
       
    },
    subText:{
        marginBottom: 5,
        padding:10,
        borderWidth:0.5,
        borderColor:"black",
        fontWeight:"bold",
        fontSize:18
    },
    content:{
        padding:10,
        backgroundColor:"#f5f2d0",
        paddingLeft:20,
        marginTop:20,
        marginRight:20,
        marginLeft:20,

    },
    container:{
        flex:1,
        padding:20,
        borderWidth:1,
        borderRadius:10,
        margin:30,
        // paddingBottom:10
    }, 
    heading:{
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        marginBottom:10,
        fontWeight:"bold",
        backgroundColor:"orange",
        color:"white",
        padding:20,
        fontSize:40
    },
    trackingNumber:{
        textAlign:"center",
        marginLeft:20,
        marginRight:20,
        fontWeight:"bold",
        backgroundColor:"red",
        color:"white",
        padding:5,
        fontSize:20
    }
})