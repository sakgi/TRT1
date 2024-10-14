

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "client/src/firebase/firebaseconfig.js";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { FaEdit } from "react-icons/fa";
import "./Profile.css";

const PopupDialog = ({ message, onClose }) => {
  return (
    <div className="popup-dialog">
      <div className="popup-content">
        <h4>{message}</h4>
        <button className="close-popup-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

const ProfileForm = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formData, setFormData] = useState(null);
  const [isEditable, setIsEditable] = useState({
    email: false,
    phone: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFormData({
              firstName: userData.First_Name || "",
              lastName: userData.Last_Name || "",
              employeeId: userData.Employee_ID || "",
              email: userData.Email || "",
              phone: userData.Mobile_Number || "",
              circle: userData.Circle || "",
              organization: userData.Organization || "",
            });
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("No user is logged in");
        }
      });
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "phone") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
        setPhoneError("");
      } else {
        setPhoneError("Phone number must be numeric and up to 10 digits.");
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleChangePassword = () => {
    navigate("/user-dashboard/change-password");
  };

  const toggleEditField = (field) => {
    setIsEditable((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSaveChanges = () => {
    setPopupMessage("Changes saved successfully!");
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-form-container">
      <div className="profile-header">
        <h2 className="profile-name">
          {formData.firstName} {formData.lastName}
        </h2>
      </div>
      <form className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              placeholder="First Name"
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              disabled
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="employeeId">Employee ID</label>
          <input
            type="text"
            id="employeeId"
            value={formData.employeeId}
            placeholder="Employee ID"
            disabled
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditable.email}
                placeholder="Email Address"
              />
              <FaEdit
                className="edit-icon"
                onClick={() => toggleEditField("email")}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-wrapper">
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditable.phone}
                placeholder="Phone Number"
              />
              <FaEdit
                className="edit-icon"
                onClick={() => toggleEditField("phone")}
              />
            </div>
            {phoneError && <p className="error-message">{phoneError}</p>}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="circle">Circle</label>
          <input
            type="text"
            id="circle"
            value={formData.circle}
            onChange={handleInputChange}
            placeholder="Circle"
          />
        </div>
        <div className="form-group">
          <label htmlFor="organization">Organization</label>
          <input
            type="text"
            id="organization"
            value={formData.organization}
            onChange={handleInputChange}
            placeholder="Current Organization"
          />
        </div>

        <div className="button-container">
          <button
            type="button"
            className="save-changes-btn"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="change-password-btn"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
      </form>

      {showPopup && (
        <PopupDialog
          message={popupMessage}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default ProfileForm;