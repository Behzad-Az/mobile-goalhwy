import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

import Navbar from '../Navbar/Navbar.js';
import SearchBar from '../Partials/SearchBar.js';
import JobRow from './JobRow.js';
import JobSearchForm from './JobSearchForm.js';

class CareerPage extends React.Component {
  constructor(props) {
    super(props);
    this.userId = this.props.userId || 1;
    this.state = {
      dataLoaded: false,
      pageError: false,
      jobs: [],
      searchResults: []
    };
    this.conditionData = this.conditionData.bind(this);
    this.loadComponentData = this.loadComponentData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.renderPageAfterData = this.renderPageAfterData.bind(this);
  }

  componentDidMount() {
    this.loadComponentData();
  }

  loadComponentData() {
    fetch(`http://127.0.0.1:19001/api/users/${this.userId}/jobs`)
    .then(response => response.json())
    .then(resJSON => this.conditionData(resJSON))
    .catch(err => {
      console.log("Error here: CareerPage.js: ", err);
      this.setState({ dataLoaded: true, pageError: true });
    });
  }

  conditionData(resJSON) {
    if (resJSON) {
      let jobs = resJSON.map(data => {
        return { ...data._source.pin, tags: data._source.pin.search_text.split(' ') };
      });
      this.setState({ jobs, dataLoaded: true });
    } else {
      console.log("Error here: CareerPage.js: ", err);
      this.setState({ dataLoaded: true, pageError: true });
    }
  }

  handleSearch(searchResults) {
    this.setState({ searchResults });
  }

  renderPageAfterData() {
    if (this.state.dataLoaded && this.state.pageError) {
      return (
        <View style={styles.componentContainer}>
          <Text style={{padding: 5, textAlign: 'center'}}>
            <FontAwesome name="exclamation-triangle" size={19}/> Error in loading up the page.
          </Text>
        </View>
      );
    } else if (this.state.dataLoaded) {
      return (
        <View style={{backgroundColor: 'white'}}>
          <JobSearchForm reload={this.loadComponentData} />
          <View style={styles.componentContainer}>
            <Text style={styles.header}>Open Positions:</Text>
            { this.state.jobs.map((job, index) => <JobRow key={index} job={job} />) }
            { !this.state.jobs[0] && <Text style={{padding: 5, textAlign: 'center'}}>No jobs matching your search. Please revise your search criteria.</Text> }
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.componentContainer}>
          <ActivityIndicator
            animating={true}
            style={{height: 80}}
            size={60}
            color="#004E89"
          />
        </View>
      );
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={{minHeight: Dimensions.get('window').height - 40, backgroundColor: 'white'}}>
          <SearchBar handleSearch={this.handleSearch} />
          <Navbar pageName="CareerPage" />
          <View style={styles.resultContainer}>
            { this.state.searchResults }
          </View>

          { this.renderPageAfterData() }

        </View>
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
    fontWeight: 'bold',
    marginBottom: 5
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
  }
});
