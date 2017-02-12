import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import CourseRow from './CourseRow.js';

class CoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:19002/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'ben',
        password: 'ben123'
      })
    })
    .then(() => fetch('http://127.0.0.1:19002/api/mobile/courses'))
    .then(response => response.json())
    .then(resJSON => this.setState(resJSON))
    .catch(err => console.log("Error here: ", err));
  }

  render() {
    return (
      <View>
        <Text style={styles.header}>My Courses:</Text>
        { this.state.courses.map((course, index) => <CourseRow key={index} course={course} />) }
      </View>
    );
  }
}

export default CoursePage;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#004E89',
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignSelf: 'stretch',
    color: 'white',
    fontWeight: 'bold'
  }
});
