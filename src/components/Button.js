import React, { Component } from 'react';
import styled , { css } from 'styled-components';
import formElementStyle from './shared/StyledFormElement'


const StyledButton = styled.button`
    
    ${formElementStyle()}
    
    text-transform:uppercase;
   

    
    ${props => props.primary && css`
        background: #5dc55d;
        color:#fff;
        border:1px solid gray;
    `}
    
`
class App extends Component {

   constructor(props){
       super(props)
       this.state = {}
   }

  
  render() {
        return <StyledButton {...this.props}>
            {this.props.children}
           </StyledButton>
  }
}

export default App;
