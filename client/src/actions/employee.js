import * as types from '../constants/employee';

import Api from '../utils/api';

const defaultErrorMessage = (error) => console.log(`Occured some errors, do something with that! ${error}`);

export const getJobApplications = (credentials) => dispatch => {
  dispatch(setLoadingJobApplications());

  return Api.post('api/JobApplication/GetEmployeeJobApplicationList', { userId: credentials.userId }, credentials.token)
    .then(data => dispatch(setJobApplications(data.offers)))
    .catch(defaultErrorMessage);
};

export const setLoadingJobApplications= () => (
  { type: types.SET_LOADING_JOB_APPLICATIONS }
);

export const setJobApplications = (offers) => (
  { type: types.SET_JOB_APPLICATIONS, payload: offers }
);

export const setJobApplication = (id) => (
  { type: types.SET_JOB_APPLICATION, payload: id }
);