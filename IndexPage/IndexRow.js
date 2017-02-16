import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

class IndexRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => {alert(`Opening course page ${this.props.course.prefix} ${this.props.course.suffix} - ID ${this.props.course.course_id}`)}}>
          <Text style={styles.courseTitle}>
            {this.props.course.prefix} {this.props.course.suffix}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default IndexRow;

const styles = StyleSheet.create({
  courseTitle: {
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5
  }
});
