import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Image
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';
import { Actions } from 'react-native-router-flux';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errMsg: ''
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    // $.ajax({
    //   method: 'POST',
    //   url: '/api/login',
    //   data: this.state,
    //   success: response => {
    //     response ? browserHistory.push("/home") : this.props.handleBadInput(true, 'Invalid login credentials.');
    //   }
    // });

    let data = { ...this.state };
    delete data.errMsg;

    fetch('http://127.0.0.1:19001/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(resJSON => resJSON ? Actions.IndexPage() : this.setState({ errMsg: "Invalid username and/or password"  }))
    .catch(err => this.setState({ errMsg: "Login failed"  }));
  }

  render() {
    return (
      <View style={[styles.container]}>

        <Text style={[styles.textStyle, {fontSize: 13}]}>{this.state.errMsg}</Text>
        <Image
          source={require('../public/images/logo.png')}
          fadeDuration={0}
          resizeMode={Image.resizeMode.contain}
          style={{ height: 30, margin: 15 }}
         />

        <View style={{margin: 5}}>
          <TextInput
            style={styles.textInput}
            onChangeText={username => this.setState({ username })}
            placeholder="Username" />
          <FontAwesome name="user" style={styles.fontAwesomeStyle} />
        </View>

        <View style={{margin: 5}}>
          <TextInput
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            secureTextEntry={true} />
          <FontAwesome name="key" style={styles.fontAwesomeStyle} />

        </View>

        <View style={styles.dividedRow}>
          <Text style={[styles.loginBtn, {flex: 1}]} onPress={this.handleLogin}>Login</Text>
          <Text style={[styles.textStyle, {flex: 1}]}>Register</Text>
        </View>


      </View>
    );
  }
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#004E89',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 150
  },
  textInput: {
    backgroundColor: 'white',
    width: 240,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 10,
    paddingLeft: 40,
    borderWidth: 2,
    borderColor: '#bbb',
    borderRadius: 7
  },
  fontAwesomeStyle: {
    position: 'absolute',
    left: 8,
    top: 8,
    fontSize: 22,
    color: '#bbb'
  },
  textStyle: {
    padding: 5,
    textAlign: 'center',
    fontSize: 15,
    color: 'white'
  },
  loginBtn: {
    padding: 5,
    textAlign: 'center',
    fontSize: 15,
    color: '#004E89',
    backgroundColor: 'white',
    borderRadius: 5
  },
  dividedRow: {
    width: 240,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5
  }
});
