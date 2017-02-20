import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions
} from 'react-native';

import Navbar from '../Navbar/Navbar.js';
import SearchBar from '../Partials/SearchBar.js';
import CourseRow from './CourseRow.js';

class InstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      instList: [],
      currInstCourses: [],
      currUserCourseIds: [],
      searchResults: []
    };
    this.conditionData = this.conditionData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.findInstName = this.findInstName.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    fetch(`http://127.0.0.1:19001/api/institutions/${this.props.instId}`)
    .then(response => response.json())
    .then(resJSON => this.conditionData(resJSON))
    .catch(err => console.log("Error here: ", err));
  }

  conditionData(response) {
    response.currInstCourses.forEach(course => course.displayName = `${course.prefix} ${course.suffix} - ${course.course_desc}`);
    response.instList.forEach(inst => {
      inst.displayName = inst.inst_short_name ? inst.inst_long_name + ` (${inst.inst_short_name})` : inst.inst_long_name;
    });
    this.fixedCurrInstCourses = response.currInstCourses;
    this.dataLoaded = true;
    this.setState(response);
  }

  handleSearch(searchResults) {
    this.setState({ searchResults });
  }

  findInstName() {
    let inst = this.state.instList.find(inst => inst.id == this.props.instId);
    return inst ? inst.displayName : '';
  }

  handleFilter(text) {
    let phrase = new RegExp(text.toLowerCase());
    let currInstCourses = this.fixedCurrInstCourses.filter(course => course.displayName.toLowerCase().match(phrase));
    this.setState({ currInstCourses });
  }

  render() {
    let slicedArr = this.state.currInstCourses.slice(0, 19);
    return (
      <ScrollView>
        <View style={{minHeight: Dimensions.get('window').height - 40, backgroundColor: 'white'}}>
          <SearchBar handleSearch={this.handleSearch} />
          <Navbar navigator={this.props.navigator} />
          <View style={styles.resultContainer}>
            { this.state.searchResults }
          </View>

          <View style={styles.componentContainer}>
            <Text style={styles.header}>{this.findInstName()}</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.handleFilter(text)}
              placeholder="Search courses here..." />
            { slicedArr.map((course, index) => <CourseRow key={index} course={course} currUserCourseIds={this.state.currUserCourseIds} userId={this.state.userId} />) }
            { !slicedArr[0] && <Text style={{padding: 5}}>No matching course was found...</Text> }
          </View>

        </View>
      </ScrollView>
    );
  }
}

export default InstPage;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#004E89',
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  textInput: {
    marginBottom: 5,
    marginTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: .5,
    borderColor: '#aaa',
    borderRadius: 5
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
