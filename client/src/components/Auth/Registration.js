// import React, { useState } from 'react';
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Link,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Grid,
//   InputAdornment,
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import BusinessIcon from '@mui/icons-material/Business';
// import { FaUserCircle } from 'react-icons/fa';
// import axios from 'axios'; // Import axios
// import './Registration.css';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',   // Separated first name
//     lastName: '',    // Separated last name
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//     organization: '',
//     circle: '',
//     employeeId: '',  // Added Employee ID
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(''); // Add success message state
//   const [errorMessage, setErrorMessage] = useState(''); // Add error message state

//   const validate = () => {
//     let tempErrors = {};

//     if (!formData.firstName) tempErrors.firstName = 'First name is required';  // Validate first name
//     if (!formData.lastName) tempErrors.lastName = 'Last name is required';    // Validate last name
//     if (!formData.email) tempErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is not valid';

//     if (!formData.password) tempErrors.password = 'Password is required';
//     else if (formData.password.length < 6) tempErrors.password = 'Password must be at least 6 characters long';

//     if (!formData.confirmPassword) tempErrors.confirmPassword = 'Please confirm your password';
//     else if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';

//     if (!formData.phoneNumber) tempErrors.phoneNumber = 'Phone number is required';
//     else if (!/^\d{10}$/.test(formData.phoneNumber)) tempErrors.phoneNumber = 'Phone number must be 10 digits';

//     if (!formData.organization) tempErrors.organization = 'Organization is required';

