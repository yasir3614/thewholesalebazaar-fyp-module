import React, {Component} from 'react';
import {StyleSheet, View, Text, Image,TextInput} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import jsonItems from '../../../items.json';
import {TouchableOpacity} from 'react-native';
// import ad from '../../../images/';
import firebase from '../../config/firebase';
import Icon from 'react-native-vector-icons/FontAwesome'


export default class ViewProducts extends Component {
  state = {
    recomended:false,
    searchVal:"",
    products: [],
    imUrl: '',
    filterProducts:[]
  };
   readUserData() {

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
            dateProductAddedIn:x[i].dateProductAddedIn,
            sentiment: x[i].sentiment ?  ( x[i].sentiment ): 0

          };
          products.push(temp);
          console.log(temp);
        }
        console.log('==============');
        console.log(products);
        this.setState({products: products,filterProducts:products});
        // return products;
        console.log(this.state.products)
      },error=>{
        console.log(error);
      });
  }
  componentWillMount() {
    this.readUserData();
  }
  Search=(text)=>{
    var fp=[];
    var products=this.state.products;
    for(var i in products){
      if(products[i].name.includes(text)){
        fp.push(products[i])
      }
    }
    this.setState({filterProducts:fp})
  }
 compare=( a, b )=> {
    if ( a.sentiment < b.sentiment ){
      return -1;
    }
    if ( a.sentiment > b.sentiment ){
      return 1;
    }
    return 0;
  }
  
  recomendation=()=>{

    this.setState({recomended:!this.state.recomended})
    if(!this.state.recomended){
      var fp=[];
      var products=this.state.products;
      for(var i in products){
        if(products[i].sentiment>0){
          fp.push(products[i])
        }
      }
      fp.sort( this.compare );
  
      this.setState({filterProducts:fp})
   
    }else{
      this.setState({filterProducts:this.state.products})
   
    }
  }

  render() {
    return (

      <View style={{flex:1,marginTop:10}}>
        <View style={{padding:5,flexDirection:'row',marginLeft:10,marginRight:10,borderRadius:100,borderWidth:3,borderColor:"black"}}>
        <Icon  name="search" size={25} style={{paddingTop:10}}/>
              <TextInput
      placeholder="Search for product"
      value={this.state.filterProducts}
      onChangeText={(filterProducts)=>this.Search(filterProducts)}
      
    ></TextInput>

    </View>
    <View style={{padding:5}}>
        <TouchableOpacity
            onPress={()=>this.recomendation()}
            style={[{ padding:5}, this.state.recomended ? ({backgroundColor:'white'}):({backgroundColor:'white'})]}
          >
    
    <Text style={{textAlign:"center",color:'gray',fontSize:25}}>{this.state.recomended ? ("<Back"):("Recomendations >")} </Text>
          </TouchableOpacity>
      </View>

      <FlatGrid
        itemDimension={150}
        items={this.state.filterProducts}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ProductDetail', {
                itemId: 86,
                othertParam: {item},
              });
            }}>
            <View style={[styles.itemContainer, {backgroundColor: '#f0910e'}]}>
              <Image
                style={{width: '100%', height: '60%', resizeMode: 'cover'}}
                // source={{uri: 'https://picsum.photos/id/188/200/300'}}
                source={{uri:item.imgUrl}}
              />

              {/* imgSrc  = "../../../images/" + item.productImg */}
              {/* <Image style={{width:"100%",height:"60%",resizeMode:"cover"}} source={require("../../../images/"+item.productImg)}/> */}
              {/* {console.log(item.productImg)} */}
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>Rs. {item.price}</Text>
              {/* {this.state.recomended ? (
                <Text style={styles.itemCode}>Response Value :{item.sentiment}</Text>
              ):(null)} */}

              {/* <Text style={styles.itemCode}>Rs. {item.productId}</Text> */}

            </View>
          </TouchableOpacity>
           
        )}
      />
            </View>

      
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 5,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    // paddingTop:5,
    height: 220,
  },
  itemName: {
    fontSize: 16,
    color: 'white',
    // fontWeight:"600",
    fontWeight: 'bold',
  },
  itemCode: {
    marginTop: 4,
    paddingLeft: 5,
    backgroundColor: 'white',
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
  },
});
