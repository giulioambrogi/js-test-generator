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
      code:"",
      currentLine: 0,
      output:'',
      dialect:'jest',
      ui:{}
    }
  }

  componentDidMount(){
    //this.generate();
    window.cm = this.refs.editor
  }

  updateCode(newCode) {
    //this.refs.editor.codeMirror.setValue(newCode);
    this.setState({
        code: newCode,
    });
}

//update line color
//


  generate(){

    const cm = this.refs.editor.codeMirror;
    let dataMatrix = []; // list of list of lines (groupped by root, aka 0 index)
    let data = [];

    window.lines = cm;
    
    for(let i = 0 ; i < cm.doc.lineCount(); i++){
        let line = cm.doc.getLine(i);
        const pad = line.match(/^\t*/)[0].length;

        if(pad ==0 && data.length > 0){
          dataMatrix.push(data); //add tree found so far to the matrix
          data = []; //reset data
        }
        line = line.trim(); //now can trim
        if(line === ''){
          continue;
        }

        const previousPad = (data.length >0)?(data[data.length-1].pad): -1;
        if(pad > previousPad+1){
            cm.markText({line: i, ch: 0}, {line: i, ch: 200}, {css:"color:red"});
            this.setState({ui:{level:'danger', message:`wrong indentation at line ${i}, previous tab was ${previousPad}, instead ${pad} is too much`}})
           
            return;
        }

    
        data.push({
            text:line,
            pad: pad
        })
    }
    //add last data to matrix 
    dataMatrix.push(data);

    console.log("Data matrix has "+dataMatrix.length+ "trees")

    const lineSets = dataMatrix;//this.detectLineSets(lines);
    const trees = groupMultiple(lineSets);
    
    const output = trees.map(tree=>print(this.state.dialect, tree)).join("\n\n");
    this.setState({output});
}
example(){
  const newTests = "When I click here\n\tThen something bad happens\n\tAnd page should display confirm button";

  this.refs.editor.codeMirror.setValue(newTests);
    this.setState({
        code: newTests,
    }, ()=>{
      this.generate();
    });

}

clear(){
  this.setState({code:"", output:""})
  this.refs.editor.codeMirror.setValue("");

}

  render() {
    const hasErrors = this.state.ui.level === 'danger';
    return (
      <div className="App">
          <h1 className="title">BDD Boilerplate Generator</h1>
          <Options 
            generateEnabled={true}
            onGenerate={this.generate.bind(this)} 
            onOptionsChange={undefined} 
            onClear={()=>this.clear()}
            onChangeDialect={(dialect)=>this.setState({dialect})}
            onExample={()=>this.example()}
          />

      <div className="paneContainer">
        <SplitPane split="vertical" defaultSize="50%">
          <div>
            <CodeMirror ref="editor" value={this.state.code}
              onKeyDown={e=>console.log(e)}
              onChange={(val)=>this.updateCode(val)} 
              options={options} />
          </div>
          <div>
              {hasErrors && <div className={`alert ${this.state.ui.level}`}>{this.state.ui.message}</div>}
            
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
