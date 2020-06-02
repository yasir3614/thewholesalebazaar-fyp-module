import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import jsonItems from '../../../items.json';
import {TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';;

import firebase from '../../config/firebase';

class ViewWholeSalers extends Component {
  state = {
    wholesalers: [],
    imUrl: '',
  };
  readUserData() {
    console.log('firebase product loading');
    firebase
      .database()
      .ref('Users/')
      .on(
        'value',
        snapshot => {
          var wholesalers = [];

          console.log(snapshot.val());
          var x = snapshot.val();
          for (let i in x) {
            console.log(i);
            // console.log(x[i]);
            if(x[i].as=='wholesaler'){
            var temp = {
              wholesalerid:i,
              as:x[i].as,
              city:x[i].city,
              email:x[i].email,
              mainProduct:x[i].mainProduct,
              mobile:x[i].mobile,
              name:x[i].name,
              officialContact:x[i].officialContact,
              officialEmail:x[i].officialEmail,
              openingTime:x[i].openingTime,
              username:x[i].username,
              workingFrom:x[i].workingFrom,
              workingTo:x[i].workingTo,
              userimage:x[i].userimage,
              shopaddress:x[i].shopaddress,
              category:x[i].category
            };
            wholesalers.push(temp);
            console.log(temp);
            }
          }
          console.log('==============');
          console.log(wholesalers);
          this.setState({wholesalers: wholesalers});
          // return products;
          console.log(this.state.wholesalers);;
        },
        error => {
          console.log(error);
        },
      );
  }
  componentWillMount() {
    this.readUserData();
  }

  render() {
    return (
      <ScrollView>
        <View>
          {this.state.wholesalers.map((item, index) => {
            return (
              <TouchableOpacity >
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'orange',
                  margin: 18,
                  padding:10,
                  flexDirection: 'row',
                }}
                key={index}>
                  <View>
                <Image
                  style={{
                    resizeMode: 'contain',
                    width: 80,
                    height: 80,
                    margin: 10,
                  }}
                  source={{uri: item.userimage}}
                />
                    <Text style={{backgroundColor:"lightgray"}}>Username </Text>
                    <Text style={{marginBottom:5,fontSize: 15}}>{item.username}</Text>
                </View>

                <View style={{marginLeft: 25, marginTop: 10}}>
                  <View style={{width:'90%'}}>
                    <Text style={{backgroundColor:"lightgray"}}>Address</Text>
                  <Text style={{fontSize: 17}}>{item.shopaddress}</Text>
                  </View>
                  <View style={{width:'90%'}}>
                    <Text style={{backgroundColor:"lightgray"}}>Email</Text>
                  <Text style={{fontSize: 17}}>{item.email}</Text>
                  </View>
 
                  {/* <Text style={{fontSize: 12}}>{item.shopAddress}</Text> */}
                  <View style={{width:'100%'}}>
                  <TouchableOpacity
                    style={{
                      justifyContent:"center",
                      alignItems:"center",
                      flexDirection: 'row',
                      width: '60%',
                      alignItems: 'center',
                      marginTop: 10,
                      backgroundColor: 'orange',
                      elevation:5
                    }}
                    onPress={()=>this.props.navigation.navigate('WholeSalerDetail',{
                      wholesalerid:item.wholesalerid
                    })}
                    >

                    <Text style={{padding:5,textAlign:"center",fontSize: 18,fontWeight:"bold"}}>View Details</Text>
                    
                    {item.isVerified ? (
                      <Icon
                        style={{paddingLeft: 10}}
                        size={20}
                        name="check-circle"
                        color="black"
                      />
                      ) : null}

                    {/* <Icon style={{paddingLeft:10}} size={20}  name="check-circle" color="black"/>  */}
                  </TouchableOpacity>
                  </View>
                  
                </View>
                
              </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>
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
export default withNavigation(ViewWholeSalers);