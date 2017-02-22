import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      pageError: false,
      userInfo: {}
    };
    // this.renderPageAfterData = this.renderPageAfterData.bind(this);
  }

  componentDidMount() {
    fetch(`http://127.0.0.1:19001/api/users/${this.props.userId}`)
    .then(response => response.json())
    .then(resJSON => {
      if (resJSON) {
        resJSON.dataLoaded = true;
        this.setState(resJSON)
      } else {
        console.log("Error here: UserProfilePage.js: ", err);
        this.setState({ dataLoaded: true, pageError: true });
      }
    })
    .catch(err => {
      console.log("Error here: UserProfilePage.js: ", err);
      this.setState({ dataLoaded: true, pageError: true });
    });
  }

  render() {
    console.log("i'm here 0: ", this.state);
    return (
      <ScrollView>
        <View style={{marginTop: 94}}>
          <Text>User Profile Page</Text>
        </View>
      </ScrollView>
    );
  }
}

export default UserProfilePage;
