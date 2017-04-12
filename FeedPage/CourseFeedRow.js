import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

class CourseFeedRow extends React.Component {
  constructor(props) {
    super(props);
    this._determineIcon = this._determineIcon.bind(this);
  }

  _determineIcon() {
    if (this.props.feed.doc_id) return 'file-text';
    else if (this.props.feed.tutor_log_id) return 'slideshare';
    else return 'question-circle-o';
  }

  render() {

    return (
      <View style={styles.feedContainer}>
        <View style={styles.dividedRow}>
          <View style={{flex: 1, padding: 5}}>
            <FontAwesome name={this._determineIcon()} style={styles.iconStyle} />
          </View>
          <View style={{flex: 6, padding: 5}}>
            <Text style={styles.headerText}>@{this.props.feed.short_display_name} - New Document!</Text>
            <Text style={styles.contentText}>{this.props.feed.content}</Text>
            <Text style={styles.posterText}>By "{this.props.feed.commenter_name}" on {this.props.feed.created_at.slice(0, 10)}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default CourseFeedRow;

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
