import React from 'react';
import { selectUser } from '../../store/usersSlice';
import { useSelector } from 'react-redux';
import UserCardEdit from './UserCardEdit';
import { Container } from '../../components/common/Containers';
import UserCard from './UserCard';

const UserPage = () => {
  const user = useSelector(selectUser());

  return (
    <Container newClasses="w-98 d-flex mx-auto mh-i flex-column">
      <UserCard user={user} />
      <UserCardEdit user={user} />
    </Container>
  );
};

export default UserPage;
