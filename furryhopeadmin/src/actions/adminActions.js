import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGOUT,
    ADD_ADMIN_REQUEST,
    ADD_ADMIN_SUCCESS,
    ADD_ADMIN_FAIL,
    GET_ANIMAL_REGISTRATIONS_REQUEST,
    GET_ANIMAL_REGISTRATIONS_SUCCESS,
    GET_ANIMAL_REGISTRATIONS_FAIL,
    REGISTER_ANIMAL_REQUEST,
    REGISTER_ANIMAL_SUCCESS,
    REGISTER_ANIMAL_FAIL,
    GET_ADOPTIONS_REQUEST,
    GET_ADOPTIONS_SUCCESS,
    GET_ADOPTIONS_FAIL,
    GET_SPECIFIC_ADOPTION_REQUEST,
    GET_SPECIFIC_ADOPTION_SUCCESS,
    GET_SPECIFIC_ADOPTION_FAIL,
    DELETE_ADOPTION_REQUEST,
    DELETE_ADOPTION_SUCCESS,
    DELETE_ADOPTION_FAIL,
    UPDATE_ADOPTION_APPLICATION_REQUEST,
    UPDATE_ADOPTION_APPLICATION_SUCCESS,
    UPDATE_ADOPTION_APPLICATION_FAIL,
    DELETE_ADMIN_ACCOUNT_REQUEST,
    DELETE_ADMIN_ACCOUNT_SUCCESS,
    DELETE_ADMIN_ACCOUNT_FAIL,
    DELETE_USER_ACCOUNT_REQUEST,
    DELETE_USER_ACCOUNT_SUCCESS,
    DELETE_USER_ACCOUNT_FAIL,
    GET_STRAY_REPORTS_REQUEST,
    GET_STRAY_REPORTS_SUCCESS,
    GET_STRAY_REPORTS_FAIL,
    DISMISS_STRAY_REPORT_REQUEST,
    DISMISS_STRAY_REPORT_SUCCESS,
    DISMISS_STRAY_REPORT_FAIL,
    GET_INTERVIEW_SCHED_REQUEST,
    GET_INTERVIEW_SCHED_SUCCESS,
    GET_INTERVIEW_SCHED_FAIL,
    SEND_INTERVIEW_MESSAGE_REQUEST,
    SEND_INTERVIEW_MESSAGE_SUCCESS,
    SEND_INTERVIEW_MESSAGE_FAIL,
    GET_DONATIONS_REQUEST,
    GET_DONATIONS_SUCCESS,
    GET_DONATIONS_FAIL,
    DELETE_DONATION_REQUEST,
    DELETE_DONATION_SUCCESS,
    DELETE_DONATION_FAIL,
    RECEIVED_DONATION_REQUEST,
    RECEIVED_DONATION_SUCCESS,
    RECEIVED_DONATION_FAIL,
    ADD_TO_INVENTORY_REQUEST,
    ADD_TO_INVENTORY_SUCCESS,
    ADD_TO_INVENTORY_FAIL,
    GET_INVENTORY_REQUEST,
    GET_INVENTORY_SUCCESS,
    GET_INVENTORY_FAIL,
} from '../constants/adminConstants'
import axios from 'axios'

