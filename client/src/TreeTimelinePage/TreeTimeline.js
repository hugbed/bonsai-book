import React, { Component } from 'react';
import Tree from '../Tree';
import AddItemMenu from './AddItemMenu';
import Card from '../Card';
import { dateToString, dateToAgo } from '../DateUtils';
import { FormLabel, FormRow } from '../Form';
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
        <details>
            <Summary>Post an event</Summary>
            <div style={{margin:'25px'}}>
              <AddItemMenu tree={this.props.tree} />
            </div>
          </details>
        <div style={{margin: '25px'}}>
          <div> { this.renderTimeline() } </div>
        </div>
      </div>
    );
  }
}

const Summary = styled.summary`
  padding: 7px;
  margin: 7px;
  cursor: pointer;
  outline: none;
`;

class TimelineItemAcquisition extends Component {
  render() {
    const item = this.props.item;
    return (
      <TimelineItem>
        <CardTitle>
          Acquisition
        </CardTitle>
        <Comment> { item.comment } </Comment>
        <DateFooter>
          { dateToAgo(new Date(item.date)) } ({ dateToString(new Date(item.date)) })
        </DateFooter>
      </TimelineItem>
    );
  }
}

class TimelineItemMaintenance extends Component {
  render() {
    const item = this.props.item;
    return (
      <TimelineItem>
        <CardTitle>
          { item.maintenance_type_name }
        </CardTitle>
        <Comment> { item.comment } </Comment>
        <DateFooter>
          { dateToAgo(new Date(item.date)) } ({ dateToString(new Date(item.date)) })
        </DateFooter>
      </TimelineItem>
    );
  }
}

class TimelineItemPhoto extends Component {
  render() {
    const item = this.props.item;
    return (
      <TimelineItem>
        <img
          alt={item.filepath}
          style={{width: '100%'}}
          src={`/trees/tree/photo/file/${item.filepath}`} />
        <Comment> { item.comment } </Comment>
        <DateFooter>
          { dateToAgo(new Date(item.date)) } ({ dateToString(new Date(item.date)) })
        </DateFooter>
      </TimelineItem>
    );
  }
}

class TimelineItemNote extends Component {
  render() {
    const item = this.props.item;
    return (
      <TimelineItem>
        <Comment> { item.comment } </Comment>
        <DateFooter> { dateToString(new Date(item.date)) } </DateFooter>
      </TimelineItem>
    );
  }
}

const CardTitle = FormLabel.extend`
    padding-bottom: 15px;
    box-shadow: 0 3px 3px -3px rgba(0,0,0,0.3);
    padding-left: 10px;
    width: 100%;
`;

const Comment = styled.div`
  margin-top: 10px;
  padding-left: 10px;
`;

const DateFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
`;

const TimelineItem = Card.extend`
  margin-bottom: 10px;
`;

export default TreeTimeline;
