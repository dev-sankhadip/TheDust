import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// import AuthPage from './components/auth/Auth';
import Homepage from './components/Homepage';
import CreateBlogForm from './components/blog/createBlogForm';
import CheckAuth from './components/auth/checkAuth';
import NavbarComponent from './components/navbar/navbar';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Profile from './components/profile/profileEdit';
import ProfileView from './components/profile/profileView';
import Blog from './components/blog/BlogDetails';


class App extends Component {
  state={
    isLoggedin:''
  }
  changeState=(val)=>{
    this.setState({ isLoggedin:val })
  }
  componentDidMount(){
      CheckAuth()
      .then(()=>{
        this.setState({ isLoggedin:true })
      }).catch(()=>{ this.setState({ isLoggedin:false }) })
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
            <main className="main-content">
              <NavbarComponent isLoggedin={ this.state.isLoggedin } changeState={ this.changeState } />
              <Switch>
                <Route exact path="/" render={props=>(
                  <Homepage {...props} changeState={ this.changeState } />
                )} />
                <Route path="/new" render={props=>(
                  this.state.isLoggedin===true ? <CreateBlogForm {...props} /> : (this.state.isLoggedin===false ? <Redirect to="/login" /> : null )
                )} />
                <Route path="/blog/:blogid" render={props=>(
                  <Blog  {...props} />
                )} />
                <Route path="/login" render={props=>(
                  this.state.isLoggedin===true ? <Redirect to='/' /> : ( this.state.isLoggedin===false ? <Login {...props} changeState={ this.changeState } /> : null )
                )} />
                <Route path="/signup" render={props=>(
                  this.state.isLoggedin===true ? <Redirect to='/' /> : ( this.state.isLoggedin===false ? <Register { ...props } /> : null )
                )} />
                <Route path="/edit/blog/:blogid" render={props=>(
                  this.state.isLoggedin===true ? <CreateBlogForm {...props} /> : ( this.state.isLoggedin===false ? <Redirect to="/login" /> : null )
                )} />
                <Route path="/edit/:username" render={props=>(
                  this.state.isLoggedin===true ? <Profile {...props} /> : (this.state.isLoggedin===false ? <Redirect to="/login" /> : null )
                )} />
                <Route path="/:username" render={props=>(
                  <ProfileView {...props} isLogin={ this.state.isLoggedin } />
                )} />
              </Switch>
            </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App; 