// Action to login the admin
export const login = (email, password) => async (dispatch) => {
    try {
        // dispatch calls "USER_LOGIN_REQUEST" from adminReducers.js
        dispatch({ type: ADMIN_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        }

        // POST - Authenticating the user (the file is in the backend (controllers))
        const { data } = await axios.post("http://localhost:5000/api/admins/loginAdmin", // Route authenticating an admin
            {
                email,
                password,
            }, config);

        // If the API call is successfull, dispatch calls a reducer with a type of "USER_LOGIN_SUCCESS"
        dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

        // Stores the admin's login credential into the browser's local storage
        localStorage.setItem("adminInfo", JSON.stringify(data));
    } catch (error) {
        // If it fails, the dispatch with the type of "USER_LOGIN_FAIL is called"
        // And set the payload to error
        dispatch({
            type: ADMIN_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

// Action to logout the admin
export const logout = () => async (dispatch) => {
    localStorage.removeItem("adminInfo");
    dispatch({ type: ADMIN_LOGOUT });
}

// Action to add an admin
export const addAnAdmin = (fullName, email, contactNo, address, password, jobPosition, role, profilePicture) => async (dispatch) => {
    try {
        dispatch({ type: ADD_ADMIN_REQUEST });

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        // Adding an admin account to the database
        const { data } = await axios.post("http://localhost:5000/api/admins", // Route for adding an admin account
            {
                fullName,
                email,
                contactNo,
                address,
                password,
                jobPosition,
                role,
                profilePicture,
            }, config);

        dispatch({ type: ADD_ADMIN_SUCCESS, payload: data });
        //localStorage.setItem("adminInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: ADD_ADMIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const getAnimalRegistrations = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_ANIMAL_REGISTRATIONS_REQUEST
        })

        const { data } = await axios.get('http://localhost:5000/api/admins/getAllRegistrations')

        dispatch({
            type: GET_ANIMAL_REGISTRATIONS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
        dispatch({
            type: GET_ANIMAL_REGISTRATIONS_FAIL,
            payload: message
        })
    }
}

export const registerAnimal = (id) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_ANIMAL_REQUEST,
        })

        const { data } = await axios.put(`http://localhost:5000/api/admins/registerAnimal/${id}`)

        dispatch({
            type: REGISTER_ANIMAL_SUCCESS,
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
        dispatch({
            type: REGISTER_ANIMAL_FAIL,
            payload: message
        })
    }
} 

export const getAdoptionApplications = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_ADOPTIONS_REQUEST
        })

        const { data } = await axios.get('http://localhost:5000/api/admins/adoptions')

        dispatch({
            type: GET_ADOPTIONS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
        dispatch({
            type: GET_ADOPTIONS_FAIL,
            payload: message
        })        
    }
}

export const getSpecificAdoption = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SPECIFIC_ADOPTION_REQUEST
        })

        const { data } = await axios.get(`http://localhost:5000/api/admins/adoptions/${id}`)

        dispatch({
            type: GET_SPECIFIC_ADOPTION_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        
        dispatch({
            type: GET_SPECIFIC_ADOPTION_FAIL,
            payload: message,
        })
    }
}

export const deleteAdoptionApplication = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_ADOPTION_REQUEST
        })

        const { data } = await axios.delete(`http://localhost:5000/api/admins/adoptions/${id}`)

        dispatch({
            type: DELETE_ADOPTION_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: DELETE_ADOPTION_FAIL,
            payload: message
        })
    }
}

export const updateAdoptionApplication = (animalId, adoptionId, adoptionStatus, applicationStatus) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_ADOPTION_APPLICATION_REQUEST,
        })

        // Updating the adoption status
        const { data: updateAdoptionData } = await axios.put(`http://localhost:5000/api/admins/updateAdoptionStatus/${animalId}`, { adoptionStatus })

        // Updating the application status
        const { data } = await axios.put(`http://localhost:5000/api/admins/updateApplication/${adoptionId}`, { adoptionStatus, applicationStatus })

        dispatch({
            type: UPDATE_ADOPTION_APPLICATION_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: UPDATE_ADOPTION_APPLICATION_FAIL,
            payload: message
        })
    }
}

export const deleteAdminAccount = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_ADMIN_ACCOUNT_REQUEST,
        })

        const { data } = await axios.delete(`http://localhost:5000/api/admins/deleteAdmin/${id}`)

        dispatch({
            type: DELETE_ADMIN_ACCOUNT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: DELETE_ADMIN_ACCOUNT_FAIL,
            payload: message
        })
    }
}

