import React, { useEffect, useState } from "react";
import "./Contact.css";
import callsymbol from "../Images/callsymbol.jpg";
import emailsymbol from "../Images/emailsymbol.jpg";
import address_symbol from "../Images/address_symbol.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  const [contactData, setcontactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const callContactPage = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getdata");
      setcontactData({
        ...contactData,
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
      });
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
    callContactPage();
  }, []);

  const handleChange = async ({ target: { name, value } }) => {
    setcontactData({ ...contactData, [name]: value });
  };
  //send  contactData to backEND
  const sendData = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = contactData;
    try {
      const data = await axios.post(
        "http://localhost:5000/contact",
        contactData
      );
      if (!data) {
        window.alert("Message not sent!");
      } else {
        window.alert("Message sent successfully!");
        setcontactData({ ...contactData, message: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 col-12 offset-lg-1  d-flex justify-content-between">
              {/* phone number */}
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img src={callsymbol} alt="call symbol" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Phone</div>
                  <div className="contact_info_text">+919771801815</div>
                </div>
              </div>
              {/* email */}
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img src={emailsymbol} alt="email symbol" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Email</div>
                  <div className="contact_info_text">
                    abhirana8230@gmail.com
                  </div>
                </div>
              </div>
              {/* address */}
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img src={address_symbol} alt="address symbol" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Address</div>
                  <div className="contact_info_text">Surathkal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact us form */}
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-12 offset-lg-1">
            <div className="contact_form_container py-5">
              <div className="contact_form_title">Get In Touch</div>
              <form>
                <div class="contact_form_name d-flex justify-content-between ml-3 mr-3">
                  <div>
                    <input
                      type="text"
                      id="contact_form_name"
                      className="input-group "
                      name="name"
                      value={contactData.name}
                      onChange={handleChange}
                      placeholder="your name"
                      required="true"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      id="contact_form_email"
                      className="input-group"
                      name="email"
                      value={contactData.email}
                      onChange={handleChange}
                      placeholder="your email"
                      required="true"
                    />
                  </div>

                  <div>
                    <input
                      type="number"
                      id="contact_form_phone"
                      className="input-group "
                      name="phone"
                      value={contactData.phone}
                      onChange={handleChange}
                      placeholder="your phone number"
                      required="true"
                    />
                  </div>
                </div>

                <div className="contact_form_text mt-5 ml-3 mr-3">
                  <textarea
                    className="input-group "
                    name="message"
                    value={contactData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    cols="100"
                    rows="10"
                  ></textarea>
                </div>

                <div className="contact_form_button mt-4  ">
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={sendData}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
