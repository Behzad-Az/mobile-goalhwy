import React from 'react';
import {
  ScrollView,
  View
} from 'react-native';

import ProfileCard from './ProfileCard.js';

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View style={{marginTop: 94}}>
          <ProfileCard userId={this.props.userId} />
        </View>
      </ScrollView>
    );
  }
}

export default UserProfilePage;
