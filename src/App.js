import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./reset.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>test</div>

        <table>
          <tr>
            <th>Event</th>
            <th>Split</th>
            <th>Elapsed</th>
            <th>Clock</th>
          </tr>
          <tr>
            <td>Data</td>
            <td>Data2</td>
          </tr>
        </table>
      </div>
    );
  }
}

export default App;
