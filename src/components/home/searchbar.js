import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import { AiFillHeart, AiOutlineSearch } from "react-icons/ai";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: {},
      searchedWord: "",
    };
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: 0,
          right: 0,
        }}
      >
        <div className="row justify-content-center">
          <div className="col-11 col-sm-10 col-md-8 col-lg-5">
            <h1 className="text-center">Let's Explore</h1>
            <p className="text-center">
              Search for your favourite country&nbsp;
              <AiFillHeart />
            </p>
            <div className="form-group d-flex">
              <input
                type="search"
                name="search"
                className="form-control"
                placeholder="Search..."
                onChange={async (e) => {
                  await this.setState({ searchedWord: e.target.value });
                }}
              />
              <Link
                to={{
                  pathname: `/search/?keyword=${this.state.searchedWord}`,
                  lat: this.state.currentPosition.lat,
                  lang: this.state.currentPosition.long,
                }}
                className="btn main-btn ml-2 px-2"
              >
                <AiOutlineSearch className="mb-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
