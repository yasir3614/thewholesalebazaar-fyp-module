import React, { Component } from 'react'
import Product from "./product";
import { StyleSheet, TouchableOpacity, AsyncStorage ,Image, View, Text, ScrollView } from 'react-native';
// import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { is } from '@babel/types';
import firebase from '../../../config/firebase';
class WholeSalerProducts extends Component {
    state = {
        product: [

            {
                name: "Mug",
                quantity: 2,
                price: 199,
                category: "Kitchen ware",
                tags: ["mug", "kitchen", "utensils"],
                color: "White",
                imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61KB6fUhcSL._SL1500_.jpg"

            },
            {
                name: "Samsung A50",
                quantity: 6,
                price: 15000,
                category: "Mobile Phone",
                tags: ["mug", "kitchen", "phone"],
                color: "Black",
                imageUrl: "https://johnlewis.scene7.com/is/image/JohnLewis/238087827?$rsp-pdp-port-1440$"

            },
            {
                name: "Nokia A50",
                quantity: 6,
                price: 15000,
                category: "Mobile Phone",
                tags: ["mug", "kitchen", "phone"],
                color: "Black",
                imageUrl: "https://assets.mspimages.in/wp-content/uploads/2019/03/Nokia-X71-696x435.jpg"

            },
            {
                name: "QMobile A50",
                quantity: 6,
                price: 15000,
                category: "Mobile Phone",
                tags: ["mug", "kitchen", "phone"],
                color: "Black",
                imageUrl: "https://www.whatmobile.com.pk/admin/images/Qmobile/NoirJ5b.jpg"

            },

        ],
        products: [],
        imUrl: '',
        userLoggedIn:''
    }

    checkLoggedin = async () => {
        console.log('--------------------')
        try {
            const value = await AsyncStorage.getItem('userID');
            if (value !== null) {
    
                this.setState({
                    userLoggedIn: value,
                })
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2")
                console.log(this.state.userLoggedIn);
                console.log("logged in inside cartLOGGED IN")
                // alert("user is logged in")
            } else {
                console.log("NOT LOGGED IN")
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
        firebase
          .database()
          .ref('Product/')
          .on('value', (snapshot)=> {
            var products = [];
    
            console.log(snapshot.val());
            var x = snapshot.val();
            for (let i in x) {
              console.log(i);
              // console.log(x[i]);
              console.log('===== '+this.state.userLoggedIn+'   '+x[i].wholesalerId)
              if(x[i].wholesalerId==this.state.userLoggedIn){

              
              var temp = {
                name:x[i].name,
                productId: i,
                category: x[i].category,
                imgUrl: x[i].imgUrl,
                isBuyNowPayLater: x[i].isBuyNowPayLater,
                offerPrice: x[i].offerPrice,
                price: x[i].price,
                quantity: x[i].quantity,
                wholesalerId: x[i].wholesalerId,
              };
              products.push(temp);
              console.log(temp);
                }
            }
            console.log('==============');
            console.log(products);
            this.setState({products: products});
            // return products;
            console.log(this.state.products)
          },error=>{
            console.log(error);
          });
      }
    async  componentWillMount() {
        await this.checkLoggedin();
        await this.readUserData();
      }
    render() {



        return (
            <ScrollView>

                <TouchableOpacity style={styles.addProduct} onPress={() => this.props.navigation.navigate('WholeSalerUpdateProduct')}>

                    <View style={{margin:5,flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                        <Text style={{marginRight:10,fontSize:25,color:"white",fontWeight:"bold"}}>Add New Product</Text>
                        <Icon name="plus-circle" color="white" size={40}></Icon>

                    </View>
                </TouchableOpacity>

                {this.state.products.map((data, i) => {
                    return (
                        <Product productArray={data} />
                    );
                })

                }

            </ScrollView>



        )
    }
}
const styles = StyleSheet.create({
    addProduct:{
        marginLeft:60,
        marginRight:60,
        marginTop:10,
        marginBottom:10,
        backgroundColor:"darkorange",
        borderWidth:1,
        borderRadius:50,

    }
})
export default WholeSalerProducts;