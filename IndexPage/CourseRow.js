import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

class CourseRow extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.courseTitle} onPress={() => Actions.CoursePage({ courseId: this.props.course.id })}>
          { this.props.course.short_display_name }
        </Text>
      </View>
    );
  }
}

export default CourseRow;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
    borderBottomWidth: .5,
    borderColor: '#004E89'
  },
  courseTitle: {
    fontWeight: 'bold'
  }
});
