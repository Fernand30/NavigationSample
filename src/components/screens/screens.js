import { Navigation } from 'react-native-navigation';
import Login from './login';
import Profile from './profile';
import Setting from './setting';


export default (store, Provider) =>  {
	Navigation.registerComponent('Login', () => Login, store, Provider);
	Navigation.registerComponent('Profile', () => Profile, store, Provider);
	Navigation.registerComponent('Setting', () => Setting, store, Provider);
	
}