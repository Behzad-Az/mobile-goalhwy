import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import Navbar from './Navbar/Navbar.js';
import CoursePage from './CoursePage/CoursePage.js';
import InstPage from './InstPage/InstPage.js';

import IndexPage from './IndexPage/IndexPage.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'IndexPage'
    };
    this.changePage = this.changePage.bind(this);
    this.selectPage = this.selectPage.bind(this);
  }

  changePage(page) {
    this.setState({ page });
  }

  selectPage() {
    switch (this.state.page) {
      case 'IndexPage':
        return <IndexPage />
      case 'CoursePage':
        return <CoursePage />
      case 'InstPage':
        return <InstPage />
      default:
        return <IndexPage />
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Navbar changePage={this.changePage} />
        { this.selectPage() }
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
