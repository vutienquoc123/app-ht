/* eslint-disable comma-dangle */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';

class Edit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.push('EditProfile')}>
          <Text style={styles.edit}>Sửa</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  edit: {
    color: '#007aff',
    fontWeight: '500',
    marginRight: 15,
    fontSize: 16,
  },
});

export default withNavigation(Edit);
