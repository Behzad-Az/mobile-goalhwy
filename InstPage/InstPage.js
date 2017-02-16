import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput
} from 'react-native';

import Navbar from '../Navbar/Navbar.js';
import CourseRow from './CourseRow.js';

class InstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instId: 1,
      userId: '',
      instList: [],
      currInstCourses: [],
      currUserCourseIds: []
    };
    this.conditionData = this.conditionData.bind(this);
    this.findInstName = this.findInstName.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
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
    .then(() => fetch(`http://127.0.0.1:19001/api/institutions/${this.state.instId}`))
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

  findInstName() {
    let inst = this.state.instList.find(inst => inst.id == this.state.instId);
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
        <Navbar navigator={this.props.navigator} />
        <Text style={styles.header}>{this.findInstName()}</Text>
        <TextInput
          style={styles.filterBox}
          onChangeText={text => this.handleFilter(text)}
          placeholder="Search courses here..."
        />
        { slicedArr.map((course, index) => <CourseRow key={index} course={course} currUserCourseIds={this.state.currUserCourseIds} userId={this.state.userId} />) }
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
  filterBox: {
    marginTop: 5,
    marginBottom: 5,
    height: 45,
    paddingLeft: 10,
    paddingRight: 10
  }
});
