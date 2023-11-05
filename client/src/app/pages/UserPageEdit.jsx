import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AvatarsField, RadioField, TextField } from "../components/common/form";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAvatars,
  selectAvatars,
  selectAvatarsDataStatus,
} from "../store/avatarsSlice";
import { updateUser } from "../store/usersSlice";

const UserPageEdit = ({ user, onShow }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(user);
  const [errors, setErrors] = useState({});

  const avatarsDataStatus = useSelector(selectAvatarsDataStatus());
  const avatars = useSelector(selectAvatars());

  useEffect(() => {
    if (!avatarsDataStatus) {
      dispatch(loadAvatars());
    }
  }, []);

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const isValid = validate()
    // if (!isValid) return
    dispatch(updateUser(data));
    onShow("");
  };

  if (avatarsDataStatus) {
    return (
      <div className="d-flex align-items-center just justify-content-around">
        <form onSubmit={handleSubmit} style={{ width: "520px" }}>
          <div className="d-flex justify-content-between">
            <TextField
              label="Имя"
              value={data.name}
              name="name"
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Электронная почта"
              value={data.email}
              name="email"
              type="email"
              onChange={handleChange}
              error={errors.email}
            />
          </div>
          <AvatarsField
            label="Выбери аватарку"
            name="avatar"
            value={user.avatar}
            onChange={handleChange}
            options={avatars}
            count={12}
          />
          <RadioField
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
            name="sex"
            value={data.sex}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="btn btn-primary w-100 mx-auto mb-3"
            // disabled={isValid}
          >
            Обновить
          </button>
          {/* <BackHistoryButton /> */}
        </form>
      </div>
    );
  }
};

UserPageEdit.propTypes = {
  user: PropTypes.object,
  onShow: PropTypes.func,
};

export default UserPageEdit;
