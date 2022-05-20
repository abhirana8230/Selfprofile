import React, { useEffect, useState } from "react";
import "./About.css";
import profilepic from "../Images/profilepic.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function About() {
  const navigate = useNavigate();
  const [userData, setuserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await axios.get("http://localhost:5000/about");
      setuserData(res.data);
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container mt-5 offset-2">
        <div className="about">
          <form>
            <div className="row">
              <div className="col-lg-4 col-12 mt-3 ">
                <div className="profile-img">
                  <img
                    src={profilepic}
                    className="img-fluid"
                    alt="profilepic"
                  />
                </div>
              </div>

              <div className="col-lg-8 col-12 mt-3  ">
                <div>
                  <h5>{userData.name}</h5>
                  <h6>{userData.work}</h6>
                  <p>
                    RANKINGS: <span>1/10</span>
                  </p>

                  <ul class="nav nav-tabs mt-5" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <a
                        class="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        About
                      </a>
                    </li>
                    <li class="nav-item" role="presentation">
                      <a
                        class="nav-link"
                        id="profile-tab"
                        data-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Timeline
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* <div className="col-md-2">
            <input
              type="submit"
              className="profile-edit-btn"
              name="btnAddmore"
              value="Edit Profile"
            />
          </div> */}
            </div>

            <div className="row">
              {/* left side url */}
              <div className="col-lg-4 col-12 col-auto ">
                <div className="profile-work">
                  <p className="profile-work-heading">WORK LINK</p>
                  <a href="https://www.guvi.com" target="_blank">
                    Guvi
                  </a>
                  <br />
                  <a href="https://www.nitk.ac.in" target="_blank">
                    Nitk
                  </a>
                  <br />
                  <a href="https://www.google.com" target="_blank">
                    Google
                  </a>
                  <br />
                  <a href="https://www.youtube.com" target="_blank">
                    Youtube
                  </a>
                  <br />
                  <a href="https://www.facebook.com" target="_blank">
                    Facebook
                  </a>
                  <br />
                </div>
              </div>

              {/* right side data toggle */}
              <div className="col-lg-8 col-12 pl-5 mb-2  col-auto">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6 col-auto">
                        <label>user ID</label>
                      </div>
                      <div className="col-md-6 col-auto">
                        <p>{userData._id}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-auto">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6 col-auto">
                        <p>{userData.name}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-auto ">
                        <label>Email ID</label>
                      </div>
                      <div className="col-md-6 col-auto">
                        <p>{userData.email}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-auto">
                        <label>Profession</label>
                      </div>
                      <div className="col-md-6 col-auto">
                        <p>{userData.work}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-auto">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6 col-auto">
                        <p>{userData.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="row">
                      <div className="col-md-6 col-auto">
                        <label>Experience</label>
                      </div>
                      <div className="col-md-6 col-auto">
                        <p>Beginner</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-auto">
                        <label>Hourly Rate</label>
                      </div>
                      <div className="col-md-6 col-auto">
                        <p>Rs100/hr</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-auto">
                        <label>Total Projects</label>
                      </div>
                      <div className="col-md-6 col-auto">
                        <p>4</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-auto">
                        <label>English Level</label>
                      </div>
                      <div className="col-md-6 col-auto">
                        <p>Expert</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-auto">
                        <label>Availability</label>
                      </div>
                      <div className="col-md-6 col-auto">
                        <p>Yes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default About;
