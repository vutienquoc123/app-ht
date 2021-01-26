import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  FlatList,
  TextInput,
  Modal,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import StepIndicator from 'react-native-step-indicator';
import {ListTemplate, send} from '../api/card';
import {getHeader} from '../config/header';
import {getHeaderCustom} from '../config/header';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {Button, CheckBox} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {api} from '../api/index';
import RNFetchBlob from 'rn-fetch-blob';
import {connect} from 'react-redux';
import {updateInfoDonate} from '../api/card';
import {previewInfoDonate} from '../api/card';
import {PreviewCard} from '../api/card';
import Spinner from 'react-native-loading-spinner-overlay';
import {login} from '../assets/styles/login';

class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: 0,
      images: [],
      step: 0,
      loading: true,
      id: '',
      path: '',
      width: 0,
      height: 0,
      width1: 0,
      height1: 0,
      avatar: {},
      sign: {},
      avt_img: '',
      sign_img: '',
      info_id: '',
      image_review: [],
      modalVisible: false,
      img_preview: [],
      option: '',
      spinner: false,
      checked: false,
      address: '',
    };
  }

  static navigationOptions = {
    headerTitleStyle: {
      fontSize: 18,
    },
    title: 'Tạo thẻ',
  };

  UNSAFE_componentWillMount() {
    const {myProfile} = this.props;
    if (myProfile.listregisters.data.length !== 0) {
      if (
        myProfile.listregisters.data[0].card_id !== null &&
        myProfile.listregisters.data[0].card_id !== ''
      ) {
        Alert.alert(
          'Thông báo',
          'Bạn đã có thẻ tạọ và thông tin trước đó. Vào mục Thẻ của tôi để xem thông tin chi tiết.',
          [
            {
              text: 'Ok',
              onPress: () => this.props.navigation.push('MyCard'),
            },
          ],
        );
      }
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
            onPress: () => this.props.navigation.goBack(),
          },
        ],
        {cancelable: false},
      );
    }
  }

  async setModalVisible(visible, id) {
    this.setState({loading: true});
    const header = await getHeader();
    const body = {
      card_id: this.state.info_id,
      card_template_id: id,
    };
    this.setState({modalVisible: visible});
    const data = await PreviewCard(this.state.info_id, body, header);
    if (data) {
      this.setState({img_preview: data.data});
      setTimeout(() => {
        this.setState({loading: false});
      }, 2000);
    }
  }

  hideModal() {
    this.setState({modalVisible: false});
  }

  async componentDidMount() {
    const header = await getHeader();
    const data = await ListTemplate(header);
    const {myProfile} = this.props;
    const id = myProfile.listregisters.data[0].id;
    this.setState({info_id: id, images: data.data, loading: false});
  }

  active(item, index) {
    this.setState({step: index});
  }

  renderTheme() {
    let {images} = this.state;
    images = images.map((e, index) => (
      <View
        key={index}
        style={
          this.state.step === index
            ? styles.active
            : images.length - 1 === index
            ? styles.last_theme
            : styles.theme
        }>
        <TouchableOpacity onPress={() => this.active(e, index)}>
          <Text
            onPress={() => this.active(e, index)}
            style={{fontWeight: '500'}}>
            Mẫu 0{index + 1}
          </Text>
        </TouchableOpacity>
      </View>
    ));
    return images;
  }

  select(id) {
    this.setState({id: id, currentPosition: 1});
  }

  backStep1() {
    this.setState({currentPosition: 0});
  }

  backStep2() {
    this.setState({currentPosition: 1});
  }

  backStep3() {
    this.setState({currentPosition: 2});
  }

  nextStep3() {
    this.setState({currentPosition: 2});
  }

  async nextStep4() {
    const data = {
      url_avatar: this.state.avt_img,
      url_signature: this.state.sign_img,
      card_template_id: this.state.id,
    };
    if (data.url_avatar === '') {
      Alert.alert('Thông báo', 'Bạn chưa chọn ảnh chân dung');
    } else if (data.url_signature === '') {
      Alert.alert('Thông báo', 'Bạn chưa chọn chữ ký');
    } else {
      const header = await getHeader();
      this.setState({currentPosition: 3});
      const result = await updateInfoDonate(this.state.info_id, data, header);
      if (result) {
        this.setState({loading: true});
        const preview_data = await previewInfoDonate(
          this.state.info_id,
          {},
          header,
        );
        this.setState({image_review: preview_data.data});
        this.setState({loading: false});
      }
    }
  }

  async selectImg() {
    Alert.alert(
      'Thông báo',
      'Tuỳ chọn ảnh',
      [
        {
          text: 'Camera',
          onPress: () => this.openCamera(),
        },
        {
          text: 'Thư viện ảnh',
          onPress: () => this.selectGallery(),
        },
      ],
      {cancelable: false},
    );
  }

  // async selectGallery() {
  //   ImagePicker.openPicker({
  //     width: 150,
  //     height: 200,
  //     cropping: true,
  //     includeBase64: true,
  //     freeStyleCropEnabled: true,
  //     showCropFrame: true,
  //     waitAnimationEnd: true,
  //     compressImageQuality: 1,
  //     enableRotationGesture: true,
  //     mediaType: 'photo',
  //   }).then(image => {
  //     this.setState({
  //       avatar: image,
  //       path: image.path,
  //       height: image.height,
  //       width: image.width,
  //     });
  //     RNFetchBlob.fetch('POST', api + '/uploads/import', getHeaderCustom(), [
  //       {
  //         name: 'file',
  //         filename: image.filename ? image.filename : 'avatar',
  //         data: image.data,
  //       },
  //     ])
  //       .then(resp => {
  //         const data = JSON.parse(resp.data);
  //         this.setState({avt_img: data.data.full_path});
  //       })
  //       .catch(err => console.log(err));
  //   });
  // }

  // async openCamera() {
  //   ImagePicker.openCamera({
  //     width: 250,
  //     height: 250,
  //     cropping: true,
  //     includeBase64: true,
  //     freeStyleCropEnabled: true,
  //     showCropFrame: true,
  //     waitAnimationEnd: true,
  //     compressImageQuality: 1,
  //     enableRotationGesture: true,
  //     mediaType: 'photo',
  //   }).then(image => {
  //     this.setState({
  //       avatar: image,
  //       path: image.path,
  //       height: image.height,
  //       width: image.width,
  //     });
  //     RNFetchBlob.fetch('POST', api + '/uploads/import', getHeaderCustom(), [
  //       {
  //         name: 'file',
  //         filename: image.filename ? image.filename : 'avatar',
  //         data: image.data,
  //       },
  //     ])
  //       .then(resp => {
  //         const data = JSON.parse(resp.data);
  //         this.setState({avt_img: data.data.full_path});
  //       })
  //       .catch(err => console.log(err));
  //   });
  // }

  async selectImgSign() {
    Alert.alert(
      'Thông báo',
      'Tuỳ chọn ảnh',
      [
        {
          text: 'Camera',
          onPress: () => this.openCameraSign(),
        },
        {
          text: 'Thư viện ảnh',
          onPress: () => this.selectGallerySign(),
        },
      ],
      {cancelable: false},
    );
  }

  openCameraSign() {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
      compressImageQuality: 1,
      enableRotationGesture: true,
      mediaType: 'photo',
    }).then(image => {
      this.setState({
        sign: image,
        path: image.path,
        height1: image.height,
        width1: image.width,
      });
      RNFetchBlob.fetch('POST', api + '/uploads/import', getHeaderCustom(), [
        {
          name: 'file',
          filename: 'sign.png',
          data: image.data,
          type: 'image/png',
        },
      ])
        .then(resp => {
          const data = JSON.parse(resp.data);
          this.setState({sign_img: data.data.full_path});
        })
        .catch(err => console.log(err));
    });
  }

  selectGallerySign() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
      compressImageQuality: 1,
      enableRotationGesture: true,
      mediaType: 'photo',
    }).then(image => {
      this.setState({
        sign: image,
        path: image.path,
        height1: image.height,
        width1: image.width,
      });
      RNFetchBlob.fetch('POST', api + '/uploads/import', getHeaderCustom(), [
        {
          name: 'file',
          filename: 'sign.png',
          data: image.data,
          type: 'image/png',
        },
      ])
        .then(resp => {
          const data = JSON.parse(resp.data);
          this.setState({sign_img: data.data.full_path});
        })
        .catch(err => console.log(err));
    });
  }

  async done() {
    this.setState({spinner: true});
    const header = await getHeader();
    const body = {
      id: this.state.info_id,
      render_link_template: true,
      status: 'Approved',
      card_type: this.state.checked ? 1 : 0,
      address_receive_card: this.state.checked ? this.state.address : '',
    };
    if (this.state.checked) {
      if (this.state.address === '') {
        this.setState({spinner: false});
        setTimeout(() => {
          Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ');
        }, 1000);
        return false;
      }
    }
    const send_data = await send(this.state.info_id, body, header);
    if (send_data) {
      this.setState({spinner: false});
      setTimeout(() => {
        Alert.alert(
          'Thông báo',
          'Gửi thông tin thành công. Thẻ của bạn đang được phê duyệt',
        );
      }, 1000);
      this.props.navigation.push('Menu');
    }
  }

  render() {
    const labels = [
      'Chọn mẫu thẻ',
      'Chọn ảnh chân dung',
      'Chọn chữ ký',
      'Hoàn thành',
    ];
    const customStyles = {
      stepIndicatorSize: 25,
      currentStepIndicatorSize: 30,
      separatorStrokeWidth: 4,
      currentStepStrokeWidth: 3,
      stepStrokeCurrentColor: '#00c807',
      stepStrokeWidth: 3,
      stepStrokeFinishedColor: '#00c807',
      stepStrokeUnFinishedColor: '#aaaaaa',
      separatorFinishedColor: '#f6a604',
      separatorUnFinishedColor: '#aaaaaa',
      stepIndicatorFinishedColor: '#00c807',
      stepIndicatorUnFinishedColor: '#ffffff',
      stepIndicatorCurrentColor: '#ffffff',
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: '#00c807',
      stepIndicatorLabelFinishedColor: '#ffffff',
      stepIndicatorLabelUnFinishedColor: '#aaaaaa',
      labelColor: '#999999',
      labelSize: 13,
      currentStepLabelColor: '#999999',
    };
    return (
      // <KeyboardAvoidingView
      //   // style={{
      //   //   flex: 1,
      //   //   flexDirection: 'column',
      //   //   justifyContent: 'center',
      //   // }}
      //   behavior="padding"
      //   enabled
      //   keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      //   <SafeAreaView>
      //     {this.state.loading ? (
      //       <ActivityIndicator size="large" />
      //     ) : (
      //       <ScrollView>
      //         <Spinner visible={this.state.spinner} />
      //         <View
      //           style={{
      //             padding: 20,
      //             backgroundColor: '#efeff4',
      //             height: '100%',
      //           }}>
      //           <StepIndicator
      //             stepCount={4}
      //             customStyles={customStyles}
      //             currentPosition={this.state.currentPosition}
      //             labels={labels}
      //           />
      //           <View
      //             style={{
      //               marginTop: 20,
      //               backgroundColor: '#f9f9f9',
      //               display: this.state.currentPosition === 0 ? null : 'none',
      //             }}>
      //             <View style={styles.step_one}>
      //               <View style={styles.header}>{this.renderTheme()}</View>
      //               <View style={styles.wrap_img}>
      //                 <Image
      //                   style={styles.img}
      //                   resizeMode="contain"
      //                   source={{
      //                     uri: this.state.images[this.state.step].images[0],
      //                   }}
      //                 />
      //                 <Image
      //                   resizeMode="contain"
      //                   style={styles.img}
      //                   source={{
      //                     uri: this.state.images[this.state.step].images[1],
      //                   }}
      //                 />
      //                 <TouchableOpacity
      //                   onPress={() => {
      //                     this.setModalVisible(
      //                       true,
      //                       this.state.images[this.state.step].id,
      //                     );
      //                   }}>
      //                   <Text
      //                     style={styles.preview}
      //                     onPress={() => {
      //                       this.setModalVisible(
      //                         true,
      //                         this.state.images[this.state.step].id,
      //                       );
      //                     }}>
      //                     Xem trước
      //                   </Text>
      //                 </TouchableOpacity>
      //                 <Button
      //                   onPress={() =>
      //                     this.select(this.state.images[this.state.step].id)
      //                   }
      //                   buttonStyle={{
      //                     width: 150,
      //                     marginTop: 15,
      //                     alignSelf: 'center',
      //                     display:
      //                       this.state.currentPosition === 0 ? null : 'none',
      //                   }}
      //                   title="Chọn mẫu thẻ"
      //                 />
      //               </View>
      //             </View>
      //           </View>

      //           <View
      //             style={{
      //               display: this.state.currentPosition === 1 ? null : 'none',
      //             }}>
      //             <Image
      //               style={{
      //                 width: this.state.width,
      //                 height: this.state.height,
      //                 marginTop: 30,
      //                 alignSelf: 'center',
      //               }}
      //               source={{
      //                 uri: `data:${this.state.avatar.mime};base64,${this.state.avatar.data}`,
      //               }}
      //             />
      //             <Button
      //               onPress={() => this.selectImg()}
      //               buttonStyle={{
      //                 width: 150,
      //                 marginTop: 30,
      //                 backgroundColor: '#f6a604',
      //                 alignSelf: 'center',
      //               }}
      //               title="Chọn ảnh"
      //             />
      //             <View
      //               style={{
      //                 display: 'flex',
      //                 flexDirection: 'row',
      //                 justifyContent: 'space-between',
      //               }}>
      //               <Button
      //                 onPress={() => this.backStep1()}
      //                 type="outline"
      //                 buttonStyle={{
      //                   width: 150,
      //                   marginTop: 30,
      //                   backgroundColor: 'white',
      //                 }}
      //                 title="Quay lại"
      //               />
      //               <Button
      //                 buttonStyle={{
      //                   width: 150,
      //                   marginTop: 30,
      //                 }}
      //                 onPress={() => this.nextStep3()}
      //                 title="Tiếp theo"
      //               />
      //             </View>
      //           </View>
      //           <View
      //             style={{
      //               display: this.state.currentPosition === 2 ? null : 'none',
      //             }}>
      //             <Image
      //               style={{
      //                 width: this.state.width1,
      //                 height: this.state.height1,
      //                 marginTop: 30,
      //                 alignSelf: 'center',
      //               }}
      //               source={{
      //                 uri: `data:${this.state.sign.mime};base64,${this.state.sign.data}`,
      //               }}
      //             />
      //             <Button
      //               onPress={() => this.selectImgSign()}
      //               buttonStyle={{
      //                 width: 150,
      //                 marginTop: 30,
      //                 backgroundColor: '#f6a604',
      //                 alignSelf: 'center',
      //               }}
      //               title="Chọn ảnh"
      //             />
      //             <View
      //               style={{
      //                 display: 'flex',
      //                 flexDirection: 'row',
      //                 justifyContent: 'space-between',
      //               }}>
      //               <Button
      //                 onPress={() => this.backStep2()}
      //                 type="outline"
      //                 buttonStyle={{
      //                   width: 150,
      //                   marginTop: 30,
      //                   backgroundColor: 'white',
      //                 }}
      //                 title="Quay lại"
      //               />
      //               <Button
      //                 buttonStyle={{
      //                   width: 150,
      //                   marginTop: 30,
      //                 }}
      //                 onPress={() => this.nextStep4()}
      //                 title="Tiếp theo"
      //               />
      //             </View>
      //           </View>

      //           <View
      //             style={{
      //               display: this.state.currentPosition === 3 ? null : 'none',
      //             }}>
      //             <Text
      //               style={{
      //                 marginBottom: 20,
      //                 marginTop: 20,
      //                 alignSelf: 'center',
      //                 color: '#317fc3',
      //                 fontWeight: '500',
      //                 fontSize: 18,
      //               }}>
      //               Ảnh thẻ của bạn
      //             </Text>
      //             <Image
      //               style={{
      //                 width: '100%',
      //                 height: 200,
      //                 marginTop: 30,
      //                 alignSelf: 'center',
      //               }}
      //               source={{
      //                 uri: this.state.image_review[0],
      //               }}
      //             />
      //             <Image
      //               style={{
      //                 width: '100%',
      //                 height: 200,
      //                 marginTop: 30,
      //                 alignSelf: 'center',
      //               }}
      //               source={{
      //                 uri: this.state.image_review[1],
      //               }}
      //             />
      //             <View style={this.state.checked ? null : styles.noneInput}>
      //               <Text style={[login.label, styles.textInput]}>
      //                 Địa chỉ nhận thẻ
      //               </Text>
      //               <TextInput
      //                 autoCapitalize="none"
      //                 style={[login.input, styles.input]}
      //                 onChangeText={text => this.setState({address: text})}
      //               />
      //             </View>
      //             <View
      //               style={{
      //                 display: 'flex',
      //                 flexDirection: 'row',
      //                 justifyContent: 'space-around',
      //                 flexWrap: 'wrap',
      //               }}>
      //               <CheckBox
      //                 checkedIcon="dot-circle-o"
      //                 uncheckedIcon="circle-o"
      //                 title="Đề xuất in thẻ cứng"
      //                 onPress={() =>
      //                   this.setState({checked: !this.state.checked})
      //                 }
      //                 containerStyle={{marginTop: 15}}
      //                 checked={this.state.checked}
      //               />
      //               <Button
      //                 onPress={() => this.backStep3()}
      //                 type="outline"
      //                 buttonStyle={{
      //                   width: 150,
      //                   marginTop: 30,
      //                   backgroundColor: 'white',
      //                 }}
      //                 title="Quay lại"
      //               />
      //               <Button
      //                 onPress={() => this.props.navigation.push('CreateCard')}
      //                 type="outline"
      //                 buttonStyle={{
      //                   width: 150,
      //                   marginTop: 30,
      //                   backgroundColor: 'white',
      //                 }}
      //                 title="Tạo lại"
      //               />
      //               <Button
      //                 buttonStyle={{
      //                   width: '100%',
      //                   marginTop: 30,
      //                 }}
      //                 onPress={() => this.done()}
      //                 title="Gửi thông tin"
      //               />
      //             </View>
      //           </View>
      //         </View>
      //         <Modal
      //           animationType="slide"
      //           transparent={false}
      //           visible={this.state.modalVisible}>
      //           <ScrollView>
      //             <View style={{marginTop: 22}}>
      //               <View style={{padding: 50}}>
      //                 <FlatList
      //                   keyExtractor={(item, index) => index.toString()}
      //                   data={this.state.img_preview}
      //                   renderItem={({item, index}) => (
      //                     <Image
      //                       style={[styles.img, styles.img_preview]}
      //                       resizeMode="contain"
      //                       source={{
      //                         uri: item,
      //                       }}
      //                     />
      //                   )}
      //                 />
      //                 <TouchableOpacity
      //                   onPress={() => {
      //                     this.hideModal();
      //                   }}>
      //                   <Text
      //                     onPress={() => {
      //                       this.hideModal();
      //                     }}
      //                     style={styles.preview}>
      //                     Đóng
      //                   </Text>
      //                 </TouchableOpacity>
      //               </View>
      //             </View>
      //           </ScrollView>
      //         </Modal>
      //       </ScrollView>
      //     )}
      //   </SafeAreaView>
      // </KeyboardAvoidingView>
      <View>
        <Text>aaa</Text>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  preview: {
    alignSelf: 'center',
    borderColor: '#317fc3',
    padding: 10,
    borderWidth: 1,
  },
  textInput: {
    marginTop: 20,
    color: 'black',
  },
  input: {
    backgroundColor: 'white',
  },
  theme: {
    alignItems: 'center',
    padding: 15,
    borderRightColor: '#efeff4',
    borderBottomColor: '#efeff4',
    borderRightWidth: 2,
    borderBottomWidth: 2,
    width: '33.3%',
  },
  active: {
    borderBottomColor: '#317fc3',
    borderBottomWidth: 2,
    alignItems: 'center',
    padding: 15,
    borderRightColor: '#efeff4',
    borderRightWidth: 2,
    width: '33.3%',
  },
  last_theme: {
    alignItems: 'center',
    borderBottomColor: '#efeff4',
    padding: 15,
    borderBottomWidth: 2,
    width: '33.4%',
  },
  header: {
    display: 'flex',
    // justifyContent: 'space-around',
    flexDirection: 'row',
  },
  wrap_img: {
    padding: 35,
  },
  img: {
    width: '100%',
    height: 140,
    marginBottom: 20,
    borderColor: '#e3e3e3',
    borderWidth: 1,
  },
  img_preview: {
    height: 250,
  },
  noneInput: {
    display: 'none',
  },
});

function mapStateToProps(state) {
  return {myProfile: state.auth.myprofile};
}

export default connect(mapStateToProps)(CreateCard);
