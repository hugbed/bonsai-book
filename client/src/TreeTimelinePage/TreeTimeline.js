import React, { Component } from 'react';
import Tree from '../Tree';
import { dateToString } from '../DateUtils';
import styled from 'styled-components';

class TreeTimeline extends Component {
  constructor(props) {
    super(props);
    this.timelineItemComponents = {
        "acquisition": (item, key) => <TimelineItemAcquisition item={item}/>,
        "maintenance": (item, key) => <TimelineItemMaintenance item={item}/>,
        "photo": (item, key) => <TimelineItemPhoto item={item}/>,
        "note": (item, key) => <TimelineItemNote item={item}/>
    };
  }

  renderTimeline() {
    if (this.props.timeline === undefined) {
      return <div></div>;
    }
    return this.props.timeline.map((item, i) => 
      this.timelineItemComponents[item.type](item, i)
    );
  }

  render() {
    return (
      <div>
        <div style={{margin: '25px'}}>
          <Tree tree={this.props.tree} editable={false}/>
        </div>
        <div style={{margin: '25px'}}>
          Recent Activity
          <div> { this.renderTimeline() } </div>
        </div>
      </div>
    );
  }
}

class TimelineItemAcquisition extends Component {
  render() {
    const item = this.props.item;
    return (
      <TimelineItem>Acquisition on { dateToString(new Date(item.date)) }</TimelineItem>
    );
  }
}

class TimelineItemMaintenance extends Component {
  render() {
    const item = this.props.item;
    return (
      <TimelineItem>
        { item.maintenance_type_name } on { dateToString(new Date(item.date)) }
      </TimelineItem>
    );
  }
}

class TimelineItemPhoto extends Component {
  render() {
    const item = this.props.item;
    return (
      <TimelineItem>Photo, { dateToString(new Date(item.date)) }</TimelineItem>
    );
  }
}

class TimelineItemNote extends Component {
  render() {
    const item = this.props.item;
    return (
      <TimelineItem>Note, { dateToString(new Date(item.date)) }</TimelineItem>
    );
  }
}

const TimelineItem = styled.div`
  margin: 25px;
`;

export default TreeTimeline;
