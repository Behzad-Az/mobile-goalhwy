import React, { Component } from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  TextInput
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';
import CheckBox from 'react-native-check-box';

class JobSearchForm extends Component {
  constructor(props) {
    super(props);
    this.userId = this.props.userId || 1;
    this.preferenceTags = ['aerospace', 'automation', 'automotive', 'design', 'electrical', 'energy', 'engineer', 'instrumentation', 'manufacturing', 'mechanical', 'military', 'mining', 'naval', 'programming', 'project-management', 'QA/QC', 'R&D', 'robotics', 'software'];
    this.distanceOptions = [
      { value: 10, label: "10km" },
      { value: 20, label: "20km" },
      { value: 30, label: "30km" },
      { value: 50, label: "50km" },
      { value: 100, label: "100km" },
      { value: 9000, label: "All" }
    ];
    this.state = {
      modalVisible: false,
      username: '',
      postal_code: '',
      job_distance: '',
      job_kind: [],
      job_query: [],
      tagFilterPhrase: ''
    };
    this.conditionData = this.conditionData.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.handleJobKind = this.handleJobKind.bind(this);
    this.moveUpTag = this.moveUpTag.bind(this);
    this.moveDownTag = this.moveDownTag.bind(this);
    this.filterPreferenceTags = this.filterPreferenceTags.bind(this);
  }

  componentDidMount() {
    fetch(`http://127.0.0.1:19001/api/users/${this.userId}`)
    .then(response => response.json())
    .then(resJSON => resJSON ? this.conditionData(resJSON) : console.error("server error - 0", resJSON))
    .catch(err => console.log("Error here balls: ", err));
  }

