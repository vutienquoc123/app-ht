/* eslint-disable comma-dangle */
import React, {Component, Fragment} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {global} from '../assets/styles/global';
import {auth} from '../assets/styles/auth';
import {getHeader} from '../config/header';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {login} from '../assets/styles/login';
import {changePassWord} from '../api/changePass';
class ChangePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_password: '',
      password: '',
      password_confirmation: '',
    };
  }
  static navigationOptions = {
    headerTitleStyle: {
      fontSize: 18,
    },
    title: 'Đổi mật khẩu',
  };
  async _onPressSignIn() {
    const {myProfile} = this.props;
    const {password, current_password, password_confirmation} = this.state;
    const header = await getHeader();
    if (password !== password_confirmation) {
      Alert.alert('Mật khẩu không khớp!');
    } else {
      const data = {
        password: password,
        current_password: current_password,
        password_confirm: password_confirmation,
      };
      const result = changePassWord(myProfile.id, data, header);
      if (result) {
        Alert.alert('Thông báo', 'Cập nhật mật khẩu thành công!');
        this.props.navigation.push('Menu');
      }
    }
  }
  render() {
    return (
      <Fragment>
        <SafeAreaView style={global.container}>
          <ScrollView style={auth.scrollview}>
            <View style={auth.viewInput}>
              <View style={styles.wrapinput}>
                <Text style={login.label}>Mật khẩu cũ</Text>
                <TextInput
                  autoCapitalize="none"
                  secureTextEntry={true}
                  style={login.input}
                  onChangeText={text => this.setState({current_password: text})}
                />
              </View>
              <View style={styles.wrapinput}>
                <Text style={login.label}>Mật khẩu mới</Text>
                <TextInput
                  autoCapitalize="none"
                  secureTextEntry={true}
                  style={login.input}
                  onChangeText={text => this.setState({password: text})}
                />
              </View>
              <View style={styles.wrapinput}>
                <Text style={login.label}>Xác nhận mật khẩu mới</Text>
                <TextInput
                  autoCapitalize="none"
                  secureTextEntry={true}
                  style={login.input}
                  onChangeText={text =>
                    this.setState({password_confirmation: text})
                  }
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => this._onPressSignIn()}>
              <View style={auth.button}>
                <Text style={auth.buttonText}>{'XÁC NHẬN'}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export const styles = StyleSheet.create({
  wrapinput: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 35,
    left: 10,
    zIndex: 2,
  },
});

function mapStateToProps(state) {
  return {myProfile: state.auth.myprofile};
}

export default connect(mapStateToProps, null)(ChangePass);
