import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../utils";
import Button from "../../components/common/buttons/Button";
import currency from "../../mock/currency";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCountsData,
  selectCountsData,
  selectCountsDataStatus,
} from "../../store/countsSlice";
import Badge from "../../components/common/Badge";

const CountCard = ({ count, onChange }) => {
  const dispatch = useDispatch();
  const countsDataLoaded = useSelector(selectCountsDataStatus());
  const countsData = useSelector(selectCountsData());

  useEffect(() => {
    if (!countsDataLoaded) dispatch(loadCountsData());
  }, []);

  return (
    <div className="col position-relative">
      <div className="card h-100 d-flex p-3 border-0 item-count">
        <div className="text-center">
          <img
            src={count.icon}
            className="card-img-top"
            alt="icon"
            style={{ width: "100px" }}
          />
          <h5 className="card-title ff-roboto ls-1">{count.name}</h5>
          <hr />
        </div>
        <div className="card-body d-flex flex-column p-0 text-center">
          <div className="card-body-content p-2 flex-grow-1">
            {countsDataLoaded ? (
              <div className="card-text">
                Тип счёта: <Badge {...countsData[count.type]} />
              </div>
            ) : (
              "Loading..."
            )}

            <div className="card-text">
              <p className="h6">Описание:</p>{" "}
              <p className="ff-BS">{count.content}</p>
            </div>
            <p className="card-text">Создан: {displayDate(count.createdAt)}</p>
            <p className="card-text">
              Обновлён: {displayDate(count.updatedAt)}
            </p>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary d-flex align-items-center">
              <p className="fw-bold ls-2 fs-5">Баланс:</p>
              <div className="flex-grow-1 justify-content-center d-flex">
                <p className="fw-bold ls-1 fs-4 align-items-center d-flex">
                  {count.balance}{" "}
                  <img
                    src={currency[count.currency].icon}
                    alt="img"
                    style={{ width: "40px" }}
                  />
                </p>
              </div>
            </small>

            {/* <i
              className={
                'fs-24 position-absolute top-50 end-0 translate-middle-y bi bi-eye' +
                (count.totalBalance === 'true' ? '' : '-slash')
              }
            ></i> */}
          </div>
        </div>
        <div
          className="btn-group-settings btn-group-vertical position-absolute top-0 end-0"
          role="group"
          aria-label="Vertical button group"
        >
          <Button
            dataType="edit"
            bgColor="light"
            classes="btn-sm"
            onClick={onChange}
            id={count._id}
            icon="bi bi-gear"
            iconSize="24px"

          />
          <Button
            dataType="like"
            bgColor="light"
            classes="btn-sm"
            onClick={onChange}
            id={count._id}
            icon={"bi bi-heart" + (count.like ? "-fill" : "")}
            iconSize="24px"

          />

          <Button
            dataType="remove"
            bgColor="light"
            classes="btn-sm"
            onClick={onChange}
            id={count._id}
            icon="bi bi-trash"
            iconSize="24px"

          />
        </div>
      </div>
    </div>
  );
};

CountCard.propTypes = {
  count: PropTypes.object,
  onChange: PropTypes.func,
};

export default CountCard;
