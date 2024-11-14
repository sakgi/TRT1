const {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} = require('../config/firebaseConfig');
const { db } = require('../config/adminSDK');
const { registrationSchema, loginSchema, forgotPasswordSchema } = require('../models/authModel');

// User registration function
const registerUser = async (req, res) => {
    const { First_Name, Last_Name, Email, password, Mobile_Number, Organization, Circle, Employee_ID, Other_Organization } = req.body;

    // Validate the input data
    const { error } = registrationSchema.validate({
        First_Name,
        Last_Name,
        Email,
        password,
        Mobile_Number,
        Organization,
        Circle,
        Employee_ID,
        // Other_Organization,
    });
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, Email, password);
        const user = userCredential.user;

        // Add user details to Firestore, including Employee_ID
        await db.collection('users').doc(user.uid).set({
            First_Name,     // Store First_Name
            Last_Name,      // Store Last_Name
            Email,
            Mobile_Number,
            Organization,
            Circle,
            Employee_ID,
            Other_Organization,
            password,
            role: 'User',
            createdAt: new Date(),
        });

        return res.status(201).send({ message: 'User registered successfully', uid: user.uid });
    } catch (error) {
        return res.status(500).send({ message: 'Something went wrong', error: error.message });
    }
};

// User login function
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const { error } = loginSchema.validate({ email, password });

    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Retrieve user details from Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            return res.status(200).send({
                message: "Logged in successfully",
                userData,
            });
        } else {
            return res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong", error: error.message });
    }
};

// Forgot password function
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const { error } = forgotPasswordSchema.validate({ email });

    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    try {
        await sendPasswordResetEmail(auth, email);
        return res.status(200).send({ message: "Reset link sent to your email successfully" });
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong", error: error.message });
    }
};

module.exports = { registerUser, loginUser, forgotPassword };