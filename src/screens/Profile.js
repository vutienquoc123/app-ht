/* eslint-disable comma-dangle */
import React, {Component, Fragment} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  Text,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {global} from '../assets/styles/global';
import {drawer} from '../assets/styles/drawer';
import Footer from '../components/Footer';
import moment from 'moment';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {getHeader} from '../config/header';
import * as actions from '../redux/actions/auth';
import Edit from '../components/Edit';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.props.navigation.setParams({handleBack: this._back.bind(this)});
    this.state = {
      loading: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Thông tin tài khoản',
      headerTitleStyle: {color: '#000000', fontSize: 15, paddingLeft: 15},
      headerStyle: {backgroundColor: 'white'},
      headerLeft: (
        <TouchableOpacity onPress={() => params.handleBack()}>
          <View
            style={{
              paddingRight: 10,
              paddingLeft: 5,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              style={{marginTop: 3}}
              size={25}
              color={'#317fc3'}
              icon={faChevronLeft}
            />
            <Text style={{color: '#317fc3', fontSize: 18}}>Back</Text>
          </View>
        </TouchableOpacity>
      ),
      headerRight: <Edit />,
    };
  };

  _back() {
    this.props.navigation.push('Menu');
  }

  async UNSAFE_componentWillMount() {
    const header = await getHeader();
    this.props.profile(header);
  }

  render() {
    const {myProfile} = this.props;
    console.log(myProfile);
    return (
      <Fragment>
        <SafeAreaView style={global.container}>
          {this.state.loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <ScrollView>
              <ImageBackground
                source={require('../assets/images/bg.png')}
                style={drawer.background}>
                {myProfile.avatar === null ? (
                  <Image
                    style={drawer.avatar}
                    source={require('../assets/images/user.png')}
                  />
                ) : (
                  <Image
                    style={drawer.avatar}
                    source={{uri: myProfile.avatar}}
                  />
                )}
              </ImageBackground>
              <View style={styles.wrap}>
                <Text style={styles.text}>Họ và tên </Text>
                <Text style={[styles.text, styles.right]}>
                  {myProfile.name === null ? 'Chưa cập nhật' : myProfile.name}
                </Text>
              </View>
              <View style={styles.wrap}>
                <Text style={styles.text}>User name</Text>
                <Text style={[styles.text, styles.right]}>
                  {myProfile.username === null
                    ? 'Chưa cập nhật'
                    : myProfile.username}
                </Text>
              </View>
              <View style={styles.wrap}>
                <Text style={styles.text}>Ngày sinh</Text>
                <Text style={[styles.text, styles.right]}>
                  {myProfile.birth === null
                    ? 'Chưa cập nhật'
                    : moment(myProfile.birth).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View style={styles.wrap}>
                <Text style={styles.text}>Giới tính</Text>
                <Text style={[styles.text, styles.right]}>
                  {myProfile.gender === null
                    ? 'Chưa cập nhật'
                    : myProfile.gender === 1
                    ? 'Nam'
                    : 'Nữ'}
                </Text>
              </View>
              <View style={styles.wrap}>
                <Text style={styles.text}>Địa chỉ email</Text>
                <Text style={[styles.text, styles.right]}>
                  {myProfile.email}
                </Text>
              </View>
              <View style={styles.wrap}>
                <Text style={styles.text}>Số điện thoại</Text>
                <Text style={[styles.text, styles.right]}>
                  {myProfile.phone === null ? 'Chưa cập nhật' : myProfile.phone}
                </Text>
              </View>
              <View style={styles.wrap}>
                <Text style={styles.text}>Địa chỉ</Text>
                <Text style={[styles.text, styles.right]}>
                  {myProfile.address === null || myProfile.address === ''
                    ? 'Chưa cập nhật'
                    : myProfile.address}
                </Text>
              </View>
              <View style={styles.wrap}>
                <Text style={styles.text}>Số CMND</Text>
                <Text style={[styles.text, styles.right]}>
                  {myProfile.identity_card === null ||
                  myProfile.identity_card === ''
                    ? 'Chưa cập nhật'
                    : myProfile.identity_card}
                </Text>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
        <Footer />
      </Fragment>
    );
  }
}

export const styles = StyleSheet.create({
  pen: {
    color: '#a60b23',
  },
  wrappen: {
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    left: '55%',
    top: '60%',
    padding: 7,
  },
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    borderColor: '#F5F5F5',
    borderBottomWidth: 2,
  },
  text: {
    flex: 1,
    color: '#030303',
  },
  right: {
    fontWeight: 'bold',
  },
  edit: {
    color: '#007aff',
    fontWeight: 'bold',
    marginRight: 15,
  },
});

function mapStateToProps(state) {
  return {myProfile: state.auth.myprofile};
}

export default connect(mapStateToProps, actions)(Profile);
