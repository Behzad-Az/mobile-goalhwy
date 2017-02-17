import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

class TopRow extends React.Component {
  constructor(props) {
    super(props);
    this.getAverageValues = this.getAverageValues.bind(this);
    this.getProfAvgRatings = this.getProfAvgRatings.bind(this);
    this.decodeProf = this.decodeProf.bind(this);
    this.decodeWorkload = this.decodeWorkload.bind(this);
    this.decodeFairness = this.decodeFairness.bind(this);
  }

  getAverageValues() {
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
      overall_rating: Math.round(sumRatings.overall_rating / length * 2) / 2,
      workload_rating: Math.round(sumRatings.workload_rating / length),
      fairness_rating: Math.round(sumRatings.fairness_rating / length),
      prof_rating: Math.round(sumRatings.prof_rating / length)
    };
  }

  getProfAvgRatings() {
    let profRatingSum = {};
    let profRatingCount = {};
    this.props.courseReviews.forEach(review => {
      profRatingSum[review.name] = profRatingSum[review.name] ? profRatingSum[review.name] + review.prof_rating : review.prof_rating;
      profRatingCount[review.name] = profRatingCount[review.name] ? profRatingCount[review.name] + 1 : 1;
    });
    return Object.keys(profRatingSum).map((profName, index) => <Text key={index}>{profName}: {this.decodeProf(Math.round(profRatingSum[profName] / profRatingCount[profName]))}</Text> );
  }

  decodeWorkload(value) {
    switch(value) {
      case 1:
        return "Too little";
      case 2:
        return "Too much";
      case 3:
        return "Fair";
      default:
        return "unknown";
    };
  }

  decodeFairness(value) {
    switch(value) {
      case 1:
        return "Too easy";
      case 2:
        return "Too difficult";
      case 3:
        return "Fair";
      default:
        return "unknown";
    };
  }

  decodeProf(value) {
    switch(value) {
      case 1:
        return "Not good";
      case 2:
        return "Below average";
      case 3:
        return "Average";
      case 4:
        return "Above average";
      case 5:
        return "Excellent!";
      default:
        return "unknown";
    };
  }

  getStarName(rating, number) {
    if (rating >= number) return "star";
    else if (rating > number - 1) return "star-half-full";
    else return "star-o";
  }

  render() {
    let profAvgs = this.getProfAvgRatings();
    let overallAvgs = this.getAverageValues();
    return (
      <View>

        <View style={styles.dividedRow}>
          <View style={{flex: 1}}>
            <Text>Previous Instructors:</Text>
            {profAvgs}
          </View>

          <View style={{flex: 1}}>
            <Text>
              Overall: <FontAwesome name={this.getStarName(overallAvgs.overall_rating, 1)} size={19} color="black" />
              <FontAwesome name={this.getStarName(overallAvgs.overall_rating, 2)} size={19} color="black" />
              <FontAwesome name={this.getStarName(overallAvgs.overall_rating, 3)} size={19} color="black" />
              <FontAwesome name={this.getStarName(overallAvgs.overall_rating, 4)} size={19} color="black" />
              <FontAwesome name={this.getStarName(overallAvgs.overall_rating, 5)} size={19} color="black" />
            </Text>
            <Text>Teaching: {this.decodeProf(overallAvgs.prof_rating)}</Text>
            <Text>Evaluation: {this.decodeFairness(overallAvgs.fairness_rating)}</Text>
            <Text>Workload: {this.decodeWorkload(overallAvgs.workload_rating)}</Text>
          </View>

        </View>
      </View>
    );
  }
}

export default TopRow;

const styles = StyleSheet.create({
  dividedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

