import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";

function LoginButton(props) {
  return (
    <Link to="/login" className="nav-link btn main-btn" onClick={props.onClick}>
      Login
    </Link>
  );
}

function LogoutButton(props) {
  return (
    <Link to="/" className="nav-link btn main-btn" onClick={props.onClick}>
      Logout
    </Link>
  );
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnValue: "Log In",
      path: "",
      isAuth: false,
      login: false,
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    // this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({
        isAuth: true,
        login: true,
        // btnValue: "Log Out",
        path: "/",
      });
    } else {
      this.setState({
        isAuth: false,
        login: false,
        // btnValue: "Log In",
        path: "/login",
      });
    }

    // this.handleClick(this.state.btnValue);
  }

  // componentDidUpdate() {
  //     console.log("******", this.state.btnValue);
  // }

  handleLoginClick() {
    // console.log("***handleLoginClick***");
    this.setState({ isAuth: true });
    // if(localStorage.getItem("token")) {
    //     window.location.reload();
    // }
  }

  handleLogoutClick() {
    // console.log("===handleLogoutClick===");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    this.setState({ isAuth: false });
  }

  handleClick(val) {
    if (val === "Log In") {
      //   console.log("ifffffff");
      this.setState({ btnValue: "Log Out" });
      // this.props.history.push("/login");
    } else {
      //   console.log("elseeeeee");
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      this.setState({ btnValue: "Log In" });
      // this.props.history.push("/team");
    }
  }

  // forceUpdateHandler(){
  //     this.forceUpdate();
  // };

  render() {
    let isAuth = false;
    if (localStorage.getItem("token")) {
      //   console.log("render ifffff");
      isAuth = true;
      // this.setState({isAuth: true});
    } else {
      //   console.log("render elseeee");
      isAuth = false;
      // this.setState({isAuth: false});
    }
    // const isAuth = this.state.isAuth;
    return (
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 37,
          backgroundColor: "rgba(99, 99, 99, 0.5)",
        }}
      >
        <nav className="navbar navbar-expand-lg navbar-light mx-0 mx-md-5 py-0">
          <Link to="/" className="navbar-brand">
            <img
              // src="/images/Logo/Logo-Icon-2.png"
              src="/images/Logo/Logo_where-to-3.png"
              // width="60"
              height="60"
              alt="Logo"
              style={{
                backgroundColor: "transparent !important",
              }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/host" className="nav-link">
                  Add Place
                </Link>
              </li>

              {isAuth ? (
                <li className="nav-item">
                  <LogoutButton onClick={this.handleLogoutClick} />
                </li>
              ) : (
                <li className="nav-item">
                  <LoginButton onClick={this.handleLoginClick} />
                </li>
              )}

              <li className="nav-item">
                <Link to="/profile" className="nav-link btn">
                  <BsFillPersonFill className="user-icon" />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;
