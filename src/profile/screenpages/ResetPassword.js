import React,{Component} from 'react';
import {Text,View,Button,Modal,ActivityIndicator,StyleSheet,TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

import Input from '../components/Input';
import ValidationRules from '../components/ValidationRules';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../../config/firebase';

import api from '../../config/api';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class LandingScreen extends Component{
    state ={
        modalEmail:true,
        modalPassword:false,
        enteredToken:'',
        modalToken:false,
        isLoading:false,
        hasErrors:false,
        message:'',
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
    forgotPassword = () => {
        // this.setState({isLoading:true});
        firebase.auth().sendPasswordResetEmail(this.state.form.email.value)
          .then(()=>{
            //   this.setState({message:'Reset link is sent to your email'})
            alert('Please check your email for password renewal.')
            this.props.navigation.navigate('Landing');
          }).catch(function (e) {
              alert("This Email Does Not Exist.")
            console.log(e)
          })
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
                <Text>{this.state.message}</Text>
                    <View style={{marginTop:30,justifyContent:"center",alignItems:"center"}}>
                    
                    <Icon  style={{}} name="user-circle" size={200} color='black'/>
                    
                    </View>

                    <View style={{}}>

                               <View>
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
                                            !this.state.form.email.valid ? (<Text style={{color:'red'}}>Invalid Email</Text>):(null)
                                        }

                                </View>
                            
                  <View style={styles.buttonStyle}>
                        {
                            this.state.isLoading ? (
                                <View>
                             <ActivityIndicator size="small"></ActivityIndicator>
                                <Button 
                                title="Cancel"
                                color="#fd9727"
                                onPress={()=>this.setState({isLoading:false})}
                                 />
                                </View>
                            ) :(
                                <Button 
                                title="Reset Password"
                                color="#fd9727"
                                onPress={()=>this.forgotPassword()}
                                // onPress={()=>this.loginUser(this.state.form.email.value,this.state.form.password.value)}
                            />
    
                            )
                        }
                        
                                
                    </View>
                    <Text style={{color:'red'}}>
                        {this.state.errorMessage}
                    </Text>

                    <View style={styles.buttonStyle}>
                    <Button 
                        title="Create Account"
                        color="red"
                        onPress={()=>this.props.navigation.navigate("CreateAccount")}
                    />
                    
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
        // marginBottom:10,
        marginLeft: 120,
        marginTop:5,
        }

});
export default withNavigation(LandingScreen);




