import React, { Component } from 'react';

import TextArea from '../TextArea';
// import DatePicker from '../DatePicker';

// import Checkbox from '../Checkbox';
import TreeAPI from '../API/Tree';

// import styled from 'styled-components';

class AddNoteItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: "",
            date: ""
        };
    }

    onDateChange(date) {
        this.setState({
            ...this.state,
            date: date
        });
    }

    onNoteChange(note) {
        this.setState({
            ...this.state,
            note: note
        });
    }

    async onSubmit(event) {
        event.preventDefault();
        await TreeAPI.addNoteForTree(this.props.tree.id, this.state.note);
        window.location.reload(false); 
    }

    render() {
        return (
            <form onSubmit={(event) => this.onSubmit(event)}>
                {/* <DatePicker onChange={((date) => this.onDateChange(date))} /> */}
                <TextArea
                    style={{width: '100%'}}
                    placeholder="Comment..."
                    name="comment"
                    cols="40"
                    rows="5"
                    onChange={(note) => this.onNoteChange(note)}></TextArea>
                <input type="submit" />
            </form>
        );
    }
}

export default AddNoteItem;