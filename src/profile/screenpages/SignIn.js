import React,{Component} from 'react';
import {Text,View,Button,ActivityIndicator,StyleSheet,TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

import Input from '../components/Input';
import ValidationRules from '../components/ValidationRules';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../../config/firebase';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class LandingScreen extends Component{
    state ={
        isLoading:false,
        hasErrors:false,
        errorMessage:'',
        form:{
            email:{
                value:"yasir.1@gmail.com",
                valid:true,
                type:"textInput",
                rules:{
                    isRequired:true,
                    isEmail:true
                }
            },
            password:{
                value:"1234567",
                valid:true,
                type:"textInput",
                rules:{
                    isRequired:true,
                    minLength:6
                }
                
            },
            confirmPassword:{
                value:"",
                valid:true,
                type:"textInput",
                rules:{
                    isRequired:true,
                    confirmPass:"password"
                }
                
            }
        
        }
    
    }

    
    
    loginUser=(email,password)=>{

        if(email.length!=0 && password.length!=0 && this.state.form.email.valid && this.state.form.password.valid){

        }else{
            this.setState({errorMessage:'Valid inputs required'});
            return;
        }
        this.setState({isLoading:true});
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then( data=>{
            this.props.loginUser(data)
            
        }
            )
            

        .catch(error => this.setState({isLoading:false, errorMessage: "Invalid Credentials" }))
      }

 updateInput=(name,value)=>{
        this.setState({
            hasErrors:false,
        });
        //make all the changes in copy before state so making a copy
        let formCopy=this.state.form;
        
        let rules =formCopy[name].rules;
        let valid=ValidationRules(value,rules);
        
        
        
        formCopy[name].value=value;
        formCopy[name].valid=valid;
        this.setState({

            form:formCopy
        });
        
    
    }

   
    render(){
        return(
            <KeyboardAwareScrollView
            //   style={{ backgroundColor: '#4c69a5' }}
              resetScrollToCoords={{ x: 0, y: 0 }}
              scrollEnabled={false}
            >
            <View style={{flex:1}}>
                    <View style={{marginTop:30,justifyContent:"center",alignItems:"center"}}>
                    
                    <Icon  style={{}} name="user-circle" size={200} color='black'/>
                    
                    </View>

                    <View style={{}}>

                    <Input 
                       
                        placeholder="Enter Email"
                        type={this.state.form.email.type}
                        value={this.state.form.email.value}
                        onChangeText={ value => this.updateInput("email",value)}
                        autoCapitalize={"none"}
                        keyboardType={"email-address"}
                        overrideStyle={{textAlign:"center",marginBottom:10,marginTop:20}}
                        />
                        {
                            !this.state.form.email.valid ? (<Text style={{textAlign:"center",color:'red'}}>Invalid Email</Text>):(null)
                        }
                        <Input 
                            placeholder="Enter password"
                            type={this.state.form.password.type}
                            value={this.state.form.password.value}
                            onChangeText={ value => this.updateInput("password",value)}
                            secureTextEntry
                            overrideStyle={{textAlign:"center",marginBottom:10,marginTop:20}}
                         />
                        {
                            !this.state.form.password.valid ? (<Text style={{textAlign:"center",color:'red'}}>Invalid Password password must be of length 8</Text>):(null)
                        }

                {/* <Button title="Sign In" onPress={()=>this.props.navigation.navigate("SignIn")}></Button>
                <Button title="Creat new Account" onPress={()=>this.props.navigation.navigate("CreateAccount")}></Button>
                <Button title="Reset Password" onPress={()=>this.props.navigation.navigate("SignIn")}></Button> */}
                <Text style={{textAlign:"center",color:'red'}}>
                        {
                        this.state.errorMessage
                        }
                    </Text>
                    <View style={styles.buttonStyle}>
                        {
                            this.state.isLoading ? (
                                <ActivityIndicator size="small"></ActivityIndicator>
                            ) :(
                                <Button 
                                title="Login"
                                color="#fd9727"
                                onPress={()=>this.loginUser(this.state.form.email.value,this.state.form.password.value)}
                            />
    
                            )
                        }
                        
                                
                    </View>
                    

                    <View style={styles.buttonStyle}>
                    <Button 
                        title="Create Account"
                        color="red"
                        onPress={()=>this.props.navigation.navigate("CreateAccount")}
                    />
                    
                    </View>
                    <View>
                    < TouchableOpacity
                        style={{marginTop:10,marginLeft:165}}
                        onPress={()=>this.props.navigation.navigate("ResetPassword")}
                    >
                        <Text style={{fontSize:18}}> Forgot Password? </Text>
                    </TouchableOpacity>
                    
                    
                    </View>

                    </View>
            </View>
            </KeyboardAwareScrollView>

        )
    }
}

const styles=StyleSheet.create({
    buttonStyle:{
        fontWeight:"bold",
        fontSize:40,
        width:"50%",
        marginBottom:10,
        marginLeft: 120,
        marginTop:10,
        }

});
export default withNavigation(LandingScreen);




