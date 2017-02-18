import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

import Navbar from '../Navbar/Navbar.js';
import TopRow from './TopRow.js';
import RevisionRow from './RevisionRow.js';

class DocPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInfo: {
        id: this.props.courseId
      },
      doc: {
        id: this.props.docId,
        revisions: []
      }
    };
    this.loadComponentData = this.loadComponentData.bind(this);
  }

  componentDidMount() {
    this.loadComponentData(this.state.courseInfo.id, this.state.doc.id);
  }

  // componentWillReceiveProps(nextProps) {
  //   nextProps.params.doc_id == this.state.doc.id ? '' : this.loadComponentData(nextProps.params.course_id, nextProps.params.doc_id);
  // }

  loadComponentData(courseId, docId) {
    fetch(`http://127.0.0.1:19001/api/courses/${courseId}/docs/${docId}`)
    .then(response => response.json())
    .then(resJSON => resJSON ? this.setState(resJSON) : console.error("server error - 0", response))
    .catch(err => console.log("Error here: ", err));
  }

  render() {
    return (
      <ScrollView>
        <Navbar />

        <Text style={styles.header}>
          { this.state.doc.title }
        </Text>

        <TopRow courseInfo={this.state.courseInfo} />

        <Text style={styles.header}>
          Revisions
        </Text>
        { this.state.doc.revisions.map((rev, index) => <RevisionRow key={index} rev={rev} />) }

      </ScrollView>
    );
  }
}

export default DocPage;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#004E89',
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  docTypeHeader: {
    padding: 5,
    backgroundColor: '#eee',
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5
  },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10
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
