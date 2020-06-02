import React, { Component } from 'react';
import { Text, View,ScrollView,ActivityIndicator ,Button, StyleSheet, TextInput, TouchableOpacity, Modal, Picker } from 'react-native';

import Input from '../components/Input';
import ValidationRules from '../components/ValidationRules';
import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from '../../config/firebase';
import api from '../../config/api';

// import checkInternet from '../../config/CheckInternet';
class CreateAccountScreen extends Component {
	state = {
		isLoading:false,
		final_form:{},
		isLoadingModal:false,
        modalVisible: false,
        errorMessage:'',
		hasErrors: true,
		form: {

			username: {
				valid:true,
				value: '',
				type: 'textInput',
				maxLength:25,
				rules:{
					maxLength:30,
					minLength:5,
				}
			
			},
			mobile: {
				value: '',
				valid:true,
				type: 'textInput',
				rules: {
					minLength: 11
					// maxLength:11
				}
			},
			as: {
				type: '',
				value: '',
				valid:true,
				rules:{

				}

			},
			email: {
				value: '',
				valid:true,
				type: 'textInput',
				rules: {
					isRequired: true,
					isEmail: true
				},
				
			},
			confirmPassword: {
				value: '',
				valid: true,
				type: 'textInput',
				rules: {
					isRequired: true,
					confirmPass: 'password',
					maxLength:8
				}
			},
			password: {
				value: '',
				valid: true,
				type: 'textInput',
				rules: {
					isRequired: true,
					minLength: 6,
					maxLength:8
				}
			}
        },
        confirmTokenText:''
	};
	// componentWillMount(){
	// 	console.log('-------------------Component will mount create account---------')
	// 	console.log(api);
	// }

	updateInput = (name, value) => {
		this.setState({
			hasErrors: false
		});
		//make all the changes in copy before state so making a copy
		let formCopy = this.state.form;

		let rules = formCopy[name].rules;
		let valid = ValidationRules(value, rules, formCopy);

		formCopy[name].value = value;
		formCopy[name].valid = valid;
		this.setState({
			// hasErrors: valid,
			form: formCopy
		});
	};
	updateInputNumeric = (name, value) => {
		this.setState({
			hasErrors: false
		});
		//make all the changes in copy before state so making a copy
		let formCopy = this.state.form;

		let rules = formCopy[name].rules;
		let valid = ValidationRules(value, rules, formCopy);

		formCopy[name].value = value.replace(/[^0-9]/g, '');
		formCopy[name].valid = valid;
		this.setState({
			// hasErrors: valid,
			form: formCopy
		});
	};
	setUpDB = (data, form) => {
		// let id=firebase.getCurrentUser().getUid();
		console.log('9999999');
		console.log('ad');
		console.log(data.user.uid);

		firebase
			.database()
			.ref('Users/' + data.user.uid + '/')
			.set(form)
			.then((data) => {
				console.log('ssssssssssssssss');
				//success callback

				console.log('data ', data);
				this.setState({isLoadingModal:false})
				this.props.navigation.navigate('Landing');
			})
			.catch((error) => {
				//error callback
				console.log('error ', error);
			});
		this.props.navigation.navigate('home');
	};

	handleSignUp = (form, pass) => {
		console.log('here');
		firebase
			.auth()
			.createUserWithEmailAndPassword(form.email, pass)
			.then((data) => this.setUpDB(data, form))
            .catch((error) => this.setState({ errorMessage: error.message }));
            
            alert("Email Confirmation succesful, You My Now Log in!")
	};
	checkCredentials=()=>{
		var cred=this.state.form;
		if(cred.username.value && cred.email.value.length!=0 && cred.username.value.length!=0 && cred.mobile.value.length!=0 
			&& cred.password.length!=0 && cred.email.valid && cred.password.valid && cred.confirmPassword.valid
			&& cred.mobile.valid 
			)
			{
				return true;
			}else{
				return false;
			}
	}
	submit = () => {

		this.setState({isLoading:true});
		console.log('9999999');
		if(!this.checkCredentials()){
			
			this.setState({isLoading:false,errorMessage:'Problem occured at credetials must input all values'});
			return;
		}
		// console.log(checkInternet())
	    firebase.database().ref('Users/').on('value',(snapshot)=>{
			var x=snapshot.val();
			console.log('------------Inside onsubmite firebase ------------')
            var check=false;
            for (var i in x){

                console.log(this.state.form.email.value+'   '+x[i].email)
                if(this.state.form.email.value===x[i].email){
                    this.setState({errorMessage:'Email Already Exists'})
                    check=true;
                    console.log('---')
                    break;
                }
            }
            if(check==false){
                console.log(check)
				let form = {
					username: this.state.form.username.value,
					email: this.state.form.email.value,
					// password: this.state.form.password.value,
					mobile: this.state.form.mobile.value,
					as: this.state.form.as.value,
					city: '',
					category: '',
					closingTime: '',
					
					mainProduct: '',
					mobile: '',
					name: '',
					officeContact: '',
					officeEmail: '',
					openingTime: '',
					password: '',
					shopaddress: '',
					userimage: '',
					// username:"",
					workingFrom: '',
					workingTo: ''
				};
				console.log('00');
				console.log(form);
				this.setState({final_form:form})
		
				var er=  this.onRegisterPressed(form, this.state.form.password.value);
				console.log('-----'+er)
				
				if(er){
					
				}else{
					return;
				}
				
            }else{
				this.setState({isLoading:false})
                return;
            }


        }, (error) =>{
			// The Promise was rejected.
			console.log('------------Inside error--------')
			console.error(error);
		  });
		console.log('-------------Outside firebase on submit----------')


		// this.props.navigation.navigate('home');
	};

