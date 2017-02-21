import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import CoursePage from './CoursePage/CoursePage.js';
import InstPage from './InstPage/InstPage.js';
import IndexPage from './IndexPage/IndexPage.js';
import CourseReviewPage from './CourseReviewPage/CourseReviewPage.js';
import DocPage from './DocPage/DocPage.js';
import CareerPage from './CareerPage/CareerPage.js';
import CompanyPage from './CompanyPage/CompanyPage.js';

import Navbar from './Navbar/Navbar.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router hideNavBar={false} style={styles.container} navBar={Navbar}>
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

          <Scene
            key="CompanyPage"
            component={CompanyPage}
            title="CompanyPage"
          />

        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    // marginTop: 25,
    // marginLeft: 10,
    // marginRight: 10,
    // marginBottom: 10
  }
});

Exponent.registerRootComponent(App);
