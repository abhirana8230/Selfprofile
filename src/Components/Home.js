import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [username, setUsername] = useState();
  //in strating its false as initial value
  const [show, setShow] = useState(false);

  const callHomepage = async () => {
    const response = await axios.get("http://localhost:5000/getdata");
    setUsername(response.data.name);
    //when response dat obtained means login done then  true only
    setShow(true);
  };

  useEffect(() => {
    callHomepage();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="home">
            <div className="content">
              <h4 className="home-content">welcome</h4>
              <h1 className="home-content-name">{username}</h1>
              <h2 className="home-content">
                {show
                  ? "Happy to see you back!"
                  : "Hi, we are the MERN Developers!"}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
