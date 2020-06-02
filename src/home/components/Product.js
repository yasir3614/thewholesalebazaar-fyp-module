import React from 'react';
import {Dimensions,View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native';

const Product=(props)=>{
    return(
  

        <View style={styles.productContainer}>
                   <View style={styles.insideContainer}>
                        <Image
                            style={styles.stretch}
                            source={require('../../temp_product/apple.jpg')}>
                                
                        </Image>
                                                    
                        <View style={styles.text}>
                            
                                <TouchableOpacity onPress={()=>props.navigation.navigate('ProductDetail')}>
                                    <Text style={styles.subText}>View Details</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.subText}>Add to Cart</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.subText}>Retailer</Text>
                                </TouchableOpacity>
                                <Text style={props.item}>stars</Text> 
                                <Text style={props.item}> {props.children}</Text> 
                        </View>
                    
                    </View>

        </View>
    


    )
}
{/* <Image
style={styles.stretch}
source={require('../../temp_product/apple.jpg')}>
    
</Image> */}
const styles = StyleSheet.create({
    productContainer:{
        flex:1,
        // flexDirection:"row",
        // alignItems:"center",
        // justifyContent:"center",
        // justifyContent:"center",
        flexWrap:"wrap",
        // width:"3",
        margin: 5,
        paddingTop:10,
        paddingBottom:10,
        borderWidth: 1,
        borderRadius: 2,
        borderWidth:3,
        borderColor: 'darkblue',
        // flexWrap:
      
    }
    ,
    insideContainer:{
        // flex:1,
        flexDirection:'row',
        margin:5,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },

    stretch: {
    //   borderRadius:10,
    //   borderWidth:1,
      borderColor:"green",
      width: 100,
      height: 100,
      marginRight:6,
      marginLeft:6,
      resizeMode: 'contain',
      padding:10

    },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      subText:{
          color:"blue",

      }
  });
export default Product;