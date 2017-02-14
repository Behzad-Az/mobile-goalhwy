import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { Ionicons, FontAwesome } from '@exponent/vector-icons';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.dividedRow}>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.changePage('coursePage')}>
          <Text style={styles.navItem}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.changePage('instPage')}>
          <Text style={styles.navItem}><FontAwesome name="graduation-cap" size={19} color="white" /></Text>
        </TouchableOpacity>
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
