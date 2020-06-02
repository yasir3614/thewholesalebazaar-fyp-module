import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Picker, ActivityIndicator,TouchableHighlight, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../../../src/config/firebase';
import DatePicker from 'react-native-datepicker';
import CommentBox from '../components/comment';
import api from '../../config/api';

class ProductDetailScreen extends Component {
	componentDidMount = () => {
		this.loginUser();
	};
	// componentWillUnmount = () =>{
	//     this.setState({
	//         userLoggedIn:null
	//     })
	// }
	loginUser = () => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					userLoggedIn: user
				});

				// console.log(user);
				console.log('product detail LOGGED IN');
				// this.props.navigation.navigate("Landing");
				// alert("user is logged in")
			} else {
				this.setState({
					userLoggedIn: {}
				});
			}
		});
	};

	AddToCart = (item, reqdquantity) => {
		console.log('----adding cart to databse AddTOCart\n');
		if (this.state.userLoggedIn.uid != null) {
			var itemToCart = {
				productID: item.item.productId,
				name: item.item.name,
				price: item.item.price,
				quantity: reqdquantity
			};
			console.log('ITEM:' + item);
			console.log('user cart logged in');
			alert('Item Added To Cart ');
			//   firebase.database().ref('/Cart'+this.state.userLoggedIn.uid)
			firebase
				.database()
				.ref('Cart/' + this.state.userLoggedIn.uid)
				.push({
					itemToCart
				})
				.then((data) => {
					//success callback
					console.log('data ', data);
				})
				.catch((error) => {
					//error callback
					console.log('error ', error);
				});
		} else {
			console.log('user cart not logged in');
			this.props.navigation.navigate('Landing');
		}
	};
	updateQuantity = (x) => {
		let item = this.props.navigation.getParam('othertParam', 'not valid');
		var stockQuantity;
		firebase.database().ref('Product/' + item.item.productId).on('value', (snapshot) => {
			var x = snapshot.val();
			stockQuantity = x.quantity;
		});

		if (x === 'd') {
			let q = this.state.quantity;

			q--;

			this.setState({ quantity: q });
			if (this.state.quantity <= 1) {
				alert('Minimum Quantity Reached');
				this.setState({ quantity: 1 });
			}
			console.log(this.state.quantity);
		} else if (x === 'i') {
			let q = this.state.quantity;

			q++;
			console.log('---------------Incrementing--------------');
			this.setState({ quantity: q });
			if (this.state.quantity >= stockQuantity) {
				alert('Maximum Quantity Reached');
				q--;
				this.setState({ quantity: q });
			}
			console.log(this.state.quantity);
		}
	};
	state = {
		comment: '',
		userLoggedIn: {},
		item: {},
		isLoading:false,
		value: 70,
		quantity: 1,
		text: '',
		rerender:false,
		maxStock: 5,
		modalVisible: false,
		date: ''
	};

	setModalVisible = (val) => {
		if (this.state.userLoggedIn.uid != null) {
			this.setState({ modalVisible: val });
		} else {
			alert('Please Loggin first');
		}
	};

	myFunction() {
		let myItem = props.navigation.navigate.getParms('ProductDetail', 'not valid');
		// let myItem = propItem.myI
		this.setState({
			item: myItem
		});
	}
	constructor(props) {
		super(props);
	}
	AddToSchedule(scheduleInfo) {
		firebase
			.database()
			.ref('Schedule/')
			.push({
				scheduleInfo
			})
			.then((data) => {
				//success callback
				console.log();
			})
			.catch((error) => {
				//error callback
				console.log('error ', error);
			});
	}
	addScheduleToDatabase = (product) => {
		var item = product.item;
		console.log('%%@%@%@%@%@%@%@%');
		//quantity this.state.quantity
		var quantity = this.state.quantity;
		console.log(this.state.quantity);
		var dateOfDelivery = this.state.date;
		console.log(item.price);
		var totalPrice = item.price * quantity;
		console.log(totalPrice);

		//make table in database with following values:
		//quantity , total_price, dateOfDelviery (date), wholesalername, retailername (this.state.userLogged)
		var retailerId = this.state.userLoggedIn.uid;
		console.log(retailerId);

		var scheduleInfo = {
			s_item: item.productId,
			s_quantity: quantity,
			s_totalPrice: totalPrice,
			s_date: dateOfDelivery,
			s_wholesaler: item.wholesalerId,
			s_retailer: retailerId,
			status: 'requested'
		};

		this.AddToSchedule(scheduleInfo);
		alert('Order Succesfuly Scheduled. The status of your order is visible in the schedule section.');
		// console.log("-2-2-2-2-2-")
		// console.log(scheduleInfo);
	};
	buyNow = (item) => {
		if (this.state.userLoggedIn.uid != null) {
			this.props.navigation.navigate('ProductCheckout', {
				item: item,
				quantity: this.state.quantity
			});
		} else {
			alert('please login first');
		}
	};
	sched = (item) => {
		if (this.state.userLoggedIn.uid != null) {
			this.props.navigation.navigate('ProductCheckout', {
				item: item,
				quantity: this.state.quantity
			});
		} else {
			alert('please login first');
		}
	};

	submitComment = async (item)=>{
		
		console.log("---$$$$$$$$$$$$$$$$$$$$$$$$$$$$$--");
		console.log("Item: " )
		console.log(item);
		console.log("Comment: " + this.state.comment);
		console.log("Logged In User" )
		console.log(this.state.userLoggedIn.uid);
		this.setState({isLoading:true});
		// console.log("CHECHCECEHCEC");
		try {
			console.log('----------------------here-------')//yahan tak aarha ha
			let response = await fetch(api+"/addcomment", {
				method: 'POST',
				headers: {
					Accept: 'application/json, text/plain, */*', 
                    'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userid:this.state.userLoggedIn.uid,
					productid:item.item.productId,
					comment: this.state.comment
				})
			});
			console.log('----------------------here 2-------')
            let res = await response.text();
			console.log(res);
			console.log('----------------------here3-------')
			
              
			if (1) {
               
				console.log('----------Sign IN ------------');
				// this.setState({isLoading:false,comment:''}) //ye hota hai ?
				console.log('-------------Signin/////---------');
				this.setState({isLoading:false,comment:''});
                
			} else {
				//Handle rror
				console.log('----------------------here4-------')

                this.setState({isLoading:false});
				let error = res;
				console.log(error)
				throw error;
				 
			}
		} catch (errors) {
			console.log('------------------------here 5--------------------')
			//errors are in JSON form so we must parse them first.
			console.log(errors)

			let formErrors = JSON.parse(errors);
		}
	//	this.setState({isLoading:false,comment:''});
	}

	render() {
		let item = this.props.navigation.getParam('othertParam', 'not valid');

		console.log('CECK------------------');
		console.log('\n\n\n-----------CCHECKING 123 132-----------------\n\n\n');
		// console.log(item);

		return (
			<ScrollView style={{ flex: 1, backgroundColor: '#edf0ef' }}>
				<ScrollView>
					<Text style={styles.itemName}>{item.item.name}</Text>

					<View>
						<ScrollView
							style={{ margin: 5, borderWidth: 1, borderColor: 'red', width: '98%' }}
							horizontal={true}
							showsHorizontalScrollIndicator={true}
						>
							<Image
								style={{ flex: 1, width: 200, height: 200, resizeMode: 'contain' }}
								// source={require('../../temp_product/apple.jpg')}
								source={{ uri: item.item.imgUrl }}
							/>
							<Image
								style={{ flex: 1, width: 200, height: 200, resizeMode: 'contain' }}
								// source={require('../../temp_product/apple.jpg')}
								source={{ uri: item.item.imgUrl }}
							/>
							<Image
								style={{ flex: 1, width: 200, height: 200, resizeMode: 'contain' }}
								// source={require('../../temp_product/apple.jpg')}
								source={{ uri: item.item.imgUrl }}
							/>
						</ScrollView>
					</View>

					<View>
						<Text style={styles.descriptionTitle}>Description</Text>
						{/* <Text style={styles.description}>{item.item.description}</Text> */}
						<Text style={styles.description}>Quantity Available: {item.item.quantity}</Text>
						<View>
							<View
								style={{
									flexDirection: 'row',
									marginTop: 20,
									marginBottom: 20,
									width: '40%',
									borderColor: 'black'
								}}
							>
								<Text
									style={{
										color: '#2d2e2d',

										paddingLeft: 20,
										paddingRight: 20,
										fontSize: 20
									}}
								>
									Quantity
								</Text>

								<TouchableOpacity onPress={() => this.updateQuantity('d')}>
									{/* <Text style={{ paddingLeft:10,paddingRight:10,backgroundColor:"green",fontSize: 25 }}>+</Text> */}
									<Icon name="minus-circle" size={30} color="red" />
								</TouchableOpacity>

								<Text style={{ paddingLeft: 10, paddingRight: 10, fontSize: 22 }}>
									{this.state.quantity}
								</Text>
								<TouchableOpacity onPress={() => this.updateQuantity('i')}>
									{/* <Text style={{  paddingLeft:10,paddingRight:10, fontSize: 25 }}>-</Text> */}
									<Icon name="plus-circle" size={30} color="black" />
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>

				<View style={{ marginBottom: 30 }}>
					<View style={{ paddingLeft: 80, flexDirection: 'row' }}>
						<TouchableOpacity
							style={styles.buttonBuy}
							// disabled={item.item.quantity}
							onPress={() => this.buyNow(item)}
						>
							<Text style={{ fontWeight: 'bold', color: 'white' }}>Buy Now</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.buttonAddToCart}
							onPress={() => this.AddToCart(item, this.state.quantity)}
						>
							<Text style={{ fontWeight: 'bold', color: 'white' }}>Add To Cart</Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity style={styles.buttonBuyNowPayLater}>
						<Text style={styles.buyNowPayLater}>Buy Now | Pay Later</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => this.setModalVisible(true)} style={styles.buttonBuyNowPayLater}>
						<Text style={styles.buyNowPayLater}>Schedule</Text>
					</TouchableOpacity>

					<Modal
						animationType="slide"
						transparent={false}
						visible={this.state.modalVisible}
						// onRequestClose={() => {
						// 	Alert.alert('Modal has been closed.');
						// }}
					>
						<View style={{ marginTop: 22 }}>
							<View>
								<TouchableHighlight
									onPress={() => {
										this.setModalVisible(false);
									}}
								>
									<Text
										style={{
											textAlign: 'center',
											fontSize: 35,
											backgroundColor: 'red',
											color: 'white'
										}}
									>
										Close
									</Text>
								</TouchableHighlight>

								<View style={{ marginTop: 60, justifyContent: 'center', alignItems: 'center' }}>
									<Text style={{ margin: 10, fontSize: 25, borderWidth: 1, padding: 5 }}>
										You can schedule a delivery for this product and will be notified (1) day before
										the delivery.
									</Text>
									<Text style={{ fontSize: 20, margin: 10, color: 'gray' }}>
										Select Date Of Delivery
									</Text>
									<DatePicker
										style={{ margin: 10, width: 200 }}
										date={this.state.date}
										mode="date"
										placeholder="Select Date"
										format="YYYY-MM-DD"
										minDate={new Date()}
										// maxDate="2016-06-01"
										confirmBtnText="Confirm"
										cancelBtnText="Cancel"
										customStyles={{
											dateIcon: {
												position: 'absolute',
												left: 0,
												top: 4,
												marginLeft: 0
											},
											dateInput: {
												marginLeft: 36
											}
											// ... You can check the source to find the other keys.
										}}
										onDateChange={(date) => {
											this.setState({ date: date });
										}}
									/>
									<Text style={{ margin: 20, fontSize: 28 }}>
										Your Date Of Delivery: {this.state.date}
									</Text>

									{this.state.date ? (
										<TouchableOpacity
											onPress={() => this.addScheduleToDatabase(item)}
											style={{ marginTop: 10, backgroundColor: 'red' }}
										>
											<Text
												style={{
													padding: 10,
													fontSize: 20,
													fontWeight: 'bold',
													color: 'white'
												}}
											>
												Confirm
											</Text>
										</TouchableOpacity>
									) : (null)}
								</View>
							</View>
						</View>
					</Modal>
				</View>
				

				{/* COmments */}
				<View>
					<View style={{ margin:10,backgroundColor:"#FEFEFD",padding: 10, borderWidth: 0.5, borderRadius: 5, borderColor: 'red', height: "auto" }}>
						<Text style={{padding:5,fontWeight:"bold",color:"red"}}>Add A Comment</Text>
						
						<TextInput placeholder="Enter a comment"
						value={this.state.comment}
						onChangeText={(value)=>this.setState({comment:value})}
						multiline={true} style={{overflow:"scroll",borderWidth:0.5,borderColor:"red",backgroundColor:"",color:'black'}}/>
						
						{
							this.state.isLoading ? (
								<ActivityIndicator ></ActivityIndicator>
							):(
								<TouchableHighlight onPress={()=>this.submitComment(item)} style={{justifyContent:"center",alignItems:"center",backgroundColor:"#509E7F",width:80,marginTop:5}}>
									<Text style={{color:"white",fontSize:18,fontWeight:"bold"}}>Submit</Text>
								</TouchableHighlight>
	
							)
						}
						</View>
				</View>

				<CommentBox pid={item.item.productId}/>	
				
				
			</ScrollView>
		);
	}
}

