import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@exponent/vector-icons';

class TopRow extends React.Component {
  constructor(props) {
    super(props);
    this._getAverageValues = this._getAverageValues.bind(this);
    this._getProfAvgRatings = this._getProfAvgRatings.bind(this);
    this._decodeProf = this._decodeProf.bind(this);
    this._decodeWorkload = this._decodeWorkload.bind(this);
    this._decodeFairness = this._decodeFairness.bind(this);
    this._getStarName = this._getStarName.bind(this);
  }

  _getAverageValues() {
    let length = this.props.courseReviews.length || 1;
    let sumRatings = this.props.courseReviews.reduce((a, b) => {
      return {
        overall_rating: a.overall_rating + b.overall_rating,
        workload_rating: a.workload_rating + b.workload_rating,
        fairness_rating: a.fairness_rating + b.fairness_rating,
        prof_rating: a.prof_rating + b.prof_rating
      };
    }, {
      overall_rating: 0,
      workload_rating: 0,
      fairness_rating: 0,
      prof_rating: 0
    });

    return {
      overallRating: sumRatings.overall_rating / length,
      workloadRating: Math.round(sumRatings.workload_rating / length),
      fairnessRating: Math.round(sumRatings.fairness_rating / length),
      profRating: Math.round(sumRatings.prof_rating / length)
    };
  }

  _getProfAvgRatings() {
    let profRatingSum = {};
    let profRatingCount = {};
    this.props.courseReviews.forEach(review => {
      profRatingSum[review.name] = profRatingSum[review.name] ? profRatingSum[review.name] + review.prof_rating : review.prof_rating;
      profRatingCount[review.name] = profRatingCount[review.name] ? profRatingCount[review.name] + 1 : 1;
    });
    return Object.keys(profRatingSum)[0] ? Object.keys(profRatingSum).map((profName, index) =>
      <Text key={index} style={styles.textRow}>• {profName}: {this._decodeProf(Math.round(profRatingSum[profName] / profRatingCount[profName]))}</Text>
    ) : <Text style={styles.textRow}>Not Available</Text>;
  }

  _decodeWorkload(value) {
    switch(value) {
      case 1:
        return 'Too little';
      case 2:
        return 'Too much';
      case 3:
        return 'Fair';
      default:
        return 'Not Available';
    }
  }

  _decodeFairness(value) {
    switch(value) {
      case 1:
        return 'Too easy';
      case 2:
        return 'Too difficult';
      case 3:
        return 'Fair';
      default:
        return 'Not Available';
    }
  }

  _decodeProf(value) {
    switch(value) {
      case 1:
        return 'Not good';
      case 2:
        return 'Below average';
      case 3:
        return 'Average';
      case 4:
        return 'Above average';
      case 5:
        return 'Excellent!';
      default:
        return 'Not Available';
    }
  }

  _getStarName(rating, number) {
    if (rating >= number) return 'star';
    else if (rating > number - 1) return 'star-half-full';
    else return 'star-o';
  }

  render() {
    let profAvgs = this._getProfAvgRatings();
    let overallAvgs = this._getAverageValues();
    return (
      <View style={styles.container}>
        <Text style={styles.headerText} onPress={() => this.setState({showDetails: !this.state.showDetails})}>Summary:</Text>

        <View style={styles.dividedRow}>
          <View style={{flex: 1, padding: 5}}>
            <Text style={styles.topRowLabel}>Average Ratings:</Text>
            <Text style={styles.textRow}>
              Overall: <FontAwesome name={this._getStarName(overallAvgs.overallRating, 1)} size={19} color='black' />
              <FontAwesome name={this._getStarName(overallAvgs.overallRating, 2)} size={19} color='black' />
              <FontAwesome name={this._getStarName(overallAvgs.overallRating, 3)} size={19} color='black' />
              <FontAwesome name={this._getStarName(overallAvgs.overallRating, 4)} size={19} color='black' />
              <FontAwesome name={this._getStarName(overallAvgs.overallRating, 5)} size={19} color='black' />
            </Text>
            <Text style={styles.textRow}>Teaching: {this._decodeProf(overallAvgs.profRating)}</Text>
            <Text style={styles.textRow}>Evaluation: {this._decodeFairness(overallAvgs.fairnessRating)}</Text>
            <Text style={styles.textRow}>Workload: {this._decodeWorkload(overallAvgs.workloadRating)}</Text>
          </View>
          <View style={{flex: 1, padding: 5}}>
            <Text style={styles.topRowLabel}>Previous Instructors:</Text>
            {profAvgs}
          </View>
        </View>

      </View>
    );
  }
}

export default TopRow;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: '#004E89',
    borderBottomWidth: .5
  },
  headerText: {
    backgroundColor: '#004E89',
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  topRowLabel: {
    color: '#004E89',
    fontWeight: 'bold',
    borderBottomWidth: .5,
    borderColor: '#004E89',
  },
  textRow: {
    paddingTop: 5
  },
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
