// eslint-disable-next-line prettier/prettier
/* eslint-disable comma-dangle */
import React, {Component, Fragment} from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {getDonationPart, getCountry} from '../api/donate';
import {getCity} from '../api/donate';
import {getProvince} from '../api/donate';
import {Send, SendByGuest} from '../api/donate';
import {getHeader} from '../config/header';
import _ from 'lodash';
import {global} from '../assets/styles/global';
import {auth} from '../assets/styles/auth';
import MultiSelect from 'react-native-multiple-select';
import DatePicker from 'react-native-datepicker';
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Button} from 'react-native-elements';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {getProfile} from '../api/profile';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import {BackHandler} from 'react-native';

class RegisterDonate extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      donate_part: [],
      selectedItems: [],
      birthday: '',
      name: '',
      HLA: '',
      address: '',
      blood_group: '',
      company: '',
      date_range: '',
      district_id: 1,
      province_id: 1,
      national_id: '',
      donation_part_ids: [],
      donation_types_id: '',
      email: '',
      full_address: '',
      gender: '',
      height: '',
      hepatitis_virus: 1,
      identification: '',
      is_secret: '',
      issued_by: '',
      job: '',
      phone: '',
      registered_at: '',
      weight: '',
      city: [],
      province: [],
      random_number: '',
      confirm: '',
      country: [],
      padding: false,
      request: '2',
      profile: [],
      loading: false,
      spinner: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Đăng ký hiến tạng, mô tạng',
      headerTitleStyle: {color: '#000000', fontSize: 15},
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
            style={{marginTop: 3, marginRight: 5}}
            size={20}
            color={'#317fc3'}
            icon={faChevronLeft}
          />
          <Button
            title="Back"
            titleStyle={{color: '#317fc3'}}
            buttonStyle={{backgroundColor: 'white', padding: 0}}
            onPress={() => params.handleBack()}
          />
        </TouchableOpacity>
      ),
    };
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
  };

  doAgian() {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn nhập lại thông tin?',
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

  async _saveDonate() {
    const data = {
      name: this.state.name,
      birthday: this.state.birthday,
      address: this.state.address,
      job: this.state.job,
      company: this.state.company,
      identification: this.state.identification,
      date_range: this.state.date_range,
      issued_by: this.state.issued_by,
      height: this.state.height,
      weight: this.state.weight,
      HLA: this.state.HLA,
      email: this.state.email,
      phone: this.state.phone,
      full_address: this.state.full_address,
      donation_types_id: +this.state.donation_types_id,
      is_secret: this.state.is_secret,
      gender: this.state.gender,
      blood_group: this.state.blood_group,
      hepatitis_virus: this.state.hepatitis_virus,
      donation_part_ids: this.state.donation_part_ids,
      district_id: this.state.district_id,
      province_id: this.state.province_id,
      national_id: this.state.national_id,
      registered_at: moment(),
    };
    const birthday = moment(data.birthday);
    const now = moment();
    const age = now.diff(birthday, 'years');
    if (data.name === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập họ tên');
    } else if (data.birthday === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập ngày sinh');
    } else if (data.address === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ');
    } else if (data.identification === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập CMTND/Hộ chiếu');
    } else if (data.date_range === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập ngày cấp');
    } else if (data.issued_by === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập nơi cấp');
    } else if (data.email === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập email');
    } else if (data.phone === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại');
    } else if (data.full_address === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ đầy đủ');
    } else if (data.is_secret === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập tuỳ chon bảo mật thông tin');
    } else if (data.gender === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập giới tính');
    } else if (data.donation_part_ids.length === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn bộ phận hiến tặng');
    } else if (data.donation_types_id.length === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn hình thức hiến tặng');
    } else if (data.national_id === '' || data.national_id === null) {
      Alert.alert('Thông báo', 'Vui lòng chọn quốc gia');
    } else if (this.state.confirm != this.state.random_number) {
      Alert.alert('Thông báo', 'Mã xác nhận chưa đúng');
    } else if (age < 18) {
      Alert.alert('Thông báo', 'Bạn chưa đủ 18 tuổi');
    } else if (data.phone.length < 10) {
      Alert.alert('Thông báo', 'Số điện thoại bao gồm ít nhất 10 số');
    } else if (this.state.request === '') {
      Alert.alert('Thông báo', 'Vui lòng chọn đề xuất in thẻ');
    } else {
      this.setState({spinner: true});
      const header = await getHeader();
      if (header === null) {
        const result = await SendByGuest(
          this.state.request == 2
            ? _.assign({}, data, {is_print_card: true})
            : data,
        );
        if (result.status === 200) {
          await AsyncStorage.setItem('token_temp', result.data.token);
          this.props.navigation.push('Register');
          this.setState({spinner: false});
          setTimeout(() => {
            Alert.alert(
              'Thông báo',
              'Thông tin của bạn đã được gửi đi và đang chờ phê duyệt!',
            );
          }, 1000);
        } else {
          this.setState({spinner: false});
          setTimeout(() => {
            Alert.alert('Thông báo', result.data.message);
          }, 1000);
        }
      } else {
        const result = await Send(
          header,
          this.state.request == 2
            ? _.assign({}, data, {is_print_card: true})
            : data,
        );
        if (result.status === 400) {
          this.setState({spinner: false});
          setTimeout(() => {
            Alert.alert('Thông báo', result.data.message, {
              cancelable: false,
            });
          }, 1000);
        } else if (result.status === 200) {
          this.setState({spinner: false});
          this.props.navigation.push('Menu');
          setTimeout(() => {
            Alert.alert('Thông báo', 'Đăng ký thành công');
          }, 1000);
        }
      }
    }
  }

  async UNSAFE_componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.props.navigation.setParams({handleBack: this._back.bind(this)});
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const header = await getHeader();
      const profile = await getProfile(header);
      this.setState({profile: profile.data.listregisters.data});
      if (this.state.profile.length !== 0) {
        this.props.navigation.push('InfoDonate');
      }
    }
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

  async _back() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.props.navigation.push('Menu');
    } else {
      this.props.navigation.push('Home');
    }
  }

  async componentDidMount() {
    const val = Math.floor(1000 + Math.random() * 9000);
    this.setState({random_number: val});
    const request = {sort: 'order'};
    const data = await getDonationPart(request);
    const city = await getCity();
    const country = await getCountry();
    let city_custom = city.data;
    city_custom = city_custom.map(e => {
      e.value = e.id;
      e.label = e.name;
      return e;
    });
    let country_custom = country.data;
    country_custom = country_custom.map(e => {
      e.value = e.id;
      e.label = e.name;
      return e;
    });
    this.setState({
      donate_part: data.data,
      city: city_custom,
      country: country_custom,
    });
    this.props.navigation.setParams({handleSave: this._saveDonate.bind(this)});
  }

  onSelectedItemsChange = item => {
    this.setState({donation_part_ids: item});
  };

  _onPressChooseType(value) {
    this.setState({donation_types_id: value});
  }

  _onPressChooseSecret(value) {
    this.setState({is_secret: value});
  }

  _onPressChooseGender(value) {
    this.setState({gender: value});
  }

  _onPressChooseBlood(value) {
    this.setState({blood_group: value});
  }

  _onPressChooseVirus(value) {
    this.setState({hepatitis_virus: value});
  }

  _onPressChooseRequest(value) {
    this.setState({request: value});
  }

  async _onPressChooseCity(value) {
    this.setState({province: []});
    const provinces = await getProvince(value);
    let provinces_custom = provinces.data;
    provinces_custom = provinces_custom.map(e => {
      e.value = e.id;
      e.label = e.name;
      return e;
    });
    this.setState({province: provinces_custom, province_id: value});
  }

  _onPressChooseProvince(value) {
    this.setState({district_id: value});
  }

  _onPressChooseCountry(value) {
    this.setState({national_id: value});
  }

  random() {
    const val = Math.floor(1000 + Math.random() * 9000);
    this.setState({random_number: val});
  }

  render() {
    const {donation_part_ids} = this.state;
    return (
      <Fragment>
        <SafeAreaView style={global.container}>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            behavior="padding"
            enabled
            keyboardVerticalOffset={100}>
            <ScrollView style={auth.scrollview}>
              <View style={{padding: 20}}>
                <Spinner visible={this.state.spinner} />
                <View style={{width: '100%', marginBottom: 20}}>
                  <Text style={styles.label}>Hình thức hiến tặng *</Text>
                  <RNPickerSelect
                    style={{
                      placeholder: {
                        paddingLeft: 10,
                        paddingTop: 10,
                      },
                      ...pickerSelectStyles,
                    }}
                    placeholder={{label: 'Tuỳ chọn', value: null}}
                    onValueChange={value => this._onPressChooseType(value)}
                    items={[
                      {
                        label: 'Hiến mô, tạng sau khi chết não/chết ngưng tim',
                        value: '1',
                      },
                      {label: 'Hiến mô, tạng khi còn sống', value: '2'},
                    ]}
                  />
                </View>
                <View>
                  <Text style={styles.label}>Bộ phận hiến tặng *</Text>
                  <View>
                    <MultiSelect
                      hideTags
                      items={this.state.donate_part}
                      uniqueKey="id"
                      ref={component => {
                        this.multiSelect = component;
                      }}
                      onSelectedItemsChange={this.onSelectedItemsChange}
                      selectedItems={donation_part_ids}
                      selectText=""
                      searchInputPlaceholderText="Tuỳ chọn..."
                      tagRemoveIconColor="#CCC"
                      tagBorderColor="#CCC"
                      tagTextColor="#CCC"
                      selectedItemTextColor="#317fc3"
                      selectedItemIconColor="#317fc3"
                      itemTextColor="#000"
                      displayKey="name"
                      searchInputStyle={{color: '#CCC'}}
                      submitButtonColor="#317fc3"
                      submitButtonText="Xong"
                    />
                  </View>
                </View>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontSize: 18,
                    color: '#317fc3',
                    fontWeight: 'bold',
                    marginBottom: 18,
                  }}>
                  Thông tin cá nhân
                </Text>
                <View style={styles.wrap_row}>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Họ tên *</Text>
                    <TextInput
                      autoCapitalize="words"
                      style={styles.input}
                      onChangeText={text => this.setState({name: text})}
                    />
                  </View>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Ngày sinh *</Text>
                    <DatePicker
                      date={this.state.birthday}
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
                </View>
                <View style={styles.wrap_row}>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Giữ bí mật *</Text>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          paddingLeft: 10,
                          paddingTop: 10,
                        },
                        ...pickerSelectStyles,
                      }}
                      placeholder={{label: 'Tuỳ chọn', value: null}}
                      onValueChange={value => this._onPressChooseSecret(value)}
                      items={[
                        {
                          label: 'Có',
                          value: '2',
                        },
                        {label: 'Không', value: '1'},
                      ]}
                    />
                  </View>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Giới tính *</Text>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          paddingLeft: 10,
                          paddingTop: 10,
                        },
                        ...pickerSelectStyles,
                      }}
                      placeholder={{label: 'Tuỳ chọn', value: null}}
                      onValueChange={value => this._onPressChooseGender(value)}
                      items={[
                        {
                          label: 'Nam',
                          value: '1',
                        },
                        {label: 'Nữ', value: '2'},
                      ]}
                    />
                  </View>
                </View>
                <View style={styles.wrap_row}>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Quốc gia *</Text>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          paddingLeft: 10,
                          paddingTop: 10,
                        },
                        ...pickerSelectStyles,
                      }}
                      placeholder={{label: 'Tuỳ chọn', value: null}}
                      onValueChange={value => this._onPressChooseCountry(value)}
                      items={this.state.country}
                    />
                  </View>
                </View>
                <View
                  style={[
                    styles.wrap_row,
                    this.state.national_id == 248 ? null : styles.off,
                  ]}>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Tỉnh/TP *</Text>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          paddingLeft: 10,
                          paddingTop: 10,
                        },
                        ...pickerSelectStyles,
                      }}
                      placeholder={{label: 'Tuỳ chọn', value: null}}
                      onValueChange={value => this._onPressChooseCity(value)}
                      items={this.state.city}
                    />
                  </View>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Quận/huyện *</Text>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          paddingLeft: 10,
                          paddingTop: 10,
                        },
                        ...pickerSelectStyles,
                      }}
                      placeholder={{label: 'Tuỳ chọn', value: null}}
                      onValueChange={value =>
                        this._onPressChooseProvince(value)
                      }
                      items={this.state.province}
                    />
                  </View>
                </View>
                <View style={styles.wrap_row}>
                  <View style={styles.wrap_inputs}>
                    <Text style={styles.label}>Địa chỉ thường trú *</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      onChangeText={text => this.setState({address: text})}
                    />
                  </View>
                </View>
                <View style={styles.wrap_row}>
                  <View style={styles.wrap_inputs}>
                    <Text style={styles.label}>Nghề nghiệp</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      onChangeText={text => this.setState({job: text})}
                    />
                  </View>
                </View>
                <View style={styles.wrap_row}>
                  <View style={styles.wrap_inputs}>
                    <Text style={styles.label}>Nơi công tác </Text>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      onChangeText={text => this.setState({company: text})}
                    />
                  </View>
                </View>
                <View style={styles.wrap_row}>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Số CMTND/Hộ chiếu *</Text>
                    <TextInput
                      autoCapitalize="none"
                      keyboardType="numeric"
                      style={styles.input}
                      onChangeText={text =>
                        this.setState({identification: text})
                      }
                    />
                  </View>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Nơi cấp *</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      onChangeText={text => this.setState({issued_by: text})}
                    />
                  </View>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Ngày cấp *</Text>
                    <DatePicker
                      date={this.state.date_range}
                      mode="date"
                      placeholder="chọn ngày"
                      format="YYYY-MM-DD"
                      confirmBtnText="Xác nhận"
                      cancelBtnText="Huỷ"
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
                        this.setState({date_range: date});
                      }}
                    />
                  </View>
                </View>
                <View style={styles.wrap_row}>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Chiều cao </Text>
                    <TextInput
                      autoCapitalize="none"
                      keyboardType="numeric"
                      style={styles.input}
                      onChangeText={text => this.setState({height: text})}
                    />
                  </View>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Cân nặng </Text>
                    <TextInput
                      autoCapitalize="none"
                      keyboardType="numeric"
                      style={styles.input}
                      onChangeText={text => this.setState({weight: text})}
                    />
                  </View>
                </View>
                <View style={styles.wrap_row}>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Nhóm máu </Text>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          paddingLeft: 10,
                          paddingTop: 10,
                        },
                        ...pickerSelectStyles,
                      }}
                      placeholder={{label: 'Tuỳ chọn', value: null}}
                      onValueChange={value => this._onPressChooseBlood(value)}
                      items={[
                        {label: 'A', value: 'A'},
                        {label: 'B', value: 'B'},
                        {label: 'AB', value: 'AB'},
                        {label: 'O', value: 'O'},
                      ]}
                    />
                  </View>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>HLA</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      onChangeText={text => this.setState({HLA: text})}
                    />
                  </View>
                </View>
                <View style={styles.wrap_row}>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Virus viêm gan </Text>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          paddingLeft: 10,
                          paddingTop: 10,
                        },
                        ...pickerSelectStyles,
                      }}
                      placeholder={{label: 'Tuỳ chọn', value: null}}
                      onValueChange={value => this._onPressChooseVirus(value)}
                      items={[
                        {label: 'Không', value: '1'},
                        {label: 'A', value: '2'},
                        {label: 'B', value: '3'},
                        {label: 'C', value: '4'},
                        {label: 'D', value: '5'},
                        {label: 'E', value: '6'},
                      ]}
                    />
                  </View>
                </View>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontSize: 18,
                    color: '#317fc3',
                    fontWeight: 'bold',
                    marginBottom: 18,
                  }}>
                  Thông tin liên hệ
                </Text>
                <View style={styles.wrap_row}>
                  <View style={styles.wrap_inputs}>
                    <Text style={styles.label}>Số điện thoại liên hệ *</Text>
                    <TextInput
                      maxLength={10}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      style={styles.input}
                      onChangeText={text => this.setState({phone: text})}
                    />
                  </View>
                </View>
                <View style={styles.wrap_row}>
                  <View style={styles.wrap_inputs}>
                    <Text style={styles.label}>Email liên hệ *</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      onChangeText={text => this.setState({email: text})}
                    />
                  </View>
                </View>
                <View style={styles.wrap_row}>
                  <View style={styles.wrap_inputs}>
                    <Text style={styles.label}>Địa chỉ đầy đủ *</Text>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      onChangeText={text => this.setState({full_address: text})}
                    />
                  </View>
                </View>
                <Text style={[styles.label, styles.confirmtxt]}>
                  Nhập mã xác nhận *
                </Text>
                <View style={[styles.wrap_row1]}>
                  <View style={styles.wrap_inputs_1}>
                    <TextInput
                      autoCapitalize="none"
                      style={styles.input}
                      onChangeText={text => this.setState({confirm: text})}
                    />
                  </View>
                  <View style={styles.confirm}>
                    <Text style={styles.random_number}>
                      {this.state.random_number}
                    </Text>
                    <FontAwesomeIcon
                      style={styles.icon}
                      color={'red'}
                      icon={faSyncAlt}
                      onPress={() => this.random()}
                    />
                  </View>
                </View>
                <View style={styles.wrap_row}>
                  <View style={styles.wrap_input}>
                    <Text style={styles.label}>Đề xuất in thẻ</Text>
                    <RNPickerSelect
                      style={{
                        placeholder: {
                          paddingLeft: 10,
                          paddingTop: 10,
                        },
                        ...pickerSelectStyles,
                      }}
                      placeholder={{label: 'Tuỳ chọn', value: null}}
                      onValueChange={value => this._onPressChooseRequest(value)}
                      items={[
                        {label: 'Không', value: '1'},
                        {label: 'Có', value: '2'},
                      ]}
                      value={this.state.request}
                    />
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}>
                  <Button
                    buttonStyle={{
                      width: 120,
                      marginTop: 30,
                    }}
                    onPress={() => this._saveDonate()}
                    title="Đăng kí"
                  />
                  <Button
                    onPress={() => this.doAgian()}
                    type="outline"
                    buttonStyle={{
                      width: 120,
                      marginTop: 30,
                      backgroundColor: 'white',
                    }}
                    title="Nhập lại"
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export const styles = StyleSheet.create({
  icon: {
    marginTop: 5,
    fontSize: 15,
  },
  off: {
    display: 'none',
  },
  confirm: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 25,
    marginTop: 5,
  },
  random_number: {
    marginRight: 10,
    height: 30,
    width: 60,
    backgroundColor: '#e5e5ea',
    textAlign: 'center',
    lineHeight: 30,
  },
  wrap_row1: {
    display: 'flex',
    flexDirection: 'row',
  },
  confirmtxt: {
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 10,
    fontSize: 14,
    color: '#707070',
  },
  wrap_input: {
    marginBottom: 20,
    width: '48%',
  },
  wrap_inputs: {
    marginBottom: 20,
    width: '100%',
  },
  wrap_inputs_1: {
    width: '50%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#e5e5ea',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
  },
  wrap_row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e5e5ea',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e5ea',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

function mapStateToProps(state) {
  return {myProfile: state.auth.myprofile};
}

export default connect(mapStateToProps)(RegisterDonate);
