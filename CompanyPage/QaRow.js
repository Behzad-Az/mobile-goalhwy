import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

class QaRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.qa.question}</Text>
        <Text>Posted On: {this.props.qa.question_created_at.slice(0, 10)}</Text>
        <Text>Like Count: {this.props.qa.like_count}</Text>
        <Text>{this.props.qa.question}</Text>
      </View>
    );
  }
}

export default QaRow;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#004E89',
    borderRadius: 5,
    marginTop: 10
  }
});