//     if (!formData.employeeId) tempErrors.employeeId = 'Employee ID is required';  // Employee ID validation

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       try {
//         // Make API call to register the user
//         const response = await axios.post('http://localhost:1760/auth/register', {
//           ...formData,
//         });
//         setSuccessMessage(response.data.message); // Set success message
//         setErrorMessage(''); // Clear any previous error message
//         // Reset form fields
//         setFormData({
//           firstName: '',  // Reset first name
//           lastName: '',   // Reset last name
//           email: '',
//           password: '',
//           confirmPassword: '',
//           phoneNumber: '',
//           organization: '',
//           circle: '',
//           employeeId: '',  // Reset Employee ID
//         });
//       } catch (error) {
//         setErrorMessage(error.response.data.message || 'Something went wrong'); // Set error message
//         setSuccessMessage(''); // Clear any previous success message
//       }
//     }
//   };

//   return (
//     <div className="root">
//       <Container component="main" maxWidth="xs">
//         <div className="formContainer">
//           <div style={{ textAlign: 'center' }}>
//             <FaUserCircle size={50} color="#1976d2" />
//             <Typography component="h1" variant="h5" className="title">
//               Registration
//             </Typography>
//           </div>
//           {successMessage && <Typography color="green">{successMessage}</Typography>}
//           {errorMessage && <Typography color="red">{errorMessage}</Typography>}
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   label="First Name"
//                   name="firstName"
//                   autoComplete="given-name"
//                   autoFocus
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   error={!!errors.firstName}
//                   helperText={errors.firstName}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   label="Last Name"
//                   name="lastName"
//                   autoComplete="family-name"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   error={!!errors.lastName}
//                   helperText={errors.lastName}
//                 />
//               </Grid>
//             </Grid>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               value={formData.email}
//               onChange={handleChange}
//               error={!!errors.email}
//               helperText={errors.email}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   label="Phone Number"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   error={!!errors.phoneNumber}
//                   helperText={errors.phoneNumber}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PhoneIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                   label="Organization"
//                   name="organization"
//                   value={formData.organization}
//                   onChange={handleChange}
//                   error={!!errors.organization}
//                   helperText={errors.organization}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <BusinessIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//             </Grid>

//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Employee ID"
//               name="employeeId"
//               value={formData.employeeId}
//               onChange={handleChange}
//               error={!!errors.employeeId}
//               helperText={errors.employeeId}
//             />

//             <FormControl variant="outlined" fullWidth margin="normal" className="inputField">
//               <InputLabel>Circle</InputLabel>
//               <Select
//                 label="Circle"
//                 name="circle"
//                 value={formData.circle}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="MP">Madhya Pradesh</MenuItem>
//                 <MenuItem value="UPW">UP West</MenuItem>
//                 <MenuItem value="UPE">UP East</MenuItem>
//                 <MenuItem value="RJ">Rajasthan</MenuItem>
//                 <MenuItem value="GUJ">Gujrat</MenuItem>
//                 <MenuItem value="MH">Maharashtra</MenuItem>
//                 <MenuItem value="BH">Bihar</MenuItem>
//                 <MenuItem value="ROB">Rest of Bengal</MenuItem>
//                 <MenuItem value="PNB">Punjab</MenuItem>
//                 <MenuItem value="KTK">Karnataka</MenuItem>
//                 <MenuItem value="MUM">Mumbai</MenuItem>
//                 <MenuItem value="CH">Chennai</MenuItem>
//                 <MenuItem value="JH">Jharkand</MenuItem>
//                 <MenuItem value="KOC">Kolkata</MenuItem>
//                 <MenuItem value="HP">Himachal Pradesh</MenuItem>
//                 <MenuItem value="AP">Andhra Pradesh</MenuItem>
//                 <MenuItem value="ROTN">Rest if Tamil Nadu</MenuItem>
//                 <MenuItem value="KE">Kerala</MenuItem>
//               </Select>
//             </FormControl>

//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Password"
//               name="password"
//               type="password"
//               autoComplete="current-password"
//               value={formData.password}
//               onChange={handleChange}
//               error={!!errors.password}
//               helperText={errors.password}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockOutlinedIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Confirm Password"
//               name="confirmPassword"
//               type="password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               error={!!errors.confirmPassword}
//               helperText={errors.confirmPassword}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockOutlinedIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className="submitButton"
//               style={{ marginBottom: '15px' }}
//             >
//               Sign Up
//             </Button>
//             <Link href="/" variant="body2" className="link">
//               Already have an account? Sign In
//             </Link>
//           </form>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default RegistrationForm;


import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  InputAdornment,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios'; // Import axios
import './Registration.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    First_Name: '',        // Updated to match schema
    Last_Name: '',         // Updated to match schema
    Email: '',             // Updated to match schema
    password: '',
    confirmPassword: '',
    Mobile_Number: '',     // Updated to match schema
    Organization: '',      // Updated to match schema
    Circle: '',            // Updated to match schema
    Employee_ID: '',       // Updated to match schema
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); // Add success message state
  const [errorMessage, setErrorMessage] = useState(''); // Add error message state

  const validate = () => {
    let tempErrors = {};

    if (!formData.First_Name) tempErrors.First_Name = 'First name is required';  // Validate first name
    if (!formData.Last_Name) tempErrors.Last_Name = 'Last name is required';    // Validate last name
    if (!formData.Email) tempErrors.Email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.Email)) tempErrors.Email = 'Email is not valid';

    if (!formData.password) tempErrors.password = 'Password is required';
    else if (formData.password.length < 6) tempErrors.password = 'Password must be at least 6 characters long';

    if (!formData.confirmPassword) tempErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';

    if (!formData.Mobile_Number) tempErrors.Mobile_Number = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.Mobile_Number)) tempErrors.Mobile_Number = 'Phone number must be 10 digits';

    if (!formData.Organization) tempErrors.Organization = 'Organization is required';

    if (!formData.Employee_ID) tempErrors.Employee_ID = 'Employee ID is required';  // Employee ID validation

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Make API call to register the user
        const response = await axios.post('http://localhost:1760/auth/register', {
          ...formData,
        });
        setSuccessMessage(response.data.message); // Set success message
        setErrorMessage(''); // Clear any previous error message
        // Reset form fields
        setFormData({
          First_Name: '',      
          Last_Name: '',       
          Email: '',           
          password: '',
          confirmPassword: '',
          Mobile_Number: '',   
          Organization: '',   
          Circle: '',          
          Employee_ID: '',     
        });
      } catch (error) {
        setErrorMessage(error.response.data.message || 'Something went wrong'); // Set error message
        setSuccessMessage(''); // Clear any previous success message
      }
    }
  };

  return (
    <div className="root">
      <Container component="main" maxWidth="xs">
        <div className="formContainer">
          <div style={{ textAlign: 'center' }}>
            <FaUserCircle size={50} color="#1976d2" />
            <Typography component="h1" variant="h5" className="title">
              Registration
            </Typography>
          </div>
          {successMessage && <Typography color="green">{successMessage}</Typography>}
          {errorMessage && <Typography color="red">{errorMessage}</Typography>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="First Name"
                  name="First_Name"  // Updated to match schema
                  autoComplete="given-name"
                  autoFocus
                  value={formData.First_Name}  // Updated to match schema
                  onChange={handleChange}
                  error={!!errors.First_Name}  // Updated to match schema
                  helperText={errors.First_Name}  // Updated to match schema
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Last Name"
                  name="Last_Name"  // Updated to match schema
                  autoComplete="family-name"
                  value={formData.Last_Name}  // Updated to match schema
                  onChange={handleChange}
                  error={!!errors.Last_Name}  // Updated to match schema
                  helperText={errors.Last_Name}  // Updated to match schema
                />
              </Grid>
            </Grid>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              name="Email"  // Updated to match schema
              autoComplete="email"
              value={formData.Email}  // Updated to match schema
              onChange={handleChange}
              error={!!errors.Email}  // Updated to match schema
              helperText={errors.Email}  // Updated to match schema
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Phone Number"
                  name="Mobile_Number"  // Updated to match schema
                  value={formData.Mobile_Number}  // Updated to match schema
                  onChange={handleChange}
                  error={!!errors.Mobile_Number}  // Updated to match schema
                  helperText={errors.Mobile_Number}  // Updated to match schema
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Organization"
                  name="Organization"  // Updated to match schema
                  value={formData.Organization}  // Updated to match schema
                  onChange={handleChange}
                  error={!!errors.Organization}  // Updated to match schema
                  helperText={errors.Organization}  // Updated to match schema
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Employee ID"
              name="Employee_ID"  // Updated to match schema
              value={formData.Employee_ID}  // Updated to match schema
              onChange={handleChange}
              error={!!errors.Employee_ID}  // Updated to match schema
              helperText={errors.Employee_ID}  // Updated to match schema
            />

            <FormControl variant="outlined" fullWidth margin="normal" className="inputField">
              <InputLabel>Circle</InputLabel>
              <Select
                label="Circle"
                name="Circle"  // Updated to match schema
                value={formData.Circle}  // Updated to match schema
                onChange={handleChange}
              >
                <MenuItem value="MP">Madhya Pradesh</MenuItem>
                <MenuItem value="UPW">UP West</MenuItem>
                <MenuItem value="UPE">UP East</MenuItem>
                <MenuItem value="RJ">Rajasthan</MenuItem>
                <MenuItem value="GUJ">Gujrat</MenuItem>
                <MenuItem value="MH">Maharashtra</MenuItem>
                <MenuItem value="BH">Bihar</MenuItem>
                <MenuItem value="ROB">Rest of Bengal</MenuItem>
                <MenuItem value="PNB">Punjab</MenuItem>
                <MenuItem value="KTK">Karnataka</MenuItem>
                <MenuItem value="MUM">Mumbai</MenuItem>
                <MenuItem value="CH">Chennai</MenuItem>
                <MenuItem value="JH">Jharkand</MenuItem>
                <MenuItem value="KOC">Kolkata</MenuItem>
                <MenuItem value="HP">Himachal Pradesh</MenuItem>
                <MenuItem value="AP">Andhra Pradesh</MenuItem>
                <MenuItem value="ROTN">Rest of Tamil Nadu</MenuItem>
                <MenuItem value="KE">Kerala</MenuItem>
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submitButton"
              style={{ marginBottom: '15px' }}
            >
              Sign Up
            </Button>
            <Link href="/" variant="body2" className="link">
              Already have an account? Sign In
            </Link>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default RegistrationForm;
