import React, { Component } from 'react';

import FileInput from '../FileInput';
import Input from '../Input';
import { FormLabel, FormRow } from '../Form';
import { todayString } from '../DateUtils';
import { Horizontal } from '../Horizontal';
import DatePicker from '../DatePicker';
import TextArea from '../TextArea';

import TreeAPI from '../API/Tree';

class AddPhotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            date: todayString() + 'T04:00',
            comment: ""
        };
    }

    editField(name, value) {
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    onFileChange(files) {
        const file = files[0]; // 1 photo at a time
        this.editField("file", file);
    }

    onDateChange(date) {
        this.editField("date", date);
    }

    onCommentChange(comment) {
        this.editField("comment", comment);
    }

    async onSubmit(event) {
        event.preventDefault();
        await TreeAPI.addPhotoForTree(
            this.props.tree.id,
            { date: this.state.date, comment: this.state.comment },
            this.state.file
        );
        window.location.reload(false);
    }

    render() {
        return (
            <form onSubmit={(event) => this.onSubmit(event)}>
                <FormRow>
                    <Horizontal>
                        <label>
                            <FormLabel>Date:</FormLabel>
                            <DatePicker date={this.state.date} onChange={((date) => this.onDateChange(date))} />
                        </label>
                    </Horizontal>
                </FormRow>
                <FormRow>
                    <Horizontal>
                        <label>
                            <FormLabel>File:</FormLabel>
                            <FileInput onChange={(files) => this.onFileChange(files)} />
                        </label>
                    </Horizontal>
                </FormRow>
                <FormRow>
                    <TextArea
                        style={{width: '100%'}}
                        placeholder="Comment..."
                        value={this.state.comment}
                        name="comment"
                        rows="5"
                        onChange={(comment) => this.onCommentChange(comment)}></TextArea>
                </FormRow>
                <FormRow>
                    <Input type="submit" />
                </FormRow>
            </form>
        );
    }
}

export default AddPhotoItem;