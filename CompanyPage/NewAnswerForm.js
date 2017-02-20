import React, { Component } from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  TextInput
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';
import OutcomeModal from '../Partials/ModalSelect.js';

class NewQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.outcomeOptions = [
      { value: 'Got the job', label: 'Got the job' },
      { value: 'Unsuccessful', label: 'Unsuccessful' },
      { value: 'Unknown', label: 'Do not know' },
      { value: 'Unknown', label: 'Rather not share' }
    ];
    this.state = {
      modalVisible: false,
      answerBoxHeight: 0,
      answer: '',
      outcome: ''
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.handleNewInterviewQuestion = this.handleNewInterviewQuestion.bind(this);
    this.handleOutcomeSelect = this.handleOutcomeSelect.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleNewInterviewQuestion() {
    let data = { ...this.state };
    delete data.modalVisible;
    delete data.answerBoxHeight;

    fetch(`http://127.0.0.1:19001/api/companies/${this.props.companyId}/questions/${this.props.question.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(resJSON => resJSON ? this.props.reload() : console.log("Error in server, NewQuestionForm.js: ", resJSON))
    .catch(err => console.log("Error here in NewQuestionForm.js: ", err));
    this.setModalVisible(false);
  }

  handleOutcomeSelect(outcome) {
    this.setState({ outcome });
  }

  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <ScrollView style={styles.modalContainer}>
            <Text style={styles.modalHeader}>
              { this.props.question.question.length > 35 ? `${this.props.question.question.slice(0, 35)}... ` : this.props.question.question }
              - New Answer
            </Text>

            <View style={[styles.inputCotainer, {minHeight: 200}]}>
              <Text style={styles.inputLabel}>What was your answer?</Text>
              <TextInput
                style={[styles.textInput, {height: this.state.answerBoxHeight}]}
                multiline
                onChangeText={answer => this.setState({answer})}
                value={this.state.answer}
                placeholder="Summarize your answer here (optional)"
                underlineColorAndroid="rgba(0,0,0,0)"
                onContentSizeChange={event => {
                  this.setState({answerBoxHeight: event.nativeEvent.contentSize.height});
                }}
              />
            </View>

            <View>
              <OutcomeModal
                options={this.outcomeOptions}
                handleSelect={this.handleOutcomeSelect}
                btnContent={{ type: 'text', name: this.state.outcome || 'What was the outcome?' }}
                style={[styles.selectContainer, {color: this.state.outcome ? 'black' : '#004E89', fontWeight: this.state.outcome ? 'normal' : 'bold'}]}
              />
              <FontAwesome name="chevron-down" style={{position: 'absolute', top: 7, right: 7, fontSize: 15, zIndex: -1}} />
            </View>

            <View style={styles.dividedRow}>
              <View style={{flex: 1}}>
                <Text style={[styles.primaryBtn, {marginRight: 5}]} onPress={this.handleNewInterviewQuestion}>
                  Submit
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={[styles.primaryBtn, {marginLeft: 5}]} onPress={() => this.setModalVisible(false)}>
                  Go Back
                </Text>
              </View>
            </View>

          </ScrollView>
        </Modal>

        <Text style={styles.textBtn} onPress={() => this.setModalVisible(true)}>Post New Answer</Text>

      </View>
    );
  }
}

export default NewQuestionForm;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 10,
    padding: 10
  },
  modalHeader: {
    color: '#004E89',
    fontWeight: 'bold',
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#004E89'
  },
  inputCotainer: {
    marginBottom: 10,
    padding: 5,
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#aaa'
  },
  inputLabel: {
    color: '#004E89',
    fontWeight: 'bold',
    paddingTop: 2.5,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 5
  },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  primaryBtn: {
    color: 'white',
    backgroundColor: '#004E89',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center'
  },
  textInput: {
    paddingRight: 5,
    paddingLeft: 5
  },
  headerBtn: {
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 19
  },
  selectContainer: {
    marginBottom: 10,
    borderWidth: .5,
    borderRadius: 5,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    borderColor: '#aaa',
    alignItems: 'center'
  },
  textBtn: {
    fontSize: 14,
    paddingTop: 2.5,
    paddingBottom: 2.5,
    paddingRight: 25,
    color: '#004E89'
  }
});
