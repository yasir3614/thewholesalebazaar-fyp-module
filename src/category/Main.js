import React,{Component} from 'react';
import {Text,View,Button} from 'react-native';

class MainScreen extends Component{

    render(){
        return(
            <View>
                <Button title="Wholesaler Category" onPress={()=>this.props.navigation.navigate("WholesalerCategory")}></Button>
                <Button title="Product Category" onPress={()=>this.props.navigation.navigate("ProductCategory")}></Button>
          
                
                <Text>Main Screen</Text></View>
        )
    }
}

export default MainScreen;




