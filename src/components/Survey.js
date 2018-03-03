import React, { Component } from 'react';
import styled from 'styled-components';

const StyledSurvey = styled.div` 


`

const scriptText = `(function(t,e,s,n){var o,a,c;t.SMCX=t.SMCX||[],e.getElementById(n)||(o=e.getElementsByTagName(s),a=o[o.length-1],c=e.createElement(s),c.type="text/javascript",c.async=!0,c.id=n,c.src=["https:"===location.protocol?"https://":"http://","widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgdzb10xM0gw6PpST3dV5PBW7KsuV5FF_2FNZ4CqQd_2FqSMN_2F.js"].join(""),a.parentNode.insertBefore(c,a))})(window,document,"script","smcx-sdk");`
    
class App extends Component {

  constructor(props){
    super(props);

    this.state = {script: <div>ciao</div>}
  }

  componentDidMount() {
    const script = document.createElement("script");
    
    script.text = scriptText;
    script.async = true;
    document.querySelector('#survey').appendChild(script);

    // setInterval(()=>{
    //   const widget = document.querySelector('.smcx-widget');
    //   const surveyContainer = document.querySelector('#survey');
    //   surveyContainer.appendChild(widget);
    // }, 4000)
  }
  
  render() {
    return (
        <StyledSurvey id="survey">
            
        </StyledSurvey>
      
    );
  }
}

export default App;
