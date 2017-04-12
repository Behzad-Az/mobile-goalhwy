import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@exponent/vector-icons';
import RevisionRow from './RevisionRow.js';

class RevisionsContainer extends React.Component {
  render() {
    return (
      <View style={styles.componentContainer}>
        <Text style={styles.header}>Revisions:</Text>
        { this.props.docInfo.revisions.map(rev => <RevisionRow key={rev.id} rev={rev} />) }
        { !this.props.docInfo.revisions[0] && <Text style={{padding: 5}}>No revision could be found...</Text> }
      </View>
    );
  }
}

export default RevisionsContainer;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#004E89',
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  componentContainer: {
    marginBottom: 10
  }
});
