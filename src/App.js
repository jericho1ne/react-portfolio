// useState helps us turn App.js into a functional component yet still
// lets us access State
import React, { Component, useState } from 'react';

// Import images
import logo from './assets/logo.svg';


// Components and related
import Project from './Project/Project'
import './App.scss';


// Get external project list
import projectData from './assets/projectData.json';

// Build container of image assets
const projectImages = require.context('./assets/projects', true);


class App extends Component {
  state = {
    viewState: 'projects',
    projects: projectData,
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

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <div className="project__header">
            <button onClick={() => this.changeView('projects')}>Projects</button>
            <button onClick={() => this.changeView('resume')}>Resume</button>
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