	async onRegisterPressed(form) {
        //CHECK IF FORM.EMAIL ALREADY EXISTS.
  
		try {
			let response = await fetch(api+'/signup', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					data: form
				})
			});
			let res = await response.text();
			if (response.status >= 200 && response.status < 300) {
				//Handle success
				let accessToken = res;
				console.log('----------------------');
                console.log(accessToken);
                var serverToken = JSON.parse(accessToken)
                this.setState({confirmToken:serverToken.token})
                console.log("THIS STATE TOKEN : " + this.state.confirmToken)
				this.setState({isLoading:false,modalVisible: !this.state.modalVisible });
				//On success we will store the access_token in the AsyncStorage
				//   this.storeToken(accessToken);
				//   this.redirect('home');
				return true;
			} else {
				//Handle error
				let error = res;
				console.log('--------------------------')
				this.setState({modalVisible:false})
				console.log(error)
				this.setState({errorMessage:'Check your connections'})
				return false;
			}
		} catch (errors) {
			//errors are in JSON form so we must parse them first.
			// let formErrors = JSON.parse(errors);
			console.log('--------------------------')
			this.setState({modalVisible:false})
			console.log(errors)
			this.setState({errorMessage:'Check your connections'})
			// this.setState({})
			return false;
			
		}
	}
    tokenInput=(text)=>{
        
        this.setState({confirmTokenText:text})
        console.log(text);
    }
    confirmToken = () =>{

		this.setState({isLoadingModal:true})
        console.log("user input token  : " + this.state.confirmTokenText);
        console.log("server  token  : " + this.state.confirmToken);

            if(this.state.confirmToken == this.state.confirmTokenText){
              
                this.handleSignUp(this.state.final_form, this.state.form.password.value);

            }else{
				this.setState({isLoadingModal:false})
                alert("Invalid Token!");
            }
    }
	render() {
		return (
			<View style={{ flex: 1 }}>

				<Modal animationType="slide" transparent={false} visible={!this.state.modalVisible}>
					<ScrollView>
					<TouchableOpacity style={{marginLeft:10,marginTop:10}}
                onPress={()=>this.props.navigation.goBack()}
                >
                    <Icon name='arrow-left' size={30}></Icon>
                </TouchableOpacity>
					<View style={{  alignItems: 'center' }}>
						<Icon style={{marginTop:50,}} name="user-plus" size={100} color="black" />
					</View>

					<Input
						overrideStyle={{ textAlign:"center",marginBottom: 10, marginTop: 20 }}
						placeholder="Full Name"
						type={this.state.form.username.type}
						value={this.state.form.username.value}
						onChangeText={(value) => this.updateInput('username', value)}
						autoCapitalize={'none'}
					/>
					{
						this.state.form.username.valid ? (null) : (
							<Text  style={{textAlign:"center",color:"red"}}>Length minimum 1 Maximum 30</Text>
						)
						
						
					}

					<Input
						overrideStyle={{textAlign:"center", marginBottom: 10, marginTop: 10 }}
						placeholder="Mobile Number"
						type={this.state.form.mobile.type}
						value={this.state.form.mobile.value}
						keyboardType={"numeric"}
						onChangeText={(value) => this.updateInputNumeric('mobile', value)}
						autoCapitalize={'none'}
					/>
					{
						this.state.form.mobile.valid ? (
							null
						):(
							<Text style={{textAlign:"center",color:"red"}}> 11 digits required </Text>
						)
					}
					<Input
						overrideStyle={{ textAlign:"center",marginBottom: 10, marginTop: 10 }}
						placeholder="Enter Email"
						type={this.state.form.email.type}
						value={this.state.form.email.value}
						onChangeText={(value) => this.updateInput('email', value)}
						autoCapitalize={'none'}
						keyboardType={'email-address'}
					/>
					{
						this.state.form.email.valid ? (
							null
						):(
							<Text style={{textAlign:"center",color:"red"}}> Invalid Email </Text>
						)
					}
                        <View style={{width:"80%", borderRadius:300 ,marginLeft:50, borderWidth:1,borderColor:"gray"}}>
					<Picker
                        
						mode="dialog"
						selectedValue={this.state.form.as.value}
                        onValueChange={(lang) => this.updateInput('as', lang)}
                        
					>
						<Picker.Item label="Seller Type " value="retailer"></Picker.Item>
						<Picker.Item label="wholesaler" value="wholesaler" />
						<Picker.Item label="retailer" value="retailer" />
					</Picker>
                    </View>
					<Input
						overrideStyle={{textAlign:"center", marginBottom: 10, marginTop: 10 }}
						placeholder="Enter password"
						type={this.state.form.password.type}
						value={this.state.form.password.value}
						onChangeText={(value) => this.updateInput('password', value)}
						secureTextEntry
					/>
					{
						this.state.form.password.valid ? (
							null
						):(
							<Text style={{textAlign:"center",color:"red"}}> Password Length Must be Minimum 6 Maximum 8 </Text>
						)
					}
					<Input
						overrideStyle={{textAlign:"center", marginBottom: 10, marginTop: 10 }}
						placeholder="Confirm Password"
						type={this.state.form.confirmPassword.type}
						value={this.state.form.confirmPassword.value}
						onChangeText={(value) => this.updateInput('confirmPassword', value)}
						autoCapitalize={'none'}
						secureTextEntry
                	/>
					{
						this.state.form.confirmPassword.valid ? (
							null
						):(
							<Text style={{textAlign:"center",color:"red"}}> Confirm Password Did Not Match With Password </Text>
						)
					}

					{this.state.errorMessage ? (<Text style={{textAlign:"center",color:"red",fontWeight:"bold",}}>
                        {this.state.errorMessage}
						{/* You might have missed something! */}
                        {console.log("Error message: "  + this.state.errorMessage)}
                    </Text>) : (null)}
                    
					{/* {!this.state.hasErrors ? (
						<View>
							<Text>Enter Valid username or password</Text>
						</View>
					) : (
						<Text />
					)}	{!this.state.hasErrors ? (
						<View>
							<Text>Enter Valid username or password</Text>
						</View>
					) : (
						<Text />
					)} */}
					{/* <Text>{this.state.errorMessage}</Text> */}
					{/* <Button title="Sign In" onPress={()=>this.props.navigation.navigate("SignIn")}></Button>
                <Button title="Creat new Account" onPress={()=>this.props.navigation.navigate("CreateAccount")}></Button>
                <Button title="Reset Password" onPress={()=>this.props.navigation.navigate("SignIn")}></Button> */}
					<View style={{elevation:5,alignItems:"center",justifyContent:"center"}}>
                    <View  style={styles.buttonStyle} >
						
						{this.state.isLoading ? (
							<View>
								{/* <TouchableOpacity onPress={()=>this.setState({isLoading:false,errorMessage:''})}>
									<Text style={{fontColor:"black",fontWeight:"bold",paddingTop:10,paddingBottom:10,fontSize:20}}>Cancel</Text>
								</TouchableOpacity> */}

							<ActivityIndicator size="small" color="#0000ff" ></ActivityIndicator>
							</View>
							):(
							<TouchableOpacity onPress={this.submit}>
                            <Text style={{fontColor:"black",fontWeight:"bold",paddingTop:10,paddingBottom:10,fontSize:20}}>Register</Text>
                        </TouchableOpacity>

						)}
					
                        
                       
					</View>
				
                    </View>

					</ScrollView>
				
				</Modal>
				<Modal
					// style={{height:10}}
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
				>


                        <View style={{marginTop:10,marginLeft:"90%"}}>
                     <Icon 
                    onPress={()=>this.setState({modalVisible:!this.state.modalVisible})} style={{marginBottom:20}}
                    name="times-circle" size={40} color="red" />
                    </View>
					<View style={{ marginTop:200,width:"100%",flex: 1,  alignItems: 'center' }}>
						
                   

							<Icon style={{marginBottom:20}} name="check-circle" size={100} color="green" />
						
						
							<View style={{width:"60%"}} >
								<TextInput
                                    placeholder="Enter Token"
                                    
                                    value={this.state.confirmTokenText}
                                    onChangeText={(value) => this.tokenInput( value)}
                                    autoCapitalize={'none'}

                                style={{
										
										padding: 15,
										borderRadius: 100,
										borderWidth: 1,
										borderColor: 'black'
									}}
								/>
                            </View>
                            <View style={{width:"60%"}}>
								<TouchableOpacity
                                onPress={()=>this.confirmToken()}
									style={{
                                        // marginLeft:100,
										marginTop: 15,
										elevation: 5,
										padding: 5,
										borderRadius: 100,
										// width: '60%',
										backgroundColor: 'red'
									}}
								>
									{ this.state.isLoadingModal ? (
										<ActivityIndicator size='small'></ActivityIndicator>
									):(
										<Text
										style={{

											textAlign: 'center',
											fontSize: 30,
											color: 'white',
											fontWeight: 'bold'
										}}
									>
										Confirm Token
									</Text>
									
									)}

                                </TouchableOpacity>
                                        <View style={{marginTop:10}}>
                                            <Text style={{textAlign:"center"}}>You have recieved a confirmation token on your email.
                                                Enter it to compelete your registration!.
                                            </Text>

                                        </View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonStyle: {
        borderRadius:100,
        backgroundColor:"chartreuse",
        alignItems:"center",
        justifyContent:"center",
        width:"50%",
		// marginBottom: 10,
		// marginTop: 10
	}
});
export default CreateAccountScreen;
