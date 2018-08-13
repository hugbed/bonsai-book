import React, { Component } from 'react';
import Tree from '../Tree';
import AddItemMenu from './AddItemMenu';
import { dateToString } from '../DateUtils';
import styled from 'styled-components';

class TreeTimeline extends Component {
  constructor(props) {
    super(props);
    this.timelineItemComponents = {
        "acquisition": (item, key) => <TimelineItemAcquisition key={key} item={item}/>,
        "maintenance": (item, key) => <TimelineItemMaintenance key={key} item={item}/>,
        "photo": (item, key) => <TimelineItemPhoto key={key} item={item}/>,
        "note": (item, key) => <TimelineItemNote key={key} item={item}/>
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
        <div style={{margin:'25px'}}>
          <AddItemMenu tree={this.props.tree} />
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
      <TimelineItem>Acquisition ({ dateToString(new Date(item.date)) })</TimelineItem>
    );
  }
}

class TimelineItemMaintenance extends Component {
  render() {
    const item = this.props.item;
    return (
      <TimelineItem>
        { item.maintenance_type_name } ({ dateToString(new Date(item.date)) })
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
      <TimelineItem>Note ({ dateToString(new Date(item.date)) }): {item.comment} </TimelineItem>
    );
  }
}

const TimelineItem = styled.div`
  margin: 25px;
`;

export default TreeTimeline;
