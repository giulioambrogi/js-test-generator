import React, { Component } from 'react';
import style from 'codemirror/lib/codemirror.css';

var CodeMirror = require('react-codemirror');

//https://codemirror.net/doc/manual.html#api

class App extends Component {

   constructor(props){
       super(props)
       this.state = {
           code: ""
       }
   }

   updateCode(newCode) {
        this.setState({
            code: newCode,
        });
    }
  
  render() {
        const options = {lineNumbers: true,indentWithTabs:true, autoSave:true};
         

        return <div>
            <button onClick={()=>{

                const cm = this.refs.editor.codeMirror.doc;
                let data = [];
                window.cm = this.refs.editor;

                for(let i = 0 ; i < cm.lineCount(); i++){
                    const line = cm.getLine(i);
                    const pad = line.match(/^\t*/)[0].length;

                    const previousPad = (data.length >0)?(data[i-1].pad): -1;
                    if(pad > previousPad+1){
                        alert("wrong indentation at line "+i);
                        return;
                    }

                    data.push[{
                        text:line,
                        pad:pad
                    }]
                }
                }}>amico mio</button>
            <CodeMirror ref="editor" value={this.state.code} 
            onKeyDown={e=>console.log(e)}
            onChange={()=>this.updateCode} options={options} />
        </div>
  }
}

export default App;
