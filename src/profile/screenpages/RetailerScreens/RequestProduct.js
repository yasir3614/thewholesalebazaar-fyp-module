import React, { Component } from 'react'
import {StyleSheet,AsyncStorage,View,Text,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import firebase from '../../../config/firebase';

export default class RequestProduct extends Component {
    state ={
        requestproduct:{
            name:{
                value:'',
                type:'text'
            },
            quantity:{
                value:'',
                type:'number'
            },
            category:{
                value:'',
                type:'text'
                
            },
            description:{
                value:'',
                type:'text'
            }

        },
        userLoggedIn:'',
        messageError:''
    }
    componentWillMount = () => {
        // this.RemoveSession();
        console.log('---------???-componrt will mount ttt');
        this.checkLoggedin();
    }
    
    
    checkLoggedin = async () => {
        console.log('--------------------')
        try {
            const value = await AsyncStorage.getItem('userID');
            if (value !== null) {
    
                this.setState({
                    userLoggedIn: value,
                })
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2")
                console.log(this.state.userLoggedIn);
                console.log("logged in inside cartLOGGED IN")
                this.AddRequestProduct();
                // alert("user is logged in")
            } else {
                console.log("NOT LOGGED IN")
                // alert("user is not logged in in cart");
            }
        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    };
    
    
      updateInput = (name, value) => {
        //make all the changes in copy before state so making a copy
        let formCopy = this.state.requestproduct;
        formCopy[name].value = value;
        this.setState({
          requestproduct: formCopy,
        });
      };
      AddRequestProduct = (requestproduct) => {
    
        // var wholesalerId_ = this.state.currentUserId;
       
        // console.log(this.state.shopDetail);
        console.log('=====ADD Request----')
        // var wholesalerId_ = this.state.currentUserId;
        // var productid=this.props.navigation.getParam('otherParam', 'default value');
        // console.log(productid)
        firebase
          .database()
          .ref('RequestProduct/')
          .push({
            retailerid:this.state.userLoggedIn,
            name:requestproduct.name,
            quantity:requestproduct.quantity,
            description:requestproduct.description,
            category:requestproduct.category        

            })
          .then(data => {
            //success callback
            console.log('data ', data);
            this.props.navigation.navigate('Landing');
          })
          .catch(error => {
            //error callback
            console.log('error ', error);
          });
        // firebase.database().ref('Products/').set
      };
    sendRequest=()=>{
        var requestproduct={
            name:this.state.requestproduct.name.value,
            quantity:this.state.requestproduct.quantity.value,
            description:this.state.requestproduct.description.value,
            category:this.state.requestproduct.category.value    
        }
        if(requestproduct.name.length==0 || requestproduct.quantity ==0 || requestproduct.description.length == 0 || requestproduct.category.length==0){
            this.setState({messageError:'please enter each field'})
            return;
        }
        console.log('------Send Request-----')
        console.log(requestproduct)
        this.AddRequestProduct(requestproduct);
    }
    
    render() {
        return (
            <View style={{flex:1}}>
            <View>
                <Text style={{padding:20,backgroundColor:"orange",textAlign:"center",fontWeight:"bold",fontSize:30,color:'white'}}> Request A Product </Text>
            </View>
           
            <ScrollView style={{margin:20}}>

                
                <TextInput
                    placeholder="Product Name"
                    value={this.state.requestproduct.name.value}
                    onChangeText={value => this.updateInput('name', value)}
                    autoCapitalize={'none'}
                    style={{borderWidth:1,borderColor:"orange",margin:10,borderRadius:15,textAlign:"center"}}
                    
                    // style={{margin:10,borderWidth:2,backgroundColor:'white',borderRadius:10,borderColor:'white',marginBottom: 10, marginTop: 20}}
                />
                <TextInput
                    placeholder="Quantity Required"
                    value={this.state.requestproduct.quantity.value}
                    onChangeText={value => this.updateInput('quantity', value)}
                    autoCapitalize={'none'}
                    keyboardType={'numeric'}
                    style={{borderWidth:1,borderColor:"orange",margin:10,borderRadius:15,textAlign:"center"}}
                />
                <TextInput
                    placeholder="Category"
                    value={this.state.requestproduct.category.value}
                    onChangeText={value => this.updateInput('category', value)}
                    autoCapitalize={'none'}
                    style={{borderWidth:1,borderColor:"orange",margin:10,borderRadius:15,textAlign:"center"}}
                   
                   // style={{margin:10,borderWidth:2,backgroundColor:'white',borderRadius:10,borderColor:'white',marginBottom: 10, marginTop: 20}}
                />
                 {/* <View style={styles.textAreaContainer} > */}
                    <TextInput
                    style={styles.textArea}
                    value={this.state.requestproduct.description.value}
                    onChangeText={value => this.updateInput('description',value)}
                    underlineColorAndroid="transparent"
                   
                    style={{borderWidth:1,borderColor:"orange",margin:10,borderRadius:15,textAlign:"center"}}
                   
                   // style={{margin:10,borderWidth:2,backgroundColor:'white',borderRadius:10,borderColor:'white',marginBottom: 10, marginTop: 20}}
                    placeholder="A Short description of the product"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    />
                 {/* </View> */}
                    <Text style={{color:'red'}}>{this.state.messageError}</Text>
                    <View style={{ margin:25,borderRadius:30,borderColor:'blue',backgroundColor:'red'}}>
                <TouchableOpacity
                    onPress={()=>this.sendRequest()}
                     >
                    <Text style={{padding:10,textAlign:"center",fontSize:20,fontWeight:'bold',color:'white'}}> Submit Request </Text>
                </TouchableOpacity>
                </View>
                {/* </View> */}
                
            </ScrollView>  
            </View>          
        )
    }
}
const styles = StyleSheet.create({
    textAreaContainer: {
      borderColor: 'grey',
      borderWidth: 1,
      padding: 5
    },
    textArea: {
      height: 150,
      justifyContent: "flex-start"
    }
  })