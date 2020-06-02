import React,{Component} from 'react';
import {Image} from 'react-native'

class Logo extends Component {
    render() {
      return (
        <Image
          source={require('../../images/Logo_w.png')}
          style={{width: 200,height:50,resizeMode:"contain"}}
        />
      );
    }
  }

  export default Logo;