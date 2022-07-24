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
    HAS_BEEN_INTERVIEWED_REQUEST,
    HAS_BEEN_INTERVIEWED_SUCCESS,
    HAS_BEEN_INTERVIEWED_FAIL,
    RECEIVED_DONATION_REQUEST,
    RECEIVED_DONATION_SUCCESS,
    RECEIVED_DONATION_FAIL,
    ADD_TO_INVENTORY_REQUEST,
    ADD_TO_INVENTORY_SUCCESS,
    ADD_TO_INVENTORY_FAIL,
    GET_INVENTORY_REQUEST,
    GET_INVENTORY_SUCCESS,
    GET_INVENTORY_FAIL,
    GET_FEEDBACKS_REQUEST,
    GET_FEEDBACKS_SUCCESS,
    GET_FEEDBACKS_FAIL,
    GET_SPECFEEDBACK_REQUEST,
    GET_SPECFEEDBACK_SUCCESS,
    GET_SPECFEEDBACK_FAIL,
    DELETE_FEEDBACK_REQUEST,
    DELETE_FEEDBACK_SUCCESS,
    DELETE_FEEDBACK_FAIL,
    FEEDBACK_VIEWED_REQUEST,
    FEEDBACK_VIEWED_SUCCESS,
    FEEDBACK_VIEWED_FAIL,
} from '../constants/adminConstants'

export const adminLoginReducer = (state={}, action) => {
    switch(action.type) {
        case ADMIN_LOGIN_REQUEST:
            return {loading: true}
        case ADMIN_LOGIN_SUCCESS:
            return {loading: false, adminInfo: action.payload}
        case ADMIN_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        case ADMIN_LOGOUT:
            return {}
        default: 
            return state
    }
}   

export const addAdminReducer = (state = {}, action) => {
    switch(action.type) {
        case ADD_ADMIN_REQUEST:
            return {loading: true}
        case ADD_ADMIN_SUCCESS:
            return {loading: false, adminInfo: action.payload}
        case ADD_ADMIN_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

export const getAnimalRegistrationsReducer = (state = { animalRegistrations: [] }, action) => {
    switch(action.type) {
        case GET_ANIMAL_REGISTRATIONS_REQUEST:
            return { loading: true }
        case GET_ANIMAL_REGISTRATIONS_SUCCESS:
            return { loading: false, animalRegistrations: action.payload }
        case GET_ANIMAL_REGISTRATIONS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const registerAnimalReducer = (state = {}, action) => {
    switch(action.type) {
        case REGISTER_ANIMAL_REQUEST:
            return { loading: true }
        case REGISTER_ANIMAL_SUCCESS:
            return { loading: false, success: true }
        case REGISTER_ANIMAL_FAIL:
            return { loading: false, success: false, error: action.payload }

        default:
            return state
    }
}

export const adoptionApplicationsReducer = (state = { adoptionApplications: [] }, action) => {
    switch (action.type) {
        case GET_ADOPTIONS_REQUEST: 
            return { loading: true }
        case GET_ADOPTIONS_SUCCESS:
            return { loading: false, adoptionApplications: action.payload }
        case GET_ADOPTIONS_FAIL: 
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}

export const adoptionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ADOPTION_REQUEST:
            return { loading: true }
        case DELETE_ADOPTION_SUCCESS:
            return { loading: false, success: true }
        case DELETE_ADOPTION_FAIL:
            return { loading: false, error: action.payload, success: false }
        default:
            return state
    }
}

export const adoptionUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ADOPTION_APPLICATION_REQUEST:
            return { loading: true }
        case UPDATE_ADOPTION_APPLICATION_SUCCESS:
            return { loading: false, success: true }
        case UPDATE_ADOPTION_APPLICATION_FAIL:
            return { loading: false, error: action.payload, success: false }
        default:
            return state
    }
}

export const getSpecificAdoptionReducer = (state = {specificAdoption: []}, action) => {
    switch (action.type) {
        case GET_SPECIFIC_ADOPTION_REQUEST:
            return { loading: true }
        case GET_SPECIFIC_ADOPTION_SUCCESS:
            return { loading: false, specificAdoption: action.payload }
        case GET_SPECIFIC_ADOPTION_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const deleteAdminAccReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ADMIN_ACCOUNT_REQUEST:
            return { loading: true }
        case DELETE_ADMIN_ACCOUNT_SUCCESS:
            return { loading: false, success: true }
        case DELETE_ADMIN_ACCOUNT_FAIL:
            return { loading: false, success: false, error: action.payload }
        
        default:
            return state
    }
}

export const deleteUserAccReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_USER_ACCOUNT_REQUEST:
            return { loading: true }
        case DELETE_USER_ACCOUNT_SUCCESS:
            return { loading: false, success: true }
        case DELETE_USER_ACCOUNT_FAIL:
            return { loading: false, success: false, error: action.payload }
        
        default:
            return state
    }
}

