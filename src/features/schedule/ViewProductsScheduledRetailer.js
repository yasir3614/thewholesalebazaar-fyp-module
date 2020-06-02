import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, AsyncStorage, Image, View, Text, ScrollView } from 'react-native';
// import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { is } from '@babel/types';
import firebase from '../../config/firebase';
class ViewScheduledProductsRetailer extends Component {
	state = {
		product: [
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
		userLoggedIn: ''
	};

	checkLoggedin = async () => {
		console.log('--------------------');
		try {
			const value = await AsyncStorage.getItem('userID');
			if (value !== null) {
				this.setState({
					userLoggedIn: value
				});
				console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2');
				console.log(this.state.userLoggedIn);
				console.log('logged in inside cartLOGGED IN');
				// alert("user is logged in")
			} else {
				console.log('NOT LOGGED IN');
				// alert("user is not logged in in cart");
			}
		} catch (error) {
			console.log(error);
			// Error retrieving data
		}
	};
	async readUserData() {
		// firebase.LogLevel = LogLevel.Verbose;
		// firebase.database().DefaultInstance.LogLevel = LogLevel.Verbose;

		console.log('firebase product loading');
		firebase.database().ref('Schedule/').on(
			'value',
			(snapshot) => {
				var products = [];

				console.log(snapshot.val());
				var allproducts = snapshot.val();
				for (let i in allproducts) {
					console.log(i);
					// console.log(x[i]);
					var x = allproducts[i].scheduleInfo;
					//   console.log('===== '+this.state.userLoggedIn+'   '+x[i].wholesalerId)
					console.log(x);
					if (x.s_retailer == this.state.userLoggedIn) {
						var productTemp = { name: '', imgUrl: '', price: '' };
						firebase.database().ref('Product/' + x.s_item + '/').on('value', (snapprod) => {
							var prod = snapprod.val();
							productTemp.name = prod.name;
							productTemp.imgUrl = prod.imgUrl;
							productTemp.price = prod.price;
						});

						var temp = {
							productname: productTemp.name,
							productimage: productTemp.imgUrl,
							productprice: productTemp.price,
                            scheduleId: i,
                            status:x.status,
							date: x.s_date,
							productId: x.s_item,
							wholesalerId: x.s_wholesaler,
							quantity: x.s_quantity,
							totalPrice: x.s_totalPrice,
							retailer: x.retailer,
							dateOfDelivery: x.dateOfDelivery
						};
						products.push(temp);
						console.log(temp);
					}
					this.productDetails();
				}
				console.log('==============');
				console.log(products);
				this.setState({ products: products });
				// return products;
				console.log(this.state.products);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	async componentWillMount() {
		await this.checkLoggedin();
		await this.readUserData();
	}
	UpdateStatus(product, status) {
		// console.log('-=-=-=-=-=-=Update status =====\n'+product);
		var scheduleInfo = {
			scheduleId: product.scheduleId,
			s_item: product.productId,
			s_quantity: product.quantity,
			s_totalPrice: product.totalPrice,
			s_date: product.dateOfDelivery,
			s_wholesaler: product.wholesalerId,
			s_retailer: product.retailerId,
			status: status
			// s_date:product.productdateOfDelivery
		};
		console.log('-=-=-=-=-=-=Update status =====\n' + scheduleInfo.scheduleId);

		firebase.database().ref('Schedule/' + scheduleInfo.scheduleId + '/scheduleInfo/').update({
			status: status
		});
	}
	reject = (product) => {
		this.UpdateStatus(product, 'reject');
	};
	productDetails = () => {
		firebase.database().ref('Products/').on('value', () => {});
	};
	accept = (product) => {
		this.UpdateStatus(product, 'accept');
	};
	render() {
		console.log('----------------\n' + this.state.products);
		return (
			<View style={{flex:1}}>
			<Text style={{backgroundColor:"orange",textAlign:"center",padding:20,fontSize:25,fontWeight:"bold",color:"white"}}>Scheduled Products</Text>
			
			{this.state.products.length >0 ? (<ScrollView style={{ margin: 5, flex: 1 }}>
				
				{this.state.products.map((data, i) => {
					return (
					
						<View style={{ flex: 1, borderWidth: 1, padding: 5, margin: 5 }}>
							
							<View style={{ flexDirection: 'row' }}>
								<View>
									<Image
										style={{ marginTop: 30, resizeMode: 'contain', width: 100, height: 100 }}
										source={{ uri: data.productimage }}
									/>
								</View>

								<View style={{ marginTop: 25, marginLeft: 30 }}>
									<View>
										<Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.productname}</Text>
										<Text style={{ backgroundColor: '', fontSize: 20 }}>
											Date Of Delivery : <Text>{data.date}</Text>
										</Text>
										<Text style={{ backgroundColor: '', fontSize: 20 }}>
											Quantity: {data.quantity}
										</Text>
										{/* <Text style={{backgroundColor:"",fontSize:20}}>Total Price: PKR {data.totalPrice}</Text> */}
									</View>
								</View>
							</View>
							<View style={{ flex: 3 }}>
								<View style={{ alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
									<View style={{ flex: 1, width: '50%' }}>
										<Text style={{ paddingTop: 70, backgroundColor: '', fontSize: 20 }}>
											Total: PKR {data.totalPrice}
										</Text>
									</View>
                                {data.status==='accept' ?
                                
                                (
									<Text style={{padding:10,color:"white",fontWeight:"bold",backgroundColor:"gray"}}>Scheduled for Delivery</Text>

                                )
                                :
                                (
                                    <View>
                                        {data.status==='reject' ?(
										<Text style={{padding:10,color:"white",fontWeight:"bold",backgroundColor:"red"}}>Rejected</Text>


                                        ):(
											<Text style={{padding:10,color:"white",fontWeight:"bold",backgroundColor:"blue"}}>Pending</Text>

                                        )}
                                    </View>
                                
                                )
							
								
                            }
                                

								</View>
							</View>
						</View>
						// {/* // <Product productArray={data} /> */}
					);
				})}
			</ScrollView>) : (
			
			<Text style={{marginTop:"50%",textAlign:"center",fontWeight:"bold",fontSize:20}}>No Orders Schduled</Text>)
			}
			
			
			</View>
		);
	}
}
const styles = StyleSheet.create({
	addProduct: {
		marginLeft: 60,
		marginRight: 60,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: 'darkorange',
		borderWidth: 1,
		borderRadius: 50
	}
});
export default ViewScheduledProductsRetailer;
