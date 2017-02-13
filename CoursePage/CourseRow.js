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
import NewAssistRequest from './NewAssistRequest.js';

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


          <View style={styles.dividedRow}>
            <View style={{ flex: 1 }}><NewDocForm /></View>
            <View style={{ flex: 1 }}><NewAssistRequest /></View>
            <TouchableOpacity style={{ flex: 1 }}><Text style={styles.primaryBtn}>Unsub</Text></TouchableOpacity>
          </View>



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
          <Text
            style={this.state.showDocs ?
                  [styles.courseTitle, {backgroundColor: '#bbb'}] :
                  styles.courseTitle}
          >
            {this.props.course.prefix} {this.props.course.suffix}
          </Text>
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
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  primaryBtn: {
    color: 'white',
    backgroundColor: '#004E89',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    marginRight: 5,
    marginLeft: 5
  }
});
