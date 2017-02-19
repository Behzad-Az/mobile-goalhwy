import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { FontAwesome } from '@exponent/vector-icons';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.dividedRow}>

        <View style={{flex: 1}} >
          <Text style={styles.navItem} onPress={() => Actions.IndexPage()}>
            <FontAwesome name="book" size={19} color="white" />
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.navItem} onPress={() => Actions.IndexPage()}>
            <FontAwesome name="graduation-cap" size={19} color="white" />
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.navItem} onPress={() => Actions.CareerPage()}>
            <FontAwesome name="institution" size={19} color="white" />
          </Text>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.navItem} onPress={() => Actions.InstPage()}>
            <FontAwesome name="user-circle-o" size={19} color="white" />
          </Text>
        </View>

      </View>
    );
  }
}

export default Navbar;

const styles = StyleSheet.create({
  navItem: {
    borderWidth: .5,
    borderColor: 'white',
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#004E89',
    textAlign: 'center'
  },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  }
});
