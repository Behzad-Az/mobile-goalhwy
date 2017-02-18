import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import FlagModal from '../Partials/ModalSelect.js';

class RevisionRow extends React.Component {
  constructor(props) {
    super(props);
    this.flagOptions = [
      { value: 'yo', label: 'yo' },
      { value: 'date_old_to_new', label: 'Date - Old to New' },
      { value: 'rating_high_to_low', label: 'Rating - High to Low' },
      { value: 'rating_low_to_high', label: 'Rating - Low to High' },
      { value: 'instructor_name', label: 'Instructor Name' }
    ];
  }

  handleFlag(flag) {
    console.log("i'm here 3.1: ", flag);
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={styles.dividedRow}>
          <TouchableOpacity style={{ flex: 4 }}>
            <Text style={[{backgroundColor: '#004E89'}, styles.lowerBtn]}>Download</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <FlagModal
              options={this.flagOptions}
              handleSelect={this.handleFlag}
              btnContent={{ type: 'icon', name: 'flag', size: 19, color: "white"}}
              style={[{backgroundColor: '#9D0600'}, styles.lowerBtn]}
            />
          </View>
        </View>

        <View style={{marginBottom: 35}}>
          <Text style={styles.revTitle}>{this.props.rev.title}</Text>
          <Text style={styles.revDesc}>"{this.props.rev.rev_desc}"</Text>
        </View>

      </View>
    );
  }
}

export default RevisionRow;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: .5,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 5
  },
  revTitle: {
    fontWeight: 'bold'
  },
  revDesc: {
    fontStyle: 'italic'
  },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    position: 'absolute',
    bottom: 5,
    left: 5
  },
  lowerBtn: {
    color: 'white',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    margin: 5,
    // fontSize: 19
    lineHeight: 19
  }
});
