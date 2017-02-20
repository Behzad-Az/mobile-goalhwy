import React, { Component } from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  TextInput
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

class ChangeInstForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      filterPhrase: ''
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.filterInstList = this.filterInstList.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  filterInstList() {
    let phrase = new RegExp(this.state.filterPhrase.toLowerCase());
    return this.props.instList.filter(inst => inst.displayName.toLowerCase().match(phrase));
  }

  render() {
    let currInstList = this.filterInstList();
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <ScrollView style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Select Institution:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={filterPhrase => this.setState({ filterPhrase })}
              placeholder="Search institutions here..." />

            { currInstList.map((inst, index) =>
              <Text key={index} style={styles.instRowText}>{inst.displayName}</Text>
            )}

            <View style={styles.dividedRow}>
              <View style={{flex: 1}}>
                <Text style={[styles.primaryBtn, {marginRight: 5}]}>
                  Select
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={[styles.primaryBtn, {marginLeft: 5}]} onPress={() => this.setModalVisible(false)}>
                  Go Back
                </Text>
              </View>
            </View>

          </ScrollView>
        </Modal>

        <FontAwesome name="list" style={styles.headerBtn} onPress={() => this.setModalVisible(true)} />

      </View>
    );
  }
}

export default ChangeInstForm;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 10,
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
  // inputCotainer: {
  //   marginBottom: 10,
  //   padding: 5,
  //   borderWidth: .5,
  //   borderRadius: 5,
  //   borderColor: '#aaa'
  // },
  // inputLabel: {
  //   color: '#004E89',
  //   fontWeight: 'bold',
  //   paddingTop: 2.5,
  //   paddingRight: 5,
  //   paddingLeft: 5,
  //   paddingBottom: 5
  // },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  primaryBtn: {
    color: 'white',
    backgroundColor: '#004E89',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center'
  },
  headerBtn: {
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 19
  },
  // selectContainer: {
  //   marginBottom: 10,
  //   borderWidth: .5,
  //   borderRadius: 5,
  //   paddingLeft: 10,
  //   paddingTop: 5,
  //   paddingBottom: 5,
  //   paddingRight: 5,
  //   borderColor: '#aaa',
  //   alignItems: 'center'
  // },
  instRowText: {
    marginBottom: 5,
    backgroundColor: '#eee',
    borderWidth: .5,
    padding: 5
  },
  textInput: {
    marginBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: .5,
    borderColor: '#aaa',
    borderRadius: 5
  },
});
