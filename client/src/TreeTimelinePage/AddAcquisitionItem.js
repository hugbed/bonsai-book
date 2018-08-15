import React, { Component } from 'react';

import TextArea from '../TextArea';
import DatePicker from '../DatePicker';
import Select from '../Select';
import Checkbox from '../Checkbox';
import { Horizontal } from '../Horizontal';
import Input from '../Input';
import { todayString } from '../DateUtils';

import TreeAPI from '../API/Tree';

import styled from 'styled-components';

class AddAcquisitionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acquisition: {
                note: "",
                date: todayString(),
                type: ""
            },
            acquisitionTypes: []
        };
    }
    
    componentWillMount() {
        const _this = this;
        TreeAPI.fetchAcquisitionTypes()
            .then(types => {
                _this.setState({ ..._this.state, acquisitionTypes: types });
            });
    }

    onDateChange(date) {
        this.setState({
            ...this.state,
            acquisition: {
                ...this.state.acquisition,
                date: date
            }
        });
    }

    onNoteChange(note) {
        this.setState({
            ...this.state,
            acquisition: {
                ...this.state.acquisition,
                note: note
            }
        });
    }

    onAcquisitionTypeChange(type) {
        this.setState({
            ...this.state,
            acquisition: {
                ...this.state.acquisition,
                type: type
            }
        });
    }

    onSubmit(event) {
        TreeAPI.addAcquisitionForTree(this.props.tree.id, this.state.acquisition);
        event.preventDefault();
    }

    render() {
        const selectValues = this.state.acquisitionTypes.map((item) => item.name);
        return (
            <form onSubmit={(event) => this.onSubmit(event)}>
                <FormRow>
                    <Horizontal>
                        <label> <FormLabel>Date:</FormLabel>
                        <DatePicker onChange={((date) => this.onDateChange(date))} />
                        </label>
                    </Horizontal>
                </FormRow>
                <FormRow>
                    <Horizontal>
                        <label><FormLabel>Acquisition Type:</FormLabel>
                        <Select values={selectValues} onChange={(type) => this.onAcquisitionTypeChange(type)} />
                        </label>
                    </Horizontal>
                </FormRow>
                <FormRow>
                    <Horizontal>
                        <label> <FormLabel>Age (years):</FormLabel>
                        <Input type="number" step="1"/>
                        </label>
                    </Horizontal>
                </FormRow>
                <FormRow>
                    <Horizontal>
                        <label> <FormLabel>Location:</FormLabel>
                        <Input type="text"/>
                        </label>
                    </Horizontal>
                </FormRow>                
                <FormRow>
                    <TextArea
                        style={{width: '100%'}}
                        placeholder="Comment..."
                        name="comment"
                        cols="40"
                        rows="5"
                        onChange={(note) => this.onNoteChange(note)}></TextArea>
                </FormRow>
                <Input type="submit" />
            </form>
        );
    }
}

const FormLabel = styled.div`
    display: inline-block
    margin-right: 10px
`;

const FormRow = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`;

export default AddAcquisitionItem;
