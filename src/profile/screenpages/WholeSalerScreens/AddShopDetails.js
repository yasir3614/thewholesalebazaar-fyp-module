import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import firebase from '../../../config/firebase';

import ValidationRules from '../../components/ValidationRules';
export default class AddShopDetails extends Component {
  state = {
    
    messageError:'',
    shopDetail: {
      name: {
        value: '',
        valid:true,
        type: 'textInput',
        rules:{
          
        },
      },
      city: {
        value: '',
        valid:true,
        type: 'textInput',
        rules:{
          
        }
      },
      officeContact: {
        value: '',
        valid:true,
        type: 'textInput',
        rules:{
          maxLength:11
        },
      },
      mainProduct: {
        value: '',
        valid:true,
        type: 'textInput',
        rules:{
          
        }
      },
      workingFrom: {
        value: '',
        valid:true,
        type: 'textInput',
        rules:{
          
        }
      },
      workingTo: {
        value: '',
        valid:true,
        type: 'textInput',
        rules:{
          
        }
      },
      openingTime: {
        value: '',
        valid:true,
        type: 'textInput',
        rules:{
          
        }
      },
      closingTime: {
        value: '',
        valid:true,
        type: 'textInput',
        rules:{

        }
      },
      officialEmail: {
        value: '',
        valid:true,
        type: 'textInput',
        rules:{
          isEmail: true
        },
      },
    },
    userLoggedIn:''
  };
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

    this.setState({
			hasErrors: false
		});
    let formCopy = this.state.shopDetail;

    //make all the changes in copy before state so making a copy
		
		let rules = formCopy[name].rules;
		let valid = ValidationRules(value, rules, formCopy);

		formCopy[name].value = value;
		formCopy[name].valid = valid;


    this.setState({
      form: formCopy,
    });
  };

  
  checkConstraints=()=>{
     var cred=this.state.shopDetail;
     if(cred.officeContact.valid && cred.officialEmail && cred.city.value!=0 &&
      cred.closingTime.value!=0 && cred.mainProduct.value!=0 && cred.name.value!=0
      && cred.officeContact.value!=0 && cred.officialEmail.value!=0 && cred.openingTime.value!=0
      && cred.workingFrom.value!=0 && cred.workingTo.value!=0 
      ){
        return true;
      }else{
        return false;
      }
  }

  AddShop = () => {

    if(!this.checkConstraints()){
        this.setState({messageError:'Please check complete the details'})
      return ;
    }
    var wholesalerId_ = this.state.currentUserId;
   
    console.log(this.state.shopDetail);

    var wholesalerId_ = this.state.currentUserId;

    firebase
      .database()
      .ref('Users/'+this.state.userLoggedIn)
      .update({
        name: this.state.shopDetail.name.value,
        city: this.state.shopDetail.city.value,
        officeContact: this.state.shopDetail.officeContact.value,
        workingFrom: this.state.shopDetail.workingFrom.value,
        workingTo: this.state.shopDetail.workingTo.value,
        openingTime: this.state.shopDetail.openingTime.value,
        closingTime: this.state.shopDetail.closingTime.value,
        officialEmail: this.state.shopDetail.officialEmail.value,
        mainProduct: this.state.shopDetail.mainProduct.value,
        
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

  render() {
    return (
        this.state.userLoggedIn==='' ?  <ActivityIndicator></ActivityIndicator>:
      <ScrollView style={{flex: 1}}>
       
        <Text style={{color:"white",fontWeight:"bold",fontSize:30,padding:15,textAlign:"center",width:"100%",backgroundColor:"orange"}}>Update Shop Details</Text>
        <View style={{margin:20}}>

          <TextInput
            placeholder="Enter Shop Name"
            value={this.state.shopDetail.name.value}
            onChangeText={value => this.updateInput('name', value)}
            autoCapitalize={'none'}
            style={{borderWidth:1,borderRadius:300,textAlign:"center",fontSize:16,marginBottom: 10, marginTop: 20}}
          />
          <TextInput
            placeholder="City of location"
            value={this.state.shopDetail.city.value}
            onChangeText={value => this.updateInput('city', value)}
            autoCapitalize={'none'}
            style={{borderWidth:1,borderRadius:300,textAlign:"center",fontSize:16,marginBottom: 10, marginTop: 20}}

          />
          <TextInput
            placeholder="Contact Number of your office"
            value={this.state.shopDetail.officeContact.value}
            onChangeText={value => this.updateInput('officeContact', value)}
            autoCapitalize={'none'}
            style={{borderWidth:1,borderRadius:300,textAlign:"center",fontSize:16,marginBottom: 10, marginTop: 20}}

          />

          <TextInput
            placeholder="Working From"
            value={this.state.shopDetail.workingFrom.value}
            onChangeText={value => this.updateInput('workingFrom', value)}
            autoCapitalize={'none'}
            style={{borderWidth:1,borderRadius:300,textAlign:"center",fontSize:16,marginBottom: 10, marginTop: 20}}

          />
          <TextInput
            placeholder="Working To"
            value={this.state.shopDetail.workingTo.value}
            onChangeText={value => this.updateInput('workingTo', value)}
            autoCapitalize={'none'}
            style={{borderWidth:1,borderRadius:300,textAlign:"center",fontSize:16,marginBottom: 10, marginTop: 20}}

          />

          <TextInput
            placeholder="Shop opening"
            value={this.state.shopDetail.openingTime.value}
            onChangeText={value => this.updateInput('openingTime', value)}
            autoCapitalize={'none'}
            style={{borderWidth:1,borderRadius:300,textAlign:"center",fontSize:16,marginBottom: 10, marginTop: 20}}

          />

          <TextInput
            placeholder="Shop closing time"
            value={this.state.shopDetail.closingTime.value}
            onChangeText={value => this.updateInput('closingTime', value)}
            autoCapitalize={'none'}
          
            style={{borderWidth:1,borderRadius:300,textAlign:"center",fontSize:16,marginBottom: 10, marginTop: 20}}

          />
          <TextInput
            placeholder="Your official Email"
            value={this.state.shopDetail.officialEmail.value}
            onChangeText={value => this.updateInput('officialEmail', value)}
            autoCapitalize={'none'}
            style={{borderWidth:1,borderRadius:300,textAlign:"center",fontSize:16,marginBottom: 10, marginTop: 20}}

          />
           {
             this.state.shopDetail.officialEmail.valid ? ( null ) :( 
             <Text style={{color:'red'}}>
               Please Enter Valid Email
             </Text>)
           }

          <TextInput
            placeholder="Whats your main product"
            value={this.state.shopDetail.mainProduct.value}
            onChangeText={value => this.updateInput('mainProduct', value)}
            autoCapitalize={'none'}
            style={{borderWidth:1,borderRadius:300,textAlign:"center",fontSize:16,marginBottom: 10, marginTop: 20}}

          />
          {/* <Button title="Sign In" onPress={()=>this.props.navigation.navigate("SignIn")}></Button>
            <Button title="Creat new Account" onPress={()=>this.props.navigation.navigate("CreateAccount")}></Button>
            <Button title="Reset Password" onPress={()=>this.props.navigation.navigate("SignIn")}></Button> */}
          <View>
          <Text style={{color:'red'}}>{this.state.messageError}</Text>
            <Button
              title="Update Shop"
              color="#fd9727"
              onPress={() => this.AddShop()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
