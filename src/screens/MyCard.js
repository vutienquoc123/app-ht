/* eslint-disable comma-dangle */
import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import {global} from '../assets/styles/global';
import {notify} from '../assets/styles/notify';
import {getHeader} from '../config/header';
import Footer from '../components/Footer';
import {getCard, getCustomTitle} from '../api/profile';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Button} from 'react-native-elements';
import {BackHandler} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {login} from '../assets/styles/login';
import {updateTypeCard} from '../api/card';

class MyCard extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.props.navigation.setParams({handleBack: this._back.bind(this)});
    this.state = {
      data: [],
      loading: true,
      checked: false,
      card_type: '',
      address: '',
      id: '',
      title: '',
      fetching_from_server: false,
    };
    this.page = 1;
  }

  async componentDidMount() {
    const header = await getHeader();
    const data = await getCard(header);
    const text = await getCustomTitle();
    if (text) {
      this.setState({title: text.data.value});
    }
    if (data.data.listregisters.data.length !== 0) {
      if (
        data.data.listregisters.data[0].card_id !== '' &&
        data.data.listregisters.data[0].card_id !== undefined &&
        data.data.listregisters.data[0].images.data.length !== 0
      ) {
        const imgs = data.data.listregisters.data[0].images.data;
        const card_type = data.data.listregisters.data[0].card_type;
        const id = data.data.listregisters.data[0].id;
        this.setState({
          data: imgs,
          loading: false,
          card_type: card_type,
          id: id,
        });
      }
      this.setState({loading: false});
    } else {
      Alert.alert(
        'Thông báo',
        'Bạn chưa có thông tin hiến tặng. Khởi tạo ngay!',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.push('RegisterDonate'),
          },
          {
            text: 'Huỷ',
          },
        ],
        {cancelable: false},
      );
    }
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Thẻ của tôi',
      headerTitleStyle: {color: '#000000', fontSize: 15, paddingLeft: 15},
      headerStyle: {backgroundColor: 'white'},
      headerLeft: (
        <TouchableOpacity
          onPress={() => params.handleBack()}
          style={{
            paddingRight: 10,
            paddingLeft: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FontAwesomeIcon
            style={{marginTop: 3, marginRight: 10}}
            size={20}
            color={'#317fc3'}
            icon={faChevronLeft}
          />
          <Button
            title="Menu"
            titleStyle={{color: '#317fc3'}}
            buttonStyle={{backgroundColor: 'white', padding: 0}}
            onPress={() => params.handleBack()}
          />
        </TouchableOpacity>
      ),
    };
  };

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this._back();
    return true;
  }

  _back() {
    this.props.navigation.push('Menu');
  }

  _onRequest() {
    // this.scrollView.scrollToEnd();
    this.setState({checked: !this.state.checked});
  }

  async submit() {
    const header = await getHeader();
    const body = {
      address_receive_card: this.state.address,
    };
    if (this.state.address === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ');
    } else {
      const data = await updateTypeCard(this.state.id, body, header);
      if (data) {
        Alert.alert('Thông báo', 'Đề xuất thành công');
        this.props.navigation.goBack();
      }
    }
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={[global.container, notify.background]}>
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
              keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
              <ScrollView
                // ref={scrollView => (this.scrollView = scrollView)}
                style={{padding: 20}}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                  <Text>Thẻ đã được kiểm duyệt bởi </Text>
                  <Text style={{fontWeight: '500', textTransform: 'uppercase'}}>
                    {this.state.title}
                  </Text>
                </View>
                {this.state.data.length !== 0 ? (
                  <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.data}
                    renderItem={({item, index}) => (
                      <Image
                        resizeMode="contain"
                        style={styles.img}
                        source={{uri: item.url}}
                      />
                    )}
                  />
                ) : (
                  <Text style={{alignSelf: 'center'}}>Bạn chưa có thẻ nào</Text>
                )}
                <View style={this.state.checked ? null : styles.noneInput}>
                  <Text style={[login.label, styles.textInput]}>
                    Địa chỉ nhận thẻ
                  </Text>
                  <TextInput
                    autoCapitalize="none"
                    style={[login.input, styles.input]}
                    onChangeText={text => this.setState({address: text})}
                  />
                  <Button
                    onPress={() => this.submit()}
                    buttonStyle={{
                      width: 150,
                      alignSelf: 'center',
                    }}
                    title="Xác nhận"
                  />
                </View>
                {this.state.data.length !== 0 && this.state.card_type !== 1 ? (
                  <CheckBox
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    title="Đề xuất in thẻ cứng"
                    onPress={() => this._onRequest()}
                    // eslint-disable-next-line react-native/no-inline-styles
                    containerStyle={{
                      marginBottom: 30,
                      marginTop: 15,
                      marginLeft: 0,
                      width: '100%',
                    }}
                    checked={this.state.checked}
                  />
                ) : null}
              </ScrollView>
            </KeyboardAvoidingView>
          )}
        </SafeAreaView>
        <Footer />
      </Fragment>
    );
  }
}

export const styles = StyleSheet.create({
  img: {
    borderColor: 'grey',
    borderWidth: 1,
    width: '100%',
    height: 230,
    marginBottom: 15,
  },
  noneInput: {
    display: 'none',
  },
});

export default connect()(MyCard);
