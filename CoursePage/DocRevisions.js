import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, TouchableOpacity, View,
        Image, Button } from 'react-native';

import RevisionRow from './RevisionRow.js';

class DocRevisions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleRevisionRequest(courseId, docId, revId) {
    fetch(`http://127.0.0.1:19001/api/courses/${courseId}/docs/${docId}/revisions/${revId}`)
    .then(response => response.json())
    .then(resJSON => console.log("Fetching requested document revision: ", resJSON[0]))
    .catch(err => console.log("Error here: ", err));
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
            <Text style={styles.modalHeader}>Revision Panel:</Text>

            <TouchableOpacity>
              <Text style={styles.primaryBtnText}>Upload New Revision</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)}>
              <Text style={styles.primaryBtnText}>Go back</Text>
            </TouchableOpacity>

            <Text style={styles.modalHeader}>Previous Revisions:</Text>

            { this.props.doc.revisions.map((rev, index) => <RevisionRow key={index} rev={rev} />) }

          </View>
        </Modal>

      <TouchableHighlight onPress={() => this.setModalVisible(true)}>
        <Text style={styles.docBtnText}>{this.props.doc.revisions[0].title}</Text>
      </TouchableHighlight>

      </View>
    );
  }
}

export default DocRevisions;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#ddd',
    margin: 10,
    borderRadius: 10,
    padding: 10
  },
  docBtnText: {
    color: 'white',
    backgroundColor: '#82ABCA',
    borderRadius: 5,
    padding: 5,
    margin: 5
  },
  primaryBtnText: {
    textAlign: 'center',
    padding: 5,
    margin: 5,
    backgroundColor: '#004E89',
    borderRadius: 5,
    color: 'white'
  },
  modalHeader: {
    color: '#004E89',
    fontWeight: 'bold'
  }
});
