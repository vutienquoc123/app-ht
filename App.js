import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Menu from './src/screens/Menu';
import Contact from './src/screens/Contact';
import Profile from './src/screens/Profile';
import Home from './src/screens/Home';
import EditProfile from './src/screens/EditProfile';
import Notification from './src/screens/Notification';
import MyCard from './src/screens/MyCard';
import ChangePass from './src/screens/ChangePass';
import InfoDonate from './src/screens/InfoDonate';
import RegisterDonate from './src/screens/RegisterDonate';
// import  from './src/screens/CreateCard';
import ForgotPass from './src/screens/ForgotPass';
import MyPreCard from './src/screens/MyPreCard';
import store from './src/redux/store';
class App extends Component {
  render() {
    const AppNavigator = createStackNavigator(
      {
        Login: {
          screen: Login,
        },
        Register: {
          screen: Register,
        },
        Menu: {
          screen: Menu,
        },
        Notification: {
          screen: Notification,
        },
        Contact: {
          screen: Contact,
        },
        Profile: {
          screen: Profile,
        },
        Home: {
          screen: Home,
        },
        EditProfile: {
          screen: EditProfile,
        },
        MyCard: {
          screen: MyCard,
        },
        ChangePass: {
          screen: ChangePass,
        },
        InfoDonate: {
          screen: InfoDonate,
        },
        RegisterDonate: {
          screen: RegisterDonate,
        },
        // CreateCard: {
        //   screen: CreateCard,
        // },
        ForgotPass: {
          screen: ForgotPass,
        },
        MyPreCard: {
          screen: MyPreCard,
        },
      },
      {
        initialRouteName: 'Home',
      },
    );

    const Main = createAppContainer(AppNavigator);
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
