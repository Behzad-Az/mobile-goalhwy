import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

// import { Actions } from 'react-native-router-flux';

import { FontAwesome } from '@exponent/vector-icons';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleNavigate = this.handleNavigate.bind(this);
  }

  handleNavigate(route) {
    this.props.navigator.push({ title: route });
  }

  render() {
    return (
      <View style={styles.dividedRow}>

        <TouchableOpacity style={{flex: 1}} onPress={() => this.handleNavigate('IndexPage')}>
          <Text style={styles.navItem}><FontAwesome name="book" size={19} color="white" /></Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.changePage('CoursePage')}>
          <Text style={styles.navItem}>
            <FontAwesome name="graduation-cap" size={19} color="white" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flex: 1}} onPress={() => this.handleNavigate('InstPage')}>
          <Text style={styles.navItem}>
            <FontAwesome name="institution" size={19} color="white" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.changePage('InstPage')}>
          <Text style={styles.navItem}>
            <FontAwesome name="user-circle-o" size={19} color="white" />
          </Text>
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
