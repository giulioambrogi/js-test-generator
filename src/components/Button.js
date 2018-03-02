import React, { Component } from 'react';
import styled , { css } from 'styled-components';



const StyledButton = styled.button`
    
    border:1px solid gray;
    cursor:pointer;
    box-shadow: 2px 2px 1px gray;
    height: 25px;
    line-height: 25px;
    box-sizing: border-box;
    outline: none;
    min-width: 120px;
    border-radius: 1px;
    text-transform:uppercase;
    text-align:left;
    font-family: superfamily;
    
    
    &:hover{
        background:#fdf6b9;
        transition: background 0.8s;
    }
    ${props => props.primary && css`
        background: #5dc55d;
        color:#fff;
        border:1px solid gray;

        &:hover{
            background:#81ec81;
            transition: background 0.8s;
        }
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
