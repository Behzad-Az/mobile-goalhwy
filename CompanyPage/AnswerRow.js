import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

class AnswerRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Answer #{this.props.index} | Outcome: {this.props.ans.outcome}</Text>
        <Text style={styles.metaInfo}>Posted On: {this.props.ans.answer_created_at.slice(0, 10)}</Text>
        <Text style={styles.answerText}>{this.props.ans.answer}</Text>
        <FontAwesome name="flag" style={styles.flagBtn} onPress={() => console.log("i'm here FontAwesome pressed")} />
      </View>
    );
  }
}

export default AnswerRow;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: .5,
    padding: 2.5,
    borderColor: '#004E89',
  },
  headerText: {
    padding: 2.5,
    fontWeight: 'bold'
  },
  metaInfo: {
    padding: 2.5,
    fontSize: 11
  },
  answerText: {
    padding: 2.5
  },
  flagBtn: {
    position: 'absolute',
    color: 'black',
    top: 7,
    right: 7,
    fontSize: 14
  }
});

