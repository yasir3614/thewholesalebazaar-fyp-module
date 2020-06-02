import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator,AsyncStorage,Picker, Image, View, Text, ScrollView } from 'react-native';
// import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { is } from '@babel/types';
import firebase from '../../../config/firebase';

class ViewScheduledProductsRetailer extends Component {
	state = {
		isLoading:false,
        orderstatus:'',
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
		// console.log('--------------------');
		try {
			const value = await AsyncStorage.getItem('userID');
			if (value !== null) {
				this.setState({
					userLoggedIn: value
				});
				// console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2');
				// console.log(this.state.userLoggedIn);
				// console.log('logged in inside cartLOGGED IN');
				// alert("user is logged in")
			} else {
				console.log('NOT LOGGED IN');
				// alert("user is not logged in in cart");
			}
		} catch (error) {
			// console.log(error);
			// Error retrieving data
		}
	};
	async readUserData() {
		// firebase.LogLevel = LogLevel.Verbose;
		// firebase.database().DefaultInstance.LogLevel = LogLevel.Verbose;

		// console.log('firebase product loading');
		firebase.database().ref('Order/').on(
			'value',
			(snapshot) => {
				var products = [];

				// console.log(snapshot.val());
				var allproducts = snapshot.val();
				for (let i in allproducts) {
					// console.log(i);
					// console.log(x[i]);
					var x = allproducts[i];
					//   console.log('===== '+this.state.userLoggedIn+'   '+x[i].wholesalerId)
					// console.log(x.wholesalerid +'    wholesaler   '+this.state.userLoggedIn);
					if (x.wholesalerid == this.state.userLoggedIn) {
                        var productTemp = { name: '', imgUrl: '', price: '' };
                        // console.log('product id  '+x.productid)
						firebase.database().ref('Product/' + x.productid + '/').once('value', (snapprod) => {
                            var prod = snapprod.val();
                            // console.log('------------------Product--------------')
                            // console.log(prod.name)
							productTemp.name = prod.name;
							productTemp.imgUrl = prod.imgUrl;
							productTemp.price = prod.price;
						});

						var temp = {
							productname: productTemp.name,
							productimage: productTemp.imgUrl,
							productprice: productTemp.price,
                            paymentmode:x.paymentmode,
                            orderstatus:x.status,
                            deliveryaddress:x.deliveryaddress,
                            quantity:x.quantity,
                            productid:x.productid,
                            retailerid:x.retailerid,
                            wholesalerid:x.wholesalerid,
                            totalprice:x.totalprice,
                            tracking:x.tracking,
                            orderid:i
                        };
						products.push(temp);
						// console.log(temp);
					}
				}
				// console.log('==============');
				// console.log(products);
				this.setState({ products: products });
				// return products;
				console.log(this.state.products);
			},
			(error) => {
				// console.log(error);
			}
		);
	}
	async componentWillMount() {
		await this.checkLoggedin();
		await this.readUserData();
	}
	UpdateStatusOndb(product, status) {
		this.setState({isLoading:true})
		console.log("\n\n\n\nACTIVITY STATUS  BEFORE: :  "  + this.state.isLoading)
		// console.log('-=-=-=-=-=-=Update status =====\n'+product);
		
		// console.log('-=-=-=-=-=-=Update status =====\n' + scheduleInfo.scheduleId);

		firebase.database().ref('Order/' + product.orderid + '/').update({
            status: status,
		});
	}
	reject = (product) => {
		this.UpdateStatusOndb(product, 'reject');
	};
	updateStatus = (product,status) => {
	
        this.setState({orderstatus:status})
		this.UpdateStatusOndb(product,status);
		this.setState({isLoading:false})
		console.log("\n\n\n\nACTIVITY STATUS  After: :  "  + this.state.isLoading)

	};
	render() {
		// console.log('------	----------\n' + this.state.products);
		return (
			<View style={{flex:1}}>
			<View style={{width:"100%" ,backgroundColor:"orange"}}><Text style={{padding:20,fontSize:25,color:"white",fontWeight:"bold",textAlign:"center"}}>Orders</Text></View>
			<ScrollView style={{ margin: 20, flex: 1 }}>
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
										<Text style={{ backgroundColor: 'lightgray', fontSize: 20 }}>
											Payment Mode : <Text>{data.paymentmode}</Text>
										</Text>

										<Text style={{ backgroundColor: '', fontSize: 20 }}>
											Quantity: {data.quantity}
										</Text>
                                        <Text style={{ backgroundColor: 'lightgray', fontSize: 20 }}>
											Tracking Number : <Text>{data.tracking}</Text>
										</Text>
                                        <Text style={{ backgroundColor: '', fontSize: 20 }}>
											Delivery Address : <Text>{data.deliveryaddress}</Text>
										</Text>
                                        <Text style={{ backgroundColor: 'lightgray', fontSize: 20 }}>
											Status : <Text>{data.orderstatus}</Text>
										</Text>
										{/* <Text style={{backgroundColor:"",fontSize:20}}>Total Price: PKR {data.totalPrice}</Text> */}
									</View>
								</View>
							</View>
							<View style={{ flex: 3 }}>
								<View style={{  marginTop:10,flexDirection: 'row' }}>
									<View style={{ flex: 1, width: '50%' }}>
										<Text style={{ backgroundColor: '', fontSize: 20 }}>
											Total: PKR {data.totalprice}
										</Text>
									</View>
								{
								data.status==='accept' ? ( <Text>Scheduled for delivery</Text>)
                                :(
                                    <View>
										{
										data.status==='reject' ?(
                                            <Text>Rejected</Text>
										):
										(
											data.orderstatus ==="delivered"  ? (null) : (

											
                                            <View style={{backgroundColor:"orange",borderWidth:1,borderRadius:100}}>
											
											{this.state.isLoading ? (<ActivityIndicator size="small"/>) : (         <Picker
                                                
												mode="dialog"
												style={{ width: 150}}                                                        
												selectedValue={data.orderstatus}
												onValueChange={(status) => this.updateStatus(data, status)}
												
											>
												<Picker.Item label="Select current order status" value="pending" />
												<Picker.Item label="pending" value="pending" />
												<Picker.Item label="confirmed" value="confirmed" />
												<Picker.Item label="in-transit" value="in-transit" />
												<Picker.Item label="delivered" value="delivered" />

											</Picker>)}
                                           
                                            </View>
											)
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
			</ScrollView>
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
