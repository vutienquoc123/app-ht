/* eslint-disable comma-dangle */
import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  View,
  Text,
  ImageBackground,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {home} from '../assets/styles/home';
import {global} from '../assets/styles/global';
import Step from '../components/Step';
import Footer from '../components/Footer';
import {getHeader} from '../config/header';
import {getCard} from '../api/profile';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: '',
      loading: false,
      data: [],
      registers: [],
      profile: [],
    };
  }
  static navigationOptions = {
    headerShown: false,
  };
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const header = await getHeader();
      //const profile = await getProfile(header);
      //this.setState({profile: profile.data.listregisters.data});
      const data = await getCard(header);
      if (data) {
        if (
          data.data.listregisters.data[0].card_id !== '' &&
          data.data.listregisters.data[0].card_id !== undefined &&
          data.data.listregisters.data[0].images.data.length !== 0
        ) {
          const imgs = data.data.listregisters.data[0].images.data;
          this.setState({data: imgs, loading: false});
        } else {
          this.setState({
            registers: data.data.listregisters.data,
            loading: false,
          });
        }
      }
    }
  }

  async onPressRegister() {
    // const token = await AsyncStorage.getItem('token');
    // const {myProfile} = this.props;
    // if (token) {
    //   if (myProfile.listregisters.data.length !== 0) {
    //     this.props.navigation.push('InfoDonate');
    //   } else {
    //     this.props.navigation.push('RegisterDonate');
    //   }
    // } else {
    //   this.props.navigation.push('RegisterDonate');
    // }
    this.props.navigation.push('RegisterDonate');
  }

  async resgister() {
    // await AsyncStorage.removeItem('access_token');
    // await AsyncStorage.removeItem('cart');
    // await AsyncStorage.removeItem('user_id');
    // this.props.navigation.push('SignUp');
  }

  async onPressStep2() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.props.navigation.push('CreateCard');
    } else {
      this.props.navigation.push('Login');
    }
  }

  async onPressStep3() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.props.navigation.push('CreateCard');
    } else {
      this.props.navigation.push('Login');
    }
  }

  renderCard(i, index) {
    return (
      <View key={index}>
        <Image
          resizeMode="contain"
          style={{width: '100%', height: 230, marginBottom: 25}}
          source={{uri: i.url}}
        />
      </View>
    );
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={global.container}>
          {this.state.loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View style={{flex: 1}}>
              <ScrollView>
                <ImageBackground
                  style={home.banner}
                  source={require('../assets/images/bghome.png')}
                />
                <View style={home.viewFollow}>
                  <Step
                    img={require('../assets/images/step1.png')}
                    step="Bước 1"
                    stepContent="Đăng ký hiến tạng"
                    event={() => this.onPressRegister()}
                  />
                  <Step
                    img={require('../assets/images/step2.png')}
                    step="Bước 2"
                    stepContent="Thiết kế thẻ in"
                    event={() => this.onPressStep2()}
                  />
                  <Step
                    img={require('../assets/images/step3.png')}
                    step="Bước 3"
                    stepContent="Gửi thông tin cho chúng tôi"
                    event={() => this.onPressStep3()}
                  />
                </View>
                <View style={home.viewFollow}>
                  <Text style={home.textCourseHighLight}>{'THẺ CỦA TÔI'}</Text>
                  {this.state.data.length !== 0 ? (
                    this.state.data.map((i, index) => {
                      return this.renderCard(i, index);
                    })
                  ) : (
                    <Text style={{alignSelf: 'center'}}>
                      Bạn chưa có thẻ nào
                    </Text>
                  )}
                </View>
              </ScrollView>
            </View>
          )}
        </SafeAreaView>
        <Footer />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {myProfile: state.auth.myprofile};
}

export default connect(mapStateToProps)(Home);
