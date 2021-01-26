/* eslint-disable comma-dangle */
import { StyleSheet } from 'react-native';
export const auth = StyleSheet.create({
  button: {
    backgroundColor: '#317fc3',
    paddingVertical: 8,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
    borderRadius: 4,
    marginTop: 30
  },

  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  scrollview: {
    marginLeft: 15,
    marginRight: 15
  },
  viewTitle: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40
  },
  textTitle: {
    fontSize: 18,
    color: '#317fc3',
    fontWeight: 'bold',
    marginTop: 50
  },
  viewInput: {
    marginTop: 30
  },
  viewPassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  textResgister: {
    color: '#317fc3'
  },
  remember: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#efeff4',
    marginRight: 10,
    // backgroundColor: '#efeff4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewRemember: { flexDirection: 'row' },
  check: {
    backgroundColor: '#1ca433'
  }
});
