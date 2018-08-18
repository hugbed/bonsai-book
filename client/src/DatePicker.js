import React, { Component } from 'react';
import styled from 'styled-components';

import Style from './Style';

class DatePicker extends Component {
    onChange(event) {
        this.props.onChange(event.target.value);
    }
    
    render() {
        return (
            <DateContainer>
                <InputDate
                    type="datetime-local"
                    onChange={(event) => this.onChange(event)}
                    value={this.props.date} />
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