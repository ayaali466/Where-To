import React, { Component } from "react";
// import React, { Component, createRef  }  from 'react';
import "./form.css";
import Joi from "joi-browser";
import axios from "axios";
import { setSessionCookie } from "../session";
import { addclient } from "../../actions/clients";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink as Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    UserName: "",
    Email: "",
    PhoneNumber: "",
    Password: "",
    Password_confirm: "",
    Signup_errors: {},
  };

  ///start login form functions
  handelchange = (e) => {
    this.state.Signup_errors[e.currentTarget.name] = null;
    let state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  };

  schema = {
    UserName: Joi.string().required().max(15),
    Email: Joi.string().required().email(),
    Password: Joi.string().trim().required().min(5).max(20),
    Password_confirm: Joi.any().equal(Joi.ref("Password")),
    PhoneNumber: Joi.string()
      .required()
      .regex(/^[0-9]+$/)
      .required(),
  };

  signupValidations = () => {
    const errors = {};
    let state = { ...this.state };
    delete state.Signup_errors;
    var res = Joi.validate(state, this.schema, { abortEarly: false });
    if (res.error === null) {
      this.setState({ Signup_errors: {} });
      return null;
    }
    for (const error of res.error.details) {
      errors[error.path] = error.message;
    }
    console.log(res.error.details);
    this.setState({ Signup_errors: errors });
  };

  handelsignup = async (e) => {
    e.preventDefault();
    const errors = this.signupValidations();
    if (errors !== null) return;

    var formData = new FormData();
    formData.append("name", this.state.UserName);
    formData.append("email", this.state.Email);
    formData.append("password", this.state.Password);
    formData.append("phone", this.state.PhoneNumber);
    formData.append("is_host", false);
    let url = "https://node-airbnb.herokuapp.com/api/signup";
    await this.props.addclient(formData, url);
    if (this.props.client.message === "Validation failed.") {
      window.alert(this.props.client.data[0].msg);
    } else {
      var email = this.state.Email;
      var password = this.state.password;
      setSessionCookie({ email, password });
      window.location.reload();
    }
  };

  render() {
    return (
      <div id="signup_form" className="row justify-content-center">
        <div className="col-sm-9 col-md-7 col-lg-5">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center mt-0">Register</h5>
              <form
                onSubmit={this.handelsignup}
                className="form-signin"
                method="POST"
              >
                <div className="form-label-group">
                  <input
                    value={this.state.UserName}
                    onChange={this.handelchange}
                    name="UserName"
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                  />
                  {this.state.Signup_errors.UserName && (
                    <div className="alert alert-danger form-control">
                      {this.state.Signup_errors.UserName}
                    </div>
                  )}
                </div>

                <div className="form-label-group">
                  <input
                    value={this.state.Email}
                    onChange={this.handelchange}
                    name="Email"
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                  />
                  {this.state.Signup_errors.Email && (
                    <div className="alert alert-danger form-control">
                      {this.state.Signup_errors.Email}
                    </div>
                  )}
                </div>

                <div className="form-label-group">
                  <input
                    value={this.state.PhoneNumber}
                    onChange={this.handelchange}
                    name="PhoneNumber"
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                  />
                  {this.state.Signup_errors.PhoneNumber && (
                    <div className="alert alert-danger form-control">
                      Not valid
                      {/* {this.state.Signup_errors.PhoneNumber} */}
                    </div>
                  )}
                </div>

                <div className="form-label-group">
                  <input
                    value={this.state.Password}
                    onChange={this.handelchange}
                    name="Password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  {this.state.Signup_errors.Password && (
                    <div className="alert alert-danger form-control">
                      {this.state.Signup_errors.Password}
                    </div>
                  )}
                </div>

                <div className="form-label-group">
                  <input
                    value={this.state.Password_confirm}
                    onChange={this.handelchange}
                    name="Password_confirm"
                    type="password"
                    id="inputConfirmPassword"
                    className="form-control"
                    placeholder="Confirm password"
                  />
                  {this.state.Signup_errors.Password_confirm && (
                    <div className="alert alert-danger form-control">
                      Password confirmation must equal to password
                    </div>
                  )}
                </div>

                {/* <div className="custom-control custom-checkbox text-center mt-2 mb-4">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck2"
                  />
                  <label
                    className="custom-control-label text-link"
                    htmlFor="customCheck2"
                  >
                    Agree to <Link to="/terms">Terms and Conditions</Link>
                  </label>
                </div> */}

                <button
                  className="mybtn btn-lg btn-block text-uppercase submit-button"
                  type="submit"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapactiontoprops = (disptch) => {
  return bindActionCreators(
    {
      addclient,
    },
    disptch
  );
};
const mapstatetoprops = (state) => {
  return {
    client: state.Clients,
  };
};
export default connect(mapstatetoprops, mapactiontoprops)(Signup);
