import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import EditProfileForm from './EditProfileForm.js';

class RevisionRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      pageError: false,
      userInfo: {},
      pageMsg: ''
    };
    this.setMessage = this.setMessage.bind(this);
  }

  componentDidMount() {
    fetch(`http://127.0.0.1:19001/api/users/${this.props.userId}`)
    .then(response => response.json())
    .then(resJSON => this.conditionData(resJSON))
    .catch(err => {
      console.log("Error here: UserProfilePage.js: ", err);
      this.setState({ dataLoaded: true, pageError: true });
    });
  }

  conditionData(resJSON) {
    if (resJSON) {
      let userInfo = {
        instId: resJSON.userInfo.inst_id,
        progId: resJSON.userInfo.prog_id,
        username: resJSON.userInfo.username,
        email: resJSON.userInfo.email,
        userYear: resJSON.userInfo.user_year,
        instDisplayName: resJSON.userInfo.inst_short_name ? resJSON.userInfo.inst_long_name + ` (${resJSON.userInfo.inst_short_name})` : resJSON.userInfo.inst_long_name,
        progDisplayName: resJSON.userInfo.prog_short_name ? resJSON.userInfo.prog_long_name + ` (${resJSON.userInfo.prog_short_name})` : resJSON.userInfo.prog_long_name
      };
      this.setState({ dataLoaded: true, userInfo });
    } else {
      console.log("Error here: UserProfilePage.js: ", err);
      this.setState({ dataLoaded: true, pageError: true });
    }
  }

  setMessage(pageMsg) {
    this.setState({ pageMsg });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Profile Information:</Text>

        <View style={styles.attributeContainer}>
           <Text style={styles.subHeader}>Username:</Text>
           <Text>{this.state.userInfo.username}</Text>
        </View>

        <View style={styles.attributeContainer}>
           <Text style={styles.subHeader}>Email:</Text>
           <Text>{this.state.userInfo.email}</Text>
        </View>

        <View style={styles.attributeContainer}>
           <Text style={styles.subHeader}>Primary Institution:</Text>
           <Text>{this.state.userInfo.instDisplayName}</Text>
        </View>

        <View style={styles.attributeContainer}>
           <Text style={styles.subHeader}>Primary Program:</Text>
           <Text>{this.state.userInfo.progDisplayName}</Text>
        </View>

        <View style={styles.attributeContainer}>
           <Text style={styles.subHeader}>Primary Academic Year:</Text>
           <Text>{this.state.userInfo.userYear}</Text>
        </View>

        <EditProfileForm style={styles.editBtn} setMessage={this.setMessage} userInfo={this.state.userInfo} />

      </View>
    );
  }
}

export default RevisionRow;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: .5,
    backgroundColor: 'white',
    marginBottom: 10
  },
  header: {
    color: '#004E89',
    fontWeight: 'bold',
    // paddingBottom: 5,
    marginBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#004E89'
  },
  attributeContainer: {
    marginBottom: 10
  },
  subHeader: {
    fontWeight: 'bold',
    paddingBottom: 2
  },
  editBtn: {
    backgroundColor: '#004E89',
    color: 'white',
    // position: 'absolute',
    // top: 10,
    // right: 10
  }
});
