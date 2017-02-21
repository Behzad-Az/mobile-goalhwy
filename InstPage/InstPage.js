import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

import Navbar from '../Navbar/Navbar.js';
import SearchBar from '../Partials/SearchBar.js';
import CourseRow from './CourseRow.js';
import ChangeInstForm from './ChangeInstForm.js';
import NewInstForm from './NewInstForm.js';
import NewCourseForm from './NewCourseForm.js';

class InstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      pageError: false,
      currInstId: '',
      userId: '',
      instList: [],
      currInstCourses: [],
      currUserCourseIds: [],
      searchResults: [],
      filterPhrase: ''
    };
    this.loadComponentData = this.loadComponentData.bind(this);
    this.conditionData = this.conditionData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.findInstName = this.findInstName.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.renderPageAfterData = this.renderPageAfterData.bind(this);
  }

  componentDidMount() {
    this.loadComponentData(this.props.instId);
  }

  componentWillReceiveProps(nextProps) {
    this.loadComponentData(nextProps.instId);
  }

  loadComponentData(instId) {
    if (this.state.currInstId !== instId) {
      instId = instId || this.state.currInstId;
      fetch(`http://127.0.0.1:19001/api/institutions/${instId}`)
      .then(response => response.json())
      .then(resJSON => this.conditionData(resJSON, instId))
      .catch(err => {
        console.log("Error here: InstPage.js: ", err);
        this.setState({ dataLoaded: true, pageError: true });
      });
    }
  }

  conditionData(resJSON, instId) {
    if (resJSON) {
      resJSON.currInstId = instId;
      resJSON.currInstCourses.forEach(course => course.displayName = `${course.prefix} ${course.suffix} - ${course.course_desc}`);
      resJSON.instList.forEach(inst => {
        inst.displayName = inst.inst_short_name ? inst.inst_long_name + ` (${inst.inst_short_name})` : inst.inst_long_name;
      });
      resJSON.dataLoaded = true;
      this.setState(resJSON);
    } else {
      console.log("Error here: InstPage.js: ", err);
      this.setState({ dataLoaded: true, pageError: true });
    }
  }

  handleSearch(searchResults) {
    this.setState({ searchResults });
  }

  findInstName() {
    let inst = this.state.instList.find(inst => inst.id == this.state.currInstId);
    return inst ? inst.displayName : '';
  }

  handleFilter(text) {
    let phrase = new RegExp(this.state.filterPhrase.toLowerCase());
    return this.state.currInstCourses.filter(course => course.displayName.toLowerCase().match(phrase)).slice(0, 19);
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
      let slicedArr = this.handleFilter();
      return (
        <View style={styles.componentContainer}>
          <Text style={styles.header}>{this.findInstName()}</Text>
          <View style={styles.headerBtnContainer}>
            <ChangeInstForm instList={this.state.instList} reload={this.loadComponentData} />
            <NewInstForm reload={this.loadComponentData} />
          </View>
          <TextInput
            style={styles.textInput}
            onChangeText={filterPhrase => this.setState({ filterPhrase })}
            placeholder="Search courses here..." />
          { slicedArr.map((course, index) => <CourseRow key={index} course={course} currUserCourseIds={this.state.currUserCourseIds} userId={this.state.userId} />) }
          { !slicedArr[0] && <NewCourseForm instId={this.state.currInstId} reload={this.loadComponentData} /> }
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
          <Navbar navigator={this.props.navigator} />
          <View style={styles.resultContainer}>
            { this.state.searchResults }
          </View>

          { this.renderPageAfterData() }

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
