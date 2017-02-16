import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

class RevisionRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.dividedRow}>
          <TouchableOpacity style={{ flex: 4 }}>
            <Text style={[{backgroundColor: '#004E89'}, styles.lowerBtn]}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }}>
            <Text style={[{backgroundColor: '#9D0600'}, styles.lowerBtn]}>Flag</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginBottom: 35}}>
          <Text style={styles.revTitle}>{this.props.rev.title}</Text>
          <Text style={styles.revDesc}>"{this.props.rev.rev_desc}"</Text>
        </View>


      </View>
    );
  }
}

export default RevisionRow;

// const vw = percentageWidth => Dimensions.get('window').width * (percentageWidth / 100);
// const COLUMNS = 2;
// const MARGIN = vw(1);
// const SPACING = (COLUMNS + 1) / COLUMNS * MARGIN;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: .5,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 5
  },
  revTitle: {
    fontWeight: 'bold'
  },
  revDesc: {
    fontStyle: 'italic'
  },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    position: 'absolute',
    bottom: 5,
    left: 5
  },
  lowerBtn: {
    color: 'white',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
    margin: 5
  }
});
