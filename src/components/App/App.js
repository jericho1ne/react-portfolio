// Libraries & Components
import React, { Component } from 'react'
import Project from '../Project/Project'
import Modal from '../Modal/Modal'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

// Styles
import './App.scss'

// External data
import projectData from '../../assets/projectData.json'
import introduction from '../../assets/introduction.json'

// Build container of image assets
const projectImages = require.context('../../assets/projects', true)
const viewportHeight = window.innerHeight

class App extends Component {
  state = {
    currentView: 'projects',
    projects: projectData,
    header: {
      isVisible: true,
    },
    images: projectImages,
    modalVisible: false,
    pFocus: {},
  }

  /**
   * Toggle currently content view
   */
  changeView = (viewName) => {
    // setState updates current component and all children
    this.setState({
      currentView: viewName
    })
  }

  /**
   * Updates state of currently shown project.
   * Example of State changes: '' -> 3 -> '' -> 2
   * (always should be toggled back to blank)
   */
  showProjectModal = (id) => {
    // Grab detailed info on the requested project (if needed)
    const projDetails = this.state.projects.filter(item => (item.id === id))[0]

    // Determine whether to display the requested project.
    // Else, close the fullscreen modal.
    this.setState({
      pFocus: projDetails,
      modalVisible: true
    }, () => {
      // console.log(this.state.pFocus)
     })
  }

  hideProjectModal() {
    this.setState({
      pFocus: {},
      modalVisible: false,
    }, () => {
      // console.log(this.state.pFocus)
    })
  }

  /**
   * Escape key also closes project detail modal
   */
  escTriggered = (event) => {
    if (event.keyCode === 27) {
      this.hideProjectModal();
    }
  }

  /**
   *  Collapse (fixed) header once screen scroll occurs a certain amount
   */
  handleScroll = (event) => {
    const yPos = Math.round(document.documentElement.scrollTop)
    const farEnoughDown = yPos > Math.round(viewportHeight / 4)

    this.setState({
      scroll: {
        showHeader: !farEnoughDown
      }
    })
  }

  /**
   *  Attach listeners when App component is first mounted
   */
  componentDidMount() {
    // Attach event listeners
    document.addEventListener('keydown', this.escTriggered, false)
    document.addEventListener('scroll', this.handleScroll, { passive: true })
  }

  /**
   * Remove listeners
   */
  componentWillUnmount() {
    // Detach event listeners
    document.addEventListener('keydown', this.escTriggered, false)
    document.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    // Grab images separately we'll need to create file resources later
    let projectImages = this.state.images

    // Lock body scroll if a project detail modal is showing
    document.body.classList.toggle('lock-scroll', this.state.modalVisible)

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
            openHandler={ event => this.showProjectModal(project.id) }
          />
        </ErrorBoundary>
      )
    })

    return (
      <div className="App">
        <Header
          isVisible={ this.state.header.isVisible }
          links={ introduction.header.links.slice(0, 3) }
          title={ introduction.header.title }
          body={ introduction.header.body }
        />
        <div>
          <div className={`content-overlay ${(this.state.modalVisible ? 'show' : '' )}`}></div>
          <div className="project__cards">
            { projectList }
          </div>
          <Modal
            key="project-modal"
            show={ this.state.modalVisible }
            title={ this.state.pFocus.title }
            subtitle={ this.state.pFocus.subtitle }
            tech={ this.state.pFocus.tech }
            detail={ this.state.pFocus.detail }
            media={ this.state.pFocus.media }
            closeHandler={ event => this.hideProjectModal() }
          />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
