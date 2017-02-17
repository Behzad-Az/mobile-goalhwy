import React, { Component } from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  TextInput,
  Picker
} from 'react-native';

import { ImagePicker } from 'exponent';
import { FontAwesome } from '@exponent/vector-icons';

class NewAssistForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      height: 0,
      issue_desc: '',
      assistReqOpen: false,
      closureReason: ''
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.formFooterOptions = this.formFooterOptions.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  validateForm() {
    return this.state.issue_desc &&
           this.state.issue_desc.length <= 400
  }

  formFooterOptions() {
    if (this.state.assistReqOpen) {
      return (
        <View>
          <View style={styles.selectContainer}>
            <Picker
              selectedValue={this.state.closureReason}
              onValueChange={closureReason => this.setState({closureReason})}
              style={{color: '#004E89'}}>
              <Picker.Item label="Close the issue?" value="" />
              <Picker.Item label="Resolved on my own" value="Resolved on my own" />
              <Picker.Item label="Resolved with tutor" value="Resolved with tutor" />
              <Picker.Item label="No longer needed" value="No longer needed" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          <View style={[styles.dividedRow, {marginTop: 10}]}>
            <View style={{flex: 1}}>
              <Text onPress={() => this.setModalVisible(!this.state.modalVisible)} style={[styles.actionBtn, {marginRight: 5}]}>
                Update
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text onPress={() => this.setModalVisible(!this.state.modalVisible)} style={[styles.actionBtn, {marginLeft: 5}]}>
                Go Back
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.dividedRow, {marginTop: 10}]}>
          <View style={{flex: 1}}>
            <Text onPress={() => this.setModalVisible(!this.state.modalVisible)} style={[styles.actionBtn, {marginRight: 5}]}>
              Submit
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text onPress={() => this.setModalVisible(!this.state.modalVisible)} style={[styles.actionBtn, {marginLeft: 5}]}>
              Go Back
            </Text>
          </View>
        </View>
      );
    }
  }


  handleNewDocPost() {
    console.log("i'm here 1: ", this.state);
    // $.ajax({
    //   method: 'POST',
    //   url: `/api/courses/${this.props.courseId}`,
    //   data: this.state,
    //   success: response => {
    //     if (response) {
    //       this.reactAlert.showAlert("New document saved", "info");
    //       HandleModal('new-doc-form');
    //       this.props.reload(this.props.courseId);
    //     } else {
    //       this.reactAlert.showAlert("error in uploading document", "error");
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
            <Text style={styles.modalHeader}>Request Assistance:</Text>

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

            { this.formFooterOptions() }

          </ScrollView>
        </Modal>
        <Text style={styles.primaryBtn} onPress={() => this.setModalVisible(true)}>
          <FontAwesome name="bell" size={19} color="white" />
        </Text>
      </View>
    );
  }
}

export default NewAssistForm;

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
