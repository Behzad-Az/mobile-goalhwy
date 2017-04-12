import React from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import PageLoadError from '../Partials/PageLoadError.js';
import TopRow from './TopRow.js';
import RevisionsContainer from './RevisionsContainer.js';

class DocPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      pageError: false,
      courseInfo: {
        id: this.props.courseId
      },
      docInfo: {
        id: this.props.docId,
        revisions: []
      }
    };
    this._loadComponentData = this._loadComponentData.bind(this);
    this._conditionData = this._conditionData.bind(this);
    this._renderPageAfterData = this._renderPageAfterData.bind(this);
  }

  componentDidMount() {
    this._loadComponentData(this.state.courseInfo.id, this.state.docInfo.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.docId !== this.state.docInfo.id || nextProps.courseId  !== this.state.courseInfo.id) {
      this._loadComponentData(nextProps.courseId, nextProps.docId);
    }
  }

  _loadComponentData(courseId, docId) {
    courseId = courseId || this.state.courseInfo.id;
    docId = docId || this.state.docInfo.id;
    fetch(`http://127.0.0.1:19001/api/courses/${courseId}/docs/${docId}`, {
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
    else if (this.state.dataLoaded) return (
      <View>
        <TopRow title={this.state.docInfo.title} courseInfo={this.state.courseInfo} />
        <RevisionsContainer docInfo={this.state.docInfo} />
      </View>
    );
    else return <ActivityIndicator animating={true} style={{height: 80}} size='large' color='#004E89' />;
  }

  render() {
    return (
      <ScrollView>
        <View style={{marginTop: 89, minHeight: Dimensions.get('window').height - 89, backgroundColor: '#ddd', paddingTop: 5}}>
          { this._renderPageAfterData() }
        </View>
      </ScrollView>
    );
  }
}

export default DocPage;
