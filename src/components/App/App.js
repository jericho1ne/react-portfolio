// Libraries & Components
import React, { Component } from 'react'
import Project from '../Project/Project'
import Header from '../Header/Header'

// Styles
import './App.scss'

// External data
import projectData from '../../assets/projectData.json'
import linkData from '../../assets/links.json'

// Build container of image assets
const projectImages = require.context('../../assets/projects', true)

class App extends Component {
  state = {
    viewState: 'projects',
    projects: projectData,
    links: linkData.slice(0, 3),
    images: projectImages,
    projectInFocus: '',
  }

  /**
   * Toggle currently content view
   */
  changeView = (viewName) => {
    console.warn(`changeView() called: ${viewName}`)

    // setState updates current component and all children
    this.setState({
      currentView: viewName
    })

    window.projects = this.state.projects
    window.viewState = this.state.viewState
  }

  /**
   * Updates state of currently shown project.
   * Example of State changes: '' -> 3 -> '' -> 2
   * (always should be toggled back to blank)
   */
  toggleProject = (id) => {
    console.warn(`getProject( ${id} )`)

    // Grab detailed info on the requested project
    // const result = this.state.projects.filter(item => item.id === id)

    // Determine whether to display the requested project.
    // Else, close the fullscreen modal.
    const projectInFocus = this.state.projectInFocus
      ? ''
      : id

    this.setState({ projectInFocus }, () => { })
  }

  escTriggered = (event) => {
    if (event.keyCode === 27 && this.state.projectInFocus !== '') {
      console.log(' *** escapeTriggered ***')
      this.setState({ projectInFocus: '' }, () => { })
    }
  }

  componentDidMount() {
    console.log(' *** componentDidMount ***')
    document.addEventListener('keydown', this.escTriggered, false)
  }

  componentWillUnmount() {
    console.log(' *** componentDidMount ***')
    document.addEventListener('keydown', this.escTriggered, false)
  }

  handleChange() {
    console.log(' *** handleChange ***')
  }

  render() {
    // Grab images separately we'll need to create file resources later
    let projectImages = this.state.images

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
          thumb={ projectImages(`./${project.thumb}`) }
          tech={ project.tech }
          media={ project.media }
          inFocus={ (this.state.projectInFocus === project.id) }
          clickHandler={ event => this.toggleProject(event.target.id) }
        />
      )
    })

    return (
      <div className="App">
        <Header links={ this.state.links } />
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

export default App
