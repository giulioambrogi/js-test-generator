import React, { Component } from 'react';
import Button from './Button';
import styled from 'styled-components'

const StyledOption = styled.div`

    button{
        margin-right:10px;
    }
`
const StyledSelect = styled.select`
    box-shadow: 1px 1px 5px grey;
    height: 25px;
    -webkit-appearance: none;
    display: inline-block;
    border-radius: 0px;
    padding: 5px 10px;
    margin: 0;
    border: 1px solid;
    background: transparent;
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
                //console.log("gff")
                e.preventDefault();
                scrollTo(document.querySelector('html'), document.getElementById("survey").offsetTop -10, 400);
               
            }}
            >Is your framework not in this list?</a>
        </div>
    </StyledOption>
    );
  }
}

const scrollTo = function(element, to, duration) {
    if (duration < 0) return;
    var difference = to - element.scrollTop,
        perTick = difference / duration * 10;
    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    },0);
};
export default App;
