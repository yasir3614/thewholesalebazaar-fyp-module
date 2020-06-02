import React from 'react';
import {TextInput,StyleSheet} from 'react-native'; 
let template=null;

const Input=(props)=>{
 switch(props.type){
	case "textInput":
		template=
			<TextInput
				underlinColorAndroid="transparent"
				{...props}
				 style={[styles.input,props.overrideStyle]}
					/>
					break;
				default:
				return template;
				}
			return template;
			
}	

const styles=StyleSheet.create({
	input:{
		marginLeft:50,marginRight:50,borderRadius:30,borderColor:"orange",borderWidth:2,
		fontSize:20,
		padding:5,
		// marginTop:10,
	}
})

export default Input; 