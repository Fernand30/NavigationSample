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
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as  appActions from '../../actions/index';

export default class Profile extends Component {

  constructor(props){
    super(props)
    this.props.navigator.setStyle({
      navBarHidden: true,
    });
    this.state=({
      name:''
    })
  }

  componentDidMount(){
    this.setName(this.props.name)
  }

  goBack(){
    this.props.navigator.pop({
      animated: false, // does the pop have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
    });
  }

  setName(name){
    this.setState({
      name: name
    })
  }

  onSettingPress() { 
    this.props.navigator.push({
      screen: 'Setting', 
      passProps: {name: this.props.name, realm: this.props.realm,index: this.props.index, setName: (params)=>{
          this.setName(params)
      }}, 
      animated: false, 
      animationType: 'fade', 
      navigatorStyle: {}, 
      navigatorButtons: {}, 
    });
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
                <Text style={styles.titile}>Profile</Text>
              </View>
              <View style={styles.headerRight}>

              </View>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.arrow}>name</Text>
              <TextInput editable={false} style={styles.textInput} value={this.state.name} />
              <TouchableOpacity onPress={this.onSettingPress.bind(this)}>
                <Text style={styles.arrow}>⇨</Text>
              </TouchableOpacity>
            </View>
           
        </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex: 1
  },
  rowView:{
    marginTop: 40,
    marginHorizontal: 40,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  backButton:{
    width: 16,
    height: 27,
    marginLeft: 20,
  },
  arrow:{
    fontSize: 20,
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
    width: 150,
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
  }
})

