import React, {Component} from 'react';
import {
  Image,
  View,
  Text,
  ScrollView,
  TextInput,
  StylSheet,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Modal,
  Picker,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from './../config/firebase';

import api from './../config/api';
import {number} from 'prop-types';

export default class cart extends Component {
  state = {
    sendItem: {},
    cartItems: [],
    userLoggedIn: '',
    check: true,
    trn:'',
    itemstoRemove: [],
    totalCartPrice: 0,
    address:'',
    modalVisible:false,
    paymentmode:'COD'
  };

  componentWillMount = async () => {
    // this.RemoveSession();
    console.log('---------???-componrt will mount ttt');
    await this.checkLoggedin();
  };

  checkLoggedin = async () => {
    console.log('--------------------');;
    try {
      const value = await AsyncStorage.getItem('userID');
      if (value !== null) {
        this.setState({
          userLoggedIn: value,
          check: false,
        });;
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2');
        console.log(this.state.userLoggedIn);
        console.log('logged in inside cartLOGGED IN');
        // alert("user is logged in")
        await this.updateCart();
      } else {
        this.setState({check:true});
        console.log('NOT LOGGED IN');
        // alert("user is not logged in in cart");
      }
    } catch (error) {
      console.log(error);
      this.setState({check:true})
      // Error retrieving data
    }
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          // Sign-out successful.
        },
        function(error) {
          // An error happened.
        },
      );
  };
 updateCart = async() => {
    console.log('\n\n++++++++++++IN UPDATE CART +++++++++++++++');
    console.log(this.state.userLoggedIn);

    firebase
      .database()
      .ref('Cart/' + this.state.userLoggedIn)
      .on('value', snapshot => {
        // console.log(snapshot.val());
        var itemsInsideCart = [];
        var cart = snapshot.val();
        for (let i in cart) {
          var itemToPush = {
            cartId: i,
            itemName: cart[i].itemToCart.name,
            itemPrice: cart[i].itemToCart.price,
            itemQuantity: cart[i].itemToCart.quantity,
            itemId: cart[i].itemToCart.productID,
          };

          console.log('---' + cart[i].itemToCart.name);;
          itemsInsideCart.push(itemToPush);;
        }

        this.setState({
          cartItems: itemsInsideCart,
        });

        console.log('@)@)@)@)@)@))@)@)@)@)@)@)@)@))@)@)@)@)@)');
        console.log(itemsInsideCart);;
        console.log(this.state.cartItems);


            var totalPrice = 0;
        for (let i in itemsInsideCart) {
          console.log('item=>>>>>>>' + JSON.stringify(itemsInsideCart[i]));
          var quantity = itemsInsideCart[i].itemQuantity;
          var price = itemsInsideCart[i].itemPrice;
          console.log('Item Quantity: ' + quantity + '\nItem Price: ' + price);
          totalPrice = quantity * price + totalPrice;

            }
        console.log('TOTAL PRICE OF CART IS : ' + totalPrice);
        this.setState({totalCartPrice: totalPrice});
        // this.saveChanges();
      });
  };
  updateQnty = (op, cartId, index) => {
    console.log('=============================');
    console.log(this.state.userLoggedIn + '  ' + cartId);
    var itemQuantity = this.state.cartItems[index].itemQuantity;
    var copyItem = this.state.cartItems;

    if (op === '+') {
      itemQuantity += 1;
      
      copyItem[index].itemQuantity = itemQuantity;
      this.setState({cartItems: copyItem});
    } else if (op === '-') {
      if(itemQuantity<=1){
        itemQuantity=1;
    }else{
      itemQuantity-=1;


    }
      copyItem[index].itemQuantity = itemQuantity;
      this.setState({cartItems: copyItem});
    } else {
      console.log('--------------------------');
      console.log(index);
      var copy = this.state.itemstoRemove;

      copy.push(this.state.cartItems[index].cartId);

      var copyCart = this.state.cartItems;

      var newList = copyCart.splice(index, 1);
      console.log('Copy Cart\n' + JSON.stringify(copyCart));
      console.log('State Cart\n' + JSON.stringify(this.state.cartItems));

      console.log('NewList:\n' + JSON.stringify(newList));

      console.log('----------===========');
      console.log(this.state.cartItems.length);

      this.setState({itemstoRemove: copy, cartItems: copyCart});
    }
    this.saveChanges();
  };
  saveChanges = () => {
    console.log('unmoint -- ' + this.state.userLoggedIn);
    console.log(this.state.cartItems);
    for (let i in this.state.cartItems) {
      console.log(i);;
      if (this.state.cartItems[i] === 'cartId') {
        console.log(this.state.cartItems[i]);;
      }
      console.log(
        'Cart/' +
          this.state.userLoggedIn +
          this.state.cartItems[i].cartId +
          'itemToCart',
      );
      console.log('======================??=============================')
      // console.log(this.state.cartItems[i].itemQuantity);;
      // console.log(this.state.userLoggedIn+'    '+this.state.cartItems[i])
      firebase
        .database()
        .ref(
          'Cart/' +
            this.state.userLoggedIn +
            '/' +
            this.state.cartItems[i].cartId +
            '/itemToCart',
        )
        .update({quantity: this.state.cartItems[i].itemQuantity});
    }
    for (let i in this.state.itemstoRemove) {
      var id = this.state.itemstoRemove[i];
      firebase
        .database()
        .ref('Cart/' + this.state.userLoggedIn + '/' + id)
        .remove();
    }
  };
  viewDetails = itemId => {
    console.log('----------viewDetails' + itemId);

    firebase
      .database()
      .ref('Product/' + itemId + '/')
      .on(
        'value',
        snapshot => {
          console.log(snapshot.val());
          var x = snapshot.val();
          var temp = {
            name: x.name,
            productId: itemId,
            category: x.category,
            imgUrl: x.imgUrl,
            isBuyNowPayLater: x.isBuyNowPayLater,
            offerPrice: x.offerPrice,
            price: x.price,
            quantity: x.quantity,
            wholesalerId: x.wholesalerId,
          };
          console.log('TEMP:\n');;
          console.log(temp);

          console.log('==============');

          this.setState({sendItem: temp});
          // return products;
          console.log("State Products: " + JSON.stringify(this.state.sendItem))
        },
        error => {
          console.log(error);
        },
      );

    // this.setState({ sendItem: temp });
    console.log('STATE SEND ITEMS : ' + JSON.stringify(this.state.sendItem));;
    console.log('~~~~~~~~~??~~~~~~~~~~');
    console.log(this.state.products[0]);

    var item = {item: this.state.products[0]};
    this.props.navigation.navigate('ProductDetail', {
      itemId: 86,
      othertParam: this.state.products,
    });
  };

  checkout=async()=>{
    await this.checkLoggedin();
    // console.log(check)
    console.log('------------------Checkout user logged in--------');
    // console.log(this.state.userLoggedIn)
    console.log(this.state.check)
    if(this.state.check){
      // this.setState({check:false})
      return;
    }
    console.log('\n\n------------------------IN CHeck out-----------------')
    console.log(this.state.userLoggedIn)
    console.log(this.state.cartItems)
    var item={item:{}}
    this.setState({modalVisible:!this.state.modalVisible});
    var items=this.state.cartItems;
  
  }
  addInvoice = (item,quantity) => {
		// let item = this.props.navigation.getParam('item', 'not valid');
		// let quantity = this.props.navigation.getParam('quantity', 1);

    console.log('-----ADD INVOICE------\n');
    console.log(item);

        var trackingNumber = Math.floor(10000 + Math.random() * 1000);
        // var trackingNumber = 100;
        var wholesalerId;
        firebase.database().ref('Product/'+item.item.itemId).once('value',(snapshot)=>{
            var x=snapshot.val();
            wholesalerId=x.wholesalerId;
        })
        this.setState({trn:trackingNumber},()=>{
                console.log("TRN STATE: "  + this.state.trn)
                console.log("TRN TRACKING: "  +trackingNumber)

            let finalitem = {
                tracking:trackingNumber,
                quantity: quantity,
                itemid: item.item.itemId,
                wholesalerid: wholesalerId,
                retailerid: this.state.userLoggedIn,
                paymentmode: this.state.paymentmode,
                deliveryaddress: this.state.address,
                totalprice: item.item.price * quantity
            };
            console.log('--------------Befpore database-----')
            console.log(item)
            console.log(quantity)
            console
            firebase
                .database()
                .ref('Order/')
                .push({
                    productid:item.item.itemId,
                    tracking:trackingNumber,
                    quantity: quantity,
                    status:'pending',
                    dateOfOrder:Date(Date.now()).toString(),
                    wholesalerid: wholesalerId,
                    retailerid: this.state.userLoggedIn,
                    paymentmode: this.state.paymentmode,
                    deliveryaddress: this.state.address,
                    totalprice: item.item.itemPrice * quantity
                })
                .then((data) => {
                    console.log('\nFinal Item \n');
                    console.log(' --------- final----------');
                    this.onRegisterPressed(finalitem);
                    // console.log('---------\n'+finalitem)
                    console.log('data -----\n ', data);

                    // this.props.navigation.navigate(
                    //     'OrderDetail',
                    //     {
                    //         OrderDetail: {
                    //             item: item.item,
                    //             quantity: quantity,
                    //             address: this.state.address,
                    //             paymentmode: this.state.paymentmode,
                    //             trn:this.state.trn,
                                
                    //         }
                    //     }

                    // )
                })
                .catch((error) => {
                    //error callback
                    console.log('error ', error);
                });
                

        })
        
  };
  removeItemFromCart=(id)=>{
    firebase.database().ref('Cart/'+id).remove()
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
  }
	async onRegisterPressed(data) {
		this.setState({ showProgress: true });
		try {
			let response = await fetch(api+'/sendmail', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					data: data
				})
			});
			let res = await response.text();
			if (response.status >= 200 && response.status < 300) {
				//Handle success
				let accessToken = res;
				console.log('----------------------');
				console.log(accessToken);
				//On success we will store the access_token in the AsyncStorage
				//   this.storeToken(accessToken);
				//   this.redirect('home');
			} else {
				//Handle error
				let error = res;
				throw error;
			}
		} catch (errors) {
			//errors are in JSON form so we must parse them first.
			let formErrors = JSON.parse(errors);
		}
  }
  confirmCheckout=()=>{
    console.log(this.state.userLoggedIn)
    console.log(this.state.cartItems)
    var item={item:{}}
    var items=this.state.cartItems;
    for (var i in items){
      item.item=items[i];

      var quantity=items[i].itemQuantity;
      this.addInvoice(item,quantity);
  
    }
    console.log('-------------------Removing ccartt---------------')
    this.removeItemFromCart(this.state.userLoggedIn);
    this.setState({modalVisible:false})
    this.props.navigation.navigate('Cart',{message:'Orders placed successfully'});
  }
