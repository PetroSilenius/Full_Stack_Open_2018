import React from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogUrl: '',
      username: '',
      password: '',
      message: null,
      error: false,
      user: null,
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
        this.setState({blogs})
    )
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      this.setState({user: JSON.parse(loggedUser)})
    }
  }

  addBlog = (event) => {
    event.preventDefault()
    blogService.setToken(this.state.user.token)
    this.blogForm.toggleVisibility()
    try {
      const blogObject = {
        title: this.state.newBlogTitle,
        author: this.state.newBlogAuthor,
        url: this.state.newBlogUrl,
      }

      blogService
          .create(blogObject)
          .then(newBlog => {
            this.setState({
              blogs: this.state.blogs.concat(newBlog)
            })
          })
      this.setState({ error: false, message: `Lisättiin uusi blogi ${blogObject.author} ${blogObject.title}` })
      setTimeout(() => {
        this.setState({ error: false, message: null })
      }, 1000)
      this.setState({title:'', author:'', url:''})
    } catch (exception) {
      console.log(exception)
      this.setState({ error: false, message: `Blogin lisäys epäonnistui` })
      setTimeout(() => {
        this.setState({ error: false, message: null })
      }, 2000)
    }
  }

  handleFieldChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ error: false, message: `Tervetuloa ${user.name}!` })
      setTimeout(() => {
        this.setState({ error: false, message: null })
      }, 1000)
      this.setState({username: '', password: '', user: null})
    } catch (exception) {
      console.log(exception)
      this.setState({ error: true, message: `Väärä käyttäjätunnus tai salasana` })
      setTimeout(() => {
        this.setState({ error: false, message: null })
      }, 2000)
    }
  }

  handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    this.setState({user: null})
    this.setState({ error: false, message: `Kirjauduit ulos` })
    setTimeout(() => {
      this.setState({ error: false, message: null })
    }, 1000)
  }


  render() {
    if (this.state.user === null) {
      return (
          <div>
            <Notification message={this.state.message} error={this.state.error}/>
            <LoginForm username={this.state.username}
                       password={this.state.password}
                       handleFieldChange={this.handleFieldChange}
                       handleLogin={this.handleLogin}
            />
          </div>
      )
    }
    return (
        <div>
          <Notification message={this.state.message} error={this.state.error}/>
          {this.state.user.name} kirjautuneena
          <button type="submit" onClick={this.handleLogout}>Kirjaudu ulos</button>
          <h2>Blogit</h2>
          {this.state.blogs.map(blog =>
              <Blog key={blog._id} blog={blog}/>
          )}
          <Togglable buttonLabel="uusi blogi" ref={component => this.blogForm=component}>
          <BlogForm
              title={this.state.newBlogTitle}
              author={this.state.newBlogAuthor}
              url={this.state.newBlogUrl}
              addBlog={this.addBlog}
              handleFieldChange={this.handleFieldChange}
          />
          </Togglable>
        </div>
    )
  }
}

export default App
