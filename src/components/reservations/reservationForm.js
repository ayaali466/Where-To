import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ToastContainer, toast } from "react-toastify";

import { addReservation } from "../../actions/reservations";
import CalendarComp from "../calendar";
import "./reservationForm.css";

class Reservastion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_Id: "",
      place_Id: "",
      user: {},
      start_date: "",
      end_date: "",
      total_nights: "",
      num_of_guests: "",
      token: "",
      isAuth: false,
      isOpen: false,
      isLogin: true,
      placeID: "",
    };
  }

  async componentDidMount() {
    await this.setState({
      token: localStorage.getItem("token"),
      placeID: this.props.match.params.id,
    });
  }

  handleClick = async () => {
    var reservation = {
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      total_nights: this.state.total_nights,
      num_of_guests: this.state.num_of_guests,
    };
    var flag = true;

    if (!reservation.start_date || !reservation.end_date) {
      flag = false;
      toast.error("🙂 Select Valid Dates", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!reservation.num_of_guests || reservation.num_of_guests <= 0) {
      flag = false;
      toast.error("🤨 Enter Valid Number of Guests", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (flag) {
      await this.props.addReservation(
        this.state.token,
        this.state.placeID,
        reservation
      );
      if (this.props.msg === "success") {
        toast.success("🤩 Reservation created Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          this.props.history.push(`/place-details/${this.state.placeID}`);
        }, 3500);
      }
    }
  };

  recieveDates = (startDate, endDate, validRange) => {
    let range = validRange.length;
    this.setState({
      start_date: startDate,
      end_date: endDate,
      total_nights: range,
    });
  };

  render() {
    document.title = "Reservation 📝";
    return (
      <section id="login">
        <div className="container py-5">
          <ToastContainer />
          <div
            id="login-row"
            className="row justify-content-center align-items-center py-5 mx-1 mx-md-0"
          >
            <div id="login-box" className="col-12 col-md-10 col-lg-8">
              <form id="login-form" className="form" action="" method="post">
                <h3 className="text-center reservation-header mb-3">
                  Reservation
                </h3>
                <div className="row justify-content-center">
                  <label htmlFor="calendar" className="label mb-0">
                    👇 Please Select the Range of your visit 👇
                  </label>
                </div>
                <div
                  id="calendar"
                  className="row justify-content-center calendar"
                >
                  <CalendarComp dates={this.recieveDates} props={this.props} />
                </div>

                <div className="row justify-content-center">
                  <div className="col-10 col-md-8 col-lg-4 text-center">
                    <div className="form-group">
                      <label htmlFor="guests" className="label">
                        Number of Guests
                      </label>
                      <input
                        type="number"
                        value={this.state.num_of_guests}
                        className="form-control"
                        id="guests"
                        onChange={(e) => {
                          this.setState({ num_of_guests: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="col-auto">
                    <div className="form-group">
                      <button
                        id="submit"
                        type="button"
                        className="btn secondary-btn"
                        onClick={() => {
                          this.handleClick();
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapactiontoprops = (disptch) => {
  return bindActionCreators(
    {
      addReservation,
    },
    disptch
  );
};
const mapstatetoprops = (state) => {
  return {
    reservations: state.Reservations,
    msg: state.Reservations.message,
  };
};

export default connect(mapstatetoprops, mapactiontoprops)(Reservastion);
