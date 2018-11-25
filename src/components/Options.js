import React, { Component } from 'react';
import Button from './Button';
import styled from 'styled-components'
import formElementStyle from './shared/StyledFormElement'
const StyledOption = styled.div`

    button{
        margin-right:10px;
    }

`
const StyledSelect = styled.select`
    ${formElementStyle()}
    border-radius:0px !important;
    appearence:none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-border-radius: 0px;
    padding-left:5px;
    float:right;
`

class App extends Component {

  
  render() {
    return (
    <StyledOption className="options-container">
        <div>
            <Button className="generate" primary onClick={this.props.onGenerate} disabled={!this.props.generateEnabled}>Generate</Button>
            <Button onClick={this.props.onClear}>Clear</Button>
            <Button onClick={this.props.onExample}>Example</Button>
        </div>
    </StyledOption>
    );
  }
}

function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;
    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

export default App;
