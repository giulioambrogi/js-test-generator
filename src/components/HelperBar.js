import React, { Component } from 'react';
import styled from 'styled-components'
import copy from 'copy-to-clipboard';
import CopyIcon from './icons/Copy';



class Helpers extends Component {

  copyToClipboard(){
      copy(this.props.code);
  }
  
  render() {

    const {code} = this.props;
    return (
    <StyledBar>
          
        <StyledCopy>Use the <strong>TAB</strong> key to nest test cases</StyledCopy>
        <StyledButtonArea>
          <StyledClipboardCopy onClick={()=>this.copyToClipboard(code)}>
            <CopyIcon />
          </StyledClipboardCopy>
        </StyledButtonArea>
    </StyledBar>
    );
  }
}

const StyledBar = styled.div`

margin-top: 20px;
margin-bottom: 5px;
position:relative;
`


const StyledCopy = styled.p`
  display:inline-block;
  margin:0px;
`

const StyledClipboardCopy = styled.div`
  height: 50px;
  width: 50px;
  position: absolute;
  right:0px;
  bottom:0px;
  margin:0px;
  cursor: pointer;
  fill: black;

  &:hover{
    transition: all 0.3s;
    fill: #5dc55d;
  }

`

const StyledButtonArea = styled.div`
  display:inline-block;
`

export default Helpers;
