import React, { Component } from 'react';
import { AsyncStorage, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import CustomCard from './CustomCard';
import { ScrollView } from 'react-native';
import firebase from '../../config/firebase';
export default class Recomendation extends Component {
	state = {
		product1: [
			{
				name: 'Mug',
				quantity: 2,
				price: 199,
				category: 'Kitchen ware',
				tags: [ 'mug', 'kitchen', 'utensils' ],
				color: 'White',
				imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61KB6fUhcSL._SL1500_.jpg'
			},
			{
				name: 'Samsung A50',
				quantity: 6,
				price: 15000,
				category: 'Mobile Phone',
				tags: [ 'mug', 'kitchen', 'phone' ],
				color: 'Black',
				imageUrl: 'https://johnlewis.scene7.com/is/image/JohnLewis/238087827?$rsp-pdp-port-1440$'
			},
			{
				name: 'Nokia A50',
				quantity: 6,
				price: 15000,
				category: 'Mobile Phone',
				tags: [ 'mug', 'kitchen', 'phone' ],
				color: 'Black',
				imageUrl: 'https://assets.mspimages.in/wp-content/uploads/2019/03/Nokia-X71-696x435.jpg'
			},
			{
				name: 'QMobile A50',
				quantity: 6,
				price: 15000,
				category: 'Mobile Phone',
				tags: [ 'mug', 'kitchen', 'phone' ],
				color: 'Black',
				imageUrl: 'https://www.whatmobile.com.pk/admin/images/Qmobile/NoirJ5b.jpg'
			}
		],
		products: [],
		imUrl: '',
		clearStockProducts: [],
		loading: true,
		loadClearProduct: true
	};
	readClearStockProducts() {
		firebase.database().ref('ClearStock/').on(
			'value',
			(snapshot) => {
				var products = [];

				console.log(snapshot.val());
				var x = snapshot.val();
				for (let i in x) {
					console.log(i);
					// console.log(x[i]);
					var temp = {
						newprice: x[i].newprice,
						productid: x[i].productid
					};
					products.push(temp);
					console.log(temp);
				}
				console.log('==============');
				// console.log(products);
				this.setState({ clearStockProducts: products, loadClearProduct: false });
				// return products;
				this.readUserData();
				console.log(this.state.clearStockProducts);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	checkProductInClearStocks = (product) => {
		for (let i in this.state.clearStockProducts) {
			console.log(' ----> ' + this.state.clearStockProducts[i].productid + '    ' + product);
			if (this.state.clearStockProducts[i].productid == product) {
				return i;
			}
		}
		return null;
	};
	async readUserData() {
		// await this.readClearStockProducts();
		// firebase.LogLevel = LogLevel.Verbose;
		// firebase.database().DefaultInstance.LogLevel = LogLevel.Verbose;
		console.log('----------------------------------------------');
		console.log(this.state.clearStockProducts);
		console.log('firebase product loading');
		firebase.database().ref('Product/').on(
			'value',
			(snapshot) => {
				var products = [];

				console.log(snapshot.val());
				var x = snapshot.val();
				for (let i in x) {
					console.log(i);
					// console.log(x[i]);
					var clearStockID = this.checkProductInClearStocks(i);
					console.log(clearStockID);
					if (clearStockID != null) {
						var temp = {
							newprice: this.state.clearStockProducts[clearStockID].newprice,
							name: x[i].name,
							productId: i,
							category: x[i].category,
							imgUrl: x[i].imgUrl,
							isBuyNowPayLater: x[i].isBuyNowPayLater,
							offerPrice: x[i].offerPrice,
							price: x[i].price,
							quantity: x[i].quantity,
							wholesalerId: x[i].wholesalerId
						};
						products.push(temp);
						console.log(temp);
					}
				}
				console.log('=======??=======');
				console.log(products);
				this.setState({ products: products, loading: false });
				// return products;
				console.log(this.state.products);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	async componentWillMount() {
		console.log('-------------------------Component  ----------------------');

		await this.readClearStockProducts();
	}
	async componentDidMount() {
		console.log('------------------------- Did Component  ----------------------');

		await this.readClearStockProducts();
	}

	render() {
		return (
			<View>
				<View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
					<Text style={{ color: 'red', fontSize: 27 }}>Latest Stock Clearance Alerts !</Text>
				</View>
				{this.state.loading ? (
					<ActivityIndicator />
				) : (
					<ScrollView style={{ flex: 1 }}>
						{this.state.products.map((data, index) => (
							<CustomCard products={data} key={index}>
								<View style={{ width: '70%' }}>
								<View>
                	<Text>
										Stock clearance available for{' '}
										<Text style={{ fontSize: 25 }}> {data.name} </Text>
									</Text>
									<Text>
										Avail this offer in just <Text style={{ fontSize: 25 }}> {data.newprice} </Text>{' '}
										for
										<Text style={{ fontSize: 25 }}> {data.quantity} </Text> products
									</Text>
									<TouchableOpacity style={{ backgroundColor: 'red' }}>
										<Text style={{color:"white",fontWeight:'bold',fontSize:16,textAlign:"center"}}>Avail Now</Text>
									</TouchableOpacity>
								</View>
                </View>
							</CustomCard>
						))}
					</ScrollView>
				)}
			</View>
		);
	}
}
