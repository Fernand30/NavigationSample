import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  Button,
  View,
  TextInput,
  StyleSheet
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import * as  appActions from '../../actions/index';
const Realm = require('realm');
export class Login extends Component {

  constructor(props){
    super(props)
    this.props.navigator.setStyle({
      navBarHidden: true,
    });
    this.state=({
      name: '',
      password: '',
      realm: null 
    })
  }

  onLoginPress() {
    if(this.state.name==''||this.state.password==''){
      alert('please fill name and password')
      return;
    }
    const Info = {
        name: 'info',
        properties: {
          name:  'string',
          password: 'string',
        }
      };
     Realm.open({
        schema: [Info]
      }).then(realm => {
          
          let password = ''
          let index = 0
          const info = realm.objects('info');
          //alert(JSON.stringify(info))
          for(i = 0;i<Object.keys(info).length;i++){
            if(info[i].name == this.state.name){
              password = info[i].password
              index = i
              break;
            }
          }
          if(password ==''){
            realm.write(() => {
              realm.create('info', {
                name: this.state.name,
                password: this.state.password
              });
            });
            this.props.navigator.push({
                    screen: 'Profile', 
                    passProps: {name:this.state.name, realm: realm,index: index+ 1}, 
                    animated: false, 
                    animationType: 'fade', 
                    navigatorStyle: {}, 
                    navigatorButtons: {}, 
                  });
          }else{
            if(password == this.state.password){
                this.props.navigator.push({
                    screen: 'Profile', 
                    passProps: {name:this.state.name, realm: realm, index: index}, 
                    animated: false, 
                    animationType: 'fade', 
                    navigatorStyle: {}, 
                    navigatorButtons: {}, 
                  });
            }else{
              alert('name and password are not matched. please try again!')
            }
          }
      });
  }

  handleChangeName(text){
    this.setState({
      name: text
    })
  }

  handleChangePassword(text){
    this.setState({
      password: text
    })
  }

  render() {

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
              <View style={styles.headerLeft}>

              </View>
              <View style={styles.headerCenter}>
                <Text style={styles.titile}>Login</Text>
              </View>
              <View style={styles.headerRight}>

              </View>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.text}>name</Text>
              <TextInput onChangeText={(text) =>this.handleChangeName(text)} style={styles.textInput} />
            </View>
            <View style={styles.rowView}>
              <Text style={styles.text}>password</Text>
              <TextInput secureTextEntry={true} onChangeText={(text) =>this.handleChangePassword(text)} style={styles.textInput} />
            </View>
            <View style={{height: 40}}/>
            <Button large style={styles.login} onPress={ () => this.onLoginPress()} title="Login"/>
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
    justifyContent:'center'
  },
  headerView:{
    height: 60,
    marginTop: 20,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  login:{
    marginTop: 30,
  },
  text:{
    fontSize: 18,
    textAlign: 'center',
    width: 100
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
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    width :200,
    paddingLeft: 10,
  }
})


export default connect()(Login);