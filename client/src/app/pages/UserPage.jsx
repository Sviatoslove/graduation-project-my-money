import React, { useState } from 'react';
import { selectUser } from '../store/usersSlice';
import { useSelector } from 'react-redux';
import UserAvatar from '../components/common/UserAvatar';
import { useNavigate } from 'react-router-dom';
import displayDate from '../utils/displayDate';
import UserPageEdit from './UserPageEdit';

const UserPage = () => {
  const [show, setShow] = useState('');
  const user = useSelector(selectUser());
  console.log('user:', user);

  const handleToEdit = () => {
    show ? setShow('') : setShow('show');
  };

  const handleActive = (e) => {
    e.preventDefault();
    const { target } = e;
    console.log('target:', target);
  };

  return (
    <>
      <div
        className="card p-2 border-0 shadow-lg"
        style={{ marginTop: '10px', maxHeight:'400px',height: '100%', zIndex: 1 }}
      >
        <div className="card-body d-flex">
          <div
            className="card-avatar position-relative"
            style={{ width: 'fit-content' }}
          >
      
            <UserAvatar image={user.image} height="300" />
            <h4 className="text-center">{user.name}</h4>
          </div>
          <div className="text-center flex-grow-1">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Вы зарегистрировались {displayDate(user.createdAt)}</li>
              <li className="list-group-item">Счета:</li>
              <li className="list-group-item">Категории: </li>
              <li className="list-group-item">История операций: </li>
              <li className="list-group-item">Email: {user.email}</li>
            </ul>
          </div>
        </div>
        <button
              className="position-absolute top-0 end-0 btn btn-light btn-sm"
              onClick={(e) => handleToEdit(e)}
            >
              <i
                className={show ? 'bi bi-x-circle' : 'bi bi-gear'}
                style={{ fontSize: '32px' }}
              ></i>
            </button>
      </div>

      <div
        className={'rounded-3 border-0 card user-edit ' + show}
        style={{ marginTop: '80px', width:'100%', maxHeight:'400px',height: '100%', padding:'20px 300px' }}
      >
        <button
          className="position-absolute top-0 end-0 btn btn-light btn-sm"
          onClick={(e) => handleToEdit(e)}
        >
          <i className="bi bi-x-circle" style={{ fontSize: '32px' }}></i>
        </button>
        <UserPageEdit user={user}/>
      </div>
    </>
  );
};

export default UserPage;
