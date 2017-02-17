import React from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  TextInput,
  Picker,
  TouchableHighlight
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

class NewCourseReviewForm extends React.Component {
  constructor(props) {
    super(props);
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
      prof_name: ''
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.handleNewReview = this.handleNewReview.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

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

            <View style={[styles.inputCotainer, {minHeight: 200}]}>
              <TextInput
                style={[styles.textInput, {height: this.state.height}]}
                multiline
                onChangeText={issue_desc => this.setState({issue_desc})}
                value={this.state.issue_desc}
                placeholder="How may one of our tutors assist you?"
                underlineColorAndroid="rgba(0,0,0,0)"
                onContentSizeChange={(event) => {
                  this.setState({height: event.nativeEvent.contentSize.height});
                }}
              />
            </View>

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
    fontWeight: 'bold'
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