export const strayAnimalReportsReducer = (state = { strayReportList: [] }, action) => {
    switch(action.type) {
        case GET_STRAY_REPORTS_REQUEST:
            return { loading: true }
        case GET_STRAY_REPORTS_SUCCESS:
            return { loading: false, strayReportList: action.payload }
        case GET_STRAY_REPORTS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const dismissReportReducer = (state = {}, action) => {
    switch(action.type) {
        case DISMISS_STRAY_REPORT_REQUEST:
            return { loading: true}
        case DISMISS_STRAY_REPORT_SUCCESS: 
            return { loading: false, success: true }
        case DISMISS_STRAY_REPORT_FAIL:
            return { loading: false, error: action.payload, success: false}

        default:
            return state
    }
}

export const getInterviewSchedReducer = (state = { interviewSched: [] }, action) => {
    switch(action.type) {
        case GET_INTERVIEW_SCHED_REQUEST:
            return { loading: true }
        case GET_INTERVIEW_SCHED_SUCCESS:
            return { loading: false, interviewSched: action.payload }
        case GET_INTERVIEW_SCHED_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const sendInterviewMessageReducer = (state = {}, action) => {
    switch(action.type) {
        case SEND_INTERVIEW_MESSAGE_REQUEST:
            return { loading: true }
        case SEND_INTERVIEW_MESSAGE_SUCCESS:
            return { loading: false, success: true }
        case SEND_INTERVIEW_MESSAGE_FAIL:
            return { loading: false, error: action.payload, success: false }

        default: 
            return state
    }
}

export const getDonationsReducer = (state = { donations: [] }, action) => {
    switch(action.type) {
        case GET_DONATIONS_REQUEST:
            return { loading: true }
        case GET_DONATIONS_SUCCESS:
            return { loading: false, donations: action.payload }
        case GET_DONATIONS_FAIL:
            return { loading: false, error: action.payload }

        default: 
            return state
    }
}

export const deleteDonationReducer = (state = {}, action) => {
    switch(action.type) {
        case DELETE_DONATION_REQUEST:
            return { loading: true }
        case DELETE_DONATION_SUCCESS:
            return { loading: false, success: true }
        case DELETE_DONATION_FAIL:
            return { loading: false, success: false, error: action.payload }

        default: 
            return state
    }
}

export const hasBeenInterviewedReducer = (state = {}, action) => {
    switch(action.type) {
        case HAS_BEEN_INTERVIEWED_REQUEST:
            return { loading: true }
        case HAS_BEEN_INTERVIEWED_SUCCESS:
            return { loading: false, success: true }
        case HAS_BEEN_INTERVIEWED_FAIL:
            return { loading: false, success: false, error: action.payload}

        default:
            return state
    }
}

export const receivedDonationReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVED_DONATION_REQUEST:
            return { loading: true }
        case RECEIVED_DONATION_SUCCESS:
            return { loading: false, success: true }
        case RECEIVED_DONATION_FAIL:
            return { loading: false, success: false, error: action.payload }

        default:
            return state
    }
}

export const addtoInventoryReducer = (state = {}, action) => {
    switch(action.type) {
        case ADD_TO_INVENTORY_REQUEST: 
            return { loading: true }
        case ADD_TO_INVENTORY_SUCCESS:
            return { loading: false, success: true }
        case ADD_TO_INVENTORY_FAIL:
            return { loading: false, success: false, error: action.payload }

        default:
            return state
    }
}

export const getInventoryReducer = (state = { inventoryList: [] }, action) => {
    switch(action.type) {
        case GET_INVENTORY_REQUEST: 
            return { loading: true }
        case GET_INVENTORY_SUCCESS:
            return { loading: false, inventoryList: action.payload }
        case GET_INVENTORY_FAIL:
            return { loading: false, error: action.payload }

        default: 
            return state
    }
}

export const getFeedbacksReducer = (state = { feedbackList: [] }, action) => {
    switch(action.type) {
        case GET_FEEDBACKS_REQUEST:
            return { loading: true }
        case GET_FEEDBACKS_SUCCESS:
            return { loading: false, feedbackList: action.payload }
        case GET_FEEDBACKS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const deleteFeedbackReducer = (state = {}, action) => {
    switch(action.type) {
        case DELETE_FEEDBACK_REQUEST:
            return { loading: true }
        case DELETE_FEEDBACK_SUCCESS:
            return { loading: false, success: true }
        case DELETE_FEEDBACK_FAIL: 
            return { loading: false, success: false, error: action.payload }

        default: 
            return state
    }    
}

export const feedbackViewedReducer = (state = {}, action) => {
    switch(action.type) {
        case FEEDBACK_VIEWED_REQUEST:
            return { loading: true }
        case FEEDBACK_VIEWED_SUCCESS: 
            return { loading: false, success: true }
        case FEEDBACK_VIEWED_FAIL:
            return { loading: false, success: false, error: action.payload }

        default:
            return state
    }
}

// export const getSpecFeedbackReducer = (state = {}, action) => {
//     switch(action.type) {
//         case GET_SPECFEEDBACK_REQUEST:
//             return { loading: true }
//         case GET_SPECFEEDBACK_SUCCESS:
//             return { loading: false, }
//     }
// }
