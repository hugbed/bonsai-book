import React, { Component } from 'react';

import Select from '../Select';

import AddMaintenanceItem from './AddMaintenanceItem';
import AddAcquisitionItem from './AddAcquisitionItem';
import AddPhotoItem from './AddPhotoItem';
import AddNoteItem from './AddNoteItem';

import styled from 'styled-components';

const options = [ "note", "maintenance", "acquisition", "photo" ];

const optionComponents = {
    "maintenance": (tree) => <AddMaintenanceItem tree={tree} />,
    "acquisition": (tree) => <AddAcquisitionItem tree={tree} />,
    "photo": (tree) => <AddPhotoItem tree={tree}/>,
    "note": (tree) => <AddNoteItem tree={tree} />
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
                <div>
                    Post an event
                    <Select values={options} onChange={(option) => this.onOptionChange(option)} />
                </div>
                <OptionComponentContainer>
                    { optionComponents[this.state.option](this.props.tree) }
                </OptionComponentContainer>
            </div>
        );
    }
}

const OptionComponentContainer = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`;

export default AddItemMenu;