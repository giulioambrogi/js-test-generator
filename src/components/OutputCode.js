import React, { Component } from 'react';
import styled from 'styled-components'
import copy from 'copy-to-clipboard';


const Prism = require('prismjs');
require('prismjs/themes/prism.css');

const StyledOutput = styled.div`
    pre{
        font-size: 12px;
        height: 100%;
        min-height: 476px;
        margin: 0px !important;

        -webkit-user-select: all;  /* Chrome 49+ */
        -moz-user-select: all;     /* Firefox 43+ */
        -ms-user-select: all;      /* No support yet */
        user-select: all;          /* Likely future */   
        
    }
`

class App extends Component {

  copyToClipboard(){
      console.log('copied')
      copy(this.props.code);
  }
  
  render() {

    const {code} = this.props;
    return (
    <StyledOutput>
        
        <button onClick={()=>this.copyToClipboard(code)}>Copy</button>
        <pre className="line-numbers language-javascript">
            <code>
            {code}
            </code>
        </pre>

    </StyledOutput>
    );
  }
}


export default App;
