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
        <View>
          <Text style={styles.revTitle}>{this.props.rev.title}</Text>
          <Text style={styles.revDesc}>"{this.props.rev.rev_desc}"</Text>
        </View>

        <View style={{ position: 'absolute', top: 5, right: 5 }}>

          <TouchableOpacity>
            <Text style={styles.downloadBtnText}>Download</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.flagBtnText}>Flag</Text>
          </TouchableOpacity>

        </View>


      </View>
    );
  }
}

export default RevisionRow;

const vw = percentageWidth => Dimensions.get('window').width * (percentageWidth / 100);
const COLUMNS = 2;
const MARGIN = vw(1);
const SPACING = (COLUMNS + 1) / COLUMNS * MARGIN;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: .5,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 5,
    minHeight: 75
  },
  revTitle: {
    fontWeight: 'bold',
    width: Dimensions.get('window').width - 10 - 10 - 115
  },
  revDesc: {
    fontStyle: 'italic',
    width: Dimensions.get('window').width - 10 - 10 - 115
  },
  downloadBtnText: {
    backgroundColor: '#004E89',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    width: 90,
    textAlign: 'center'
  },
  flagBtnText: {
    backgroundColor: '#9D0600',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    textAlign: 'center'
  }
});
