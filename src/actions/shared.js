import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { getInitialData } from '../utils/api';
import { receivePolls } from './polls';
import { receiveUsers } from './users';
import { setAuthedUser } from './authUser';

const AUTHED_ID = 'sarah_edo';

export function handleInitialDate() {
  return dispatch => {
    // show loading bar
    dispatch(showLoading());
    return getInitialData().then(({ users, polls }) => {
      dispatch(receiveUsers(users));
      dispatch(receivePolls(polls));
      dispatch(setAuthedUser(AUTHED_ID));
      // hide loading bar
      dispatch(hideLoading());
    });
  };
}
