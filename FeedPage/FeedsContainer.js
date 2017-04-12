import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CourseFeedRow from './CourseFeedRow.js';
import ResumeReviewFeedRow from './ResumeReviewFeedRow.js';

class FeedsContainer extends React.Component {
  render() {
    return (
      <View style={styles.componentContainer}>
        { this.props.courseFeeds.map(feed => <CourseFeedRow key={feed.id} feed={feed} />) }
        { this.props.resumeReviewFeeds.map(feed => <ResumeReviewFeedRow key={feed.id} feed={feed} />) }
        { !this.props.courseFeeds[0] && !this.props.resumeReviewFeeds[0] &&
          <Text style={styles.textBtn} onPress={() => Actions.InstPage({ instId: this.props.instId })}>
            To get updates, click here to select and subscribe to at least one course.
          </Text>
        }
      </View>
    );
  }
}

export default FeedsContainer;

const styles = StyleSheet.create({
  componentContainer: {
    marginBottom: 10
  },
  textBtn: {
    padding: 5,
    textAlign: 'center',
    color: '#004E89'
  }
});
