import React, { Component } from 'react';


class App extends Component {

  
  render() {
    return (
      <div>
          <button onClick={this.props.onClear}>clear</button>
          
          <button onClick={this.props.onGenerate} disabled={!this.props.generateEnabled}>Generate</button>

      </div>
    );
  }
}

export default App;
