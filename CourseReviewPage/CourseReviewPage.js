import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import Navbar from '../Navbar/Navbar.js';
import TopRow from './TopRow.js';

class CourseReviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInfo: {},
      courseReviews: [],
      profs: []
    };
    this.loadComponentData = this.loadComponentData.bind(this);
  }

  componentDidMount() {
    this.loadComponentData();
  }

  loadComponentData() {
    fetch(`http://127.0.0.1:19001/api/courses/${this.props.courseId}/reviews`)
    .then(response => response.json())
    .then(resJSON => resJSON ? this.setState(resJSON) : console.error("server error - 0", resJSON))
    .catch(err => console.log("Error here: ", err));
  }

  render() {
    return (
      <ScrollView>
        <Navbar navigator={this.props.navigator} />
        <TopRow courseReviews={this.state.courseReviews} />
      </ScrollView>
    );
  }
}

export default CourseReviewPage;
