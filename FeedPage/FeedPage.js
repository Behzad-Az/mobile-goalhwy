import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { FontAwesome } from '@exponent/vector-icons';
import CourseFeedRow from './CourseFeedRow.js';
import ResumeReviewFeedRow from './ResumeReviewFeedRow.js';

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      pageError: false,
      resumeReviewFeeds: [],
      courseFeeds: [],
      instId: ''
    };
    this._conditionData = this._conditionData.bind(this);
    this._renderPageAfterData = this._renderPageAfterData.bind(this);
  }

  componentDidMount() {
    fetch('http://127.0.0.1:19001/api/users/currentuser/feed', {
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
    if (this.state.dataLoaded && this.state.pageError) {
      return (
        <Text style={{padding: 5, textAlign: 'center'}}>
          <FontAwesome name="exclamation-triangle" size={19}/> Error in loading up the page.
        </Text>
      );
    } else if (this.state.dataLoaded) {
      return (
        <View style={styles.componentContainer}>
          { this.state.courseFeeds.map(feed => <CourseFeedRow key={feed.id} feed={feed} />) }
          { this.state.resumeReviewFeeds.map(feed => <ResumeReviewFeedRow key={feed.id} feed={feed} />) }
          { !this.state.courseFeeds[0] &&
            <Text style={styles.textBtn} onPress={() => Actions.InstPage({ instId: this.state.instId })}>
              To get updates, click here to select and subscribe to at least one course.
            </Text> }
        </View>
      );
    } else {
      return <ActivityIndicator animating={true} style={{height: 80}} size="large" color="#004E89" />;
    }
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

export default FeedPage;

const styles = StyleSheet.create({
  textBtn: {
    padding: 5,
    textAlign: 'center',
    color: '#004E89'
  },
  componentContainer: {
    marginBottom: 10,
  }
});
