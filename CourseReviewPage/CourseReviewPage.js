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
    this.sortOptions = [
      { value: 'date_new_to_old', label: 'Date - New to Old' },
      { value: 'date_old_to_new', label: 'Date - Old to New' },
      { value: 'rating_high_to_low', label: 'Rating - High to Low' },
      { value: 'rating_low_to_high', label: 'Rating - Low to High' },
      { value: 'instructor_name', label: 'Instructor Name' }
    ];
    this.state = {
      courseInfo: {},
      courseReviews: [],
      sortedBy: '',
      profs: []
    };
    this.loadComponentData = this.loadComponentData.bind(this);
    this.sortReviews = this.sortReviews.bind(this);
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

  sortReviews(sortedBy) {
    switch(sortedBy) {
      case "date_new_to_old":
        this.state.courseReviews.sort((a, b) => a.review_created_at < b.review_created_at ? 1 : -1);
        break;
      case "date_old_to_new":
        this.state.courseReviews.sort((a, b) => a.review_created_at > b.review_created_at ? 1 : -1);
        break;
      case "rating_high_to_low":
        this.state.courseReviews.sort((a, b) => a.overall_rating < b.overall_rating ? 1 : -1);
        break;
      case "rating_low_to_high":
        this.state.courseReviews.sort((a, b) => a.overall_rating > b.overall_rating ? 1 : -1);
        break;
      case "instructor_name":
        this.state.courseReviews.sort((a, b) => a.name > b.name ? 1 : -1);
        break;
      default:
        break;
    };
    this.setState({ sortedBy });
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
                <SortSelect handleSelect={this.sortReviews} options={this.sortOptions} />
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
