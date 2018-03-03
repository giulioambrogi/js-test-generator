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
            <StyledSelect>
                <optgroup label="Javascript">
                    <option value="mocha">Mocha</option>
                    <option value="jasmine">Jasmine</option>
                    <option value="jest">Jest</option>
                </optgroup>
                <optgroup>
                        <option disabled>And many more coming soon...</option>
                </optgroup>
                
            </StyledSelect>
        </div>
        <div>
            <a href="/" style={{float:"right", marginTop:"5px", fontSize:"10px", color:"gray"}}
            onClick={e=>{
                e.preventDefault();
                const target = document.querySelector(".smcx-widget");
                scrollTo(document.documentElement, target.offsetTop, 600);
            }}
            >Is your framework not in this list?</a>
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
