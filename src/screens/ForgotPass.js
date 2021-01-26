/* eslint-disable comma-dangle */
import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {home} from '../assets/styles/home';
import {auth} from '../assets/styles/auth';
import {login} from '../assets/styles/login';
import {forgotPassword} from '../api/login';

class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }
  async _onPressForgotPassword() {
    const body = {
      email: this.state.email,
    };
    const result = await forgotPassword(body);
    if (result) {
      Alert.alert('Vui lòng kiểm tra email để xác nhận!');
    }
  }
  render() {
    return (
      <Fragment>
        <SafeAreaView style={home.container}>
          <ScrollView style={auth.scrollview}>
            <View style={auth.viewTitle}>
              <Text style={auth.textTitle}>{'Quên mật khẩu'}</Text>
            </View>
            <View style={auth.viewInput}>
              <Text style={login.label}>Địa chỉ email</Text>
              <TextInput autoCapitalize="none"
                style={login.input}
                onChangeText={text => this.setState({email: text})}
              />
            </View>
            <TouchableOpacity onPress={() => this._onPressForgotPassword()}>
              <View style={auth.button}>
                <Text style={auth.buttonText}>{'KHÔI PHỤC LẠI MẬT KHẨU'}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default connect()(ForgotPass);
