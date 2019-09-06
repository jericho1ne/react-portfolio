import React, { Component } from 'react';

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
    projectInFocus: '',
  }

  /**
   * Toggle currently content view
   */
  changeView = (viewName) => {
    console.warn(`changeView() called: ${viewName}`);

    // setState updates current component and all children
    this.setState({
      currentView: viewName
    })

    window.projects = this.state.projects;
    window.viewState = this.state.viewState;
  }

  /**
   * Updates state of currently shown project.
   * Example of State changes: '' -> 3 -> '' -> 2
   * (always should be toggled back to blank)
   */
  toggleProject = (id) => {
    console.warn(`getProject( ${id} )`);

    // Grab detailed info on the requested project
    // const result = this.state.projects.filter(item => item.id === id);

    // If state is currently blank, then we need to display the requested project.
    // Else, something is currently displayed, so close the fullscreen modal.

    const projectInFocus = this.state.projectInFocus
      ? ''
      : id;

    this.setState({ projectInFocus }, () => { /* console.log(this.state) */ })
  }

  render() {
    // Grab images separately; we'll need to create file resources later
    let projectImages = this.state.images;

    // Lock body scroll if a project detail modal is showing
    document.body.classList.toggle('lock-scroll', this.state.projectInFocus !== '')

    var projectList = this.state.projects.map((project, index) => {
      return (
        <Project
          key={ index }
          id={ project.id }
          title={ project.title }
          type={ project.type }
          subtitle={ project.subtitle }
          detail={ project.detail }
          thumb={ projectImages(`./${project.media.thumb}`) }
          images={ project.media.images}
          tech={ project.tech }
          inFocus= { (this.state.projectInFocus === project.id) }
          clickHandler={ event => this.toggleProject(event.target.id) }
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
          <h2 className="cover-heading">Hello.</h2>
          <p className="subtitle">
            I am a full stack developer, cyclist and coffee enthusiast. Founder of <a href="https://lowtidedigital.com/">Low Tide Digital</a> & <a href="http://envueplatform.com">Envue</a>.
          </p>
          <div className="header__links">
            { linkButtons }
          </div>

        </header>
        <content>
          <div className={`content-overlay ${(this.state.projectInFocus !== '' ? 'show' : '' )}`}></div>
          <div className="project__cards">
           { projectList }
          </div>
        </content>
      </div>
    )
  }
}

export default App;
