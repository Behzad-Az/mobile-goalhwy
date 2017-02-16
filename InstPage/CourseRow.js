import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { FontAwesome } from '@exponent/vector-icons';

class InstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAlreadySubscribed: this.props.currUserCourseIds.includes(this.props.course.id)
    };
  }

  render() {
    return (
      <View style={styles.dividedRow}>
        <Text style={{flex: 9, padding: 5}} onPress={() => Actions.CoursePage({ courseId: this.props.course.id })}>
          {this.props.course.displayName}
        </Text>
        <Text style={{flex: 1, padding: 5}}>
          <FontAwesome name="check-circle" size={25} color={this.state.userAlreadySubscribed ? "green" : "black"} />
        </Text>
      </View>
    );
  }
}

export default InstPage;

const styles = StyleSheet.create({
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: '#eee',
    borderWidth: .5
  }
});
