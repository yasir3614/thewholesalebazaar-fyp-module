import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';

import Input from '../components/Input';
import ValidationRules from '../components/ValidationRules';
import Icon from 'react-native-vector-icons/FontAwesome';

import SignIn from './SignIn';
import RetailerOptions from './RetailerOptions';
import WholeSalerOptions from './WholeSalerOptions';
import firebase from './../../config/firebase';

class LandingScreen extends Component {
    componentWillMount() {
        // this.RemoveSession();
        console.log('-----------componrt will mount ttt');
        this.checkLoggedin();
    }
     checkLoggedin = async () => {
        try {
            const value =await  AsyncStorage.getItem('userID');
            console.log(value);
            if (value !== null) {

                this.setState({ check: true })
                this.checkUser(value);

                console.log('check logged in'+value);
            } else {
                this.setState({
                    check: false
                })
            }
        } catch (error) {

            // Error retrieving data
        }
    };
    async RemoveSession() {
        try {
            await AsyncStorage.removeItem("userID");
            return true;
        }
        catch (exception) {
            return false;
        }
    }

    logoutUser = () => {

        firebase.auth().signOut().then(() => {
            this.RemoveSession();
            
            console.log("Signed out");
            this.setState({check:false})
            this.props.navigation.navigate('Landing');

        }, function (error) {
            // An error happened.
        });
    }

    // checkUserType = (userID) => {
    //     db = firebase.database();
    //     console.log("000000000000000000000000000000000000000000");
    //     console.log(userID);
    //     var ref = db.ref("Users/");
    //     // Attach an asynchronous callback to read the data at our posts reference
    //     ref.on(userID, function (snapshot) {
    //         console.log(snapshot.val());
    //     }, function (errorObject) {
    //         console.log("The read failed: " + errorObject.code);
    //     });
    //     return "retailer";
    // }

    state = {


        userLoggedIn: {

        },
        check: false,
        check2:true,
        userID: '',
        currentUser: {
            as: '',
            email: '',
            //   name:'',
            username: '',
            mobile: ''

        }
    }

    loginUser = (data) => {
        console.log('-------------------------------')
        console.log('login user '+data.user.uid);
        console.log('-------------------------------')
        this.StoreSession(data.user.uid);

        this.setState({
            userID: data.user.uid,
            check:true
        })

        // console.log('=='+t)
        this.checkUser(data.user.uid);

    }
    StoreSession = async (userID) => {
        console.log('----------Async storage ----');
        try {
            console.log('-----saving local-------')
            await AsyncStorage.setItem('userID', userID);
        } catch (error) {
            console.log(error);
            // Error saving data
        }
    };

    checkUser = (userID) => {
        // checkUser=()=>{
        console.log('check user ---  ' + userID)
        firebase.database().ref('Users/' + userID + '/').on("value", (snapshot) => {
            var x = snapshot.val();
            
            this.setState({
                currentUser: {
                    as: x.as,
                    email: x.email,
                    username: x.username,
                    mobile: x.mobile
                },
                check2:false
            })

            console.log("current user: ->>>>>" + this.state.currentUser)
        });

    }



    render() {


        let islogin = false;
        let userT = 'wholesaler';
        console.log('render '+this.state.userLoggedIn.uid);

        console.log('render  '+this.state.check)
        console.log('redner  '+this.state.currentUser)
        return (

            <View style={{ flex: 1 }}>
                {/* {!this.state.userLoggedIn.uid ? (<SignIn loginUser={this.loginUser}/>) :
                    userT === 'retailer' ? <RetailerOptions /> : <WholeSalerOptions />} */}
                {console.log('---------------------')}
                {console.log('rder '+this.state.check)}
                {/* <SignIn loginUser={this.loginUser} /> */}
                {
                    !this.state.check ? (<SignIn loginUser={this.loginUser} />) :
                        (



                            <View>
                                {console.log(this.state.currentUser)}
                                
                                {
                                    this.state.check2 ? <ActivityIndicator></ActivityIndicator> :
                                    this.state.currentUser.as === "wholesaler" ? (
                                        <WholeSalerOptions

                                            current={this.state.currentUser} userID={this.state.userLoggedIn.uid} logoutUser={this.logoutUser}
                                        />


                                    ) : this.state.currentUser.as === "retailer" ?
                                            (

                                                <RetailerOptions current={this.state.currentUser} userID={this.state.userLoggedIn.uid} logoutUser={this.logoutUser} />

                                            ) : <ActivityIndicator />}


                            </View>
                        )
                }


            </View>
        )
    }

}
export default LandingScreen;




