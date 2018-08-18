import React, { Component } from 'react';

import TextArea from '../TextArea';
import DatePicker from '../DatePicker';
import Select from '../Select';
import { Horizontal } from '../Horizontal';
import Input from '../Input';
import { todayString } from '../DateUtils';
import Card from '../Card';

import TreeAPI from '../API/Tree';

import styled from 'styled-components';

class AddTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acquisition: {
                note: "",
                date: todayString() + 'T00:00',
                type: "",
                age: 0,
                location: ""
            },
            acquisitionTypes: [],
            families: [],
            genus: [],
            species: [],
            type: {
                family: "",
                genus: "",
                species: ""
            }
        };
    }
    
    componentWillMount() {
        const _this = this;
        TreeAPI.fetchAcquisitionTypes()
            .then(types => {
                _this.setState({ ..._this.state, acquisitionTypes: types });
                if (types.length > 0) {
                    _this.onAcquisitionTypeChange(types[0].name);
                }
            });
        TreeAPI.fetchFamilies()
            .then(families => {
                _this.setState({ ..._this.state, families: families });
                if (families.length > 0) {
                    _this.onTreeTypeFieldSelected('family', families[0].name);
                }
            });
        TreeAPI.fetchGenus()
            .then(genus => {
                _this.setState({ ..._this.state, genus: genus });
                if (genus.length > 0) {
                    _this.onTreeTypeFieldSelected('genus', genus[0].name);
                }
            });
        TreeAPI.fetchSpecies()
            .then(species => {
                _this.setState({ ..._this.state, species: species });
                if (species.length > 0) {
                    _this.onTreeTypeFieldSelected('species', species[0].name);
                }
            });
    }

    onTreeTypeFieldSelected(fieldName, value) {
        this.setState({
            ...this.state,
            type: {
                ...this.state.type,
                [fieldName]: value
            }
        });        
    }

    onFamilyTyped(family) {
        // override select box
        if ((family in this.state.families) === false) {
            this.onTreeTypeFieldSelected('family', family);
        }
    }

    onGenusTyped(genus) {
        // override select box
        if ((genus in this.state.genus) === false) {
            this.onTreeTypeFieldSelected('genus', genus);
        }
    }

    onSpeciesTyped(species) {
        // override select box
        if ((species in this.state.species) === false) {
            this.onTreeTypeFieldSelected('species', species);
        }
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

    onAgeChange(age) {
        this.setState({
            ...this.state,
            acquisition: {
                ...this.state.acquisition,
                age: age
            }
        });
    }

    onLocationChange(location) {
        this.setState({
            ...this.state,
            acquisition: {
                ...this.state.acquisition,
                location: location
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

    async onSubmit(event) {
        event.preventDefault();
        const tree = {
            family: this.state.type.family,
            genus: this.state.type.genus,
            species: this.state.type.species,
            acquisition_date: this.state.acquisition.date,
            acquisition_age: this.state.acquisition.age,
            acquisition_location: this.state.acquisition.location,
            acquisition_type: this.state.acquisition.type,
            acquisition_comment: this.state.acquisition.note
        };
        await TreeAPI.addTree(tree);
        window.location.reload(false);
    }

    render() {
        const acquisitionTypes = this.state.acquisitionTypes.map((item) => item.name);
        const families = this.state.families.map((item) => item.name);
        const genus = this.state.genus.map((item) => item.name);
        const species = this.state.species.map((item) => item.name);
        return (
            <Card style={{margin: '6px', padding: '25px'}}>
            <form onSubmit={(event) => this.onSubmit(event)}>
                <FormRow style={{marginTop: '0px'}}>
                    <Horizontal>
                        <label><FormLabel>Family:</FormLabel>
                            <Input type="text" value={this.state.type.family} onChange={(e) => this.onFamilyTyped(e.target.value)}/>
                        </label>
                        <Select values={families} onChange={(family) => this.onTreeTypeFieldSelected('family', family)} />
                    </Horizontal>
                </FormRow>
                <FormRow>
                    <Horizontal>
                        <label><FormLabel>Genus:</FormLabel>
                            <Input type="text" value={this.state.type.genus} onChange={(e) => this.onGenusTyped(e.target.value)}/>
                        </label>
                        <Select values={genus} onChange={(genus) => this.onTreeTypeFieldSelected('genus', genus)} />
                    </Horizontal>
                </FormRow>
                <FormRow>
                    <Horizontal>
                        <label><FormLabel>Species:</FormLabel>
                            <Input type="text" value={this.state.type.species} onChange={(e) => this.onSpeciesTyped(e.target.value)}/>
                        </label>
                        <Select values={species} onChange={(species) => this.onTreeTypeFieldSelected('species', species)} />
                    </Horizontal>
                </FormRow>                                            
                <FormRow>
                    <Horizontal>
                        <label>
                            <FormLabel>Date:</FormLabel>
                            <DatePicker date={this.state.acquisition.date} onChange={((date) => this.onDateChange(date))} />
                        </label>
                    </Horizontal>
                </FormRow>
                <FormRow>
                    <Horizontal>
                        <label>
                            <FormLabel>Acquisition Type:</FormLabel>
                        </label>
                        <Select values={acquisitionTypes} onChange={(type) => this.onAcquisitionTypeChange(type)} />
                    </Horizontal>
                </FormRow>
                <FormRow>
                    <Horizontal>
                        <label>
                            <FormLabel>Age (years):</FormLabel>
                            <Input type="number" step="1" onChange={(event) => this.onAgeChange(event.target.value)}/>
                        </label>
                    </Horizontal>
                </FormRow>
                <FormRow>
                    <Horizontal>
                        <label>
                            <FormLabel>Location:</FormLabel>
                            <Input type="text" onChange={(event) => this.onLocationChange(event.target.value)}/>
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
            </Card>
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

export default AddTree;
