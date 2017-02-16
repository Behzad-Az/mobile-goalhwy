import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

import NewDocForm from './NewDocForm.js';
import NewAssistRequest from './NewAssistRequest.js';

class TopRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionStatus: this.props.courseInfo.subscriptionStatus,
      tutor_status: this.props.courseInfo.tutor_status,
      assistReqOpen: this.props.courseInfo.assistReqOpen
    };
    this.handleUnsubscribe = this.handleUnsubscribe.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleTutorStatus = this.handleTutorStatus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.courseInfo.subscriptionStatus !== this.state.subscriptionStatus ? this.setState({ subscriptionStatus: nextProps.courseInfo.subscriptionStatus }) : '';
    nextProps.courseInfo.tutor_status !== this.state.tutor_status ? this.setState({ tutor_status: nextProps.courseInfo.tutor_status }) : '';
    nextProps.courseInfo.assistReqOpen !== this.state.assistReqOpen ? this.setState({ assistReqOpen: nextProps.courseInfo.assistReqOpen }) : '';
  }

  handleUnsubscribe() {
    fetch(`http://127.0.0.1:19001/api/users/${this.props.courseInfo.user_id}/courses/${this.props.courseInfo.id}`, {
      method: 'DELETE'
    })
    .then(response => response.json(response))
    .then(resJSON => resJSON ? this.setState({ subscriptionStatus: false, tutor_status: false, assistReqOpen: false }) : console.error("Error in server - 0: ", response))
    .catch(err => console.log("Error here: ", err));

  }

  handleSubscribe() {
    fetch(`http://127.0.0.1:19001/api/users/${this.props.courseInfo.user_id}/courses/${this.props.courseInfo.id}`, {
        method: 'POST',
        body: JSON.stringify({ course_id: this.props.courseInfo.id })
    })
    .then(response => response.json(response))
    .then(resJSON => resJSON ? this.setState({ subscriptionStatus: true }) : console.error("Error in server - 0: ", response))
    .catch(err => console.log("Error here: ", err));
  }

  handleTutorStatus() {

  }

  render() {
    return (
      <View style={styles.dividedRow}>
        <View style={{ flex: 1 }}><NewDocForm /></View>

        <TouchableOpacity style={{ flex: 1 }}>
          <Text style={styles.primaryBtn}>
            <FontAwesome name="star" size={19} color="white" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }} onPress={this.state.subscriptionStatus ? this.handleUnsubscribe : this.handleSubscribe}>
          <Text style={styles.primaryBtn}>
            { this.state.subscriptionStatus ? <FontAwesome name="remove" size={19} color="white" /> : <FontAwesome name="check-circle" size={19} color="white" /> }
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }}><NewAssistRequest /></View>

        <TouchableOpacity style={{ flex: 1 }}>
          <Text style={styles.primaryBtn}>
            <FontAwesome name="slideshare" size={19} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default TopRow;

const styles = StyleSheet.create({
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10
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
