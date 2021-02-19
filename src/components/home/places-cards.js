import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { getAllPlaces } from "../../actions/places";
import {
  getWishlistsByUserId,
  addWishlist,
  deleteWishlistById,
  deleteByID,
  getWishlistByID,
} from "../../actions/wishlists";
import {
  getAllReviews,
  getPlaceReviews,
  getReviewDetails,
  getPlaceRatings,
} from "../../actions/reviews";
import FeaturesIcons from "./features-icons";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      wishlists: [],
      userWishlists: [],
      isWishlisted: false,
      reviews: [],
      userId: "5",
      flag: true,
      avgArr: [],
      ratingResult: 0,
      token: "",
      UserWishlists: [],
      avrgs: [],
      isAuth: false,
    };
  }

  async componentDidMount() {
    await this.props.getAllPlaces();
    this.setState({ places: this.props.places.places });

    await this.props.getWishlistsByUserId(this.state.userId);
    await this.setState({ userWishlists: this.props.userWishlists });

    this.setState({ userId: localStorage.getItem("user_id") });
    if (localStorage.getItem("token")) {
      this.setState({ isAuth: true });
    }

    this.setState({ token: localStorage.getItem("token") });
    // let places = this.props.cards;

    await this.userWishlists();
  }

  userWishlists = async () => {
    await this.props.getWishlistsByUserId(this.state.token);
    // console.log("hereeeeeee:   ",this.props.userWishlists);
    // Error Here
    // if(this.props.userWishlists.wishlists && this.props.userWishlists.wishlists > 0){
    if (this.props.userWishlists.wishlists) {
      this.props.userWishlists.wishlists.map(async (wishlist_id) => {
        await this.props.getWishlistByID(this.state.token, wishlist_id);
        // console.log(".........." , this.props.wishlistDetails.wishlist);
        var wishlist_details = this.props.wishlistDetails;
        this.setState((state) => {
          const userWishlists = state.UserWishlists.push(
            wishlist_details.wishlist
          );
          return userWishlists;
        });
      });
      // console.log("llllllllll: " , this.state.UserWishlists);
    }
  };

  renderWishlists = (id) => {
    //for palceID
    var wishlist_id = "";

    var found = this.state.UserWishlists.find(
      // eslint-disable-next-line
      (wishlist) => {
        if (wishlist.place_id === id) {
          wishlist_id = wishlist._id;
          return true;
        }
      }
    );
    if (found) {
      return (
        <FaHeart
          className="wishlist-icon"
          title="Remove from wishlist"
          onClick={async () => {
            var wishlist_Obj = {
              user_id: this.state.userId,
              place_id: id,
            };
            await this.props.deleteWishlistById(this.state.token, wishlist_id);
            window.location.reload();
          }}
        />
      );
    }
    if (!found) {
      return (
        <FaRegHeart
          className="wishlist-icon"
          title="Add to wishlist"
          onClick={async () => {
            var wishlist_Obj = {
              place_id: id,
            };
            await this.props.addWishlist(this.state.token, wishlist_Obj);
            window.location.reload();
          }}
        />
      );
    }
  };

  render() {
    let places = this.props.cards;
    if (places && places.length > 0) {
      return places.slice(0, 6).map((place, index) => {
        return (
          <div className="col-9 col-sm-6 col-lg-4 mt-4" key={place._id}>
            <div className="card-item">
              <div
                className="card-item-highlight"
                style={{
                  // backgroundImage: `url(/images/places/place1-2.jpeg)`
                  backgroundImage: `url(https://node-airbnb.herokuapp.com/${place.images[0]})`,
                }}
              >
                <h3 className="card-item-name">
                  <Link
                    to={`/place-details/${place._id}`}
                    className="text-white"
                  >
                    {place.name}
                  </Link>
                  <br />
                  <FeaturesIcons place={place} />
                </h3>
                <h4 className="card-item-type">{place.type}</h4>
                {this.state.isAuth && this.renderWishlists(place._id)}
              </div>
              <div className="card-item-details">
                <h4>
                  {place.address.city}, {place.address.country}
                </h4>
                <p className="desc">{place.description}</p>
                <p className="price">${place.price}</p>
                <p className="rating">
                  <FaStar className="mr-1" />
                  {place.ratingsValue ? place.ratingsValue.toFixed(1) : "New"}
                </p>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <></>
      // <h2 className="text-center my-5">No Cards...</h2>
    );
  }
}

const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllPlaces,
      deleteWishlistById,
      getWishlistsByUserId,
      getAllReviews,
      addWishlist,
      deleteByID,
      getPlaceReviews,
      getReviewDetails,
      getWishlistByID,
      getPlaceRatings,
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    places: state.Places,
    wishlists: state.Wishlists,
    // userWishlists: state.Wishlists,
    reviews: state.Reviews.all_reviews,
    placeReviews: state.Reviews.place_reviews,
    reviewDetails: state.Reviews.review_details,
    userWishlists: state.Wishlists.wishlistsByUserId,
    addWishlist: state.Wishlists,
    wishlistDetails: state.Wishlists.wishlist_details,
    placeRatings: state.Reviews.place_ratings,
  };
};

export default connect(mapStateToProps, mapActionToProps)(Cards);
