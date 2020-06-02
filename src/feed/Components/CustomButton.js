import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const CustomButton = props => {
  return (
    <View>
    <TouchableOpacity
      onPress={props.onPress}
      style={[props.style]}>
      <Icon name={props.iconName} color="black" size={45} />
      
    </TouchableOpacity>
    <Text style={{ marginLeft:30,}}>{props.children}</Text>
    </View>
  );
};

export default CustomButton;
