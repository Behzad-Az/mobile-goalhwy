import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

import { Actions } from 'react-native-router-flux';

class DocRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text
        style={styles.docTypeHeader}
        onPress={() => Actions.DocPage({ docId: this.props.doc.id, courseId: this.props.courseId })}>
        {this.props.doc.title}
      </Text>
    );
  }
}

export default DocRow;

const styles = StyleSheet.create({
  docTypeHeader: {
    padding: 5,
    backgroundColor: '#eee',
    borderBottomWidth: .5,
    borderLeftWidth: .5,
    borderRightWidth: .5
  }
});
