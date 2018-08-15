import React, { Component } from 'react';

import Select from '../Select';

import AddMaintenanceItem from './AddMaintenanceItem';
// import AddAcquisitionItem from './AddAcquisitionItem';
import AddPhotoItem from './AddPhotoItem';
import AddNoteItem from './AddNoteItem';
import Card from '../Card';
import { FormLabel, FormRow } from '../Form';
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

    render() {
        return (
            <Card>
                <EventTypeContainer>
                    <label style={{margin: '25px'}}>
                        <FormLabel>Event type: </FormLabel>
                        <Select values={options} onChange={(option) => this.onOptionChange(option)} />
                    </label>
                </EventTypeContainer>
                <OptionComponentContainer>
                    { optionComponents[this.state.option](this.props.tree) }
                </OptionComponentContainer>
            </Card>
        );
    }
}

// const InputLabel = styled.div`
//     display: inline-block;
//     margin-right: 10px;
// `

const EventTypeContainer = FormRow.extend`
    padding-bottom: 15px;
    box-shadow: 0 3px 3px -3px rgba(0,0,0,0.3);
`;

const OptionComponentContainer = styled.div`
    margin-left: 25px;
    margin-right: 25px;
    margin-top: 25px;
`;

const stuff = styled.div`
    box-shadow: 0 3px 7px -3px rgba(0, 0, 0, 0.3);
    margin: 6px;
    border-radius: 4px;
    background-color: white;
    padding-top: 25px;
    padding-bottom: 1px;
    padding-right: 20px;
`;

export default AddItemMenu;