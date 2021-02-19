import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Slider from "react-slick";

import {
  FaTv,
  FaWifi,
  FaUserAlt,
  FaBath,
  FaHome,
  FaStar,
} from "react-icons/fa";
import {
  GiFireplace,
  GiForkKnifeSpoon,
  GiMoneyStack,
  GiDoorHandle,
} from "react-icons/gi";
import { IoIosBed, IoIosSnow } from "react-icons/io";
import { GoGlobe } from "react-icons/go";
import { MdPets } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

import { getPlaceById } from "../../actions/places";
import { AllClients } from "../../actions/clients";
import { getPlaceReviews, AllReviews } from "../../actions/reviews";
import ReviewAdding from "../Forms/review";
import "./place-details.css";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "350px", // The same height of its parent in render
};

class GetPlaceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placedata: [],
      place_id: "",
      img: [],
      address: [],
      reviews: [],
      allreviews: [],
      users: [],
      username: [],
      userimg: [],
      owner: false,
      isAuth: false,
      rate: "New",
    };
  }
  async componentDidMount() {
    this.setState({ token: localStorage.getItem("token") });
    this.setState({ UserId: localStorage.getItem("user_id") });
    if (localStorage.getItem("token")) {
      this.setState({ isAuth: true });
    }
    await this.props.getPlaceById(this.props.match.params.id);
    await this.props.AllClients();
    await this.props.getPlaceReviews(this.props.match.params.id);
    this.setState({ reviews: this.props.reviews.reviews });
    await this.props.AllReviews();
    this.setState({ allreviews: this.props.allreviews.reviews });
    var place = this.props.placeDetails.place;
    await localStorage.setItem("place_id", this.props.match.params.id);
    this.setState({ address: place.address });
    this.setState({ img: place.images });
    this.setState({ placedata: place });
    if (localStorage.user_id === this.state.placedata.user_id) {
      await this.setState({ owner: true });
    }
    this.setState({ users: this.props.users.users });
    if (this.props.placeDetails.place.ratingsValue) {
      var rate = this.props.placeDetails.place.ratingsValue.toFixed(1);
      await this.setState({ rate });
    }
  }

  placeSlider = () => {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
    };
    if (this.state.img) {
      return (
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Slider {...settings}>
            {this.state.img.map((images) => {
              return (
                <div>
                  <img
                    className="slideshow-bg w-100"
                    src={`https://node-airbnb.herokuapp.com/${images}`}
                    alt=""
                  />
                </div>
              );
            })}
          </Slider>
          {/* <h1 className="Place-name">{this.state.placedata.name}</h1> */}
          <span className="place-rate">
            <FaStar /> {this.state.rate}
          </span>
        </div>
      );
    } else {
      return <h2 className="text-center my-5">No Places...</h2>;
    }
  };

  placeLocation() {
    if (this.state.placedata) {
      //   const place = this.state.placedata;
      return (
        <>
          <div className="row justify-content-center align-items-center py-5">
            <h2
              style={{
                fontSize: "2.5rem",
                fontFamily: "'Merienda', cursive",
                width: "fit-content",
                padding: "0.5em 1em",
                borderRadius: "var(--border-radius)",
                boxShadow: "var(--shadow)",
                marginBottom: 0,
              }}
            >
              {this.state.placedata.name}
            </h2>
            {this.state.owner && (
              <>
                <Link
                  to={`/place-edit/${this.props.match.params.id}`}
                  className="place-edit-icon"
                >
                  <FiEdit />
                </Link>
              </>
            )}
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6" style={{ position: "relative" }}>
                <div className="row justify-content-center mb-5 pb-5 mb-md-0 pb-md-0">
                  <div className="outer-circle first">
                    <div className="inner-circle">
                      <div className="circle-container">
                        <div className="text">
                          <p className="value">${this.state.placedata.price}</p>
                          <p className="type">
                            <GiMoneyStack />
                          </p>
                        </div>
                      </div>
                    </div>
                    <span className="circle-span"></span>
                    <span className="circle-span"></span>
                    <span className="circle-span"></span>
                    <span className="circle-span"></span>
                  </div>

                  <div className="outer-circle second mx-5">
                    <div className="inner-circle">
                      <div className="circle-container">
                        <div className="text">
                          <p className="value">
                            {this.state.address.city}
                            <br />
                            {this.state.address.country}
                          </p>
                          <p className="type">
                            <GoGlobe />
                          </p>
                        </div>
                      </div>
                    </div>
                    <span className="circle-span"></span>
                    <span className="circle-span"></span>
                    <span className="circle-span"></span>
                    <span className="circle-span"></span>
                  </div>

                  <div className="outer-circle third">
                    <div className="inner-circle">
                      <div className="circle-container">
                        <div className="text">
                          <p className="value">{this.state.placedata.type}</p>
                          <p className="type">
                            <FaHome />
                          </p>
                        </div>
                      </div>
                    </div>
                    <span className="circle-span"></span>
                    <span className="circle-span"></span>
                    <span className="circle-span"></span>
                    <span className="circle-span"></span>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6" style={{ height: "350px" }}>
                {/* Don't Delete */}
                <Map
                  google={this.props.google}
                  zoom={8}
                  style={mapStyles}
                  containerStyle={containerStyle}
                  initialCenter={{
                    lat: 47.49855629475769,
                    lng: -122.14184416996333,
                  }}
                  center={this.state.placedata.location}
                  onClick={this.mapClicked}
                >
                  <Marker
                    position={this.state.placedata.location}
                    onClick={() => console.log("You clicked me!")}
                  />
                </Map>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  placeFeature = () => {
    if (this.state.placedata) var place = this.state.placedata;
    return (
      <div className="container">
        <div className="row py-5">
          <div className="col-12 col-md-8">
            <div className="row">
              <div className="col">
                <h2 className="py-3">Description</h2>
                <p className="lead">{place.description}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h4 className="place-header">
                  <IoIosBed />
                  <br />
                  {place.total_beds > 1 ? "Beds" : "Bed"}
                  <span>{place.total_beds}</span>
                </h4>
                <h4 className="place-header">
                  <GiDoorHandle />
                  <br />
                  {place.total_rooms > 1 ? "Rooms" : "Room"}
                  <span>{place.total_rooms}</span>
                </h4>
                <h4 className="place-header">
                  <FaBath />
                  <br />
                  {place.total_bathrooms > 1 ? "Bathrooms" : "Bathroom"}
                  <span>{place.total_bathrooms}</span>
                </h4>
              </div>
              <div className="col">
                <h4 className="place-header">
                  <GiForkKnifeSpoon />
                  <br />
                  {place.total_kitchens > 1 ? "Kitchens" : "Kitchen"}
                  <span>{place.total_kitchens}</span>
                </h4>
                <h4 className="place-header">
                  <FaUserAlt />
                  <br />
                  Maximum Guests
                  <span>{place.max_guests}</span>
                </h4>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <h2 className="py-3">Features</h2>
            {this.state.placedata.has_tv && (
              <h4>
                <FaTv /> TV
              </h4>
            )}

            {this.state.placedata.has_wifi && (
              <h4>
                <FaWifi /> Wi-Fi
              </h4>
            )}

            {this.state.placedata.pets && (
              <h4>
                <MdPets /> Allow Pets
              </h4>
            )}

            {this.state.placedata.has_airconditioner && (
              <h4>
                <IoIosSnow /> Air Conditioner
              </h4>
            )}

            {this.state.placedata.has_heating_system && (
              <h4>
                <GiFireplace /> Heating System
              </h4>
            )}
          </div>
        </div>
      </div>
    );
  };
  Review() {
    if (this.state.reviews) {
      var allreviews = this.state.allreviews;
      var reviews = this.state.reviews;
      var allusers = this.state.users;
      var placeReviews = [];
      let username = [];
      let userimg = [];
      // eslint-disable-next-line
      reviews.map((r) => {
        // eslint-disable-next-line
        allreviews.map((r2) => {
          if (r2._id === r) {
            placeReviews.push(r2);
          }
        });
      });
      // eslint-disable-next-line
      placeReviews.map((r) => {
        // eslint-disable-next-line
        allusers.map((oneuser) => {
          if (r.user_id === oneuser._id) {
            username.push(oneuser.name);
            userimg.push(oneuser.profile_image);
          }
        });
      });

      if (placeReviews.length > 0) {
        return (
          // style={{height:"100% !important"}}
          <div className="review">
            <div className="container ">
              <h2 className="text-center py-4">User Reviews</h2>
              <div className="row users">
                {placeReviews.slice(0, 6).map((rev, index) => (
                  <div className="col-12 col-lg-6 ">
                    <div
                      className="row align-items-center"
                      style={{ position: "relative" }}
                    >
                      <div className="col-3">
                        {userimg[index] ? (
                          <div
                            className="rounded-circle ml-auto"
                            style={{
                              width: "85px",
                              height: "85px",
                              backgroundImage: `url('https://node-airbnb.herokuapp.com/${userimg[index]}')`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          ></div>
                        ) : (
                          <div
                            className="rounded-circle ml-auto"
                            style={{
                              width: "85px",
                              height: "85px",
                              backgroundImage: `url('/img/avatar.png')`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          ></div>
                        )}
                      </div>
                      <div className="col-9">
                        <p className="h4">{username[index]}</p>
                        <p className="text-muted mb-0">
                          {rev.createdAt.slice(0, 10)}
                        </p>
                      </div>
                      <span
                        style={{
                          fontSize: "1.3em",
                          position: "absolute",
                          top: "12%",
                          right: "10%",
                        }}
                      >
                        <FaStar style={{ marginBottom: "0.25em" }} />
                        &nbsp;{rev.rating}
                      </span>
                    </div>

                    <div className="row">
                      <div className="col">
                        <p
                          className="lead py-3"
                          style={{ marginLeft: "1.15em" }}
                        >
                          {rev.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }
  }
  Model() {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header border-0">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ReviewAdding
                history={this.props.history}
                id={this.props.match.params.id}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  btnModel() {
    return (
      <div className="fixed-btns">
        <button
          type="button"
          className="btn secondary-btn w-100 mb-2"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Add Review
        </button>
        <Link
          to={`/reservation/${this.props.match.params.id}`}
          type="button"
          className="btn secondary-btn w-100"
        >
          Make Reservation
        </Link>
      </div>
    );
  }
  render() {
    if (this.props.placeDetails) {
      document.title = this.props.placeDetails.place.name;
    }
    return (
      <section
        id="place-details"
        style={{ position: "relative", overflow: "hidden", width: "100%" }}
      >
        {this.placeSlider()}
        {this.placeLocation()}
        {this.placeFeature()}
        {this.state.isAuth && !this.state.owner && this.btnModel()}
        {this.Review()}
        {this.Model()}
      </section>
    );
  }
}

const mapactiontoprops = (disptch) => {
  return bindActionCreators(
    {
      AllClients,
      getPlaceById,
      getPlaceReviews,
      AllReviews,
    },
    disptch
  );
};
const mapstatetoprops = (state) => {
  return {
    users: state.Clients,
    placeDetails: state.Places.place_details,
    reviews: state.Reviews.place_reviews,
    allreviews: state.Reviews.allreviews,
  };
};

export default connect(
  mapstatetoprops,
  mapactiontoprops
)(
  GoogleApiWrapper({
    apiKey: "AIzaSyDED1xIAqSktQ5LAnZ5BCVIkwtKbJPT31U",
  })(GetPlaceDetails)
);
