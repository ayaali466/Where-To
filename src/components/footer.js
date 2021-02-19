import { NavLink as Link } from "react-router-dom";
import { SiGithub, SiFacebook, SiTwitter, SiInstagram } from "react-icons/si";

const Footer = () => {
  return (
    <footer
      className="bg-dark py-3"
      style={{
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          className="row align-items-center"
          style={{
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <Link to="/about-us" className="nav-link">
              About Us
            </Link>
            {/* <Link to="/contact-us" className="nav-link">Contact Us</Link> */}
            <Link to="/team" className="nav-link">
              Our Team
            </Link>
          </div>
          <div>
            {/* <Link to="/terms" className="nav-link">Terms and Conditions</Link> */}
            <p className="nav-link mb-0">
              All Rights Reserved &copy; {new Date().getFullYear()}
            </p>
          </div>
          <div>
            <a
              href="https://github.com/SondosSamii/airbnb"
              className="nav-link h5 m-0"
              target="_blank"
              rel="noreferrer"
            >
              Powered By&nbsp;
              <SiGithub />
            </a>
            <p className="nav-link text-center m-0">
              <a
                href="https://github.com/SondosSamii/airbnb"
                className="text-white h5"
                target="_blank"
                rel="noreferrer"
              >
                <SiFacebook />
              </a>
              <a
                href="https://github.com/SondosSamii/airbnb"
                className="text-white h5 mx-3"
                target="_blank"
                rel="noreferrer"
              >
                <SiTwitter />
              </a>
              <a
                href="https://github.com/SondosSamii/airbnb"
                className="text-white h5"
                target="_blank"
                rel="noreferrer"
              >
                <SiInstagram />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
