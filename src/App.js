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

// for (var i=0; i < projectData.length; i++) {
//   console.log(projectData[i].media.thumb)
// }

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
          <div className="project__list">
            <Project
              id={ this.state.projects[0].id }
              title={ this.state.projects[0].title }
              type={ this.state.projects[0].type }
              subtitle={ this.state.projects[0].subtitle }
              thumb={ this.state.images(`./${this.state.projects[0].media.thumb}`) }
              images={ this.state.projects[0].media.images}
              tech={ this.state.projects[0].tech }
              clickHandler={ event => this.showProjectDetails(event.target.id) }
              description="Blah..."
            />
            <Project
              id={this.state.projects[1].id}
              title={this.state.projects[1].title}
              type={this.state.projects[1].type}
              subtitle={this.state.projects[1].subtitle}
              tech={this.state.projects[1].tech}
              clickHandler={ event => this.showProjectDetails(event.target.id) }
              description="Blah..."
            />
            <Project
              id={this.state.projects[2].id}
              title={this.state.projects[2].title}
              type={this.state.projects[2].type}
              subtitle={this.state.projects[2].subtitle}
              tech={this.state.projects[2].tech}
              clickHandler={ event => this.showProjectDetails(event.target.id) }
              description="Blah..."
            />
          </div>
        </content>
      </div>
    )
  }
}

export default App;
