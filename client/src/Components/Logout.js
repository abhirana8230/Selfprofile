import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../App";

function Logout() {
  const { state, dispatch } = useContext(userContext);

  const navigate = useNavigate();

  const logOutPage = async () => {
    try {
      const res = await axios.get("http://localhost:5000/logout");
      dispatch({ type: "USER", payload: false });
      navigate("/login", { replace: true });
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    logOutPage();
  }, []);

  return (
    <>
      <h1>Logout Page!</h1>
    </>
  );
}

export default Logout;
