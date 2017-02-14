import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import CoursePage from './CoursePage/CoursePage.js';
import InstPage from './InstPage/InstPage.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <InstPage />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  }
});

Exponent.registerRootComponent(App);


// <Grid>
//   <Col><Text>my</Text></Col>
//   <Col><Text>name</Text></Col>
// </Grid>