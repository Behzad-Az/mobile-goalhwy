import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SortModal from '../Partials/ModalSelect.js';
import NewCoureReviewForm from './NewCourseReviewForm.js';
import CourseReviewRow from './CourseReviewRow.js';

class CourseReviewsContainer extends React.Component {
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
      sortedBy: ''
    };
    this._sortReviews = this._sortReviews.bind(this);
  }

  _sortReviews(sortedBy) {
    switch(sortedBy) {
      case 'date_new_to_old':
        this.props.courseReviews.sort((a, b) => a.review_created_at < b.review_created_at ? 1 : -1);
        break;
      case 'date_old_to_new':
        this.props.courseReviews.sort((a, b) => a.review_created_at > b.review_created_at ? 1 : -1);
        break;
      case 'rating_high_to_low':
        this.props.courseReviews.sort((a, b) => a.overall_rating < b.overall_rating ? 1 : -1);
        break;
      case 'rating_low_to_high':
        this.props.courseReviews.sort((a, b) => a.overall_rating > b.overall_rating ? 1 : -1);
        break;
      case 'instructor_name':
        this.props.courseReviews.sort((a, b) => a.name > b.name ? 1 : -1);
        break;
      default:
        break;
    };
    this.setState({ sortedBy });
  }

  render() {
    return (
      <View style={styles.componentContainer}>
        <Text style={styles.headerText}>Reviews:</Text>
        <View style={styles.headerBtnContainer}>
          <SortModal
            options={this.sortOptions}
            handleSelect={this._sortReviews}
            btnContent={{ type: 'icon', name: 'sort-amount-desc'}}
            style={styles.headerBtn}
          />
          <NewCoureReviewForm
            profs={this.props.profs.map(prof => prof.name)}
            courseId={this.props.courseId}
            reload={this.props.reload}
            style={styles.headerBtn}
          />
        </View>
        { this.props.courseReviews.map(review => <CourseReviewRow key={review.id} review={review} />) }
        { !this.props.courseReviews[0] && <Text>No review is posted for this course yet.</Text> }
      </View>

    );
  }
}

export default CourseReviewsContainer;

const styles = StyleSheet.create({
  headerText: {
    backgroundColor: '#004E89',
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  componentContainer: {
    marginBottom: 10
  },
  headerBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: '#004E89'
  },
  headerBtn: {
    paddingLeft: 7,
    paddingRight: 7,
    textAlign: 'center',
    color: 'white',
    fontSize: 19
  }
});
