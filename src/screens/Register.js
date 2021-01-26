/* eslint-disable comma-dangle */
import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  TextInput,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {global} from '../assets/styles/global';
import {auth} from '../assets/styles/auth';
import {login} from '../assets/styles/login';
import {doRegister, getInfoAfterRegister} from '../api/register';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import DatePicker from 'react-native-datepicker';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      phone: '',
      email: '',
      password: '',
      re_password: '',
      birthday: '',
      address: '',
      identity_card: '',
      check: false,
      loading: false,
    };
  }

  static navigationOptions = {
    headerTitleStyle: {
      fontSize: 18,
    },
    title: 'Đăng ký',
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token_temp');
    if (token) {
      const data = await getInfoAfterRegister(token);
      this.setState({
        name: data.data.name,
        phone: data.data.phone,
        email: data.data.email,
        identity_card: data.data.identification,
        address: data.data.address,
        birthday: data.data.birthday,
        gender: data.data.gender === 1 ? true : false,
      });
    }
  }

  _onPressLogin() {
    this.props.navigation.push('Login');
  }
  async _onPressSignIn() {
    const {
      name,
      username,
      phone,
      email,
      password,
      re_password,
      birthday,
      identity_card,
    } = this.state;
    if (email === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập email');
    } else if (password === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu');
    } else if (re_password === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu xác nhận');
    } else if (phone === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại');
    } else if (phone.length < 10) {
      Alert.alert('Thông báo', 'Số điện thoại bao gồm ít nhất 10 số');
    } else if (name === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập họ tên');
    } else if (username === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập username');
    } else if (birthday === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập ngày sinh');
    } else if (identity_card === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập ngày số chứng minh nhân dân');
    } else {
      // const data = await doLogin({ email: email, password: password });
      if (password !== re_password) {
        Alert.alert('Thông báo', 'Mật khẩu xác nhận không chính xác!');
      } else {
        this.setState({loading: true});
        let data = {
          birth: this.state.birthday,
          name: this.state.name,
          username: this.state.username,
          phone: this.state.phone,
          email: this.state.email,
          password: this.state.password,
          district_id: 1,
          address: this.state.address,
          identity_card: this.state.identity_card,
          re_password: this.state.re_password,
        };
        const token = await AsyncStorage.getItem('token_temp');
        if (token) {
          data = _.assign({}, data, {
            list_register_token: token,
            gender: this.state.gender,
          });
        }
        let result = await doRegister(data);
        if (result) {
          Alert.alert('Thông báo', 'Đăng ký thành công!');
          this.setState({loading: false});
          this.props.navigation.push('Login');
        } else {
          this.setState({loading: false});
        }
      }
    }
  }
  _onPressForgotPass() {
    // this.props.navigation.push('ForgotPass');
  }

  colorCheckBox() {
    this.setState({check: !this.state.check});
  }
  getColorCheckBox() {
    if (this.state.check) return auth.check;
    return {backgroundColor: '#efeff4'};
  }
  render() {
    return (
      <Fragment>
        <SafeAreaView style={global.container}>
          {this.state.loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <KeyboardAvoidingView behavior="padding" enabled>
              <ScrollView style={auth.scrollview}>
                <View style={auth.viewTitle}>
                  <Text style={auth.textTitle}>{'Đăng ký tài khoản'}</Text>
                </View>
                <View style={auth.viewInput}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: '48%',
                      }}>
                      <Text style={login.label}>Họ và tên</Text>
                      <TextInput
                        defaultValue={this.state.name}
                        autoCapitalize="words"
                        style={login.input}
                        onChangeText={text => this.setState({name: text})}
                      />
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: '48%',
                      }}>
                      <Text style={login.label}>Username</Text>
                      <TextInput
                        autoCapitalize="none"
                        style={login.input}
                        onChangeText={text => this.setState({username: text})}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: '48%',
                      }}>
                      <Text style={login.label}>Ngày sinh</Text>
                      <DatePicker
                        style={{width: '100%'}}
                        date={
                          this.state.birthday === 'Invalid date'
                            ? ''
                            : this.state.birthday
                        }
                        mode="date"
                        placeholder="chọn ngày"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                          },
                          dateInput: {
                            // marginLeft: 36
                          },
                        }}
                        onDateChange={date => {
                          this.setState({birthday: date});
                        }}
                      />
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: '48%',
                      }}>
                      <Text style={login.label}>Số điện thoại</Text>
                      <TextInput
                        defaultValue={this.state.phone}
                        autoCapitalize="none"
                        style={login.input}
                        maxLength={10}
                        keyboardType="numeric"
                        onChangeText={text => this.setState({phone: text})}
                      />
                    </View>
                  </View>
                  <Text style={login.label}>Số chứng minh nhân dân</Text>
                  <TextInput
                    defaultValue={this.state.identity_card}
                    autoCapitalize="none"
                    style={login.input}
                    onChangeText={text => this.setState({identity_card: text})}
                  />
                  <Text style={login.label}>Địa chỉ email</Text>
                  <TextInput
                    defaultValue={this.state.email}
                    autoCapitalize="none"
                    style={login.input}
                    onChangeText={text => this.setState({email: text})}
                  />
                  <Text style={login.label}>Mật khẩu</Text>
                  <TextInput
                    autoCapitalize="none"
                    secureTextEntry={true}
                    style={login.input}
                    onChangeText={text => this.setState({password: text})}
                  />
                  <Text style={login.label}>Nhập lại mật khẩu</Text>
                  <TextInput
                    autoCapitalize="none"
                    secureTextEntry={true}
                    style={login.input}
                    onChangeText={text => this.setState({re_password: text})}
                  />
                </View>
                <TouchableOpacity onPress={() => this._onPressSignIn()}>
                  <View style={auth.button}>
                    <Text style={auth.buttonText}>{'ĐĂNG KÝ'}</Text>
                  </View>
                </TouchableOpacity>
                <View style={auth.viewTitle}>
                  <Text style={{fontStyle: 'italic'}}>
                    {'Bạn đã có tài khoản? '}
                    <Text
                      style={auth.textResgister}
                      onPress={() => this._onPressLogin()}>
                      {'Đăng nhập'}
                    </Text>
                  </Text>
                  <Text
                    style={{fontStyle: 'italic', color: 'red', marginTop: 15}}>
                    Lưu ý: Kiểm tra email để xác thực tài khoản sau khi đăng ký
                    thành công
                  </Text>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          )}
        </SafeAreaView>
      </Fragment>
    );
  }
}

// export default connect()(Login);
export default connect()(Register);
