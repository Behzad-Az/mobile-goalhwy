import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@exponent/vector-icons';
import DocRow from './DocRow.js';

class DocsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContainer: false
    };
    this._renderContainer = this._renderContainer.bind(this);
  }

  _renderContainer() {
    let docCount = this.props.docs.length;
    let lastUpdate = docCount ? this.props.docs[0].revisions[0].created_at.slice(0, 10) : 'n/a';
    return this.state.showContainer ?
      this.props.docs.map(doc => <DocRow key={doc.id} doc={doc} courseId={this.props.courseId} />) :
      <View style={styles.summaryInfo}>
        <Text>{docCount} document(s)... last update on {lastUpdate}</Text>
      </View>
  }

  render() {
    return (
      <View style={styles.componentContainer}>
        <Text style={styles.headerText} onPress={() => this.setState({ showContainer: !this.state.showContainer })}>
          { this.props.header }
        </Text>
        <FontAwesome
          name={this.state.showAsgReports ? 'chevron-up' : 'chevron-down'}
          style={styles.headerStandAloneChevron}
          onPress={() => this.setState({ showContainer: !this.state.showContainer })}
        />
        { this._renderContainer() }
      </View>
    );
  }
}

export default DocsContainer;

const styles = StyleSheet.create({
  headerText: {
    backgroundColor: '#004E89',
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  summaryInfo: {
    padding: 5,
    backgroundColor: 'white',
    borderBottomWidth: .5,
    borderColor: '#004E89'
  },
  componentContainer: {
    marginBottom: 10
  },
  headerStandAloneChevron: {
    textAlign: 'center',
    fontSize: 19,
    color: 'white',
    textAlign: 'right',
    position: 'absolute',
    top: 5,
    right: 12,
    backgroundColor: '#004E89'
  }
});
