import React from 'react';
import {
  ScrollView,
  View,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import PageLoadError from '../Partials/PageLoadError.js';
import CoursesContainer from './CoursesContainer.js';

class InstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      pageError: false,
      instId: this.props.instId,
      instList: [],
      currInstCourses: [],
      currUserCourseIds: [],
      filterPhrase: ''
    };
    this._loadComponentData = this._loadComponentData.bind(this);
    this._conditionData = this._conditionData.bind(this);
    this._findInstName = this._findInstName.bind(this);
    this._saveFilterPhrase = this._saveFilterPhrase.bind(this);
    this._filterCourseList = this._filterCourseList.bind(this);
    this._renderPageAfterData = this._renderPageAfterData.bind(this);
  }

  componentDidMount() {
    this._loadComponentData(this.state.instId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.instId && (this.state.instId !== nextProps.instId)) {
      this._loadComponentData(nextProps.instId);
    }
  }

  _loadComponentData(instId) {
    instId = instId || this.state.instId;
    fetch(`http://127.0.0.1:19001/api/institutions/${instId}`, {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(resJSON => this._conditionData(resJSON, instId))
    .catch(() => this.setState({ dataLoaded: true, pageError: true }));
  }

  _conditionData(resJSON, instId) {
    if (resJSON) {
      resJSON.instId = instId;
      resJSON.dataLoaded = true;
      this.setState(resJSON);
    } else {
      console.log("Error here: InstPage.js: Server Error: ", err);
      this.setState({ dataLoaded: true, pageError: true });
    }
  }

  _findInstName() {
    let inst = this.state.instList.find(inst => inst.id == this.state.instId);
    return inst ? inst.inst_display_name : '';
  }

  _saveFilterPhrase(filterPhrase) {
    this.setState({ filterPhrase });
  }

  _filterCourseList() {
    let phrase = new RegExp(this.state.filterPhrase.toLowerCase());
    return this.state.currInstCourses.filter(course => course.full_display_name.toLowerCase().match(phrase)).slice(0, 14);
  }

  _renderPageAfterData() {
    if (this.state.dataLoaded && this.state.pageError) return <PageLoadError />;
    else if (this.state.dataLoaded) return (
      <CoursesContainer
        instName={this._findInstName()}
        instList={this.state.instList}
        reload={this._loadComponentData}
        handleFilter={this._saveFilterPhrase}
        courses={this._filterCourseList()}
        currInstCourses={this.state.currInstCourses}
        currUserCourseIds={this.state.currUserCourseIds}
        instId={this.state.instId}
      />
    );
    else return <ActivityIndicator animating={true} style={{height: 80}} size="large" color="#004E89" />;
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

export default InstPage;
