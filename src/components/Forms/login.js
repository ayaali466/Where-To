import React, { Component } from "react";
import "./form.css";
import Signup from "./Signup";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { login } from "../../actions/clients";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Joi from "joi-browser";

class Login extends Component {
  constructor(props) {
    super(props);
    this.checked = React.createRef();
    this.addActiveClass = this.addActiveClass.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  //static contextType = SessionContext;
  state = {
    //login state
    Email: "",
    Password: "",
    errors: {},
    token: "",
    isAuth: false,
    user_id: "",
    isChecked: false,
  };
  async componentDidMount() {
    if (localStorage.checked === "true") {
      await this.setState({
        Email: localStorage.email,
        Password: localStorage.password,
        isChecked: true,
      });
    } else {
      await this.setState({ Email: "", Password: "", isChecked: false });
    }
  }

  schema = {
    Email: Joi.string().required().email(),
    Password: Joi.string().required(),
  };
  handelchange = (e) => {
    this.state.errors[e.currentTarget.name] = null;
    let state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  };

  Validations = () => {
    const errors = {};
    let state = { ...this.state };
    delete state.errors;
    delete state.isAuth;
    delete state.token;
    delete state.user_id;
    delete state.isChecked;
    var res = Joi.validate(state, this.schema, { abortEarly: false });
    if (res.error === null) {
      this.setState({ errors: {} });
      return null;
    }
    for (const error of res.error.details) {
      errors[error.path] = error.message;
    }
    this.setState({ errors: errors });
  };

  handleInputChange = async (e) => {
    this.setState({ isChecked: e.currentTarget.checked });
  };

  handelLogin = async (e) => {
    e.preventDefault();
    const errors = this.Validations();
    if (errors !== null) return;
    var formData = new FormData();
    formData.append("email", this.state.Email);
    formData.append("password", this.state.Password);
    let url = "https://node-airbnb.herokuapp.com/api/login";
    await this.props.login(formData, url);

    if (
      this.props.client.message === "A user with this email could not be found."
    ) {
      window.alert("A user with this email could not be found.");
    } else if (this.props.client.message === "Wrong password!") {
      window.alert("Wrong password!");
    } else {
      await localStorage.setItem("token", this.props.client.token);
      await localStorage.setItem("user_id", this.props.client.user_id);
    }
    if (this.state.isChecked === true) {
      await localStorage.setItem("email", this.state.Email);
      await localStorage.setItem("password", this.state.Password);
      await localStorage.setItem("checked", this.state.isChecked);
    } else {
      await localStorage.removeItem("email");
      await localStorage.removeItem("password");
      await localStorage.removeItem("checked");
    }
    if (this.props.client.token) {
      this.setState({
        isAuth: true,
        token: this.props.client.token,
        user_id: this.props.client.user_id,
      });
      this.props.history.replace("/");
    }
  };

  addActiveClass(i) {
    var li1 = document.getElementById("li1");
    var li2 = document.getElementById("li2");
    var a1 = document.getElementById("a1");
    var a2 = document.getElementById("a2");
    var signin = document.getElementById("signin");
    var signup = document.getElementById("signup");
    if (i === "1") {
      li1.classList.add("active");
      a1.classList.add("active-text");
      li2.classList.remove("active");
      a2.classList.remove("active-text");
      signin.classList.remove("d-none");
      signup.classList.add("d-none");
    } else if (i === "2") {
      li1.classList.remove("active");
      a1.classList.remove("active-text");
      li2.classList.add("active");
      a2.classList.add("active-text");
      signin.classList.add("d-none");
      signup.classList.remove("d-none");
    }
  }
  render() {
    document.title = "Where To? - Login or Sign Up";
    return (
      <section
        id="login_form"
        className="background"
        style={{ backgroundImage: "url(/bg.jpg)" }}
      >
        <div className="background p-3">
          <div className="pt-4">
            <div
              className="buttons-container mx-auto mt-5"
              style={{ width: "220px" }}
            >
              <ul>
                <li
                  onClick={() => this.addActiveClass("1")}
                  id="li1"
                  className="active"
                >
                  <a id="a1" className="active-text">
                    <FiLogIn />
                  </a>
                </li>

                <li onClick={() => this.addActiveClass("2")} id="li2">
                  <a id="a2">
                    <FaUserPlus />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div id="signin" className="container signinClass">
            <div className="row justify-content-center">
              <div className="col-sm-9 col-md-7 col-lg-5">
                <div className="card card-signin my-5">
                  <div className="card-body">
                    <h5 className="card-title text-center mt-0">
                      Welcome back!
                    </h5>
                    <form
                      onSubmit={this.handelLogin}
                      className="form-signin"
                      method="POST"
                    >
                      <div className="form-label-group">
                        <input
                          name="Email"
                          value={this.state.Email}
                          onChange={this.handelchange}
                          type="email"
                          className="form-control"
                          placeholder="Email address"
                        />
                        {this.state.errors.Email && (
                          <div className="alert alert-danger form-control">
                            {this.state.errors.Email}
                          </div>
                        )}
                      </div>

                      <div className="form-label-group">
                        <input
                          name="Password"
                          value={this.state.Password}
                          onChange={this.handelchange}
                          type="password"
                          className="form-control"
                          placeholder="Password"
                        />
                        {this.state.errors.Password && (
                          <div className="alert alert-danger form-control">
                            {this.state.errors.Password}
                          </div>
                        )}
                      </div>
                      <div className="custom-control custom-checkbox text-center mt-2 mb-2">
                        <input
                          name="isChecked"
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                          checked={this.state.isChecked}
                          onChange={this.handleInputChange}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          Remember Me
                        </label>
                      </div>

                      <button
                        className="mybtn btn-lg btn-block text-uppercase submit-button"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="signup" className="container d-none signupClass">
            <Signup history={this.props.history} />
          </div>
        </div>
      </section>
    );
  }
}
const mapactiontoprops = (disptch) => {
  return bindActionCreators(
    {
      login,
    },
    disptch
  );
};
const mapstatetoprops = (state) => {
  return {
    client: state.Clients,
  };
};
export default connect(mapstatetoprops, mapactiontoprops)(Login);
