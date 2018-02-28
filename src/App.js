import React, { Component } from 'react';
import {group,groupMultiple} from './components/grouper'
import {print} from './components/printer'
import Options from './components/Options'
import Editor from './components/Editor'
import logo from './logo.svg';
import './App.css';
import style from 'codemirror/lib/codemirror.css';
import CodeMirror from 'react-codemirror'
import SplitPane from 'react-split-pane'

const options = {lineNumbers: false,indentWithTabs:true, autoSave:true,styleActiveLine: true,};
        
class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      lines: [{text:"ciao", pad:0},
      {text:"come va??", pad:1},
      {text:"bene", pad:2},
      {text:"ok", pad:1}],
      code:"Test",
      currentLine: 0,
      output:''
    }
  }

  componentDidMount(){
    //this.generate();
    window.cm = this.refs.editor
  }

  updateCode(newCode) {
    this.setState({
        code: newCode,
    });
}

//update line color
//codeMirror.markText({line: 0, ch: 0}, {line: 0, ch: 200}, {css:"color:red"});


  generate(){

    const cm = this.refs.editor.codeMirror.doc;
    let data = [];
    
    for(let i = 0 ; i < cm.lineCount(); i++){
        let line = cm.getLine(i);
        const pad = line.match(/^\t*/)[0].length;
        
        line = line.trim(); //now can trim
        if(line === ''){
          continue;
        }

        const previousPad = (data.length >0)?(data[i-1].pad): -1;
        if(pad > previousPad+1){
            alert(`wrong indentation at line ${i}, previous tab was ${previousPad}, instead ${pad} is too much`);
            return;
        }

    
        data.push({
            text:line,
            pad: pad
        })
    }

    const lineSets =[data]// this.detectLineSets(lines);
    const trees = groupMultiple(lineSets);
    
    const output = trees.map(print).join("\n\n");
    this.setState({output});
}


  render() {
    return (
      <div className="App">
          <h1 className="App-title">BDDs Editor</h1>
          <Options 
            generateEnabled={this.state.lines.length>0}
            onGenerate={this.generate.bind(this)} 
            onOptionsChange={undefined} 
            onClear={()=>this.setState({lines:[{text:"",pad:0}]})}
          />

      <div className="paneContainer">
        <SplitPane split="vertical" minSize={50} defaultSize={100}>
          <div>
            <CodeMirror ref="editor" value={this.state.code}
              onKeyDown={e=>console.log(e)}
              onChange={()=>this.updateCode} 
              options={options} />
          </div>
          <div>
              {this.state.output !== '' && <div>
              
              <pre className="prettyprint" contentEditable style={{width:"100%"}} rows="15">
                {this.state.output}
              </pre>
            </div>}
          </div>
          </SplitPane>
      </div>

        

          
          
      </div>
    );
  }
}

export default App;
