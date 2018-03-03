import React, { Component } from 'react';
import styled from 'styled-components'


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

  componentDidUpdate(){
      console.log("Highlighting all");
    Prism.highlightAll()
  }
  
  render() {

    var code = "const x = 2";
    var html = Prism.highlight(this.props.code || "", Prism.languages.javascript);
    return (
    <StyledOutput>
        

        <pre class="line-numbers language-javascript">
            <code>
            {this.props.code}
            </code>
        </pre>

    </StyledOutput>
    );
  }
}


export default App;
