import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./reset.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      startHour: 7,
      startMinute: 0,

      swimDistance: 2.4,
      swimDistanceMetric: "miles",

      swimSeconds: 0,
      swimPaceMinute: 2,
      swimPaceSecond: 5,
      swimPaceMetric: "/100 yd",

      t1Minute: 5,
      t1Second: 0,

      bikeDistance: 112,
      bikeDistanceMetric: 'miles',

      bikeSpeedWholeNumber: 19,
      bikeSpeedDecimal: 0,
      bikeSpeedMetric: "mph",

      t2Minute: 5,
      t2Second: 0,

      runDistance: 26.2,
      runDistanceMetric: "miles",

      runPaceMinute: 10,
      runPaceSecond: 0,
      runPaceMetric: "/mile"
    };
  }

  //start time
  updateStartHour = value => {
    console.log(value);
    this.setState({
      startHour: value
    })
  };
  updateStartMinute = value => {
    console.log(value);
  };



  //swim distance
  updateSwimDistance = value => {
    console.log(value);
    this.setState({
      swimDistance: value / 10
    })
  };
  updateSwimDistanceMetric = value => {
    console.log(value);
  };



  //swim pace
  updateSwimPaceMinute = value => {
    console.log(value);
    this.swimPaceMetric({
      swimPaceMinute: value
    })
  };
  updateSwimPaceSecond = value => {
    console.log(value);



    // this.swimSeconds / 60

    let temp = 60;
    temp = parseInt(value)
    temp += 60

    if(temp)

    // if(this.state.)
    this.setState({
      swimPaceSecond: temp,
      swimPaceMinute: temp
    })
  };


  // updateSwimPaceMetric = value => {
  //   console.log(value);
  // };

  // //t1
  // updatet1Minute = value => {
  //   console.log(value);
  // };
  // updatet1Second = value => {
  //   console.log(value);
  // };

  // //bike distance
  // updateBikeDistance = value => {
  //   console.log(value);
  // };
  // updateBikeDistanceMetric = value => {
  //   console.log(value);
  // };

  // //bike speed
  // updateBikeSpeedWholeNumber = value => {
  //   console.log(value);
  // };
  // updateBikeSpeedDecimal = value => {
  //   console.log(value);
  // };
  // updateBikeSpeedMetric = value => {
  //   console.log(value);
  // };

  // //t2
  // updatet2Minute = value => {
  //   console.log(value);
  // };
  // updatet2Second = value => {
  //   console.log(value);
  // };

  // //run distance
  // updateRunDistance = value => {
  //   console.log(value);
  // };
  // updateRunDistanceMetric = value => {
  //   console.log(value);
  // };

  // //run pace
  // updateRunPaceMinute = value => {
  //   console.log(value);
  // };
  // updateRunPaceSecond = value => {
  //   console.log(value);
  // };
  // updateRunPaceMetric = value => {
  //   console.log(value);
  // };

  render() {
    return (
      <div className="App">
        <div className="title">
          <p>Title</p>
        </div>
        <div className="top">
          <div className="top-container">
            <table className="top-table">
              <tr>
                <td>Select Distance</td>
                <td>
                  <input type="text" placeholder="Custom Distance" />
                </td>
              </tr>


              
              <tr>
                <td>Start Time</td>
                <td className="bigger-input">

                  <div className="slidecontainer">
                  {/* <input className="slider" type="range" min="1" max="12" placeholder={this.state.startHour} onChange = {e => this.updateStartHour(e.target.value)}/>: */}
                  <input className="slider" type="range" min="1" max="12" placeholder={this.state.startHour} onChange = {e => this.updateStartHour(e.target.value)}/>: {this.state.startHour}
                  </div>

                  <input type="range" min="1" max="59" placeholder={this.state.startMinute} onChange = {e => this.updateStartMinute(e.target.value)}/>
                  <input type="text" placeholder="AM" onChange = {e => this.updateStartHour(e.target.value)}/>
                </td>
              </tr>





              <tr>
                <td>Swim Distance</td>
                <td>



                  <input className="slider" type="range" min="1" max="30" onChange = {e => this.updateSwimDistance(e.target.value)}/>{this.state.swimDistance}
                  <input type="text" placeholder={this.state.swimDistanceMetric} onChange = {e => this.updateSwimDistanceMetric(e.target.value)}/>
                </td>
              </tr>





              <tr>
                <td>Swim Pace</td>
                  {/* 3:19 */}
                  {/* max is 160 seconds or 100 */}
                <td>
                  <input className="slider" type="range" min="0" max="300" onChange = {e => this.updateSwimPaceSecond(e.target.value)}/> {this.state.swimPaceMinute}{this.state.swimPaceSecond}
                  {/* <input type="text" placeholder={this.state.swimPaceSecond} onChange = {e => this.updateSwimPaceSecond(e.target.value)}/> */}
                  {/* <input type="text" placeholder={this.state.swimPaceMetric} onChange = {e => this.updateSwimPaceMetric(e.target.value)}/> */}
                </td>
              </tr>












              <tr>
                <td>T1</td>
                <td>
                  <input type="text" placeholder={this.state.t1Minute} onChange = {e => this.updatet1Minute(e.target.value)}/>:
                  <input type="text" placeholder={this.state.t1Second} onChange = {e => this.updatet1Second(e.target.value)}/> (mm:ss)
                </td>
              </tr>

              {/* 
              <tr>
                <td>Bike Distance</td>
                <td>
                  <input type="text" placeholder={this.state.bikeDistance} onChange = {e => this.updateBikeDistance(e.target.value)}/>
                  <input type="text" placeholder={this.state.bikeDistanceMetric} onChange = {e => this.updateBikeDistanceMetric(e.target.value)}/>
                </td>
              </tr>
              <tr>
                <td>Bike Speed</td>
                <td>
                  <input type="text" placeholder={this.state.bikeSpeedWholeNumber} onChange = {e => this.updateBikeSpeedWholeNumber(e.target.value)}/>.
                  <input type="text" placeholder={this.state.bikeSpeedDecimal} onChange = {e => this.updateBikeSpeedDecimal(e.target.value)}/>
                  <input type="text" placeholder={this.state.bikeSpeedMetric} onChange = {e => this.updateBikeSpeedMetric(e.target.value)}/>
                </td>
              </tr>
              <tr>
                <td>T2</td>
                <td>
                  <input type="text" placeholder={this.state.t2Minute} onChange = {e => this.updatet2Minute(e.target.value)}/>:
                  <input type="text" placeholder={this.state.t2Second} onChange = {e => this.updatet2Second(e.target.value)}/>
                  (mm:ss)
                </td>
              </tr>
              <tr>
                <td>Run Distance</td>
                <td>
                  <input type="text" placeholder={this.state.runDistance} onChange = {e => this.updateRunDistance(e.target.value)}/>
                  <input type="text" placeholder={this.state.runDistanceMetric} onChange = {e => this.updateRunDistanceMetric(e.target.value)}/>
                </td>
              </tr>
              <tr>
                <td>Run Pace</td>
                <td>
                  <input type="text" placeholder={this.state.runPaceMinute} onChange = {e => this.updateRunPaceMinute(e.target.value)}/>:
                  <input type="text" placeholder={this.state.runPaceSecond} onChange = {e => this.updateRunPaceSecond(e.target.value)}/>
                  <input type="text" placeholder={this.state.runPaceMetric} onChange = {e => this.updateRunPaceMetric(e.target.value)}/>
                </td>
              </tr> */}
            </table>
          </div>
        </div>

        <div className="bottom">
          <div className="bottom-container">
            <table>
              <tr>
                <th>Event</th>
                <th>Split</th>
                <th>Elapsed</th>
                <th>Clock</th>
              </tr>
              <tr>
                <td>Swim</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>T1</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Bike</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>T2</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Run</td>
                <td />
                <td />
                <td />
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
