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
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//     organization: '',
//     circle: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState(''); // Add success message state
//   const [errorMessage, setErrorMessage] = useState(''); // Add error message state

//   const validate = () => {
//     let tempErrors = {};

//     if (!formData.fullName) tempErrors.fullName = 'Full name is required';
//     if (!formData.email) tempErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is not valid';

//     if (!formData.password) tempErrors.password = 'Password is required';
//     else if (formData.password.length < 6) tempErrors.password = 'Password must be at least 6 characters long';

//     if (!formData.confirmPassword) tempErrors.confirmPassword = 'Please confirm your password';
//     else if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';

//     if (!formData.phoneNumber) tempErrors.phoneNumber = 'Phone number is required';
//     else if (!/^\d{10}$/.test(formData.phoneNumber)) tempErrors.phoneNumber = 'Phone number must be 10 digits';

//     if (!formData.organization) tempErrors.organization = 'Organization is required';

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
//           fullName: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//           phoneNumber: '',
//           organization: '',
//           circle: '',
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
//             <TextField
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               label="Full Name"
//               name="fullName"
//               autoComplete="name"
//               autoFocus
//               value={formData.fullName}
//               onChange={handleChange}
//               error={!!errors.fullName}
//               helperText={errors.fullName}
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

//             <FormControl variant="outlined" fullWidth margin="normal" className="inputField">
//               <InputLabel>Circle</InputLabel>
//               <Select
//                 label="Circle"
//                 name="circle"
//                 value={formData.circle}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="circle1">Circle 1</MenuItem>
//                 <MenuItem value="circle2">Circle 2</MenuItem>
//                 <MenuItem value="circle3">Circle 3</MenuItem>
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
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    organization: '',
    circle: '',
    employeeId: '',  // Added Employee ID
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); // Add success message state
  const [errorMessage, setErrorMessage] = useState(''); // Add error message state

  const validate = () => {
    let tempErrors = {};

    if (!formData.fullName) tempErrors.fullName = 'Full name is required';
    if (!formData.email) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is not valid';

    if (!formData.password) tempErrors.password = 'Password is required';
    else if (formData.password.length < 6) tempErrors.password = 'Password must be at least 6 characters long';

    if (!formData.confirmPassword) tempErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';

    if (!formData.phoneNumber) tempErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phoneNumber)) tempErrors.phoneNumber = 'Phone number must be 10 digits';

    if (!formData.organization) tempErrors.organization = 'Organization is required';

    if (!formData.employeeId) tempErrors.employeeId = 'Employee ID is required';  // Employee ID validation

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
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNumber: '',
          organization: '',
          circle: '',
          employeeId: '',  // Reset Employee ID
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
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Full Name"
              name="fullName"
              autoComplete="name"
              autoFocus
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
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
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
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
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
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
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  error={!!errors.organization}
                  helperText={errors.organization}
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
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              error={!!errors.employeeId}
              helperText={errors.employeeId}
            />

            <FormControl variant="outlined" fullWidth margin="normal" className="inputField">
              <InputLabel>Circle</InputLabel>
              <Select
                label="Circle"
                name="circle"
                value={formData.circle}
                onChange={handleChange}
              >
                <MenuItem value="circle1">Circle 1</MenuItem>
                <MenuItem value="circle2">Circle 2</MenuItem>
                <MenuItem value="circle3">Circle 3</MenuItem>
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
