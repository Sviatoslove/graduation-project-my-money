import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, selectDataStatus, selectUser } from "../../store/usersSlice";
import UserAvatar from "../common/UserAvatar";

const NavProfile = () => {
  const dispatch = useDispatch();
  const dataStatus = useSelector(selectDataStatus());
  const [isOpen, setOpen] = useState(false);
  const currentUser = useSelector(selectUser());

  useEffect(() => {
    if (!dataStatus) dispatch(loadUser());
  }, []);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  if (!dataStatus) return "Loading...";
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center text-light ">
        <div className="me-2">{currentUser.name}</div>
        <UserAvatar image={currentUser.image} height="45" />
        <img src="" alt="" className="img-responsive rounded-circle" />
      </div>
      <div className={"shadow-lg border-none rounded-3 bg-secondary w-100 dropdown-menu p-0" + (isOpen ? " show" : "")}>
        <Link to='/user' className="dropdown-item rounded-3">
        <i className="bi bi-person-square" style={{ marginRight: "10px" }}></i>
          Профиль
        </Link>
        <Link to={`/logout`} className="dropdown-item rounded-3">
        <i className="bi bi-door-open-fill" style={{ marginRight: "10px" }}></i>
          Выйти
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
