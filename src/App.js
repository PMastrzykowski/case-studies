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
            <div><img src="./proto_logo.svg" ref={e => this.proto_logo = e}/></div>
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
