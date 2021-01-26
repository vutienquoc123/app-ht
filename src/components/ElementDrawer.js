/* eslint-disable comma-dangle */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

class ElementDrawer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.event()}>
          <View style={styles.viewElement}>
            <FontAwesomeIcon icon={this.props.icon} style={styles.size} />
            <Text style={styles.text}>{this.props.title}</Text>
            <FontAwesomeIcon style={styles.iconRight} icon={faAngleRight} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
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

export default connect()(ElementDrawer);
