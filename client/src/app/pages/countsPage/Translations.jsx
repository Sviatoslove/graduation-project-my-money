import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/usersSlice';
import Button from '../../components/common/Button';

const Translations = ({ onChange }) => {
  const user = useSelector(selectUser());

  return (
    <div className="info-action-panel mb-4">
      <div className="btns">
        <h4 className="text-center">Переводы</h4>
        <div className="d-flex justify-content-evenly">
          <Button
            outline={true}
            classes="w-90px shadow-custom mt-5"
            imgSrc="https://img.icons8.com/stickers/54/time-machine.png"
          >
            <p>История</p>
          </Button>
          <div className="info br-5 w-90px text-center shadow-custom mb-5">
            <img
              src="https://img.icons8.com/arcade/64/money-bag.png"
              alt="money-bag"
            />
            <p className="balance ff-roboto fw-bold">{user.balance}</p>
          </div>
          <Button
            dataType="translations"
            outline={true}
            classes="w-90px shadow-custom mt-5"
            imgSrc="https://img.icons8.com/stickers/54/money-circulation.png"
            onClick={onChange}
          >
            <p>Сделать</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

Translations.propTypes = {
  onChange: PropTypes.func,
};

export default Translations;
