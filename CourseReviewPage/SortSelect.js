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
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
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
              <Text onPress={() => console.log("i'm here 2")}>Balls</Text>
              <Text onPress={() => console.log("i'm here 2")}>Balls</Text>
              <Text onPress={() => console.log("i'm here 2")}>Balls</Text>
              <Text onPress={() => console.log("i'm here 2")}>Balls</Text>
              <Text onPress={() => console.log("i'm here 2")}>Balls</Text>
            </View>

          </TouchableHighlight>
        </Modal>
        <Text style={styles.headerBtn} onPress={() => this.setModalVisible(true)}>
          <FontAwesome name="sort-amount-desc" size={15} color="#004E89" />
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
    paddingLeft: 5,
    paddingRight: 5,
    width: vw(80)
  },
  headerBtn: {
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 3,
    paddingTop: 3,
    borderRadius: 5,
    textAlign: 'center',
    marginLeft: 5,
    maxHeight: 20,
    width: 30
  }
});
