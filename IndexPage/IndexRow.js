import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class IndexRow extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToCourse = this.navigateToCourse.bind(this);
  }

  navigateToCourse() {
    this.props.navigator.push({
      title: 'CoursePage',
      index: 1,
      paramCourseId: this.props.course.id
    });
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.navigateToCourse}>
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
