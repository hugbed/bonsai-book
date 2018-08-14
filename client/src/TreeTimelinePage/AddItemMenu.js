import React, { Component } from 'react';

import Select from '../Select';

import AddMaintenanceItem from './AddMaintenanceItem';
import AddAcquisitionItem from './AddAcquisitionItem';
import AddPhotoItem from './AddPhotoItem';
import AddNoteItem from './AddNoteItem';

import styled from 'styled-components';

const options = [ "note", "maintenance", "photo" ];

const optionComponents = {
    "note": (tree) => <AddNoteItem tree={tree} />,
    "maintenance": (tree) => <AddMaintenanceItem tree={tree} />,
    "photo": (tree) => <AddPhotoItem tree={tree}/>
};

class AddItemMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: "note"
        };
    }

    onOptionChange(option) {
        this.setState({
            ...this.state,
            option: option
        })
    }

    onAdd(item) {
        console.log("Adding: " + item);
    }

    render() {
        return (
            <div>
                <label>
                    <InputLabel>Post an event</InputLabel>
                    <Select values={options} onChange={(option) => this.onOptionChange(option)} />
                </label>
                <OptionComponentContainer>
                    { optionComponents[this.state.option](this.props.tree) }
                </OptionComponentContainer>
            </div>
        );
    }
}

const InputLabel = styled.div`
    display: inline-block;
    margin-right: 10px;
`

const OptionComponentContainer = styled.div`
    margin: 25px;
`;

export default AddItemMenu;