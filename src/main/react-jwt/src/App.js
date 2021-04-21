import React, { Component } from "react";
import './App.css';
import AuthService from './services/Auth'
import "bootstrap/dist/css/bootstrap.min.css"
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, Route, Switch} from "react-router-dom";
import Home from "./components/home_page/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserProfile from "./components/user_page/UserProfile";
import UsersList from "./components/user_page/UsersList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showUserBoard: user.user.roles.includes("USER"),
        showAdminBoard: user.user.roles.includes("ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
        <>
          <Navbar bg="dark" collapseOnSelect expand="lg">
            <Container>
              <Navbar.Brand>Spring React JWT</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto color-nav">
                  <Nav.Link className="color-nav" as={Link} to={"/home"}>
                    Home
                  </Nav.Link>
                  {currentUser ? (
                      <>
                        <Nav.Link as={Link} to={"/profile"}>
                          Profile
                        </Nav.Link>
                        <Nav.Link as={Link} to={"/users"}>
                          Users list
                        </Nav.Link>
                        <Nav.Item>
                          <a href="/login" className="nav-link" onClick={this.logOut}>Logout</a>
                        </Nav.Item>
                      </>
                  ) : (
                      <>
                        <Nav.Link as={Link} to={"/login"}>
                          Login
                        </Nav.Link>
                        <Nav.Link as={Link} to={"/register"}>
                          Register
                        </Nav.Link>
                      </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={UserProfile} />
              <Route path="/users" component={UsersList} />
            </Switch>
          </div>
        </>
    );
  }
}

export default App;
