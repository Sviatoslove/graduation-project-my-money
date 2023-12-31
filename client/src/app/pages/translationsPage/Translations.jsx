import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/usersSlice';
import Button from '../../components/common/buttons/Button';
import MasterCount from '../../components/common/MasterCount';
import { useTables } from '../../hooks/useTable';
import { selectTranslations } from '../../store/translationsSlice';

const Translations = ({ onChange, counts }) => {
  const { setMasterCount } = useTables();
  const user = useSelector(selectUser());
  const translations = useSelector(selectTranslations())

  useEffect(() => {
    if (user.masterCount) {
      setMasterCount(counts[user.masterCount]);
    }
  }, [user, counts]);

  return (
    <div className="info-action-panel mb-4">
      <div className="btns">
        <h4 className="text-center mb-4">Переводы</h4>
        <div className="d-flex justify-content-evenly">
          <Button
            link={'/counts/translations'}
            dataType="translationsHistory"
            outline={true}
            classes="w-90px shadow-custom mt-auto"
            imgSrc="https://img.icons8.com/stickers/54/time-machine.png"
            disabled={!translations ? true : false}
          >
            <p>История</p>
          </Button>

          <MasterCount classes={'mb-5 w-300px'} />

          <Button
            dataType="translations"
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
