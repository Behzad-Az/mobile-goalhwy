import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import PageLoadError from '../Partials/PageLoadError.js';
import TopRow from './TopRow.js';
import DocsContainer from './DocsContainer.js';

class CoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      pageError: false,
      courseInfo: {
        id: this.props.courseId
      },
      courseFeed: [],
      itemsForSale: [],
      sampleQuestions: [],
      asgReports: [],
      lectureNotes: []
    };
    this._loadComponentData = this._loadComponentData.bind(this);
    this._conditionData = this._conditionData.bind(this);
    this._renderPageAfterData = this._renderPageAfterData.bind(this);
  }

  componentDidMount() {
    this._loadComponentData(this.state.courseInfo.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.courseId !== this.state.courseInfo.id) {
      this._loadComponentData(nextProps.courseId);
    }
  }

  _loadComponentData(courseId) {
    courseId = courseId || this.state.courseInfo.id;
    fetch(`http://127.0.0.1:19001/api/courses/${courseId}`, {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(resJSON => this._conditionData(resJSON))
    .catch(() => this.setState({ dataLoaded: true, pageError: true }));
  }

  _conditionData(resJSON) {
    if (resJSON) {
      let filterDocs = (docs, docType) => docs.filter(doc => doc.type === docType);
      let newState = {
        courseInfo: resJSON.courseInfo,
        courseFeed: resJSON.courseFeed,
        itemsForSale: resJSON.itemsForSale,
        sampleQuestions: filterDocs(resJSON.docs, 'sample_question'),
        asgReports: filterDocs(resJSON.docs, 'asg_report'),
        lectureNotes: filterDocs(resJSON.docs, 'lecture_note'),
        dataLoaded: true
      };
      this.setState(newState);
    } else {
      throw 'Server returned false';
    }
  }

  _renderPageAfterData() {
    if (this.state.dataLoaded && this.state.pageError) return <PageLoadError />;
    else if (this.state.dataLoaded) return (
      <View>
        <TopRow courseInfo={this.state.courseInfo} />
        <DocsContainer header='Assignment & Reports:' docs={this.state.asgReports} courseId={this.state.courseInfo.id} />
        <DocsContainer header='Lecture Notes:' docs={this.state.lectureNotes} courseId={this.state.courseInfo.id} />
        <DocsContainer header='Sample Questions:' docs={this.state.sampleQuestions} courseId={this.state.courseInfo.id} />
        <DocsContainer header='Items for Sale or Trade:' docs={this.state.itemsForSale} courseId={this.state.courseInfo.id} />
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

export default CoursePage;
