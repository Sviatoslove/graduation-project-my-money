import React from 'react';
import PropTypes from 'prop-types';
import { useTables } from '../../hooks/useTable';
import UserAvatar from '../../components/common/UserAvatar';
import { displayDate } from '../../utils';
import UserPlaceholder from './UserPlaceholder';
import UserCardItem from './UserCardItem';
import { useSelector } from 'react-redux';
import { selectCountsLoadingStatus } from '../../store/countsSlice';

const UserCard = ({ user }) => {
  const { operations, categories, counts } = useTables();
  const countsIsLoading = useSelector(selectCountsLoadingStatus())

  const userCardItems = [
    { content: 'Вы зарегистрировались ' + displayDate(user.createdAt) },
    { essence: categories, type: 'categories' },
    { essence: counts, type: 'counts' },
    { essence: operations },
    { content: 'Email: ' + user.email },
  ];

  return (
    <div
      className="card p-2 border-0 shadow-lg w-100"
      style={{
        marginTop: '25px',
        maxHeight: '450px',
        height: '450px',
        zIndex: 1,
      }}
    >
      <div className="card-body d-flex">
        <div
          className="card-avatar position-relative"
          style={{ width: 'fit-content' }}
        >
          <UserAvatar image={user.avatar} height="300" />
          <h4 className="text-center mt-5">{user.name}</h4>
        </div>
        {counts || !countsIsLoading ? (
          <div className="flex-grow-1 ff-roboto">
            <ul className="list-group list-group-flush list-group-userPage fs-5">
              {userCardItems.map((item, idx) => (
                <UserCardItem key={idx + 100} {...item} />
              ))}
            </ul>
          </div>
        ) : (
          <UserPlaceholder />
        )}
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
