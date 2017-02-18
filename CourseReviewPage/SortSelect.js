import React, { Component } from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

class SortSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.submitSelect = this.submitSelect.bind(this);
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  submitSelect(option) {
    this.setModalVisible(false);
    this.props.handleSelect(option);
  }

  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <TouchableHighlight style={styles.modalContainer} onPress={() => this.setModalVisible(false)}>
            <View style={styles.selectionBox}>
              { this.props.options.map((option, index) =>
                <Text key={index} style={styles.selectRow} onPress={() => this.submitSelect(option.value)}>
                  {option.label}
                </Text>
              )}
            </View>

          </TouchableHighlight>
        </Modal>
        <Text style={styles.headerBtn} onPress={() => this.setModalVisible(true)}>
          <FontAwesome name="sort-amount-desc" size={13} color="#004E89" />
        </Text>
      </View>
    );
  }
}

export default SortSelect;

const vw = percentageWidth => Dimensions.get('window').width * (percentageWidth / 100);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor:'rgba(52, 52, 52, .9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectionBox: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    width: vw(80)
  },
  selectRow: {
    padding: 10,
    borderTopWidth: 1
  },
  headerBtn: {
    backgroundColor: 'white',
    paddingBottom: 3,
    paddingTop: 3,
    borderRadius: 5,
    textAlign: 'center',
    width: 30
  }
});
