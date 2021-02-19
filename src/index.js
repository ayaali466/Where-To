import { render } from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.slim";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App";

render(<App />, document.getElementById("root"));
