import React, { Component } from 'react';
import styled from 'styled-components';

import Style from './Style';

import { dateToString } from './DateUtils';

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.todayDate()
        };
    }

    onChange(event) {
        this.setState({date: event.target.value});
    }

    todayDate() {
        return dateToString(new Date(Date.now()));
    }
    
    render() {
        return (
            <DateContainer>
                <InputDate
                    type="date"
                    onChange={(event) => this.onChange(event)}
                    value={this.state.date} />
            </DateContainer>
        );
    }
}

const DateContainer = styled.div`
    display: inline-block;
`;

const InputDate = styled.input`
    ${Style}
`;


export default DatePicker;