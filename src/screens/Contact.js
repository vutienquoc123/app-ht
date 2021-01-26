/* eslint-disable comma-dangle */
import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {global} from '../assets/styles/global';
import Footer from '../components/Footer';
import {auth} from '../assets/styles/auth';
import {login} from '../assets/styles/login';
import {contact} from '../api/contact';
import {getHeader} from '../config/header';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      fullname: '',
      address: '',
      phone: '',
      fax: '',
      content: '',
      data: {},
    };
  }
  static navigationOptions = {
    headerTitleStyle: {
      fontSize: 18,
    },
    title: 'Liên hệ',
  };

  componentDidMount() {}

  async _onPressSend() {
    const data = {
      email: this.state.email,
      fullname: this.state.fullname,
      address: this.state.address,
      phone: this.state.phone,
      fax: this.state.fax,
      content: this.state.content,
    };
    if (data.email === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập email');
    } else if (data.fullname === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập họ tên');
    } else if (data.address === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ');
    } else if (data.phone === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại');
    } else if (data.fax === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ');
    } else if (data.content === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập nội dung');
    } else {
      const header = await getHeader();
      const result = await contact(data, header);
    }
  }

  render() {
    const {data} = this.state;
    return (
      <Fragment>
        <SafeAreaView style={global.container}>
          <ScrollView>
            {this.state.loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <KeyboardAvoidingView
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
                behavior="padding"
                enabled
                keyboardVerticalOffset={100}>
                <View style={styles.element}>
                  <Text style={[styles.text, styles.title]}>
                    {'Địa chỉ: 40 Tràng Thi - Hoàn Kiếm - Hà Nội'}
                  </Text>
                  {/* <Text style={styles.text}>{data.address}</Text> */}
                </View>
                <View style={styles.element}>
                  <Text style={[styles.text, styles.title]}>
                    {'Email: gheptang@vncchot.com'}
                  </Text>
                  <Text style={styles.text}>{data.email}</Text>
                </View>
                <View style={styles.element}>
                  <Text style={[styles.text, styles.title]}>
                    {'Website: inthe.vnhot.vn'}
                  </Text>
                  <Text style={styles.text}>{data.website}</Text>
                </View>
                <View style={styles.element}>
                  <Text style={[styles.text, styles.title]}>
                    {'ĐT/Tel: 0915060550'}
                  </Text>
                  <Text style={styles.text}>{data.tel}</Text>
                </View>
                <View style={styles.element}>
                  <Text style={[styles.text, styles.title]}>
                    {'Hotline: 0915060550'}
                  </Text>
                  <Text style={styles.text}>{data.hotline}</Text>
                </View>
                <View style={styles.separator} />
                <Text style={[styles.alignment, styles.connect]}>
                  {'Kết nối với chúng tôi'}
                </Text>
                <View style={styles.alignment}>
                  <View style={auth.viewInput}>
                    <Text style={login.label}>Họ tên</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={login.input}
                      onChangeText={text => this.setState({fullname: text})}
                    />
                    <Text style={login.label}>Địa chỉ</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={login.input}
                      onChangeText={text => this.setState({address: text})}
                    />
                    <Text style={login.label}>Fax</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={login.input}
                      onChangeText={text => this.setState({fax: text})}
                    />
                    <Text style={login.label}>Email</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={login.input}
                      onChangeText={text => this.setState({email: text})}
                    />
                    <Text style={login.label}>Số điện thoại</Text>
                    <TextInput
                      autoCapitalize="none"
                      maxLength={10}
                      keyboardType="numeric"
                      style={login.input}
                      onChangeText={text => this.setState({phone: text})}
                    />
                    <Text style={login.label}>Nội dung</Text>
                    <TextInput
                      autoCapitalize="none"
                      multiline={true}
                      style={[login.input, styles.area]}
                      onChangeText={text => this.setState({content: text})}
                    />
                  </View>
                </View>
                <TouchableOpacity onPress={() => this._onPressSend()}>
                  <View style={[styles.button, styles.alignment]}>
                    <Text style={styles.buttonText}>{'GỬI TIN NHẮN'}</Text>
                  </View>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            )}
          </ScrollView>
        </SafeAreaView>
        <Footer />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
  },
  element: {
    flexDirection: 'row',
    paddingTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  separator: {
    height: 10,
    backgroundColor: '#e5e5ea',
    marginTop: 10,
    marginBottom: 10,
  },
  viewInputName: {
    flexDirection: 'row',
  },
  inputFirstName: {
    width: '50%',
  },
  inputLastName: {
    width: '45%',
    marginLeft: '5%',
  },
  button: {
    backgroundColor: '#317fc3',
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
    borderRadius: 10,
    marginTop: 25,
  },
  alignment: {
    marginLeft: 15,
    marginRight: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  connect: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  area: {
    height: 150,
  },
});

export default connect()(Contact);
