import React, { Component } from 'react';
import {
	Modal,
	Text,
	View,
	TouchableHighlight,
	Button,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	AsyncStorage
} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import { ScrollView } from 'react-native';
import firebase from '../../config/firebase';
import api from '../../config/api';
import Payment from '../../config/payment';

class ProductCheckoutScreen extends Component {
	state = {
		trn: 0,
		item: {},
		wholesalerid: '',
		productid: '',
		retailerid: '',
		quantity: 0,
		address: '',
		paymentmode: 'COD',
		totalprice: '',
		loggedInId: '',
		modalVisible: false,
		isConfirmDisable: false
	};
	componentWillMount() {
		this._retrieveData();
	}
	_retrieveData = async () => {
		try {
			const value = await AsyncStorage.getItem('userID');
			if (value !== null) {
				// We have data!!
				this.setState({ loggedInId: value });
			}
		} catch (error) {
			// Error retrieving data
		}
	};
	async onRegisterPressed(data) {
		console.log(
			'\nIN ON REGISTER PRESSED\nIN ON REGISTER PRESSED\nIN ON REGISTER PRESSED\nIN ON REGISTER PRESSED\nIN ON REGISTER PRESSED\nIN ON REGISTER PRESSED\n\n\n\n\n'
		);
		this.setState({ showProgress: true });

		try {
			let response = await fetch(api + '/sendmail', {
				method: 'POST',
				headers: {
					Accept: 'application/json, text/plain, */*',
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

	addTrackingInfo() {
		firebase
			.database()
			.ref('Tracker/')
			.push({})
			.then((data) => {
				//success callback
				// console.log('data ', data);
			})
			.catch((error) => {
				console.log('Error in adding trackig info');
				//error callback
				console.log('error ', error);
			});
	}
	addInvoice = () => {
		let item = this.props.navigation.getParam('item', 'not valid');
		let quantity = this.props.navigation.getParam('quantity', 1);

		console.log('-----ADD INVOICE------\n');
		var trackingNumber = Math.floor(10000 + Math.random() * 1000);
		// var trackingNumber = 100;

		this.setState({ trn: trackingNumber }, () => {
			console.log('TRN STATE: ' + this.state.trn);
			console.log('TRN TRACKING: ' + trackingNumber);

			let finalitem = {
				tracking: trackingNumber,
				quantity: quantity,
				itemid: item.item.productId,
				wholesalerid: item.item.wholesalerId,
				retailerid: this.state.loggedInId,
				paymentmode: this.state.paymentmode,
				deliveryaddress: this.state.address,
				totalprice: item.item.price * quantity
			};

			firebase
				.database()
				.ref('Order/')
				.push({
					productid: item.item.productId,
					productName: item.item.name,
					tracking: trackingNumber,
					quantity: quantity,
					status: 'pending',
					wholesalerid: item.item.wholesalerId,
					retailerid: this.state.loggedInId,
					paymentmode: this.state.paymentmode,
					deliveryaddress: this.state.address,
					totalprice: item.item.price * quantity,
					orderDate: Date.now()
				})
				.then((data) => {
					console.log('\nFinal Item \n');
					console.log(' --------- final----------');

					this.onRegisterPressed(finalitem);
					// console.log('---------\n'+finalitem)
					// console.log('data -----\n ', data);

					this.props.navigation.navigate('OrderDetail', {
						OrderDetail: {
							item: item.item,
							quantity: quantity,
							address: this.state.address,
							paymentmode: this.state.paymentmode,
							trn: this.state.trn
						}
					});
				})
				.catch((error) => {
					//error callback
					console.log('error ', error);
				});
		});
		// console.log("STATE TRN: " + this.state.trn)
		// console.log("Tracking Number: " + trackingNumber);
	};

	closeModal = () => {
		this.setState({
			modalVisible: false
		});
	};

	setPaymentMode = (value) => {
		console.log(value);
		if (value == 'Credit card') {
			console.log('in credit card');
			this.setState({
				paymentmode: value,
				modalVisible: true
			});
		} else {
			this.setState({
				paymentmode: value,
				modalVisible: false

			});
		}
	};
	render() {
		let item = this.props.navigation.getParam('item', 'not valid');
		let quantity = this.props.navigation.getParam('quantity', 1);
		//    this.setState({item:item});

		var radio_props = [
			{ label: 'COD', value: 'COD' },
			{ label: 'EasyPaisa', value: 'EasyPaisa' },
			{ label: 'Credit Card', value: 'Credit card' }
		];
		// console.log('--------item in product checkout-------------')
		// console.log(item);
		return (
			<ScrollView style={styles.container}>
				<Text style={styles.confirmOrder}>Order Confirmation</Text>

				<Text style={styles.text}>Item Name: {item.item.name}</Text>

				<TextInput
					style={{ marginTop: 10, marginBottom: 20, borderWidth: 2, borderColor: 'green' }}
					placeholder="Add shipping address"
					value={this.state.address}
					onChangeText={(value) => {
						this.setState({
							address: value
						});
					}}
				/>

				<View style={{ flexDirection: 'row' }}>
					<Text style={styles.text}>Quantity</Text>
					<Text style={styles.subtext}>{quantity}</Text>
				</View>

				<View style={{ flexDirection: 'row' }}>
					<Text style={styles.text}>Price Per Item </Text>
					<Text style={styles.subtext}>PKR {item.item.price}</Text>
				</View>

				<View style={{ flexDirection: 'row' }}>
					<Text style={styles.text}>Total Price</Text>
					<Text style={styles.subtext}>PKR {item.item.price * quantity}</Text>
				</View>

				<Text style={styles.text}>Payment Mode</Text>

				<View>
					<RadioForm
						buttonSize={10}
						buttonOuterSize={20}
						radio_props={radio_props}
						initial={0}
						formHorizontal={false}
						// labelHorizontal={true}
						buttonColor={'#2196f3'}
						animation={true}
						onPress={(value) => {
							this.setPaymentMode(value);
						}}
					/>
				</View>

				{this.state.modalVisible ?  (
					<View>
						
					<Payment/> 
				</View>
				) : (null)}
				

					<View hide={true}>
					<TouchableOpacity onPress={() => this.addInvoice()} style={styles.orderConfirmButton}>
					<Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Confirm Order</Text>
				</TouchableOpacity>
					</View>
				
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		borderWidth: 1,
		borderRadius: 10,
		margin: 30,
		paddingBottom:50
		// paddingBottom:10
	},
	text: {
		marginTop: 4,
		borderWidth: 1,
		borderRadius: 20,
		fontSize: 20,
		paddingBottom: 5,
		paddingTop: 5,
		paddingLeft: 10,
		marginBottom: 4,
		paddingRight: 10
	},
	subtext: {
		// elevation:5,

		marginTop: 4,
		// borderWidth:1,
		// borderRadius:20,
		fontSize: 20,
		paddingBottom: 5,
		paddingTop: 5,
		paddingLeft: 10,
		marginBottom: 4,
		paddingRight: 10
	},
	confirmOrder: {
		backgroundColor: 'orange',
		color: 'white',
		padding: 20,
		fontSize: 40
	},
	orderConfirmButton: {
		elevation: 5,
		backgroundColor: 'orange',
		marginTop: 15,
		padding: 10,
		textAlign: 'center',
		alignItems: 'center',
		marginBottom:70
	},
	centeredView: {
		flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		padding: 190
	},
	openButton: {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center'
	}
});

export default withNavigation(ProductCheckoutScreen);