  conditionData(resJSON) {
    let job_query = resJSON.userInfo.job_query;
    let job_kind = resJSON.userInfo.job_kind;

    job_kind = job_kind ? job_kind.split(' ') : [];

    if (job_query) {
      job_query = job_query.split(' ');
      job_query.forEach(query => {
        if (this.preferenceTags.includes(query)) {
          let index = this.preferenceTags.indexOf(query);
          this.preferenceTags.splice(index, 1);
        }
      });
    } else {
      job_query = [];
    }

    this.setState({
      username: resJSON.userInfo.username,
      postal_code: resJSON.userInfo.postal_code ? resJSON.userInfo.postal_code.toUpperCase() : '',
      job_distance: resJSON.userInfo.job_distance ? resJSON.userInfo.job_distance : '',
      job_kind: job_kind,
      job_query: job_query
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleJobKind(value) {
    let job_kind = this.state.job_kind;
    if (this.state.job_kind.includes(value)) {
      let index = job_kind.indexOf(value);
      job_kind.splice(index, 1);
    } else {
      job_kind.push(value);
    }
    this.setState({ job_kind });
  }

  moveUpTag(selectedTag) {
    let job_query = this.state.job_query;
    job_query.push(selectedTag);
    let index = this.preferenceTags.findIndex(tag => tag === selectedTag);
    this.preferenceTags.splice(index, 1);
    let tagFilterPhrase = '';
    this.setState({ job_query, tagFilterPhrase });
  }

  moveDownTag(selectedTag) {
    let job_query = this.state.job_query;
    let index = job_query.find(tag => tag === selectedTag);
    job_query.splice(index, 1);
    this.preferenceTags.push(selectedTag);
    this.preferenceTags.sort((a,b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1);
    this.setState({ job_query });
  }

  filterPreferenceTags() {
    let tempArr = this.state.tagFilterPhrase ? this.preferenceTags.filter(tag => tag.includes(this.state.tagFilterPhrase)) : this.preferenceTags;
    return tempArr[0] ?
      tempArr.map((tag, index) => <Text key={index} style={styles.tag} onPress={() => this.moveUpTag(tag)}>{tag}</Text>) :
      <Text style={{paddingLeft: 5}}>No matching tags found...</Text>;
  }

  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <ScrollView style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Job Search Criteria:</Text>

            <View style={styles.inputCotainer}>
              <Text style={styles.inputLabel}>Search Area:</Text>
              <View style={styles.dividedRow}>
                <View style={{flex: 1, marginRight: 5}}>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={postal_code => this.setState({postal_code})}
                    value={this.state.postal_code}
                    placeholder="Postal Code"
                    underlineColorAndroid="rgba(0,0,0,0)"
                  />
                </View>
                <View style={{flex: 1, marginLeft: 5}}>
                  <View style={[styles.dividedRow, styles.selectContainer]}>
                    <Text style={{flex: 7}}>{ this.state.job_distance ? `${this.state.job_distance} km` : "select search area" }</Text>
                    <Text style={{flex: 1}}><FontAwesome name="chevron-down" size={15} color="black" /></Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.inputCotainer}>
              <Text style={styles.inputLabel}>Categories:</Text>
              <View style={styles.dividedRow}>
                <View style={{flex: 1, paddingRight: 5}}>
                  <CheckBox
                    style={styles.checkbox}
                    onClick={() => this.handleJobKind("summer")}
                    isChecked={ this.state.job_kind.includes("summer") }
                    leftText="Part Time"
                  />
                  <CheckBox
                    style={styles.checkbox}
                    onClick={() => this.handleJobKind("junior")}
                    isChecked={ this.state.job_kind.includes("junior") }
                    leftText="Junior"
                  />
                </View>
                <View style={{flex: 1, paddingLeft: 5}}>
                  <CheckBox
                    style={styles.checkbox}
                    onClick={() => this.handleJobKind("internship")}
                    isChecked={ this.state.job_kind.includes("internship") }
                    leftText="Intern/Coop"
                  />
                  <CheckBox
                    style={styles.checkbox}
                    onClick={() => this.handleJobKind("senior")}
                    isChecked={ this.state.job_kind.includes("senior") }
                    leftText="Senior"
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputCotainer}>
              <Text style={styles.inputLabel}>My Preferenence Tages:</Text>
              <View style={[styles.tagContainer, {borderBottomWidth: 1, borderColor: '#004E89'}]}>
                { this.state.job_query.map((tag, index) =>
                  <Text key={index} style={styles.tag} onPress={() => this.moveDownTag(tag)}>{tag}</Text>
                )}
                { !this.state.job_query[0] && <Text>Select tags from the list below...</Text> }
              </View>
              <TextInput
                style={[styles.textInput, {marginTop: 10}]}
                onChangeText={tagFilterPhrase => this.setState({tagFilterPhrase})}
                value={this.state.tagFilterPhrase}
                placeholder="search for tags"
                underlineColorAndroid="rgba(0,0,0,0)"
              />
              <View style={styles.tagContainer}>
                { this.filterPreferenceTags() }
              </View>
            </View>

            <View style={[styles.dividedRow, {marginTop: 10}]}>
              <View style={{flex: 1}}>
                <Text onPress={() => this.setModalVisible(false)} style={[styles.primaryBtn, {marginRight: 5}]}>
                  Update
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text onPress={() => this.setModalVisible(false)} style={[styles.primaryBtn, {marginLeft: 5}]}>
                  Go Back
                </Text>
              </View>
            </View>

          </ScrollView>
        </Modal>
        <Text style={styles.primaryBtn} onPress={() => this.setModalVisible(true)}>
          <FontAwesome name="search" size={19} color="white" /> Search Jobs
        </Text>
      </View>
    );
  }
}

export default JobSearchForm;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 10,
    padding: 10
  },
  modalHeader: {
    color: '#004E89',
    fontWeight: 'bold',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#004E89'
  },
  inputCotainer: {
    marginTop: 10,
    padding: 5,
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#aaa'
  },
  selectContainer: {
    marginBottom: 5,
    borderWidth: .5,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: '#aaa',
    alignItems: 'center'
  },
  inputLabel: {
    color: '#004E89',
    fontWeight: 'bold',
    marginBottom: 5
  },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  primaryBtn: {
    color: 'white',
    backgroundColor: '#004E89',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5
  },
  textInput: {
    marginBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    borderWidth: .5,
    borderColor: '#aaa',
    borderRadius: 5
  },
  checkbox: {
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    flex: 1
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingBottom: 5
  },
  tag: {
    backgroundColor: '#82ABCA',
    color: 'white',
    fontWeight: 'bold',
    margin: 3,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 10,
    fontSize: 10
  }
});
