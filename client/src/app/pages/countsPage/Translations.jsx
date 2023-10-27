import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/usersSlice';
import Button from '../../components/common/Button';
import MasterCount from '../../components/common/MasterCount';

const Translations = ({ onChange, counts }) => {
  const [masterCount, setMasterCount] = useState('');
  const user = useSelector(selectUser());

  useEffect(() => {
    if (user.masterCount) {
      setMasterCount(counts[user.masterCount]);
    }
  }, []);

  return (
    <div className="info-action-panel mb-4">
      <div className="btns">
        <h4 className="text-center mb-4">Переводы</h4>
        {!masterCount && (
          <h4 className="text-center mb-4">
            Выберите главный счёт с помощью кнопки чуть ниже
          </h4>
        )}
        <div className="d-flex justify-content-evenly">
          <Button
            link={'/counts/translations'}
            dataType="translationsHistory"
            outline={true}
            classes="w-90px shadow-custom mt-auto"
            imgSrc="https://img.icons8.com/stickers/54/time-machine.png"
          >
            <p>История</p>
          </Button>

          <MasterCount/>

          <Button
            dataType="translationsAdd"
            outline={true}
            classes="w-90px shadow-custom mt-auto"
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
  counts: PropTypes.object,
};

export default Translations;
