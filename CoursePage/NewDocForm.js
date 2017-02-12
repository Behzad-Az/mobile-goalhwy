import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, TouchableOpacity, View, Image, TextInput, Picker } from 'react-native';

class NewDocForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
            <View>
              <Text style={styles.modalHeader}>New Document Form:</Text>

              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />

              <Picker
                selectedValue={this.state.language}
                onValueChange={(lang) => this.setState({language: lang})}>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
              </Picker>

              <TouchableHighlight onPress={() => this.setModalVisible(!this.state.modalVisible)} style={styles.newDocBtn}>
                <Text style={styles.docBtnText}>Go back</Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>

      <TouchableHighlight onPress={() => this.setModalVisible(true)} style={styles.newDocBtn}>
        <Text style={styles.docBtnText}>Upload New Document</Text>
      </TouchableHighlight>

      </View>
    );
  }
}

export default NewDocForm;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#ddd',
    margin: 10,
    borderRadius: 10,
    padding: 10
  },
  modalHeader: {
    color: '#004E89',
    fontWeight: 'bold'
  },
  newDocBtn: {
    justifyContent: 'center',
    height: 30,
    paddingLeft: 10,
    margin: 5,
    backgroundColor: '#004E89',
    borderRadius: 5,
    alignItems:'center'
  },
  docBtnText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
