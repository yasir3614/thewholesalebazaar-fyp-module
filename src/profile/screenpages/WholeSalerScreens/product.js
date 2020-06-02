import React, { Component } from 'react';
import { ImageBackground, View, TouchableOpacity, StyleSheet, Image, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation';
 class Product extends Component {
    render() {

        const { category,isBuyNowPayLator,offerPrice, name, quantity, price, tags, color, imgUrl,productId } = this.props.productArray;
        console.log("----------------------------");
        console.log(this.props.productArray)
        console.log("----------------------------");
        return (

            <ImageBackground
                // style={{height:"100%",width:"100%",resizeMode:"stretch",flex:1}}
                source={{ uri: "https://www.akfoconee.com/wp-content/uploads/2017/12/kids-martial-arts-landing-page-section-two-background-min-min.png" }}
                style={styles.productView}>

                <View style={{ flexDirection: 'row' }}>

                    <View 
                    style={styles.productImage}
                    >
                        <Image style={{ marginTop: 15, height: 100, width: 100, resizeMode: "contain" }} source={{ uri: imgUrl }} />

                    </View>

                    <View style={{ width:"40%",padding: 1, marginTop: "6%", marginLeft: "10%" }}>
                        <Text style={styles.itemDescription}>{name}</Text>
                        <Text style={styles.itemDescription}>Quantity: {quantity}</Text>
                        <Text style={styles.itemDescription}>Category: {category}</Text>
                        <Text style={styles.itemDescription}>Tags: {tags + " "}</Text>
                        <Text style={styles.itemDescription}>RS {price}</Text>

                    </View>

                    <View style={{marginLeft:10,marginTop:"8%"}}>
                    <TouchableOpacity style={{paddingBottom:4,}}>
                        <Icon name="edit" size={25}><Text>Edit</Text></Icon>
                        
                    </TouchableOpacity>

                    <TouchableOpacity style={{elevation:5,backgroundColor:"orange"}} onPress={()=>this.props.navigation.navigate('AddDealForm')}>
                        <Text style={{color:'black',fontWeight:"bold",padding:4,textAlign:"center",fontSize:18}}>Add Deal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                     style={{elevation:5,backgroundColor:"orange",marginTop:9}} onPress={()=>{this.props.navigation.navigate('ClearStockForm',{
                          otherParam: productId,
                    })}}>
                        <Text style={{color:'black',fontWeight:"bold",padding:4,textAlign:"center",fontSize:18}}>Clear Stock</Text>
                    </TouchableOpacity>

                    </View>

                </View>
            </ImageBackground>


        )
    }
}

const styles = StyleSheet.create({
    itemDescription: {
        // backgroundColor:"green",
        fontSize: 15,
        fontWeight:"bold",
        color: "black",
    },
    productView: {
        margin:2.5,
        padding:20,
        borderWidth: 0.14,
    },
    productImage:{
        paddingTop:10,
         height: 100,
          borderRadius: 30,
            width: "20%" 
    }
})

export default withNavigation(Product);