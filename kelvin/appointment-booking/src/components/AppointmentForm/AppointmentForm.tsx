import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Appointtment.css";

interface FormData {
  name: string;
  address: string;
  email: string;
  phone: string;
}
const AppointmentForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/appointments", formData);
      setSubmitted(true);
      alert("Appointment booked successfully!");
      console.log(response);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    }
  };
  return (
    <div className="container">
      {" "}
      {submitted ? (
        <div className="card">
          {" "}
          <h2 className="text-slate-600">Appointment Booked</h2>{" "}
          <p>
            Thank you for booking an appointment. Please proceed to the payment
            page.
          </p>{" "}
          <Link to="/payment" className="button">
            Go to Payment
          </Link>{" "}
        </div>
      ) : (
        <>
          {" "}
          <h1 className="text-slate-600">Book an Appointment</h1>{" "}
          <form onSubmit={handleSubmit}>
            {" "}
            <input
              placeholder="Name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />{" "}
            <input
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />{" "}
            <input
              placeholder="Enter phone number"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />{" "}
            <input
              placeholder="Full address"
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />{" "}
            <button type="submit">Submit</button>{" "}
          </form>{" "}
        </>
      )}{" "}
    </div>
  );
};
export default AppointmentForm;
