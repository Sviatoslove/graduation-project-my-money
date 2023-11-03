import React, { useState } from "react";
import { selectUser } from "../store/usersSlice";
import { useSelector } from "react-redux";
import UserAvatar from "../components/common/UserAvatar";
import displayDate from "../utils/displayDate";
import UserPageEdit from "./UserPageEdit";

const UserPage = () => {
  const [show, setShow] = useState("");
  const user = useSelector(selectUser());

  const handleToEdit = ({target}) => {
    show ? setShow("") : setShow("show");
  };

  return (
    <div
      className="mx-auto"
      style={{
        width: "95%",
      }}
    >
      <div
        className="card p-2 border-0 shadow-lg mx-auto"
        style={{
          marginTop: "20px",
          maxHeight: "450px",
          height: "450px",
          zIndex: 1,
        }}
      >
        <div className="card-body d-flex">
          <div
            className="card-avatar position-relative"
            style={{ width: "fit-content" }}
          >
            <UserAvatar image={user.avatar} height="300" />
            <h4 className="text-center mt-5">{user.name}</h4>
          </div>
          <div className="text-center flex-grow-1">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Вы зарегистрировались {displayDate(user.createdAt)}
              </li>
              <li className="list-group-item">Счета:</li>
              <li className="list-group-item">Категории: </li>
              <li className="list-group-item">Всего операций: </li>
              <li className="list-group-item">Email: {user.email}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={"mx-auto rounded-3 border-0 user-edit " + show}>
        <button
          className="position-absolute top-0 end-0 btn btn-light btn-sm"
          onClick={handleToEdit}
          style={{ zIndex: 1 }}
        >
          <i
            className={show ? "bi bi-x-circle" : "bi bi-gear"}
            style={{ fontSize: "32px" }}
          ></i>
        </button>
        <UserPageEdit user={user} onShow={setShow} />
      </div>
    </div>
  );
};

export default UserPage;
