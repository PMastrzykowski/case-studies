import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const cases = [
  {
  title: 'Distance guides',
  img: './distance_guides.svg',
  details: 'Show distances from a selected to hovered element or to the screen borders. Implementation required refactoring dynamic guides, smart guides and multiselections. All green elements change dynamically on rotation, resize, snap and drag actions. Skills: maths including trigonometry.'
},{
  title: 'Font Manager',
  img: './font_manager.svg',
  details: 'Allows users to add Google, Typekit or custom fonts to their projects. Project required managing asynchronous actions, states, animations, and file uploading. Except for the above, I wrote a compatibility script adjusting all existing users’ projects to the new data formats.'
},{
  title: 'Transitions flickering',
  img: './transitions_flickering.svg',
  details: 'I worked with an interesting bug occuring only in Safari. A white screen showed up for a milisecond just before any screen transition (Greensock) was executed. I realized that we display a new screen as a block and then run the animation. The solution was simple (manipulating opacity), but I learnt that some browsers (Safari) are more accurate than others.'
},
]
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <img src="./proto_logo.svg"/>
      
          <div className="App-title">case studies</div>
        </div>
        {cases.map(item => <Case key={item.title} case={item}/>)}
      </div>
    );
  }
}

class Case extends Component {
  render() {
    return (
      <div className="Case">
      
        <img src={this.props.case.img} className="Case-image"/>
        <div>
        <div className="Case-title">{this.props.case.title}</div>
        <div className="Case-details">{this.props.case.details}</div>
        </div>
      </div>
    );
  }
}

export default App;
