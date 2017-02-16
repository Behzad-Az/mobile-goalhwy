import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

class InstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAlreadySubscribed: this.props.currUserCourseIds.includes(this.props.course.id)
    };
  }

  render() {
    return (
      <View style={styles.dividedRow}>
        <TouchableOpacity style={{flex: 9}}>
          <Text style={styles.courseRow}>{this.props.course.displayName}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}}>
          <Text>
            { this.state.userAlreadySubscribed ?
              <FontAwesome name="remove" size={25} color="black" /> :
              <FontAwesome name="check-circle" size={25} color="black" /> }
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default InstPage;

const styles = StyleSheet.create({
  courseRow: {
    padding: 5,
    borderWidth: .5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5
  },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  }
});
