import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-simple-radio-button';
import {getHeader} from '../config/header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {drawer} from '../assets/styles/drawer';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import RNFetchBlob from 'rn-fetch-blob';
import {Button} from 'react-native-elements';
import {updateProfile} from '../api/profile';
import * as actions from '../redux/actions/auth';
import {api} from '../api/index';
import {getHeaderCustom} from '../config/header';
// import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Chọn ảnh',
  takePhotoButtonTitle: 'Chụp ảnh',
  chooseFromLibraryButtonTitle: 'Chọn ảnh từ thư viện',
  quality: 1,
};
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birth: '',
      name: '',
      username: '',
      email: '',
      address: '',
      phone: '',
      gender: '',
      types: [
        {label: 'Nam', value: 1},
        {label: 'Nữ', value: 2},
      ],
      identity_card: '',
      avatar: '',
      avatar_url: '',
      loading: false,
    };
  }
  static navigationOptions = {
    headerTitleStyle: {
      fontSize: 18,
    },
    title: 'Cập nhật thông tin cá nhân',
  };

  UNSAFE_componentWillMount() {
    const {myProfile} = this.props;
    this.setState({
      birth: moment(myProfile.birth).format('YYYY-MM-DD'),
      name: myProfile.name,
      username: myProfile.username,
      phone: myProfile.phone,
      address: myProfile.address,
      email: myProfile.email,
      gender: myProfile.gender,
      avatar: myProfile.avatar,
      identity_card: myProfile.identity_card,
      // avatar: _.isEmpty(myProfile.images.data)
      //   ? ''
      //   : myProfile.images.data[0].url,
    });
  }

  async submit() {
    const header = await getHeader();
    const data = {
      name: this.state.name,
      username: this.state.username,
      phone: this.state.phone,
      address: this.state.address,
      email: this.state.email,
      gender: this.state.gender === 1 ? true : false,
      birth: this.state.birth,
      avatar: this.state.avatar,
      identity_card: this.state.identity_card,
    };
    if (data.gender === null) {
      Alert.alert('Thông báo', 'Vui lòng cập nhật giới tính');
    } else if (data.birth === 'Invalid date') {
      Alert.alert('Thông báo', 'Vui lòng cập nhật ngày sinh');
    } else if (data.name === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập họ tên');
    } else if (data.identity_card === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập số CMND');
    } else {
      const result = await updateProfile(data, header);
      if (result) {
        Alert.alert('Thông báo', 'Cập nhật thành công', [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.push('Profile'),
          },
        ]);
      }
    }
  }

  // _onPressProfile() {
  //   this.setState({loading: true});
  //   ImagePicker.launchImageLibrary(options, async response => {
  //     if (response.didCancel) {
  //       this.setState({loading: false});
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       RNFetchBlob.fetch('POST', api + '/uploads/import', getHeaderCustom(), [
  //         {name: 'file', filename: response.fileName, data: response.data},
  //       ])
  //         .then(resp => {
  //           const data = JSON.parse(resp.data);
  //           this.setState({avatar: data.data.full_path});
  //           setTimeout(() => {
  //             this.setState({loading: false});
  //           }, 2000);
  //         })
  //         .catch(err => console.log(err));
  //     }
  //   });
  // }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <View>
          <ScrollView>
            <ImageBackground
              source={require('../assets/images/bg.png')}
              style={drawer.background}>
              {this.state.avatar === null ? (
                <ImageBackground
                  style={drawer.avatar}
                  imageStyle={{borderRadius: 50}}
                  source={require('../assets/images/user.png')}>
                  {this.state.loading ? (
                    <ActivityIndicator size="large" />
                  ) : null}
                </ImageBackground>
              ) : (
                <ImageBackground
                  style={drawer.avatar}
                  imageStyle={{borderRadius: 50}}
                  source={{uri: this.state.avatar}}>
                  {this.state.loading ? (
                    <ActivityIndicator size="large" />
                  ) : null}
                </ImageBackground>
              )}
              <View style={styles.wrappen}>
                <TouchableOpacity onPress={() => this._onPressProfile()}>
                  <FontAwesomeIcon size={12} style={styles.pen} icon={faPen} />
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <View style={styles.wrap}>
              <Text style={styles.text}>Họ và tên đệm</Text>
              <TextInput
                autoCapitalize="words"
                onChangeText={text => this.setState({name: text})}
                defaultValue={this.state.name}
                style={styles.input}
              />
            </View>
            <View style={styles.wrap}>
              <Text style={styles.text}>User name</Text>
              <TextInput
                autoCapitalize="none"
                onChangeText={text => this.setState({username: text})}
                defaultValue={this.state.username}
                style={styles.input}
              />
            </View>
            <View style={styles.wrap}>
              <Text style={styles.text}>Ngày sinh</Text>
              <DatePicker
                style={{width: '60%'}}
                date={
                  this.state.birth === 'Invalid date' ? '' : this.state.birth
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
                  this.setState({birth: date});
                }}
              />
            </View>
            <View style={styles.wrap}>
              <Text style={styles.text}>Giới tính</Text>
              <RadioForm
                radio_props={this.state.types}
                initial={this.state.gender - 1}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#2196f3'}
                animation={true}
                labelStyle={{marginRight: 20}}
                onPress={value => {
                  this.setState({gender: value});
                }}
              />
            </View>
            <View style={styles.wrap}>
              <Text style={styles.text}>Địa chỉ email</Text>
              <TextInput
                autoCapitalize="none"
                onChangeText={text => this.setState({email: text})}
                keyboardType="email-address"
                defaultValue={this.state.email}
                style={styles.input}
              />
            </View>
            <View style={styles.wrap}>
              <Text style={styles.text}>Số điện thoại</Text>
              <TextInput
                autoCapitalize="none"
                onChangeText={text => this.setState({phone: text})}
                // keyboardType="numeric"
                defaultValue={this.state.phone}
                style={styles.input}
              />
            </View>
            <View style={styles.wrap}>
              <Text style={styles.text}>Số CMND</Text>
              <TextInput
                autoCapitalize="none"
                onChangeText={text => this.setState({identity_card: text})}
                // keyboardType="numeric"
                defaultValue={this.state.identity_card}
                style={styles.input}
              />
            </View>
            <View style={styles.wrap}>
              <Text style={styles.text}>Địa chỉ</Text>
              <TextInput
                autoCapitalize="none"
                onChangeText={text => this.setState({address: text})}
                defaultValue={this.state.address}
                style={styles.input}
              />
            </View>
            {/* <View
              style={{
                marginBottom: 50,
                marginTop: 20,
                backgroundColor: '#2196f3',
                width: 100,
                alignSelf: 'center'
              }}> */}
            <Button
              title="Lưu"
              onPress={() => this.submit()}
              buttonStyle={{
                width: 100,
                alignSelf: 'center',
                marginBottom: 50,
                marginTop: 20,
              }}
            />
            {/* </View> */}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    borderColor: '#F5F5F5',
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  text: {
    flex: 1,
    color: '#030303',
  },
  input: {
    borderColor: '#000000',
    borderWidth: 1,
    height: 40,
    width: '60%',
    paddingLeft: 10,
  },
  right: {
    fontWeight: 'bold',
  },
  pen: {
    color: '#2196f3',
  },
  wrappen: {
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    left: '55%',
    top: '60%',
    padding: 7,
  },
});

function mapStateToProps(state) {
  return {myProfile: state.auth.myprofile};
}

export default connect(mapStateToProps, actions)(EditProfile);
