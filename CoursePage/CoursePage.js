import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

import TopRow from './TopRow.js';

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
      lectureNotes: [],
      showAsgReports: false,
      showSampleQuestions: false,
      showLectureNotes: false,
      showItemsForSale: false
    };
    this.conditionData = this.conditionData.bind(this);
    this.loadComponentData = this.loadComponentData.bind(this);
    this.renderSampleQuestions = this.renderSampleQuestions.bind(this);
    this.renderLectureNotes = this.renderLectureNotes.bind(this);
    this.renderItemsForSale = this.renderItemsForSale.bind(this);
    this.toggleDocView = this.toggleDocView.bind(this);
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

  renderAsgReports() {
    let docCount = this.state.asgReports.length;
    let lastUpdate = docCount ? this.state.asgReports[0].revisions[0].rev_created_at.slice(0, 10) : '';
    return this.state.showAsgReports ?
      this.state.asgReports.map((doc, index) => {
        return (
          <TouchableOpacity key={index}>
            <Text style={styles.docTypeHeader}>{doc.title}</Text>
          </TouchableOpacity>
        );
      }) :
      <Text style={styles.docTypeHeader}>{docCount} document(s)... last update on {lastUpdate}</Text>
  }

  renderSampleQuestions() {
    let docCount = this.state.sampleQuestions.length;
    let lastUpdate = docCount ? this.state.sampleQuestions[0].revisions[0].rev_created_at.slice(0, 10) : '';
    return this.state.showSampleQuestions ?
      this.state.sampleQuestions.map((doc, index) => {
        return (
          <TouchableOpacity key={index}>
            <Text style={styles.docTypeHeader}>{doc.title}</Text>
          </TouchableOpacity>
        );
      }) :
      <Text style={styles.docTypeHeader}>{docCount} document(s)... last update on {lastUpdate}</Text>
  }

  renderLectureNotes() {
    let docCount = this.state.lectureNotes.length;
    let lastUpdate = docCount ? this.state.lectureNotes[0].revisions[0].rev_created_at.slice(0, 10) : '';
    return this.state.showLectureNotes ?
      this.state.lectureNotes.map((doc, index) => {
        return (
          <TouchableOpacity key={index}>
            <Text style={styles.docTypeHeader}>{doc.title}</Text>
          </TouchableOpacity>
        );
      }) :
      <Text style={styles.docTypeHeader}>{docCount} document(s)... last update on {lastUpdate}</Text>
  }

  renderItemsForSale() {
    let itemCount = this.state.itemsForSale.length;
    return this.state.showItemsForSale ?
      this.state.itemsForSale.map((item, index) => {
        return (
          <TouchableOpacity key={index}>
            <Text style={styles.docTypeHeader}>{item.title}</Text>
          </TouchableOpacity>
        );
      }) :
      <Text style={styles.docTypeHeader}>{itemCount} item(s) for sale...</Text>
  }

  toggleDocView(stateBool) {
    let obj = {};
    obj[stateBool] = !this.state[stateBool];
    this.setState(obj);
  }

  render() {
    return (
      <View>
        <Text style={styles.header}>
          {this.state.courseInfo.prefix} {this.state.courseInfo.suffix}
        </Text>

        <TopRow courseInfo={this.state.courseInfo} />

        <View style={{marginBottom: 10}}>
          <TouchableOpacity onPress={() => this.toggleDocView('showAsgReports')}>
            <Text style={styles.header}>
              Assignment & Reports:
            </Text>
            <View style={{position: 'absolute', right: 10, top: 5}}>
              { this.state.showAsgReports ? <FontAwesome name="chevron-up" size={19} color="white" /> : <FontAwesome name="chevron-down" size={19} color="white" /> }
            </View>
          </TouchableOpacity>
          { this.renderAsgReports() }
        </View>

        <View style={{marginBottom: 10}}>
          <TouchableOpacity onPress={() => this.toggleDocView('showSampleQuestions')}>
            <Text style={styles.header}>
              Sample Questions:
            </Text>
            <View style={{position: 'absolute', right: 10, top: 5}}>
              { this.state.showSampleQuestions ? <FontAwesome name="chevron-up" size={19} color="white" /> : <FontAwesome name="chevron-down" size={19} color="white" /> }
            </View>
          </TouchableOpacity>
          { this.renderSampleQuestions() }
        </View>

        <View style={{marginBottom: 10}}>
          <TouchableOpacity onPress={() => this.toggleDocView('showLectureNotes')}>
            <Text style={styles.header}>
              Lecture Notes:
            </Text>
            <View style={{position: 'absolute', right: 10, top: 5}}>
              { this.state.showLectureNotes ? <FontAwesome name="chevron-up" size={19} color="white" /> : <FontAwesome name="chevron-down" size={19} color="white" /> }
            </View>
          </TouchableOpacity>
          { this.renderLectureNotes() }
        </View>

        <View style={{marginBottom: 10}}>
          <TouchableOpacity onPress={() => this.toggleDocView('showItemsForSale')}>
            <Text style={styles.header}>
              Items for Sale or Trade:
            </Text>
            <View style={{position: 'absolute', right: 10, top: 5}}>
              { this.state.showItemsForSale ? <FontAwesome name="chevron-up" size={19} color="white" /> : <FontAwesome name="chevron-down" size={19} color="white" /> }
            </View>
          </TouchableOpacity>
          { this.renderItemsForSale() }
        </View>

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

