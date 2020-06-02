import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text,Image } from 'react-native';
import logo from '../images/Logo_APP.png'

class Login extends Component {
    render() {
        return (
            <View style={styles.login}>
                {/* image */}

                <Image source={logo}
                    resizeMode="contain"
                    style={{ marginTop: "10.33%", marginLeft: "15%", padding: '33%', width:"1%", height:'15%' }}
                />

                {/* email */}

                

                {/* password */}

                {/* Forgot Password */}

                {/* Register As Retailer */}

                {/* Register As Wholesaler */}
            </View>
        )
    }
}


const styles = StyleSheet.create({

    login:{
        backgroundColor: "#ecf0f1",
        width:"100%",
        flex:1
    }
  })
export default Login;