//  async shouldComponentUpdate(){
//     console.log('---------???-componrt did mount ttt');
//     await this.checkLoggedin();
//   }
  // async componentWillUpdate(){
  //   console.log('---------???-componrt did mount ttt');
  //   await this.checkLoggedin();
    
  // }
 
  render() {

      let product = this.props.navigation.getParam('item', 'default');
  let quantity = this.props.navigation.getParam('quantity', 'default');
    console.log('%%%%%%%%%%%%%%%product%%%%%%%%%%%%%%%%%%%%%%%%%');
    console.log(product);
    console.log('%%%%%%%%%%%%%%%quantity%%%%%%%%%%%%%%%%%%%%%%%%%');
    console.log(quantity);;
    // console.log(this.state.cartItems);;
    console.log('-------'+this.state.check)
    return this.state.check ? (
      <View style={{flex:1}}>

         
        <View style={{alignContent:'center',alignItems:'center',paddingTop:40}}>
          <TouchableOpacity onPress={()=>this.checkLoggedin()}>
            <Icon name='retweet' size={100} ></Icon>
            <Text style={{paddingLeft:20,color:'green'}}>Refresh</Text>
          </TouchableOpacity>

          {/* {this.checkLoggedin} */}

          <Text style={{color:'red',paddingTop:20}}>You are not logged in</Text>
          <View style={{paddingTop:150}}>
          <TouchableOpacity style={{borderWidth:4,borderColor:'blue'}} onPress={()=>this.props.navigation.navigate('Landing')}> 
            <Text style={{fontSize:40,color:'red'}}>  Sign In/Signup </Text>
          </TouchableOpacity>
          </View>
          </View>
      </View>
         ) : (
      // <View>

      <ScrollView style={styles.main}>
        <Text>{this.props.navigation.getParam('message',null)}</Text>
        <View style={{flexDirection: 'row', paddingLeft: 65}}>
          <Icon name="shopping-cart" size={60} />
          <Text style={{padding: 15, fontSize: 35}}>Shopping Cart</Text>
        </View>

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />

        {this.state.cartItems.length === 0 ? (
          <View>
            <Text>Empty</Text>
          </View>
        ) : (
          this.state.cartItems.map((data, index) => {
            return (
              <TouchableOpacity onPress={() => this.viewDetails(data.itemId)}>
                <View
                  style={{backgroundColor: 'lightgray', flexDirection: 'row'}}>
                  <Image
                    style={styles.itemImage}
                    source={{
                      uri:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Disk_pack1.svg/1200px-Disk_pack1.svg.png',
                    }}
                  />

                  <View style={{margin: 2}}>
                    <Text style={{fontSize: 12}}> {data.itemName}</Text>
                    <Text style={{fontSize: 14}}> RS. {data.itemPrice}/-</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => this.updateQnty('-', data.cartId, index)}>
                    <Icon
                      name="minus-circle"
                      style={{marginTop: 10, marginLeft: 60, fontSize: 30}}
                    />
                  </TouchableOpacity>
                  <View>
                    <Text
                      style={{marginLeft: 10, marginRight: 10, fontSize: 30}}>
                      {data.itemQuantity}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => this.updateQnty('+', data.cartId, index)}>
                    <Icon
                      name="plus-circle"
                      style={{marginTop: 10, fontSize: 30}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.updateQnty('x', data.cartId, index)}>
                    <Icon
                      style={{marginTop: 10, marginLeft: 28}}
                      name="window-close"
                      color="red"
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );;
          })
        )}

        {/* <TouchableOpacity>
          <Text>Save Changes</Text>
        </TouchableOpacity> */}

        <View style={styles.container}>


                        <View>
            <Text style={styles.buttonContainer}>
              Total Price :{this.state.totalCartPrice}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 500,
              backgroundColor: 'green',
            }}
            onPress={()=>this.checkout()}
            >
            <View>
              <Text style={styles.buttonContainer1}>Checkout</Text>
            </View>
          </TouchableOpacity>
        </View>



        
        <Modal
        // style={{margin:20}}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.checkInput()}>
          <View style={{flex:1,borderWidth:1,margin:20}}>
            <View style={{marginTop:100,padding:20}}>
              <TouchableOpacity onPress={()=>this.setState({modalVisible:false})}>
                 <Icon name='times' color={'red'} size={40}></Icon>
             
              </TouchableOpacity>
              <TextInput 
              
              multiline={true}
                value={this.state.address}
                placeholder="Enter your delivery address "
               onChangeText={(value)=>this.setState({address:value})}
                style={{fontSize:30,textAlign:"center",marginTop:10,width:'100%',borderWidth:1,borderRadius:10}} 
             >

              </TextInput>
              {/* <TextInput 
                value={this.state.paymentmode}
                onChangeText={(value)=>this.setState({paymentmode:value})}
              > */}
              <View style={{margin:10,borderWidth:1,borderRadius:10}}>
                <Picker
                      selectedValue={this.state.paymentmode}
                      style={{ width: 300}}
                      onValueChange={(value)=>this.setState({paymentmode:value})}>
                      <Picker.Item label="COD" value="COD" />
                      <Picker.Item label="Credit Card" value="Credit Card" />
                      <Picker.Item label="Easy Paisa" value="Easy Paisa" />
                      
                    </Picker>
                  </View>
              {/* </TextInput> */}

              <TouchableOpacity
                onPress={() => this.confirmCheckout()}
                style={{backgroundColor:"orange",borderRadius:100}}
                >
                <Text style={{textAlign:"center",padding:10,fontWeight:"bold",fontSize:20}}>Confirm Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* <TouchableOpacityf
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableOpacity> */}
      </ScrollView>
      // </View>

    );;
  }
}

const styles = StyleSheet.create({
  container: {
    // height:"100%",
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginTop: 400,
    fontWeight: 'bold',
    color: 'gray',
  },
  buttonContainer: {
    flex: 1,
    padding: 10,
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonContainer1: {
    flex: 1,
    padding: 10,
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  main: {
    padding: 5,
    margin: 20,
    // padding:5,
    flex: 1,
    // height:'100%',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
  },
  itemImage: {
    resizeMode: 'contain',
    height: 30,
    width: 30,
    margin: 10,
  },
});
