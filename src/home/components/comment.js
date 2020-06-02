import React, { Component } from 'react';
import { View, StyleSheet, ScrollView,ActivityIndicator, Text } from 'react-native';
import api  from '../../../src/config/api';
import firebase from '../../../src/config/firebase';
 

export default class comment extends Component {

 getCommentsFromDatabase=(productid)=>{
    console.log('Inside Comments / product id');
    //comment username
	
	var jsonsend={};
	console.log('-------------inside get-------------')
	var comments = {};
	// var productid=req.params.productid;
    firebase.database().ref('comments/' + productid).on('value', (snapshot) => {
		var snapval = snapshot.val();
		var comments = [];
		var com = {};
		var sendStatus = false;
		

		for (var i in snapval) {
			comments.push(snapval[i]);
		}

		firebase.database().ref('Users/').on('value', (snapshot) => {
			var snapval = snapshot.val();
			var users = [];
            var sendcomments = [];
            console.log('-------------------------------here4--------------------------')
			for (var i in comments) {
				// console.log();

				sendcomments.push({
					username: snapval[comments[i]['userid']]['username'],
					usertype: snapval[comments[i]['userid']]['as'],
					comment: comments[i]['commentText']
				});
            }
             //out of scope hojayeag to barhe krde
            
			jsonsend['comments'] = sendcomments;
            console.log('-------------------------------here5--------------------------')
		
            //allcomments = jsonsend;
            console.log(" - - - - - - -  -COMMENTS--- - -  ");
            console.log(jsonsend);
            this.setState({
                comments:jsonsend.comments
            })
			this.setState({isLoading:false});
			// return jsonsend;
		

		});
	

    });


}

    state = {
        isLoading:true,
        comments : [],
        message:'Be first to comment!',
       
    }

    old_getCommentsFromDatabase = async (productid)=>{
        // let productId = this.props.pid;
        // let productId = this.state.productId;
        console.log("Product Id: "  + productid);
        var link = api+"/comments/"+productid;
        console.log("COMMENT LINKL " + link );
        

        await fetch(api+"/comments/"+productid)
            .then((response) => response.text()
            )
			.then((responseJson) => {
                console.log("--namoona------------------------");
                console.log(responseJson);
                var res=JSON.parse(responseJson);
                console.log(res.comments);
				this.setState({
					isLoading: false,
					comments: res.comments
                });
                // console.log("LENGTH OF COMMENTS" + this.state.comments.length);
                if(this.state.comments.length==0){
                    this.setState({isLoading:false})
                }
                console.log("COMMENTS: \n");
                console.log(responseJson);
			})
			.catch((error) => console.log("ERROR =>> " + error));


    }
    
    componentWillMount(){
        // super(props);
        // this.setState({productId: this.props.pid});
        // console.log("CONSTURSCOTR: " + this.props.pid);
        // console.log("state wala id: " + this.state.productId);
        console.log('in constructor ======')
        this.getCommentsFromDatabase(this.props.pid);
    }
    
	render() {
        // if(this.props.rerender==true){
        //     console.log('---loading comments ---')
        //     this.getCommentsFromDatabase();
        // }
        // console.log('----------------------------')
        //     for (var i in this.state.comments){
        //         console.log(this.state.comments[i])
        //     }
        console.log("~~~MESSAGE~~~~~~~~~~~~~~~~~~");
		return (
            this.state.isLoading ? (<ActivityIndicator></ActivityIndicator>) :
            this.state.comments.length==0 ? (
            <View style={styles.commentBox}><Text>{this.state.message}</Text></View>
            ):
            (

                this.state.comments.map(comment=>{
                    return(
                    <View style={styles.commentBox}>
				
               
                    <View style={{ margin: 10 }}>
                        <Text style={styles.author}>{comment.username}</Text>
                        <Text style={{ color: 'gray', marginBottom: 3 }}>{comment.usertype}</Text>
                        <View
                            style={{ padding: 10, borderWidth: 0.5, borderRadius: 5, borderColor: 'red', height: 'auto' }}
                        >
                            <Text multiline={true} >{comment.comment}</Text>
                            {/* <Text></Text> */}
                        </View>
                    </View>
                </View>
                    )
                })
)
			
		);
	}
}

const style = StyleSheet.create({
    author: {
		fontWeight: 'bold',
		color: 'orange',
		fontSize: 20
	},
	commentBox: {
		backgroundColor: 'white',
		margin: 10,
		borderWidth: 1,
		borderColor: 'gray',
		height: 'auto',
		marginBottom: 5,
		marginTop: 5
	},
})
