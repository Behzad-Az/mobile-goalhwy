import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import FlagModal from '../Partials/ModalSelect.js';

class RevisionRow extends React.Component {
  constructor(props) {
    super(props);
    this.flagOptions = [
      { value: 'expired link', label: 'Expired link' },
      { value: 'poor categorization', label: 'Poor categorization' },
      { value: 'other', label: 'Other' }
    ];
    this.state = {
      flagReason: ''
    };
    this.handleFlagSubmit = this.handleFlagSubmit.bind(this);
  }

  handleFlagSubmit(flagReason) {
    fetch(`http://127.0.0.1:19001/api/flags/jobs/${this.props.job.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ flagReason }),
    })
    .then(response => response.json())
    .then(resJSON => resJSON ? this.setState({ flagReason }) : console.error("Error in server - 0: ", resJSON))
    .catch(err => console.log("Error here: ", err));
  }

  render() {
    return (
      <View style={[styles.container, styles.dividedRow]}>

        <View style={{flex: 1}}>
          <Image
            source={require('../public/images/pdf-logo.png')}
            fadeDuration={0}
            style={{ width: 50, height: 50 }}
          />
        </View>

        <View style={{flex: 4}}>
          <Text>{this.props.job.title}</Text>
          <Text>@ {this.props.job.company}</Text>
          <Text>Job Level: {this.props.job.kind}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
            { this.props.job.tags.map((tag, index) => <Text key={index} style={styles.tag}>{tag}</Text> )}
          </View>

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
  },
  lowerBtn: {
    color: 'white',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    margin: 5,
    lineHeight: 19
  },
  tag: {
    backgroundColor: '#ccc',
    margin: 3,
    padding: 3,
    borderRadius: 3
  }
});
