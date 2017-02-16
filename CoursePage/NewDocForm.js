import React, { Component } from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  Image,
  TextInput,
  Picker
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

class NewDocForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      title: '',
      type: '',
      rev_desc: 'New Upload',
      file_path: ''
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleNewDocPost = this.handleNewDocPost.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleChange(e) {
    let state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  validateForm() {
    return this.state.title &&
           this.state.rev_desc &&
           this.state.file_path &&
           this.state.type
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
          <View style={styles.modalContainer}>

            <Text style={styles.modalHeader}>New Document Form:</Text>

            <View style={{marginTop: 20, borderWidth: .5, borderRadius: 5, paddingLeft: 10, paddingRight: 10}}>
              <Text style={styles.inputLabel}>Document Title:</Text>
              <TextInput
                style={{height: 40, paddingRight: 5, paddingLeft: 5}}
                onChangeText={title => this.setState({title})}
                value={this.state.title}
                placeholder="Example: Lab 1 - Electromagnetism"
              />
            </View>

            <View style={{marginTop: 20, borderWidth: .5, borderRadius: 5, paddingLeft: 10, paddingRight: 10}}>
              <Text style={styles.inputLabel}>Revision Comment:</Text>
              <TextInput
                style={{height: 40, paddingRight: 5, paddingLeft: 5}}
                onChangeText={rev_desc => this.setState({rev_desc})}
                value={this.state.rev_desc}
                placeholder="Example: New Upload"
              />
            </View>


            <View style={{marginTop: 20, borderWidth: .5, borderRadius: 5}}>
              <Picker
                selectedValue={this.state.type}
                onValueChange={type => this.setState({type})}
                style={{color: '#004E89'}}>
                <Picker.Item label="Select Type of Document:" value="" />
                <Picker.Item label="Assignment / Report" value="asg_report" />
                <Picker.Item label="Lecture Note" value="lecture_note" />
                <Picker.Item label="Sample Question" value="sample_question" />
              </Picker>
            </View>

            <Text onPress={() => this.setModalVisible(!this.state.modalVisible)}>Go back</Text>

          </View>



        </Modal>

        <Text style={styles.primaryBtn} onPress={() => this.setModalVisible(true)}>
          <FontAwesome name="upload" size={19} color="white" />
        </Text>

      </View>
    );
  }
}

export default NewDocForm;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 10,
    borderRadius: 10,
    padding: 10
  },
  modalHeader: {
    color: '#004E89',
    fontWeight: 'bold',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#004E89'
  },
  inputLabel: {
    color: '#004E89',
    fontWeight: 'bold'
  },
  primaryBtn: {
    color: 'white',
    backgroundColor: '#004E89',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    marginRight: 5,
    marginLeft: 5
  }
});
