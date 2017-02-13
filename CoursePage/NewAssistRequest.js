import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, TouchableOpacity, View, Image, TextInput, Picker } from 'react-native';

class NewAssistRequest extends Component {
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
              <Text style={styles.modalHeader}>New assistance request form</Text>

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

              <TouchableHighlight onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                <Text>Go back</Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>

      <TouchableHighlight onPress={() => this.setModalVisible(true)}>
        <Text style={styles.primaryBtn}>Assistance</Text>
      </TouchableHighlight>

      </View>
    );
  }
}

export default NewAssistRequest;

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
