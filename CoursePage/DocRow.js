import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';

class DocRow extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text
          onPress={() => Actions.DocPage({ docId: this.props.doc.id, courseId: this.props.courseId })}>
          { this.props.doc.title }
        </Text>
      </View>
    );
  }
}

export default DocRow;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
    borderBottomWidth: .5,
    borderColor: '#004E89'
  }
});
