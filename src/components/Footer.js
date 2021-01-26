/* eslint-disable comma-dangle */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faList,
  faBell,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {withNavigation} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {getHeader} from '../config/header';
import {getProfile} from '../api/profile';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: '',
      router: '',
      token: '',
      profile: [],
    };
  }
  _onPressRegister() {
    // const {profile} = this.state;
    // if (profile.length !== 0) {
    //   this.props.navigation.push('InfoDonate');
    // } else {
    //   this.props.navigation.push('RegisterDonate');
    // }
    this.props.navigation.push('RegisterDonate');
  }
  _onPressHomePage() {
    this.props.navigation.push('Home');
  }
  
  async _onPressNotification() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.props.navigation.push('Notification');
    } else {
      this.props.navigation.push('Login');
    }
  }
  async _onPressProfile() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.props.navigation.push('Menu');
    } else {
      this.props.navigation.push('Login');
    }
  }

  async UNSAFE_componentWillMount() {
    const router = this.props.navigation.state.routeName;
    this.setState({router: router});
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const header = await getHeader();
      const profile = await getProfile(header);
      this.setState({profile: profile.data.listregisters.data});
    }
  }

  render() {
    return (
      <View>
        <View style={styles.separator} />
        <View style={styles.footer}>
          <View style={styles.icon}>
            <TouchableOpacity onPress={() => this._onPressHomePage()}>
              <FontAwesomeIcon
                color={this.state.router === 'Home' ? '#317fc3' : null}
                style={styles.home}
                icon={faHome}
              />
              <Text
                style={[
                  styles.home,
                  styles.text,
                  this.state.router === 'Home' ? styles.text_active : null,
                ]}>
                Trang chủ
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.icon}>
            <TouchableOpacity onPress={() => this._onPressRegister()}>
              <FontAwesomeIcon
                color={this.state.router === 'InfoDonate' ? '#317fc3' : null}
                style={styles.home}
                icon={faList}
              />
              <Text
                style={[
                  styles.home,
                  styles.text,
                  this.state.router === 'InfoDonate'
                    ? styles.text_active
                    : null,
                ]}>
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.icon, styles.notifi]}>
            <TouchableOpacity onPress={() => this._onPressNotification()}>
              <FontAwesomeIcon
                color={this.state.router === 'Notification' ? '#317fc3' : null}
                style={styles.home}
                icon={faBell}
              />
              <Text
                style={[
                  styles.home,
                  styles.text,
                  this.state.router === 'Notification'
                    ? styles.text_active
                    : null,
                ]}>
                Thông báo
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.icon}>
            <TouchableOpacity onPress={() => this._onPressProfile()}>
              <FontAwesomeIcon
                color={this.state.router === 'Menu' ? '#317fc3' : null}
                style={styles.home}
                icon={faUser}
              />
              <Text
                style={[
                  styles.home,
                  styles.text,
                  this.state.router === 'Menu' ? styles.text_active : null,
                ]}>
                Tài khoản
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-around',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_active: {
    color: '#317fc3',
  },
  home: {
    alignSelf: 'center',
  },
  text: {
    fontSize: 10,
  },
  separator: {
    height: 10,
    backgroundColor: '#efeff4',
    marginTop: 5,
  },
  notifi: {
    position: 'relative',
  },
  number: {
    position: 'absolute',
    top: 0,
    right: 5,
    backgroundColor: '#317fc3',
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 50,
  },
  number_text: {
    fontSize: 8,
    color: 'white',
  },
});

export default withNavigation(Footer);
