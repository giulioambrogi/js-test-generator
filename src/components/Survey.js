import React, { Component } from 'react';
import styled from 'styled-components';

const StyledSurvey = styled.div` 
    min-height:1000px;
    background:green;
`
class App extends Component {

  
  render() {
    return (
        <StyledSurvey id="survey">
                survey
            </StyledSurvey>
      
    );
  }
}

export default App;
