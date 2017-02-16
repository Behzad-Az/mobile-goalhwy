import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Navigator
} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import CoursePage from './CoursePage/CoursePage.js';
import InstPage from './InstPage/InstPage.js';
import IndexPage from './IndexPage/IndexPage.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'CoursePage'
    };
    this.selectPage = this.selectPage.bind(this);
  }

  selectPage(route, navigator) {
    switch (route.title) {
      case 'IndexPage':
        return <IndexPage navigator={navigator} />
      case 'CoursePage':
        return <CoursePage navigator={navigator} paramCourseId={route.paramCourseId} />
      case 'InstPage':
        return <InstPage navigator={navigator} />
      default:
        return <IndexPage navigator={navigator} />
    }
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
