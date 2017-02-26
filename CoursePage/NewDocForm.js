import React, { Component } from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableHighlight
} from 'react-native';

import { ImagePicker } from 'exponent';
import { FontAwesome } from '@exponent/vector-icons';
import DocTypeSelect from '../Partials/ModalSelect.js';

class NewDocForm extends Component {
  constructor(props) {
    super(props);
    this.docTypeOptions = [
      { value: "asg_report", label: "Assignment / Report" },
      { value: "lecture_note", label: "Lecture Note" },
      { value: "sample_question", label: "Sample Question" }
    ];
    this.state = {
      modalVisible: false,
      title: '',
      type: '',
      typeDisplayName: '',
      rev_desc: 'New Upload',
      file_path: ''
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.handleDocTypeSelect = this.handleDocTypeSelect.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.handleNewDocPost = this.handleNewDocPost.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleDocTypeSelect(type, typeDisplayName) {
    this.setState({ type, typeDisplayName });
  }

  validateForm() {
    return this.state.title &&
           this.state.rev_desc &&
           this.state.file_path &&
           this.state.type
  }

  selectPhotoTapped = async() => {

    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    // let pickerResult = await ImagePicker.launchImageLibraryAsync({
    //   allowsEditing: true,
    //   aspect: [4,3]
    // });
  }

  handleNewDocPost() {
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

            <Text style={styles.modalHeader}>New Document Form:</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Document Title:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={title => this.setState({title})}
                value={this.state.title}
                placeholder="Example: Lab 1 - Electromagnetism"
                underlineColorAndroid="rgba(0,0,0,0)"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, {marginBottom: 5}]}>Upload the Document:</Text>
              <View style={styles.dividedRow}>

                <View style={{flex: 1, alignItems: 'center'}}>
                  <View style={styles.uploadBtnContainer}>
                    <FontAwesome name="files-o" size={40} style={styles.uploadBtn} />
                    <Text style={styles.uploadBtn} onPress={this.selectPhotoTapped}>
                      From Files
                    </Text>
                  </View>
                </View>

                <View style={{flex: 1, alignItems: 'center'}}>
                  <View style={styles.uploadBtnContainer}>
                    <FontAwesome name="camera" size={40} style={styles.uploadBtn} />
                    <Text style={styles.uploadBtn} onPress={this.selectPhotoTapped}>
                      From Camera
                    </Text>
                  </View>
                </View>

              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Revision Comment:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={rev_desc => this.setState({rev_desc})}
                value={this.state.rev_desc}
                placeholder="Example: New Upload"
                underlineColorAndroid="rgba(0,0,0,0)"
              />
            </View>

            <View>
              <DocTypeSelect
                options={this.docTypeOptions}
                handleSelect={this.handleDocTypeSelect}
                btnContent={{ type: 'text', name: this.state.typeDisplayName ? this.state.typeDisplayName : 'Select Document Type' }}
                style={[styles.selectContainer, {color: this.state.typeDisplayName ? 'black' : '#004E89', fontWeight: this.state.typeDisplayName ? 'normal' : 'bold'}]}
              />
              <FontAwesome name="chevron-down" style={{position: 'absolute', top: 5, right: 5, fontSize: 15}} />
            </View>

            <View style={styles.dividedRow}>
              <View style={[styles.primaryBtnContainer, {marginRight: 5}]}>
                <Text style={styles.primaryBtn} onPress={() => this.setModalVisible(false)}>
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

        <TouchableHighlight
          onPress={() => this.setModalVisible(true)}
          style={styles.headerBtnContainer}>
          <FontAwesome name="upload" style={styles.headerBtn} />
        </TouchableHighlight>

      </View>
    );
  }
}

export default NewDocForm;

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
    justifyContent: 'space-between',
    marginBottom: 5
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
  headerBtnContainer: {
    padding: 5,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 5,
    backgroundColor: '#004E89'
  },
  headerBtn: {
    textAlign: 'center',
    fontSize: 19,
    color: 'white'
  },
  uploadBtnContainer: {
    width: 110,
    maxHeight: 80,
    padding: 5,
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#bbb',
    backgroundColor: '#eee'
  },
  uploadBtn: {
    textAlign: 'center',
    paddingTop: 5
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
  }
});
