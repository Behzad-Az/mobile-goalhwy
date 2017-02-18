import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  DatePickerAndroid,
  Picker
} from 'react-native';

import Navbar from '../Navbar/Navbar.js';
import TopRow from './TopRow.js';
import CourseReviewRow from './CourseReviewRow.js';
import NewCoureReviewForm from './NewCourseReviewForm.js';
import SortSelect from './SortSelect.js';

import { FontAwesome } from '@exponent/vector-icons';

class CourseReviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInfo: {},
      courseReviews: [],
      profs: []
    };
    this.loadComponentData = this.loadComponentData.bind(this);
  }

  componentDidMount() {
    this.loadComponentData();
  }

  loadComponentData() {
    fetch(`http://127.0.0.1:19001/api/courses/${this.props.courseId}/reviews`)
    .then(response => response.json())
    .then(resJSON => resJSON ? this.setState(resJSON) : console.error("server error - 0", resJSON))
    .catch(err => console.log("Error here: ", err));
  }

  render() {
    return (
      <ScrollView>
        <Navbar navigator={this.props.navigator} />
        <TopRow courseReviews={this.state.courseReviews} />
        <View>
          <Text style={styles.header} onPress={this.testing}>Reviews:</Text>
          <View style={{position: 'absolute', right: 5, top: 5}}>

            <View style={[styles.dividedRow, {width: 80}]}>

              <View style={{flex: 1}}>

                <SortSelect />

              </View>

              <View style={{flex: 1}}>
                <NewCoureReviewForm profs={this.state.profs.map(prof => prof.name)} courseId={this.state.courseInfo.id} reload={this.loadComponentData} />
              </View>



            </View>

          </View>
        </View>
        { this.state.courseReviews.map((review, index) => <CourseReviewRow key={index} review={review} />) }
      </ScrollView>
    );
  }
}

export default CourseReviewPage;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#004E89',
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerBtn: {
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 3,
    paddingTop: 3,
    borderRadius: 5,
    textAlign: 'center',
    marginLeft: 5,
    maxHeight: 20,
    width: 30
  }
});
