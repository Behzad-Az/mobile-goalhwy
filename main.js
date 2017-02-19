import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet
} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import CoursePage from './CoursePage/CoursePage.js';
import InstPage from './InstPage/InstPage.js';
import IndexPage from './IndexPage/IndexPage.js';
import CourseReviewPage from './CourseReviewPage/CourseReviewPage.js';
import DocPage from './DocPage/DocPage.js';
import CareerPage from './CareerPage/CareerPage.js';

import MapTest from './Partials/MapTest.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router hideNavBar={true} style={styles.container}>
        <Scene key="root">

          <Scene
            key="IndexPage"
            component={IndexPage}
            title="IndexPage"
            initial
          />

          <Scene
            key="CoursePage"
            component={CoursePage}
            title="CoursePage"
          />

          <Scene
            key="InstPage"
            component={InstPage}
            title="InstPage"
          />

          <Scene
            key="CourseReviewPage"
            component={CourseReviewPage}
            title="CourseReviewPage"
          />

          <Scene
            key="DocPage"
            component={DocPage}
            title="DocPage"
          />

          <Scene
            key="CareerPage"
            component={CareerPage}
            title="CareerPage"
          />

        </Scene>
      </Router>
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
