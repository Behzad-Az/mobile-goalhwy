import React from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import PageLoadError from '../Partials/PageLoadError.js';
import TopRow from './TopRow.js';
import CourseReviewsContainer from './CourseReviewsContainer.js';

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
      dataLoaded: false,
      pageError: false,
      courseInfo: {
        id: this.props.courseId
      },
      courseReviews: [],
      sortedBy: '',
      profs: []
    };
    this._loadComponentData = this._loadComponentData.bind(this);
    this._conditionData = this._conditionData.bind(this);
    this._renderPageAfterData = this._renderPageAfterData.bind(this);
  }

  componentDidMount() {
    this._loadComponentData();
  }

  _loadComponentData() {
    fetch(`http://127.0.0.1:19001/api/courses/${this.state.courseInfo.id}/reviews`, {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(resJSON => this._conditionData(resJSON))
    .catch(() => this.setState({ dataLoaded: true, pageError: true }));
  }

  _conditionData(resJSON) {
    if (resJSON) {
      resJSON.dataLoaded = true;
      this.setState(resJSON);
    } else {
      throw 'Server returned false';
    }
  }

  _renderPageAfterData() {
    if (this.state.dataLoaded && this.state.pageError) return <PageLoadError />;
    else if (this.state.dataLoaded) return (
      <View>
        <TopRow courseReviews={this.state.courseReviews} />
        <CourseReviewsContainer
          courseReviews={this.state.courseReviews}
          profs={this.state.profs}
          reload={this._loadComponentData}
          courseId={this.state.courseInfo.id}
        />
      </View>
    );
    else return <ActivityIndicator animating={true} style={{height: 80}} size='large' color='#004E89' />;
  }

  render() {
    return (
      <ScrollView>
        <View style={{marginTop: 89, minHeight: Dimensions.get('window').height - 89, backgroundColor: '#ddd', paddingTop: 5 }}>
          { this._renderPageAfterData() }
        </View>
      </ScrollView>
    );
  }
}

export default CourseReviewPage;
