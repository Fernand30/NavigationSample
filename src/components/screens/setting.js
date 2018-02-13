import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  Button,
  View,
  TextInput,
  Image,
  StyleSheet
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Realm from 'realm';
export default class Setting extends Component {

  constructor(props){
    super(props)
    this.props.navigator.setStyle({
      navBarHidden: true,
    });
    this.state=({
      name: ''
    })
  }

  componentDidMount(){
    this.setState({name: this.props.name})
  }

  goBack(){
    this.props.navigator.pop({
      animated: false, // does the pop have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
  }

  onSave() { 
    if(this.state.name=='') alert('please insert name!')
    else{
        this.props.setName(this.state.name)
       
            let updt = this.props.realm.objects('info');
    
            this.props.realm.write(() => {
                updt[this.props.index].name = this.state.name;
            });
     
    }      
  }

  render() {
    return (
      <View style={styles.container}>
            <View style={styles.headerView}>
              <View style={styles.headerLeft}>
                <TouchableOpacity onPress={this.goBack.bind(this)}>
                  <Image source={require('../../img/backArrow.png')} style={styles.backButton}/>
                </TouchableOpacity>  
              </View>
              <View style={styles.headerCenter}>
                <Text style={styles.titile}>Setting</Text>
              </View>
              <View style={styles.headerRight}>
                <TouchableOpacity onPress={this.onSave.bind(this)}>
                  <Text style={styles.setting}>Setting</Text>
                </TouchableOpacity>  
              </View>
            </View>
            <TextInput value={this.state.name} onChangeText={(text) =>this.setState({name:text})}  style={styles.textInput} />
          
        </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex: 1
  },
  setting:{
    fontSize: 16
  },
  backButton:{
    width: 16,
    height: 27,
    marginLeft: 20,
  },
  headerView:{
    height: 60,
    marginTop: 20,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  headerCenter:{
    flex: 1
  },
  headerLeft: {
    flex: 0.3
  },
  headerRight: {
    flex: 0.3
  },
  titile:{
    fontSize: 24,
    textAlign: 'center'
  },
  textInput:{
    marginTop: 40,
    marginHorizontal: 40,
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
  }
})
