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
import JobRow from './JobRow.js';
import JobSearchForm from './JobSearchForm.js';

class CareerPage extends React.Component {
  constructor(props) {
    super(props);
    this.userId = this.props.userId || 1;
    this.state = {
      jobs: [],
      searchResults: []
    };
    this.conditionData = this.conditionData.bind(this);
    this.loadComponentData = this.loadComponentData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  handleSearch(searchResults) {
    this.setState({ searchResults });
  }

  render() {
    return (
      <ScrollView>
        <View style={{minHeight: Dimensions.get('window').height - 40, backgroundColor: 'white'}}>
          <SearchBar handleSearch={this.handleSearch} />
          <Navbar />
          <View style={styles.resultContainer}>
            { this.state.searchResults }
          </View>
          <JobSearchForm reload={this.loadComponentData} />

          <View style={styles.componentContainer}>
            <Text style={styles.header}>Open Positions:</Text>
            { this.state.jobs.map((job, index) => <JobRow key={index} job={job} />) }
            { !this.state.jobs[0] && <Text style={{paddingLeft: 5}}>No jobs matching your search...</Text> }
          </View>

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
    fontWeight: 'bold'
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
