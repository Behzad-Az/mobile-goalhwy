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
import SortModal from '../Partials/ModalSelect.js';
import TopRow from './TopRow.js';
import CourseReviewRow from './CourseReviewRow.js';
import NewCoureReviewForm from './NewCourseReviewForm.js';

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
      showReviews: false,
      courseInfo: {},
      courseReviews: [],
      sortedBy: '',
      profs: [],
      searchResults: []
    };
    this.loadComponentData = this.loadComponentData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  handleSearch(searchResults) {
    this.setState({ searchResults });
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

  renderReviews() {
    let reviewCount = this.state.courseReviews.length;
    let lastUpdate = reviewCount ? this.state.courseReviews[0].review_created_at.slice(0, 10) : '';
    return this.state.showReviews ?
      this.state.courseReviews.map((review, index) => <CourseReviewRow key={index} review={review} />) :
      <Text style={styles.summaryInfo}>{reviewCount} review(s)... last update on {lastUpdate}</Text>
  }

  render() {
    return (
      <ScrollView>
        <View style={{minHeight: Dimensions.get('window').height - 40}}>
          <SearchBar handleSearch={this.handleSearch} />
          <Navbar />
          <View style={styles.resultContainer}>
            { this.state.searchResults }
          </View>
          <TopRow courseReviews={this.state.courseReviews} />
          <View style={{marginTop: 10}}>
            <Text style={styles.header} onPress={() => this.setState({showReviews: !this.state.showReviews})}>Reviews:</Text>
            <View style={{position: 'absolute', right: 5, top: 5}}>
              <View style={[styles.dividedRow, {width: 120}]}>
                <View style={{flex: 3}}>
                  <SortModal
                    options={this.sortOptions}
                    handleSelect={this.sortReviews}
                    btnContent={{ type: 'icon', name: 'sort-amount-desc', size: 13, color: "#004E89"}}
                    style={styles.sortBtn}
                  />
                </View>
                <View style={{flex: 3}}>
                  <NewCoureReviewForm profs={this.state.profs.map(prof => prof.name)} courseId={this.state.courseInfo.id} reload={this.loadComponentData} />
                </View>
                <View style={{flex: 2}}>
                  <Text style={[styles.headerBtn, {textAlign: 'right'}]} onPress={() => this.setState({showReviews: !this.state.showReviews})}>
                    <FontAwesome name={this.state.showReviews ? "chevron-up" : "chevron-down"} size={19} color="white" />
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{backgroundColor: 'white'}}>
            { this.renderReviews() }
          </View>
        </View>
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
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center'
  },
  sortBtn: {
    backgroundColor: 'white',
    paddingBottom: 3,
    paddingTop: 3,
    borderRadius: 5,
    textAlign: 'center',
    width: 30
  },
  summaryInfo: {
    padding: 5,
    backgroundColor: '#eee',
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5
  },
  resultContainer: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
    backgroundColor: 'white',
    borderWidth: .5,
    width: Dimensions.get('window').width - 40.5
  }
});
