import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native';
import { FontAwesome } from '@exponent/vector-icons';
import { Actions } from 'react-native-router-flux';
import NewDocForm from '../CoursePage/NewDocForm.js';
import NewAssistForm from '../CoursePage/NewAssistForm.js';

class TopRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionStatus: this.props.courseInfo.subscriptionStatus,
      tutorStatus: this.props.courseInfo.tutorStatus,
      assistReqOpen: this.props.courseInfo.assistReqOpen
    };
    this._handleUnsubscribe = this._handleUnsubscribe.bind(this);
    this._handleSubscribe = this._handleSubscribe.bind(this);
    this._handleTutorStatus = this._handleTutorStatus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subscriptionStatus: nextProps.courseInfo.subscriptionStatus,
      tutorStatus: nextProps.courseInfo.tutorStatus,
      assistReqOpen: nextProps.courseInfo.assistReqOpen
    });
  }

  _handleUnsubscribe() {
    fetch(`http://127.0.0.1:19001/api/users/currentuser/courses/${this.props.courseInfo.id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(resJSON => resJSON ? this.setState({ subscriptionStatus: false, tutorStatus: false, assistReqOpen: false }) : console.log('Error in server, TopRow.js - 0: ', resJSON))
    .catch(err => console.log('Error here: TopRow.js ', err));

  }

  _handleSubscribe() {
    fetch(`http://127.0.0.1:19001/api/users/currentuser/courses/${this.props.courseInfo.id}`, {
        method: 'POST',
        body: JSON.stringify({ course_id: this.props.courseInfo.id })
    })
    .then(response => response.json())
    .then(resJSON => resJSON ? this.setState({ subscriptionStatus: true }) : console.log('Error in server - 0: TopRow.js: ', resJSON))
    .catch(err => console.log('Error here: TopRow.js: ', err));
  }

  _handleTutorStatus() {
    let tutorStatus = !this.state.tutorStatus;
    fetch(`http://127.0.0.1:19001/api/users/currentuser/courses/${this.props.courseInfo.id}/tutor`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tutorStatus }),
    })
    .then(response => response.json())
    .then(resJSON => resJSON ? this.setState({ tutorStatus }) : console.log('Error in server - 0: TopRow.js: ', resJSON))
    .catch(err => console.log('Error here: TopRow.js: ', err));
  }

  render() {
    return (
      <View style={styles.componentContainer}>

        <Text style={styles.headerText}>
          { this.props.title }
        </Text>

        <View style={[styles.dividedRow, {maxHeight: 50}]}>

          <View style={{flex: 1}}>
            <NewDocForm />
          </View>

          <View style={{flex: 1}}>
            <TouchableHighlight
              style={styles.headerBtnContainer}
              onPress={() => Actions.CourseReviewPage({ courseId: this.props.courseInfo.id })}>
              <FontAwesome name='star' style={styles.headerBtn} />
            </TouchableHighlight>
          </View>

          <View style={{flex: 1}}>
            <TouchableHighlight
              style={styles.headerBtnContainer}
              onPress={this.state.subscriptionStatus ? this._handleUnsubscribe : this._handleSubscribe}>
              <FontAwesome name='check-circle' style={[styles.headerBtn, {color: this.state.subscriptionStatus ? 'green' : 'white'}]} />
            </TouchableHighlight>
          </View>

          <View style={{flex: 1}}>
            <NewAssistForm
              courseInfo={this.props.courseInfo}
              subscriptionStatus={this.state.subscriptionStatus} />
          </View>

          <View style={{flex: 1}}>
            <TouchableHighlight
              style={[styles.headerBtnContainer, {backgroundColor: this.state.subscriptionStatus ? '#004E89' : '#bbb'}]}
              onPress={this._handleTutorStatus}
              disabled={!this.state.subscriptionStatus}>
              <FontAwesome name='slideshare' style={[styles.headerBtn, {color: this.state.tutorStatus ? 'green' : 'white'}]} />
            </TouchableHighlight>
          </View>

        </View>

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
    marginTop: 10
  },
  headerBtnContainer: {
    padding: 5,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 5,
    backgroundColor: '#004E89'
  },
  headerBtn: {
    textAlign: 'center',
    fontSize: 19,
    color: 'white'
  },
  componentContainer: {
    marginBottom: 10
  },
  headerText: {
    backgroundColor: '#004E89',
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }
});
