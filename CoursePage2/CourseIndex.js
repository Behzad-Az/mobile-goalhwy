import React, { Component } from 'react';
import { Text, Navigator, TouchableHighlight } from 'react-native';

export default class NavAllDay extends Component {
  render() {
  const routes = [
    {title: 'First Scene', index: 0},
    {title: 'Second Scene', index: 1},
    {title: 'Third Scene', index: 2},
  ];

  const balls = <TouchableHighlight onPress={this.props.navigator.push(routes[0])}><Text>balls</Text></TouchableHighlight>
  const nigga = <TouchableHighlight onPress={this.props.navigator.push(routes[1])}><Text>Nigga</Text></TouchableHighlight>

  return (
    <Navigator
      initialRoute={routes[0]}
      initialRouteStack={routes}
      renderScene={(route, navigator) => {
        console.log("i'm here route: ", route);
        switch (route.index) {
          case 0:
            return <TouchableHighlight onPress={this.props.navigator.push(routes[0])}><Text>balls</Text></TouchableHighlight>;
          case 1:
            return nigga;
        }

      }

      }
      style={{padding: 100}}
    />
  );
}
}