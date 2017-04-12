import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

class ResumeReviewFeedRow extends React.Component {
  render() {
    return (
      <View style={styles.feedContainer}>
        <View style={styles.dividedRow}>
          <View style={{flex: 1, padding: 5}}>
            <FontAwesome name='question-circle-o' style={styles.iconStyle} />
          </View>
          <View style={{flex: 6, padding: 5}}>
            <Text style={styles.headerText}>@{this.props.feed.owner_name} - Resume Review Request</Text>
            <Text style={styles.contentText}>{this.props.feed.additional_info}</Text>
            <Text style={styles.posterText}>Posted on {this.props.feed.created_at.slice(0, 10)}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ResumeReviewFeedRow;

const styles = StyleSheet.create({
  feedContainer: {
    marginBottom: 5,
    backgroundColor: 'white',
    borderTopWidth: .5,
    borderBottomWidth: .5,
    borderColor: '#004E89'
  },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconStyle: {
    fontSize: 35,
    color: '#004E89',
    textAlign: 'center'
  },
  headerText: {
    color: '#004E89',
    fontWeight: 'bold',
    paddingBottom: 5
  },
  contentText: {
    paddingBottom: 5
  },
  posterText: {
    fontSize: 10,
    paddingBottom: 5
  }
});
