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
          <Text style={{padding: 5}}>{this.props.course.displayName}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1}}>
          <Text style={{padding: 5}}>
            <FontAwesome name="check-circle" size={25} color={this.state.userAlreadySubscribed ? "green" : "black"} />
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default InstPage;

const styles = StyleSheet.create({
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: '#eee',
    borderWidth: .5
  }
});
