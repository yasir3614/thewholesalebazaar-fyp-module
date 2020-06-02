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
import firebase from '../../config/firebase';
export default class ClearStockForm extends Component {
  state = {
    messageError:'',
    isLoading:false,
    form:{
    newprice:{
      value:''
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
    let formCopy = this.state.form;
    formCopy[name].value = value.replace(/[^0-9]/g, '');
    this.setState({
      form: formCopy,
    });
  };

  
  // this.value.replace(/[^0-9]/g, '');
  AddClearStock = () => {
    this.setState({isLoading:true})
    
    if(this.state.form.newprice.value.length==0){
    this.setState({isLoading:false})
      
      this.setState({messageError:'Price Is Empty'})
      return;
    }
    // var wholesalerId_ = this.state.currentUserId;
   
    // console.log(this.state.shopDetail);

    // var wholesalerId_ = this.state.currentUserId;
    var productid=this.props.navigation.getParam('otherParam', 'default value');
    console.log(productid)
    firebase
      .database()
      .ref('ClearStock/')
      .push({
        productid:productid,
        newprice:this.state.form.newprice.value,
        
      })
      .then(data => {
        //success callback
        this.setState({isLoading:false})
        console.log('data ', data);
        alert("Success!")
        this.props.navigation.navigate('WholeSalerProducts');
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
        {/* <View
          style={{
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}

        /> */}

        <View style={{margin:50}}>

          <View>

            <Text style={{fontSize:20,fontWeight:"bold",textAlign:"center"}}>Add a price for your stock ( The product then will be visible in the clear stock section)</Text>
            
          </View>
          <TextInput
            placeholder="Price of Stock"
            value={this.state.form.newprice.value}
            onChangeText={value => this.updateInput('newprice', value)}
            autoCapitalize={'none'}
            keyboardType={'numeric'}
            style={{borderWidth:1,borderRadius:200,fontSize:15,textAlign:"center",marginBottom: 10, marginTop: 20}}
          />
          <Text style={{textAlign:"center",color:"red",fontWeight:"bold"}}>{this.state.messageError}</Text>
          <View>
            {
              this.state.isLoading ? (
                 <View>
                    <ActivityIndicator size="small"></ActivityIndicator>
                   </View>
              ):(
                <Button
                title="Submit"
                color="#fd9727"
                onPress={() => this.AddClearStock()}
               />
  
              )
            }
          </View>
        </View>
      </ScrollView>
    );
  }
}