export const deleteUserAccount = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_USER_ACCOUNT_REQUEST,
        })

        const { data } = await axios.delete(`http://localhost:5000/api/admins/deleteUser/${id}`)

        dispatch({
            type: DELETE_USER_ACCOUNT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: DELETE_USER_ACCOUNT_FAIL,
            payload: message
        })
    }
}

export const getStrayAnimalReports = () => async (dispatch) => {
    const filterPending = (arr) => {
        return arr.status === 'Pending'
    }

    try {
        dispatch({
            type: GET_STRAY_REPORTS_REQUEST
        })

        const { data } = await axios.get('http://localhost:5000/api/admins/getReports')
       
        dispatch({
            type: GET_STRAY_REPORTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: GET_STRAY_REPORTS_FAIL,
            payload: message
        })
    }
}

export const dismissReport = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DISMISS_STRAY_REPORT_REQUEST
        })

        const status = 'Dismissed'
        const { data } = await axios.put(`http://localhost:5000/api/admins/dismissReport/${id}`, {status})

        dispatch({
            type: DISMISS_STRAY_REPORT_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: DISMISS_STRAY_REPORT_FAIL,
            payload: message
        })
    }
}

export const getInterviewSchedule = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_INTERVIEW_SCHED_REQUEST
        })

        const { data } = await axios.get(`http://localhost:5000/api/admins/getInterviewSched/${id}`)

        dispatch({
            type: GET_INTERVIEW_SCHED_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: GET_INTERVIEW_SCHED_FAIL,
            payload: message
        })
    }
} 

export const submitInterviewSchedule = (id, recipientEmail, message, date, time) => async (dispatch) => {
    try {
        dispatch({
            type: SEND_INTERVIEW_MESSAGE_REQUEST
        })

        const { data } = await axios.post(`http://localhost:5000/api/admins/createInterviewSched/${id}`, { recipientEmail, message, date, time })

        dispatch({
            type: SEND_INTERVIEW_MESSAGE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: SEND_INTERVIEW_MESSAGE_FAIL,
            payload: message
        })
    }
}

export const getDonations = () => async (dispatch) => {
    try {
        dispatch({
        type: GET_DONATIONS_REQUEST,
        })

        const { data } = await axios.get('http://localhost:5000/api/admins/getDonations') 

        dispatch({
            type: GET_DONATIONS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: GET_DONATIONS_FAIL,
            payload: message
        })
    }
}

export const deleteDonationHandler = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_DONATION_REQUEST
        })

        const { data } = await axios.delete(`http://localhost:5000/api/admins/deleteDonation/${id}`)

        dispatch({
            type: DELETE_DONATION_SUCCESS
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: DELETE_DONATION_FAIL,
            payload: message,
        })
    }
}

export const receivedDonation = (id) => async (dispatch) => {
    try {
        dispatch({
            type: RECEIVED_DONATION_REQUEST
        })

        const { data } = await axios.put(`http://localhost:5000/api/admins/updateReceivedDonation/${id}`)

        dispatch({
            type: RECEIVED_DONATION_SUCCESS
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            
        dispatch({
            type: RECEIVED_DONATION_FAIL,
            payload: message
        })
    }
}

export const addToInventory = (dataItems, donatedBy, dateOfDonation) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_TO_INVENTORY_REQUEST
        })

        const { data } = await axios.post('http://localhost:5000/api/admins/addToDonationInventory', { dataItems, donatedBy, dateOfDonation })

        dispatch({
            type: ADD_TO_INVENTORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: ADD_TO_INVENTORY_FAIL,
            payload: message
        })
    }
}

export const getDonationInventory = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_INVENTORY_REQUEST
        })

        const { data } = await axios.get('http://localhost:5000/api/admins/getDonationInventory')

        dispatch({
            type: GET_INVENTORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message

        dispatch({
            type: GET_INVENTORY_FAIL,
            payload: message
        })    
    }
}