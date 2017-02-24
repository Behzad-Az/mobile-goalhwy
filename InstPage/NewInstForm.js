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
import ModalSelect from '../Partials/ModalSelect.js';

class ChangeInstForm extends Component {
  constructor(props) {
    super(props);
    this.countryList = [
      { value: 'canada', label: 'Canada' }, { value: 'united_states', label: 'United State of America (USA)' }
    ];
    this.provinceList = {
      canada: [
        { value: 'Alberta', label: 'Alberta' }, { value: 'British Columbia', label: 'British Columbia' }, { value: 'Manitoba', label: 'Manitoba' },
        { value: 'New Brunswick', label: 'New Brunswick' }, { value: 'Newfoundland and Labrador', label: 'Newfoundland and Labrador' },
        { value: 'Northwest Territories', label: 'Northwest Territories' }, { value: 'Nova Scotia', label: 'Nova Scotia' }, { value: 'Nunavut', label: 'Nunavut' },
        { value: 'Ontario', label: 'Ontario' }, { value: 'Prince Edward Island', label: 'Prince Edward Island' }, { value: 'Quebec', label: 'Quebec' },
        { value: 'Saskatchewan', label: 'Saskatchewan' }, { value: 'Yukon', label: 'Yukon' }
      ],
      united_states: [
        { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AS', label: 'American Samoa' }, { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' }, { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'DC', label: 'District Of Columbia' },
        { value: 'FM', label: 'Federated States Of Micronesia' }, { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' }, { value: 'GU', label: 'Guam' },
        { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' }, { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' }, { value: 'ME', label: 'Maine' }, { value: 'MH', label: 'Marshall Islands' }, { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' }, { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' }, { value: 'MP', label: 'Northern Mariana Islands' },
        { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' }, { value: 'OR', label: 'Oregon' }, { value: 'PW', label: 'Palau' }, { value: 'PA', label: 'Pennsylvania' },
        { value: 'PR', label: 'Puerto Rico' }, { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' }, { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' }, { value: 'VI', label: 'Virgin Islands' },
        { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' }, { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }
      ]
    };
    this.disabledOptions = [{ value: '', label: 'Select country first.' }];

    this.state = {
      modalVisible: false,
      instLongName: '',
      instShortName: '',
      countryVal: '',
      countryName: '',
      provinceVal: '',
      provinceName: ''
    };

    this.setModalVisible = this.setModalVisible.bind(this);
    this.handleCountrySelect = this.handleCountrySelect.bind(this);
    this.handleProvinceSelect = this.handleProvinceSelect.bind(this);
    this.handleNewInstPost = this.handleNewInstPost.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleCountrySelect(countryVal, countryName) {
    if (this.state.countryVal !== countryVal) {
      this.setState({ countryVal, countryName, provinceVal: '', provinceName: '' });
    }
  }

  handleProvinceSelect(provinceVal, provinceName) {
    this.setState({ provinceVal, provinceName });
  }

  handleNewInstPost() {
    let data = {
      country: this.state.countryVal,
      province:  this.state.provinceVal,
      inst_long_name: this.state.instLongName,
      inst_short_name: this.state.instShortName
    };
    fetch('http://127.0.0.1:19001/api/institutions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(resJSON => resJSON ? this.props.reload() : console.log("Error in server, NewInstForm.js: ", resJSON))
    .catch(err => console.log("Error here in NewInstForm.js: ", err));
    this.setModalVisible(false);
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
            <Text style={styles.modalHeader}>New Institution:</Text>

            <View style={styles.inputCotainer}>
              <Text style={styles.inputLabel}>Institution Full Name:</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="words"
                onChangeText={instLongName => this.setState({instLongName})}
                value={this.state.instLongName}
                placeholder="Example: University of British Columbia"
                underlineColorAndroid="rgba(0,0,0,0)"
              />
            </View>

            <View style={styles.inputCotainer}>
              <Text style={styles.inputLabel}>Institution Given Name (optional):</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="words"
                autoCorrect={false}
                onChangeText={instShortName => this.setState({instShortName})}
                value={this.state.instShortName}
                placeholder="Example: UBC"
                underlineColorAndroid="rgba(0,0,0,0)"
              />
            </View>

            <View>
              <ModalSelect
                options={this.countryList}
                handleSelect={this.handleCountrySelect}
                btnContent={{ type: 'text', name: this.state.countryName || 'Select Country' }}
                style={[styles.selectContainer, {color: this.state.countryName ? 'black' : '#004E89', fontWeight: this.state.countryName ? 'normal' : 'bold'}]}
              />
              <FontAwesome name="chevron-down" style={{position: 'absolute', top: 7, right: 7, fontSize: 15, zIndex: -1}} />
            </View>

            <View>
              <ModalSelect
                options={this.state.countryVal ? this.provinceList[this.state.countryVal] : this.disabledOptions}
                handleSelect={this.handleProvinceSelect}
                btnContent={{ type: 'text', name: this.state.provinceName || 'Select Province / State' }}
                style={[styles.selectContainer, {color: this.state.provinceName ? 'black' : '#004E89', fontWeight: this.state.provinceName ? 'normal' : 'bold'}]}
              />
              <FontAwesome name="chevron-down" style={{position: 'absolute', top: 7, right: 7, fontSize: 15, zIndex: -1}} />
            </View>

            <View style={styles.dividedRow}>
              <View style={[styles.primaryBtnContainer, {marginRight: 5}]}>
                <Text style={styles.primaryBtn} onPress={this.handleNewInstPost}>
                  Submit
                </Text>
              </View>
              <View style={[styles.primaryBtnContainer, {marginLeft: 5}]}>
                <Text style={styles.primaryBtn} onPress={() => this.setModalVisible(false)}>
                  Cancel
                </Text>
              </View>
            </View>

          </ScrollView>
        </Modal>

        <FontAwesome name="plus" style={this.props.style} onPress={() => this.setModalVisible(true)} />

      </View>
    );
  }
}

export default ChangeInstForm;

const styles = StyleSheet.create({
  modalContainer: {
    padding: 10
  },
  modalHeader: {
    color: '#004E89',
    fontWeight: 'bold',
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#004E89'
  },
  inputCotainer: {
    marginBottom: 10,
    padding: 5,
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#aaa'
  },
  inputLabel: {
    color: '#004E89',
    fontWeight: 'bold',
    paddingTop: 2.5,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 5
  },
  textInput: {
    paddingRight: 5,
    paddingLeft: 5
  },
  selectContainer: {
    marginBottom: 10,
    borderWidth: .5,
    borderRadius: 5,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    borderColor: '#aaa',
    alignItems: 'center'
  },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  primaryBtnContainer: {
    backgroundColor: '#004E89',
    flex: 1,
    borderRadius: 5,
    borderColor: '#004E89',
    borderWidth: .5,
    padding: 5
  },
  primaryBtn: {
    color: 'white',
    textAlign: 'center'
  }
});
