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
      elapsedT1DisplayMinutes: `0${0}`,
      elapsedT1DisplaySeconds: `0${0}`,

      elapsedBikeDisplayHours: 0,
      elapsedBikeDisplayMinutes: `0${0}`,
      elapsedBikeDisplaySeconds: `0${0}`,

      elapsedT2DisplayHours: 0,
      elapsedT2DisplayMinutes: `0${0}`,
      elapsedT2DisplaySeconds: `0${0}`,

      elapsedRunDisplayHours: 0,
      elapsedRunDisplayMinutes: `0${0}`,
      elapsedRunDisplaySeconds: `0${0}`,

      elapsedT1Total: 0,
      elapsedBikeTotal: 0,
      elapsedT2Total: 0,
      elapsedRunTotal: 0,

      swimInputDistance: 4224,
      swimSliderDistance: 2.4,

      swimInputPace: 1,

      swimOutputHours: 0,
      swimOutputMinutes: `0${0}`,
      swimOutputSeconds: `0${0}`,

      swimSliderMinutes: 1,
      swimSliderSeconds: `2${0}`,

      swimTimeSeconds: null,
      bikeTimeSeconds: null,
      runTimeSeconds: null,
      t1TimeSeconds: null,
      t2TimeSeconds: null,

      t1InputSeconds: 200,

      t1SliderMinutes: 3,
      t1SliderSeconds: `0${0}`,

      t1OutputMinutes: 3,
      t1OutputSeconds: 20,

      bikeInputDistance: 10,
      bikeInputSpeed: 14,

      bikeOutputHours: 0,
      bikeOutputMinutes: `0${0}`,
      bikeOutputSeconds: `0${0}`,

      t2OutputMinutes: 3,
      t2OutputSeconds: 20,

      runInputDistance: 3.1,
      runInputPace: 400,

      runSliderMinutes: `8`,
      runSliderSeconds: `0${0}`,

      runOutputHours: 0,
      runOutputMinutes: `0${0}`,
      runOutputSeconds: `0${0}`
    };
  }

  // componentWillUpdate(prevProps, prevState){
  //   // this.calcSwimTime(this.state.swimInputDistance, this.state.swimInputPace)

  //   if(prevState.t1TimeSeconds !== this.state.t1TimeSeconds){
  //     console.log('t1 time changed')
  //     this.state.updateElapsedBikeSeconds(
  //       this.state.elapsedSwimSeconds,
  //       this.sate.elapsedT1Seconds,
  //       this.state.elapsedBikeSeconds,
  //       this.state.elapsedT2Seconds,
  //       this.state.elapsedRunSeconds
  //     );
  //   }else{
  //     console.log('t1 time stayed the same')
  //   }
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

    this.swimSecondsConverter(swimTimeSeconds);

    this.updateElapsedSwimSeconds(
      swimTimeSeconds,
      this.state.elapsedT1Seconds,
      this.state.elapsedBikeSeconds,
      this.state.elapsedT2Seconds,
      this.state.elapsedRunSeconds
    );

    this.updateElapsedT1Seconds(
      swimTimeSeconds,
      this.state.elapsedT1Seconds,
      this.state.elapsedBikeSeconds,
      this.state.elapsedT2Seconds,
      this.state.elapsedRunSeconds
    );
    this.updateElapsedBikeSeconds(
      swimTimeSeconds,
      this.state.elapsedT1Seconds,
      this.state.elapsedBikeSeconds,
      this.state.elapsedT2Seconds,
      this.state.elapsedRunSeconds
    );
    this.updateElapsedT2Seconds(
      swimTimeSeconds,
      this.state.elapsedT1Seconds,
      this.state.elapsedBikeSeconds,
      this.state.elapsedT2Seconds,
      this.state.elapsedRunSeconds
    );
    this.updateElapsedRunSeconds(
      swimTimeSeconds,
      this.state.elapsedT1Seconds,
      this.state.elapsedBikeSeconds,
      this.state.elapsedT2Seconds,
      this.state.elapsedRunSeconds
    );
  };

  ///////////////////////////////////////////////////////////////// t1

  updatet1Time = value => {
    let minutes = 0;
    let elapsed = value;

    if (value >= 60) {
      minutes = Math.floor(value / 60);
      // if (minutes < 10) {
      //   minutes = minutes;
      // }
      value -= minutes * 60;
      if (value < 10) {
        value = `0${value}`;
      }
    }

    this.setState({
      t1OutputMinutes: minutes,
      t1OutputSeconds: value,
      elapsedT1Seconds: elapsed,
      t1TimeSeconds: value
    });

    this.updateElapsedT1Seconds(
      this.state.elapsedSwimSeconds,
      elapsed,
      this.state.elapsedBikeSeconds,
      this.state.elapsedT2Seconds,
      this.state.elapsedRunSeconds
    );
    this.updateElapsedBikeSeconds(
      this.state.elapsedSwimSeconds,
      elapsed,
      this.state.elapsedBikeSeconds,
      this.state.elapsedT2Seconds,
      this.state.elapsedRunSeconds
    );
    this.updateElapsedT2Seconds(
      this.state.elapsedSwimSeconds,
      elapsed,
      this.state.elapsedBikeSeconds,
      this.state.elapsedT2Seconds,
      this.state.elapsedRunSeconds
    );
    this.updateElapsedRunSeconds(
      this.state.elapsedSwimSeconds,
      elapsed,
      this.state.elapsedBikeSeconds,
      this.state.elapsedT2Seconds,
      this.state.elapsedRunSeconds
    );
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

    this.bikeSecondsConverter(tempSeconds);

    this.setState({
      bikeTimeSeconds: tempSeconds,
      elapsedBikeSeconds: tempSeconds,
      bikeTimeSeconds: tempSeconds
    });

    this.updateElapsedBikeSeconds(
      this.state.elapsedSwimSeconds,
      this.state.elapsedT1Seconds,
      tempSeconds,
      this.state.elapsedT2Seconds,
      this.state.elapsedRunSeconds
    );
    this.updateElapsedT2Seconds(
      this.state.elapsedSwimSeconds,
      this.state.elapsedT1Seconds,
      tempSeconds,
      this.state.elapsedT2Seconds,
      this.state.elapsedRunSeconds
    );
    this.updateElapsedRunSeconds(
      this.state.elapsedSwimSeconds,
      this.state.elapsedT1Seconds,
      tempSeconds,
      this.state.elapsedT2Seconds,
      this.state.elapsedRunSeconds
    );
  };

  bikeSecondsConverter = value => {
    // console.log('bike seconds', value)
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
    } else if (value === 0) {
      minutes = `0${0}`;
      value = `0${0}`;
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
      // if (minutes < 10) {
      //   minutes = `0${minutes}`;
      // }
      value -= minutes * 60;
      if (value < 10) {
        value = `0${value}`;
      }
    }

    this.setState({
      t2OutputMinutes: minutes,
      t2OutputSeconds: value,
      elapsedT2Seconds: elapsed,
      t2TimeSeconds: value
    });

    this.updateElapsedT2Seconds(
      this.state.elapsedSwimSeconds,
      this.state.elapsedT1Seconds,
      this.state.elapsedBikeSeconds,
      elapsed,
      this.state.elapsedRunSeconds
    );
    this.updateElapsedRunSeconds(
      this.state.elapsedSwimSeconds,
      this.state.elapsedT1Seconds,
      this.state.elapsedBikeSeconds,
      elapsed,
      this.state.elapsedRunSeconds
    );
  };

  /////////////////////////////

  updateRunInputDistance = value => {
    let tempRunDistance = value / 10;

    this.setState({
      runInputDistance: tempRunDistance
    });

    this.calcRunTime(this.state.runInputPace, tempRunDistance);
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
      // if (minutes < 10) {
      //   minutes = `0${minutes}`;
      // }
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
      runOutputSeconds: value,
      runTimeSeconds: value
    });

    this.updateElapsedRunSeconds(
      this.state.elapsedSwimSeconds,
      this.state.elapsedT1Seconds,
      this.state.elapsedBikeSeconds,
      this.state.elapsedT2Seconds,
      elapsed
    );
  };

  updateElapsedSwimSeconds = (swim, t1, bike, t2, run) => {
    t1 = parseInt(t1);
    t2 = parseInt(t2);

    let temp = swim + t1 + bike + t2 + run;
    // console.log(swim, t1, bike, t2, run, temp);

    this.setState({
      elapsedSwimSeconds: swim
    });
  };

  updateElapsedT1Seconds = (swim, t1, bike, t2, run) => {
    t1 = parseInt(t1);
    t2 = parseInt(t2);

    let temp = swim + t1;
    // console.log(swim, t1, bike, t2, run, temp);

    let value = temp;

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
      elapsedT1Total: temp,
      elapsedT1DisplayHours: hours,
      elapsedT1DisplayMinutes: minutes,
      elapsedT1DisplaySeconds: value
    });
  };

  updateElapsedBikeSeconds = (swim, t1, bike, t2, run) => {
    t1 = parseInt(t1);
    t2 = parseInt(t2);

    let temp = swim + t1 + bike;

    // console.log(swim, t1, bike, t2, run, temp);

    let value = temp;

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
    } else if (value === 0) {
      minutes = `0${0}`;
      value = `0${0}`;
    }

    this.setState({
      elapsedBikeTotal: temp,
      elapsedBikeDisplayHours: hours,
      elapsedBikeDisplayMinutes: minutes,
      elapsedBikeDisplaySeconds: value
    });
  };

  updateElapsedT2Seconds = (swim, t1, bike, t2, run) => {
    t1 = parseInt(t1);
    t2 = parseInt(t2);

    let temp = swim + t1 + bike + t2;

    // console.log(swim, t1, bike, t2, run, temp);

    let value = temp;

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
    } else if (value === 0) {
      minutes = `0${0}`;
      value = `0${0}`;
    }

    this.setState({
      elapsedT2Total: temp,
      elapsedT2DisplayHours: hours,
      elapsedT2DisplayMinutes: minutes,
      elapsedT2DisplaySeconds: value
    });
  };

  updateElapsedRunSeconds = (swim, t1, bike, t2, run) => {
    t1 = parseInt(t1);
    t2 = parseInt(t2);

    let temp = swim + t1 + bike + t2 + run;
    // console.log(swim, t1, bike, t2, run, temp);

    let value = temp;

    let minutes = 0;
    let hours = 0;
    if (value / 60 >= 60) {
      hours = Math.floor(value / 60 / 60);
      value -= 3600 * hours;
    }
    if (value >= 60) {
      minutes = Math.floor(value / 60);
      if (minutes < 10 && minutes > 0) {
        minutes = `0${minutes}`;
      }

      value -= minutes * 60;
      if ((value < 10) & (value > 0)) {
        value = `0${value}`;
      }
    } else if (value === 0) {
      minutes = `0${0}`;
      value = `0${0}`;
    }

    // console.log(hours, minutes, value)

    this.setState({
      elapsedRunTotal: temp,
      elapsedRunDisplayHours: hours,
      elapsedRunDisplayMinutes: minutes,
      elapsedRunDisplaySeconds: value
    });
  };

  render() {
    return (
      <div className="App">
        <div className="title">
          <p>Triathlon Calculator</p>
        </div>
        <div className="top">
          <div className="top-container">
            <table className="top-table">
              <div className="distances">
                <tr className="row">
                  <td className="input-name">
                    <p>Swim Distance (Miles)</p>
                  </td>
                  <td className="input-slider">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="24"
                      // value="0"
                      onChange={e =>
                        this.updateSwimInputDistance(e.target.value)
                      }
                    />
                    <div>{this.state.swimSliderDistance}</div>
                  </td>
                </tr>

                <tr className="row">
                  <td className="input-name">
                    <p>Bike Distance (Miles)</p>
                  </td>

                  <td className="input-slider">
                    <input
                      className="slider"
                      type="range"
                      // value="0"
                      min="10"
                      max="112"
                      onChange={e =>
                        this.updateBikeInputDistance(e.target.value)
                      }
                    />
                    <div>{this.state.bikeInputDistance}</div>
                  </td>
                </tr>

                <tr className="row">
                  <td className="input-name">
                    <p>Run Distance (Miles)</p>
                  </td>

                  <td className="input-slider">
                    <input
                      className="slider"
                      type="range"
                      // value="0"
                      min="31"
                      max="262"
                      onChange={e =>
                        this.updateRunInputDistance(e.target.value)
                      }
                    />
                    {this.state.runInputDistance}
                  </td>
                </tr>
              </div>

              <div className="speeds">
                <tr className="row">
                  <td className="input-name">
                    <p>Swim Pace (Per 100 yards)</p>
                  </td>

                  <td className="input-slider">
                    <input
                      className="slider"
                      type="range"
                      // value="0"
                      min="80"
                      max="198"
                      onChange={e => this.swimSliderDisplay(e.target.value)}
                    />
                    {this.state.swimSliderMinutes}:
                    {this.state.swimSliderSeconds}
                  </td>
                </tr>

                <tr className="row">
                  <td className="input-name">
                    <p>Transition 1 (Minutes)</p>
                  </td>

                  <td className="input-slider">
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

                <tr className="row">
                  <td className="input-name">
                    <p>Bike Speed (MPH)</p>
                  </td>

                  <td className="input-slider">
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

                <tr className="row">
                  <td className="input-name">
                    <p>Transition 2 (Minutes)</p>
                  </td>

                  <td className="input-slider">
                    <input
                      className="slider"
                      type="range"
                      // value="0"
                      min="200"
                      max="540"
                      onChange={e => this.updatet2Time(e.target.value)}
                    />
                    {this.state.t2OutputMinutes}:{this.state.t2OutputSeconds}
                  </td>
                </tr>

                <tr className="row">
                  <td className="input-name">
                    <p>Run Pace (Per mile)</p>
                  </td>

                  <td className="input-slider">
                    <input
                      className="slider"
                      type="range"
                      // value="0"
                      min="480"
                      max="810"
                      onChange={e => this.updateRunInputPace(e.target.value)}
                    />
                    {this.state.runSliderMinutes}:{this.state.runSliderSeconds}
                  </td>
                </tr>
              </div>

                

                
            </table>
          </div>
        </div>

        {/* ////////////////////////////////////////////////////////////////////////////////// */}

        <div className="bottom">
          <div className="bottom-container">
            <table>
              <tr className="row">
                <th>Event</th>
                <th>Split</th>
                <th>Elapsed</th>
                <th>Clock</th>
              </tr>
              <tr className="row">
                <td>Swim</td>
                <td>
                  {this.state.swimOutputHours}:{this.state.swimOutputMinutes}:
                  {this.state.swimOutputSeconds}
                </td>
                <td>
                  {/* {this.state.elapsedSwimSeconds}----------- */}
                  {this.state.swimOutputHours}:{this.state.swimOutputMinutes}:
                  {this.state.swimOutputSeconds}
                </td>
                <td />
              </tr>
              <tr className="row">
                <td>T1</td>
                <td>
                  {this.state.t1OutputMinutes}:{this.state.t1OutputSeconds}
                </td>
                <td>
                  {/* {this.state.elapsedT1Total}----------- */}
                  {this.state.elapsedT1DisplayHours}:
                  {this.state.elapsedT1DisplayMinutes}:
                  {this.state.elapsedT1DisplaySeconds}
                </td>
                <td />
              </tr>
              <tr className="row">
                <td>Bike</td>
                <td>
                  {this.state.bikeOutputHours}:{this.state.bikeOutputMinutes}:
                  {this.state.bikeOutputSeconds}
                </td>
                <td>
                  {/* {this.state.elapsedBikeTotal}----------- */}
                  {this.state.elapsedBikeDisplayHours}:
                  {this.state.elapsedBikeDisplayMinutes}:
                  {this.state.elapsedBikeDisplaySeconds}
                </td>
                <td />
              </tr>
              <tr className="row">
                <td>T2</td>
                <td>
                  {this.state.t2OutputMinutes}:{this.state.t2OutputSeconds}
                </td>
                <td>
                  {/* {this.state.elapsedT2Total}----------- */}
                  {this.state.elapsedT2DisplayHours}:
                  {this.state.elapsedT2DisplayMinutes}:
                  {this.state.elapsedT2DisplaySeconds}
                </td>
                <td />
              </tr>
              <tr className="row">
                <td>Run</td>
                <td>
                  {this.state.runOutputHours}:{this.state.runOutputMinutes}:
                  {this.state.runOutputSeconds}
                </td>
                <td>
                  {/* {this.state.elapsedRunTotal}----------- */}
                  {this.state.elapsedRunDisplayHours}:
                  {this.state.elapsedRunDisplayMinutes}:
                  {this.state.elapsedRunDisplaySeconds}
                </td>
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
