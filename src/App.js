import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./reset.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      swimInputDistance: null,
      swimSliderDistance: null,

      swimInputPace: null,

      swimOutputHours: 0,
      swimOutputMinutes: `00`,
      swimOutputSeconds: `00`,

      swimSliderMinutes: 1,
      swimSliderSeconds: `00`,

      swimTimeSeconds: null,

      // elapsedSwimSeconds: null

      t1InputSeconds: 0,

      t1SliderMinutes: 0,
      t1SliderSeconds: 0,

      t1OutputMinutes: `00`,
      t1OutputSeconds: `00`,



      bikeInputDistance: 10,
      bikeInputSpeed: 14,

      bikeOutputHours: null,
      bikeOutputMinutes: null,
      bikeOutputSeconds: null,

      bikeTimeSeconds: null,


      t2OutputMinutes: null,
      t2OutputSeconds: null
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
            if(this.state.swimInputPace){
              this.calcSwimTime(tempYards, this.state.swimInputPace);
            }
  };

  updateSwimInputPace = value => {
    let secondsHundredYards = value / 100;

    this.setState({
      swimInputPace: secondsHundredYards
    });

    if(this.state.swimInputDistance){
      this.calcSwimTime(this.state.swimInputDistance, secondsHundredYards);
    }
  };

  calcSwimTime = (yards, paceYards) => {

      let swimTimeSeconds = Math.round(yards * paceYards);
      
        this.setState({
          swimTimeSeconds: swimTimeSeconds
        })

    this.swimSecondsConverter(swimTimeSeconds);
  };

  ///////////////////////////////////////////////////////////////// t1

  updatet1Time = value => {
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
      t1OutputMinutes: minutes,
      t1OutputSeconds: value
    });
  };

  //  ///////////////////////////////////////////////////////////////// Bike

  updateBikeInputDistance = value => {

    this.setState({
      bikeInputDistance: value
    })
  
    this.calcBikeTime(value, this.state.bikeInputSpeed)

  };

  updateBikeInputSpeed = value => {

    console.log('input', value)
    
    let tempSpeed = value / 10
    console.log('bike speed', tempSpeed)
    
    
    this.setState({
      bikeInputSpeed: tempSpeed
    })
    console.log('bike speed on state', this.state.bikeInputSpeed)

    this.calcBikeTime(this.state.bikeInputDistance, tempSpeed)
  }

  calcBikeTime = (miles, mph) => {
    console.log(miles, mph)
    let tempSeconds = (miles / mph) * 3600
    console.log(tempSeconds, 'tempseconds')
     tempSeconds = Math.round((miles / mph) * 3600)
    console.log(tempSeconds, 'tempseconds')


    this.bikeSecondsConverter(tempSeconds)

    this.setState({
      bikeTimeSeconds: tempSeconds
    })

  }


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
      bikeOutputSeconds: value,
    });
  }



  /////////////////////////////

  updatet2Time = value => {
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
      t2OutputMinutes: minutes,
      t2OutputSeconds: value
    });
  }

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
                    min="140"
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
                <td />
                <td />
              </tr>
              <tr>
                <td>T1</td>
                <td>
                  {this.state.t1OutputMinutes}:{this.state.t1OutputSeconds}
                </td>
                <td />
                <td />
              </tr>
              <tr>
                <td>Bike</td>
                <td>{this.state.bikeOutputHours}:{this.state.bikeOutputMinutes}:{this.state.bikeOutputSeconds}</td>
                <td />
                <td />
              </tr>
              <tr>
                <td>T2</td>
                <td>{this.state.t2OutputMinutes}:{this.state.t2OutputSeconds}</td>
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
