import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@exponent/vector-icons';
import JobRow from './JobRow.js';

class RevisionsContainer extends React.Component {
  render() {
    return (
      <View style={styles.componentContainer}>
        <Text style={styles.headerText}>Open Positions:</Text>
        { this.props.jobs.map(job => <JobRow key={job.id} job={job} />) }
        { !this.props.jobs[0] && <Text style={{padding: 5, textAlign: 'center'}}>No jobs matching your search. Revise your search criteria.</Text> }
      </View>
    );
  }
}

export default RevisionsContainer;

const styles = StyleSheet.create({
  headerText: {
    backgroundColor: '#004E89',
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  componentContainer: {
    marginBottom: 10
  }
});
