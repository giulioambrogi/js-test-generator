import React, { Component } from 'react';
import {group,groupMultiple} from './components/grouper'
import {print} from './components/printer'
import Options from './components/Options'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      lines: [{text:"ciao", pad:0},
      {text:"come va??", pad:1},
      {text:"bene", pad:2},
      {text:"ok", pad:1}] ,
      output:''
    }
  }

  componentDidMount(){
    this.generate();
  }

  addLine(index){
    const i = index +1
    const newLines = [...this.state.lines.slice(0,i), 
        {text:"", pad: (this.state.lines[index].pad)}
      , ...this.state.lines.slice(i)];
      this.setState({lines:newLines}, ()=>{
        this.updateFocus(index+1);
      })
  }

  deleteLine(index){
    const newLines = [...this.state.lines.slice(0,index), ...this.state.lines.slice(index+1)];
    if(newLines.length === 0 ){
      newLines.push({text:"", pad:0})
    }
    this.setState({lines:newLines}, ()=>{
      
      document.querySelectorAll('.row input')[index === 0 ? 0 :index-1].focus();
    })
  }
  
  addTab(index){
    if(index === 0 ){
      return; 
    }
    if(this.state.lines[index].pad>this.state.lines[index-1].pad){
      return;
    }

    const editedLine = {
      text: this.state.lines[index].text,
      pad: this.state.lines[index].pad+1,
    }
    const newLines = [...this.state.lines.slice(0,index), 
      editedLine
      , ...this.state.lines.slice(index+1)];
      this.setState({lines:newLines})
  }

  removeTab(index){
    if(this.state.lines[index].pad===0){
      return;
    }

    const editedLine = {
      text: this.state.lines[index].text,
      pad: this.state.lines[index].pad-1,
    }
    const newLines = [...this.state.lines.slice(0,index), 
      editedLine
      , ...this.state.lines.slice(index+1)];
      this.setState({lines:newLines})
  }

  updateLine(index, value){
    const editedLine = {
      text: value,
      pad: this.state.lines[index].pad,
    }
    const newLines = [...this.state.lines.slice(0,index), 
      editedLine
      , ...this.state.lines.slice(index+1)];
    this.setState({lines:newLines})
  }

  updateFocus(targetIndex){
    document.querySelectorAll('.row input')[targetIndex].focus();
  }

  detectLineSets(lines){

    if(lines.filter(x=>x.pad ===0 ).length <= 1){
      return [lines]
    }
    const data = [...lines];
    data.reverse();
    let findIndex = data.findIndex(x=>x.pad ===0)
    let sets = []
    while(findIndex < (data.length-1) ){
        const newTree = data.slice(0,findIndex+1).reverse();
        sets.push(newTree);
        data.splice(0, findIndex+1);
        findIndex = data.findIndex(x=>x.pad ===0)
    }
  }

  generate(){
    this.setState({output:''}, ()=>{
      const lines = [...this.state.lines].filter(l=>l.text!='')

      const lineSets =[lines]// this.detectLineSets(lines);
      const trees = groupMultiple(lineSets);
      
      const output = trees.map(print).join("\n\n");
      this.setState({output});
    })
  }

  render() {
    return (
      <div className="App">
          <h1 className="App-title">BDD Editor</h1>
          <Options 
            generateEnabled={this.state.lines.length>0}
            onGenerate={this.generate.bind(this)} 
            onOptionsChange={undefined} 
            onClear={()=>this.setState({lines:[{text:"",pad:0}]})}
          />
          <div className="container" style={{border:"2px solid grey", padding:"30px"}}>
              {this.state.lines.length === 0 && (
                <span onClick={()=>{
                  this.setState({lines:[{text:"a",pad:0 }]})
                }}>+</span>
              )}
              {this.state.lines.map( (line,i)=>(
                <div className={"row padded p"+line.pad}>
                  <input key={"line-"+i} contentEditable onKeyDown={event=>{
                       // console.log(event.keyCode," .......")
                        if (event.keyCode === 13) {
                          //add new line
                          this.addLine(i);
                          event.preventDefault();
                        }
                        if(event.keyCode === 9){
                          if(event.shiftKey){this.removeTab(i)}else{this.addTab(i)};
                          event.preventDefault();
                        }

                        if(event.keyCode === 8){
                          if(line.text === ""){
                            console.log("DELETING",i)
                            this.deleteLine(i)
                            event.preventDefault();
                          }
                          console.log(line.text);

                        }
                        if(event.keyCode === 38){
                          //up
                          const newIndex = (i === 0 )? 0 : i-1;
                          this.updateFocus(newIndex);
                        }

                        if(event.keyCode === 40){
                          //down
                          const newIndex = (i === this.state.lines.length -1 )? i : i+1;
                          this.updateFocus(newIndex);
                        }
                  }} 
                  value={line.text}
                  onChange={(e)=>{
                      this.updateLine(i, e.target.value);
                  }} />
                  </div>  

              ))}
              
              
          </div>

          {this.state.output !== '' && <div>
            <h2>Boilerplate</h2>
            
            <pre className="prettyprint" contentEditable style={{width:"100%"}} rows="15">
              {this.state.output}
            </pre>
          </div>}
          
      </div>
    );
  }
}

export default App;
