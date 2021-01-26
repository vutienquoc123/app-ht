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
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {global} from '../assets/styles/global';
import {notify} from '../assets/styles/notify';
import {getHeader} from '../config/header';
import Footer from '../components/Footer';
import {getCard} from '../api/profile';

class MyPreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], loading: true, fetching_from_server: false};
    this.page = 1;
  }
  static navigationOptions = {
    headerTitleStyle: {
      fontSize: 18,
    },
    title: 'Thẻ đã tạo',
  };

  async componentDidMount() {
    const header = await getHeader();
    const data = await getCard(header);
    if (data.data.listregisters.data.length !== 0) {
      if (data.data.listregisters.data[0].images.data.length !== 0) {
        const imgs = data.data.listregisters.data[0].images.data;
        this.setState({data: imgs, loading: false});
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

  render() {
    return (
      <Fragment>
        <SafeAreaView style={[global.container, notify.background]}>
          {this.state.loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <ScrollView style={{padding: 20}}>
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
            </ScrollView>
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
    marginBottom: 25,
  },
});

export default connect()(MyPreCard);
