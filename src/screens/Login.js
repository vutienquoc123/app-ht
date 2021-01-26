import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  TextInput,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {global} from '../assets/styles/global';
import {auth} from '../assets/styles/auth';
import {login} from '../assets/styles/login';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {doLogin} from '../api/login';
import * as actions from '../redux/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {getHeader} from '../config/header';
import Spinner from 'react-native-loading-spinner-overlay';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity_card: '',
      password: '',
      check: false,
      loading: false,
      spinner: false,
    };
  }
  static navigationOptions = {
    headerTitleStyle: {
      fontSize: 18,
    },
    title: 'Đăng nhập',
  };

  _onPressSignUp() {
    this.props.navigation.push('Register');
  }
  async _onPressSignIn() {
    const {identity_card, password} = this.state;
    if (identity_card === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập số CMND');
    } else if (password === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu');
    } else {
      this.setState({spinner: true});
      try {
        const data = await doLogin({
          identity_card: identity_card,
          password: password,
        });
        if (data) {
          await AsyncStorage.setItem('token', data.data.access_token);
          const header = await getHeader();
          this.setState({spinner: false});
          this.props.profile(header);
          this.props.navigation.push('Menu');
        }
      } catch (e) {
        this.setState({spinner: false});
        setTimeout(() => {
          Alert.alert('Thông báo', e.response.data.message);
        }, 500);
      }
    }
  }
  _onPressForgotPass() {
    this.props.navigation.push('ForgotPass');
  }

  colorCheckBox() {
    this.setState({check: !this.state.check});
  }
  getColorCheckBox() {
    if (this.state.check) return auth.check;
    return {backgroundColor: '#efeff4'};
  }

  async UNSAFE_componentWillMount() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.props.navigation.push('Menu');
    } else {
      // this.props.navigation.push('Home');
    }
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={global.container}>
          {this.state.loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <ScrollView style={auth.scrollview}>
              <View style={auth.viewTitle}>
                <Spinner visible={this.state.spinner} />
                <Text style={auth.textTitle}>{'Đăng nhập tài khoản'}</Text>
              </View>
              <View style={auth.viewInput}>
                <Text style={login.label}>Số CMND</Text>
                <TextInput
                  autoCapitalize="none"
                  style={login.input}
                  onChangeText={(text) => this.setState({identity_card: text})}
                />
                <Text style={login.label}>Mật khẩu</Text>
                <TextInput
                  autoCapitalize="none"
                  secureTextEntry={true}
                  style={login.input}
                  onChangeText={(text) => this.setState({password: text})}
                />
              </View>
              <View style={auth.viewPassword}>
                <TouchableOpacity onPress={() => this.colorCheckBox()}>
                  <View style={auth.viewRemember}>
                    <View style={[auth.remember, this.getColorCheckBox()]}>
                      <FontAwesomeIcon icon={faCheck} color="#ffffff" />
                    </View>
                    <Text style={{color: '#000000'}}>{'Nhớ mật khẩu'}</Text>
                  </View>
                </TouchableOpacity>
                <Text
                  style={auth.textResgister}
                  onPress={() => this._onPressForgotPass()}>
                  {'Quên mật khẩu?'}
                </Text>
              </View>
              <TouchableOpacity onPress={() => this._onPressSignIn()}>
                <View style={auth.button}>
                  <Text style={auth.buttonText}>{'ĐĂNG NHẬP'}</Text>
                </View>
              </TouchableOpacity>
              <View style={auth.viewTitle}>
                <Text style={{fontStyle: 'italic'}}>
                  {'Bạn chưa có tài khoản? '}
                  <Text
                    style={auth.textResgister}
                    onPress={() => this._onPressSignUp()}>
                    {'Đăng ký'}
                  </Text>
                </Text>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {myProfile: state.auth.myprofile};
}

// export default connect()(Login);
export default connect(null, actions)(Login);
