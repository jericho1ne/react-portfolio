// Libraries & Components
import React, { Component } from 'react'
import Project from '../Project/Project'
import Header from '../Header/Header'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

// Styles
import './App.scss'

// External data
import projectData from '../../assets/projectData.json'
import headerData from '../../assets/headerData.json'

// Build container of image assets
const projectImages = require.context('../../assets/projects', true)

class App extends Component {
  state = {
    viewState: 'projects',
    projects: projectData,
    header: {
      title: headerData.title,
      body: headerData.body,
      links: headerData.links.slice(0, 3),
      isVisible: true,
    },
    images: projectImages,
    projectInFocus: '',
    scroll: {
      vHeight: window.innerHeight,
    },
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
    // console.warn(`getProject( ${id} )`)

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

  handleScroll = (event) => {
    console.log("scrolling")
    // console.log( window.pageYOffset )
    const yPos = document.documentElement.scrollTop
    console.log( yPos )

    // Check if screen has been scrolled at least halfway down
    const farEnoughDown = yPos > (this.state.scroll.vHeight / 2)

    this.setState({
      scroll: {
        showHeader: farEnoughDown
      }
    })
  }

  componentDidMount() {
    // Attach event listeners
    document.addEventListener('keydown', this.escTriggered, false)
    document.addEventListener('scroll', this.handleScroll, { passive: true })
  }

  componentWillUnmount() {
    // Detach event listeners
    document.addEventListener('keydown', this.escTriggered, false)
    document.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    // Grab images separately we'll need to create file resources later
    let projectImages = this.state.images

    // Lock body scroll if a project detail modal is showing
    document.body.classList.toggle('lock-scroll', this.state.projectInFocus !== '')

    var projectList = this.state.projects.map((project, index) => {
      return (
        <ErrorBoundary key={`eb${index}`}>
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
            clickHandler={ event => this.toggleProject(project.id) }
          />
        </ErrorBoundary>
      )
    })

    return (
      <div className="App">
        <Header
          isVisible={ this.state.header.isVisible }
          links={ this.state.header.links }
          title={ this.state.header.title }
          body={ this.state.header.body }
        />
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
