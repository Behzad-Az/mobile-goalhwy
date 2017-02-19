import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { FontAwesome } from '@exponent/vector-icons';

class SearhBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.conditionData = this.conditionData.bind(this);
  }

  handleSearch(query) {
    if (query.length > 2) {
      fetch('http://127.0.0.1:19001/api/searchbar', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })
      .then(response => response.json())
      .then(resJSON => resJSON ? this.conditionData(resJSON) : console.log("Error in server - 0: ", resJSON))
      .catch(err => console.log("Error here: ", err));
    } else {
      this.props.handleSearch([]);
    }
  }

  conditionData(resJSON) {
    let searchResults = [];
    if (resJSON.length) {
      resJSON.forEach((result, index) => {
        switch (result._type) {
          case "document":
            searchResults.push(
              <TouchableHighlight key={index} onPress={() => Actions.DocPage({ courseId: result._source.course_id, docId: result._source.id })}>
                <View style={styles.searchRowContainer}>
                  <Text style={styles.searchRow}><FontAwesome name="file-text" size={19} color="#004E89" /></Text>
                  <Text style={styles.searchRow}>{result._source.course_name}</Text>
                  <Text style={styles.searchRow}><FontAwesome name="arrow-right" size={19} color="#004E89" /></Text>
                  <Text style={styles.searchRow}>{result._source.title}</Text>
                </View>
              </TouchableHighlight>
              );
            break;
          case "course":
            searchResults.push(
              <TouchableHighlight key={index} onPress={() => Actions.CoursePage({ courseId: result._source.id })}>
                <View style={styles.searchRowContainer}>
                  <Text style={styles.searchRow}><FontAwesome name="users" size={19} color="#004E89" /></Text>
                  <Text style={styles.searchRow}>{result._source.title}</Text>
                </View>
              </TouchableHighlight> );
            break;
          case "institution":
            searchResults.push(
              <TouchableHighlight key={index} onPress={() => Actions.InstPage({ instId: result._source.id })}>
                <View style={styles.searchRowContainer}>
                  <Text style={styles.searchRow}><FontAwesome name="graduation-cap" size={19} color="#004E89" /></Text>
                  <Text style={styles.searchRow}>{result._source.inst_name}</Text>
                </View>
              </TouchableHighlight> );
            break;
          case "company":
            searchResults.push(
              <TouchableHighlight key={index} onPress={() => Actions.InstPage({ instId: 1 })}>
                <View style={styles.searchRowContainer}>
                  <Text style={styles.searchRow}><FontAwesome name="briefcase" size={19} color="#004E89" /></Text>
                  <Text style={styles.searchRow}>{result._source.company_name}</Text>
                </View>
              </TouchableHighlight> );
            break;
        };
      });
    } else {
      searchResults.push(<Text key={1}>No results matching...</Text>);
    }
    this.props.handleSearch(searchResults);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={query => this.handleSearch(query)}
          placeholder="search the app"
          underlineColorAndroid="rgba(0,0,0,0)"
        />
      </View>
    );
  }
}

export default SearhBar;

const vw = percentageWidth => Dimensions.get('window').width * (percentageWidth / 100);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#004E89'
  },
  textInput: {
    height: 30,
    backgroundColor: 'white',
    paddingRight: 5,
    paddingLeft: 5,
    borderWidth: .5,
    borderColor: '#aaa'
  },
  searchRowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    width: Dimensions.get('window').width - 40
  },
  searchRow: {
    paddingRight: 5,
    color: '#004E89'
  }
});