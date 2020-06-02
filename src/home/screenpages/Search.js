import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
class SearchScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: (
        <View style={styles.titleStyle}>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={40}/>
          </TouchableOpacity>
          <TextInput

            style={styles.inputStyle}
            textContentType="name"
            placeholder="Search"
          />
        </View>
      ),
    };
  };

  render() {
    return (
      <View>
        <Text> Search </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  titleStyle: {
    flexDirection: 'row',
  },
  inputStyle: {
    width: '70%',
    height: '100%',
    fontSize: 20,
    paddingLeft:30
  },
  btnStyle: {
    marginTop: 4,
    height: '80%',
    // borderWidth: 2,
    
  },
  textStyle: {
    fontSize: 20,
  },
});

export default SearchScreen;
