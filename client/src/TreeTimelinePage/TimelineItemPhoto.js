import React, { Component } from 'react';

import { FormLabel, FormRow } from '../Form';
import TextArea from '../TextArea';
import DatePicker from '../DatePicker';
import { Horizontal } from '../Horizontal';
import { todayString } from '../DateUtils';
import Input from '../Input';
import Comment from './Comment';
import DateFooter from './DateFooter';
import { dateToString, dateToAgo, dateTimeToLocal } from '../DateUtils';
import TimelineItem from './TimelineItem';
import styled from 'styled-components';
import { EditButton } from '../IconButton';

import TreeAPI from '../API/Tree';

class TimelineItemPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false,
            date: todayString(),
            comment: ""
        };
    }

    componentDidMount() { this.updateDateFromProps(); }
    componentDidUpdate(prevProps) { this.updateDateFromProps(prevProps); }

    updateDateFromProps(prevProps) {
        if ((prevProps === undefined && this.props !== undefined) ||
            (prevProps.item === undefined && this.props.item !== undefined)) {
            this.setState({
                date: dateTimeToLocal(this.props.item.date)
            });
            this.setState({
                comment: this.props.item.comment
            });
        }
    }

    onDateChange(date) {
        this.setState({
            ...this.state,
            date: date
        });
    }

    onCommentChange(comment) {
        this.setState({
            ...this.state,
            comment: comment
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const item = this.props.item;
        const photo = {
            id: item.id,
            tree_id: item.tree_id,
            date: this.state.date,
            comment: this.state.comment,
            filepath: this.props.item.filepath
        }
        TreeAPI.updatePhoto(photo);
        this.onToggleEdit();
    }

    onToggleEdit() {
        this.setState({
            ...this.state,
            update: !this.state.update
        });
    }

    renderRead(item) {
        return (
            <div>
                <Comment> { this.state.comment } </Comment>
                <DateFooter>
                { dateToAgo(new Date(this.state.date)) } ({ dateToString(new Date(this.state.date)) })
                </DateFooter>
            </div>
        );
    }

    renderUpdate(item) {
        return (
            <form onSubmit={(event) => this.onSubmit(event)}>
                <FormRow>
                    <TextArea
                        style={{width: '100%'}}
                        placeholder="Comment..."
                        name="comment"
                        value={this.state.comment}
                        rows="5"
                        onChange={(comment) => this.onCommentChange(comment)}></TextArea>
                </FormRow>
                <FormRow>
                    <Horizontal>
                        <label>
                            <FormLabel>Date:</FormLabel>
                            <DatePicker date={this.state.date} onChange={((date) => this.onDateChange(date))} />
                        </label>
                    </Horizontal>
                </FormRow>
                <FormRow>
                    <Input type="submit" />
                </FormRow>
            </form>
        );
    }

    render() {
      const item = this.props.item;
      const filepath = item.filepath !== undefined ? item.filepath : "";
      return (
        <TimelineItem>
          <HorizontalEnd>
              <EditButtonSmall onClick={() => this.onToggleEdit()}> ... </EditButtonSmall>
          </HorizontalEnd>
          <img
            alt={item.filepath}
            style={{width: '100%'}}
            src={`/trees/tree/photo/file/${filepath}`} />
            { this.state.update === true ? this.renderUpdate(item) : this.renderRead(item) }
        </TimelineItem>
      );
    }
  }

  const HorizontalEnd = Horizontal.extend`
    display: flex;
    justify-content: flex-end;
  `;

  const EditButtonSmall = styled.button`
    margin-bottom: 10px;
  `;

  export default TimelineItemPhoto;