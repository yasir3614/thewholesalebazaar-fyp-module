import React, { Component } from 'react'
import { ScrollView,ImageBackground, View, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { whileStatement } from '@babel/types';
import firebase from './../../config/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

class WholeSalerOptions extends Component {


    state = {
        currentUser: {
                  as:'',
                  email:'',
                //   name:'',
                  username:'',
                  mobile:''

        }
    };
    // componentWillMount() {
    //     // checkUser=()=>{
    //     firebase.database().ref('Users/' + this.props.userID + '/').on("value", (snapshot) => {
    //         // console.log(snapshot.val())
    //         var x = snapshot.val();
    //         var temp = {
    //             user:x
    //         }
    //         console.log(temp.user.email);
    //          this.setState({
    //             currentUser: {
    //                 as:temp.user.as,
    //                 email:temp.user.email,
    //                 // name:temp.user.username,
    //                 username:temp.user.username,
    //                 mobile:temp.user.mobile
    //             }
                
    //         })
    //         console.log("current user: ->>>>>" + this.state.currentUser.as)
            
    //     });

    //     //        
    // }
    render() {
        console.log("in whoslealsa: " + this.state.currentUser.as);
        // console.log(this.state.currentUser.as==="aafa");
        return (
          
            <ScrollView>
                <ImageBackground style={styles.namePanel} source={{ uri: "https://cdn.hipwallpaper.com/i/90/96/fwvd7m.jpg" }}>

                    <View style={{ flexDirection: "row" }}>
                        <Image style={{ borderWidth: 1, borderColor: "red", borderRadius: 100, height: 100, width: "20%" }} source={{ uri: "https://pbs.twimg.com/profile_images/980145664712740864/aNWjR7MB_400x400.jpg" }} />

                        <View>
                        <Text style={styles.name}>{this.props.current.username}</Text>
                        <Text style={styles.wholesaler}>Wholesaler</Text>
                        </View>
                        <TouchableOpacity style={{marginLeft:45}} onPress={()=>this.props.logoutUser()} >
                          
                            <Icon name="arrow-circle-left" color="" size={50}></Icon>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    
                </ImageBackground>


                <ImageBackground style={styles.namePanel} 
                source={{ uri: "https://ak9.picdn.net/shutterstock/videos/4038799/thumb/1.jpg" }}>


                    <Text style={styles.paymentOption}>Payment Options</Text>


                    <View style={{ flexDirection: "row" }}>

                        <View style={styles.images}>
                            <Image style={{ marginLeft: 6, marginTop: 10, resizeMode: "contain", height: 40, width: "80%" }} source={{ uri: "https://seeklogo.com/images/E/easypaisa-logo-477156A1F0-seeklogo.com.png" }} />
                        </View>

                        <View style={styles.images}>
                            <Image style={{ marginLeft: 10, marginTop: 10, resizeMode: "contain", height: 50, width: "80%" }} source={{ uri: "https://image.flaticon.com/icons/png/512/1554/1554401.png" }} />
                        </View>

                        <View style={styles.images}>
                            <Image style={{ marginLeft: 8, marginTop: 15, resizeMode: "contain", height: 35, width: "80%" }} source={{ uri: "http://pluspng.com/img-png/credit-card-png--2025.png" }} />
                        </View>

                    </View>
                </ImageBackground>


                <ImageBackground style={styles.namePanel, { height:600   }} source={{ uri: "https://ak9.picdn.net/shutterstock/videos/4038799/thumb/1.jpg" }}>
                    {/* <Text style={styles.paymentOption}>My Products </Text> */}

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddShopDetails')} style={{ marginLeft: "30%", width: "50%" }}>
                        <Text style={styles.viewProduct}>Add or Update Shop Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('WholeSalerProducts')} style={{ marginLeft: "30%", width: "50%" }}>
                        <Text style={styles.viewProduct}>View My Products</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MySales')} style={{ marginLeft: "30%", width: "50%" }}>
                        <Text style={styles.viewProduct}>My Sales</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('WholeSalerSales')} style={{ marginLeft: "30%", width: "50%" }}>
                        <Text style={styles.viewProduct}>My Clients</Text>
                    </TouchableOpacity>
                    {/*  this.props.navigation.navigate('ViewProductsScheduledWholeSaler')}  */}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewProductsScheduledWholeSaler')} style={{ marginLeft: "30%", width: "50%" }}>
                        <Text style={styles.viewProduct}>Schedules</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OrdersWholeSaler')} style={{ marginLeft: "30%", width: "50%" }}>
                        <Text style={styles.viewProduct}>Orders</Text>
                    </TouchableOpacity>
              </ImageBackground>

                

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    namePanel: {
        // resizeMode:"stretch",
        // flex:1,
        width: "120%",
        // backgroundColor:"green",
        // height:140,
        padding: 20,
        // paddingRight:20,
        marginBottom: 1,
        marginTop: 1,

    },

    wholesaler:{
        // margin: 25,
        textAlign:"center",
        padding:5,
        width:"90%",
        marginLeft:25,
        marginTop:5,
        fontSize: 25,
        color: "black",
        elevation:5,
        backgroundColor:"orange",
        fontWeight: "bold",
        // borderColor:"green"
    },
    name: {
        // margin: 25,
        marginLeft:25,
        fontSize: 35,
        color: "white",
        fontWeight: "bold",
        // borderColor:"green"
    },
    paymentOption: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    images: {
        marginLeft: 50, marginTop: 10, borderWidth: 1, borderColor: "red", backgroundColor: "white", borderRadius: 100, height: 70, width: "15%"
    },

    viewProduct: {
        elevation: 5,
        padding: 5,
        textAlign: "center",
        // backgroundColor: "#ff4500",
        backgroundColor:"red",
        // paddingLeft:20,
        // padding:30,
        marginLeft: -20,
        // paddingLeft:20,
        // paddingRight:20,
        // width:"100%",
        // borderWidth:1,
        // borderColor:"white",
        // borderRadius:20,
        marginTop: 20,
        // marginLeft:"28%",
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    }

})
export default withNavigation(WholeSalerOptions);