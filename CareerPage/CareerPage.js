import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

import Navbar from '../Navbar/Navbar.js';
import JobRow from './JobRow.js';
import JobSearchForm from './JobSearchForm.js';

class CareerPage extends React.Component {
  constructor(props) {
    super(props);
    this.userId = this.props.userId || 1;
    this.state = {
      jobs: []
    };
    this.conditionData = this.conditionData.bind(this);
    this.loadComponentData = this.loadComponentData.bind(this);
  }

  componentDidMount() {
    this.loadComponentData();
  }

  loadComponentData() {
    fetch(`http://127.0.0.1:19001/api/users/${this.userId}/jobs`)
    .then(response => response.json())
    .then(resJSON => resJSON ? this.conditionData(resJSON) : console.error("server error - 0", resJSON))
    .catch(err => console.log("Error here: ", err));
  }

  conditionData(resJSON) {
    let jobs = resJSON.map(data => {
      return {
        ...data._source.pin,
        tags: data._source.pin.search_text.split(' ')
      };
    });
    this.setState({ jobs });
  }

  render() {
    return (
      <ScrollView>
        <Navbar />
        <JobSearchForm reload={this.loadComponentData} />
        <Text style={styles.header}>Open Positions:</Text>
        { this.state.jobs.map((job, index) => <JobRow key={index} job={job} />) }
        { !this.state.jobs[0] && <Text style={{paddingLeft: 5}}>No jobs matching your search...</Text> }
      </ScrollView>
    );
  }
}

export default CareerPage;

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
