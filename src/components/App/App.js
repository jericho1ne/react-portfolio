import React, { Component, useState } from 'react';

// Import images
// import logo from './assets/logo.svg';

// Components and related
import Project from '../Project/Project'
import './App.scss';

// Get external project list and personal links
import projectData from '../../assets/projectData.json';
import linkData from '../../assets/links.json';

// Build container of image assets
const projectImages = require.context('../../assets/projects', true);

class App extends Component {
  state = {
    viewState: 'projects',
    projects: projectData,
    links: linkData,
    images: projectImages,
  }

  setViewState = () => {
    useState({
      viewState: 'some new value',
      projects: projectData,
    })
  }

// const App = props => {
  /**
   *  State setters
   **/
  // [ projectState, setProjectState ] = useState({
  //   projects: projectData,
  // })

  // [ viewState, setViewState ] = useState({
  //   viewState: 'some new value'
  // })

  /**
   *  Actions
   **/
  // useEffect = () => {
  //   // https://reactjs.org/docs/hooks-effect.html
  //   console.log(`*** useEffect triggered ***`)
  //   window.viewState = this.state.viewState;
  //   window.projectState = this.state.projects;
  // }

  changeView = (viewName) => {
    console.warn(`changeView() called: ${viewName}`);

    // setState updates current component and all children
    this.setState({
      currentView: viewName
    })

    window.projects = this.state.projects;
    window.viewState = this.state.viewState;
  }

  showProjectDetails = (id) => {
    console.warn(`showProjectDetails( ${id} )`);
  }

  render() {
    let projectImages = this.state.images;
    // Save `this` keyword as something else... (#FML)
    let rootApp = this;

    var projectList = this.state.projects.map(function(project) {
      return (
        <Project
          key={ project.id }
          id={ project.id }
          title={ project.title }
          type={ project.type }
          subtitle={ project.subtitle }
          thumb={ projectImages(`./${project.media.thumb}`) }
          images={ project.media.images}
          tech={ project.tech }
          clickHandler={ event => rootApp.showProjectDetails(event.target.id) }
        />
      );
    });

    var linkButtons = this.state.links.map(function(link) {
      return (
        <a className="button"
          key={ link.id }
          href={ link.url }
        >{ link.title }</a>
      );
    });

    // <img src={logo} className="App-logo" alt="logo" />

    return (
      <div className="App">
        <header className="header">
          <h2 class="cover-heading">Hello.</h2>
          <p class="subtitle">
            I am a full stack developer, cyclist and <a href="https://findsomecoffee.com/">artisanal coffee</a> enthusiast. Founder at <a href="https://lowtidedigital.com/">Low Tide Digital</a> & <a href="http://envueplatform.com">Envue</a>.
          </p>
          <div className="header__links">
            { linkButtons }
          </div>

        </header>
        <content>
          <div className="project__cards">
           { projectList }
          </div>
        </content>
      </div>
    )
  }
}

export default App;
