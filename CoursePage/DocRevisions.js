import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, TouchableOpacity, View, Image, Button } from 'react-native';

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
            <View>
              <Button
                onPress={() => {alert("new revision btn pressed.")}}
                title="Upload New Revision"
                color="#004E89"
                accessibilityLabel="Upload New Revision"
              />
              <Button
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
                title="Go Back"
                color="#004E89"
                accessibilityLabel="Go Back"
              />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button
                onPress={() => {alert("new revision btn pressed.")}}
                title="This looks great!"
                accessibilityLabel="This sounds great!"
              />
              <Button
                onPress={() => {alert("new revision btn pressed.")}}
                title="Ok!"
                color="#841584"
                accessibilityLabel="Ok, Great!"
              />
            </View>

            <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.docBtnText}>Upload New Revision</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)} style={styles.primaryBtn}>
              <Text style={styles.docBtnText}>Go back</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeader}>Previous Revisions:</Text>
            { this.props.doc.revisions.map((rev, index) => {
              return (
                <TouchableOpacity key={index} style={styles.docBtn} onPress={() => this.handleRevisionRequest(this.props.doc.course_id, this.props.doc.id, rev.id) }>
                  <Text style={styles.docBtnText}>
                    <Image source={require('../public/images/pdf-logo.png')}  style={styles.rowImg} />
                    {rev.title} - {rev.rev_desc}
                  </Text>
                </TouchableOpacity>
              ); }
            )}


          </View>
        </Modal>

      <TouchableHighlight onPress={() => this.setModalVisible(true)} style={styles.docBtn}>
        <Text style={styles.docBtnText}>{this.props.doc.revisions[0].title}</Text>
      </TouchableHighlight>

      </View>
    );
  }
}

export default DocRevisions;

const styles = StyleSheet.create({
  docBtn: {
    justifyContent: 'center',
    height: 30,
    paddingLeft: 10,
    margin: 5,
    backgroundColor: '#82ABCA',
    borderRadius: 5
  },
  docBtnText: {
    color: 'white',
  },
  primaryBtn: {
    justifyContent: 'center',
    height: 30,
    paddingLeft: 10,
    margin: 5,
    backgroundColor: '#004E89',
    borderRadius: 5,
    alignItems:'center'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ddd',
    margin: 10,
    borderRadius: 10,
    padding: 10
  },
  rowImg: {
    width: 60,
    height: 60
  },
  modalHeader: {
    color: '#004E89',
    fontWeight: 'bold'
  }
});
