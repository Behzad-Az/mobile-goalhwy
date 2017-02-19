import React from 'react';
import { Components } from 'exponent';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  render() {
    return (
      <Components.MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}
