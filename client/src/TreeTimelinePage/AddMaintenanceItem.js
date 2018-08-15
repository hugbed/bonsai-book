import React, { Component } from 'react';

import TextArea from '../TextArea';
import DatePicker from '../DatePicker';
import Select from '../Select';
import { Horizontal } from '../Horizontal';
import Input from '../Input';
import { todayString } from '../DateUtils';
import { FormLabel, FormRow } from '../Form';

import TreeAPI from '../API/Tree';

class AddMaintenanceItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maintenance: {
                date: todayString(),
                type: "",
                comment: ""
            },
            maintenanceTypes: []
        };
    }
    
    componentWillMount() {
        const _this = this;
        TreeAPI.fetchMaintenanceTypes()
            .then(types => {
                _this.setState({
                    ..._this.state,
                    maintenance: {
                        ...this.state.maintenance,
                        type: types[0] ? types[0].name : ""
                    },
                    maintenanceTypes: types
                });
            });
    }

    editField(name, value) {
        this.setState({
            ...this.state,
            maintenance: {
                ...this.state.maintenance,
                [name]: value
            }
        });
    }

    onDateChange(date) {
        this.editField("date", date);
    }

    onMaintenanceTypeChange(type) {
        this.editField("type", type);
    }

    onCommentChange(comment) {
        this.editField("comment", comment);
    }

    async onSubmit(event) {
        event.preventDefault();
        await TreeAPI.addMaintenanceForTree(this.props.tree.id, this.state.maintenance);
        window.location.reload(false);
    }

    render() {
        const selectValues = this.state.maintenanceTypes.map((item) => item.name);
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
                        <label><FormLabel>Maintenance Type:</FormLabel>
                        <Select values={selectValues} onChange={(type) => this.onMaintenanceTypeChange(type)} />
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
                        onChange={(comment) => this.onCommentChange(comment)}></TextArea>
                </FormRow>
                <Input type="submit" />
            </form>
        );
    }
}

export default AddMaintenanceItem;