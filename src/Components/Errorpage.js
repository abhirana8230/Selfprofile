import React from "react";
import { NavLink } from "react-router-dom";

function Errorpage() {
  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <h1>404 Error!</h1>
          <h2>We are sorry, page not found!</h2>
          <p>
            The page you are looking for might have been removed or temporarily
            unavailable!
          </p>
          <NavLink to="/">Back to Homepage</NavLink>
        </div>
      </div>
    </>
  );
}

export default Errorpage;
