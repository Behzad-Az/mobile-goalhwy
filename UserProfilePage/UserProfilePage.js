import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';
import ProfileCard from './ProfileCard.js';

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View style={{marginTop: 94}}>
          <ProfileCard />
        </View>
      </ScrollView>
    );
  }
}

export default UserProfilePage;
