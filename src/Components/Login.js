import React, { useContext, useState } from "react";
import "./Login.css";
import login_pic from "../Images/loginpic.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../App";
axios.defaults.withCredentials = true;

function Login() {
  const { state, dispatch } = useContext(userContext);

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const loginUser = async (e) => {
    try {
      e.preventDefault();

      const loginData = await axios.post("http://localhost:5000/login", user);
      if (loginData.data.message) {
        window.alert(loginData.data.message);
      } else {
        dispatch({ type: "USER", payload: true });
        window.alert("Login Successful!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <div className="container  mt-5 mb-5 offset-3">
          <div className="login">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12 mt-3">
                <div className="login-img">
                  <figure>
                    <img
                      src={login_pic}
                      className="figure-img img-fluid rounded"
                      alt="login pic"
                    />
                  </figure>
                  <NavLink to="/register"> Create Account</NavLink>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-12 mt-3">
                <h2 className="login-heading col-auto">Login</h2>
                <form>
                  <div className="form-group col-auto">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      value={user.email}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Your email"
                    />
                  </div>

                  <div className="form-group col-auto">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      value={user.password}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder="Your password"
                    />
                  </div>

                  <div className="col-auto mb-3">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      onClick={loginUser}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
