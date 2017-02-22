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

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

        <View style={[styles.container]}>

          <Image
            source={require('../public/images/logo.png')}
            fadeDuration={0}
            resizeMode={Image.resizeMode.contain}
            style={{ height: 30, marginBottom: 20 }}
           />

          <View style={{margin: 5}}>
            <TextInput
              style={styles.textInput}
              onChangeText={filterPhrase => this.setState({ filterPhrase })}
              placeholder="Username" />
            <FontAwesome name="user" style={styles.fontAwesomeStyle} />
          </View>

          <View style={{margin: 5}}>
            <TextInput
              style={styles.textInput}
              onChangeText={filterPhrase => this.setState({ filterPhrase })}
              placeholder="Password" />
            <FontAwesome name="key" style={styles.fontAwesomeStyle} />
          </View>

          <Text style={styles.textBtn}>Register</Text>

        </View>

    );
  }
}

export default LoginPage;

const vw = percentageWidth => Dimensions.get('window').width * (percentageWidth / 100);

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
  textBtn: {
    padding: 5,
    textAlign: 'center',
    fontSize: 15,
    color: 'white'
  }
});
