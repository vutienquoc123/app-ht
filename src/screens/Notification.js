/* eslint-disable comma-dangle */
import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {global} from '../assets/styles/global';
import {notify} from '../assets/styles/notify';
import {getHeader} from '../config/header';
import moment from 'moment';
import Footer from '../components/Footer';
import {getNotify} from '../api/notify';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], loading: true, fetching_from_server: false};
    this.page = 1;
  }
  static navigationOptions = {
    headerTitleStyle: {
      fontSize: 18,
    },
    title: 'Thông báo của bạn',
    headerLeft: null,
  };
  async componentDidMount() {
    const header = await getHeader();
    const data = await getNotify(header);
    this.setState({data: data.data, loading: false});

    // doGet(endpoint.notify.notification(this.page), header)
    //   .then(response => {
    //     this.page = this.page + 1;
    //   })
    //   .catch(err => err);
  }

  getTime(time) {
    const now = moment(new Date());
    const current = moment(time);
    if (now.diff(current, 'minutes') < 60) {
      return `${now.diff(current, 'minutes')} phút trước`;
    }
    if (now.diff(current, 'hours') < 24) {
      return `${now.diff(current, 'hours')} giờ trước`;
    }
    if (now.diff(current, 'days') < 31) {
      return `${now.diff(current, 'days')} ngày trước`;
    }
    if (now.diff(current, 'months') < 12) {
      return `${now.diff(current, 'months')} tháng trước`;
    }
    return `${now.diff(current, 'years')} năm trước`;
  }
  render() {
    return (
      <Fragment>
        <SafeAreaView style={[global.container, notify.background]}>
          {this.state.loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <ScrollView>
              {this.state.data.length !== 0 ? (
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.data}
                  renderItem={({item, index}) => (
                    <View style={notify.read}>
                      <View style={notify.viewContent}>
                        <Text>{item.title}</Text>
                      </View>
                    </View>
                  )}
                />
              ) : (
                <Text style={{margin: 20}}>Bạn chưa có thông báo nào</Text>
              )}
            </ScrollView>
          )}
        </SafeAreaView>
        <Footer />
      </Fragment>
    );
  }
}

export default connect()(Notification);
