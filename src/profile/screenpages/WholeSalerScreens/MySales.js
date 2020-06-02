import React, { Component } from 'react';
import api from '../../../config/api';

import {
	View,
	Text,
	Button,
	TouchableOpacity,
	ScrollView,
	TextInput,
	AsyncStorage,
	StyleSheet,
	Dimensions,
	ActivityIndicator
} from 'react-native';
import firebase from '../../../config/firebase';
import Accordian from '../../components/accordian';
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart
} from 'react-native-chart-kit';

export default class AddShopDetails extends Component {
	state = {
		status: { pending: 0, confirmed: 0, 'in-transit': 0, delivered: 0 },
		messageError: '',
		userLoggedIn: '',
		totalRevenue: 0,
		totalpriceProduct: {},
		totalpriceProductGraph: {
			labels: [],
			datasets: [
				{
					data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
				}
			]
		},
		data: {
			labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
			datasets: [
				{
					data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
				}
			]
		}
	};
	componentWillMount = async () => {
		// this.RemoveSession();
		console.log('---------???-componrt will mount ttt');
		await this.checkLoggedin();
		await this.getOrdersOfWholesaler();
	};
	componentDidUpdate() {
		return true;
	}

	getOrdersOfWholesaler = async () => {
		console.log('checl' + this.state.userLoggedIn);

		await fetch(api + '/order/' + this.state.userLoggedIn)
			.then((response) => response.text())
			.then((responseJson) => {
				console.log('--namoona------------------------');
				// console.log(responseJson);
				var res = JSON.parse(responseJson);
				console.log(res);

				var analytics = {
					'1': 0,
					'2': 0,
					'3': 0,
					'4': 0,
					'5': 0,
					'6': 0,
					'7': 0,
					'8': 0,
					'9': 0,
					'10': 0,
					'11': 0,
					'12': 0
				};
				var status = this.state.status;
				var totalRevenue = 0;
				var totalpriceProduct = {};
				for (var order in res) {
					var date = new Date(res[order]['orderDate']);
					console.log(date.getMonth() + 1);
					totalRevenue += res[order]['totalprice'];

					if (res[order]['productid'] in totalpriceProduct) {
						totalpriceProduct[res[order]['productid']]['totalPrice'] += res[order]['totalprice'];
					} else {
						totalpriceProduct[res[order]['productid']] = {};
						totalpriceProduct[res[order]['productid']]['name'] = res[order]['productName'];
						totalpriceProduct[res[order]['productid']]['totalPrice'] = res[order]['totalprice'];
					}
					analytics[date.getMonth() + 1] += 1;
					console.log(analytics);
					status[res[order]['status']] += 1;
				}
				// var totalpriceProductGraph=this.state.totalpriceProductGraph;
				// for (var i in totalpriceProduct){
				// 	totalpriceProductGraph.labels.push(totalpriceProduct[i].name);
				// 	totalpriceProductGraph.datasets[0].data.push(totalpriceProduct[i].totalPrice);
					
				// }

				this.setState({ status: status, totalRevenue: totalRevenue ,totalpriceProduct:totalpriceProduct});

				var newData = this.state.data;
				for (var i in analytics) {
					// console.log(i - 1);
					newData.datasets[0].data[i - 1] = analytics[i];
				}
				this.setState({
					data: newData
				});
				// console.log(this.state.data.datasets);
				// console.log(this.state.totalRevenue);
			})
			.catch((error) => console.log('ERROR =>> ' + error));
	};

	// constructor(){
	// super();

	// }

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

	render() {
		return this.state.userLoggedIn === '' ? (
			<ActivityIndicator />
		) : (
			<ScrollView style={styles.container}>
				<View style={styles.containerView}>
					<Text style={styles.fontStyle}>Number of Orders Per Month</Text>
					<LineChart
						data={this.state.data}
						// width={Dimensions.get('window').width }
						width={Dimensions.get('window').width - 85}
						height={200}
						chartConfig={{
							backgroundColor: '#1cc910',
							backgroundGradientFrom: '#eff3ff',
							backgroundGradientTo: '#efefef',
							decimalPlaces: 2,
							color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
							style: {
								// borderRadius: 16,
							}
						}}
						style={{
							// marginVertical: 8,
							// borderRadius: 16,
						}}
					/>

					<View>
						<Text style={styles.fontStyle}>Order Statuses</Text>

						<PieChart
							const
							data={[
								{
									name: 'Confirmed',
									count: this.state.status['confirmed'],
									color: 'blue',
									legendFontColor: '#7F7F7F',
									legendFontSize: 15
								},
								{
									name: 'Pending',
									count: this.state.status['pending'],
									color: 'gray',
									legendFontColor: '#7F7F7F',
									legendFontSize: 15
								},
								{
									name: 'In-Transit',
									count: this.state.status['in-transit'],
									color: 'red',
									legendFontColor: '#7F7F7F',
									legendFontSize: 15
								},
								{
									name: 'Delivered',
									count: this.state.status['delivered'],
									color: 'green',
									legendFontColor: '#7F7F7F',
									legendFontSize: 15
								}
							]}
							width={Dimensions.get('window').width - 85}
							height={220}
							chartConfig={{
								backgroundGradientFrom: '#1E2923',
								backgroundGradientFromOpacity: 0,
								backgroundGradientTo: '#08130D',
								backgroundGradientToOpacity: 0.5,
								color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
								strokeWidth: 2, // optional, default 3
								barPercentage: 0.5,
								useShadowColorFromDataset: false // optional
							}}
							accessor="count"
							backgroundColor="transparent"
							paddingLeft="15"
							absolute
						/>
					</View>

					<View style={styles.productChart}> 
					<Text style={styles.fontStyle}>Sale By Product</Text>

							 {/* Loop data  and make accordians, title = product_name, other_one  = total_price */}
							{
								console.log(this.state.totalpriceProduct)}{
								Object.keys(this.state.totalpriceProduct).map((key,index)=>{
									return(
									// console.log(key["name"])
										<Accordian data={this.state.totalpriceProduct[key].totalPrice} title={this.state.totalpriceProduct[key].name} />
									
								)})
							

							}
							{/* <Accordian  title="hello"  data="check"/> */}


					</View>
					<View style={styles.sales}>
						<Text style={styles.fontStyle}>Sales Revenue</Text>
						<Text style={styles.revenue}>PKR {this.state.totalRevenue} /-</Text>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	productChart:{
		marginBottom:30
	},
	sales: {
		marginLeft: 40,
		marginRight: 40,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black'
	},
	fontStyle: {
		padding: 10,
		fontSize: 30
	},
	revenue: {
		fontSize: 25,
		fontWeight: 'bold',
		color: 'darkgreen'
	},
	container: {
		flex: 1
	},
	containerView: {
		borderWidth: 1,
		margin: 40
	}
});
