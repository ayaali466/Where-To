import React, { Component } from "react";
import "./form.css";
import { AddReview } from "../../actions/reviews";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Joi from "joi-browser";
import { ToastContainer, toast } from "react-toastify";

class ReviewAdding extends Component {
  constructor(props) {
    super(props);
    this.rate = React.createRef();
  }
  state = {
    Rate: 0,
    Comment: "",
    Place_id: this.props.id,
    errors: [],
  };
  schema = {
    Rate: Joi.number().required().min(1).max(5),
    Comment: Joi.string().required(),
  };
  Validations = () => {
    const errors = {};
    let state = { ...this.state };
    delete state.errors;
    delete state.Place_id;
    var res = Joi.validate(state, this.schema, { abortEarly: false });
    if (res.error === null) {
      this.setState({ errors: {} });
      return null;
    }
    for (const error of res.error.details) {
      errors[error.path] = error.message;
    }
    this.setState({ errors: errors });
    console.log(this.state.errors);
  };
  handelchange = (e) => {
    this.state.errors[e.currentTarget.name] = null;
    let state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  };
  AddNumber(type) {
    if (this.rate.current.value < 5) {
      this.rate.current.value++;
      this.state.Rate += 1;
    }
  }
  RemoveNumber(type) {
    if (this.rate.current.value > 1) {
      this.rate.current.value--;
      this.state.Rate -= 1;
    }
  }
  handelAdd = async (e) => {
    e.preventDefault();
    const errors = this.Validations();
    if (errors !== null) return;
    var formData = new FormData();
    formData.append("rating", this.state.Rate);
    formData.append("comment", this.state.Comment);
    let url =
      "https://node-airbnb.herokuapp.com/api/review/" + this.state.Place_id;
    await this.props.AddReview(formData, url, localStorage.token);
    toast.success("🤩 Review added Successfully!", {
      position: "top-center",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      window.location.reload();
    }, 8500);
  };

  render() {
    return (
      <div className="container signinClass mt-0">
        <ToastContainer />
        <div className="row">
          <div className=" col-12 mx-auto">
            <div className="card card-signin mb-5">
              <div className="card-body">
                <h5 className="card-title text-center mt-0">Add New Review</h5>
                <form
                  onSubmit={this.handelAdd}
                  className="form-signin"
                  method="POST"
                >
                  <div className="form-label-group">
                    <input
                      name="Comment"
                      value={this.state.Comment}
                      onChange={this.handelchange}
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Comment"
                    />
                    {this.state.errors.Comment && (
                      <div className="alert alert-danger form-control">
                        {this.state.errors.Comment}
                      </div>
                    )}
                  </div>

                  <div className="form-label-group row pb-3">
                    <label className="ml-5 col-12">Rate:</label>
                    <div
                      className="plus btn "
                      onClick={() => this.AddNumber("bath")}
                    >
                      +
                    </div>
                    <input
                      name="Rate"
                      ref={this.rate}
                      id="Rate"
                      type="text"
                      className="number form-control"
                      value={this.state.Rate}
                      disabled
                    />
                    <div
                      className="minus btn"
                      onClick={() => this.RemoveNumber("bath")}
                    >
                      -
                    </div>
                  </div>
                  {this.state.errors.Rate && (
                    <div className="alert alert-danger form-control">
                      {this.state.errors.Rate}
                    </div>
                  )}

                  <button
                    className="mybtn btn-lg btn-block text-uppercase submit-button"
                    type="submit"
                  >
                    Add Review
                  </button>
                </form>
              </div>
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
      AddReview,
    },
    disptch
  );
};
const mapstatetoprops = (state) => {
  return {
    reviews: state.Reviews.addreview,
  };
};
export default connect(mapstatetoprops, mapactiontoprops)(ReviewAdding);
