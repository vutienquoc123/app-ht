/* eslint-disable comma-dangle */
import { StyleSheet } from 'react-native';
export const drawer = StyleSheet.create({
  background: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  avatar: {
    width: 91,
    height: 91,
    borderRadius: 50
  },
  btnLogout: {
    marginLeft: 15,
    marginRight: 15
  },
  separator: {
    height: 10,
    backgroundColor: '#efeff4'
  },
  button: {
    backgroundColor: '#d73352',
    paddingVertical: 8,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  btnAuth: {
    width: 120,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#da3456',
    borderWidth: 1
  },
  viewAuth: { flexDirection: 'row', marginTop: 25 },
  btnLogin: {
    marginLeft: 10,
    backgroundColor: '#da3456'
  },
  btnResgister: {
    marginRight: 10
  },
  textLogin: {
    color: '#ffffff',
    fontSize: 14
  },
  textRegister: {
    color: '#da3456',
    fontSize: 14
  }
});
