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

class CoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInfo: {
        id: this.props.courseId
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
    fetch(`http://127.0.0.1:19001/api/courses/${course_id}`)
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
      this.state.asgReports.map((doc, index) => <Text key={index} style={styles.docTypeHeader}>{doc.title}</Text>) :
      <Text style={styles.docTypeHeader}>{docCount} document(s)... last update on {lastUpdate}</Text>
  }

  renderSampleQuestions() {
    let docCount = this.state.sampleQuestions.length;
    let lastUpdate = docCount ? this.state.sampleQuestions[0].revisions[0].rev_created_at.slice(0, 10) : '';
    return this.state.showSampleQuestions ?
      this.state.sampleQuestions.map((doc, index) => <Text key={index} style={styles.docTypeHeader}>{doc.title}</Text>):
      <Text style={styles.docTypeHeader}>{docCount} document(s)... last update on {lastUpdate}</Text>
  }

  renderLectureNotes() {
    let docCount = this.state.lectureNotes.length;
    let lastUpdate = docCount ? this.state.lectureNotes[0].revisions[0].rev_created_at.slice(0, 10) : '';
    return this.state.showLectureNotes ?
      this.state.lectureNotes.map((doc, index) => <Text key={index} style={styles.docTypeHeader}>{doc.title}</Text>):
      <Text style={styles.docTypeHeader}>{docCount} document(s)... last update on {lastUpdate}</Text>
  }

  renderItemsForSale() {
    let itemCount = this.state.itemsForSale.length;
    return this.state.showItemsForSale ?
      this.state.itemsForSale.map((item, index) => <Text key={index} style={styles.docTypeHeader}>{item.title}</Text>) :
      <Text style={styles.docTypeHeader}>{itemCount} item(s) for sale...</Text>
  }

  toggleDocView(stateBool) {
    let obj = {};
    obj[stateBool] = !this.state[stateBool];
    this.setState(obj);
  }

  render() {
    return (
      <ScrollView>
        <Navbar navigator={this.props.navigator} />
        <Text style={styles.header}>
          {this.state.courseInfo.prefix} {this.state.courseInfo.suffix}
        </Text>

        <TopRow courseInfo={this.state.courseInfo} />

        <View style={{marginBottom: 10}}>
          <Text style={styles.header} onPress={() => this.toggleDocView('showAsgReports')}>
            Assignment & Reports:
          </Text>
          <View style={{position: 'absolute', right: 10, top: 5}}>
            <FontAwesome name={this.state.showAsgReports ? "chevron-up" : "chevron-down"} size={19} color="white" />
          </View>
          { this.renderAsgReports() }
        </View>

        <View style={{marginBottom: 10}}>
          <Text style={styles.header} onPress={() => this.toggleDocView('showSampleQuestions')}>
            Sample Questions:
          </Text>
          <View style={{position: 'absolute', right: 10, top: 5}}>
            <FontAwesome name={this.state.showSampleQuestions ? "chevron-up" : "chevron-down"} size={19} color="white" />
          </View>
          { this.renderSampleQuestions() }
        </View>

        <View style={{marginBottom: 10}}>
          <Text style={styles.header} onPress={() => this.toggleDocView('showLectureNotes')}>
            Lecture Notes:
          </Text>
          <View style={{position: 'absolute', right: 10, top: 5}}>
            <FontAwesome name={this.state.showLectureNotes ? "chevron-up" : "chevron-down"} size={19} color="white" />
          </View>
          { this.renderLectureNotes() }
        </View>

        <View style={{marginBottom: 10}}>
          <Text style={styles.header} onPress={() => this.toggleDocView('showItemsForSale')}>
            Items for Sale or Trade:
          </Text>
          <Text style={{position: 'absolute', right: 10, top: 5}}>
            <FontAwesome name={this.state.showItemsForSale ? "chevron-up" : "chevron-down"} size={19} color="white" />
          </Text>
          { this.renderItemsForSale() }
        </View>

      </ScrollView>
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

