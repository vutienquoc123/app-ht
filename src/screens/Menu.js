import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {global} from '../assets/styles/global';
import {auth} from '../assets/styles/auth';
import AsyncStorage from '@react-native-community/async-storage';
import Footer from '../components/Footer';
import ElementDrawer from '../components/ElementDrawer';
import {drawer} from '../assets/styles/drawer';
import {faIdCard, faCreditCard} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet} from 'react-native';
import * as actions from '../redux/actions/auth';
import {getHeader} from '../config/header';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      avatar: '',
      profile: [],
      fetch: '',
    };
  }
  static navigationOptions = {
    headerShown: false,
  };

  _onPressSignOut() {
    Alert.alert(
      null,
      'Bạn có chắc muốn đăng xuất',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('token_temp');
              this.props.navigation.push('Home');
            } catch (error) {
              console.log('AsyncStorage error: ' + error.message);
            }
          },
        },
      ],
      {cancelable: false},
    );
  }
  _onPressDonate() {
    // const {myProfile} = this.props;
    // if (myProfile.listregisters.data.length !== 0) {
    //   this.props.navigation.push('InfoDonate');
    // } else {
    //   this.props.navigation.push('RegisterDonate');
    // }
    this.props.navigation.push('RegisterDonate');
  }
  _onPressCalendar() {
    this.props.navigation.push('Calendar');
  }
  _onPressActiveCourse() {
    this.props.navigation.push('ActiveClass');
  }
  _onPressMyProfile() {
    this.props.navigation.push('Profile');
  }
  _onPressChangePassword() {
    this.props.navigation.push('ChangePass');
  }
  _onPressAbout() {
    this.props.navigation.push('About');
  }
  _onPressContact() {
    this.props.navigation.push('Contact');
  }
  _onPressProfile() {
    this.props.navigation.push('Profile');
  }

  _onPressMyCard() {
    this.props.navigation.push('MyCard');
  }

  _onPressPreMyCard() {
    this.props.navigation.push('MyPreCard');
  }

  _onPressCreateCard() {
    this.props.navigation.push('CreateCard');
  }

  async UNSAFE_componentWillMount() {
    const header = await getHeader();
    this.props.profile(header);
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={global.container}>
          {this.state.loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <ScrollView>
              <ImageBackground
                source={require('../assets/images/bg.png')}
                style={drawer.background}
              />
              <View>
                <TouchableOpacity onPress={() => this._onPressDonate()}>
                  <View style={styles.viewElement}>
                    <Image
                      style={{width: 17, height: 19}}
                      source={require('../assets/images/list.png')}
                    />
                    <Text style={styles.text}>Thông tin đăng ký hiến tạng</Text>
                    <FontAwesomeIcon
                      style={styles.iconRight}
                      icon={faAngleRight}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <ElementDrawer
                icon={faPlusCircle}
                title="Tạo thẻ"
                event={() => this._onPressCreateCard()}
              />
              <View style={drawer.separator} />
              <View>
                <TouchableOpacity onPress={() => this._onPressProfile()}>
                  <View style={styles.viewElement}>
                    <Image
                      style={{width: 17, height: 19}}
                      source={require('../assets/images/user-icon.png')}
                    />
                    <Text style={styles.text}>Thông tin cá nhân</Text>
                    <FontAwesomeIcon
                      style={styles.iconRight}
                      icon={faAngleRight}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <ElementDrawer
                icon={faCreditCard}
                title="Thẻ đã tạo"
                event={() => this._onPressPreMyCard()}
              />
              <ElementDrawer
                icon={faIdCard}
                title="Thẻ của tôi"
                event={() => this._onPressMyCard()}
              />
              <View>
                <TouchableOpacity onPress={() => this._onPressChangePassword()}>
                  <View style={styles.viewElement}>
                    <Image
                      style={{width: 17, height: 24}}
                      source={require('../assets/images/locked.png')}
                    />
                    <Text style={styles.text}>Đổi mật khẩu</Text>
                    <FontAwesomeIcon
                      style={styles.iconRight}
                      icon={faAngleRight}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={drawer.separator} />
              <View>
                <TouchableOpacity onPress={() => this._onPressContact()}>
                  <View style={styles.viewElement}>
                    <Image
                      style={{width: 17, height: 16}}
                      source={require('../assets/images/contact.png')}
                    />
                    <Text style={styles.text}>Liên hệ</Text>
                    <FontAwesomeIcon
                      style={styles.iconRight}
                      icon={faAngleRight}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => this._onPressSignOut()}>
                  <View style={styles.viewElement}>
                    <Image
                      style={{width: 15, height: 15}}
                      source={require('../assets/images/logout.png')}
                    />
                    <Text style={styles.text}>Đăng xuất</Text>
                    <FontAwesomeIcon
                      style={styles.iconRight}
                      icon={faAngleRight}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {/* <ElementDrawer
                icon={faUser}
                title="Thông tin cá nhân"
                event={() => this._onPressMyProfile()}
              />
              <ElementDrawer
                icon={faCreditCard}
                title="Thẻ đã tạo"
                event={() => this._onPressPreMyCard()}
              />
              <ElementDrawer
                icon={faIdCard}
                title="Thẻ của tôi"
                event={() => this._onPressMyCard()}
              />
              <ElementDrawer
                icon={faLock}
                title="Đổi mật khẩu"
                event={() => this._onPressChangePassword()}
              />
              <View style={drawer.separator} />
              <ElementDrawer
                icon={faPhoneAlt}
                title="Liên hệ"
                event={() => this._onPressContact()}
              />
              <View style={drawer.separator} />
              <ElementDrawer
                event={() => this._onPressSignOut()}
                icon={faSignOutAlt}
                title="ĐĂNG XUẤT"
              /> */}
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
  out: {
    fontSize: 14,
    color: 'white',
    marginRight: 10,
  },
  iconRight: {
    position: 'absolute',
    right: 10,
  },
  viewElement: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    position: 'relative',
    height: 67,
    borderBottomWidth: 1,
    borderBottomColor: '#efeff4',
  },
  text: {
    paddingLeft: 20,
    fontSize: 14,
  },
  separator: {
    height: 2,
    backgroundColor: '#efeff4',
  },
  size: {
    fontSize: 14,
  },
});

function mapStateToProps(state) {
  return {myProfile: state.auth.myprofile};
}

export default connect(mapStateToProps, actions)(Menu);
