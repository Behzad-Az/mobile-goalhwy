import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class RadioInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedIndex: -1
    };
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.component}>
          <RadioForm
            formHorizontal={true}
            animation={true}
          >
          { this.props.options.map((obj, index) => {
            var that = this;
            var is_selected = this.state.selectedIndex == index;
            return (
              <View key={index} style={styles.radioButtonWrap}>
                <RadioButton
                  isSelected={is_selected}
                  obj={obj}
                  index={index}
                  labelHorizontal={true}
                  buttonColor={'#2196f3'}
                  labelColor={'#000'}
                  buttonSize={12}
                  style={[index !== this.props.options.length-1 && styles.radioStyle]}
                  onPress={(value, index) => {
                    this.setState({selectedIndex: index});
                    this.props.handleRadioChange(this.props.type, this.props.options[index].value);
                  }}
                />
              </View>
            )
          })}
          </RadioForm>
        </View>
      </View>
    );
  }
}

export default RadioInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // maxWidth: 200
  },
  component: {
    marginBottom: 10
    // marginTop: 10
  },
  radioStyle: {
    borderRightWidth: 1,
    borderColor: '#004E89',
    paddingRight: 10
  },
  radioButtonWrap: {
    marginRight: 10,
    // marginLeft: 5
  }
});