const styles = {

	descriptionTitle: {
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 10,
		color: '#2d2e2d',
		// fontSize:20,
		backgroundColor: 'lightgray',
		// fontWeight:600,
		fontSize: 25
	},
	description: {
		color: '#2d2e2d',
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 10,
		// color: "black",
		fontSize: 20
	},
	itemName: {
		textAlign: 'center',
		alignItems: 'center',
		// marginTop: 10,
		// elevation: 5,
		backgroundColor: 'orange',
		paddingTop: 10,
		paddingLeft: 10,
		paddingBottom: 10,
		fontSize: 30,
		fontWeight: 'bold'
	},
	buttonBuy: {
		elevation: 2,
		marginTop: 20,
		padding: 10,
		backgroundColor: 'red',
		borderRadius: 600,
		borderWidth: 2,
		borderColor: 'pink',
		width: '40%',
		alignItems: 'center'
	},
	buttonAddToCart: {
		elevation: 2,
		marginTop: 20,
		// textAlign:"center",
		alignItems: 'center',
		padding: 10,
		backgroundColor: 'darkorange',
		borderRadius: 600,
		borderWidth: 2,
		borderColor: 'pink',
		width: '40%'
	},

	buttonBuyNowPayLater: {
		marginTop: 20,
		// textAlign:"center",
		alignItems: 'center',
		padding: 10,
		backgroundColor: 'darkblue',
		borderRadius: 600,
		borderWidth: 2,
		borderColor: 'pink',
		width: 320,
		marginTop: 10,
		marginLeft: 80
	},
	buyNowPayLater: {
		color: 'white',
		fontSize: 16
	}
};

export default withNavigation(ProductDetailScreen);
