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
   *  Actions
   **/
  // useEffect = () => {
  //   // https://reactjs.org/docs/hooks-effect.html
  //   console.log(`*** useEffect triggered ***`)
  //   window.viewState = this.state.viewState;
  //   window.projectState = this.state.projects;
  // }

  /**
   *
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
    const result = this.state.projects.filter(item => item.id === parseInt(id));
    console.warn(result);

    // If state is currently blank, then we need to display the requested project.
    // Else, something is currently displayed, so close the fullscreen modal.
    if (this.state.projectInFocus === '') {
      this.setState({
        projectInFocus: parseInt(id)
      }, () => {
        console.log(this.state)
      })
    } else {
      this.setState({
        projectInFocus: ''
      }, () => {
        console.log(this.state)
      })
    }

  }

  /**
   *
   */
  expandProject(parentCard) {
    parentCard.classList.add('project-fixed')
  }

  /**
   *
   */
  shrinkProject(e) {
    e.target.closest(".project-card").classList.remove('project-fixed')
  }

  render() {
    let projectImages = this.state.images;
    // Save `this` keyword as something else... (#FML)
    let rootApp = this;

    // Lock body scroll if a project detail modal is showing
    document.body.classList.toggle('lock-scroll', this.state.projectInFocus !== '')

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
          inFocus= { (rootApp.state.projectInFocus === project.id ? true : false) }
          clickHandler={ event => rootApp.toggleProject(event.target.id) }
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
