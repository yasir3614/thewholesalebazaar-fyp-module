import React, { Component } from 'react'
import { Label,TextInput,Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="Home" size={40} color='#900' />);

import firebase from '../../config/firebase';
export default class TrackOrder extends Component {
    static navigationOptions = ({ navigation }) => {
        return {

            headerRight: (
                <View >
                    <TouchableOpacity style={{ marginTop: 5, marginRight: 10, marginLeft: 10 }} onPress={() => navigation.navigate('Landing')}>
                        <Icon name="times-circle" size={40} color='red' />
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: (
                <View>

                </View>
            ),
        };
    };
    state={

        trn:'',
        trackingOrder:{}
    }
    onChangeText=(trn)=>{
        this.setState({trn:trn})
    }
    trackOrder=()=>{
        console.log(this.state.trn);
        firebase.database().ref('Order/').on('value',(snapshot)=>{
            var orders=snapshot.val();
            
            for (var i in orders){
                console.log(orders[i].tracking);
                if(orders[i].tracking==this.state.trn){
                    var temp={
                        deliveryaddress:orders[i].deliveryaddress,
                        paymentmode:orders[i].paymentmode,
                        // COD:orders[i].COD,
                        retailerid:orders[i].retailerid,
                        totalprice:orders[i].totalprice,
                        tracking:orders[i].tracking,
                        status:orders[i].status,
                        wholesalerid:orders[i].wholesalerid
                    }
                    this.setState({trackingOrder:temp})
                    console.log(orders[i])
                    break;
                }
            }

        })
        console.log('tracking order')
        console.log(this.state.trackingOrder)
    }
    render() {
        console.log(this.state.trackingOrder.status)
        // let OrderDetail = this.props.navigation.getParam("OrderDetail", 1);
        return (
            <View style={styles.container}>
                <TouchableOpacity>

                </TouchableOpacity>

                <Text style={styles.heading}>Order Tracking</Text>
                
               
                {/* <Text style={{color:"gray",fontSize:20,marginTop:10,marginBottom:10,paddingLeft:20}}>Enter Tracking Number</Text> */}
                    <TextInput 
                     placeholder="Your Tracking Number i.e 12422"
                     value={this.state.trn}
                     onChangeText={(value)=>this.onChangeText(value)}

                     keyboardType="number-pad" style={styles.trackingNumber}></TextInput>
                <TouchableOpacity  style={styles.trackingNumber}
                onPress={()=>this.trackOrder()}
                ><Text style={{
                    textAlign:"center",fontWeight:"bold",fontSize:25,color:"black"}}>Track Now</Text></TouchableOpacity>

                <View style={styles.content}>
                <Text>Current Status Of Your Order</Text>
                    <View style={{ padding: 20 }}>
                        
                    {this.state.trackingOrder.status === "pending" ? (<View style={{ flexDirection: "row" }}>
                            <Icon style={{ padding: 10 }} name="pause-circle" size={30} />
                            <Text style={{ paddingLeft: 20, paddingTop: 10, fontSize: 20 }}>Pending</Text>

                        </View>) : this.state.trackingOrder.status ==="confirmed" ? (
                            <View style={{ flexDirection: "row" }}>
                            <Icon style={{ padding: 10 }} name="cart-arrow-down" size={30} />
                            <Text style={{ paddingLeft: 20, paddingTop: 10, fontSize: 20 }}>Confirmed</Text>

                        </View>

                        ) :this.state.trackingOrder.status === "delivered" ? (
                            <View style={{ flexDirection: "row" }}>
                            <Icon style={{ padding: 10 }} name="check-circle" size={30} />
                            <Text style={{ paddingLeft: 20, paddingTop: 10, fontSize: 20 }}>Delivered</Text>
                        </View>
                        ) :this.state.trackingOrder.status === "in-transit" ?
                        
                        (<View style={{ flexDirection: "row" }}>
                        <Icon style={{ padding: 10 }} name="truck" size={30} />
                        <Text style={{ paddingLeft: 20, paddingTop: 10, fontSize: 20 }}>In-Transit</Text>

                    </View>) : (<View><Text>No Orders Tracked</Text></View>)}
                        
                    </View>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    thanks: {

    },
    subText: {
        marginBottom: 5,
        padding: 10,
        borderWidth: 0.5,
        borderColor: "black",
        fontWeight: "bold",
        fontSize: 18
    },
    content: {
        padding: 10,
        // paddingLeft:50,
        backgroundColor: "#f5f2d0",
        paddingLeft: 60,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,

    },
    container: {
        flex: 1,
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        margin: 30,
        // paddingBottom:10
    },
    heading: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 10,
        fontWeight: "bold",
        backgroundColor: "orange",
        color: "white",
        padding: 20,
        fontSize: 40
    },
    trackingNumber: {
        
        marginBottom:5,
        textAlign: "center",
        marginLeft: 20,
        marginRight: 20,
        fontWeight: "bold",
        backgroundColor: "lightblue",
        color: "black",
        padding: 5,
        fontSize: 20
    }
})