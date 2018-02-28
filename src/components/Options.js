import React, { Component } from 'react';


class App extends Component {

  
  render() {
    return (
      <div className="options-container">
          <button onClick={this.props.onClear}>clear</button>
          <button onClick={this.props.onExample}>See example</button>

          <button onClick={this.props.onGenerate} disabled={!this.props.generateEnabled}>Generate</button>

           <select disabled={!this.props.generateEnabled}>
                <optgroup label="Javascript">
                    <option value="mocha">Mocha</option>
                    <option value="jasmine">Jasmine</option>
                    <option value="jest">Jest</option>
                </optgroup>
                <optgroup label="Java">
                    <option value="cucumber" disabled>Cucumber</option>
                    <option value="serenity" disabled>Serenity</option>
                </optgroup>
                <optgroup label="PHP">
                    <option value="robotFramework" disabled>Robot Framework</option>
                </optgroup>
                <optgroup>
                        <option disabled>And many more coming soon...</option>
                </optgroup>
                
           </select>


      </div>
    );
  }
}

export default App;
