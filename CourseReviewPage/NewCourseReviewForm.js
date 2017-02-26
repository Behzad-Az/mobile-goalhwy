import React from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  TextInput,
  DatePickerAndroid,
  TouchableHighlight
} from 'react-native';

import RadioInput from '../Partials/RadioInput.js';
import AutoCompleteTextInput from '../Partials/AutoCompleteTextInput.js';
import AndroidDatePicker from '../Partials/AndroidDatePicker';

import { FontAwesome } from '@exponent/vector-icons';

class NewCourseReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.workLoadOptions = [{label: 'Too Much', value: 1}, {label: 'Too Little', value: 2}, {label: 'Fair', value: 3}];
    this.evalOptions = [{label: 'Too Hard', value: 1}, {label: 'Too Easy', value: 2}, {label: 'Fair', value: 3}];
    this.profOptions = [{label: 'Not Good', value: 1}, {label: 'Below Average', value: 2}, {label: 'Average', value: 3}, {label: 'Above Average', value: 4}, {label: 'Excellent!', value: 5}];
    this.state = {
      modalVisible: false,
      startMonth: '',
      startYear: '',
      workLoadRating: '',
      fairnessRating: '',
      profRating: '',
      overallRating: '',
      reviewDesc: '',
      profName: '',
      descBoxHeight: 150
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleProfAutoSuggest = this.handleProfAutoSuggest.bind(this);
    this.handleNewReview = this.handleNewReview.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleRadioChange(type, value) {
    let obj = {};
    obj[type] = value;
    this.setState(obj)
  }

  handleProfAutoSuggest(profName) {
    this.setState({ profName });
  }

  showPicker = async (stateKey, options) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ startYear: year, startMonth: months[month] });
      }
    } catch ({code, message}) {
      console.log(`Error in example '${stateKey}': `, message);
    }
  };

  handleNewReview() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let data = {
      start_year: this.state.startYear,
      start_month: this.state.startMonth,
      workload_rating: this.state.workLoadRating,
      fairness_rating: this.state.fairnessRating,
      prof_rating: this.state.profRating,
      overall_rating: this.state.overallRating,
      review_desc: this.state.reviewDesc,
      prof_name: this.state.profName,
    };
    fetch(`http://127.0.0.1:19001/api/courses/${this.props.courseId}/reviews`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(resJSON => resJSON ? this.props.reload() : console.log("Error in server - 0: NewCourseReviewForm.js: ", resJSON))
    .catch(err => console.log("Error here: NewCourseReviewForm.js: ", err));
    this.setModalVisible(false);
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

            <Text style={styles.modalHeader}>New Course Review:</Text>

            <View style={styles.inputContainer}>
              <TouchableHighlight
                hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
                style={{position: 'absolute', right: 10, top: 10, zIndex: 1}}
                onPress={this.showPicker.bind(this, 'spinner', {date: new Date(), minDate: new Date(2007, 1, 1),
                maxDate: new Date(), mode: 'spinner'})}>
                <FontAwesome name="calendar" size={30} color="black" />
              </TouchableHighlight>
              <Text style={styles.inputLabel}>When did you start?</Text>
              <Text style={styles.textInput}>{this.state.startMonth} {this.state.startYear}</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, {paddingBottom: 5}]}>How was the workload?</Text>
              <RadioInput handleRadioChange={this.handleRadioChange} type="workLoadRating" options={this.workLoadOptions} horizontal />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, {paddingBottom: 5}]}>How was the evaluation?</Text>
              <RadioInput handleRadioChange={this.handleRadioChange} type="fairnessRating" options={this.evalOptions} horizontal />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, {paddingBottom: 5}]}>How was the instructor?</Text>
              <RadioInput handleRadioChange={this.handleRadioChange} type="profRating" options={this.profOptions} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Overall satisfaction with the course?</Text>
              <View style={[styles.dividedRow, {paddingTop: 5}]}>
                { [1, 2, 3, 4, 5].map(num =>
                  <View key={num} style={{flex: 1}}>
                    <FontAwesome
                      name={this.state.overallRating >= num ? "star" : "star-o"}
                      style={{textAlign: 'center', fontSize: 25}}
                      onPress={() => this.setState({ overallRating: num })} />
                    <Text style={{textAlign: 'center'}}>{num}</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={[styles.inputContainer, {minHeight: 135}]}>
              <Text style={[styles.inputLabel, {paddingBottom: 5}]}>Instructor's name (optional):</Text>
              <AutoCompleteTextInput
                placeholder="We'll auto-suggest some results :)"
                data={this.props.profs}
                handleChange={this.handleProfAutoSuggest}
              />
            </View>

            <View style={[styles.inputContainer, {minHeight: 150}]}>
              <Text style={styles.inputLabel}>Feel free to ellaborate (optional):</Text>
              <TextInput
                style={[styles.textInput, {height: this.state.descBoxHeight}]}
                multiline
                onChangeText={reviewDesc => this.setState({reviewDesc})}
                value={this.state.reviewDesc}
                placeholder="Provide context for your review (optional)..."
                underlineColorAndroid="rgba(0,0,0,0)"
                onContentSizeChange={event => {
                  this.setState({descBoxHeight: event.nativeEvent.contentSize.height});
                }}
              />
            </View>

             <View style={[styles.dividedRow, {marginBottom: 20}]}>
              <View style={[styles.primaryBtnContainer, {marginRight: 5}]}>
                <Text style={styles.primaryBtn} onPress={this.handleNewReview}>
                  Submit
                </Text>
              </View>
              <View style={[styles.primaryBtnContainer, {marginLeft: 5}]}>
                <Text style={styles.primaryBtn} onPress={() => this.setModalVisible(false)}>
                  Cancel
                </Text>
              </View>
            </View>

          </ScrollView>
        </Modal>

        <FontAwesome name="plus" style={this.props.style} onPress={() => this.setModalVisible(true)} />

      </View>
    );
  }

}

export default NewCourseReviewForm;

const styles = StyleSheet.create({
  modalContainer: {
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
  modalHeader: {
    color: '#004E89',
    fontWeight: 'bold',
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#004E89'
  },
  inputContainer: {
    marginBottom: 10,
    padding: 5,
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#aaa'
  },
  inputLabel: {
    color: '#004E89',
    fontWeight: 'bold',
    paddingTop: 2.5
  },
  textInput: {
    minHeight: 30,
    paddingTop: 2.5,
    fontSize: 16
  },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  primaryBtnContainer: {
    backgroundColor: '#004E89',
    flex: 1,
    borderRadius: 5,
    borderColor: '#004E89',
    borderWidth: .5,
    padding: 5
  },
  primaryBtn: {
    color: 'white',
    textAlign: 'center'
  },
});
