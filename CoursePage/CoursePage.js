import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class CoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInfo: {
        id: 1224
      },
      courseFeed: [],
      itemsForSale: [],
      sampleQuestions: [],
      asgReports: [],
      lectureNotes: []
    };
    this.conditionData = this.conditionData.bind(this);
    this.loadComponentData = this.loadComponentData.bind(this);
  }

  componentDidMount() {
    this.loadComponentData(this.state.courseInfo.id);
  }

  loadComponentData(course_id) {
    fetch('http://127.0.0.1:19001/api/login', {
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
    .then(() => fetch(`http://127.0.0.1:19001/api/courses/${course_id}`))
    .then(response => response.json())
    .then(resJSON => this.conditionData(resJSON))
    .catch(err => console.log("Error here: ", err));
  }

  conditionData(response) {
    let filterDocs = (docs, docType) => docs.filter(doc => doc.type === docType);
    let newState = {
      courseInfo: response.courseInfo,
      courseFeed: response.courseFeed,
      itemsForSale: response.itemsForSale,
      sampleQuestions: filterDocs(response.docs, 'sample_question'),
      asgReports: filterDocs(response.docs, 'asg_report'),
      lectureNotes: filterDocs(response.docs, 'lecture_note')
    };
    this.setState(newState);
  }

  render() {
    return (
      <View>
        <Text style={styles.header}>My Sample Questions:</Text>
        { this.state.sampleQuestions.map((sq, index) => <Text key={index}>{sq.title}</Text>) }
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
    color: 'white',
    fontWeight: 'bold'
  }
});
