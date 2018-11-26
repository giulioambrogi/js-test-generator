import React, { Component } from 'react';
import { group, groupMultiple } from './components/grouper'
import { print } from './components/printer'
import Options from './components/Options'
import Editor from './components/Editor'
import logo from './logo.svg';
import './App.css';
import style from 'codemirror/lib/codemirror.css';
import CodeMirror from 'react-codemirror'
import SplitPane from 'react-split-pane'

import OutputCode from './components/OutputCode'
import Settings from './components/Settings'
import Survey from './components/Survey';
import Alert from './components/Alert';
import { colors } from './components/shared/constants'
import MainContent from './components/shared/MainContent'
import HelperBar from './components/HelperBar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { show } from './utils/notifications';

const Prism = require('prismjs');

const options = { lineNumbers: false, indentWithTabs: true, autoSave: true, styleActiveLine: true, };

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      code: "",
      currentLine: 0,
      output: '',
      dialect: 'jest',
      ui: {},
      settings: {
        quotes: 'backtick',
        negatives: false
      }
    }
  }

  componentDidMount() {
    document.querySelector('.Pane1').addEventListener('click', () => { this.onLeftPanelClick() })
  }

  updateCode(newCode) {
    //this.refs.editor.codeMirror.setValue(newCode);
    this.setState({
      code: newCode,
    });
  }

  //update line color
  //
  updateSettings(opt) {
    const settings = Object.assign(this.state.settings, opt);
    this.setState({ settings })
  }

  onLeftPanelClick() {
    const cm = this.refs.editor.codeMirror;
    const {ui} = this.state;
    //unmark
    if (ui.level === 'danger') {
      const i = ui.line;
      cm.markText({ line: i, ch: 0 }, { line: i, ch: 200 }, { css: "color:black" });

    }
    //focus
    this.refs.editor.focus()

  }

  generate() {
    try {
      const {dialect, settings} = this.state;
      const cm = this.refs.editor.codeMirror;
      let dataMatrix = []; // list of list of lines (groupped by root, aka 0 index)
      let data = [];


      for (let i = 0; i < cm.doc.lineCount(); i++) {
        let line = cm.doc.getLine(i);
        const pad = line.match(/^\t*/)[0].length;

        if (pad == 0 && data.length > 0) {
          dataMatrix.push(data); //add tree found so far to the matrix
          data = []; //reset data
        }
        line = line.trim(); //now can trim
        if (line === '') {
          continue;
        }

        const previousPad = (data.length > 0) ? (data[data.length - 1].pad) : -1;
        if (pad > previousPad + 1) {
          cm.markText({ line: i, ch: 0 }, { line: i, ch: 200 }, { css: `color:${colors.red}` });
          this.setState({ ui: { level: 'danger', line: i, message: `Invalid indentation at line ${i + 1}, you can enter a maximum of ${previousPad + 1} tabs (${pad} entered).` } })
          return;
        }


        data.push({
          text: line,
          pad: pad
        })
      }
      //add last data to matrix 
      dataMatrix.push(data);

      const lineSets = dataMatrix;//this.detectLineSets(lines);
      const trees = groupMultiple(lineSets);
      const output = trees.map(tree => print(dialect, tree, settings)).join("\n\n");
      this.setState({ output, ui: {} },
        () => {
          //highlight
          Prism.highlightAll()
          show('🦄  Generated!')


        });
    } catch (err) {
      this.setState({ ui: { level: 'danger', message: 'Sorry, an unexpected error occurred, please try again.', line: 0 } });
    }
  }
  example() {
    const newTests = "When I click on the confirm button\n\tAnd the API returns 200\n\t\tSuccess notification is displayed\n\tAnd the API returns an error\n\t\tError notification is diplayed";

    this.refs.editor.codeMirror.setValue(newTests);
    this.setState({
      code: newTests,
    }, () => {
      this.generate();
    });

  }

  clear() {
    this.setState({ code: "", output: "" })
    this.refs.editor.codeMirror.setValue("");

  }

  render() {
    const {code, output, ui} = this.state;
    const hasErrors = ui.level === 'danger';

    return (
      <React.Fragment>
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <div className="App">
          <h1 className="title">JS Test Generator</h1>
          <h2>Focus on the test cases, <span style={{ color: "green" }}>generate</span> the code.  </h2>
          <MainContent>

            <Options
              generateEnabled={code.trim() != ""}
              onGenerate={this.generate.bind(this)}
              onOptionsChange={undefined}
              onClear={() => this.clear()}
              onChangeDialect={(dialect) => this.setState({ dialect })}
              onExample={() => this.example()}
            />

            <Settings onChange={(data) => this.updateSettings(data)} />

            <HelperBar code={output} />
            <div className="paneContainer">
              <SplitPane split="vertical" defaultSize="50%">
                <div>
                  <CodeMirror ref="editor" value={code}
                    onKeyDown={e => console.log(e)}
                    onChange={(val) => this.updateCode(val)}
                    options={options} />
                </div>
                <div>
                  {hasErrors && <Alert level={ui.level} text={ui.message} />}

                  {!hasErrors &&
                    <OutputCode code={output} />
                  }
                </div>
              </SplitPane>
            </div>
            <br /><br />
          </MainContent>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
