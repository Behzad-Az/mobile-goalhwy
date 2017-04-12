import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CourseRow from './CourseRow.js';

class CoursesContainer extends React.Component {
  render() {
    return (
      <View style={styles.componentContainer}>
        <Text style={styles.header}>My Courses:</Text>
        { this.props.courses.map(course => <CourseRow key={course.id} course={course} />) }
        { !this.props.courses[0] &&
          <Text style={styles.textBtn} onPress={() => Actions.InstPage({ instId: this.props.instId })}>
            Click here to select and subscribe to at least one course.
          </Text>
        }
      </View>
    );
  }
}

export default CoursesContainer;

const styles = StyleSheet.create({
  componentContainer: {
    marginBottom: 10
  },
  header: {
    backgroundColor: '#004E89',
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  textBtn: {
    padding: 5,
    textAlign: 'center',
    color: '#004E89'
  }
});
