/* eslint-disable comma-dangle */
import React, {Component, Fragment} from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {getDonationPart, getCountry, update} from '../api/donate';
import {getCity} from '../api/donate';
import {getProvince} from '../api/donate';
import {getHeader} from '../config/header';
import {global} from '../assets/styles/global';
import {auth} from '../assets/styles/auth';
import MultiSelect from 'react-native-multiple-select';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
import {getProfile} from '../api/profile';
import moment from 'moment';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Button} from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';

class InfoDonate extends Component {
  constructor(props) {
    super(props);
    this.props.navigation.setParams({handleSave: this._saveDonate.bind(this)});
    this.props.navigation.setParams({handleBack: this._back.bind(this)});
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
      district_id: '',
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
      value_donation_types_id: '',
      value_is_scret: '',
      value_gender: '',
      value_blood_group: '',
      value_virus: '',
      value_province: '',
      profile: {},
      province_id: '',
      country: [],
      national_id: '',
      value_national_id: '',
      padding: false,
      spinner: false,
      loading: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Thông tin đăng ký hiến tạng',
      headerTitleStyle: {color: '#000000', fontSize: 15, paddingLeft: 15},
      headerStyle: {backgroundColor: 'white'},
      headerRight: (
        <View style={{paddingRight: 10}}>
          <Button
            title="Lưu"
            titleStyle={{color: '#317fc3'}}
            buttonStyle={{backgroundColor: 'white', padding: 0}}
            onPress={() => params.handleSave()}
          />
        </View>
      ),
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
            title="Menu"
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

  _back() {
    this.props.navigation.push('Menu');
  }

  async _saveDonate() {
    const datas = {
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
      donationparts: this.state.donation_part_ids,
      blood_group: this.state.blood_group,
      hepatitis_virus: this.state.hepatitis_virus,
      district_id: this.state.district_id,
      province_id: this.state.province_id,
      national_id: this.state.national_id,
    };
    const birthday = moment(datas.birthday);
    const now = moment();
    const age = now.diff(birthday, 'years');
    if (datas.name === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập họ tên');
    } else if (datas.birthday === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập ngày sinh');
    } else if (datas.address === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ');
    } else if (datas.identification === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập CMTND/Hộ chiếu');
    } else if (datas.date_range === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập ngày cấp');
    } else if (datas.issued_by === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập nơi cấp');
    } else if (datas.email === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập email');
    } else if (datas.phone === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại');
    } else if (datas.full_address === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ đầy đủ');
    } else if (datas.is_secret === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập tuỳ chon bảo mật thông tin');
    } else if (datas.gender === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập giới tính');
    } else if (datas.donationparts.length === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn bộ phận hiến tặng');
    } else if (datas.donation_types_id === null) {
      Alert.alert('Thông báo', 'Vui lòng chọn hình thức hiến tặng');
    } else if (datas.national_id === '') {
      Alert.alert('Thông báo', 'Vui lòng chọn quốc gia');
    } else if (age < 18) {
      Alert.alert('Thông báo', 'Bạn chưa đủ 18 tuổi');
    } else if (datas.phone.length < 10) {
      Alert.alert('Thông báo', 'Số điện thoại bao gồm ít nhất 10 số');
    } else {
      this.setState({spinner: true});
      const id = this.state.profile.data.listregisters.data[0].id;
      const header = await getHeader();
      const result = await update(header, datas, id);
      this.setState({spinner: false});
      if (result.status === 200) {
        setTimeout(() => {
          Alert.alert('Thông báo', 'Lưu thành công');
        }, 1000);
        this.props.navigation.push('Menu');
      } else {
        setTimeout(() => {
          Alert.alert('Thông báo', result.data.message);
        }, 1000);
      }
    }
  }

  async UNSAFE_componentWillMount() {
    this.setState({loading: true});
    const header = await getHeader();
    const profile = await getProfile(header);
    if (profile) {
      this.setState({loading: false});
    }
    const info = profile.data.listregisters.data[0];
    let donations = info.donationparts.data;
    donations = donations.map(e => e.id);
    this.setState({
      profile: profile,
      name: info.name,
      birthday: info.birthday,
      address: info.address,
      job: info.job,
      company: info.company,
      identification: info.identification,
      date_range: info.date_range,
      issued_by: info.issued_by,
      height: info.height,
      weight: info.weight,
      HLA: info.HLA,
      email: info.email,
      phone: info.phone,
      full_address: info.full_address,
      donation_types_id: info.donation_types_id,
      is_secret: info.is_secret,
      gender: info.gender,
      blood_group: info.blood_group,
      hepatitis_virus: info.hepatitis_virus,
      donation_part_ids: donations,
      district_id: info.district_id,
      province_id: info.province_id,
      national_id: info.national_id,
      value_donation_types_id: info.district_id,
      value_virus: info.hepatitis_virus,
      value_national_id: info.national_id,
      value_is_scret: info.is_secret,
      value_gender: info.gender,
      value_blood_group: info.blood_group,
      value_province: info.province_id,
    });
  }

  async componentDidMount() {
    const request = {sort: 'order'};
    const header = await getHeader();
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
  }

  onSelectedItemsChange = item => {
    this.setState({donation_part_ids: item});
  };

  _onPressChooseType(value) {
    this.setState({donation_types_id: value, value_donation_types_id: value});
  }

  _onPressChooseSecret(value) {
    this.setState({is_secret: value, value_is_scret: value});
  }

  _onPressChooseGender(value) {
    this.setState({gender: value, value_gender: value});
  }

  _onPressChooseBlood(value) {
    this.setState({blood_group: value, value_blood_group: value});
  }

  _onPressChooseVirus(value) {
    this.setState({hepatitis_virus: value, value_virus: value});
  }

  async _onPressChooseCity(value) {
    this.setState({province: [], value_province: value});
    const provinces = await getProvince(value);
    let provinces_custom = provinces.data;
    provinces_custom = provinces_custom.map(e => {
      e.value = e.id;
      e.label = e.name;
      return e;
    });
    this.setState({
      province: provinces_custom,
      value_province: value,
      province_id: value,
    });
  }

  _onPressChooseProvince(value) {
    this.setState({district_id: value});
  }

  _onPressChooseCountry(value) {
    this.setState({national_id: value});
  }

  render() {
    const {donation_part_ids} = this.state;
    return (
      <Fragment>
        <SafeAreaView style={global.container}>
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
              <ScrollView style={auth.scrollview}>
                <Spinner visible={this.state.spinner} />
                <View style={{padding: 20}}>
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
                          label:
                            'Hiến mô, tạng sau khi chết não/chết ngưng tim',
                          value: 1,
                        },
                        {label: 'Hiến mô, tạng khi còn sống', value: 2},
                      ]}
                      value={this.state.donation_types_id}
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
                        defaultValue={this.state.name}
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
                        onValueChange={value =>
                          this._onPressChooseSecret(value)
                        }
                        value={this.state.value_is_scret}
                        items={[
                          {
                            label: 'Có',
                            value: 2,
                          },
                          {label: 'Không', value: 1},
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
                        onValueChange={value =>
                          this._onPressChooseGender(value)
                        }
                        value={this.state.value_gender}
                        items={[
                          {
                            label: 'Nam',
                            value: 1,
                          },
                          {label: 'Nữ', value: 2},
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
                        onValueChange={value =>
                          this._onPressChooseCountry(value)
                        }
                        items={this.state.country}
                        value={this.state.national_id}
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
                        value={this.state.value_province}
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
                        value={this.state.district_id}
                      />
                    </View>
                  </View>
                  <View style={styles.wrap_row}>
                    <View style={styles.wrap_inputs}>
                      <Text style={styles.label}>Địa chỉ thường trú *</Text>
                      <TextInput
                        autoCapitalize="none"
                        defaultValue={this.state.address}
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
                        defaultValue={this.state.job}
                        style={styles.input}
                        onChangeText={text => this.setState({job: text})}
                      />
                    </View>
                  </View>
                  <View style={styles.wrap_row}>
                    <View style={styles.wrap_inputs}>
                      <Text style={styles.label}>Nơi công tác</Text>
                      <TextInput
                        autoCapitalize="none"
                        defaultValue={this.state.company}
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
                        defaultValue={this.state.identification}
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
                        defaultValue={this.state.issued_by}
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
                        defaultValue={this.state.height}
                        style={styles.input}
                        onChangeText={text => this.setState({height: text})}
                      />
                    </View>
                    <View style={styles.wrap_input}>
                      <Text style={styles.label}>Cân nặng </Text>
                      <TextInput
                        autoCapitalize="none"
                        keyboardType="numeric"
                        defaultValue={this.state.weight}
                        style={styles.input}
                        onChangeText={text => this.setState({weight: text})}
                      />
                    </View>
                  </View>
                  <View style={styles.wrap_row}>
                    <View style={styles.wrap_input}>
                      <Text style={styles.label}>Nhóm máu</Text>
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
                        value={this.state.value_blood_group}
                      />
                    </View>
                    <View style={styles.wrap_input}>
                      <Text style={styles.label}>HLA</Text>
                      <TextInput
                        autoCapitalize="none"
                        defaultValue={this.state.HLA}
                        style={styles.input}
                        onChangeText={text => this.setState({HLA: text})}
                      />
                    </View>
                  </View>
                  <View style={styles.wrap_row}>
                    <View style={styles.wrap_input}>
                      <Text style={styles.label}>Virus viêm gan</Text>
                      <RNPickerSelect
                        value={this.state.value_virus}
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
                          {label: 'Không', value: 1},
                          {label: 'A', value: 2},
                          {label: 'B', value: 3},
                          {label: 'C', value: 4},
                          {label: 'D', value: 5},
                          {label: 'E', value: 6},
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
                        defaultValue={this.state.phone}
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
                        defaultValue={this.state.email}
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
                        defaultValue={this.state.full_address}
                        style={styles.input}
                        onChangeText={text =>
                          this.setState({full_address: text})
                        }
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          )}
        </SafeAreaView>
      </Fragment>
    );
  }
}

export const styles = StyleSheet.create({
  off: {
    display: 'none',
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

// eslint-disable-next-line no-undef
export default connect()(InfoDonate);
