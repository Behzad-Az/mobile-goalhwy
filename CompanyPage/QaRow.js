import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

import AnswerRow from './AnswerRow.js';

class QaRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flagRequest: false,
      flagReason: '',
      showAnswers: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.questionText}>{this.props.qa.question}</Text>
        <Text style={styles.metaInfo}>Posted On: {this.props.qa.question_created_at.slice(0, 10)}</Text>
        <Text style={styles.metaInfo}>Like Count: {this.props.qa.like_count}</Text>
        <View style={styles.btnContainer}>
          <Text style={styles.textBtn} onPress={() => this.setState({ showAnswers: !this.state.showAnswers })}>{this.state.showAnswers ? "Hide Answers" : "Show Answers"}</Text>
          <Text style={styles.textBtn}>Post New Answer</Text>
          <FontAwesome name="flag" style={[styles.textBtn, {color: 'black'}]} />
        </View>

        { this.state.showAnswers && this.props.qa.answers.map((ans, index) => <AnswerRow key={index} ans={ans} index={index + 1} /> )}

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
  },
  questionText: {
    padding: 2.5,
    fontWeight: 'bold'
  },
  metaInfo: {
    padding: 2.5,
    fontSize: 11
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 2.5
  },
  textBtn: {
    fontSize: 14,
    paddingTop: 2.5,
    paddingBottom: 2.5,
    paddingRight: 25,
    color: '#004E89'
  }
});

