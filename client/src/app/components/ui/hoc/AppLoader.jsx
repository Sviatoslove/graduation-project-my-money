import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUser,
  selectIsLoggedIn,
  selectUser,
  selectUserLoadingStatus,
} from "../../../store/usersSlice";
import localStorageService from "../../../services/localStorage.service";
import LoadingSpinners from "../../common/LoadingSpinners";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn());
  const usersLoadingStatus = useSelector(selectUserLoadingStatus());
  const user = useSelector(selectUser())
  const masterCount = user?.masterCount

  if(masterCount) localStorageService.setMasterCount(masterCount)

  useEffect(() => {
    if (isLoggedIn) dispatch(loadUser());
  }, []);

  if (usersLoadingStatus){
    return (
      <LoadingSpinners
        style={{ width: "96px", height: "96px" }}
        classesSpinner=""
        number={5}
      />
    );}
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;
