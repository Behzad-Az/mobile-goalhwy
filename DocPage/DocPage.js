import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

import Navbar from '../Navbar/Navbar.js';
import SearchBar from '../Partials/SearchBar.js';
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
      },
      searchResults: []
    };
    this.loadComponentData = this.loadComponentData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.loadComponentData(this.state.courseInfo.id, this.state.doc.id);
  }

  loadComponentData(courseId, docId) {
    fetch(`http://127.0.0.1:19001/api/courses/${courseId}/docs/${docId}`)
    .then(response => response.json())
    .then(resJSON => resJSON ? this.setState(resJSON) : console.log("server error - 0", resJSON))
    .catch(err => console.log("Error here: ", err));
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

          <View style={styles.componentContainer}>
            <Text style={styles.header}>{this.state.doc.title}</Text>
            <TopRow courseInfo={this.state.courseInfo} />
          </View>

          <View style={styles.componentContainer}>
            <Text style={styles.header}>Revisions:</Text>
            { this.state.doc.revisions.map((rev, index) => <RevisionRow key={index} rev={rev} />) }
            { !this.state.doc.revisions[0] && <Text style={{padding: 5}}>No revision could be found...</Text> }
          </View>
        </View>
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
