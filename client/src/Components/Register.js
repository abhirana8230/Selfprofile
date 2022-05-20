import React, { useState } from "react";
import "./Register.css";
import { NavLink, useNavigate } from "react-router-dom";
import signup_pic from "../Images/registerpic.jpg";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const registerData = async (e) => {
    e.preventDefault();
    try {
      const { name, email, phone, work, password, cpassword } = user;

      const userData = await axios.post("http://localhost:5000/register", user);
      console.log(userData);
      if (userData.status === 201) {
        window.alert(userData.data.message);
        navigate("/login");
      } else {
        window.alert(userData.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <div className="container mt-5  mr-5 offset-2 ">
          <div className="register">
            <div className="row">
              <div className="col-lg-6  col-md-6 col-12  mt-3 mb-3">
                <h2 className="register-heading col-auto ">Sign Up</h2>
                <form>
                  <div className="form-group col-auto ">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      autoComplete="off"
                      value={user.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </div>

                  <div className="form-group col-auto">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={user.email}
                      onChange={handleChange}
                      placeholder="Your email"
                    />
                  </div>

                  <div className="form-group col-auto">
                    <input
                      type="number"
                      className="form-control"
                      name="phone"
                      id="phone"
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleChange}
                      placeholder="Your phone"
                    />
                  </div>

                  <div className="form-group col-auto">
                    <input
                      type="text"
                      className="form-control"
                      name="work"
                      id="work"
                      autoComplete="off"
                      value={user.work}
                      onChange={handleChange}
                      placeholder="Your profession"
                    />
                  </div>

                  <div className="form-group col-auto">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      autoComplete="off"
                      value={user.password}
                      onChange={handleChange}
                      placeholder="Your password"
                    />
                  </div>

                  <div className="form-group col-auto">
                    <input
                      type="password"
                      className="form-control"
                      name="cpassword"
                      id="cpassword"
                      autoComplete="off"
                      value={user.cpassword}
                      onChange={handleChange}
                      placeholder="confirm your password"
                    />
                  </div>

                  <div className="col-auto">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      onClick={registerData}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>

              <div className="col-lg-6  col-md-6 col-12 ">
                <div className="signup-img col-auto">
                  <figure>
                    <img
                      src={signup_pic}
                      class="figure-img img-fluid rounded"
                      alt="signup pic"
                    />
                  </figure>
                  <NavLink to="/login"> I am already registerd</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
