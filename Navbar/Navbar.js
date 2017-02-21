import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { FontAwesome } from '@exponent/vector-icons';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      pageError: false,
      currPage: 'IndexPage',
      userInfo: {},
      notifications: [],
      unViewedNotif: false
    };
    this.conditionData = this.conditionData.bind(this);
    // this.handleChangePage = this.handleChangePage.bind(this);
    this.renderPageAfterData = this.renderPageAfterData.bind(this);
  }

  componentDidMount() {
    fetch('http://127.0.0.1:19001/api/usernavbardata')
    .then(response => response.json())
    .then(resJSON => this.conditionData(resJSON))
    .catch(err => {
      console.log("Error here: Navbar.js: ", err);
      this.setState({ dataLoaded: true, pageError: true });
    });
  }

  conditionData(resJSON) {
    if (resJSON) {
      let newState = {
        ...resJSON,
        unViewedNotif: resJSON.notifications.reduce((a, b) => ({ unviewed: a.unviewed || b.unviewed }), { unviewed: false } ).unviewed,
        dataLoaded: true
      }
      this.setState(newState);
    } else {
      console.log("Error here: Navbar.js: ", err);
      this.setState({ dataLoaded: true, pageError: true });
    }
  }

  // handleChangePage(nextPage) {
  //   switch (nextPage) {
  //     case 'IndexPage':
  //       Actions.Inde
  //   }

  // }

  renderPageAfterData() {
    if (this.state.dataLoaded && this.state.pageError) {
      return (
        <View style={styles.componentContainer}>
          <Text style={{padding: 5, textAlign: 'center'}}>
            <FontAwesome name="exclamation-triangle" size={19} /> Error in loading up the Navbar.
          </Text>
        </View>
      );
    } else if (this.state.dataLoaded) {
      return (
        <View style={styles.container}>
          <View style={styles.dividedRow}>
            <FontAwesome
              name="book"
              style={[styles.navItem, {borderBottomWidth: this.props.pageName === 'IndexPage' ? 2 : .5 }]}
              onPress={() => Actions.IndexPage()} />
            <FontAwesome
              name="graduation-cap"
              style={[styles.navItem, {borderBottomWidth: this.props.pageName === 'InstPage' ? 2 : .5 }]}
              onPress={() => Actions.InstPage({ instId: this.state.userInfo.inst_id })} />
            <FontAwesome
              name="briefcase"
              style={[styles.navItem, {borderBottomWidth: this.props.pageName === 'CareerPage' ? 2 : .5 }]}
              onPress={() => Actions.CareerPage()} />
            <FontAwesome
              name="user-circle-o"
              style={[styles.navItem, {borderBottomWidth: this.props.pageName === 'CompanyPage' ? 2 : .5 }]}
              onPress={() => Actions.CompanyPage({ companyId: 2 })} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.componentContainer}>
          <ActivityIndicator
            animating={true}
            style={{height: 30}}
            size={20}
            color="#004E89"
          />
        </View>
      );
    }
  }

  render() {
    return this.renderPageAfterData();
  }
}

export default Navbar;

const styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    borderTopWidth: 1
  },
  navItem: {
    borderColor: 'white',
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#004E89',
    textAlign: 'center',
    fontSize: 19,
    flex: 1
  },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  }
});
