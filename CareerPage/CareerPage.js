import React from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import PageLoadError from '../Partials/PageLoadError.js';
import JobSearchForm from './JobSearchForm.js';
import JobsContainer from './JobsContainer.js';

class CareerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      pageError: false,
      jobs: [],
      resumes: []
    };
    this._loadComponentData = this._loadComponentData.bind(this);
    this._conditionData = this._conditionData.bind(this);
    this._renderPageAfterData = this._renderPageAfterData.bind(this);
  }

  componentDidMount() {
    this._loadComponentData();
  }

  _loadComponentData() {
    fetch('http://127.0.0.1:19001/api/jobs', {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(resJSON => this._conditionData(resJSON))
    .catch(() => this.setState({ dataLoaded: true, pageError: true }));
  }

  _conditionData(resJSON) {
    if (resJSON) {
      let resumes = resJSON.resumes;
      let jobs = resJSON.jobs.map(data => {
        return {
          ...data._source.pin,
          tags: data._source.pin.search_text.split(' ')
        };
      });
      this.setState({ jobs, resumes, dataLoaded: true });
    } else {
      throw 'Server returned false';
    }
  }

  _renderPageAfterData() {
    if (this.state.dataLoaded && this.state.pageError) return <PageLoadError />;
    else if (this.state.dataLoaded) return (
      <View>
        <JobSearchForm reload={this._loadComponentData} />
        <JobsContainer jobs={this.state.jobs} />
      </View>
    );
    else return <ActivityIndicator animating={true} style={{height: 80}} size='large' color='#004E89' />;
  }

  render() {
    return (
      <ScrollView>
        <View style={{marginTop: 89, minHeight: Dimensions.get('window').height - 89, backgroundColor: '#ddd', paddingTop: 5 }}>
          { this._renderPageAfterData() }
        </View>
      </ScrollView>
    );
  }
}

export default CareerPage;
