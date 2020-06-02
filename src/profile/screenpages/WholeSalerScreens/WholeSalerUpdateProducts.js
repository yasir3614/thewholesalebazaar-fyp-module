import React, { Component } from 'react';
import { View, Text, ScrollView, Picker, StyleSheet, Button } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import firebase from './../../../config/firebase';
export default class WholeSalerUpdateProducts extends Component {
	componentDidMount() {
		this.loginUser();
	}
	state = {
		messageError: '',
		isLoading: false,
		radio_props: [ { label: 'Yes', value: true }, { label: 'No', value: false } ],
		currentUserId: '',
		product: {
			name: {
				value: ''
			},
			wholesalerId: {
				value: ''
			},
			totalSales: {
				value: ''
			},
			category: {
				value: ''
			},
			quantity: {
				value: ''
			},
			imgUrl: {
				value: 'https://www.yourdictionary.com/images/definitions/lg/2736.cloth.jpg'
			},
			price: {
				value: ''
			},
			offerPrice: {
				value: ''
			},
			isBuyNowPayLater: {
				value: 'Yes'
			},
			tags: {
				value: ''
			},
			dateProductAddedIn: {
				value: Date
			}
		},
		userLoggedin: {},
		check: false,
		user: {}
	};

	loginUser = () => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// console.log('------------uid\n' + user.email)
				this.setState({
					currentUserId: user.uid,
					check: true
				});
				console.log('logged in as : ' + user.email);
				console.log('cirrent user id in: ' + this.state.currentUserId);
			} else {
				this.setState({ user: null });
			}
		});
	};

	updateInputNumeric = (name, value) => {
		//make all the changes in copy before state so making a copy
		let formCopy = this.state.product;
		formCopy[name].value = value.replace(/[^0-9]/g, '');
		this.setState({
			form: formCopy
		});
		console.log(formCopy);
    };
    updateInput = (name, value) => {
		//make all the changes in copy before state so making a copy
		let formCopy = this.state.product;
		formCopy[name].value = value
		this.setState({
			form: formCopy
		});
		console.log(formCopy);
	};
	checkConstraints = () => {
		var copy = this.state.product;
		if (
			copy.category.value.length != 0 &&
			copy.imgUrl.value.length != 0 &&
			copy.name.value.length != 0 &&
			copy.offerPrice.value.length != 0 &&
			copy.price.value.length != 0 &&
			copy.quantity.value.length != 0 &&
			copy.tags.value.length != 0 &&
			copy.isBuyNowPayLater.value.length != 0
		) {
			return true;
		} else {
			return false;
		}
	};
	AddProduct = () => {
		console.log('-------------Insde Add product-------');
		if (!this.checkConstraints()) {
			this.setState({ messageError: 'All Fields are required!' });
			return;
		}
		this.setState({ isLoading: true });
		console.log(this.state.product);

		var wholesalerId_ = this.state.currentUserId;

		firebase.database().ref().child('Product').push({
			name: this.state.product.name.value,
			category: this.state.product.category.value,
			quantity: this.state.product.quantity.value,
			price: this.state.product.price.value,
			imgUrl: this.state.product.imgUrl.value,
			isBuyNowPayLater: this.state.product.isBuyNowPayLater.value,
			offerPrice: this.state.product.offerPrice.value,
			tags: this.state.product.tags.value,
			wholesalerId: wholesalerId_,
			dateProductAddedIn: Date(Date.now()).toString()
		});

		// firebase.database().ref('Products/').set
		alert('Your Product has been successfully added!');
		this.setState({ isLoading: false });
		this.props.navigation.navigate('Main');
	};

	render() {
		return (
			<View>
				<Text
					style={{
                        // elevation: 5,
                        padding:20,
						fontSize: 30,
						fontWeight: 'bold',
						width: '100%',
						textAlign: 'center',
						backgroundColor: 'orange',
						color: 'white'
					}}
				>
					Add A New Product
				</Text>

				<ScrollView style={{ padding: 10,  borderColor: 'green', height: '100%' }}>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<TextInput
							multiline={true}
							placeholder="Product Name"
							value={this.state.product.name.value}
							onChangeText={(value) => this.updateInput('name', value)}
							autoCapitalize={'none'}
							style={styles.productInput}
						/>

						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								width: '100%',
								borderWidth: 1,
								borderRadius: 200,
								borderColor: 'black'
							}}
						>
							<Picker
								mode="dialog"
								style={{ height: 50, width: 350 }}
								selectedValue={this.state.product.category.value}
								onValueChange={(selectedValue) => this.updateInput('category', selectedValue)}
							>
								<Picker.Item label="Select Category" value="select" />
								<Picker.Item label="Computer" value="computer" />
								<Picker.Item label="Grocery" value="grocery" />
								<Picker.Item label="Machinery" value="machinery" />
								<Picker.Item label="Shoes" value="shoes" />
								<Picker.Item label="Clothing" value="cloth" />
								<Picker.Item label="Utility" value="utility" />
							</Picker>
						</View>

						<TextInput
							multiline={true}
							placeholder="Enter Product Price"
							value={this.state.product.price.value}
							onChangeText={(value) => this.updateInputNumeric('price', value)}
							autoCapitalize={'none'}
							keyboardType={'numeric'}
							style={styles.productInput}
						/>
						<TextInput
							placeholder="Enter Product Offer Price"
							value={this.state.product.offerPrice.value}
							onChangeText={(value) => this.updateInputNumeric('offerPrice', value)}
							autoCapitalize={'none'}
							keyboardType={'numeric'}
							style={styles.productInput}
							multiline={true}
						/>

						<TextInput
							placeholder="quantity"
							value={this.state.product.quantity.value}
							onChangeText={(value) => this.updateInputNumeric('quantity', value)}
							autoCapitalize={'none'}
							style={styles.productInput}
							keyboardType={'numeric'}
							multiline={true}
						/>

						{/* <TextInput

                        placeholder="Buy Now Pay Later"
                        value={this.state.product.isBuyNowPayLater.value}
                        onChangeText={value => this.updateInput("isBuyNowPayLater", value)}
                        autoCapitalize={"none"}
                        style={styles.productInput}
                    /> */}
						<View
							style={{
								padding: 15,
								justifyContent: 'center',
								alignItems: 'center',
								paddingLeft: 10,
								paddingRight: 10,
								width: '100%',
								borderWidth: 1,
								borderRadius: 300,
								borderColor: 'gray',
								flexDirection: 'row'
							}}
						>
							<View>
								<Text style={{ fontSize: 25 }}>Buy Now Pay Later</Text>
							</View>
							<View>
								<RadioForm
									formHorizontal={true}
									labelHorizontal={false}
									buttonSize={15}
									buttonOuterSize={30}
									radio_props={this.state.radio_props}
									initial={0}
									onPress={(value) => {
										this.updateInput('isBuyNowPayLater', value);
									}}
								/>
							</View>
						</View>

						<TextInput
							placeholder="Image URL"
							value={this.state.product.imgUrl.value}
							onChangeText={(value) => this.updateInput('imgUrl', value)}
							autoCapitalize={'none'}
							style={styles.productInput}
							multiline={true}
						/>

						<TextInput
							placeholder="tags"
							value={this.state.product.tags.value}
							onChangeText={(value) => this.updateInput('tags', value)}
							autoCapitalize={'none'}
							style={styles.productInput}
							multiline={true}
						/>
						{/* <Button title="Sign In" onPress={()=>this.props.navigation.navigate("SignIn")}></Button>
                <Button title="Creat new Account" onPress={()=>this.props.navigation.navigate("CreateAccount")}></Button>
                <Button title="Reset Password" onPress={()=>this.props.navigation.navigate("SignIn")}></Button> */}
						<View>
							<Text style={{ fontSize: 15, fontWeight: 'bold', color: 'red' }}>
								{this.state.messageError}
							</Text>
						</View>

						<View style={{ backgroundColor: 'green', padding: 10, marginTop: 20, marginBottom: 40 }}>
							{this.state.isLoading ? (
								<ActivityIndicator size="small" />
							) : (
								<TouchableOpacity onPress={() => this.AddProduct()}>
									<Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Submit</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	productInput: {
		fontSize: 16,
		textAlign: 'center',
		width: '100%',
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 300,
		marginBottom: 10,
		marginTop: 20
	}
});
