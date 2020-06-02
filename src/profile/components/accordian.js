
import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
  
  render() {

    return (
       <View style={styles.container}>
            <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                <Icon name={this.state.expanded ? 'sort-up' : 'sort-down'} size={25} color={"black"} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    <Text style={styles.childtext}>Net Sales: PKR {this.props.data} /-</Text>    
                </View>
            }
            
       </View>
    )
  }

  toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    container:{
       margin:5,

    },
    title:{
        fontSize: 18,
        fontWeight:'bold',
        color: "black"
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:40,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: "lightblue",
    },
    parentHr:{
        height:1,
        color: "white",
        width:'100%'
    },
    child:{
        backgroundColor: "teal",
        padding:16,
        
    },
    childtext:{
        color:"white",
        fontSize: 18
    }
    
});