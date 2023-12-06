import React from 'react';
import { ContainerScale } from './Containers';
import PropTypes from 'prop-types';
import { Button } from './buttons';
import addIcon from '../../../assets/icons/patch-plus-fill.svg';
import { useTables } from '../../hooks/useTable';
import { useLocation, useNavigate } from 'react-router-dom';

const EmptyList = ({ title, classes, dataType, onClick, imgSrc }) => {
  const { counts } = useTables();
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigate = (e) => {
    const {pathname} = location
    if(!counts && pathname !== '/counts') navigate('/counts')
    else onClick(e)
  }

  return (
    <ContainerScale classes={'w-98 d-flex mx-auto mt-4 flex-column ff-BS '+ classes}>
      <div className="d-flex flex-grow-1 flex-column mx-auto">
        <div className="my-auto text-center">
          <img src={imgSrc} alt="logotype" style={{ width: '200px' }} />
          <h1>Добавьте {title}</h1>
        </div>
      </div>
      <Button
        bgColor="primary"
        classes="shadow-lg p-2 ms-auto"
        imgSrc={addIcon}
        dataType={dataType}
        onClick={handleNavigate}
      />
    </ContainerScale>
  );
};

EmptyList.defaultProps = {
  classes: 'mh-86vh',
};

EmptyList.propTypes = {
  imgSrc: PropTypes.string,
  dataType: PropTypes.string,
  title: PropTypes.string,
  classes: PropTypes.string,
  onClick: PropTypes.func,
};

export default EmptyList;
