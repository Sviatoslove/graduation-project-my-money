import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { dataEditForUserPage } from '../../utils/dataEditForUserPage';
import Badge from '../../components/common/Badge';
import { useTables } from '../../hooks/useTable';

const UserCardItem = ({ essence, type, content }) => {
  const { counts } = useTables();
  const title = { categories: 'Категории:', counts: 'Счета:' };

  const getBadgeProps = (id) => {
    let iconSize;
    const item = essence[id];
    if (item.dataType === 'counts') {
      const { _id: key, color, icon: imgSrc } = item;
      iconSize = '41px';
      const imgClasses='m-0'
      return { key, iconSize, color, imgSrc, imgClasses };
    }
    if (item.dataType === 'categories') {
      const { _id: key, bgColor: color, icon, iconColor } = item;
      iconSize = 'fs-1 ';
      return { key, iconSize, color, icon, iconColor };
    }
  };

  return (
    <Link
      className="list-group-item w-100 d-flex align-items-center"
      to={
        type ? (type === 'categories' && !counts ? '/counts' : `/${type}`) : '/'
      }
    >
      {!content ? (
        type ? (
          <>
            <div className="w-112px ws-nw">
              <div className="mb-4">{title[type]}</div>
              <div className="">
                Всего:{' '}
                {essence ? Object.values(essence).length : 'Пока ничего нет'}
              </div>
            </div>
            <div className="d-flex flex-wrap mx-auto">
              {essence ? (
                dataEditForUserPage(essence, 8)?.map((array, idx) => {
                  if (idx < 2) {
                    return (
                      <div className="d-flex mx-auto" key={idx}>
                        {array.map((item) => (
                          <Badge
                            {...getBadgeProps(item._id)}
                            classes="br-50 text-center me-2 mb-1"
                          />
                        ))}
                      </div>
                    );
                  }
                })
              ) : (
                <p>{`${title[type]} отсутствуют, создайте их`}</p>
              )}
            </div>
          </>
        ) : (
          <p className="mx-auto">
            Всего операций:&nbsp;
            {essence ? Object.values(essence).length : 'Пока ничего нет'}
          </p>
        )
      ) : (
        <p className="mx-auto">{content}</p>
      )}
    </Link>
  );
};

UserCardItem.propTypes = {
  essence: PropTypes.object,
  type: PropTypes.string,
  content: PropTypes.string,
};

export default UserCardItem;
