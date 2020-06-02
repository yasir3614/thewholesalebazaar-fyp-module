import React, { Component } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Image, ScrollView, TouchableHighlight } from 'react-native';
import api from '../../config/api';
export default class WholeSalerDetail extends Component {
	state = {
		dataSource: {},
		isloading: true,
		products: []
	};
	// readUserData() {
	//     console.log('firebase product loading');
	//     firebase
	//       .database()
	//       .ref('Product/')
	//       .on(
	//         'value',
	//         snapshot => {
	//           var wholesalers = [];

	//           console.log(snapshot.val());
	//           var x = snapshot.val();
	//           for (let i in x) {
	//             console.log(i);
	//             // console.log(x[i]);
	//             if(x[i].wholesalerId==){
	//             var temp = {
	//               wholesalerid:i,
	//               as:x[i].as,
	//               city:x[i].city,
	//               email:x[i].email,
	//               mainProduct:x[i].mainProduct,
	//               mobile:x[i].mobile,
	//               name:x[i].name,
	//               officialContact:x[i].officialContact,
	//               officialEmail:x[i].officialEmail,
	//               openingTime:x[i].openingTime,
	//               username:x[i].username,
	//               workingFrom:x[i].workingFrom,
	//               workingTo:x[i].workingTo,
	//               userimage:x[i].userimage,
	//               shopaddress:x[i].shopaddress,
	//               category:x[i].category
	//             };
	//             wholesalers.push(temp);
	//             console.log(temp);
	//             }
	//           }
	//           console.log('==============');
	//           console.log(wholesalers);
	//           this.setState({wholesalers: wholesalers});
	//           // return products;
	//           console.log(this.state.wholesalers);;
	//         },
	//         error => {
	//           console.log(error);
	//         },
	//       );
	//   }

	async componentWillMount() {
		var x = this.props.navigation.getParam('wholesalerid');
		// console.log(x);

		await fetch(api + '/viewwholesalers/' + x)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					isloading: false,
					dataSource: responseJson
				});
				console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~wholesaler~~~~~~~~~~~~~~~~~~~~~~~~\n');
				console.log(this.state.dataSource.wholesalerdetail.as);
				console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~products~~~~~~~~~~~~~~~~~~~~~~~~\n');

				console.log(this.state.dataSource.wholesalerproducts);
			})
			.catch((error) => console.log('Error' + error)); //to catch the errors if any
	}

	//  console.log(x);
	render() {
		
		return this.state.isloading ? (
			<View>
			<Text>Loading</Text>
			<ActivityIndicator />
			</View>
		) : (
			<ScrollView>
				<View style={styles.main}>
					<View style={styles.circle} />

					<View style={{ marginTop: 20, flexDirection: 'row' }}>
						<View>
							<Text style={styles.text}>Name</Text>
							<Text style={styles.text}>Email</Text>
							<Text style={styles.text}>Contact#</Text>
							<Text style={styles.text}>Primary Category</Text>
						</View>

						<View>
							<Text style={styles.text2}>{this.state.dataSource.wholesalerdetail.username}</Text>
							<Text style={styles.text2}>{this.state.dataSource.wholesalerdetail.email}</Text>
							<Text style={styles.text2}>{this.state.dataSource.wholesalerdetail.mobile}</Text>
							<Text style={styles.text2}>{this.state.dataSource.wholesalerdetail.category}</Text>
						</View>
					</View>
				</View>

				<View style={styles.productmain}>
					<Text style={styles.productHeading}>Products</Text>
					{this.state.dataSource.wholesalerproducts.map((item, key) => (
						<View>
							<View style={styles.product}>
								<View>
									<Image style={styles.productImage} source={{ uri: item.imgUrl }} />
								</View>

								<Image
									style={{ width: 50, height: 50 }}
									// source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
								/>
								<View style={{ marginTop: 40 }}>
									<Text style={styles.text3}>{item.name}</Text>
									<Text style={styles.text3}>PKR {item.price}</Text>
									<Text style={styles.text3}>{item.category}</Text>
									<Text style={styles.text3}>{item.quantity}</Text>
									<Text style={styles.text3}>
										Advance{' '}
										{item.isBuyNowPayLater ? <Text>Available</Text> : <Text>Not Available</Text>}
									</Text>
									<TouchableHighlight>
										<Text
											onPress={() => {
												this.props.navigation.navigate('ProductDetail', {
													itemId: 86,
													othertParam: { item }
												});
											}}
										>
											View Product
										</Text>
									</TouchableHighlight>
								</View>
							</View>
						</View>
					))}
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	text3: {
		// borderWidth:2,
		// marginTop:25,
		// paddingTop: 4,
		// marginLeft: 20,
		fontSize: 18,
		// marginLeft:5,
		fontWeight: 'bold'
	},
	productImage: {
		height: 150,
		marginTop: 30,
		marginBottom: 25,
		marginLeft: 25,
		// color: 'red',
		// padding: 10s,
		borderRadius: 50,
		// borderWidth: 10,
		// borderColor: 'orange',
		// borderRadius: 100 / 2,
		width: 150,
		justifyContent: 'center'
	},
	product: {
		flexDirection: 'row',
		backgroundColor: 'white',
		margin: 10,
		height: 200,
		borderWidth: 0.2,
		elevation: 5,
		borderRadius: 20
	},
	productHeading: {
		fontSize: 35,
		fontWeight: 'bold',
		textAlign: 'center',
		margin: 10
	},
	productmain: {
		// flexDirection:"row"
		height: '100%',
		backgroundColor: '#F1DEDE'
	},
	text: {
		color: 'black',
		fontWeight: 'bold',
		marginLeft: 20
	},
	text2: {
		color: 'red',
		marginLeft: 20
	},
	main: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		width: '100%',
		// borderWidth:5,
		padding: 20,
		backgroundColor: '#F1DEDE'
		// borderWidth:5,
	},
	circle: {
		color: 'red',
		padding: 50,
		borderWidth: 2,
		borderColor: 'orange',
		borderRadius: 100 / 2,
		width: 100,
		margin: 5
		// marginTop:10
	}
});
