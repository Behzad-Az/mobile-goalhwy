import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';

import Navbar from '../Navbar/Navbar.js';
import SearchBar from '../Partials/SearchBar.js';
import IndexRow from './IndexRow.js';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      updates: '',
      instId: '',
      searchResults: []
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
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
    .then(() => fetch('http://127.0.0.1:19001/api/home'))
    .then(response => response.json())
    .then(resJSON => this.setState(resJSON))
    .catch(err => console.log("Error here: ", err));
  }

  handleSearch(searchResults) {
    this.setState({ searchResults });
  }

  render() {
    return (
      <ScrollView>
        <SearchBar handleSearch={this.handleSearch}/>
        <Navbar />
        <View style={styles.resultContainer}>
          { this.state.searchResults }
        </View>
        <Text style={styles.header}>My Courses:</Text>
        { this.state.courses.map((course, index) => <IndexRow key={index} course={course} />) }
      </ScrollView>
    );
  }
}

export default IndexPage;

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
    top: 40,
    left: 10,
    zIndex: 1,
    backgroundColor: 'white',
    borderWidth: .5
  }
});
