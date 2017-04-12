import React from 'react';
import { Text } from 'react-native';
import { FontAwesome } from '@exponent/vector-icons';

class PageLoadError extends React.Component {
  render() {
    return (
      <Text style={{padding: 5, textAlign: 'center'}}>
        <FontAwesome name='exclamation-triangle' size={19}/> Error in loading up the page.
      </Text>
    );
  }
}

export default PageLoadError;
