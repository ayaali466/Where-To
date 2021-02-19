import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getSessionCookie, SessionContext } from "./session";

import Navbar from "./navbar";
import Home from "./home/home";
import Profile from "./profile/profile";
import Search from "./search/search";
import About from "./about/about";
import Host from "./Forms/host";
import Login from "./Forms/login";
import EditPlace from "./Forms/editPlace";
import OurTeam from "./Team/our-team";
import Reservastion from "./reservations/reservationForm";
import NotFound from "./not-found";
import Footer from "./footer";
import PlaceDetails from "./PlaceD/place-details";

const Routes = () => {
  const [session, setSession] = useState(getSessionCookie());
  useEffect(() => {
    const cookie = getSessionCookie();
    if (cookie.email !== session.email) {
      setSession(getSessionCookie());
    }
  }, [session]);
  return (
    <SessionContext.Provider value={session}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/search" component={Search}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/team" component={OurTeam}></Route>
          <Route path="/about-us" component={About}></Route>
          <Route path="/reservation/:id" component={Reservastion}></Route>
          <Route path="/host" component={Host}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/place-edit/:id" component={EditPlace}></Route>
          <Route path="/place-details/:id" component={PlaceDetails}></Route>
          <Route path="*" component={NotFound}></Route>
        </Switch>
        <Footer />
      </Router>
    </SessionContext.Provider>
  );
};
export default Routes;
