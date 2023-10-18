import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUser,
  selectIsLoggedIn,
  selectUserLoadingStatus,
} from "../../../store/usersSlice";
import localStorageService from "../../../services/localStorage.service";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  // const userId = localStorageService.getUserId()
  // if(userId) {
  //   dispatch(authRequestedSucess({ userId: data.localId }))
  // }
  const isLoggedIn = useSelector(selectIsLoggedIn());
  const usersLoadingStatus = useSelector(selectUserLoadingStatus());
  useEffect(() => {
    if (isLoggedIn) dispatch(loadUser());
  }, []);

  if (usersLoadingStatus) return <h2>Loading...</h2>;
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;
