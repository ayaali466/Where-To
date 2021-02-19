import React, { Component } from "react";
// import React, { Component, createRef }  from 'react';
import ReactDOM from "react-dom";
import "./form.css";
import { MdDelete } from "react-icons/md";
import Joi from "joi-browser";
import axios from "axios";
import { addplace } from "../../actions/places";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ToastContainer, toast } from "react-toastify";

var params = {
  access_key: "6895d17a0165c9fa200e743be896862d",
  query: "1600 Pennsylvania Ave NW",
};

class Host extends Component {
  constructor(props) {
    super(props);
    this.addActiveClass = this.addActiveClass.bind(this);
    this.roomNum = React.createRef();
    this.bathNum = React.createRef();
    this.bedNum = React.createRef();
    this.kitNum = React.createRef();
    this.maxGuests = React.createRef();
    this.rooms = 0;
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  state = {
    isLogin: true,
    token: "",
    name: "",
    description: "",
    type: "",
    price: "",
    city: "",
    country: "",
    zipcode: "",
    room: 0,
    bathroom: 0,
    bedroom: 0,
    kitchen: 0,
    guests: 0,
    tv: false,
    aircon: false,
    wifi: false,
    heat: false,
    pets: false,
    photo: {},
    files: [],
    filesArr: [],
    errors: {},
    coordinates: "",
  };

  async componentDidMount() {
    this.setState({ token: localStorage.getItem("token") });
    if (!localStorage.getItem("token")) {
      alert("please login frist!");
      this.props.history.push("/login");
    }
  }

  //renderfile
  Maping = () => {
    var fileMap = this.state.filesArr.map((file, index) => {
      let suffix = "bytes";
      let size = file.size;
      if (size >= 1024 && size < 1024000) {
        suffix = "KB";
        size = Math.round((size / 1024) * 100) / 100;
      } else if (size >= 1024000) {
        suffix = "MB";
        size = Math.round((size / 1024000) * 100) / 100;
      }
      return (
        <li key="{index}">
          {file.name}{" "}
          <span className="file-size">
            {size} {suffix}
          </span>
          <MdDelete
            className="delimg"
            onClick={() => this.deleteImg({ index })}
          />
        </li>
      );
    });
    return fileMap;
  };

  photomap = () => {
    var fileMap = this.state.filesArr.map((file, index) => {
      return file.name;
    });
    return fileMap;
  };

  RenderFileList() {
    let map = this.Maping();
    ReactDOM.render(map, document.getElementById("selectedfiles"));
  }
  onFileChange = async (event) => {
    let newfiles = document.getElementById("files").files;
    let newfilesArr = Array.from(newfiles);
    this.state.photo = document.getElementById("files").files;
    await this.setState({ files: newfiles, filesArr: newfilesArr });
    this.RenderFileList();
  };

  //delete photo
  deleteImg(index) {
    let key = index;
    let curArr = this.state.filesArr;
    let newfiles = new DataTransfer();
    for (var i = 0; i < document.getElementById("files").files.length; i++) {
      if (i !== key.index) {
        var file = document.getElementById("files").files[i];
        newfiles.items.add(file);
      }
    }
    curArr.splice(key, 1);
    this.setState({ filesArr: curArr });
    this.state.photo = newfiles.files;
    this.RenderFileList();
  }

  //checkbox change
  handleInputChange = async (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const targetname = target.name;
    let state = { ...this.state };
    state[targetname] = value;
    await this.setState(state);
  };
  handelchange = (e) => {
    this.state.errors[e.currentTarget.name] = null;
    let state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  };

  addActiveClass(i) {
    var x = document.getElementById(i);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  AddNumber(type) {
    if (type === "room") {
      this.roomNum.current.value++;
      this.state.room += 1;
    } else if (type === "bath") {
      this.bathNum.current.value++;
      this.state.bathroom += 1;
    } else if (type === "bed") {
      this.bedNum.current.value++;
      this.state.bedroom += 1;
    } else if (type === "kit") {
      this.kitNum.current.value++;
      this.state.kitchen += 1;
    } else if (type === "guest") {
      this.maxGuests.current.value++;
      this.state.guests += 1;
    }
  }

  RemoveNumber(type) {
    if (type == "room" && this.roomNum.current.value > 1) {
      this.roomNum.current.value--;
      this.state.room -= 1;
    } else if (type == "bath" && this.bathNum.current.value > 1) {
      this.bathNum.current.value--;
      this.state.bathroom -= 1;
    } else if (type == "bed" && this.bedNum.current.value > 1) {
      this.bedNum.current.value--;
      this.state.bedroom -= 1;
    } else if (type == "kit" && this.kitNum.current.value > 0) {
      this.kitNum.current.value--;
      this.state.kitchen -= 1;
    } else if (type == "guest" && this.maxGuests.current.value > 1) {
      this.maxGuests.current.value--;
      this.state.guests -= 1;
    }
  }

  handleClick = async () => {
    var coordinates = {
      lat: "",
      lng: "",
    };
    params.query = this.state.country;
    await axios
      .get("http://api.positionstack.com/v1/forward", { params })
      .then(async (response) => {
        coordinates = {
          lat: response.data.data[0].latitude,
          lng: response.data.data[0].longitude,
        };
        await this.setState({ coordinates });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  schema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    price: Joi.number().required(),
    city: Joi.string().required(),
    zipcode: Joi.required(),
    country: Joi.string().required(),
    room: Joi.number().required().min(1),
    bathroom: Joi.number().required().min(1),
    bedroom: Joi.number().required().min(1),
    kitchen: Joi.number().required(),
    guests: Joi.number().required().min(1),
    tv: Joi.boolean().required(),
    aircon: Joi.boolean().required(),
    wifi: Joi.boolean().required(),
    heat: Joi.boolean().required(),
    pets: Joi.boolean().required(),
    photo: Joi.required(),
  };

  Validations = () => {
    const errors = {};
    let state = { ...this.state };
    delete state.errors;
    delete state.files;
    delete state.filesArr;
    delete state.token;
    delete state.isLogin;
    delete state.coordinates;
    var res = Joi.validate(state, this.schema);
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

  handelSubmit = async (e) => {
    e.preventDefault();
    const errors = this.Validations();
    if (errors !== null) return;
    await this.handleClick();
    console.log(this.state.coordinates);
    var ins = document.getElementById("files").files.length;
    var formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("type", this.state.type);
    formData.append("description", this.state.description);
    formData.append("total_rooms", this.state.room);
    formData.append("total_kitchens", this.state.kitchen);
    formData.append("total_bathrooms", this.state.bathroom);
    formData.append("total_beds", this.state.bedroom);
    formData.append("price", this.state.price);
    formData.append("address[country]", this.state.country);
    formData.append("address[city]", this.state.city);
    formData.append("address[zipcode]", this.state.zipcode);
    formData.append("location[lat]", this.state.coordinates.lat);
    formData.append("location[lng]", this.state.coordinates.lng);
    formData.append("pets", this.state.pets);
    formData.append("has_tv", this.state.tv);
    formData.append("has_wifi", this.state.wifi);
    formData.append("has_heating_system", this.state.heat);
    formData.append("has_airconditioner", this.state.aircon);
    formData.append("max_guests", this.state.guests);
    for (var x = 0; x < ins; x++) {
      formData.append("images[]", this.state.photo[x]);
    }
    let url = "https://node-airbnb.herokuapp.com/api/place";
    await this.props.addplace(formData, url, this.state.token);
    if (this.props.msg.message === "place created successfully!") {
      toast.success("👌 Place added Successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        this.props.history.push(`/place-details/${this.props.msg.place._id}`);
      }, 5500);
    }
  };
  render() {
    document.title = "Add Place";
    return (
      <div
        id="host_form"
        className="background"
        style={{ backgroundImage: "url(/bg.jpg)", height: "100%" }}
      >
        <div className="background py-5" style={{ height: "100%" }}>
          <ToastContainer />
          <form className="form-signin" action="" method="POST">
            <div className="container signinClass">
              <div className="row">
                <div className="col-sm-9 col-md-8 col-lg-8 mx-auto">
                  <div className="card card-signin my-5">
                    <div
                      className=" toggel "
                      onClick={() => this.addActiveClass("one")}
                    >
                      <h5 className="card-title text-center">
                        Place Information <i className="fad fa-angle-down"></i>
                      </h5>
                    </div>
                    <div className="card-body" id="one">
                      <div className="form-label-group">
                        <label className="ml-5">Place Name:</label>
                        <input
                          name="name"
                          onChange={this.handelchange}
                          type="text"
                          className="form-control"
                          placeholder="Enter the Place Name"
                        />
                        {this.state.errors.name && (
                          <div className="alert alert-danger form-control">
                            {this.state.errors.name}
                          </div>
                        )}
                      </div>
                      <div className="form-label-group">
                        <label className="ml-5">Description:</label>
                        <textarea
                          name="description"
                          onChange={this.handelchange}
                          className="form-control"
                          rows="3"
                        ></textarea>
                        {this.state.errors.description && (
                          <div className="alert alert-danger form-control">
                            {this.state.errors.description}
                          </div>
                        )}
                      </div>
                      <div className="form-label-group ">
                        <label className="ml-5 ">Place Type:</label>
                        <select
                          name="type"
                          onChange={this.handelchange}
                          className="form-control"
                          id="type"
                        >
                          <option defaultValue>Choose the place type...</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Cottage">Cottage</option>
                          <option value="Room">Room</option>
                          <option value="Villa">Villa</option>
                        </select>
                        {this.state.errors.type && (
                          <div className="alert alert-danger form-control">
                            {this.state.errors.type}
                          </div>
                        )}
                      </div>
                      <div className="form-label-group">
                        <label className="ml-5">Price per Night:</label>
                        <input
                          name="price"
                          onChange={this.handelchange}
                          type="text"
                          className="form-control"
                          placeholder="$ Enter price"
                          required
                        />
                        {this.state.errors.price && (
                          <div className="alert alert-danger form-control">
                            {this.state.errors.price}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container signinClass">
              <div className="row">
                <div className="col-sm-9 col-md-8 col-lg-8 mx-auto">
                  <div className="card card-signin ">
                    <div
                      className=" toggel "
                      onClick={() => this.addActiveClass("sec")}
                    >
                      <h5 className="card-title text-center">
                        Place Location <i className="fad fa-angle-down"></i>
                      </h5>
                    </div>
                    <div className="card-body" id="sec">
                      <div className="form-label-group">
                        <label className="ml-5">Country:</label>
                        <input
                          type="text"
                          onChange={this.handelchange}
                          name="country"
                          className="form-control"
                          rows="3"
                        />
                        {this.state.errors.country && (
                          <div className="alert alert-danger form-control">
                            {this.state.errors.city}
                          </div>
                        )}
                      </div>
                      <div className="form-label-group">
                        <label className="ml-5">City:</label>
                        <input
                          type="text"
                          onChange={this.handelchange}
                          name="city"
                          className="form-control"
                          rows="3"
                        />
                        {this.state.errors.city && (
                          <div className="alert alert-danger form-control">
                            {this.state.errors.city}
                          </div>
                        )}
                      </div>
                      <div className="form-label-group">
                        <label className="ml-5">Zipcode:</label>
                        <input
                          type="text"
                          onChange={this.handelchange}
                          name="zipcode"
                          className="form-control"
                          rows="3"
                        />
                        {this.state.errors.zipcode && (
                          <div className="alert alert-danger form-control">
                            {this.state.errors.city}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container signinClass">
              <div className="row">
                <div className="col-sm-9 col-md-8 col-lg-8 mx-auto">
                  <div className="card card-signin my-5">
                    <div
                      className=" toggel "
                      onClick={() => this.addActiveClass("rooms")}
                    >
                      <h5 className="card-title text-center">
                        Number of Rooms <i className="fad fa-angle-down"></i>
                      </h5>
                    </div>
                    <div className="card-body" id="rooms">
                      <div className="form-label-group">
                        <label className="ml-5">Number of Rooms:</label>
                        <div
                          className="plus btn"
                          onClick={() => this.AddNumber("room")}
                        >
                          +
                        </div>
                        <input
                          name="room"
                          ref={this.roomNum}
                          id="roomNum"
                          type="text"
                          className="number form-control"
                          value={this.state.room}
                          disabled
                        />
                        <div
                          className="minus btn"
                          onClick={() => this.RemoveNumber("room")}
                        >
                          -
                        </div>
                      </div>
                      {this.state.errors.room && (
                        <div className="alert alert-danger form-control">
                          {this.state.errors.room}
                        </div>
                      )}

                      <div className="form-label-group">
                        <label className="ml-5">Number of Bathrooms:</label>
                        <div
                          className="plus btn "
                          onClick={() => this.AddNumber("bath")}
                        >
                          +
                        </div>
                        <input
                          name="bathroom"
                          ref={this.bathNum}
                          id="bathNum"
                          type="text"
                          className="number form-control"
                          value={this.state.bathroom}
                          disabled
                        />
                        <div
                          className="minus btn"
                          onClick={() => this.RemoveNumber("bath")}
                        >
                          -
                        </div>
                      </div>
                      {this.state.errors.bathroom && (
                        <div className="alert alert-danger form-control">
                          {this.state.errors.bathroom}
                        </div>
                      )}

                      <div className="form-label-group">
                        <label className="ml-5">Number of Beds:</label>
                        <div
                          className="plus btn "
                          onClick={() => this.AddNumber("bed")}
                        >
                          +
                        </div>
                        <input
                          name="bedroom"
                          ref={this.bedNum}
                          id="bedNum"
                          type="text"
                          className="number form-control"
                          value={this.state.bedroom}
                          disabled
                        />
                        <div
                          className="minus btn"
                          onClick={() => this.RemoveNumber("bed")}
                        >
                          -
                        </div>
                      </div>
                      {this.state.errors.bedroom && (
                        <div className="alert alert-danger form-control">
                          {this.state.errors.bedroom}
                        </div>
                      )}

                      <div className="form-label-group">
                        <label className="ml-5">Number of Kitchens:</label>
                        <div
                          className="plus btn "
                          onClick={() => this.AddNumber("kit")}
                        >
                          +
                        </div>
                        <input
                          name="kitchen"
                          ref={this.kitNum}
                          id="kitNum"
                          type="text"
                          className="number form-control"
                          value={this.state.kitchen}
                          disabled
                        />
                        <div
                          className="minus btn"
                          onClick={() => this.RemoveNumber("kit")}
                        >
                          -
                        </div>
                      </div>
                      {this.state.errors.kitchen && (
                        <div className="alert alert-danger form-control">
                          {this.state.errors.kitchen}
                        </div>
                      )}

                      <div className="form-label-group">
                        <label className="ml-5">Number of Max Guests:</label>
                        <div
                          className="plus btn "
                          onClick={() => this.AddNumber("guest")}
                        >
                          +
                        </div>
                        <input
                          name="guests"
                          ref={this.maxGuests}
                          id="maxGuests"
                          type="text"
                          className="number form-control"
                          value={this.state.guests}
                          disabled
                        />
                        <div
                          className="minus btn"
                          onClick={() => this.RemoveNumber("guest")}
                        >
                          -
                        </div>
                      </div>
                      {this.state.errors.guests && (
                        <div className="alert alert-danger form-control">
                          {this.state.errors.guests}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container signinClass">
              <div className="row">
                <div className="col-sm-9 col-md-8 col-lg-8 mx-auto">
                  <div className="card card-signin ">
                    <div
                      className=" toggel "
                      onClick={() => this.addActiveClass("amenities")}
                    >
                      <h5 className="card-title text-center">
                        Amenities you Offer{" "}
                        <i className="fad fa-angle-down"></i>
                      </h5>
                    </div>
                    <div className="card-body" id="amenities">
                      <div className="form-label-group">
                        <input
                          className="checkboxs"
                          name="tv"
                          type="checkbox"
                          checked={this.state.tv}
                          onChange={this.handleInputChange}
                        />
                        <label className="ml-5">Tv</label>
                      </div>
                      <div className="form-label-group">
                        <input
                          className="checkboxs"
                          name="wifi"
                          type="checkbox"
                          checked={this.state.wifi}
                          onChange={this.handleInputChange}
                        />
                        <label className="ml-5">WI FI</label>
                      </div>
                      <div className="form-label-group">
                        <input
                          className="checkboxs"
                          name="aircon"
                          type="checkbox"
                          checked={this.state.aircon}
                          onChange={this.handleInputChange}
                        />
                        <label className="ml-5">Air Conditioner</label>
                      </div>
                      <div className="form-label-group">
                        <input
                          className="checkboxs"
                          name="heat"
                          type="checkbox"
                          checked={this.state.heat}
                          onChange={this.handleInputChange}
                        />
                        <label className="ml-5">Heat System</label>
                      </div>
                      <div className="form-label-group">
                        <input
                          className="checkboxs"
                          name="pets"
                          type="checkbox"
                          checked={this.state.pets}
                          onChange={this.handleInputChange}
                        />
                        <label className="ml-5">Allow Pets</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container signinClass mt-5">
              <div className="row">
                <div className="col-sm-9 col-md-8 col-lg-8 mx-auto">
                  <div className="card card-signin ">
                    <div
                      className=" toggel "
                      onClick={() => this.addActiveClass("photos")}
                    >
                      <h5 className="card-title text-center">
                        Add Photos <i className="fad fa-angle-down"></i>
                      </h5>
                    </div>
                    <div className="card-body" id="photos">
                      <div className="form-label-group">
                        <div id="lblfile">
                          <label htmlFor="files">
                            <input
                              name="photo"
                              type="file"
                              id="files"
                              multiple
                              onChange={this.onFileChange}
                            />
                            Upload Files
                          </label>
                          {this.state.errors.photo && (
                            <div className="alert alert-danger form-control">
                              {this.state.errors.photo}
                            </div>
                          )}
                        </div>
                        <div className="files">
                          <h2>Files Selected</h2>
                          <ul id="selectedfiles"></ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={this.handelSubmit}
              style={{ height: "50px" }}
              className="btn mybtn btn-lg btn-block text-uppercase submit-button mt-5 col-4 mb-5"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapactiontoprops = (disptch) => {
  return bindActionCreators(
    {
      addplace,
    },
    disptch
  );
};
const mapstatetoprops = (state) => {
  return {
    placeDetails: state.Places,
    msg: state.Places.message,
  };
};
export default connect(mapstatetoprops, mapactiontoprops)(Host);
