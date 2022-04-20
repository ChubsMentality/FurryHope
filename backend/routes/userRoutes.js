const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware')
const { isResetTokenValid } = require('../middlewares/userAuth')
const { 
    registerUser, 
    verifyUser,
    sendResetPassword,
    resetPassword,
    loginUser,
    getUserById, 
    updateUserProfile,
    updateProfilePicture,
    submitFeedback, 
    submitReport,
    getSpecificRegistrations,
    submitAnimalRegistration,
    submitAdoption,
    getAnimalRegistrationById,
    deleteAnimalRegistration,
    getSpecificAdoptions,
    updatePreference,
    submitDonation,
} = require('../controllers/userController');

// http://localhost:5000/api/users/

// route for registering the user (/api/users)
router.route('/').post(registerUser)

router.route('/verifyUser/:id').post(verifyUser)

// Route to send the reset password link to the user
router.route('/sendResetPassword').post(sendResetPassword)

// Route to change / reset the password
router.route('/resetPassword').post(isResetTokenValid, resetPassword)

router.route('/verify-token').get(isResetTokenValid, (req, res) => {
    res.json({ success: true })
})

// Route for logging the user into the application (/api/users/loginUser)
router.route('/loginUser').post(loginUser)

router.route('/getUserById/:id').get(getUserById)

router.route('/updateUserProfile/:id').put(updateUserProfile)

router.route('/updateProfilePicture/:id').put(updateProfilePicture)

router.route('/submitFeedback').post(submitFeedback)

router.route('/report').post(submitReport)

// Routes for adoptions
router.route('/submitAdoption').post(authenticate, submitAdoption)

router.route('/getSpecificAdoptions').get(authenticate, getSpecificAdoptions)

// Routes for registering and getting all registration submissions
router.route('/registerAnimal').post(authenticate, submitAnimalRegistration)

// Routes for the donation
router.route('/submitDonation').post(authenticate, submitDonation)

// getting a specific registration from a specific user's submission - using their token
router.route('/getSpecificRegistrations').get(authenticate, getSpecificRegistrations)


router.route('/animalRegistration/:id')
.put()
.get(getAnimalRegistrationById)
.delete(deleteAnimalRegistration)

router.route('/updatePreference/:id').put(updatePreference)

module.exports = router;
