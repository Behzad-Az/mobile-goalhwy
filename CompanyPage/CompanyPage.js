import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions
} from 'react-native';

import Navbar from '../Navbar/Navbar.js';
import SearchBar from '../Partials/SearchBar.js';
import JobRow from '../CareerPage/JobRow.js';
import QaRow from './QaRow.js';
import NewQuestionForm from './NewQuestionForm.js';

import { FontAwesome } from '@exponent/vector-icons';

class CompanyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyInfo: {},
      questions: [],
      jobs: [],
      showJobs: false,
      showQas: false,
      searchResults: []
    };
    this.loadComponentData = this.loadComponentData.bind(this);
    this.conditionData = this.conditionData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.renderJobs = this.renderJobs.bind(this);
    this.renderQas = this.renderQas.bind(this);
  }

  componentDidMount() {
    this.loadComponentData();
  }

  loadComponentData() {
    fetch(`http://127.0.0.1:19001/api/companies/${this.props.companyId}`)
    .then(response => response.json())
    .then(resJSON => resJSON ? this.conditionData(resJSON) : console.log("server error - 0", resJSON))
    .catch(err => console.log("Error here 1: ", err));
  }

  conditionData(resJSON) {
    let jobs = resJSON.jobs.map(data => {
      return {
        ...data._source.pin,
        tags: data._source.pin.search_text.split(' ')
      };
    });
    let state = {
      ...resJSON,
      jobs: jobs
    };
    this.setState(state);
  }

  handleSearch(searchResults) {
    this.setState({ searchResults });
  }

  renderJobs() {
    let jobCount = this.state.jobs.length;
    return this.state.showJobs ?
      this.state.jobs.map((job, index) => <JobRow key={index} job={job} /> ):
      <Text style={styles.summaryInfo}>{jobCount} open positions...</Text>
  }

  renderQas() {
    let qaCount = this.state.questions.length;
    return this.state.showQas ?
      this.state.questions.map((qa, index) => <QaRow key={index} qa={qa} reload={this.loadComponentData} companyId={this.props.companyId} /> ):
      <Text style={styles.summaryInfo}>{qaCount} interview questions...</Text>
  }

  render() {
    return (
      <ScrollView>
        <View style={{minHeight: Dimensions.get('window').height - 40}}>
          <SearchBar handleSearch={this.handleSearch} />
          <Navbar />
          <View style={styles.resultContainer}>
            { this.state.searchResults }
          </View>

          <View style={styles.componentContainer}>
            <Text style={styles.header}>{this.state.companyInfo.name}</Text>
          </View>

          <View style={styles.componentContainer}>
            <Text style={styles.header} onPress={() => this.setState({showJobs: !this.state.showJobs})}>Current Job Openings:</Text>
            <Text style={{position: 'absolute', right: 10, top: 5}} onPress={() => this.setState({showJobs: !this.state.showJobs})}>
              <FontAwesome name={this.state.showJobs ? "chevron-up" : "chevron-down"} size={19} color="white" />
            </Text>
            { this.renderJobs() }
          </View>

          <View style={styles.componentContainer}>
            <Text style={styles.header} onPress={() => this.setState({showQas: !this.state.showQas})}>Interview Questions / Answers:</Text>
            <View style={styles.headerBtnContainer}>
              <NewQuestionForm companyId={this.props.companyId} reload={this.loadComponentData} />
              <FontAwesome name={this.state.showQas ? "chevron-up" : "chevron-down"} style={styles.headerBtn} onPress={() => this.setState({ showQas: !this.state.showQas })} />
            </View>
            { this.renderQas() }
          </View>

        </View>
      </ScrollView>
    );
  }
}

export default CompanyPage;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#004E89',
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  headerBtn: {
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 19
  },
  summaryInfo: {
    padding: 5,
    backgroundColor: '#eee',
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5
  },
  resultContainer: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
    backgroundColor: 'white',
    borderWidth: .5,
    width: Dimensions.get('window').width - 40.5
  },
  componentContainer: {
    marginBottom: 10,
    backgroundColor: 'white'
  },
  headerBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingBottom: 5,
    position: 'absolute',
    right: 10,
    top: 5
  }
});
