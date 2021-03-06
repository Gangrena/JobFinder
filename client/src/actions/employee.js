import * as types from '../constants/employee';

import Api from '../utils/api';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const getJobApplications = (credentials) => dispatch => {
  dispatch(setLoadingJobApplications());

  return Api.get('api/JobApplication/GetEmployeeJobApplicationList', { userId: credentials.userId }, credentials.token)
    .then(data => dispatch(setJobApplications(data.applications)))
    .catch(defaultErrorMessage);
};

export const getRecommendedOffers = (applicationId, credentials) => (dispatch) => {
  return Api.get('api/JobApplication/GetRecommendedOfferList', { jobApplicationId: applicationId }, credentials.token)
    .then(data => dispatch(setRecommendedOffers(data.recommendedOffers)))
    .catch(defaultErrorMessage);
};

export const getJobApplicationDetails = (jobApplicationId, credentials) => (dispatch) => {
  return Api.get('api/JobApplication/GetEmployeeJobApplicationDetails', { jobApplicationId: jobApplicationId }, credentials.token)
    .then(data => dispatch(setJobApplicationDetails(data)))
    .catch(defaultErrorMessage);
};

export const setJobApplicationDetails = (jobApplicationDetails) => (
  { type: types.SET_JOB_APPLICATION_DETAILS, payload: jobApplicationDetails }
);


export const setRecommendedOffers = (offers) => (
  { type: types.SET_RECOMMENDED_OFFERS, payload: offers }
);

export const setLoadingJobApplications = () => (
  { type: types.SET_LOADING_JOB_APPLICATIONS }
);

export const setJobApplications = (applications) => (
  { type: types.SET_JOB_APPLICATIONS, payload: applications }
);

export const setJobApplication = (id) => (
  { type: types.SET_JOB_APPLICATION, payload: id }
);

export const removeJobApplication = (credentials, id) => dispatch => {
  Api.delete('api/JobApplication/DeleteJobApplication', { jobApplicationId: id }, credentials.token)
    .then(() => dispatch(_removeJobApplication(id)))
    .catch(defaultErrorMessage);
};

const _removeJobApplication = (id) => (
  { type: types.REMOVE_JOB_APPLICATION, payload: id }
);
