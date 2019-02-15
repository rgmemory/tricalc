import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./reset.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      elapsedSwimSeconds: 0,
      elapsedT1Seconds: 0,
      elapsedBikeSeconds: 0,
      elapsedT2Seconds: 0,
      elapsedRunSeconds: 0,
      elapsedTotalSeconds: 0,

      elapsedT1DisplayHours: 0,
      elapsedT1DisplayMinutes: 0,
      elapsedT1DisplaySeconds: 0,

      elapsedBikeDisplayHours: 0,
      elapsedBikeDisplayMinutes: 0,
      elapsedBikeDisplaySeconds: 0,

      elapsedT2DisplayHours: 0,
      elapsedT2DisplayMinutes: 0,
      elapsedT2DisplaySeconds: 0,

      elapsedRunDisplayHours: 0,
      elapsedRunDisplayMinutes: 0,
      elapsedRunDisplaySeconds: 0,

      // elapsedT1DisplaySeconds:0,
      // elapsedT1DisplaySeconds:0,

      swimInputDistance: 4224,
      swimSliderDistance: 2.4,

      swimInputPace: 1,

      swimOutputHours: 0,
      swimOutputMinutes: 0,
      swimOutputSeconds: 0,

      swimSliderMinutes: 1,
      swimSliderSeconds: 0,

      swimTimeSeconds: null,

      t1InputSeconds: 0,

      t1SliderMinutes: 0,
      t1SliderSeconds: 0,

      t1OutputMinutes: 0,
      t1OutputSeconds: 0,

      bikeInputDistance: 10,
      bikeInputSpeed: 14,

      bikeOutputHours: null,
      bikeOutputMinutes: null,
      bikeOutputSeconds: null,

      bikeTimeSeconds: null,

      t2OutputMinutes: null,
      t2OutputSeconds: null,

      runInputDistance: 3.1,
      runInputPace: 400,

      runSliderMinutes: null,
      runSliderSeconds: null,

      runOutputHours: null,
      runOutputMinutes: null,
      runOutputSeconds: null
    };
  }

  // componentDidUpdate(){
  //   this.calcSwimTime(this.state.swimInputDistance, this.state.swimInputPace);
  // }

  //swim//////////////////////////////////////////////////////////////////

  swimSliderDisplay = value => {
    this.updateSwimInputPace(value);
    let minutes = null;

    if (value >= 60) {
      minutes = Math.floor(value / 60);
      value -= minutes * 60;
    }
    if (value < 10) {
      value = `0${value}`;
    }

    this.setState({
      swimSliderMinutes: minutes,
      swimSliderSeconds: value
    });
  };

  swimSecondsConverter = value => {
    let hours = 0;
    let minutes = 0;
    if (value / 60 >= 60) {
      hours = Math.floor(value / 60 / 60);
      value -= 3600 * hours;
    }
    if (value >= 60) {
      minutes = Math.floor(value / 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      value -= minutes * 60;
      if (value < 10) {
        value = `0${value}`;
      }
    }

    this.setState({
      swimOutputHours: hours,
      swimOutputMinutes: minutes,
      swimOutputSeconds: value
    });
  };

  updateSwimInputDistance = value => {
    let tempYards = Math.round((value / 10) * 1760);

    let tempSliderDistance = value / 10;

    this.setState({
      swimInputDistance: tempYards,
      swimSliderDistance: tempSliderDistance
    });
    if (this.state.swimInputPace) {
      this.calcSwimTime(tempYards, this.state.swimInputPace);
    }
  };

  updateSwimInputPace = value => {
    let secondsHundredYards = value / 100;

    this.setState({
      swimInputPace: secondsHundredYards
    });

    if (this.state.swimInputDistance) {
      this.calcSwimTime(this.state.swimInputDistance, secondsHundredYards);
    }
  };

  calcSwimTime = (yards, paceYards) => {
    let swimTimeSeconds = Math.round(yards * paceYards);

    this.setState({
      swimTimeSeconds: swimTimeSeconds,
      elapsedSwimSeconds: swimTimeSeconds
    });

    // this.calcElapsedSwimTime(swimTimeSeconds, this.state.elapsedBikeSeconds, this.state.elapsedRunSeconds, this.state.elapsedT1Seconds, this.state.elapsedT2Seconds)
    // this.calcElapsedSwimTime(swimTimeSeconds, this.state.elapsedBikeSeconds, this.state.elapsedRunSeconds, this.state.elapsedT1Seconds, this.state.elapsedT2Seconds)

    this.swimSecondsConverter(swimTimeSeconds);
  };

  ///////////////////////////////////////////////////////////////// t1

  updatet1Time = value => {
    let minutes = 0;
    let elapsed = value;

    if (value >= 60) {
      minutes = Math.floor(value / 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      value -= minutes * 60;
      if (value < 10) {
        value = `0${value}`;
      }
    }

    this.setState({
      t1OutputMinutes: minutes,
      t1OutputSeconds: value,
      elapsedT1Seconds: elapsed
    });

    this.updateElapsedT1Seconds(this.state.elapsedSwimSeconds, elapsed);
  };

  //  ///////////////////////////////////////////////////////////////// Bike

  updateBikeInputDistance = value => {
    this.setState({
      bikeInputDistance: value
    });

    this.calcBikeTime(value, this.state.bikeInputSpeed);
  };

  updateBikeInputSpeed = value => {
    let tempSpeed = value / 10;

    this.setState({
      bikeInputSpeed: tempSpeed
    });

    this.calcBikeTime(this.state.bikeInputDistance, tempSpeed);
  };

  calcBikeTime = (miles, mph) => {
    let tempSeconds = (miles / mph) * 3600;
    tempSeconds = Math.round((miles / mph) * 3600);

    console.log("bike seconds", tempSeconds);

    this.bikeSecondsConverter(tempSeconds);

    this.setState({
      bikeTimeSeconds: tempSeconds,
      elapsedBikeSeconds: tempSeconds
    });

    // this.calcElapsedTime(this.state.elapsedSwimSeconds, tempSeconds, this.state.elapsedRunSeconds, this.state.elapsedT1Seconds, this.state.elapsedT2Seconds)
    console.log(
      this.state.elapsedSwimSeconds,
      this.state.elapsedT1Seconds,
      tempSeconds
    );
    this.updateElapsedBikeSeconds(
      this.state.elapsedSwimSeconds,
      this.state.elapsedT1Seconds,
      tempSeconds
    );
  };

  bikeSecondsConverter = value => {
    let minutes = 0;
    let hours = 0;
    if (value / 60 >= 60) {
      hours = Math.floor(value / 60 / 60);
      value -= 3600 * hours;
    }
    if (value >= 60) {
      minutes = Math.floor(value / 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      value -= minutes * 60;
      if (value < 10) {
        value = `0${value}`;
      }
    }

    this.setState({
      bikeOutputHours: hours,
      bikeOutputMinutes: minutes,
      bikeOutputSeconds: value
    });
  };

  /////////////////////////////

  updatet2Time = value => {
    let minutes = 0;

    let elapsed = value;

    if (value >= 60) {
      minutes = Math.floor(value / 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      value -= minutes * 60;
      if (value < 10) {
        value = `0${value}`;
      }
    }

    this.setState({
      t2OutputMinutes: minutes,
      t2OutputSeconds: value,
      elapsedT2Seconds: elapsed
    });

    // this.calcElapsedTime(this.state.elapsedSwimSeconds, this.state.elapsedBikeSeconds, this.state.elapsedRunSeconds, this.state.elapsedT1Seconds, elapsed)

    this.updateElapsedT2Seconds(
      this.state.elapsedSwimSeconds,
      this.state.elapsedT1Seconds,
      this.state.elapsedBikeSeconds,
      elapsed
    );
  };

  /////////////////////////////

  updateRunInputDistance = value => {
    let tempRunDistance = value / 10;

    this.setState({
      runInputDistance: tempRunDistance
    });

    this.calcRunTime(this.state.runInputPace, tempRunDistance);

    // this.calcRunTime
  };

  updateRunInputPace = value => {
    this.setState({
      runInputPace: value
    });

    this.runSliderDisplay(value);
    this.calcRunTime(value, this.state.runInputDistance);
  };

  runSliderDisplay = value => {
    let minutes = 0;

    if (value >= 60) {
      minutes = Math.floor(value / 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      value -= minutes * 60;
      if (value < 10) {
        value = `0${value}`;
      }
    }

    this.setState({
      runSliderMinutes: minutes,
      runSliderSeconds: value
    });
  };

  calcRunTime = (pace, distance) => {
    let value = Math.round(distance * pace);

    let elapsed = value;

    let minutes = 0;
    let hours = 0;
    if (value / 60 >= 60) {
      hours = Math.floor(value / 60 / 60);
      value -= 3600 * hours;
    }
    if (value >= 60) {
      minutes = Math.floor(value / 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      value -= minutes * 60;
      if (value < 10) {
        value = `0${value}`;
      }
    }

    this.setState({
      elapsedRunSeconds: elapsed,
      runOutputHours: hours,
      runOutputMinutes: minutes,
      runOutputSeconds: value
    });

    // this.calcElapsedFinalTime(this.state.elapsedSwimSeconds, this.state.elapsedBikeSeconds, elapsed, this.state.elapsedT1Seconds, this.state.elapsedT2Seconds)
    this.updateElapsedRunSeconds(this.state.elapsedT2Seconds, elapsed);
  };

  updateElapsedT1Seconds = (swim, t1) => {
    t1 = parseInt(t1);

    console.log(swim, t1);

    let temp = swim + t1;

    let value = temp;

    console.log(temp);

    this.setState({
      elapsedT1Seconds: temp
    });

    let hours = 0;
    let minutes = 0;
    if (value / 60 >= 60) {
      hours = Math.floor(value / 60 / 60);
      value -= 3600 * hours;
    }

    if (value >= 60) {
      minutes = Math.floor(value / 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      value -= minutes * 60;
      if (value < 10) {
        value = `0${value}`;
      }
    }

    this.setState({
      elapsedT1DisplayHours: hours,
      elapsedT1DisplayMinutes: minutes,
      elapsedT1DisplaySeconds: value
    });
  };

  updateElapsedBikeSeconds = (swim, t1, bike) => {
    t1 = parseInt(t1);

    let temp = t1 + bike;

    let value = temp;

    console.log(swim, t1, bike, temp);
    // console.log()

    this.setState({
      elapsedBikeSeconds: temp
    });

    let hours = 0;
    let minutes = 0;
    if (value / 60 >= 60) {
      hours = Math.floor(value / 60 / 60);
      value -= 3600 * hours;
    }

    if (value >= 60) {
      minutes = Math.floor(value / 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      value -= minutes * 60;
      if (value < 10) {
        value = `0${value}`;
      }
    }

    this.setState({
      elapsedBikeDisplayHours: hours,
      elapsedBikeDisplayMinutes: minutes,
      elapsedBikeDisplaySeconds: value
    });
  };

  updateElapsedT2Seconds = (swim, t1, bike, t2) => {
    t1 = parseInt(t1);
    t2 = parseInt(t2);

    let temp = bike + t2;

    console.log(swim, t1, bike, t2);

    this.setState({
      elapsedT2Seconds: temp
    });
  };

  updateElapsedRunSeconds = (t2, run) => {
    // t1 = parseInt(t1)
    t2 = parseInt(t2);

    let temp = run + t2;

    console.log(t2, run, temp);

    this.setState({
      elapsedRunSeconds: temp
    });
  };

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
                <td className="input-name">Swim Distance</td>
                <td>
                  <input
                    className="slider"
                    type="range"
                    min="1"
                    max="24"
                    // value="0"
                    onChange={e => this.updateSwimInputDistance(e.target.value)}
                  />
                  {this.state.swimSliderDistance}
                </td>
              </tr>

              <tr>
                <td className="input-name">Swim Pace</td>

                <td>
                  <input
                    className="slider"
                    type="range"
                    // value="0"
                    min="80"
                    max="198"
                    onChange={e => this.swimSliderDisplay(e.target.value)}
                  />
                  {this.state.swimSliderMinutes}:{this.state.swimSliderSeconds}
                </td>
              </tr>

              <tr>
                <td className="input-name">T1</td>

                <td>
                  <input
                    className="slider"
                    type="range"
                    // value="0"
                    min="200"
                    max="540"
                    onChange={e => this.updatet1Time(e.target.value)}
                  />
                  {this.state.t1OutputMinutes}:{this.state.t1OutputSeconds}
                </td>
              </tr>

              <tr>
                <td className="input-name">Bike Distance</td>

                <td>
                  <input
                    className="slider"
                    type="range"
                    // value="0"
                    min="10"
                    max="112"
                    onChange={e => this.updateBikeInputDistance(e.target.value)}
                  />
                  {this.state.bikeInputDistance}
                </td>
              </tr>
              <tr>
                <td className="input-name">Bike Speed</td>

                <td>
                  <input
                    className="slider"
                    type="range"
                    // value="0"
                    min="140"
                    max="220"
                    onChange={e => this.updateBikeInputSpeed(e.target.value)}
                  />
                  {this.state.bikeInputSpeed}
                </td>
              </tr>

              <tr>
                <td className="input-name">T2</td>

                <td>
                  <input
                    className="slider"
                    type="range"
                    // value="0"
                    min="140"
                    max="540"
                    onChange={e => this.updatet2Time(e.target.value)}
                  />
                  {this.state.t2OutputMinutes}:{this.state.t2OutputSeconds}
                </td>
              </tr>

              <tr>
                <td className="input-name">Run Distance</td>

                <td>
                  <input
                    className="slider"
                    type="range"
                    // value="0"
                    min="31"
                    max="262"
                    onChange={e => this.updateRunInputDistance(e.target.value)}
                  />
                  {this.state.runInputDistance}
                </td>
              </tr>
              <tr>
                <td className="input-name">Run Pace</td>

                <td>
                  <input
                    className="slider"
                    type="range"
                    // value="0"
                    min="480"
                    max="810"
                    onChange={e => this.updateRunInputPace(e.target.value)}
                  />
                  {/* {this.state.runOutputHours} */}
                  {this.state.runSliderMinutes}:{this.state.runSliderSeconds}
                </td>
              </tr>
            </table>
          </div>
        </div>

        {/* ////////////////////////////////////////////////////////////////////////////////// */}

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
                <td>
                  {this.state.swimOutputHours}:{this.state.swimOutputMinutes}:
                  {this.state.swimOutputSeconds}
                </td>
                <td>
                  {this.state.swimOutputHours}:{this.state.swimOutputMinutes}:
                  {this.state.swimOutputSeconds}
                </td>
                <td />
              </tr>
              <tr>
                <td>T1</td>
                <td>
                  {this.state.t1OutputMinutes}:{this.state.t1OutputSeconds}
                </td>
                <td>
                  {this.state.elapsedT1DisplayHours}:
                  {this.state.elapsedT1DisplayMinutes}:
                  {this.state.elapsedT1DisplaySeconds}
                </td>
                <td />
              </tr>
              <tr>
                <td>Bike</td>
                <td>
                  {this.state.bikeOutputHours}:{this.state.bikeOutputMinutes}:
                  {this.state.bikeOutputSeconds}
                </td>
                <td>
                  {this.state.elapsedBikeDisplayHours}:
                  {this.state.elapsedBikeDisplayMinutes}:
                  {this.state.elapsedBikeDisplaySeconds}
                </td>
                <td />
              </tr>
              <tr>
                <td>T2</td>
                <td>
                  {this.state.t2OutputMinutes}:{this.state.t2OutputSeconds}
                </td>
                <td>{this.state.elapsedT2Seconds}</td>
                <td />
              </tr>
              <tr>
                <td>Run</td>
                <td>
                  {this.state.runOutputHours}:{this.state.runOutputMinutes}:
                  {this.state.runOutputSeconds}
                </td>
                <td>{this.state.elapsedRunSeconds}</td>
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
