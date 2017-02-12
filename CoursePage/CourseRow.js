import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import DocRevisions from './DocRevisions.js';
import NewDocForm from './NewDocForm.js';

class CourseRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleQuestions: this.props.course.docs.filter(doc => doc.revisions[0].type == 'sample_question'),
      asgReports: this.props.course.docs.filter(doc => doc.revisions[0].type == 'asg_report'),
      lectureNotes: this.props.course.docs.filter(doc => doc.revisions[0].type == 'lecture_note'),
      showDocs: false
    };
    this.toggleShowDocs = this.toggleShowDocs.bind(this);
    this.renderDocs = this.renderDocs.bind(this);
  }

  toggleShowDocs() {
    let showDocs = !this.state.showDocs;
    this.setState({ showDocs });
  }

  renderDocs() {
    if (this.state.showDocs) {
      return (
        <View style={styles.container}>
          <NewDocForm />
          <Text style={styles.docTypeHeader}>Sample Questions:</Text>
          { this.state.sampleQuestions.map((doc, index) => <DocRevisions key={index} doc={doc} />) }
          <Text style={styles.docTypeHeader}>Assignment and Reports:</Text>
          { this.state.asgReports.map((doc, index) => <DocRevisions key={index} doc={doc} />) }
          <Text style={styles.docTypeHeader}>Lecture Notes:</Text>
          { this.state.lectureNotes.map((doc, index) => <DocRevisions key={index} doc={doc} />) }
        </View>
      );
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.toggleShowDocs}>
          <Text style={this.state.showDocs ? styles.courseTitleClicked : styles.courseTitle}>{this.props.course.prefix} {this.props.course.suffix}</Text>
        </TouchableOpacity>
        { this.renderDocs() }
      </View>
    );
  }
}

export default CourseRow;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5
  },
  docTypeHeader: {
    color: '#004E89',
    fontWeight: 'bold'
  },
  courseTitle: {
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5
  },
  courseTitleClicked: {
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: '#bbb',
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5
  }
});
