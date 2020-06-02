import React, { Component } from 'react'
import {StyleSheet,AsyncStorage,View,Text,TouchableOpacity,TextInput,ScrollView} from 'react-native';
import firebase from '../../../config/firebase';

export default class ProductScheduling extends Component {
    state ={
        productSchedule:{
            date:{
                value:'',
                type:'text'
            },
            quantity:{
                value:'',
                type:'number'
            },
            retailerid:{
                value:''
            },
            wholesalerid:{
                value:''
            },
            productid:{
                value:'',
            }
            

        },
        userLoggedIn:''
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
                this.AddProductSchedule();
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
        let formCopy = this.state.productSchedule;
        formCopy[name].value = value;
        this.setState({
          productSchedule: formCopy,
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
        requestproduct={
            name:this.state.requestproduct.name.value,
            quantity:this.state.requestproduct.quantity.value,
            description:this.state.requestproduct.description.value,
            category:this.state.requestproduct.category.value    
        }
        console.log('------Send Request-----')
        console.log(requestproduct)
        this.AddRequestProduct(requestproduct);
    }
    
    render() {
        return (
            <ScrollView>
                <Text> Add the product details </Text>
                <TextInput
                    placeholder="What product do you want?"
                    value={this.state.requestproduct.name.value}
                    onChangeText={value => this.updateInput('name', value)}
                    autoCapitalize={'none'}
                    style={{marginBottom: 10, marginTop: 20}}
                />
                <TextInput
                    placeholder="What quantity do you want?"
                    value={this.state.requestproduct.quantity.value}
                    onChangeText={value => this.updateInput('quantity', value)}
                    autoCapitalize={'none'}
                    style={{marginBottom: 10, marginTop: 20}}
                />
                <TextInput
                    placeholder="Whats category of product ?"
                    value={this.state.requestproduct.category.value}
                    onChangeText={value => this.updateInput('category', value)}
                    autoCapitalize={'none'}
                    style={{marginBottom: 10, marginTop: 20}}
                />
                 <View style={styles.textAreaContainer} >
                    <TextInput
                    style={styles.textArea}
                    value={this.state.requestproduct.description.value}
                    onChangeText={value => this.updateInput('description',value)}
                    underlineColorAndroid="transparent"
                    placeholder="help us to get you exactly what you want"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    />
                 </View>
                
                <TouchableOpacity
                    onPress={()=>this.sendRequest()}
                >
                    <Text> Send Request to sellers </Text>
                </TouchableOpacity>
                

            </ScrollView>            
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