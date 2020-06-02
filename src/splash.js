import React,{Component} from 'react';
import {StyleSheet,Text,View,Image,ActivityIndicator} from 'react-native';
import logo from '../images/Logo_APP.png'



class SplashScreen extends Component {



  performTimeConsumingTask = async() => {
      return new Promise((resolve) =>
        setTimeout(
          () => { this.props.navigation.navigate('MainScreen') },
          1
        )
      );
    }
  
    async UNSAFE_componentWillMount(){
        
    const data = await this.performTimeConsumingTask();
  
    if (data !== null) {
      this.setState({ isLoading: false });
    }
    }
   
  
    constructor(props){
      super(props);
      this.state={isLoading:true}
  
    }
  
  
  

    render() {


      return (
       
        <View style={styles.splash}>
          <Image source={logo}
          resizeMode="contain"
          style={{marginTop:"50.33%",marginLeft:"15%",padding:'33%',width:'10%',height:'10%'}}
          /> 

          {/* STRETCH KIU HORAHA HAY  */}


          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({

    splash:{
        backgroundColor: "#ecf0f1",
        width:"100%",
        flex:1
    }

  }
  )
  
  export default SplashScreen;