import { validate } from "@babel/types";

const validation=(value,rules,formCopy)=>{
	let valid=true;
    for (let rule in rules){
        switch(rule){ 
            case "isRequired":
                    valid=valid && validateRequired(value)
                    break;
            case "isEmail":
                    valid=valid && validateEmailRequired(value)
                    break;
            case "minLength":
                    valid=valid && validateMinLengthRequired(value,rules[rule])
                    break;
            case "maxLength":
                    valid=valid && validateMaxLengthRequired(value,rules[rule])
                    break;
            case "confirmPass":
                    valid=valid && value===formCopy.password.value;
                break;
            default:
                valid=true
            
         
        }
    }
    console.log(valid);
    return valid;
}
const validateRequired=value =>{
   
    if(value!==""){
   
        return true;
    }
    console.log('d');
    return false;
}
const validateEmailRequired=value =>{
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return expression.test(String(value).toLowerCase());
}
const validateMinLengthRequired=(value,minLength)=>{
        if(value.length>=minLength){
            return true;
        }
        return false;
}

const validateMaxLengthRequired=(value,maxLength)=>{
    if(value.length<maxLength){
        return true;
    }
    return false;
}
export default validation;