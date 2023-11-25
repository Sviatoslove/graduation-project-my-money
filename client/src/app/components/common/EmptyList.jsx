import React from 'react';
import { ContainerScale } from './Containers';
import PropTypes from 'prop-types';
import { Button } from './buttons';
import addIcon from '../../../assets/icons/patch-plus-fill.svg';

const EmptyList = ({ title, link, classes, dataType, onClick }) => {
  return (
    <ContainerScale classes={classes}>
      <div className="d-flex flex-grow-1 my-auto mx-auto">
      <h1 className="my-auto h-content">Добавьте {title}</h1>
      </div>
      <Button
        bgColor="primary"
        classes="shadow-lg p-2 ms-auto"
        imgSrc={addIcon}
        link={link}
        dataType={dataType}
        onClick={onClick}
      />
    </ContainerScale>
  );
};

EmptyList.defaultProps={
  classes:'w-98 mh-i d-flex mx-auto mt-4 flex-column'
}

EmptyList.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  classes: PropTypes.string,
  dataType: PropTypes.string,
  onClick: PropTypes.func,
};

export default EmptyList;
