import React, { Component } from 'react';
import styled , { css } from 'styled-components';
import {colors} from './shared/constants';

const StyledAlert = styled.div`
    
    padding:2px 10px;

    
    ${props => props.level==='danger' && css`
        color:${colors.red}
    `}
    
`
class Alert extends Component {


  
  render() {
        return <StyledAlert {...this.props}>
            {this.props.text}
           </StyledAlert>
  }
}

export default Alert;
