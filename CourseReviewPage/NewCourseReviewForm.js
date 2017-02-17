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
import AndroidDatePicker from '../Partials/AndroidDatePicker';
import AutoCompleteTextInput from '../Partials/AutoCompleteTextInput.js';

import { FontAwesome } from '@exponent/vector-icons';

const data = ["Hello", "Hellowwww", "Bye", "goodbye", "Behzad"];

class NewCourseReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.workLoadOptions = [{label: 'Too Much', value: 1}, {label: 'Too Little', value: 2}, {label: 'Fair', value: 3}];
    this.evalOptions = [{label: 'Too Hard', value: 1}, {label: 'Too Easy', value: 2}, {label: 'Fair', value: 3}];
    this.profOptions = [{label: 'Not Good', value: 1}, {label: 'Below Average', value: 2}, {label: 'Average', value: 3}, {label: 'Above Average', value: 4}, {label: 'Excellent!', value: 5}];
    this.state = {
      modalVisible: false,
      start_year: '',
      start_month: '',
      workload_rating: '',
      fairness_rating: '',
      prof_rating: '',
      tempStars: '',
      overall_rating: '',
      review_desc: '',
      prof_name: '',
      descBoxHeight: 200
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

  handleProfAutoSuggest(prof_name) {
    this.setState({ prof_name });
  }

  showPicker = async (stateKey, options) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ start_year: year, start_month: months[month] });
      }
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  handleNewReview() {
    // delete this.state.tempStars;
    // $.ajax({
    //   method: 'POST',
    //   url: `/api/courses/${this.props.courseId}/reviews`,
    //   data: this.state,
    //   success: response => {
    //     if (response) {
    //       this.reactAlert.showAlert("Successfully posted review", "info");
    //       HandleModal('new-course-review-form');
    //       this.props.reload();
    //     } else {
    //       this.reactAlert.showAlert("error in posting review", "error");
    //     }
    //   }
    // });
  }

  render() {
    console.log("i'm here 2: ", this.state.prof_name);
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <ScrollView style={styles.modalContainer}>

            <Text style={styles.modalHeader}>New Course Review:</Text>

            <View style={styles.inputCotainer}>
              <TouchableHighlight
                hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
                style={{position: 'absolute', right: 10, top: 10}}
                onPress={this.showPicker.bind(this, 'spinner', {date: new Date(), minDate: new Date(2007, 1, 1),
                maxDate: new Date(), mode: 'spinner'})}>
                <Text><FontAwesome name="calendar" size={30} color="black" /></Text>
              </TouchableHighlight>
              <Text style={styles.inputLabel}>When did you start?</Text>
              <Text style={styles.textInput}>{this.state.start_month} {this.state.start_year}</Text>
            </View>

            <View style={styles.inputCotainer}>
              <Text style={styles.inputLabel}>How was the workload?</Text>
              <RadioInput handleRadioChange={this.handleRadioChange} type="workload_rating" options={this.workLoadOptions} />
            </View>

            <View style={styles.inputCotainer}>
              <Text style={styles.inputLabel}>How was the evaluation?</Text>
              <RadioInput handleRadioChange={this.handleRadioChange} type="fairness_rating" options={this.evalOptions} />
            </View>

            <View style={styles.inputCotainer}>
              <Text style={styles.inputLabel}>How was the instructor?</Text>
              <RadioInput handleRadioChange={this.handleRadioChange} type="prof_rating" options={this.profOptions.slice(0, 2)} />
              <RadioInput handleRadioChange={this.handleRadioChange} type="prof_rating" options={this.profOptions.slice(2, 4)} />
              <RadioInput handleRadioChange={this.handleRadioChange} type="prof_rating" options={this.profOptions.slice(4, 5)} />
            </View>







            <View style={[styles.inputCotainer, {minHeight: 150}]}>
              <Text style={styles.inputLabel}>instructor Name (Optional):</Text>
              <AutoCompleteTextInput
                placeholder="instructor name (optional)"
                data={data}
                handleChange={this.handleProfAutoSuggest}
              />
            </View>








            <View style={[styles.inputCotainer, {minHeight: 200}]}>
              <Text style={styles.inputLabel}>Feel free to ellaborate (optional):</Text>
              <TextInput
                style={[styles.textInput, {height: this.state.descBoxHeight}]}
                multiline
                onChangeText={review_desc => this.setState({review_desc})}
                value={this.state.review_desc}
                placeholder="Provide context for your review (optional)..."
                underlineColorAndroid="rgba(0,0,0,0)"
                onContentSizeChange={event => {
                  this.setState({descBoxHeight: event.nativeEvent.contentSize.height});
                }}
              />
            </View>

            <Text onPress={() => this.setModalVisible(false)} style={styles.actionBtn}>
              Go Back
            </Text>

          </ScrollView>
        </Modal>

          <Text style={styles.modalBtn} onPress={() => this.setModalVisible(true)}>
            <FontAwesome name="plus" size={15} color="#004E89" />
          </Text>
      </View>

    );
  }

}

export default NewCourseReviewForm;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 10,
    padding: 10
  },
  modalHeader: {
    color: '#004E89',
    fontWeight: 'bold',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#004E89'
  },
  modalBtn: {
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 3,
    paddingTop: 3,
    borderRadius: 5,
    textAlign: 'center',
    marginLeft: 5,
    maxHeight: 20,
    minWidth: 30
  },
  inputCotainer: {
    marginTop: 10,
    padding: 5,
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#aaa'
  },
  selectContainer: {
    borderWidth: .5,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    borderColor: '#aaa'
  },
  inputLabel: {
    color: '#004E89',
    fontWeight: 'bold',
    marginBottom: 10
  },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  primaryBtn: {
    color: 'white',
    backgroundColor: '#004E89',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    marginRight: 5,
    marginLeft: 5
  },
  uploadBtn: {
    maxWidth: 80,
    maxHeight: 80,
    padding: 5,
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#bbb',
    textAlign: 'center',
    backgroundColor: '#eee'
  },
  textInput: {
    paddingRight: 5,
    paddingLeft: 5
  },
  actionBtn: {
    alignItems: 'center',
    backgroundColor: '#004E89',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    color: 'white',
    fontWeight: 'bold'
  }
});

