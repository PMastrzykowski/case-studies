import React, { Component } from 'react';
import './App.css';
import Waypoint from 'react-waypoint';
import {TimelineMax, TweenMax, Back} from 'gsap';

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
},{
  title: 'Equidistances',
  img: './equidistances.svg',
  details: 'Whenever you want to make a grid or just position items in the same distance, equidistances come with help. Dragged item snaps vertically or horizontally to invisible guides basing on distances between them. Snap points and equidistant guides are calculated and displayed dynamically while dragging. The functionality was applied to single items, groups and multiselections.'
},{
  title: 'Smart guides',
  img: './smart_guides.svg',
  details: 'Snapping to the existing items (actually to their top, bottom, left, right or center) is possible thank to the smart guides. When I started refactoring this functionality, smart guides were just full length lines on a front layer of canvas. Now these guide lines connect all items with the same snapping points and show distance between dragged item, group or multiselection and the closest item. Making this feature work, I had to deal with trigonometry and zooming.'
},
]
class App extends Component {
  componentDidMount(){
    let tl = new TimelineMax({delay: 0.5});
    tl
    .from(this.proto_logo, 1, {x: -30, opacity: 0})
    .from(this.subtitle1, 1, {x: 30, opacity: 0}, 0)
    .from(this.subtitle2, 1, {x: 30, opacity: 0}, 0.5)

    
    TweenMax.to(this.star1,4,{y: -20, ease: Back.easeInOut, yoyo: true, repeat: -1})
    TweenMax.to(this.star2,5,{y: 40, ease: Back.easeInOut, yoyo: true, repeat: -1})
    TweenMax.to(this.star3,4,{y: 30, ease: Back.easeInOut, yoyo: true, repeat: -1})
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="App-center">
            <div>
            <svg ref={e => this.proto_logo = e} width="141px" height="141px" viewBox="0 0 141 141" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="Group" fill="#FFFFFF">
                      <path d="M70.5,141 C31.5639251,141 0,109.436075 0,70.5 C0,31.5639251 31.5639251,0 70.5,0 C109.436075,0 141,31.5639251 141,70.5 C141,109.436075 109.436075,141 70.5,141 Z M70.5,129 C102.808658,129 129,102.808658 129,70.5 C129,38.1913421 102.808658,12 70.5,12 C38.1913421,12 12,38.1913421 12,70.5 C12,102.808658 38.1913421,129 70.5,129 Z" id="Combined-Shape"></path>
                      <path d="M70.5,28 C96,56 85.5,86.5 84,92.5 C86,96.5 91,107 91,113.5 C87.6666667,109.166667 83.3333333,106.166667 78,104.5 C75,109.166667 72.5,112.166667 70.5,113.5 C67.5,112.5 66,108 63.5,104.5 C58.8333333,105.166667 54.3333333,108.166667 50,113.5 C50.6666667,104.166667 53.1666667,97.1666667 57.5,92.5 C44.5,58.5 66,31 70.5,28 Z M71,71 C75.418278,71 79,67.418278 79,63 C79,58.581722 75.418278,55 71,55 C66.581722,55 63,58.581722 63,63 C63,67.418278 66.581722,71 71,71 Z" id="Combined-Shape"></path>
                  </g>
              </g>
          </svg>
            </div>
            <div className="App-title">
              <div className="App-subtitle1" ref={e => this.subtitle1 = e}>case studies</div>
              <div className="App-subtitle2" ref={e => this.subtitle2 = e}>Patryk Mastrzykowski</div>
            </div>
          </div>
          <div className="App-stars">
            <div className="Star1 Star" ref={e => this.star1 = e}></div>
            <div className="Star2 Star" ref={e => this.star2 = e}></div>
            <div className="Star3 Star" ref={e => this.star3 = e}></div>
          </div>
        </div>
        {cases.map(item => <Case key={item.title} case={item}/>)}
        <div className="Footer-content">
          <div className="Footer-for-more">For more details please visit my</div>
          <div className="Footer-linkedin"><a href="https://www.linkedin.com/in/pmastrzykowski/">LinkedIn</a></div>
        </div>
      </div>
    );
  }
}

class Case extends Component {
  render() {
    return (
      <IsVisible>
      <div className="Case">
        <img src={this.props.case.img} className="Case-image"/>
        <div>
        <div className="Case-title">{this.props.case.title}</div>
        <div className="Case-details">{this.props.case.details}</div>
        </div>
      </div>
      </IsVisible>
    );
  }
}

class IsVisible extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isInView: false
      }
      this.onEnter=this.onEnter.bind(this);
      this.animate=this.animate.bind(this);
  }
  onEnter({ previousPosition }){
    if(previousPosition === Waypoint.below) {
      this.setState({
        isInView: true
      });
      this.animate()
    }
  }
  animate(){
    TweenMax.to(this.case, .4, {opacity: 1, y: -50})
  }
  render() {
    return (
      <div>
      <div ref={e => this.case = e} className="Invisible">{this.props.children}</div>
      <Waypoint onEnter={this.onEnter}></Waypoint>
      </div>
    );
  }
}

export default App;
