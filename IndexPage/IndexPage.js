import React from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import CoursesContainer from './CoursesContainer.js';
import PageLoadError from '../Partials/PageLoadError.js';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      pageError: false,
      courses: [],
      updates: [],
      instId: ''
    };
    this._conditionData = this._conditionData.bind(this);
    this._renderPageAfterData = this._renderPageAfterData.bind(this);
  }

  componentDidMount() {
    fetch('http://127.0.0.1:19001/api/home', {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(resJSON => this._conditionData(resJSON))
    .catch(() => this.setState({ dataLoaded: true, pageError: true }));
  }

  _conditionData(resJSON) {
    if (resJSON) {
      resJSON.dataLoaded = true;
      this.setState(resJSON);
    } else {
      throw 'Server returned false';
    }
  }

  _renderPageAfterData() {
    if (this.state.dataLoaded && this.state.pageError) return <PageLoadError />;
    else if (this.state.dataLoaded) return <CoursesContainer courses={this.state.courses} instId={this.state.instId} />;
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

export default IndexPage;
