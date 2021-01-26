/* eslint-disable comma-dangle */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

class Step extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.event()}>
        <View style={styles.follow}>
          <View style={styles.wrapimg}>
            <Image style={styles.img} source={this.props.img} />
          </View>
          <View style={styles.followContent}>
            <Text style={styles.textStep}>{this.props.step}</Text>
            <Text>{this.props.stepContent}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export const styles = StyleSheet.create({
  wrapimg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 50,
    marginRight: 15,
    marginTop: 15,
    marginLeft: 25
  },
  follow: {
    borderRadius: 10,
    backgroundColor: '#efeff4',
    height: 55,
    marginTop: 10,
    flexDirection: 'row',
    display: 'flex'
  },
  elementFollow: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  followContent: {
    justifyContent: 'center'
  },
  textStep: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#317fc3'
  },
  img: {
    width: 9,
    height: 9
  }
});

export default connect()(Step);
