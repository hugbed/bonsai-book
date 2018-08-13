import React, { Component } from 'react';

import TextArea from '../TextArea';
import TreeAPI from '../API/Tree';

class AddNoteItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: ""
        };
    }

    onChange(note) {
        this.setState({
            note: note
        });
    }

    onSubmit(event) {
        TreeAPI.addNoteForTree(this.props.tree.id, this.state.note);
        event.preventDefault();
    }
    
    render() {
        return (
            <form onSubmit={(event) => this.onSubmit(event)}>
                <TextArea style={{width: '100%'}} name="comment" cols="40" rows="5" onChange={(note) => this.onChange(note)}></TextArea>
                <input type="submit" />
            </form>
        );
    }
}

export default AddNoteItem;