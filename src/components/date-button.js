import React from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

// Must be a class component
// https://github.com/Hacker0x01/react-datepicker/issues/862
class DateButton extends React.Component {
  render() {
    return <Button onClick={this.props.onClick}>{this.props.value}</Button>;
  }
}

export default DateButton;

const Button = styled.button`
  font-size: 14px;
  height: 30px;
  margin-top: 10px;
`;
