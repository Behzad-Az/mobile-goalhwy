import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import CourseRow from './CourseRow.js';
import NewInstForm from './NewInstForm.js';
import NewCourseForm from './NewCourseForm.js';
import ChangeInstForm from './ChangeInstForm.js';

class CoursesContainer extends React.Component {
  render() {
    return (
      <View style={styles.componentContainer}>
        <Text style={styles.header}>{this.props.instName}</Text>
        <View style={styles.headerBtnContainer}>
          <ChangeInstForm
            instList={this.props.instList}
            reload={this.props.reload}
            style={styles.headerBtn} />
          <NewInstForm
            reload={this.props.reload}
            style={styles.headerBtn} />
        </View>
        <TextInput
          style={styles.textInput}
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={this.props.handleFilter}
          placeholder='Search courses here...'
        />
        { this.props.courses.map(course => <CourseRow key={course.id} course={course} currUserCourseIds={this.props.currUserCourseIds} />) }
        { !this.props.courses[0] && <NewCourseForm instId={this.props.instId} reload={this.props.reload} /> }
      </View>
    );
  }
}

export default CoursesContainer;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#004E89',
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  textInput: {
    margin: 5,
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: .5,
    borderColor: '#999',
    borderRadius: 5,
    backgroundColor: 'white',
    minHeight: 30,
    fontSize: 16
  },
  componentContainer: {
    marginBottom: 10
  },
  headerBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: '#004E89'
  },
  headerBtn: {
    paddingLeft: 7,
    paddingRight: 7,
    textAlign: 'center',
    color: 'white',
    fontSize: 19
  }
});