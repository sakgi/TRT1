import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert for notifications
import { useNavigate } from 'react-router-dom';
import './css/profile/profile.css'; // Ensure you have your CSS for styling

const Profile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: 'Sakshi',
        employeeId: 'Insta1234',
        email: '',
        phone: '',
        circle: '',
        organization: 'Insta ICT Solution',
    });

    const [hasChanges, setHasChanges] = useState(false); // Track if there are any changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setHasChanges(true); // Mark that changes have been made
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.email || !formData.phone) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please enter valid Email and Phone Number!',
            });
            return;
        }

        // Additional regex validation can be added here for email and phone if needed
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10}$/; // Assuming phone number should be 10 digits
        
        if (!emailPattern.test(formData.email)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please enter a valid Email Address!',
            });
            return;
        }

        if (!phonePattern.test(formData.phone)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please enter a valid Phone Number!',
            });
            return;
        }

        if (!hasChanges) {
            Swal.fire({
                icon: 'warning',
                title: 'No Changes Made',
                text: 'Please make changes first.',
            });
            return;
        }

        // If all validations pass
        Swal.fire({
            icon: 'success',
            title: 'Changes Saved Successfully',
            text: 'Your profile information has been updated.',
        });

        // Reset changes
        setHasChanges(false);
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Profile Information</h1>
            </div>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={formData.name} readOnly className="form-input" />
                </div>
                <div className="form-group">
                    <label>Employee ID</label>
                    <input type="text" value={formData.employeeId} readOnly className="form-input" />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="form-input" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="form-input" 
                        required 
                    />
                </div>
             <div className="form-group">
                  <label>Circle</label>
                  <select name="circle" onChange={handleChange} className="form-select1">
        <option value="">Select Circle</option>
        <option value="Pune">Pune</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Chennai">Chennai</option>
    </select>
</div>

                <div className="form-group">
                    <label>Organization</label>
                    <input type="text" value={formData.organization} readOnly className="form-input" />
                </div>
                <button type="submit" className="save-changes-btn">Save Changes</button>
            </form>
            <br/> 
            <p style={{ cursor: 'pointer', color: 'blue', textDecoration: 'none' }} 
   onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} 
   onMouseLeave={(e) => e.target.style.textDecoration = 'none'} 
   onClick={() => navigate('/change-password')}>
   Change Password
</p>

        </div>
    );
};

export default Profile;
